/* ══════════════════════════════════════════════════════════════
   board-pro.js — 고급 전자칠판 슬라이드 뷰어 (표준 v1)

   ▸ board.js 와 무엇이 다른가
     board.js 는 "슬라이드를 넘기는" 화면만 담당한다.
     이 파일은 거기에 **펜·형광펜·지우개·가리개·타이머·번호뽑기·전체화면**이 붙은
     진짜 전자칠판이다. 예전에 automation-plc-exam / semicon-maintenance-master 의
     board.html 두 개가 각각 갖고 있던 기능을 한 파일로 합친 것이다.
     두 저장소는 이제 이 파일 하나를 같이 쓴다. **고치면 양쪽에 다 복사한다.**

   ▸ 쓰는 법
     <script src="lesson.js"></script>     ← 원고
     <script src="board-pro.js"></script>
     BoardPro.open({ title:'…', sub:'…', menu:[ … ] });

   ▸ menu 한 칸의 형식
     { icon:'📊', title:'개념 슬라이드', desc:'설명',
       run:{ kind:'lesson', deck:[슬라이드…] } }        ← 요점→발문→퀴즈→정답
     { …, run:{ kind:'quiz', deck:[{q,o,a,e,img,src}…] } }  ← 문제 한 개씩 크게
     { …, run:{ kind:'blank' } }                        ← 빈 칠판(판서만)

   ▸ 슬라이드 한 장(lesson)
     { u:'단원명', t:'제목', svg:'<svg…>', img:'그림.png', fig:'키', cap:'그림설명',
       pts:['요점','{{빈칸}} 이 있는 요점'], ask:'발문',
       ansq:'퀴즈', anso:['보기'…], ansa:정답번호(0부터), anse:'해설' }
     그림을 직접 만들어야 하면 opts.fig(slide) 로 HTML 을 돌려주면 된다.

   ▸ 요점 속 {{답}} 은 빈칸이다 (board.js 와 같다)
     처음에는 글자가 가려져 있고, 그 자리를 눌러야 답이 드러난다.
     빈칸을 눌러도 슬라이드는 넘어가지 않는다.

   ▸ 넘기기는 [◀] [다음] [▶] 단추와 ← → 키만 쓴다.
     화면 아무 데나 눌러서 넘어가는 동작은 넣지 않는다 — 수업 중에 잘못 눌린다.
     (판서 중에는 화면 전체가 그리는 면이라 더더욱 그렇다.)

   ▸ 버튼 겹침
     도구바는 **한 줄**이다. 폭이 모자라면 뒤쪽 버튼부터 「⋯」 안으로 들어간다.
     그래서 폭 390 에서도 버튼이 서로 포개지지 않는다.
     본체 페이지의 떠 있는 위젯(뒤로·기록초기화·계급배지)은 열려 있는 동안 가려 둔다.
   ══════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var CSS = [
    '#bp{position:fixed;inset:0;z-index:99000;display:flex;flex-direction:column;',
    '  background:#0b0f16;color:#eef3fb;font-family:"Malgun Gothic","맑은 고딕",system-ui,sans-serif;',
    '  line-height:1.5;-webkit-tap-highlight-color:transparent}',
    '#bp[hidden]{display:none!important}',
    '#bp *{box-sizing:border-box}',
    '#bp button{font-family:inherit;cursor:pointer;border:none;color:inherit}',

    /* ── 머리 ── */
    '#bp-head{display:flex;align-items:center;gap:14px;padding:9px 18px;border-bottom:1px solid #2f3b4f;',
    '  background:#0d131d;flex-shrink:0}',
    '#bp-u{font-size:clamp(11px,1vw,16px);color:#7cc6ff;font-weight:800}',
    '#bp-t{font-size:clamp(17px,2.1vw,34px);font-weight:900;letter-spacing:-.5px;line-height:1.2}',
    '#bp-i{font-size:clamp(12px,1.1vw,20px);color:#93a2ba;font-weight:800;white-space:nowrap}',

    /* ── 본문 ── */
    '#bp-body{flex:1;position:relative;overflow-y:auto;overflow-x:hidden;',
    '  padding:min(2vh,18px) min(2.4vw,30px) min(2vh,18px)}',
    '#bp-in{min-height:100%;display:flex;flex-direction:column;gap:min(1.6vh,15px)}',
    '.bp-fig{background:#0f1a27;border:1px solid #2f3b4f;border-radius:15px;padding:10px 13px;',
    '  display:flex;align-items:center;justify-content:center;min-height:0;flex:1 1 auto;overflow:auto}',
    '.bp-fig svg{max-height:100%;width:100%}',
    '.bp-fig img{max-width:100%;max-height:44vh;object-fit:contain}',
    '.bp-cap{text-align:center;color:#93a2ba;font-size:clamp(12px,1.1vw,19px);flex-shrink:0}',
    '.bp-pts{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:min(1vh,10px);flex-shrink:0}',
    '.bp-pts li{font-size:clamp(14px,1.4vw,27px);line-height:1.5;background:#161d29;border:1px solid #2f3b4f;',
    '  border-left:5px solid #7cc6ff;border-radius:12px;padding:min(1.2vh,12px) 16px}',
    '.bp-pts b{color:#7cc6ff}',
    '.bp-ask{background:#1b1509;border:1px solid #574316;border-left:5px solid #ffd166;border-radius:14px;',
    '  padding:min(1.5vh,16px) 19px;font-size:clamp(16px,1.6vw,31px);line-height:1.45;color:#f8ecc6;',
    '  font-weight:800;flex-shrink:0}',
    '.bp-q{font-size:clamp(17px,1.7vw,33px);font-weight:800;line-height:1.45;flex-shrink:0}',
    '.bp-opts{display:grid;grid-template-columns:1fr 1fr;gap:min(1.3vh,12px);flex-shrink:0}',
    '.bp-opt{text-align:left;background:#1f2836;border:2px solid #2f3b4f;border-radius:14px;',
    '  padding:min(1.6vh,16px) 17px;font-size:clamp(14px,1.35vw,27px);line-height:1.4;min-height:56px;',
    '  display:flex;align-items:center;gap:11px}',
    '.bp-opt .n{width:1.9em;height:1.9em;flex-shrink:0;border-radius:50%;background:#0f1826;border:1px solid #2f3b4f;',
    '  display:flex;align-items:center;justify-content:center;font-weight:900;color:#93a2ba;font-size:.9em}',
    '.bp-opt.ok{background:rgba(55,214,143,.2);border-color:#37d68f;box-shadow:0 0 0 4px rgba(55,214,143,.18)}',
    '.bp-opt.ok .n{background:#37d68f;color:#04240f;border-color:#37d68f}',
    '.bp-opt.dim{opacity:.38}',
    '.bp-exp{background:#0f1a27;border:1px solid #2f3b4f;border-left:5px solid #7cc6ff;border-radius:12px;',
    '  padding:min(1.4vh,14px) 18px;font-size:clamp(13px,1.2vw,24px);line-height:1.6;color:#cfe0f3;',
    '  flex-shrink:0;overflow-y:auto;max-height:26vh}',
    '.bp-exp b{color:#7cc6ff}',
    '.bp-veil{display:none!important}',
    /* 발문·퀴즈까지 열리면 아래가 길어진다 → 그림과 요점을 줄여 한 화면에 담는다
       (수업 중 스크롤은 흐름을 끊으므로 넘치지 않는 것이 중요하다) */
    '#bp-in.compact .bp-fig{flex:0 1 auto;max-height:20vh}',
    '#bp-in.compact .bp-cap{display:none}',
    '#bp-in.compact .bp-pts li{font-size:clamp(12px,.98vw,18px);padding:min(.65vh,7px) 13px;line-height:1.42}',
    '#bp-in.compact .bp-ask{font-size:clamp(13px,1.25vw,24px);padding:min(1vh,11px) 15px}',
    '#bp-in.compact .bp-q{font-size:clamp(14px,1.4vw,27px)}',
    '#bp-in.compact .bp-opt{min-height:48px;padding:min(1.1vh,12px) 14px;font-size:clamp(12.5px,1.15vw,23px)}',
    '#bp-in.compact .bp-exp{font-size:clamp(12px,1.05vw,21px);padding:min(1vh,11px) 15px;max-height:20vh}',

    /* {{답}} 빈칸 — 누르기 전에는 글자가 안 보인다 */
    '.bp-bl{display:inline-block;min-width:3.4em;padding:0 .35em;margin:0 .12em;border-radius:6px;',
    '  background:#1d3350;border-bottom:2px solid #7fc4ff;color:transparent;cursor:pointer;',
    '  font-weight:800;user-select:none}',
    '.bp-bl:focus{outline:2px solid #7fc4ff;outline-offset:1px}',
    '.bp-bl.on{background:rgba(127,196,255,.16);color:#9fe0ff;border-bottom-color:#9fe0ff;cursor:default}',

    /* ── 판서 ── */
    '#bp-pad{position:fixed;inset:0;z-index:99040;touch-action:none}',
    '#bp-pad.off{pointer-events:none}',
    '#bp-curtain{position:fixed;left:0;right:0;top:0;height:50%;z-index:99050;background:#0b0f16;',
    '  border-bottom:3px solid #7cc6ff;display:none}',
    '#bp-curtain.on{display:block}',

    /* ── 도구바 : 언제나 한 줄. 넘치면 뒤쪽부터 ⋯ 안으로 ── */
    /* 화면에 고정(position:fixed)하면 본문이 이 막대 밑으로 흘러 지나간다 —
       요점 속 빈칸이 도구 단추와 포개져 버린다(폭이 좁을수록 심하다).
       층의 마지막 칸으로 두면 본문은 제 상자 안에서만 구르므로 그럴 일이 없다. */
    '#bp-bar{flex:0 0 auto;z-index:99060;display:flex;gap:7px;align-items:center;',
    '  padding:9px 12px calc(9px + env(safe-area-inset-bottom));background:rgba(9,13,20,.96);',
    '  border-top:1px solid #2f3b4f;flex-wrap:nowrap;overflow:hidden}',
    '#bp-bar[hidden]{display:none!important}',
    '#bp-bar button{min-height:52px;min-width:52px;border-radius:13px;background:#1f2836;border:1px solid #2f3b4f;',
    '  font-size:clamp(13px,1vw,17px);font-weight:800;padding:0 13px;flex-shrink:0}',
    '#bp-bar button.on{background:linear-gradient(180deg,#3b9bff,#2472c8);border-color:transparent;color:#fff}',
    '#bp-bar button.big{flex:0 0 auto;min-width:96px;max-width:min(46vw,230px);',
    '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
    '  background:linear-gradient(180deg,#3b9bff,#2472c8);border:0;color:#fff}',
    '#bp-bar button:disabled{opacity:.42;filter:grayscale(.6);cursor:default}',
    '#bp-nav{display:flex;gap:7px;align-items:center;flex:0 0 auto;width:max-content}',
    /* width:max-content 를 준 이유 — flex-shrink:0 만으로는 이 칸이 제 내용보다
       좁게 잡히는 일이 있었다. 그러면 안의 [◀][다음][▶] 가 칸 밖으로 삐져나와
       옆의 도구 단추와 포개지고, bar 는 넘치지 않은 것으로 보여 ⋯ 로 옮기지도 않는다. */
    '#bp-tools{display:flex;gap:7px;align-items:center;flex:0 0 auto;width:max-content;margin-left:auto}',
    /* 어느 칸도 줄어들면 안 된다. 줄어들면 그 안의 단추들이 상자 밖으로
       삐져나와 옆 칸과 포개지고, 넘친 폭도 잘못 재게 된다.
       모두 제 크기를 지키게 두고, 넘치는 것은 bar 가 잘라 낸다(overflow:hidden).
       그 상태에서 bar.scrollWidth 가 진짜 필요한 폭이 된다. */
    '#bp-bar > *{flex-shrink:0}',
    '.bp-sw{width:40px!important;min-width:40px!important;height:40px;min-height:40px!important;',
    '  border-radius:50%!important;padding:0!important;border:3px solid #0b0f16!important;box-shadow:0 0 0 2px #2f3b4f}',
    '.bp-sw.on{box-shadow:0 0 0 4px #7cc6ff!important}',
    '#bp-more{flex:0 0 auto}',
    '#bp-pop{position:fixed;right:12px;bottom:calc(74px + env(safe-area-inset-bottom));z-index:99070;',
    '  background:#131a26;border:1px solid #2f3b4f;border-radius:16px;padding:10px;display:none;',
    '  gap:7px;flex-wrap:wrap;max-width:min(420px,92vw);box-shadow:0 14px 40px rgba(0,0,0,.55)}',
    '#bp-pop.on{display:flex}',
    '#bp-pop button{min-height:52px;min-width:52px;border-radius:13px;background:#1f2836;border:1px solid #2f3b4f;',
    '  font-size:14px;font-weight:800;padding:0 13px;color:#eef3fb;cursor:pointer;font-family:inherit}',
    '#bp-pop button.on{background:linear-gradient(180deg,#3b9bff,#2472c8);border-color:transparent;color:#fff}',

    /* ── 덮개(타이머·뽑기) ── */
    '.bp-ov{position:fixed;inset:0;z-index:99080;background:rgba(5,8,13,.94);display:none;',
    '  flex-direction:column;align-items:center;justify-content:center;gap:22px;padding:20px}',
    '.bp-ov.on{display:flex}',
    '#bp-tnum{font-size:min(30vw,260px);font-weight:900;letter-spacing:-.04em;font-variant-numeric:tabular-nums;line-height:1}',
    '#bp-pnum{font-size:min(34vw,300px);font-weight:900;line-height:1;color:#ffd166}',
    '.bp-ov .sub{font-size:clamp(15px,1.8vw,30px);color:#93a2ba;font-weight:800;text-align:center}',
    '.bp-ov .row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}',
    '.bp-ov button{min-height:56px;padding:0 22px;border-radius:14px;background:#1f2836;border:1px solid #2f3b4f;',
    '  font-size:clamp(13px,1.1vw,20px);font-weight:800;color:#eef3fb;cursor:pointer;font-family:inherit}',

    /* ── 메뉴 ── */
    '#bp-menu{position:fixed;inset:0;z-index:99090;overflow-y:auto;padding:26px 20px 40px;',
    '  background:radial-gradient(1200px 700px at 60% -10%,#1a2536,#0a0d13 62%);',
    '  display:none;flex-direction:column;align-items:center;gap:15px}',
    '#bp-menu.on{display:flex}',
    '#bp-menu h1{font-size:clamp(21px,2.8vw,44px);font-weight:900;margin:0;letter-spacing:-1px;text-align:center}',
    '#bp-menu p{color:#93a2ba;font-size:clamp(13px,1.1vw,19px);margin:0;text-align:center;line-height:1.6;max-width:820px}',
    '#bp-grid{display:flex;gap:13px;flex-wrap:wrap;justify-content:center;margin-top:4px;max-width:1100px}',
    '.bp-card{width:min(310px,88vw);background:linear-gradient(180deg,#161d29,#1f2836);border:1px solid #2f3b4f;',
    '  border-radius:18px;padding:17px 19px;text-align:left;color:#eef3fb;font:inherit;cursor:pointer}',
    '.bp-card:hover{border-color:#7cc6ff}',
    '.bp-card.wide{width:min(470px,92vw)}',
    '.bp-card .ic{font-size:34px}',
    '.bp-card .tt{font-size:clamp(15px,1.35vw,22px);font-weight:900;margin-top:7px}',
    '.bp-card .ds{font-size:clamp(12px,1vw,16px);color:#93a2ba;margin-top:6px;line-height:1.5}',
    '#bp-close{margin-top:6px;background:#1f2836;border:1px solid #2f3b4f;border-radius:13px;',
    '  padding:13px 24px;font-size:15px;font-weight:800;color:#eef3fb;cursor:pointer;font-family:inherit}',

    'body.bp-open{overflow:hidden}',
    /* 열려 있는 동안 본체의 떠 있는 위젯을 가린다.
       display:none 으로 지우면 backbar.js 가 「기록 초기화」 높이를 0 으로 재서
       자리를 잃으므로 visibility 로 가린다 (board.js 와 같은 방식). */
    'body.bp-open #bb-btn,',
    'body.bp-open .tr-btn,',
    'body.bp-open .cm-launch,',
    'body.bp-open #rk-badge{visibility:hidden!important;pointer-events:none!important}',

    '@media (max-width:640px){',
    '  #bp-bar{gap:5px;padding:7px 9px calc(7px + env(safe-area-inset-bottom))}',
    '  #bp-bar button{min-height:44px;min-width:44px;padding:0 9px;font-size:13px}',
    '  #bp-bar button.big{min-width:74px;max-width:40vw}',
    '  .bp-opts{grid-template-columns:1fr}',
    '  #bp-head{padding:7px 12px}',
    '}'
  ].join('\n');

  /* 도구바 — #bp 안의 마지막 칸으로 들어간다(본문이 밑으로 지나가지 않도록) */
  var BAR_HTML =
    '<div id="bp-bar" hidden>' +
      '<div id="bp-nav">' +
        '<button type="button" data-a="prev" title="이전 (←)">◀</button>' +
        '<button type="button" class="big" data-a="step">다음</button>' +
        '<button type="button" data-a="next" title="다음 (→)">▶</button>' +
      '</div>' +
      '<div id="bp-tools">' +
        '<button type="button" id="bp-pen"  data-a="pen"  title="펜 (P)">✏️</button>' +
        '<button type="button" id="bp-hi"   data-a="hi"   title="형광펜">🖍️</button>' +
        '<button type="button" id="bp-er"   data-a="er"   title="지우개">🧽</button>' +
        '<button type="button" class="bp-sw on" data-c="#ff4d4f" style="background:#ff4d4f" title="빨강"></button>' +
        '<button type="button" class="bp-sw"    data-c="#ffd166" style="background:#ffd166" title="노랑"></button>' +
        '<button type="button" class="bp-sw"    data-c="#4ade80" style="background:#4ade80" title="초록"></button>' +
        '<button type="button" class="bp-sw"    data-c="#ffffff" style="background:#ffffff" title="흰색"></button>' +
        '<button type="button" data-a="undo" title="되돌리기">↩</button>' +
        '<button type="button" data-a="clr"  title="판서 지우기 (C)">🗑</button>' +
        '<button type="button" data-a="timer"   title="타이머">⏱</button>' +
        '<button type="button" data-a="pick"    title="번호 뽑기">🎲</button>' +
        '<button type="button" id="bp-cur" data-a="curtain" title="가리개">🪟</button>' +
        '<button type="button" data-a="full"    title="전체화면 (F)">⛶</button>' +
        '<button type="button" data-a="home"    title="처음으로">🏠</button>' +
      '</div>' +
      '<button type="button" id="bp-more" data-a="more" title="더보기" hidden>⋯</button>' +
    '</div>';

  /* ═════════ 상태 ═════════ */
  var opts = null, root = null, pad = null, ctx = null;
  var strokes = [], curStroke = null, tool = 'none', color = '#ff4d4f';
  var mode = 'lesson', deck = [], i = 0, step = 0;
  var built = false;

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }

  /* 요점 한 줄의 {{답}} 을 눌러야 보이는 빈칸으로 바꾼다.
     원고에 태그(<b> 등)가 들어 있으므로 줄 전체를 esc 하지 않는다 —
     빈칸 안의 글자만 esc 한다. */
  function blanks(p) {
    return String(p == null ? '' : p).replace(/\{\{([\s\S]+?)\}\}/g, function (_, a) {
      return '<span class="bp-bl" tabindex="0" role="button" title="눌러서 답 보기">' + esc(a) + '</span>';
    });
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ═════════ 뼈대 ═════════ */
  function build() {
    if (built) return;
    built = true;

    var st = document.createElement('style');
    st.id = 'bp-css';
    st.textContent = CSS;
    document.head.appendChild(st);

    root = document.createElement('div');
    root.id = 'bp';
    root.hidden = true;
    root.innerHTML =
      '<div id="bp-head">' +
        '<div style="flex:1;min-width:0"><div id="bp-u"></div><div id="bp-t"></div></div>' +
        '<div id="bp-i"></div>' +
      '</div>' +
      '<div id="bp-body"><div id="bp-in"></div></div>' +
      BAR_HTML;
    document.body.appendChild(root);

    var extra = document.createElement('div');
    extra.innerHTML =
      '<div id="bp-curtain"></div>' +
      '<canvas id="bp-pad" class="off"></canvas>' +
      '<div id="bp-pop"></div>' +
      '<div class="bp-ov" id="bp-ovt">' +
        '<div id="bp-tnum">3:00</div><div class="sub" id="bp-tsub">남은 시간</div>' +
        '<div class="row">' +
          '<button type="button" data-min="1">1분</button><button type="button" data-min="3">3분</button>' +
          '<button type="button" data-min="5">5분</button><button type="button" data-min="10">10분</button>' +
          '<button type="button" id="bp-ttog">⏸ 멈춤</button>' +
          '<button type="button" data-close="bp-ovt">닫기</button>' +
        '</div>' +
      '</div>' +

      '<div class="bp-ov" id="bp-ovp">' +
        '<div id="bp-pnum">–</div><div class="sub" id="bp-psub">1 ~ 30번</div>' +
        '<div class="row">' +
          '<button type="button" id="bp-pgo">🎲 뽑기</button>' +
          '<button type="button" data-max="20">1~20</button><button type="button" data-max="25">1~25</button>' +
          '<button type="button" data-max="30">1~30</button><button type="button" data-max="35">1~35</button>' +
          '<button type="button" id="bp-preset">기록 초기화</button>' +
          '<button type="button" data-close="bp-ovp">닫기</button>' +
        '</div>' +
        '<div class="sub" id="bp-plog" style="font-size:clamp(12px,1vw,16px)"></div>' +
      '</div>' +

      '<div id="bp-menu"><h1></h1><p></p><div id="bp-grid"></div>' +
        '<button type="button" id="bp-close">← 나가기</button></div>';
    while (extra.firstChild) document.body.appendChild(extra.firstChild);

    pad = $('bp-pad');
    ctx = pad.getContext('2d');
    wire();
  }

  /* ═════════ 판서 ═════════ */
  function fit() {
    var r = window.devicePixelRatio || 1;
    pad.width = innerWidth * r; pad.height = innerHeight * r;
    pad.style.width = innerWidth + 'px'; pad.style.height = innerHeight + 'px';
    ctx.setTransform(r, 0, 0, r, 0, 0);
    redraw();
  }
  function redraw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (var k = 0; k < strokes.length; k++) {
      var s = strokes[k];
      if (s.pts.length < 2) continue;
      ctx.globalAlpha = s.hi ? 0.34 : 1;
      ctx.globalCompositeOperation = s.er ? 'destination-out' : 'source-over';
      ctx.strokeStyle = s.c; ctx.lineWidth = s.w;
      ctx.beginPath(); ctx.moveTo(s.pts[0].x, s.pts[0].y);
      for (var j = 1; j < s.pts.length; j++) ctx.lineTo(s.pts[j].x, s.pts[j].y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }
  function setTool(t) {
    tool = t;
    pad.classList.toggle('off', t === 'none');
    ['bp-pen', 'bp-hi', 'bp-er'].forEach(function (id) {
      var b = $(id); if (b) b.classList.toggle('on', (id === 'bp-pen' && t === 'pen') ||
        (id === 'bp-hi' && t === 'hi') || (id === 'bp-er' && t === 'er'));
    });
  }

  /* ═════════ 도구바 — 한 줄로 맞추기 ═════════
     넘치면 뒤쪽 버튼부터 「⋯」 안으로 옮긴다. 그래서 절대 겹치지 않는다. */
  /* 한 칸 안의 단추들이 실제로 차지하는 폭 (칸 자체의 폭은 믿지 않는다) */
  function widthOf(box, gap) {
    var kids = box.children, w = 0;
    for (var k = 0; k < kids.length; k++) w += kids[k].offsetWidth + (k ? gap : 0);
    return w;
  }

  function fitBar() {
    var bar = $('bp-bar'), nav = $('bp-nav'), tools = $('bp-tools'),
        pop = $('bp-pop'), more = $('bp-more');
    if (!bar || bar.hidden) return;

    while (pop.firstChild) tools.appendChild(pop.firstChild);   /* 일단 전부 되돌린다 */
    more.hidden = true;

    /* 칸(#bp-nav·#bp-tools)의 offsetWidth 나 bar.scrollWidth 는 믿을 수 없다 —
       flex 가 칸을 제 내용보다 좁게 잡아 놓고도 넘쳤다고 알려 주지 않는 경우가 있다.
       (실제로 [◀][다음][▶] 가 칸 밖으로 삐져나와 도구 단추와 96% 포개졌다.)
       그래서 단추 하나하나의 폭을 직접 더해서 견준다. 단추는 줄어들지 않으므로
       offsetWidth 가 곧 제 크기다. */
    var cs = getComputedStyle(bar);
    var gap = parseFloat(cs.columnGap || cs.gap) || 7;
    var padL = parseFloat(cs.paddingLeft) || 0, padR = parseFloat(cs.paddingRight) || 0;
    var room = bar.clientWidth - padL - padR - widthOf(nav, gap) - gap;

    var guard = 0;
    while (widthOf(tools, gap) > room && tools.lastElementChild && guard++ < 40) {
      if (more.hidden) { more.hidden = false; room -= (more.offsetWidth + gap); }
      pop.insertBefore(tools.lastElementChild, pop.firstChild);
    }
    if (pop.childElementCount === 0) { more.hidden = true; pop.classList.remove('on'); }
  }

  /* 도구바 다시 맞추기.
     rAF 로 미루면 안 된다 — 화면에 안 떠 있는 탭에서는 rAF 가 아예 안 불려서
     버튼이 넘친 채로 굳는다. fitBar 는 어차피 offsetWidth 를 읽어 배치를 강제하므로
     그 자리에서 바로 계산해도 값이 맞다.
     ResizeObserver 가 다시 부르는 것은 막지 않는다(두 번째에는 결과가 같아 멈춘다).
     다만 한 번 도는 도중에 겹쳐 들어오는 것만 막는다. */
  var inFit = false;
  function relayout() {
    if (inFit) return;
    inFit = true;
    try { fitBar(); } finally { inFit = false; }
  }

  /* ═════════ 이어붙이기 ═════════ */
  function wire() {
    pad.addEventListener('pointerdown', function (e) {
      if (tool === 'none') return;
      pad.setPointerCapture(e.pointerId);
      var w = tool === 'er' ? 44 : (tool === 'hi' ? 26 : 5);
      curStroke = { c: color, w: w, hi: tool === 'hi', er: tool === 'er', pts: [{ x: e.clientX, y: e.clientY }] };
      strokes.push(curStroke); redraw();
    });
    pad.addEventListener('pointermove', function (e) {
      if (!curStroke) return;
      var list = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
      if (!list || !list.length) list = [e];
      for (var k = 0; k < list.length; k++) curStroke.pts.push({ x: list[k].clientX, y: list[k].clientY });
      redraw();
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) {
      pad.addEventListener(t, function () { curStroke = null; });
    });

    /* 도구바·팝업의 모든 단추를 한 곳에서 받는다 (팝업으로 옮겨져도 그대로 동작) */
    function onBar(e) {
      var sw = e.target.closest('.bp-sw');
      if (sw) {
        color = sw.dataset.c;
        Array.prototype.forEach.call(document.querySelectorAll('.bp-sw'), function (x) { x.classList.remove('on'); });
        sw.classList.add('on');
        if (tool === 'none' || tool === 'er') setTool('pen');
        return;
      }
      var b = e.target.closest('[data-a]');
      if (!b) return;
      act(b.dataset.a);
    }
    $('bp-bar').addEventListener('click', onBar);
    $('bp-pop').addEventListener('click', onBar);

    /* 본문 — 빈칸만 받는다. 빈 곳을 눌러도 넘어가지 않는다. */
    $('bp-body').addEventListener('click', function (e) {
      var bl = e.target.closest && e.target.closest('.bp-bl');
      if (bl) bl.classList.add('on');
    });

    $('bp-grid').addEventListener('click', function (e) {
      var c = e.target.closest('[data-k]');
      if (c) start(+c.dataset.k);
    });
    $('bp-close').addEventListener('click', close);

    /* 덮개 */
    Array.prototype.forEach.call(document.querySelectorAll('[data-close]'), function (b) {
      b.addEventListener('click', function () { $(b.dataset.close).classList.remove('on'); });
    });
    $('bp-ovt').addEventListener('click', function (e) {
      var b = e.target.closest('[data-min]'); if (b) tmSet(+b.dataset.min);
    });
    $('bp-ttog').addEventListener('click', function () { tmRun(!tmId); });
    $('bp-ovp').addEventListener('click', function (e) {
      var b = e.target.closest('[data-max]');
      if (b) { pkMax = +b.dataset.max; pkUsed = []; pkPaint(); }
    });
    $('bp-pgo').addEventListener('click', pkGo);
    $('bp-preset').addEventListener('click', function () { pkUsed = []; $('bp-pnum').textContent = '–'; pkPaint(); });

    addEventListener('resize', function () { fit(); relayout(); });
    /* 도구바 자체 크기가 바뀔 때도 다시 맞춘다.
       단, fitBar 가 버튼을 옮기면 크기가 또 바뀌어 관찰자가 다시 불린다 —
       무한 반복을 막으려고 rAF 한 번으로 묶는다. */
    if (window.ResizeObserver) new ResizeObserver(relayout).observe($('bp-bar'));

    document.addEventListener('keydown', function (e) {
      if (!root || root.hidden) return;
      if ($('bp-menu').classList.contains('on')) {
        if (e.key === 'Escape') close();
        return;
      }
      /* 빈칸에 초점이 있으면 Enter·스페이스는 빈칸 여는 데 쓴다 */
      var bl = e.target && e.target.closest && e.target.closest('.bp-bl');
      if (bl && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); bl.classList.add('on'); return; }
      var k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); act('step-or-next'); }
      else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); act('prev'); }
      else if (k === 'f' || k === 'F') { e.preventDefault(); act('full'); }
      else if (k === 'p' || k === 'P') { e.preventDefault(); act('pen'); }
      else if (k === 'c' || k === 'C') { e.preventDefault(); act('clr'); }
      else if (k === 'Escape') {
        setTool('none');
        Array.prototype.forEach.call(document.querySelectorAll('.bp-ov'), function (o) { o.classList.remove('on'); });
        $('bp-pop').classList.remove('on');
      }
    });
  }

  function act(a) {
    if (a === 'pen') setTool(tool === 'pen' ? 'none' : 'pen');
    else if (a === 'hi') setTool(tool === 'hi' ? 'none' : 'hi');
    else if (a === 'er') setTool(tool === 'er' ? 'none' : 'er');
    else if (a === 'undo') { strokes.pop(); redraw(); }
    else if (a === 'clr') { strokes = []; redraw(); }
    else if (a === 'prev') go(-1);
    else if (a === 'next') go(1);
    else if (a === 'step') stepUp();
    else if (a === 'step-or-next') { if (step < maxStep()) stepUp(); else go(1); }
    else if (a === 'timer') { $('bp-ovt').classList.add('on'); tmPaint(); }
    else if (a === 'pick') { $('bp-ovp').classList.add('on'); pkPaint(); }
    else if (a === 'curtain') {
      var c = $('bp-curtain'); c.classList.toggle('on');
      $('bp-cur').classList.toggle('on', c.classList.contains('on'));
    }
    else if (a === 'full') {
      if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {});
    }
    else if (a === 'home') menu();
    else if (a === 'more') $('bp-pop').classList.toggle('on');
  }

  /* ═════════ 타이머 ═════════ */
  var tmLeft = 180, tmId = null;
  function tmPaint() {
    var m = Math.floor(tmLeft / 60), s = tmLeft % 60;
    $('bp-tnum').textContent = m + ':' + String(s).padStart(2, '0');
    $('bp-tnum').style.color = tmLeft <= 10 ? '#ff5f6d' : (tmLeft <= 30 ? '#ffd166' : '#eef3fb');
  }
  function tmSet(min) { tmLeft = min * 60; tmPaint(); tmRun(true); }
  function tmRun(on) {
    if (tmId) { clearInterval(tmId); tmId = null; }
    if (on) {
      tmId = setInterval(function () {
        tmLeft = Math.max(0, tmLeft - 1); tmPaint();
        if (tmLeft === 0) { clearInterval(tmId); tmId = null; $('bp-tsub').textContent = '⏰ 시간 종료'; $('bp-ttog').textContent = '▶ 시작'; }
      }, 1000);
      $('bp-tsub').textContent = '남은 시간';
    }
    $('bp-ttog').textContent = tmId ? '⏸ 멈춤' : '▶ 시작';
  }

  /* ═════════ 번호 뽑기 (한 번 뽑힌 번호는 다시 안 나온다) ═════════ */
  var pkMax = 30, pkUsed = [];
  function pkPaint() {
    $('bp-psub').textContent = '1 ~ ' + pkMax + '번 · 남은 번호 ' + (pkMax - pkUsed.length) + '명';
    $('bp-plog').textContent = pkUsed.length ? ('뽑힌 번호: ' + pkUsed.join(', ')) : '';
  }
  function pkGo() {
    var pool = [];
    for (var n = 1; n <= pkMax; n++) if (pkUsed.indexOf(n) < 0) pool.push(n);
    if (!pool.length) { $('bp-pnum').textContent = '끝'; return; }
    var t = 0;
    var spin = setInterval(function () {
      $('bp-pnum').textContent = pool[Math.floor(Math.random() * pool.length)];
      if (++t > 13) {
        clearInterval(spin);
        var p = pool[Math.floor(Math.random() * pool.length)];
        $('bp-pnum').textContent = p; pkUsed.push(p); pkPaint();
      }
    }, 70);
  }

  /* ═════════ 메뉴 ═════════ */
  function menu() {
    setTool('none');
    $('bp-bar').hidden = true;
    $('bp-pop').classList.remove('on');
    $('bp-curtain').classList.remove('on');
    $('bp-cur').classList.remove('on');
    strokes = []; redraw();
    /* 메뉴는 위를 덮을 뿐이라 앞 슬라이드가 그대로 뒤에 남는다.
       남겨 두면 그 안의 빈칸·보기가 메뉴 칸과 자리를 다투므로 비운다. */
    $('bp-in').innerHTML = '';
    $('bp-in').className = '';
    $('bp-u').textContent = ''; $('bp-t').textContent = ''; $('bp-i').textContent = '';
    $('bp-menu').classList.add('on');
    relayout();
  }

  function start(k) {
    var m = opts.menu[k]; if (!m) return;
    var run = m.run || {};
    mode = run.kind || 'lesson';
    deck = run.deck || [];
    i = 0; step = 0;
    $('bp-menu').classList.remove('on');
    $('bp-bar').hidden = false;
    fit(); render(); relayout();
  }

  function total() { return mode === 'blank' ? 1 : deck.length; }
  function maxStep() { return mode === 'lesson' ? 3 : (mode === 'quiz' ? 1 : 0); }

  function figHtml(s) {
    if (opts.fig) { var h = opts.fig(s); if (h) return '<div class="bp-fig">' + h + '</div>'; }
    if (s.svg) return '<div class="bp-fig">' + s.svg + '</div>';
    if (s.img) return '<div class="bp-fig"><img src="' + s.img + '" alt=""></div>';
    return '';
  }

  function render() {
    var inn = $('bp-in');
    if (mode === 'blank') {
      $('bp-u').textContent = ''; $('bp-t').textContent = '빈 칠판'; $('bp-i').textContent = '';
      inn.className = '';
      inn.innerHTML = '<div style="flex:1;display:flex;align-items:center;justify-content:center;' +
        'color:#26303f;font-size:clamp(17px,1.9vw,32px);font-weight:800">✏️ 펜을 눌러 판서를 시작하세요</div>';
      setBtn('—', true); return;
    }
    var s = deck[i]; if (!s) return;

    if (mode === 'quiz') {
      inn.className = '';
      $('bp-u').textContent = s.src || '';
      $('bp-t').textContent = '문제 ' + (i + 1);
      $('bp-i').textContent = (i + 1) + ' / ' + total();
      inn.innerHTML =
        '<div class="bp-q">' + s.q + '</div>' +
        (s.img ? '<div class="bp-fig"><img src="' + s.img + '" alt=""></div>' : '') +
        '<div class="bp-opts">' + (s.o || []).map(function (o, k) {
          return '<div class="bp-opt ' + (step >= 1 ? (k === s.a ? 'ok' : 'dim') : '') + '">' +
                 '<span class="n">' + (k + 1) + '</span><span>' + o + '</span></div>';
        }).join('') + '</div>' +
        '<div class="bp-exp ' + (step < 1 ? 'bp-veil' : '') + '">' + (s.e || '') + '</div>';
      setBtn(step < 1 ? '✅ 정답 공개' : '✔ 공개됨', step >= 1);
    } else {
      inn.className = step >= 2 ? 'compact' : '';
      $('bp-u').textContent = s.u || '';
      $('bp-t').textContent = s.t || '';
      $('bp-i').textContent = (i + 1) + ' / ' + total();
      inn.innerHTML =
        figHtml(s) +
        (s.cap ? '<div class="bp-cap">' + s.cap + '</div>' : '') +
        '<ul class="bp-pts">' + (s.pts || []).map(function (p) {
          return '<li>' + blanks(p) + '</li>';
        }).join('') + '</ul>' +
        (s.ask ? '<div class="bp-ask ' + (step < 1 ? 'bp-veil' : '') + '">💭 ' + s.ask + '</div>' : '') +
        (s.ansq ? '<div class="' + (step < 2 ? 'bp-veil' : '') + '" style="flex-shrink:0">' +
          '<div class="bp-q" style="margin-bottom:9px">🎯 ' + s.ansq + '</div>' +
          '<div class="bp-opts">' + (s.anso || []).map(function (o, k) {
            return '<div class="bp-opt ' + (step >= 3 ? (k === s.ansa ? 'ok' : 'dim') : '') + '">' +
                   '<span class="n">' + (k + 1) + '</span><span>' + o + '</span></div>';
          }).join('') + '</div></div>' : '') +
        (s.anse ? '<div class="bp-exp ' + (step < 3 ? 'bp-veil' : '') + '">' + s.anse + '</div>' : '');
      setBtn(stepLabel(s), step >= 3);
    }
    $('bp-body').scrollTop = 0;
    /* 도구바는 #bp 안이 아니라 형제다(화면 맨 아래 고정). 문서 전체에서 찾는다.
       버튼이 「⋯」 팝업으로 옮겨가 있을 수도 있으므로 더 그렇다. */
    var pv = barBtn('prev'); if (pv) pv.disabled = (i === 0 && step === 0);
    var nx = barBtn('next'); if (nx) nx.disabled = (i >= total() - 1);
  }

  /* [다음] 이 실제로 무엇을 여는지 그대로 적는다 — 없는 것을 열겠다고 하면 안 된다 */
  function stepLabel(s) {
    if (step >= 3) return '✔ 다 열림';
    if (step < 1 && s.ask) return '💭 발문';
    if (step < 2 && s.ansq) return '🎯 퀴즈';
    if (s.anse || s.ansq) return '✅ 정답';
    return '✔ 다 열림';
  }
  /* 도구바 단추 찾기 — 「⋯」 팝업으로 옮겨져 있을 수 있어 두 곳을 다 본다 */
  function barBtn(a) {
    return document.querySelector('#bp-bar [data-a="' + a + '"]') ||
           document.querySelector('#bp-pop [data-a="' + a + '"]');
  }
  function setBtn(txt, dis) {
    var b = barBtn('step');
    if (!b) return;
    b.textContent = txt; b.disabled = !!dis;
  }
  function stepUp() { if (step < maxStep()) { step++; render(); } }
  function go(d) {
    if (mode === 'blank') return;
    var n = total(); if (!n) return;
    i = clamp(i + d, 0, n - 1); step = 0; render();
  }

  /* ═════════ 열고 닫기 ═════════ */
  function open(o) {
    opts = o || {};
    build();
    root.hidden = false;
    document.body.classList.add('bp-open');
    $('bp-menu').querySelector('h1').textContent = opts.title || '🖥️ 전자칠판 수업';
    $('bp-menu').querySelector('p').innerHTML = opts.sub || '';
    $('bp-grid').innerHTML = (opts.menu || []).map(function (m, k) {
      return '<button type="button" class="bp-card' + (m.wide ? ' wide' : '') + '" data-k="' + k + '">' +
        (m.icon ? '<div class="ic">' + m.icon + '</div>' : '') +
        '<div class="tt">' + esc(m.title) + '</div>' +
        (m.desc ? '<div class="ds">' + m.desc + '</div>' : '') + '</button>';
    }).join('');
    fit();
    menu();
  }

  function close() {
    if (!root) return;
    if (tmId) { clearInterval(tmId); tmId = null; }
    setTool('none');
    strokes = []; redraw();
    root.hidden = true;
    $('bp-bar').hidden = true;
    $('bp-pop').classList.remove('on');
    $('bp-menu').classList.remove('on');
    $('bp-curtain').classList.remove('on');
    Array.prototype.forEach.call(document.querySelectorAll('.bp-ov'), function (o) { o.classList.remove('on'); });
    document.body.classList.remove('bp-open');
    if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
    if (opts && opts.onClose) opts.onClose();
  }

  global.BoardPro = { open: open, close: close, menu: menu };
})(window);
