# 교재 문항(bank_book.js) → 암호화(bank.enc)
#
#   python build_lock.py --pw <암호>
#
# 암호를 스크립트에 적어 두지 않는다. 공개 저장소에 그대로 남기 때문이다.
#
# 왜 이렇게 하나:
#   정적 호스팅(GitHub Pages)에서는 "화면에 비밀번호 입력칸"을 두어도 보호가 전혀 안 된다.
#   데이터 .js 파일 주소를 직접 치면 그대로 받아지기 때문이다.
#   그래서 파일 자체를 AES-GCM 으로 실제 암호화해서 올리고, 브라우저에서 WebCrypto 로 푼다.
#
# ⚠️ 평문 bank_book.js 는 .gitignore 에 들어 있다. 절대 커밋하지 말 것.
import io, os, re, json, gzip, base64, argparse, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "bank_book.js")
OUT = os.path.join(HERE, "bank.enc")
ITER = 200_000


def extract_json(js_text):
    """bank_book.js 의 배열 리터럴만 뽑아 JSON 으로 바꾼다 (node 로 평가해서 안전하게)."""
    import subprocess, tempfile
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
        f.write(js_text.replace("if(typeof window!=='undefined')window.BOOK_BANK=BOOK_BANK;", ""))
        f.write("\nprocess.stdout.write(JSON.stringify(BOOK_BANK));\n")
        tmp = f.name
    try:
        r = subprocess.run(["node", tmp], capture_output=True, text=True, encoding="utf-8")
        if r.returncode:
            raise SystemExit("node 평가 실패:\n" + r.stderr)
        return r.stdout
    finally:
        os.remove(tmp)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pw", required=True)   # 기본값을 두면 공개 저장소에 암호가 그대로 남는다
    a = ap.parse_args()

    js = io.open(SRC, encoding="utf-8").read()
    payload = extract_json(js)
    items = json.loads(payload)
    raw = payload.encode("utf-8")
    gz = gzip.compress(raw, 9)

    salt = os.urandom(16)
    nonce = os.urandom(12)
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=ITER)
    key = kdf.derive(a.pw.encode("utf-8"))
    ct = AESGCM(key).encrypt(nonce, gz, None)

    blob = {
        "v": 1, "n": len(items), "iter": ITER,
        "salt": base64.b64encode(salt).decode(),
        "nonce": base64.b64encode(nonce).decode(),
        "ct": base64.b64encode(ct).decode(),
    }
    io.open(OUT, "w", encoding="utf-8").write(json.dumps(blob))
    print(f"문항 {len(items)}개 · 원본 {len(raw)//1024}KB → gzip {len(gz)//1024}KB → bank.enc {os.path.getsize(OUT)//1024}KB")
    print(f"암호: {a.pw}")


if __name__ == "__main__":
    main()
