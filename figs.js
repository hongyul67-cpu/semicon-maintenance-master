/* ══════════════════════════════════════════════════════════════
   반도체설비보전 마스터 — 그림 모음 (그림19 · 2026-09-30)
   공용 그리기 도우미 links/fig.js 를 쓴다. index.html(배우기) · lesson.js(수업 슬라이드)가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', cards:['배우기 카드 제목'…], draw:function(){ … } }
       cards — index.html 의 CHAPTERS 카드 h 와 **똑같이**. 그 카드 본문 아래에 그림이 나온다
     순서 = 같은 카드 안에서 그림이 나오는 순서.

   그림 내용은 배우기 카드(index.html CHAPTERS) 본문을 옮긴 것이다. 카드에 없는 수치는 넣지 않았다.
   교재(크라운 기출문제집 이론편) 도해는 모양 확인용으로만 봤고 따라 그리지 않았다.
   카드 쪽의 교재 크롭 사진(fig:)은 암호 잠금이라 잠금 전에는 이 그림만 보인다.
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, callout = F.callout, path = F.path, poly = F.poly;

  /* ── 작은 도우미 ── */
  function ell(cx, cy, rx, ry, o) {
    o = o || {};
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + (o.fill || 'none') +
      '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w || 1.6) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + '/>';
  }
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 3) + '" fill="' + (c || C.ink) + '"/>'; }
  function rect(x, y, w, h, fill, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.r || 0) + '" fill="' + fill + '"' +
      (o.c ? ' stroke="' + o.c + '" stroke-width="' + (o.w || 1.4) + '"' : '') + (o.op != null ? ' opacity="' + o.op + '"' : '') + '/>';
  }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }
  /* 흐름 상자: 번호 + 이름 */
  function step(x, y, w, h, k, label, o) {
    o = o || {};
    return box(x, y, w, h, { fill: o.fill || C.grayL, c: o.c || C.line }) + (k ? F.num(x + 12, y + 2, k, { c: o.nc || o.c || C.blue, r: 10, size: 12 }) : '') +
      t(x + w / 2, y + h / 2 + 1, label, { a: 'm', b: 1, size: o.size || 15, halo: false, c: o.tc || C.ink, ans: o.ans });
  }
  function A(o) { var r = {}; for (var k in o) r[k] = o[k]; r.ans = 1; return r; }   /* 정답 이름표로 표시한 사본 */
  /* 실리콘 기판 (회색) */
  function si(x, y, w, h) { return rect(x, y, w, h, C.grayM); }
  var SI = '#d6d9de', OX = '#bfe3c8', PR = '#e9d5ff', METAL = '#fcd9a8';

  /* 복동 실린더 + 체크밸브 붙이 유량조절밸브 2 + 5/2 양솔 밸브 (KS B 0054 / ISO 1219 기호 관례)
     실기 도구(semicon-practical-master/figs.js)에도 같은 함수를 복사해 쓴다 */
  function CIRCUIT52() {
    var s = '';
    /* 실린더 */
    s += rect(140, 30, 190, 44, '#fff', { c: C.ink, w: 2 }) + rect(206, 32, 8, 40, C.ink) + rect(214, 46, 176, 12, '#fff', { c: C.ink, w: 1.6 });
    s += t(392, 34, '복동 실린더', { a: 'e', b: 1, size: 15 });
    /* 유량조절밸브 (체크밸브 붙이) — 체크밸브는 실린더 쪽으로만 자유롭게 흐른다 */
    function fcv(x) {
      var o = rect(x - 30, 94, 60, 64, 'none', { c: C.sub, w: 1 }).replace('/>', ' stroke-dasharray="5 4"/>');
      o += line(x, 74, x, 96, { w: 1.8 }) + line(x - 12, 96, x + 12, 96, { w: 1.8 }) + line(x - 12, 156, x + 12, 156, { w: 1.8 }) + line(x, 156, x, 178, { w: 1.8 });
      o += line(x - 12, 96, x - 12, 156, { w: 1.8 });
      o += path('M' + (x - 19) + ',112 Q' + (x - 11) + ',126 ' + (x - 19) + ',140', { w: 1.6 }) + path('M' + (x - 5) + ',112 Q' + (x - 13) + ',126 ' + (x - 5) + ',140', { w: 1.6 });
      o += arrow(x - 24, 144, x, 108, { w: 1.2, head: 7 });
      o += line(x + 12, 96, x + 12, 117, { w: 1.8 }) + line(x + 12, 133, x + 12, 156, { w: 1.8 });
      o += poly([[x + 4, 121], [x + 12, 133], [x + 20, 121]], { w: 1.6 }) + F.circle(x + 12, 123, 5, { fill: '#fff', c: C.ink, w: 1.6 });
      return o;
    }
    s += fcv(160) + fcv(310);
    /* 배관: 유량조절밸브 → 밸브 A·B */
    s += poly([[160, 178], [245, 178], [245, 190]], { w: 1.8 }) + poly([[310, 178], [275, 178], [275, 190]], { w: 1.8 });
    s += t(236, 170, 'A', { a: 'm', size: 13, b: 1, c: C.sub }) + t(284, 170, 'B', { a: 'm', size: 13, b: 1, c: C.sub });
    /* 5/2 밸브 — 오른쪽 칸이 지금 위치 */
    s += rect(170, 190, 60, 50, '#fff', { c: C.ink, w: 1.8 }) + rect(230, 190, 60, 50, '#fff', { c: C.ink, w: 1.8 });
    s += arrow(200, 236, 214, 194, { w: 1.3, head: 7 }) + arrow(185, 194, 179, 236, { w: 1.3, head: 7 }) + line(222, 240, 222, 232, { w: 1.3 }) + line(217, 232, 227, 232, { w: 1.3 });
    s += arrow(260, 236, 246, 194, { w: 1.3, head: 7 }) + arrow(275, 194, 281, 236, { w: 1.3, head: 7 }) + line(238, 240, 238, 232, { w: 1.3 }) + line(233, 232, 243, 232, { w: 1.3 });
    /* 솔레노이드 양쪽 */
    s += rect(152, 202, 18, 26, '#fff', { c: C.ink, w: 1.6 }) + line(152, 228, 170, 202, { w: 1.4 });
    s += rect(290, 202, 18, 26, '#fff', { c: C.ink, w: 1.6 }) + line(290, 228, 308, 202, { w: 1.4 });
    /* 공급 · 배기 */
    s += line(260, 240, 260, 262, { w: 1.8 }) + F.circle(260, 272, 10, { fill: '#fff', c: C.ink, w: 1.6 }) + poly([[254, 276], [260, 266], [266, 276]], { close: 1, w: 1.4 });
    s += line(238, 240, 238, 252, { w: 1.6 }) + poly([[232, 252], [244, 252], [238, 262]], { close: 1, w: 1.4 });
    s += line(282, 240, 282, 252, { w: 1.6 }) + poly([[276, 252], [288, 252], [282, 262]], { close: 1, w: 1.4 });
    s += t(276, 282, '공급', { size: 13, b: 1, ans: 1 }) + t(208, 262, '배기', { a: 'e', size: 13, c: C.sub });
    /* 이름표 */
    s += t(122, 118, '체크밸브 붙이\n유량조절밸브', { a: 'e', size: 13, b: 1, c: C.blue });
    s += t(144, 262, '솔레노이드', { a: 'e', size: 13 }) + line(146, 256, 158, 230, { c: C.sub, w: 1 });
    s += t(316, 214, '5포트 2위치\n방향제어밸브', { size: 13, b: 1 });
    /* 미터 아웃 — 실린더에서 나가는 공기는 조임쪽으로만 */
    s += arrow(352, 100, 352, 152, { c: C.orange, w: 2, head: 9 });
    s += t(362, 116, '나가는 공기를', { size: 13, b: 1, c: C.orange }) + t(362, 134, '조인다', { size: 13, b: 1, c: C.orange }) + t(362, 152, '(미터 아웃)', { size: 13, c: C.orange });
    return F.svg(480, 296, s);
  }

  return {

  /* ═══════════ 1단원 · 반도체와 팹 ═══════════ */
  wafer: { cards: ['웨이퍼 — 모든 것이 시작되는 원판'],
    cap: '잉곳을 얇게 썰고(절단) 거울처럼 갈면(연마) 웨이퍼 — 지름이 클수록 한 장에서 칩이 많이 나온다',
    draw: function () {
      var s = '';
      /* 잉곳 */
      s += path('M40,70 L40,180 A30,10 0 0 0 100,180 L100,70', { fill: SI, w: 1.8 }) + ell(70, 70, 30, 10, { fill: '#e8eaed', w: 1.8 });
      s += t(70, 206, '잉곳', { a: 'm', b: 1 }) + t(70, 228, '초크랄스키법', { a: 'm', size: 13, c: C.sub });
      /* 절단 */
      s += arrow(110, 125, 150, 125) + t(130, 106, '절단', { a: 'm', size: 14, b: 1, c: C.blue });
      for (var i = 0; i < 4; i++) s += ell(180 + i * 9, 125, 8, 30, { fill: '#e8eaed', w: 1.4 });
      s += t(193, 206, '얇은 원판', { a: 'm', size: 14 });
      /* 연마 */
      s += arrow(222, 125, 262, 125) + t(242, 106, '연마', { a: 'm', size: 14, b: 1, c: C.blue });
      /* 웨이퍼 — 300mm 와 200mm 크기 비교, 칩 격자 */
      var cx = 350, cy = 118, R = 62;
      s += '<clipPath id="wf19"><circle cx="' + cx + '" cy="' + cy + '" r="' + (R - 3) + '"/></clipPath>';
      s += F.circle(cx, cy, R, { fill: C.blueL, c: C.blue, w: 2 });
      var g = '';
      for (var gx = cx - R; gx < cx + R; gx += 13) for (var gy = cy - R; gy < cy + R; gy += 13) g += rect(gx + 1, gy + 1, 11, 11, '#fff', { c: C.blue, w: 0.6 });
      s += '<g clip-path="url(#wf19)" opacity=".9">' + g + '</g>';
      s += F.circle(cx, cy, R * 2 / 3, { fill: 'none', c: C.orange, w: 2 });
      s += callout(cx + 4, cy + 4, 440, 60, '칩', { c: C.ink });
      s += t(cx, 206, '300 mm (12인치)', { a: 'm', b: 1, c: C.blue }) + t(cx, 228, '주황 원 = 200 mm (8인치)', { a: 'm', size: 13, c: C.orange });
      return F.svg(480, 246, s);
    } },

  cleanroom: { cards: ['클린룸 — 사람이 제일 더럽다'],
    cap: '클린룸 — 천장 필터에서 바닥으로 공기를 곧게 내리고(수직층류), 실내를 바깥보다 높은 압력(양압)으로 유지한다',
    draw: function () {
      var s = '';
      /* 방 */
      s += rect(60, 40, 330, 190, '#f8fbff', { c: C.ink, w: 2.2 });
      /* 천장 필터 */
      s += rect(60, 40, 330, 20, C.blueL, { c: C.blue, w: 1.6 });
      for (var x = 70; x < 390; x += 14) s += line(x, 43, x, 57, { c: C.blue, w: 0.8 });
      s += t(225, 26, 'ULPA · HEPA 필터', { a: 'm', b: 1, c: C.blue, ans: 1 });
      /* 수직층류 */
      for (var k = 0; k < 7; k++) {
        var ax = 90 + k * 45;
        if (ax > 170 && ax < 290) { s += arrow(ax, 68, ax, 118, { c: C.blue, w: 1.6, head: 9, flow: true }); continue; }
        s += arrow(ax, 68, ax, 196, { c: C.blue, w: 1.6, head: 9, flow: true });
      }
      /* 장비 */
      s += box(170, 128, 120, 62, { fill: C.grayL, c: C.ink, label: '공정 장비', size: 15 });
      /* 바닥 그레이팅 */
      s += rect(60, 206, 330, 10, C.grayL, { c: C.ink, w: 1.4 });
      for (x = 66; x < 390; x += 12) s += rect(x, 208, 6, 6, '#fff');
      s += arrow(120, 214, 120, 244, { c: C.sub, w: 1.6, head: 9 }) + arrow(330, 214, 330, 244, { c: C.sub, w: 1.6, head: 9 });
      s += t(225, 240, '바닥으로 빠져 다시 필터로 순환', { a: 'm', size: 13, c: C.sub });
      /* 양압 */
      s += t(225, 94, '수직층류', { a: 'm', b: 1, c: C.blue, size: 15 });
      s += t(436, 92, '양압 (+)', { a: 'm', b: 1, c: C.red, ans: 1 });
      s += arrow(392, 120, 452, 120, { c: C.red, w: 2 }) + t(436, 142, '문틈 공기는', { a: 'm', size: 13, c: C.red }) + t(436, 159, '밖으로만', { a: 'm', size: 13, c: C.red });
      s += t(26, 120, '약\n23℃\n45%', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 256, s);
    } },

  process8: { cards: ['전공정과 후공정', '순서부터 통째로'],
    cap: '반도체 8대 공정 — 가운데 포토 → 식각 → 증착 묶음이 수십 번 반복되며 회로를 층층이 쌓는다',
    draw: function () {
      var s = '', W = 100, H = 50, X = [16, 132, 248, 364], y1 = 44, y2 = 150;
      var fe = { fill: C.blueL, c: C.blue }, be = { fill: C.orangeL, c: C.orange, nc: C.orange }, wf = { fill: C.grayL, c: C.sub, nc: C.sub };
      s += step(X[0], y1, W, H, 1, '웨이퍼 제조', wf) + step(X[1], y1, W, H, 2, '산화', fe) + step(X[2], y1, W, H, 3, '포토', A(fe)) + step(X[3], y1, W, H, 4, '식각', fe);
      s += step(X[3], y2, W, H, 5, '증착·\n이온주입', { fill: C.blueL, c: C.blue, size: 14 }) + step(X[2], y2, W, H, 6, '금속배선', fe) +
        step(X[1], y2, W, H, 7, 'EDS', be) + step(X[0], y2, W, H, 8, '패키징', A(be));
      s += arrow(116, 69, 131, 69, { head: 8, w: 1.8 }) + arrow(232, 69, 247, 69, { head: 8, w: 1.8 }) + arrow(348, 69, 363, 69, { head: 8, w: 1.8 });
      s += arrow(430, 94, 430, 149, { head: 8, w: 1.8 });
      s += arrow(363, 175, 349, 175, { head: 8, w: 1.8 }) + arrow(247, 175, 233, 175, { head: 8, w: 1.8 }) + arrow(131, 175, 117, 175, { head: 8, w: 1.8 });
      /* 반복 고리 */
      s += F.route([[392, 150], [392, 122], [298, 122], [298, 96]], { c: C.orange, w: 2.2, head: 10 });
      s += t(345, 108, '수십 번 반복', { a: 'm', size: 14, b: 1, c: C.orange, ans: 1 });
      s += t(60, 20, '웨이퍼 한 장이 칩이 되기까지', { size: 15, b: 1, c: C.sub, a: 's' });
      /* 범례 */
      s += rect(30, 222, 16, 16, C.blueL, { c: C.blue, r: 3 }) + t(52, 230, '전공정 — 웨이퍼 위에 회로', { size: 14 });
      s += rect(262, 222, 16, 16, C.orangeL, { c: C.orange, r: 3 }) + t(284, 230, '후공정 — 검사·절단·포장', { size: 14 });
      return F.svg(480, 254, s.replace('<text x="60"', '<text x="16"'));
    } },

  /* ═══════════ 2단원 · 8대 공정 ═══════════ */
  oxide: { cards: ['① 산화 — 보호막이자 절연막'],
    cap: '산화 — 800~1200℃ 에서 실리콘 표면을 산화막(SiO₂)으로 키운다. 건식은 얇고 치밀, 습식은 빠르고 두껍다',
    draw: function () {
      var s = divider(240, 20, 230);
      function side(x0, gas, th, name, use, col) {
        var o = t(x0 + 100, 30, name, { a: 'm', b: 1, size: 17, c: col });
        for (var k = 0; k < 5; k++) o += arrow(x0 + 30 + k * 35, 52, x0 + 30 + k * 35, 84, { c: col, w: 1.6, head: 9 });
        o += t(x0 + 100, 100, gas, { a: 'm', b: 1, size: 15, c: col });
        o += rect(x0 + 10, 120, 180, th, OX, { c: C.green, w: 1.4 }) + rect(x0 + 10, 120 + th, 180, 50, SI, { c: C.sub, w: 1.2 });
        o += t(x0 + 100, 120 + th / 2 + 1, 'SiO₂', { a: 'm', size: th > 20 ? 15 : 13, b: 1, c: C.green, halo: false });
        o += t(x0 + 100, 145 + th, '실리콘(Si)', { a: 'm', size: 14, c: C.sub, halo: false });
        o += t(x0 + 100, 214, use, { a: 'm', size: 14 });
        return o;
      }
      s += side(20, 'O₂ (산소)', 12, '건식 산화', '느리지만 얇고 치밀', C.blue);
      s += side(260, 'H₂O (수증기)', 32, '습식 산화', '빠르고 두껍게', C.orange);
      s += t(120, 234, '→ 게이트 산화막', { a: 'm', size: 13, c: C.sub }) + t(360, 234, '→ 소자 사이 절연막', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 250, s);
    } },

  photo3: { cards: ['② 포토 — 회로를 사진처럼 찍는다', '감광액(PR)과 마스크'],
    cap: '노광과 현상 — 마스크 틈으로 빛을 받은 감광액(PR)이 양성은 녹아 없어지고, 음성은 남는다',
    draw: function () {
      var s = '';
      /* 빛 */
      for (var x = 112; x <= 368; x += 32) s += arrow(x, 20, x, 48, { c: C.purple, w: 1.6, head: 8 });
      s += t(92, 32, '빛', { a: 'e', b: 1, c: C.purple });
      /* 마스크 */
      s += rect(100, 54, 280, 12, '#eef6ff', { c: C.blue, w: 1 });
      var chrome = [[100, 160], [200, 280], [320, 380]], open = [[160, 200], [280, 320]];
      chrome.forEach(function (c) { s += rect(c[0], 54, c[1] - c[0], 12, C.ink); });
      s += t(92, 60, '마스크', { a: 'e', b: 1 });
      open.forEach(function (o) { s += arrow(o[0] + 12, 72, o[0] + 12, 104, { c: C.purple, w: 1.6, head: 8 }) + arrow(o[1] - 12, 72, o[1] - 12, 104, { c: C.purple, w: 1.6, head: 8 }); });
      /* PR + 웨이퍼 */
      s += rect(100, 108, 280, 14, PR, { c: C.purple, w: 1 });
      open.forEach(function (o) { s += rect(o[0], 108, o[1] - o[0], 14, C.purple, { op: 0.55 }); });
      s += rect(100, 122, 280, 16, SI, { c: C.sub, w: 1 });
      s += t(92, 115, '감광액(PR)', { a: 'e', b: 1, c: C.purple, size: 15 }) + t(92, 132, '웨이퍼', { a: 'e', size: 14, c: C.sub });
      s += t(392, 115, '빛 받은 곳', { size: 13, c: C.purple, b: 1 });
      /* 현상 */
      s += arrow(240, 146, 240, 170, { w: 1.8, head: 9 }) + t(252, 158, '현상', { b: 1, size: 15 });
      function res(x0, keepOpen, title, sub, col) {
        var o = t(x0 + 84, 190, title, { a: 'm', b: 1, c: col, size: 16 }) + t(x0 + 84, 210, sub, { a: 'm', size: 13, c: C.sub });
        var k = 0.6, list = keepOpen ? open : chrome;
        o += rect(x0, 244, 168, 14, SI, { c: C.sub, w: 1 });
        list.forEach(function (c) { o += rect(x0 + (c[0] - 100) * k, 232, (c[1] - c[0]) * k, 12, keepOpen ? C.purple : PR, { c: C.purple, w: 1, op: keepOpen ? 0.7 : 1 }); });
        return o;
      }
      s += res(40, false, '양성 (Positive)', '빛 받은 곳이 녹아 없어짐', C.blue);
      s += res(272, true, '음성 (Negative)', '빛 받은 곳이 남음', C.orange);
      s += t(124, 276, '마스크와 같은 모양 · 주류', { a: 'm', size: 13, b: 1, c: C.blue }) + t(356, 276, '마스크와 반대 모양', { a: 'm', size: 13, b: 1, c: C.orange });
      return F.svg(480, 292, s);
    } },

  etchprof: { cards: ['③ 식각 — 필요 없는 곳을 깎는다', '습식 식각과 안전'],
    cap: '식각 단면 — 습식은 옆으로도 파여(등방성) 마스크 밑이 파먹히고(언더컷), 건식은 아래로만 곧게 판다(이방성)',
    draw: function () {
      var s = divider(240, 16, 226);
      function base(x0) {
        return rect(x0, 90, 190, 50, OX, { c: C.green, w: 1.2 }) + rect(x0, 140, 190, 26, SI, { c: C.sub, w: 1 });
      }
      /* 습식 */
      s += t(115, 28, '습식 — 등방성', { a: 'm', b: 1, size: 17, c: C.blue });
      s += base(20) + path('M75,90 A40,40 0 0 0 155,90 Z', { fill: '#fff', c: C.green, w: 1.2 });
      s += rect(20, 80, 75, 10, PR, { c: C.purple, w: 1 }) + rect(135, 80, 75, 10, PR, { c: C.purple, w: 1 });
      [[115, 104, 115, 122], [115, 104, 90, 110], [115, 104, 140, 110]].forEach(function (a) { s += arrow(a[0], a[1], a[2], a[3], { c: C.blue, w: 1.4, head: 7 }); });
      s += callout(82, 95, 40, 60, '언더컷', { c: C.red, tc: C.red, b: 1, a: 'm' });
      s += t(115, 192, '옆으로도 파인다', { a: 'm', size: 15 }) + t(115, 214, '미세 패턴에 불리', { a: 'm', size: 13, c: C.sub });
      /* 건식 */
      s += t(355, 28, '건식(플라즈마) — 이방성', { a: 'm', b: 1, size: 17, c: C.orange });
      s += base(260) + rect(335, 90, 40, 50, '#fff');
      s += line(335, 90, 335, 140, { c: C.green, w: 1.2 }) + line(375, 90, 375, 140, { c: C.green, w: 1.2 });
      s += rect(260, 80, 75, 10, PR, { c: C.purple, w: 1 }) + rect(375, 80, 75, 10, PR, { c: C.purple, w: 1 });
      for (var k = 0; k < 3; k++) s += arrow(343 + k * 12, 44, 343 + k * 12, 72, { c: C.orange, w: 1.6, head: 8 });
      s += callout(300, 84, 300, 56, '마스크(PR)', { c: C.purple, tc: C.purple, a: 'm' });
      s += t(355, 192, '아래로만 곧게 판다', { a: 'm', size: 15 }) + t(355, 214, '현재 주류', { a: 'm', size: 13, c: C.sub });
      s += t(462, 115, '막', { a: 'm', size: 14, c: C.green, b: 1 }) + t(462, 153, 'Si', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 236, s);
    } },

  depimpl: { cards: ['④ 증착과 이온주입 — 쌓고, 심는다'],
    cap: '증착은 웨이퍼 위에 막을 쌓고, 이온주입은 불순물 이온을 실리콘 속에 박아 성질을 바꾼다',
    draw: function () {
      var s = divider(240, 16, 230);
      /* 증착 */
      s += t(120, 28, '증착 — 위에 쌓는다', { a: 'm', b: 1, size: 17, c: C.blue });
      for (var k = 0; k < 9; k++) s += dot(50 + k * 18, 60 + (k % 3) * 14, 5, C.blue);
      for (k = 0; k < 4; k++) s += arrow(66 + k * 38, 70, 66 + k * 38, 106, { c: C.blue, w: 1.4, head: 7 });
      s += rect(30, 112, 180, 16, C.blueL, { c: C.blue, w: 1.4 }) + rect(30, 128, 180, 50, SI, { c: C.sub, w: 1 });
      s += t(120, 121, '새 막', { a: 'm', size: 13, b: 1, c: C.blue, halo: false }) + t(120, 155, '실리콘', { a: 'm', size: 14, c: C.sub, halo: false });
      s += t(120, 202, 'CVD · PVD · ALD', { a: 'm', size: 15, b: 1 });
      /* 이온주입 */
      s += t(360, 28, '이온주입 — 속에 심는다', { a: 'm', b: 1, size: 17, c: C.orange });
      s += rect(270, 100, 40, 12, PR, { c: C.purple, w: 1 }) + rect(410, 100, 40, 12, PR, { c: C.purple, w: 1 });
      for (k = 0; k < 4; k++) s += arrow(325 + k * 23, 48, 325 + k * 23, 104, { c: C.orange, w: 1.6, head: 8 });
      s += rect(270, 112, 180, 66, SI, { c: C.sub, w: 1 });
      [[322, 128], [340, 140], [360, 126], [378, 144], [396, 132], [332, 150], [368, 154], [390, 150]].forEach(function (p) { s += dot(p[0], p[1], 4, C.orange); });
      s += callout(290, 106, 250, 72, '마스크', { c: C.purple, tc: C.purple, a: 'm' });
      s += t(360, 202, 'N형: 인(P)·비소(As)  P형: 붕소(B)', { a: 'm', size: 13 });
      s += t(360, 222, '박은 뒤 어닐링으로 결정 회복', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 240, s);
    } },

  pkgflow: { cards: ['⑤ 금속배선 → EDS → 패키징', '조립공정 전체 순서'],
    cap: '조립(패키징) 순서 — 얇게 갈고, 붙이고, 자르고, 칩을 올려 선으로 잇고, 감싸고, 표시하고, 단자를 달아 시험한다',
    draw: function () {
      var s = '', W = 146, H = 72, X = [10, 167, 324], Y = [16, 104, 192];
      var names = ['백그라인딩', '마운팅', '다이싱', '다이 본딩', '와이어 본딩', '몰딩', '마킹', '솔더볼·분리', '최종 테스트'];
      /* 뱀 모양 순서: 1행 →, 2행 ←, 3행 → */
      var pos = [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1], [0, 1], [0, 2], [1, 2], [2, 2]];
      function icon(i, x, y) {
        var o = '', cx = x + 30, cy = y + 40;
        if (i === 0) { o += rect(cx - 22, cy + 6, 44, 6, SI, { c: C.sub, w: 1 }) + F.circle(cx, cy - 10, 13, { fill: C.grayM, c: C.ink, w: 1.2 }) + arrow(cx + 20, cy - 16, cx + 20, cy - 2, { head: 6, w: 1.2, c: C.red }); }
        if (i === 1) { o += F.circle(cx, cy, 20, { fill: 'none', c: C.ink, w: 1.6 }) + F.circle(cx, cy, 13, { fill: C.blueL, c: C.blue, w: 1.2 }); }
        if (i === 2) { o += rect(cx - 22, cy + 4, 44, 8, SI, { c: C.sub, w: 1 }) + F.circle(cx, cy - 10, 12, { fill: '#fff', c: C.ink, w: 1.2 }) + line(cx, cy + 2, cx, cy + 12, { c: C.red, w: 1.6 }); }
        if (i === 3) { o += rect(cx - 22, cy + 6, 44, 6, C.grayM) + rect(cx - 10, cy - 2, 20, 8, C.blueL, { c: C.blue, w: 1 }) + arrow(cx, cy - 20, cx, cy - 4, { head: 6, w: 1.2 }); }
        if (i === 4) { o += rect(cx - 22, cy + 6, 44, 6, C.grayM) + rect(cx - 8, cy - 2, 16, 8, C.blueL, { c: C.blue, w: 1 }) + path('M' + (cx - 6) + ',' + (cy - 2) + ' Q' + (cx - 16) + ',' + (cy - 16) + ' ' + (cx - 20) + ',' + (cy + 6), { c: C.orange, w: 1.4 }) + path('M' + (cx + 6) + ',' + (cy - 2) + ' Q' + (cx + 16) + ',' + (cy - 16) + ' ' + (cx + 20) + ',' + (cy + 6), { c: C.orange, w: 1.4 }); }
        if (i === 5) { o += rect(cx - 22, cy + 6, 44, 6, C.grayM) + rect(cx - 18, cy - 10, 36, 16, '#374151', { r: 3 }); }
        if (i === 6) { o += rect(cx - 18, cy - 8, 36, 18, '#374151', { r: 3 }) + line(cx - 10, cy + 1, cx + 8, cy + 1, { c: '#fff', w: 1.4 }) + line(cx + 14, cy - 24, cx + 4, cy - 6, { c: C.red, w: 1.6 }); }
        if (i === 7) { o += rect(cx - 18, cy - 10, 36, 14, '#374151', { r: 3 }); for (var b = 0; b < 4; b++) o += dot(cx - 13 + b * 9, cy + 8, 3.6, C.sub); }
        if (i === 8) { o += rect(cx - 20, cy - 4, 40, 14, C.grayL, { c: C.ink, w: 1.2 }) + rect(cx - 11, cy - 12, 22, 10, '#374151', { r: 2 }) + t(cx + 14, cy - 20, '✓', { size: 16, b: 1, c: C.green, halo: false }); }
        return o;
      }
      for (var i = 0; i < 9; i++) {
        var x = X[pos[i][0]], y = Y[pos[i][1]];
        s += box(x, y, W, H, { fill: i < 3 ? C.grayL : (i < 6 ? C.blueL : C.orangeL), c: i < 3 ? C.sub : (i < 6 ? C.blue : C.orange), w: 1.2 });
        s += F.num(x + 12, y + 12, i + 1, { c: i < 3 ? C.sub : (i < 6 ? C.blue : C.orange), r: 10, size: 12 });
        s += icon(i, x + 8, y) + t(x + 104, y + H / 2 + 2, names[i].replace('·', '·\n'), { a: 'm', b: 1, size: 14, halo: false });
      }
      /* 칸 사이 화살표 */
      s += arrow(157, 52, 166, 52, { head: 7, w: 1.6 }) + arrow(314, 52, 323, 52, { head: 7, w: 1.6 }) + arrow(397, 89, 397, 103, { head: 7, w: 1.6 });
      s += arrow(323, 140, 314, 140, { head: 7, w: 1.6 }) + arrow(166, 140, 157, 140, { head: 7, w: 1.6 }) + arrow(83, 177, 83, 191, { head: 7, w: 1.6 });
      s += arrow(157, 228, 166, 228, { head: 7, w: 1.6 }) + arrow(314, 228, 323, 228, { head: 7, w: 1.6 });
      return F.svg(480, 276, s);
    } },

  /* ═══════════ 3단원 · 사진 공정 심화 ═══════════ */
  photo8: { cards: ['포토 공정 전체 순서 8단계'],
    cap: '포토 8단계 — 베이크(굽기)가 세 번 나온다. 검사에서 불량이면 PR만 벗겨 다시 한다(리워크)',
    draw: function () {
      var s = '', W = 104, H = 56, X = [12, 128, 244, 360], y1 = 30, y2 = 150;
      var names = ['HMDS', 'PR 도포', '소프트\n베이크', '정렬', '노광', 'PEB', '현상', '하드 베이크\n·검사'];
      var bake = { 2: 1, 5: 1, 7: 1 };
      for (var i = 0; i < 8; i++) {
        var row = i < 4 ? 0 : 1, col = row ? 7 - i : i, x = X[col], y = row ? y2 : y1;
        var o = bake[i] ? { fill: C.orangeL, c: C.orange, nc: C.orange, size: 14 } : { fill: C.blueL, c: C.blue, size: 15 };
        s += step(x, y, W, H, i + 1, names[i], o);
      }
      s += arrow(117, 58, 127, 58, { head: 7, w: 1.6 }) + arrow(233, 58, 243, 58, { head: 7, w: 1.6 }) + arrow(349, 58, 359, 58, { head: 7, w: 1.6 });
      s += arrow(412, 87, 412, 149, { head: 8, w: 1.6 });
      s += arrow(359, 178, 349, 178, { head: 7, w: 1.6 }) + arrow(243, 178, 233, 178, { head: 7, w: 1.6 }) + arrow(127, 178, 117, 178, { head: 7, w: 1.6 });
      /* 리워크 */
      s += F.route([[40, 149], [40, 118], [180, 118], [180, 88]], { c: C.red, w: 1.8, dash: '6 4', head: 9 });
      s += t(110, 108, '불량 → 리워크', { a: 'm', size: 14, b: 1, c: C.red });
      s += rect(30, 224, 16, 16, C.orangeL, { c: C.orange, r: 3 }) + t(52, 232, '베이크 3번 — 소프트 · PEB · 하드', { size: 14, b: 1, c: C.orange });
      return F.svg(480, 254, s);
    } },

  wavelength: { cards: ['해상도 — 왜 파장을 줄이나'],
    cap: '광원 파장 — 파장 λ 가 짧을수록 더 가늘게 그린다(R = k₁·λ / NA). EUV 는 13.5nm',
    draw: function () {
      var s = '', rows = [['g-line', 436, '수은 램프'], ['i-line', 365, '수은 램프'], ['KrF', 248, '엑시머 레이저'], ['ArF', 193, '현재도 주력'], ['EUV', 13.5, '반사형 · 진공']];
      var k = 0.5, x0 = 96;
      for (var i = 0; i < rows.length; i++) {
        var y = 30 + i * 34, w = Math.max(6, rows[i][1] * k), col = i < 2 ? C.sub : (i < 4 ? C.blue : C.purple);
        s += t(x0 - 10, y + 10, rows[i][0], { a: 'e', b: 1, size: 15 });
        s += rect(x0, y, w, 20, col, { r: 4, op: i === 4 ? 1 : 0.8 });
        s += t(x0 + w + 8, y + 10, rows[i][1] + 'nm', { b: 1, size: 15, c: col });
        s += t(x0 + w + 72, y + 10, rows[i][2], { size: 13, c: C.sub });
      }
      s += arrow(34, 44, 34, 176, { c: C.purple, w: 2 }) + t(20, 110, '짧게', { a: 'm', size: 13, b: 1, c: C.purple }).replace('<text', '<text transform="rotate(-90 20 110)"');
      /* 식 */
      s += box(60, 206, 360, 44, { fill: C.grayL, c: C.line });
      s += t(240, 228, 'R = k₁ · λ / NA   ·   DOF = k₂ · λ / NA²', { a: 'm', b: 1, size: 16, halo: false });
      return F.svg(480, 264, s);
    } },

  /* ═══════════ 4단원 · 식각 심화 ═══════════ */
  selectivity: { cards: ['식각을 평가하는 네 가지 잣대'],
    cap: '선택비와 종횡비 — 막은 많이, 마스크는 적게 깎일수록(선택비↑) 좋고, 좁고 깊을수록(종횡비↑) 깎기 어렵다',
    draw: function () {
      var s = '';
      /* 단면 */
      s += rect(30, 96, 200, 90, OX, { c: C.green, w: 1.2 }) + rect(30, 186, 200, 22, SI, { c: C.sub, w: 1 });
      s += rect(110, 96, 40, 84, '#fff') + line(110, 96, 110, 180, { c: C.green, w: 1.2 }) + line(150, 96, 150, 180, { c: C.green, w: 1.2 }) + line(110, 180, 150, 180, { c: C.green, w: 1.2 });
      /* 마스크: 처음(점선) → 남은 것 */
      s += rect(30, 64, 80, 32, 'none', { c: C.purple, w: 1.2 }).replace('/>', ' stroke-dasharray="4 3"/>') + rect(150, 64, 80, 32, 'none', { c: C.purple, w: 1.2 }).replace('/>', ' stroke-dasharray="4 3"/>');
      s += rect(30, 82, 80, 14, PR, { c: C.purple, w: 1 }) + rect(150, 82, 80, 14, PR, { c: C.purple, w: 1 });
      s += F.dim(110, 64, 150, 64, '폭', { off: 16, size: 14 });
      s += F.dim(150, 96, 150, 180, '', { off: 26, side: -1 }) + t(196, 138, '깊이', { size: 14, b: 1, c: C.blue });
      s += callout(60, 72, 52, 36, '마스크도 조금 깎임', { c: C.red, tc: C.red, a: 's', size: 13 });
      s += t(70, 140, '막', { a: 'm', size: 15, c: C.green, b: 1 });
      /* 식 */
      s += box(262, 60, 204, 70, { fill: C.blueL, c: C.blue });
      s += t(364, 80, '선택비', { a: 'm', b: 1, c: C.blue, halo: false }) + t(364, 104, '막 식각률 ÷ 마스크 식각률', { a: 'm', size: 13, halo: false }) + t(364, 122, '클수록 좋다', { a: 'm', size: 13, b: 1, c: C.blue, halo: false });
      s += box(262, 146, 204, 70, { fill: C.orangeL, c: C.orange });
      s += t(364, 166, '종횡비', { a: 'm', b: 1, c: C.orange, halo: false }) + t(364, 190, '깊이 ÷ 폭', { a: 'm', size: 14, halo: false }) + t(364, 208, '클수록 깎기 어렵다', { a: 'm', size: 13, b: 1, c: C.orange, halo: false });
      return F.svg(480, 234, s);
    } },

  plasmaetch: { cards: ['건식 식각 장비의 속'],
    cap: '건식 식각 챔버 — 이온은 전기장을 따라 수직으로 때려(물리·이방성) 방향을 만들고, 라디칼은 화학 반응으로 속도와 선택비를 만든다',
    draw: function () {
      var s = '';
      s += rect(70, 36, 290, 204, '#f8fafc', { c: C.ink, w: 2.2, r: 6 });
      /* 가스 · 샤워헤드 */
      s += arrow(215, 8, 215, 44, { c: C.green, w: 2, head: 9 }) + t(228, 18, '공정 가스 (CF₄ 등)', { size: 14, b: 1, c: C.green });
      s += rect(96, 48, 238, 12, C.grayM, { c: C.ink, w: 1.2 });
      for (var x = 110; x < 330; x += 22) s += line(x, 60, x, 66, { c: C.sub, w: 1.4 });
      s += line(70, 54, 96, 54, { c: C.sub, w: 1.2 }) + t(38, 54, '상부\n전극',{ a: 'm', size: 13 });
      /* 플라즈마 */
      s += ell(215, 118, 118, 40, { fill: C.purpleL, c: C.purple, w: 1.2, dash: '5 4' });
      s += t(215, 88, '플라즈마', { a: 'm', b: 1, c: C.purple, size: 15 });
      /* 이온(수직) */
      [150, 200, 250].forEach(function (x) {
        s += F.circle(x, 112, 8, { fill: C.orangeL, c: C.orange, w: 1.2 }) + t(x, 112, '+', { a: 'm', size: 13, b: 1, c: C.orange, halo: false });
        s += arrow(x, 122, x, 176, { c: C.orange, w: 1.8, head: 8 });
      });
      /* 라디칼 */
      [[285, 120], [175, 140], [228, 146]].forEach(function (p, i) { s += dot(p[0], p[1], 4, C.green) + arrow(p[0], p[1], p[0] + [14, -12, 12][i], p[1] + [16, 20, 18][i], { c: C.green, w: 1.2, head: 6 }); });
      /* 웨이퍼 · 척 */
      s += rect(126, 180, 178, 6, C.blue) + rect(110, 186, 210, 16, C.grayM, { c: C.ink, w: 1.2 });
      s += line(70, 183, 126, 183, { c: C.blue, w: 1.2 }) + t(38, 183, '웨이퍼', { a: 'm', size: 14, b: 1, c: C.blue });
      s += callout(318, 196, 390, 200, '하부 전극(척)', { size: 13 });
      /* RF */
      s += line(215, 202, 215, 270, { c: C.ink, w: 1.6 }) + line(215, 270, 250, 270, { c: C.ink, w: 1.6 });
      s += box(250, 255, 120, 30, { fill: C.orangeL, c: C.orange, label: 'RF 13.56MHz', size: 14 });
      /* 배기 */
      s += arrow(100, 240, 100, 262, { c: C.sub, w: 1.8, head: 8 }) + t(114, 254, '진공 배기', { size: 13, c: C.sub });
      s += t(420, 100, '이온 → 수직', { a: 'm', size: 14, b: 1, c: C.orange }) + t(420, 120, '물리 · 이방성', { a: 'm', size: 13, c: C.orange });
      s += t(420, 146, '라디칼 → 반응', { a: 'm', size: 14, b: 1, c: C.green }) + t(420, 166, '화학 · 선택비', { a: 'm', size: 13, c: C.green });
      return F.svg(480, 296, s);
    } },

  epd: { cards: ['종점검출과 애싱'],
    cap: '종점검출(EPD) — 플라즈마 빛(OES)의 특정 파장 세기가 꺾이는 순간이 막이 뚫린 순간이다. 그 뒤 조금 더 깎는 것이 오버에치',
    draw: function () {
      var s = '', x0 = 70, y0 = 196, x1 = 450;
      s += arrow(x0, y0, x1, y0, { w: 1.6, head: 9 }) + arrow(x0, y0, x0, 30, { w: 1.6, head: 9 });
      s += t(x1, y0 + 20, '시간', { a: 'e', size: 14 }) + t(x0 + 10, 34, '빛 세기 (특정 파장)', { size: 14 });
      /* 신호 */
      s += path('M' + x0 + ',70 L260,70 C285,70 290,150 312,150 L' + (x1 - 20) + ',150', { c: C.blue, w: 2.6 });
      /* 종점 */
      s += line(300, 40, 300, y0, { c: C.red, w: 1.4, dash: '6 4' });
      s += t(300, 30, '종점(EPD)', { a: 'm', b: 1, c: C.red, size: 15 });
      s += rect(300, 158, 70, 36, C.orangeL, { op: 0.9 }) + t(335, 176, '오버에치', { a: 'm', size: 13, b: 1, c: C.orange, halo: false });
      s += t(170, 56, '막을 깎는 중', { a: 'm', size: 14 }) + t(380, 132, '아래층이 드러남', { a: 'm', size: 14 });
      s += t(240, 226, '식각 뒤에는 O₂ 플라즈마로 남은 PR 을 태운다 = 애싱', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 244, s);
    } },

  /* ═══════════ 5단원 · 확산 · 이온주입 · 열처리 ═══════════ */
  diffprofile: { cards: ['확산 — 뜨겁게 해서 스며들게 한다'],
    cap: '확산 2단계 — 예치는 표면에 얇고 진하게(농도), 추진은 공급을 끊고 열만 줘 깊이 밀어 넣는다(접합 깊이)',
    draw: function () {
      var s = '', x0 = 70, y0 = 200, X = 380, Y = 160;
      s += arrow(x0, y0, x0 + X + 10, y0, { w: 1.6, head: 9 }) + arrow(x0, y0, x0, y0 - Y - 14, { w: 1.6, head: 9 });
      s += t(x0 + X + 6, y0 + 20, '표면에서 깊이 →', { a: 'e', size: 14 }) + t(x0 + 8, 24, '불순물 농도', { size: 14 });
      function curve(c0, w, col) {
        var p = [];
        for (var i = 0; i <= 60; i++) { var x = i / 60 * X, v = c0 * Math.exp(-Math.pow(x / w, 2)); p.push([x0 + x, y0 - v * Y]); }
        return poly(p, { c: col, w: 2.6 });
      }
      s += curve(0.95, 70, C.blue) + curve(0.42, 160, C.orange);
      /* 기판 농도 */
      var yb = y0 - 0.1 * Y;
      s += line(x0, yb, x0 + X, yb, { c: C.sub, w: 1.2, dash: '6 4' }) + t(x0 + X, yb - 12, '기판 농도', { a: 'e', size: 13, c: C.sub });
      var xj1 = x0 + 70 * Math.sqrt(Math.log(9.5)), xj2 = x0 + 160 * Math.sqrt(Math.log(4.2));
      s += line(xj1, yb, xj1, y0, { c: C.blue, w: 1.2 }) + line(xj2, yb, xj2, y0, { c: C.orange, w: 1.2 });
      s += t((xj1 + xj2) / 2, y0 + 20, '접합 깊이', { a: 'm', size: 13, b: 1 });
      s += arrow(xj1 + 4, y0 - 8, xj2 - 4, y0 - 8, { c: C.orange, w: 1.4, head: 7 });
      s += callout(x0 + 30, y0 - 0.95 * Y * Math.exp(-0.18), 170, 50, '① 예치 — 얇고 진하게', { c: C.blue, tc: C.blue, b: 1, size: 15 });
      s += callout(x0 + 150, y0 - 0.42 * Y * Math.exp(-0.88), 300, 96, '② 추진 — 깊이 퍼짐', { c: C.orange, tc: C.orange, b: 1, size: 15 });
      return F.svg(480, 232, s);
    } },

  diffvsimp: { cards: ['확산 vs 이온주입'],
    cap: '확산은 마스크 밑으로도 옆번짐이 생기고(등방성), 이온주입은 거의 수직으로 들어가 얕고 정밀하다',
    draw: function () {
      var s = divider(240, 16, 224);
      function base(x0) { return rect(x0, 100, 190, 80, SI, { c: C.sub, w: 1 }); }
      function mask(x0) { return rect(x0, 88, 70, 12, OX, { c: C.green, w: 1 }) + rect(x0 + 120, 88, 70, 12, OX, { c: C.green, w: 1 }); }
      s += t(115, 28, '확산 (고온)', { a: 'm', b: 1, size: 17, c: C.blue });
      s += base(20) + path('M60,100 A55,50 0 0 0 170,100 Z', { fill: C.blueL, c: C.blue, w: 1.4 }) + mask(20);
      for (var k = 0; k < 3; k++) s += arrow(98 + k * 17, 48, 98 + k * 17, 80, { c: C.blue, w: 1.4, head: 7 });
      s += callout(66, 106, 34, 62, '옆번짐', { c: C.red, tc: C.red, b: 1, a: 'm' });
      s += t(115, 198, '온도 · 시간으로 제어', { a: 'm', size: 14 }) + t(115, 218, '옆으로도 퍼진다', { a: 'm', size: 13, c: C.sub });
      s += t(355, 28, '이온주입 (상온)', { a: 'm', b: 1, size: 17, c: C.orange });
      s += base(260) + rect(330, 100, 50, 38, C.orangeL, { c: C.orange, w: 1.4 }) + mask(260);
      for (k = 0; k < 3; k++) s += arrow(338 + k * 17, 44, 338 + k * 17, 96, { c: C.orange, w: 1.6, head: 8 });
      s += callout(380, 128, 430, 160, '거의 수직', { c: C.orange, tc: C.orange, b: 1, a: 'm' });
      s += t(355, 198, '도즈 · 에너지로 제어', { a: 'm', size: 14 }) + t(355, 218, '결정 손상 → 어닐링 필요', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 236, s);
    } },

  implanter: { cards: ['이온주입 장비의 구조'],
    cap: '이온주입기 — 소스에서 만든 이온을 자석으로 골라(질량분석) 가속하고, 스캐너로 웨이퍼 전면에 고루 뿌린다. 전 구간이 고진공',
    draw: function () {
      var s = '', by = 62;
      s += rect(10, 30, 460, 110, 'none', { c: C.line, w: 1.2, r: 10 }).replace('/>', ' stroke-dasharray="6 5"/>');
      s += t(466, 18, '전 구간 고진공', { a: 'e', size: 13, c: C.sub, b: 1 });
      /* 소스 */
      s += box(20, 102, 76, 30, { fill: C.orangeL, c: C.orange });
      /* 자석 (90° 분석 자석) */
      s += path('M34,100 L34,70 Q34,40 64,38 L112,38 L112,86 L82,86 L82,100 Z', { fill: C.grayM, c: C.ink, w: 1.4 });
      /* 빔: 위로 → 90° 꺾임 → 가로 */
      s += path('M58,102 L58,' + (by + 20) + ' Q58,' + by + ' 78,' + by + ' L414,' + by, { c: C.orange, w: 3 });
      s += path('M58,92 Q58,54 96,48', { c: C.red, w: 1.4, dash: '4 3' }) + path('M58,92 Q62,76 100,78', { c: C.red, w: 1.4, dash: '4 3' });
      /* 가속관 */
      s += rect(150, 46, 90, 32, '#fff', { c: C.ink, w: 1.4, r: 4 });
      for (var x = 160; x < 240; x += 12) s += line(x, 46, x, 78, { c: C.ink, w: 1 });
      /* 스캐너 */
      s += rect(290, 42, 26, 8, C.blue) + rect(290, 74, 26, 8, C.blue);
      /* 웨이퍼 (약 7° 기울임) */
      s += line(412, 36, 420, 100, { c: C.blue, w: 5 });
      s += line(412, 36, 412, 100, { c: C.sub, w: 1, dash: '4 3' }) + t(428, 110, '약 7°', { size: 14, b: 1, c: C.blue });
      /* 번호: 그림 위 */
      [[108, 118], [124, 24], [195, 24], [303, 24], [396, 118]].forEach(function (p, i) { s += F.num(p[0], p[1], i + 1, { c: C.blue, r: 11, size: 13 }); });
      /* 범례 줄 */
      var L = [['이온 소스', '가스를 이온화'], ['질량분석', '원하는 이온만'], ['가속관', '깊이 결정'], ['스캐너', '전면에 고루'], ['웨이퍼', '7° 기울임']];
      L.forEach(function (a, i) {
        var cx = 50 + i * 95;
        s += F.num(cx - 28, 162, i + 1, { c: C.blue, r: 9, size: 11 }) + t(cx - 14, 162, a[0], { b: 1, size: 14 }) + t(cx + 8, 184, a[1], { a: 'm', size: 13, c: C.sub });
      });
      s += t(240, 214, '빨간 점선 = 질량이 달라 덜·더 휘어 걸러지는 이온', { a: 'm', size: 13, c: C.red });
      return F.svg(480, 230, s);
    } },

  rtp: { cards: ['어닐링과 RTP'],
    cap: '어닐링 — 퍼니스는 오래 가열해 도펀트가 더 퍼지고, RTP 는 램프로 수 초 만에 1000℃ 까지 올려 확산을 최소로 한다',
    draw: function () {
      var s = '', x0 = 60, y0 = 196;
      s += arrow(x0, y0, 460, y0, { w: 1.6, head: 9 }) + arrow(x0, y0, x0, 26, { w: 1.6, head: 9 });
      s += t(460, y0 + 20, '시간', { a: 'e', size: 14 }) + t(x0 + 8, 30, '온도', { size: 14 });
      /* 퍼니스 */
      s += path('M' + x0 + ',180 L150,90 L370,90 L440,180', { c: C.blue, w: 2.6 });
      s += t(260, 76, '퍼니스 어닐 — 수십 분~수 시간', { a: 'm', size: 14, b: 1, c: C.blue });
      s += t(260, 112, '열을 오래 받아 도펀트가 더 퍼진다', { a: 'm', size: 13, c: C.blue });
      /* RTP */
      s += path('M' + x0 + ',180 L80,56 L92,56 L104,180', { c: C.orange, w: 2.6 });
      s += line(x0, 56, 80, 56, { c: C.orange, w: 1, dash: '4 3' }) + t(x0 - 6, 56, '1000℃', { a: 'e', size: 13, c: C.orange, b: 1 });
      s += callout(100, 70, 150, 150, 'RTP — 수 초 만에', { c: C.orange, tc: C.orange, b: 1, size: 15 });
      s += t(155, 172, '확산을 최소로, 활성화만', { size: 13, c: C.orange });
      s += t(250, 222, '(시간 축은 개념 — 실제 비율이 아님)', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 236, s);
    } },

  /* ═══════════ 6단원 · 증착 ═══════════ */
  cvdstep: { cards: ['CVD — 가스를 반응시켜 막을 만든다'],
    cap: 'CVD — 가스가 표면에 붙어(흡착) 반응해 막이 되고 부산물은 떨어져(탈착) 배기된다. 반응이 가스 속에서 일어나면 파티클이 된다',
    draw: function () {
      var s = '';
      /* 막 원자 */
      for (var r = 0; r < 2; r++) for (var i = 0; i < 20; i++) s += F.circle(26 + i * 22 + (r ? 11 : 0), 206 - r * 16, 9, { fill: r ? C.greenL : SI, c: r ? C.green : C.sub, w: 1 });
      s += t(240, 232, '웨이퍼 표면 — 막이 한 겹씩 자란다', { a: 'm', size: 13, c: C.sub }).replace('y="232"', 'y="230"');
      /* 가스 */
      s += F.circle(60, 44, 10, { fill: C.blueL, c: C.blue, w: 1.2 }) + F.circle(78, 52, 10, { fill: C.blueL, c: C.blue, w: 1.2 });
      s += t(70, 20, '반응 가스', { a: 'm', b: 1, c: C.blue, size: 15 });
      s += arrow(80, 66, 140, 160, { c: C.blue, w: 1.8, head: 9 }) + t(128, 110, '흡착', { b: 1, size: 15, c: C.blue });
      /* 반응 */
      s += poly([[190, 168], [198, 152], [206, 166], [220, 158], [212, 172], [222, 184], [204, 180], [196, 192], [192, 178], [176, 178]], { close: 1, fill: C.yellowL, c: C.orange, w: 1.4 });
      s += t(200, 134, '표면 반응', { a: 'm', b: 1, size: 15, c: C.orange });
      /* 탈착 → 배기 */
      s += F.circle(268, 120, 8, { fill: C.grayL, c: C.sub, w: 1.2 }) + F.circle(282, 114, 8, { fill: C.grayL, c: C.sub, w: 1.2 });
      s += arrow(236, 160, 262, 128, { c: C.sub, w: 1.6, head: 8 }) + t(296, 140, '탈착(부산물)', { size: 15, b: 1, c: C.sub });
      s += arrow(296, 108, 350, 66, { c: C.sub, w: 1.6, head: 8, dash: '5 4' }) + t(358, 58, '배기', { b: 1, c: C.sub });
      /* 기상 반응 → 파티클 */
      s += F.circle(428, 118, 16, { fill: C.redL, c: C.red, w: 1.4 }) + t(428, 119, '✕', { a: 'm', size: 15, b: 1, c: C.red, halo: false });
      s += arrow(428, 136, 428, 172, { c: C.red, w: 1.6, head: 8 }) + t(428, 90, '가스 속 반응', { a: 'm', size: 13, b: 1, c: C.red });
      s += t(420, 158, '파티클', { a: 'e', size: 13, b: 1, c: C.red });
      return F.svg(480, 244, s);
    } },

  sputter: { cards: ['PVD — 물리적으로 때려서 붙인다'],
    cap: '스퍼터링 — 아르곤 이온(Ar⁺)으로 금속 타깃을 때려 튀어나온 원자가 웨이퍼에 붙는다. 뒤의 자석이 전자를 가둬 효율을 올린다(마그네트론)',
    draw: function () {
      var s = '';
      s += rect(80, 34, 280, 216, '#f8fafc', { c: C.ink, w: 2.2, r: 6 });
      /* 자석 · 타깃 */
      s += box(120, 8, 60, 22, { fill: C.redL, c: C.red, label: 'N', size: 14, lc: C.red }) + box(190, 8, 60, 22, { fill: C.blueL, c: C.blue, label: 'S', size: 14, lc: C.blue }) + box(260, 8, 60, 22, { fill: C.redL, c: C.red, label: 'N', size: 14, lc: C.red });
      s += rect(110, 36, 220, 18, METAL, { c: C.orange, w: 1.6 });
      s += callout(330, 45, 384, 45, '타깃 (−)', { b: 1, size: 15 });
      s += t(384, 19, '자석', { b: 1, size: 15, c: C.red }).replace('x="384"', 'x="336"');
      /* Ar+ 이온 올라감 */
      [150, 220, 290].forEach(function (x) {
        s += F.circle(x, 104, 9, { fill: C.purpleL, c: C.purple, w: 1.2 }) + t(x, 104, '+', { a: 'm', size: 13, b: 1, c: C.purple, halo: false });
        s += arrow(x, 94, x, 60, { c: C.purple, w: 1.8, head: 8 });
      });
      s += callout(299, 104, 384, 104, 'Ar⁺', { c: C.purple, tc: C.purple, b: 1 });
      /* 튀어나온 원자 내려감 */
      [[168, 70, 150, 200], [205, 66, 212, 204], [258, 70, 280, 202], [310, 64, 318, 200]].forEach(function (a) {
        s += dot(a[0] + (a[2] - a[0]) * 0.55, a[1] + (a[3] - a[1]) * 0.55, 5, C.orange) + arrow(a[0], a[1], a[2], a[3], { c: C.orange, w: 1.3, head: 7, dash: '4 3' });
      });
      s += callout(282, 170, 384, 160, '금속 원자', { c: C.orange, tc: C.orange, b: 1 });
      /* 웨이퍼 */
      s += rect(130, 208, 200, 6, C.blue) + rect(118, 214, 224, 14, C.grayM, { c: C.ink, w: 1.2 });
      s += callout(330, 211, 384, 214, '웨이퍼', { c: C.blue, tc: C.blue, b: 1 });
      /* 가스 · 배기 */
      s += arrow(20, 140, 78, 140, { c: C.purple, w: 1.8, head: 8 }) + t(20, 124, 'Ar 가스', { size: 14, b: 1, c: C.purple });
      s += arrow(100, 250, 100, 270, { c: C.sub, w: 1.8, head: 8 }) + t(112, 262, '진공 배기', { size: 13, c: C.sub });
      return F.svg(480, 278, s);
    } },

  aldcycle: { cards: ['ALD와 단차피복성'],
    cap: 'ALD 한 사이클 — 전구체 주입 → 퍼지 → 반응체 주입 → 퍼지. 표면이 다 덮이면 반응이 스스로 멈춰(자기제한) 한 겹씩 쌓인다',
    draw: function () {
      var s = '', cx = 240, cy = 124;
      s += ell(cx, cy, 150, 80, { c: C.line, w: 2, dash: '7 5' });
      var P = [[cx, cy - 80, '① 전구체 주입', C.blue], [cx + 150, cy, '② 퍼지', C.sub], [cx, cy + 80, '③ 반응체 주입', C.orange], [cx - 150, cy, '④ 퍼지', C.sub]];
      P.forEach(function (p) { s += box(p[0] - 62, p[1] - 18, 124, 36, { fill: p[3] === C.sub ? C.grayL : (p[3] === C.blue ? C.blueL : C.orangeL), c: p[3], label: p[2], size: 15, lc: p[3] === C.sub ? C.ink : p[3] }); });
      s += arrow(318, 60, 360, 96, { c: C.ink, w: 1.6, head: 8 }) + arrow(360, 152, 318, 188, { c: C.ink, w: 1.6, head: 8 }) +
        arrow(162, 188, 120, 152, { c: C.ink, w: 1.6, head: 8 }) + arrow(120, 96, 162, 60, { c: C.ink, w: 1.6, head: 8 });
      s += t(cx, cy - 12, '1 사이클 =', { a: 'm', size: 15, b: 1 }) + t(cx, cy + 12, '원자층 한 겹', { a: 'm', size: 15, b: 1, c: C.green });
      s += t(cx, 236, '두께 = 사이클 수로 정확히 · 대신 느리다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 250, s);
    } },

  stepcov: { cards: ['ALD와 단차피복성', 'CVD — 가스를 반응시켜 막을 만든다'],
    cap: '단차피복성 — 좁고 깊은 홈의 바닥·옆벽까지 고르게 덮는 정도. ALD > LPCVD > PECVD > PVD',
    draw: function () {
      var s = '', names = ['ALD', 'LPCVD', 'PECVD', 'PVD'];
      var th = [[8, 8, 8, 0], [8, 7, 7, 0], [8, 4, 3, 0], [9, 2, 2, 5]]; /* 윗면·옆벽·바닥·오버행 */
      for (var i = 0; i < 4; i++) {
        var x0 = 14 + i * 116, w = 106, tx = x0 + 36, tw = 34, top = 70, bot = 176;
        s += rect(x0, top, w, 130, SI, { c: C.sub, w: 1 }) + rect(tx, top, tw, bot - top, '#fff');
        var a = th[i], col = i === 0 ? C.green : (i === 3 ? C.red : C.blue), fill = i === 0 ? C.greenL : (i === 3 ? C.redL : C.blueL);
        s += rect(x0, top - a[0], tx - x0, a[0], fill, { c: col, w: 1 }) + rect(tx + tw, top - a[0], x0 + w - tx - tw, a[0], fill, { c: col, w: 1 });
        s += rect(tx, top, a[1], bot - top, fill, { c: col, w: 1 }) + rect(tx + tw - a[1], top, a[1], bot - top, fill, { c: col, w: 1 });
        s += rect(tx, bot - a[2], tw, a[2], fill, { c: col, w: 1 });
        if (a[3]) s += ell(tx + 2, top - 2, a[3] + 2, a[3] + 1, { fill: fill, c: col, w: 1 }) + ell(tx + tw - 2, top - 2, a[3] + 2, a[3] + 1, { fill: fill, c: col, w: 1 });
        s += t(x0 + w / 2, 38, names[i], { a: 'm', b: 1, size: 16, c: col });
        if (i < 3) s += t(x0 + w + 5, 38, '>', { a: 'm', b: 1, size: 16, c: C.sub });
      }
      s += t(240, 222, '초록 = 어디나 같은 두께   빨강 = 입구가 막히고 바닥이 얇다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 238, s);
    } },

  /* ═══════════ 7단원 · 세정과 CMP ═══════════ */
  rca: { cards: ['세정 — 팹에서 제일 많이 하는 공정'],
    cap: '오염마다 약품이 다르다 — SC-1 은 파티클·유기물, SC-2 는 금속 이온, SPM 은 강한 유기물·PR, DHF 는 자연산화막',
    draw: function () {
      var s = '', L = 30, R = 290;
      var rows = [['파티클', 'SC-1 (APM)', C.blue], ['유기물', 'SC-1 (APM)', C.blue], ['강한 유기물 · PR', 'SPM (피라냐)', C.purple], ['금속 이온', 'SC-2 (HPM)', C.orange], ['자연산화막', 'DHF · BOE', C.green]];
      s += t(L + 80, 20, '오염', { a: 'm', b: 1, size: 15, c: C.sub }) + t(R + 80, 20, '담당 약품', { a: 'm', b: 1, size: 15, c: C.sub });
      var ry = {};
      rows.forEach(function (r, i) {
        var y = 36 + i * 38;
        s += box(L, y, 160, 30, { fill: '#fff', c: r[2], label: r[0], size: 15 });
        if (!ry[r[1]]) { ry[r[1]] = y; s += box(R, y, 160, 30, { fill: r[2] === C.blue ? C.blueL : (r[2] === C.orange ? C.orangeL : (r[2] === C.green ? C.greenL : C.purpleL)), c: r[2], label: r[1], size: 15 }); }
        s += arrow(L + 162, y + 15, R - 2, ry[r[1]] + 15, { c: r[2], w: 1.6, head: 8 });
      });
      /* 1행·2행이 같은 SC-1 — 2행 오른쪽 칸은 비워 둔다 */
      s += box(40, 232, 400, 30, { fill: C.grayL, c: C.line, label: '단계 사이마다 초순수(UPW) 린스 · SC-1 + SC-2 = RCA 세정', size: 14 });
      return F.svg(480, 274, s);
    } },

  batchsingle: { cards: ['세정 방식과 건조'],
    cap: '배치식은 카세트째 여러 장을 약액에 담그고, 매엽식은 한 장씩 돌리며 약액을 뿌린다',
    draw: function () {
      var s = divider(240, 16, 224);
      s += t(120, 28, '배치식 (Batch)', { a: 'm', b: 1, size: 17, c: C.blue });
      s += rect(40, 70, 160, 110, C.blueL, { c: C.blue, w: 2, r: 4 }).replace('fill="' + C.blueL + '"', 'fill="' + C.blueL + '" fill-opacity=".7"');
      for (var k = 0; k < 9; k++) s += rect(62 + k * 14, 58, 5, 100, SI, { c: C.sub, w: 0.8 });
      s += line(40, 84, 200, 84, { c: C.blue, w: 1, dash: '5 4' });
      s += t(120, 198, '여러 장을 한 번에 담근다', { a: 'm', size: 14 }) + t(120, 218, '생산성↑ · 오염이 옮을 수 있음', { a: 'm', size: 13, c: C.sub });
      s += t(360, 28, '매엽식 (Single)', { a: 'm', b: 1, size: 17, c: C.orange });
      s += rect(345, 140, 30, 34, C.grayM, { c: C.ink, w: 1.2 }) + ell(360, 136, 76, 12, { fill: SI, c: C.sub, w: 1.4 });
      s += path('M318,72 L338,72 L338,86 L332,94 L324,94 L318,86 Z', { fill: C.grayM, w: 1.2 });
      for (k = -1; k <= 1; k++) s += line(328 + k * 3, 98, 340 + k * 14, 128, { c: C.blue, w: 1.4, dash: '3 3' });
      s += callout(318, 80, 280, 60, '노즐', { a: 'm', size: 14 });
      s += path('M300,156 A64,12 0 0 0 420,156', { c: C.orange, w: 2 }) + arrow(412, 159, 424, 152, { c: C.orange, w: 2, head: 9 });
      s += t(360, 198, '한 장씩 돌리며 뿌린다', { a: 'm', size: 14 }) + t(360, 218, '균일도·재현성↑ · 미세 공정 주류', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 236, s);
    } },

  cmp: { cards: ['CMP — 갈아서 평평하게'],
    cap: 'CMP — 헤드가 웨이퍼를 뒤집어 패드에 누르며 돌고, 슬러리(연마 입자+약품)가 화학·기계적으로 깎는다. 컨디셔너가 패드를 계속 되살린다',
    draw: function () {
      var s = '';
      /* 플래튼 · 패드 */
      s += ell(240, 190, 200, 34, { fill: C.grayM, c: C.ink, w: 1.4 }) + rect(40, 176, 400, 14, C.grayM) + ell(240, 176, 200, 34, { fill: '#e7eef7', c: C.ink, w: 1.6 });
      s += rect(226, 222, 28, 30, C.grayM, { c: C.ink, w: 1.2 });
      s += path('M150,236 A90,12 0 0 0 330,236', { c: C.sub, w: 1.6 }) + arrow(322, 240, 334, 234, { c: C.sub, w: 1.6, head: 8 });
      s += callout(60, 182, 22, 150, '연마 패드', { size: 14, a: 's' }).replace('x="28"', 'x="10"');
      s += t(376, 244, '플래튼 회전', { size: 13, c: C.sub });
      /* 헤드 */
      s += rect(126, 118, 88, 26, C.blueL, { c: C.blue, w: 1.6, r: 4 }) + rect(122, 144, 96, 8, C.blue) + rect(134, 152, 72, 6, SI, { c: C.sub, w: 1 });
      s += rect(162, 60, 16, 58, C.grayM, { c: C.ink, w: 1.2 });
      s += arrow(150, 62, 150, 110, { c: C.red, w: 2.4, head: 10 }) + t(142, 74, '압력', { a: 'e', b: 1, c: C.red, size: 15 });
      s += callout(126, 128, 40, 110, '캐리어 헤드', { c: C.blue, tc: C.blue, b: 1, size: 14, a: 's' }).replace('x="46"', 'x="14"');
      s += callout(206, 155, 244, 104, '웨이퍼\n(아래로 향함)', { size: 13 });
      s += path('M140,40 A30,8 0 0 0 200,40', { c: C.blue, w: 1.6 }) + arrow(196, 43, 206, 38, { c: C.blue, w: 1.6, head: 7 });
      /* 슬러리 */
      s += path('M318,34 L352,34 L352,70', { c: C.ink, w: 3 }) + dot(352, 86, 4, C.green) + dot(352, 104, 4, C.green) + dot(352, 122, 4, C.green);
      s += t(300, 30, '슬러리', { a: 'e', b: 1, c: C.green, size: 15 });
      /* 컨디셔너 */
      s += path('M470,100 L412,100 L412,150', { c: C.ink, w: 3 }) + rect(390, 150, 44, 10, C.orangeL, { c: C.orange, w: 1.4, r: 3 });
      s += t(432, 62, '컨디셔너', { a: 'm', b: 1, size: 15, c: C.orange }) + t(438, 84, '다이아몬드', { a: 'm', size: 13, c: C.orange });
      return F.svg(480, 262, s);
    } },

  dishing: { cards: ['CMP 결함과 보전'],
    cap: 'CMP 결함 — 넓은 금속 가운데가 접시처럼 파이는 디싱, 패턴이 촘촘한 영역이 통째로 더 깎이는 에로전',
    draw: function () {
      var s = divider(240, 16, 214);
      s += t(115, 28, '디싱 (Dishing)', { a: 'm', b: 1, size: 17, c: C.blue });
      s += rect(20, 80, 190, 80, OX, { c: C.green, w: 1.2 }) + path('M60,80 Q115,112 170,80 L170,140 L60,140 Z', { fill: METAL, c: C.orange, w: 1.4 });
      s += line(20, 80, 210, 80, { c: C.ink, w: 1, dash: '4 3' });
      s += callout(115, 96, 115, 56, '가운데가 움푹', { c: C.red, tc: C.red, b: 1, a: 'm', size: 14 });
      s += t(115, 186, '넓은 금속 패턴', { a: 'm', size: 14 });
      s += t(355, 28, '에로전 (Erosion)', { a: 'm', b: 1, size: 17, c: C.orange });
      s += path('M260,80 L310,80 L316,94 L394,94 L400,80 L450,80 L450,160 L260,160 Z', { fill: OX, c: C.green, w: 1.2 });
      for (var k = 0; k < 5; k++) s += rect(320 + k * 15, 94, 8, 46, METAL, { c: C.orange, w: 1 });
      s += line(260, 80, 450, 80, { c: C.ink, w: 1, dash: '4 3' });
      s += callout(355, 94, 355, 56, '영역째 낮아짐', { c: C.red, tc: C.red, b: 1, a: 'm', size: 14 });
      s += t(355, 186, '촘촘한 패턴 영역', { a: 'm', size: 14 });
      s += rect(150, 202, 14, 14, METAL, { c: C.orange, r: 2 }) + t(170, 209, '금속(Cu)', { size: 13 }) + rect(250, 202, 14, 14, OX, { c: C.green, r: 2 }) + t(270, 209, '산화막', { size: 13 });
      return F.svg(480, 228, s);
    } },

  /* ═══════════ 8단원 · 조립(패키징) ═══════════ */
  pkgtypes: { cards: ['왜 이렇게까지 하나 — 패키지의 목적'],
    cap: '패키지 단면 — 리드가 밖으로 나온 전통형, 바닥에 솔더볼을 깐 BGA, 칩을 뒤집어 범프로 바로 붙인 플립칩',
    draw: function () {
      var s = '', CH = '#93c5fd', MOLD = '#4b5563';
      /* 리드형 */
      s += t(80, 28, 'DIP · QFP', { a: 'm', b: 1, size: 16 });
      s += rect(30, 80, 100, 40, MOLD, { r: 4 }) + rect(62, 94, 36, 10, CH);
      s += path('M30,108 L16,108 L16,140 L6,140', { c: C.sub, w: 3 }) + path('M130,108 L144,108 L144,140 L154,140', { c: C.sub, w: 3 });
      s += callout(144, 128, 128, 170, '리드(다리)', { a: 'm', size: 14 });
      /* BGA */
      s += t(240, 28, 'BGA', { a: 'm', b: 1, size: 16 });
      s += rect(180, 76, 120, 34, MOLD, { r: 4 }) + rect(220, 92, 40, 10, CH) + rect(176, 110, 128, 10, C.greenL, { c: C.green, w: 1 });
      s += path('M222,97 Q208,86 196,110', { c: C.orange, w: 1.4 }) + path('M258,97 Q272,86 284,110', { c: C.orange, w: 1.4 });
      for (var k = 0; k < 7; k++) s += F.circle(186 + k * 18, 126, 6, { fill: C.grayM, c: C.sub, w: 1 });
      s += callout(240, 132, 240, 170, '솔더볼', { a: 'm', size: 14 });
      s += callout(200, 100, 196, 56, '와이어', { a: 'm', size: 13, c: C.orange });
      /* 플립칩 */
      s += t(400, 28, '플립칩', { a: 'm', b: 1, size: 16 });
      s += rect(360, 80, 80, 20, CH, { c: C.blue, w: 1.2 }) + rect(340, 110, 120, 10, C.greenL, { c: C.green, w: 1 });
      for (k = 0; k < 6; k++) s += F.circle(368 + k * 13, 105, 4, { fill: C.grayM, c: C.sub, w: 1 });
      s += callout(400, 105, 400, 170, '범프', { a: 'm', size: 14 });
      s += t(400, 62, '칩을 뒤집음', { a: 'm', size: 13, c: C.blue });
      s += t(80, 206, '리드가 밖으로', { a: 'm', size: 13, c: C.sub }) + t(240, 206, '단자 수가 많다', { a: 'm', size: 13, c: C.sub }) + t(400, 206, '와이어 없음 · 빠름', { a: 'm', size: 13, c: C.sub });
      s += t(240, 234, '진회색 = 몰딩(EMC)   파랑 = 칩   초록 = 기판', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 250, s);
    } },

  wirebond: { cards: ['와이어 본딩과 몰딩의 속'],
    cap: '와이어 본딩 — 캐필러리로 금선 끝의 볼을 칩 패드에 붙이고(볼 본딩), 반대쪽 리드에는 눌러 끊는다(스티치). 붙이는 힘 = 열 + 압력 + 초음파',
    draw: function () {
      var s = '';
      s += rect(20, 190, 440, 16, C.grayM, { c: C.ink, w: 1.2 });
      s += rect(80, 150, 130, 40, '#93c5fd', { c: C.blue, w: 1.4 }) + rect(180, 144, 24, 6, C.orange);
      s += t(130, 172, '칩', { a: 'm', b: 1, size: 16, halo: false });
      s += rect(340, 184, 90, 6, C.orange);
      /* 와이어 */
      s += path('M192,138 C200,70 330,70 360,184', { c: C.orange, w: 2.4 });
      s += F.circle(192, 140, 6, { fill: C.orange, c: C.orange, w: 1 });
      s += path('M352,184 L372,184', { c: C.orange, w: 5 });
      /* 캐필러리 (다음 본딩 위치 위) */
      s += poly([[380, 40], [404, 40], [398, 128], [386, 128]], { close: 1, fill: C.grayL, w: 1.4 });
      s += line(392, 128, 392, 150, { c: C.orange, w: 1.6 }) + F.circle(392, 152, 4, { fill: C.orange, c: C.orange, w: 1 });
      s += callout(404, 60, 440, 60, '캐필러리', { size: 14, a: 'm' }).replace('x="440"', 'x="440"');
      s += callout(186, 140, 90, 110, '① 볼 본딩', { c: C.blue, tc: C.blue, b: 1, a: 'm' });
      s += callout(362, 184, 300, 226, '② 스티치', { c: C.blue, tc: C.blue, b: 1, a: 'm' });
      s += callout(260, 82, 250, 36, '금선', { c: C.orange, tc: C.orange, b: 1, a: 'm' });
      s += callout(440, 187, 440, 226, '리드', { a: 'm', size: 14 });
      s += box(20, 20, 150, 34, { fill: C.redL, c: C.red, label: '열 + 압력 + 초음파', size: 14, lc: C.red });
      return F.svg(480, 240, s);
    } },

  /* ═══════════ 9단원 · 장비 요소기술 (진공·가스·온도) ═══════════ */
  vacscale: { cards: ['왜 진공에서 하나?'],
    cap: '진공 — 공기를 뺄수록 압력(숫자)이 작아지고 진공도는 높아진다. 분자가 적어야 이온이 부딪히지 않고 웨이퍼까지 간다',
    draw: function () {
      var s = '', names = ['대기압', '저진공', '중진공', '고진공', '초고진공'], cnt = [40, 18, 8, 3, 1];
      var rnd = 7;
      function r() { rnd = (rnd * 9301 + 49297) % 233280; return rnd / 233280; }
      for (var i = 0; i < 5; i++) {
        var x = 14 + i * 92;
        s += rect(x, 34, 82, 62, '#fff', { c: C.ink, w: 1.6, r: 6 });
        for (var k = 0; k < cnt[i]; k++) s += dot(x + 8 + r() * 66, 40 + r() * 50, 2.6, C.sub);
        s += t(x + 41, 112, names[i], { a: 'm', b: 1, size: 15, c: i ? C.blue : C.ink });
      }
      s += t(80, 20, '760 Torr = 101.3 kPa', { a: 'm', size: 13, c: C.sub, ans: 1 });
      s += arrow(20, 134, 460, 134, { c: C.blue, w: 2 }) + t(240, 152, '압력(숫자)↓  =  진공도↑', { a: 'm', b: 1, c: C.blue, size: 15 });
      /* 이온 비행 */
      s += t(120, 180, '공기가 많으면', { a: 'm', size: 14, b: 1, c: C.red }) + t(360, 180, '진공이면', { a: 'm', size: 14, b: 1, c: C.green });
      s += poly([[30, 214], [70, 206], [88, 226], [120, 200], [140, 222]], { c: C.red, w: 1.8 });
      [[70, 206], [88, 226], [120, 200], [140, 222]].forEach(function (p) { s += F.circle(p[0], p[1], 5, { fill: C.grayM, c: C.sub, w: 1 }); });
      s += t(146, 222, '✕', { size: 16, b: 1, c: C.red }) + rect(200, 196, 6, 36, C.blue) ;
      s += arrow(270, 214, 438, 214, { c: C.green, w: 1.8, head: 9 }) + rect(442, 196, 6, 36, C.blue);
      s += t(120, 244, '부딪혀 웨이퍼까지 못 간다', { a: 'm', size: 13, c: C.sub }) + t(360, 244, '곧게 날아가 웨이퍼에 닿는다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 258, s);
    } },

  pumprange: { cards: ['진공 펌프 4형제'],
    cap: '진공 펌프의 담당 구간 — 한 대로 대기압에서 고진공까지 못 간다. 터보분자 펌프는 대기압에서 못 돌려 앞에 백킹 펌프가 필수',
    draw: function () {
      var s = '', X0 = 118, CW = 72, cols = ['대기압', '저', '중', '고', '초고'];
      for (var i = 0; i < 5; i++) {
        s += rect(X0 + i * CW, 20, CW - 2, 26, i % 2 ? C.grayL : '#eef2f7', { r: 4 }) + t(X0 + i * CW + CW / 2 - 1, 34, cols[i], { a: 'm', size: 14, b: 1, halo: false });
        s += line(X0 + i * CW - 1, 50, X0 + i * CW - 1, 206, { c: C.edge, w: 1 });
      }
      s += arrow(X0, 56, X0 + 5 * CW - 4, 56, { c: C.sub, w: 1.2, head: 7 }) + t(X0 + 5 * CW - 6, 66, '압력↓', { a: 'e', size: 13, c: C.sub }).replace('y="66"', 'y="68"');
      var P = [['로터리', 0, 2.4, C.sub, '오일식 초벌'], ['드라이', 0, 2.6, C.green, '오일 없음 · 팹 표준'], ['터보분자', 2.2, 3.8, C.blue, '초고속 날개'], ['크라이오', 3.2, 5, C.purple, '가스를 얼려 잡음']];
      P.forEach(function (p, k) {
        var y = 84 + k * 32;
        s += t(X0 - 10, y + 10, p[0], { a: 'e', b: 1, size: 15, c: p[3] });
        s += rect(X0 + p[1] * CW, y, (p[2] - p[1]) * CW - 4, 20, p[3], { r: 10, op: 0.85 });
        s += t(X0 + p[1] * CW + 10, y + 10, p[4], { size: 13, b: 1, c: '#fff', halo: false });
      });
      s += box(24, 216, 432, 30, { fill: C.redL, c: C.red, label: '터보분자 펌프 앞에는 반드시 백킹 펌프(드라이)', size: 14, lc: C.red });
      return F.svg(480, 258, s);
    } },

  pumpchain: { cards: ['진공 펌프 4형제'],
    cap: '배기 줄 — 챔버 → 터보분자 펌프(고진공) → 드라이 펌프(백킹) → 스크러버(정화) → 배기. 뒤쪽 펌프가 앞 펌프의 출구를 받쳐 준다',
    draw: function () {
      var s = '', y = 70;
      s += box(10, 40, 90, 64, { fill: C.blueL, c: C.blue, label: '공정\n챔버', size: 15 });
      /* TMP */
      s += rect(136, 44, 70, 56, '#fff', { c: C.ink, w: 1.6, r: 6 });
      for (var k = 0; k < 5; k++) s += line(146 + k * 12, 50, 156 + k * 12, 94, { c: C.blue, w: 2 });
      /* 드라이 */
      s += F.circle(276, 72, 30, { fill: '#fff', c: C.ink, w: 1.6 }) + path('M258,72 A18,18 0 0 1 294,72', { c: C.green, w: 2.4 }) + path('M294,72 A18,18 0 0 1 258,72', { c: C.green, w: 1, dash: '3 3' });
      /* 스크러버 */
      s += box(344, 36, 60, 72, { fill: C.grayL, c: C.ink });
      for (k = 0; k < 4; k++) s += dot(360 + (k % 2) * 26, 54 + k * 12, 3, C.blue);
      s += arrow(100, y, 134, y, { w: 2, head: 9 }) + arrow(206, y, 244, y, { w: 2, head: 9 }) + arrow(306, y, 342, y, { w: 2, head: 9 }) + arrow(404, y, 468, y, { w: 2, head: 9, c: C.sub });
      s += t(171, 124, '터보분자', { a: 'm', b: 1, c: C.blue }) + t(171, 146, '중 → 고진공', { a: 'm', size: 13, c: C.sub });
      s += t(276, 124, '드라이', { a: 'm', b: 1, c: C.green }) + t(276, 146, '백킹 펌프', { a: 'm', size: 13, c: C.sub });
      s += t(374, 124, '스크러버', { a: 'm', b: 1 }) + t(374, 146, '배기가스 정화', { a: 'm', size: 13, c: C.sub });
      s += t(446, 56, '배기', { a: 'm', size: 14, b: 1, c: C.sub });
      s += t(240, 186, '진공이 안 잡히면: O-링 손상 → 배관 이완 → 밸브 불량 순으로 본다', { a: 'm', size: 13, c: C.red });
      return F.svg(480, 206, s);
    } },

  gaugerange: { cards: ['진공 게이지 — 구간마다 다른 자'],
    cap: '진공 게이지 — 피라니는 저·중진공, 이온(BA) 게이지는 고진공. 캐패시턴스 마노미터는 기체 종류와 상관없이 정확해 공정 압력 제어에 쓴다',
    draw: function () {
      var s = '', X0 = 118, CW = 72, cols = ['대기압', '저', '중', '고', '초고'];
      for (var i = 0; i < 5; i++) {
        s += rect(X0 + i * CW, 20, CW - 2, 26, i % 2 ? C.grayL : '#eef2f7', { r: 4 }) + t(X0 + i * CW + CW / 2 - 1, 34, cols[i], { a: 'm', size: 14, b: 1, halo: false });
        s += line(X0 + i * CW - 1, 50, X0 + i * CW - 1, 150, { c: C.edge, w: 1 });
      }
      s += t(X0 - 10, 74, '피라니', { a: 'e', b: 1, c: C.green }) + rect(X0 + CW, 64, 2 * CW - 4, 20, C.green, { r: 10, op: 0.85 }) + t(X0 + CW + 10, 74, '열전도로 측정', { size: 13, b: 1, c: '#fff', halo: false });
      s += t(X0 - 10, 114, '이온(BA)', { a: 'e', b: 1, c: C.blue }) + rect(X0 + 3 * CW, 104, 2 * CW - 4, 20, C.blue, { r: 10, op: 0.85 }) + t(X0 + 3 * CW + 10, 114, '이온화해 측정', { size: 13, b: 1, c: '#fff', halo: false });
      s += F.circle(X0 + CW / 2, 114, 13, { fill: C.redL, c: C.red, w: 1.4 }) + t(X0 + CW / 2, 115, '✕', { a: 'm', size: 14, b: 1, c: C.red, halo: false });
      s += t(X0 + CW + 4, 142, '← 저진공에서 켜면 필라멘트가 탄다', { size: 13, c: C.red, b: 1 });
      s += box(24, 164, 432, 44, { fill: C.orangeL, c: C.orange });
      s += t(240, 178, '캐패시턴스 마노미터(CDG·바라트론)', { a: 'm', b: 1, size: 15, c: C.orange, halo: false }) + t(240, 198, '격막이 휘는 정도 · 기체 종류와 상관없이 정확', { a: 'm', size: 13, halo: false });
      return F.svg(480, 222, s);
    } },

  gasline: { cards: ['가스와 케미컬 — 가장 위험한 부분'],
    cap: '가스 줄 — 가스 캐비닛(항상 음압 배기 · 감지기) → MFC 로 정한 양만 → 챔버 → 스크러버로 정화한 뒤 배출',
    draw: function () {
      var s = '', y = 104;
      /* 캐비닛 */
      s += rect(14, 40, 92, 110, C.grayL, { c: C.ink, w: 1.6, r: 6 });
      s += path('M44,138 L44,76 Q44,64 56,64 Q68,64 68,76 L68,138 Z', { fill: C.orangeL, c: C.orange, w: 1.4 }) + rect(52, 56, 8, 8, C.ink);
      s += arrow(60, 40, 60, 14, { c: C.sub, w: 1.6, head: 8 }) + t(70, 20, '음압 배기', { size: 13, c: C.sub });
      s += F.circle(92, 56, 8, { fill: C.redL, c: C.red, w: 1.2 }) + callout(98, 52, 120, 30, '가스 감지기', { size: 13, c: C.red, tc: C.red, b: 1 });
      s += t(60, 166, '').replace('<text', '<text');
      /* MFC */
      s += line(106, y, 150, y, { w: 2.2 }) + box(150, 84, 70, 40, { fill: C.blueL, c: C.blue, label: 'MFC', size: 16, lc: C.blue });
      s += t(185, 142, '정한 양만 (sccm)', { a: 'm', size: 13, c: C.blue });
      /* 챔버 */
      s += arrow(220, y, 256, y, { w: 2.2, head: 9 }) + box(258, 74, 80, 60, { fill: '#fff', c: C.ink, label: '챔버', size: 16 });
      /* 스크러버 */
      s += arrow(338, y, 370, y, { w: 2.2, head: 9 }) + box(372, 74, 90, 60, { fill: C.greenL, c: C.green, label: '스크러버', size: 15, lc: C.green });
      s += arrow(417, 74, 417, 36, { c: C.sub, w: 1.8, head: 8 }) + t(430, 44, '배출', { size: 13, c: C.sub });
      s += t(60, 20, '').replace('<text', '<text');
      s += t(60, 170, '가스 캐비닛', { a: 'm', b: 1, size: 15 });
      /* 위험 성질 */
      var H = [['자연발화', 'SiH₄ (실란)', C.orange], ['독성·부식성', 'NH₃ · Cl₂ · HF', C.red], ['질식', 'N₂ · Ar', C.purple]];
      H.forEach(function (h, i) {
        var x = 20 + i * 150;
        s += box(x, 214, 140, 44, { fill: '#fff', c: h[2] }) + t(x + 70, 228, h[0], { a: 'm', b: 1, size: 14, c: h[2], halo: false, ans: i < 2 }) + t(x + 70, 247, h[1], { a: 'm', size: 13, halo: false });
      });
      return F.svg(480, 270, s.replace(/<text[^>]*><\/text>/g, ''));
    } },

  cluster: { cards: ['온도·전원·이송'],
    cap: '장비 위에서 본 모습 — FOUP 을 로드포트에 올리면 로봇이 웨이퍼를 로드락으로 옮기고, 진공을 깨지 않은 채 공정 챔버를 오간다',
    draw: function () {
      var s = '', cx = 240, cy = 110;
      /* 이송 챔버 (육각) */
      var hx = [];
      for (var i = 0; i < 6; i++) { var a = Math.PI / 6 + i * Math.PI / 3; hx.push([cx + 56 * Math.cos(a), cy + 56 * Math.sin(a)]); }
      s += poly(hx, { close: 1, fill: C.blueL, c: C.blue, w: 1.8 });
      /* 로봇 */
      s += F.circle(cx, cy, 10, { fill: C.grayM, c: C.ink, w: 1.2 }) + line(cx, cy, cx - 26, cy - 22, { c: C.ink, w: 5 }) + F.circle(cx - 30, cy - 26, 7, { fill: SI, c: C.sub, w: 1 });
      /* 공정 챔버 3 */
      [[-1, -1], [0, -1.35], [1, -1]].forEach(function (d, k) {
        var x = cx + d[0] * 104, y = cy + d[1] * 60;
        s += box(x - 40, y - 26, 80, 52, { fill: C.orangeL, c: C.orange, label: '공정 ' + (k + 1), size: 14 });
      });
      /* 로드락 2 */
      s += box(cx - 76, cy + 50, 64, 34, { fill: C.greenL, c: C.green, label: '로드락', size: 13 }) + box(cx + 12, cy + 50, 64, 34, { fill: C.greenL, c: C.green, label: '로드락', size: 13 });
      /* EFEM · 로드포트 · FOUP */
      s += rect(70, 196, 340, 34, '#fff', { c: C.ink, w: 1.4, r: 4 }) + t(240, 213, '대기 로봇 (사람 없이 옮김)', { a: 'm', size: 13, c: C.sub, halo: false });
      for (i = 0; i < 3; i++) s += box(100 + i * 100, 234, 80, 30, { fill: C.grayL, c: C.ink, label: 'FOUP', size: 14 });
      s += t(240, 280, '로드포트 — FOUP(웨이퍼 운반 통)를 올리는 자리', { a: 'm', size: 13, b: 1 });
      s += callout(cx + 40, cy + 10, 314, 124, '이송 챔버\n(진공)', { c: C.blue, tc: C.blue, b: 1, size: 14 });
      s += callout(cx - 24, cy - 20, 118, 122, '진공 로봇', { a: 'e', size: 14, b: 1 });
      return F.svg(480, 292, s);
    } },

  /* ═══════════ 10단원 · 설비보전 이론 ═══════════ */
  maint4: { cards: ['보전의 4가지 이름'],
    cap: '보전의 4가지 — 설계 때(MP), 고장 나기 전(PM: TBM·CBM), 고장 난 뒤(BM), 원인을 고쳐 다시 안 나게(CM)',
    draw: function () {
      var s = '', y = 120;
      s += arrow(20, y, 462, y, { w: 2.2, head: 11 }) + t(462, y + 22, '시간', { a: 'e', size: 13, c: C.sub });
      /* 구간 */
      s += line(110, y - 8, 110, y + 8, { w: 2 }) + line(330, y - 12, 330, y + 12, { c: C.red, w: 2 });
      s += t(65, y + 22, '설계·구매', { a: 'm', size: 13, c: C.sub }) + t(220, y + 22, '가동 중', { a: 'm', size: 13, c: C.sub }) + t(330, y + 24, '고장', { a: 'm', size: 14, b: 1, c: C.red });
      s += poly([[326, 84], [338, 100], [328, 102], [336, 116], [320, 98], [330, 96]], { close: 1, fill: C.yellowL, c: C.red, w: 1.4 });
      function tag(x, yy, w, t1, t2, col, fill, a1, a2) {   /* a1·a2 = 정답 이름표(슬라이드 빈칸) */
        return box(x - w / 2, yy, w, 50, { fill: fill, c: col }) + t(x, yy + 17, t1, { a: 'm', b: 1, size: 15, c: col, halo: false, ans: a1 }) + t(x, yy + 37, t2, { a: 'm', size: 13, halo: false, ans: a2 });
      }
      s += tag(66, 26, 120, 'MP 보전예방', '고장 안 나는 설비', C.purple, C.purpleL) + line(65, 76, 65, y - 4, { c: C.purple, w: 1.2, dash: '4 3' });
      s += tag(220, 26, 170, 'PM 예방보전', 'TBM 달력 · CBM 상태', C.blue, C.blueL, 1, 1) + line(220, 76, 220, y - 4, { c: C.blue, w: 1.2, dash: '4 3' });
      s += tag(330, 160, 110, 'BM 사후보전', '망가지면 고친다', C.red, C.redL, 1) + line(330, y + 34, 330, 160, { c: C.red, w: 1.2, dash: '4 3' });
      s += tag(412, 26, 120, 'CM 개량보전', '원인을 고쳐 없앤다', C.green, C.greenL);
      s += F.route([[340, 150], [412, 150], [412, 78]], { c: C.green, w: 1.6, head: 8, dash: '5 4' });
      return F.svg(480, 226, s);
    } },

  loss6: { cards: ['설비의 6대 로스', '보전 지표 계산 — 이건 반드시 손으로'],
    cap: '6대 로스 — 부하시간에서 로스를 하나씩 빼면 가동 → 순가동 → 가치가동. 세 비율을 곱한 것이 설비종합효율(OEE)',
    draw: function () {
      var s = '', X = 110, W = 250, rows = [['부하시간', 1, '', ''], ['가동시간', 0.84, '① 고장  ② 준비·조정', '시간가동률'], ['순가동시간', 0.68, '③ 순간정지  ④ 속도저하', '성능가동률'], ['가치가동시간', 0.6, '⑤ 불량·수정  ⑥ 초기수율', '양품률']];
      rows.forEach(function (r, i) {
        var y = 24 + i * 50, w = W * r[1];
        s += t(X - 8, y + 14, r[0], { a: 'e', b: 1, size: 14 });
        s += rect(X, y, w, 28, i === 3 ? C.green : C.blue, { r: 4, op: i === 3 ? 0.85 : 0.75 });
        if (i) {
          var pw = W * rows[i - 1][1] - w;
          s += rect(X + w, y, pw, 28, C.redL, { c: C.red, w: 1 }) + F.hatch(X + w, y, pw, 28, { c: C.red, w: 0.8, gap: 7 });
          s += t(X + w - 6, y + 42, r[2], { a: 'e', size: 13, c: C.red });
          s += t(X + W + 12, y + 14, r[3], { size: 14, b: 1, c: C.blue });
        }
      });
      s += box(20, 222, 440, 34, { fill: C.grayL, c: C.line, label: 'OEE = 시간가동률 × 성능가동률 × 양품률', size: 15 });
      return F.svg(480, 268, s);
    } },

  mtbf: { cards: ['보전 지표 계산 — 이건 반드시 손으로'],
    cap: 'MTBF 는 고장 사이 가동시간의 평균(길수록 좋다), MTTR 은 수리시간의 평균(짧을수록 좋다)',
    draw: function () {
      var s = '', y = 60, seg = [[20, 150, 1], [150, 180, 0], [180, 330, 1], [330, 356, 0], [356, 460, 1]];
      seg.forEach(function (g) { s += rect(g[0], y, g[1] - g[0], 32, g[2] ? C.green : C.red, { op: g[2] ? 0.8 : 0.85 }); });
      s += rect(20, y, 440, 32, 'none', { c: C.ink, w: 1.4 });
      s += t(85, y + 16, '가동', { a: 'm', b: 1, c: '#fff', halo: false }) + t(255, y + 16, '가동', { a: 'm', b: 1, c: '#fff', halo: false }) + t(408, y + 16, '가동', { a: 'm', b: 1, c: '#fff', halo: false });
      s += t(165, y - 14, '수리', { a: 'm', size: 14, b: 1, c: C.red }) + t(343, y - 14, '수리', { a: 'm', size: 14, b: 1, c: C.red });
      s += F.dim(20, 100, 150, 100, '', { off: 0 }).replace(/<g transform[\s\S]*<\/g>$/, '') + F.dim(180, 100, 330, 100, '', { off: 0 });
      s += t(165, 124, '고장 사이의 가동시간 → 평균 = MTBF', { a: 'm', size: 14, b: 1, c: C.green });
      s += box(20, 146, 210, 60, { fill: C.greenL, c: C.green }) + t(125, 166, 'MTBF = 총 가동시간 ÷ 고장 횟수', { a: 'm', size: 13, b: 1, halo: false }) + t(125, 188, '길수록 좋다 (신뢰성)', { a: 'm', size: 13, c: C.green, halo: false });
      s += box(250, 146, 210, 60, { fill: C.redL, c: C.red }) + t(355, 166, 'MTTR = 총 수리시간 ÷ 고장 횟수', { a: 'm', size: 13, b: 1, halo: false }) + t(355, 188, '짧을수록 좋다 (보전성)', { a: 'm', size: 13, c: C.red, halo: false });
      s += t(240, 228, '가용도 = MTBF ÷ (MTBF + MTTR) × 100 %', { a: 'm', size: 15, b: 1 });
      return F.svg(480, 246, s);
    } },

  bathtub: { cards: ['고장의 일생 — 욕조 곡선'],
    cap: '욕조 곡선 — 초기에는 고장률이 줄고, 우발 구간에서는 일정하고, 수명이 다하면 다시 는다',
    draw: function () {
      var s = '', x0 = 60, y0 = 190;
      s += arrow(x0, y0, 462, y0, { w: 1.6, head: 9 }) + arrow(x0, y0, x0, 24, { w: 1.6, head: 9 });
      s += t(462, y0 - 12, '시간', { a: 'e', size: 13, c: C.sub }) + t(x0 + 8, 28, '고장률', { size: 14 });
      s += path('M' + (x0 + 6) + ',40 C90,130 120,150 170,150 L340,150 C390,150 420,120 450,44', { c: C.blue, w: 3 });
      s += line(170, 40, 170, y0, { c: C.grayM, w: 1.2, dash: '5 4' }) + line(340, 40, 340, y0, { c: C.grayM, w: 1.2, dash: '5 4' });
      s += t(115, 56, '초기', { a: 'm', b: 1, size: 15, c: C.orange }) + t(115, 76, '감소', { a: 'm', size: 13, c: C.orange });
      s += t(255, 118, '우발 — 일정', { a: 'm', b: 1, size: 15, c: C.green });
      s += t(395, 56, '마모', { a: 'm', b: 1, size: 15, c: C.red }).replace('x="395"', 'x="382"') + t(382, 76, '증가', { a: 'm', size: 13, c: C.red });
      s += t(115, 212, '디버깅·초기 관리', { a: 'm', size: 13 }) + t(255, 212, '사후보전·예비품', { a: 'm', size: 13 }) + t(392, 212, '예방보전(주기 교체)', { a: 'm', size: 13 });
      return F.svg(480, 228, s);
    } },

  /* ═══════════ 11단원 · 자동화 기초와 공유압 ═══════════ */
  pascal: { cards: ['공압 vs 유압'],
    cap: '파스칼의 원리 — 밀폐된 공기·기름에 가한 압력은 모든 방향에 같게 전달된다. 실린더의 힘 F = 압력 P × 피스톤 면적 A',
    draw: function () {
      var s = '';
      s += rect(40, 50, 220, 90, '#fff', { c: C.ink, w: 2.2 });
      s += rect(42, 52, 150, 86, C.blueL);
      s += rect(192, 52, 16, 86, C.grayM, { c: C.ink, w: 1.6 }) + rect(208, 86, 170, 18, C.grayM, { c: C.ink, w: 1.6 });
      [[100, 70, 100, 56], [100, 120, 100, 134], [70, 95, 48, 95], [150, 80, 186, 80], [150, 110, 186, 110], [150, 95, 186, 95]].forEach(function (a) { s += arrow(a[0], a[1], a[2], a[3], { c: C.blue, w: 1.6, head: 7 }); });
      s += t(110, 95, 'P', { a: 'm', b: 1, size: 20, c: C.blue });
      s += arrow(382, 95, 450, 95, { c: C.red, w: 3, head: 12 }) + t(430, 72, 'F', { a: 'm', b: 1, size: 20, c: C.red });
      s += arrow(20, 72, 40, 72, { c: C.blue, w: 2, head: 8 }).replace('x1="20"', 'x1="6"') + t(24, 40, '공기 공급', { size: 13, c: C.blue }).replace('x="24"', 'x="10"');
      /* 면적 */
      s += ell(200, 190, 16, 40, { fill: C.orangeL, c: C.orange, w: 1.6 }).replace('cy="190"', 'cy="186"').replace('ry="40"', 'ry="34"');
      s += callout(206, 176, 250, 176, '피스톤 면적 A = πD² / 4', { c: C.orange, tc: C.orange, b: 1, size: 15 });
      s += box(250, 196, 200, 36, { fill: C.grayL, c: C.line, label: 'F = P × A', size: 18 });
      s += t(60, 214, '1 MPa = 1 N/mm²', { size: 13, c: C.sub });
      return F.svg(480, 246, s);
    } },

  airline: { cards: ['공압 회로의 기본 부품'],
    cap: '공압 줄 — 만들고(압축기) → 다듬고(쿨러·드라이어·탱크·3점 세트) → 보내고(방향제어밸브) → 움직인다(실린더)',
    draw: function () {
      var s = '', y = 70;
      /* 압축기 */
      s += F.circle(46, y, 26, { fill: C.blueL, c: C.blue, w: 1.6 }) + poly([[34, y + 14], [46, y - 16], [58, y + 14]], { close: 1, fill: 'none', c: C.blue, w: 1.6 });
      s += t(46, y + 44, '압축기', { a: 'm', b: 1, size: 14 });
      /* 쿨러 · 드라이어 */
      s += box(96, y - 22, 76, 44, { fill: '#fff', c: C.ink, label: '쿨러\n드라이어', size: 13 });
      s += t(134, y + 44, '물기 제거', { a: 'm', size: 13, c: C.sub });
      /* 탱크 */
      s += rect(196, y - 26, 48, 52, C.grayL, { c: C.ink, w: 1.6, r: 18 });
      s += t(220, y + 44, '탱크', { a: 'm', b: 1, size: 14 });
      /* 3점 세트 */
      s += rect(270, y - 30, 196, 60, C.orangeL, { c: C.orange, w: 1.6, r: 8 });
      s += box(278, y - 20, 56, 40, { fill: '#fff', c: C.ink, label: '필터', size: 14 }) + box(340, y - 20, 60, 40, { fill: '#fff', c: C.ink, label: '레귤\n레이터', size: 13 }) + box(406, y - 20, 54, 40, { fill: '#fff', c: C.ink, label: '윤활기', size: 13 });
      s += t(368, y + 44, '3점 세트 · 청정 라인은 2점', { a: 'm', size: 13, b: 1, c: C.orange });
      s += arrow(72, y, 94, y, { head: 8, w: 1.8 }) + arrow(172, y, 194, y, { head: 8, w: 1.8 }) + arrow(244, y, 268, y, { head: 8, w: 1.8 });
      /* 둘째 줄: 밸브 → 실린더 */
      var y2 = 178;
      s += F.route([[466, y + 30], [466, 132], [60, 132], [60, y2 - 20]], { w: 1.8, head: 8 });
      s += rect(22, y2 - 18, 36, 36, '#fff', { c: C.ink, w: 1.6 }) + rect(58, y2 - 18, 36, 36, '#fff', { c: C.ink, w: 1.6 });
      s += arrow(30, y2 + 12, 50, y2 - 12, { w: 1.4, head: 6 }) + arrow(66, y2 - 12, 86, y2 + 12, { w: 1.4, head: 6 });
      s += t(58, y2 + 36, '방향제어밸브', { a: 'm', b: 1, size: 14 }) + t(58, y2 + 54, '갈 길을 정함', { a: 'm', size: 13, c: C.sub });
      s += box(142, y2 - 18, 60, 36, { fill: '#fff', c: C.ink, label: '유량\n조절', size: 13 });
      s += t(172, y2 + 36, '속도 조절', { a: 'm', size: 13, c: C.sub });
      s += rect(252, y2 - 22, 150, 44, C.blueL, { c: C.ink, w: 1.8 }) + rect(312, y2 - 22, 10, 44, C.grayM, { c: C.ink, w: 1.4 }) + rect(322, y2 - 5, 120, 10, C.grayM, { c: C.ink, w: 1.4 });
      s += t(327, y2 + 36, '실린더', { a: 'm', b: 1, size: 14 }) + t(327, y2 + 54, '단동 · 복동', { a: 'm', size: 13, c: C.sub });
      s += arrow(94, y2, 140, y2, { head: 8, w: 1.8 }) + arrow(202, y2, 250, y2, { head: 8, w: 1.8 });
      return F.svg(480, 246, s);
    } },

  circuit52: { cards: ['공압 회로의 기본 부품'],
    cap: '복동 실린더 회로 — 5포트 2위치 밸브가 길을 바꾸고, 체크밸브 붙이 유량조절밸브가 실린더에서 나가는 공기를 조여 속도를 잡는다(미터 아웃)',
    draw: CIRCUIT52 },

  photosensor: { cards: ['센서 — 장비의 눈'],
    cap: '광전센서 3가지 — 투과형(마주 본 두 개 사이를 물체가 끊음) · 반사형(물체에 맞고 돌아온 빛) · 회귀반사형(반사판 빛을 물체가 끊음)',
    draw: function () {
      var s = '';
      function unit(x, y, lab, col) { return box(x, y, 40, 30, { fill: col === C.blue ? C.blueL : C.greenL, c: col, label: lab, size: 13, lc: col }); }
      function obj(x, y) { return rect(x, y, 24, 36, C.grayM, { c: C.ink, w: 1.4, r: 3 }); }
      /* 투과형 */
      s += t(20, 28, '투과형', { b: 1, size: 16 }) + t(90, 28, '가장 멀리 · 정확', { size: 13, c: C.sub });
      s += unit(20, 44, '투광', C.blue) + unit(300, 44, '수광', C.green);
      s += line(60, 59, 170, 59, { c: C.red, w: 2 }) + line(194, 59, 300, 59, { c: C.red, w: 1.4, dash: '4 4' }) + obj(170, 41);
      /* 반사형 */
      s += t(20, 112, '반사형', { b: 1, size: 16 });
      s += box(20, 126, 40, 30, { fill: C.blueL, c: C.blue, label: '센서', size: 13, lc: C.blue }) + obj(170, 123);
      s += arrow(60, 136, 168, 136, { c: C.red, w: 1.8, head: 8 }) + arrow(168, 148, 60, 148, { c: C.red, w: 1.4, head: 8, dash: '4 3' });
      /* 회귀반사형 */
      s += t(20, 194, '회귀반사형', { b: 1, size: 16 });
      s += box(20, 208, 40, 30, { fill: C.blueL, c: C.blue, label: '센서', size: 13, lc: C.blue });
      s += rect(304, 206, 12, 34, C.orangeL, { c: C.orange, w: 1.4 }) + t(324, 223, '반사판', { size: 13, b: 1, c: C.orange });
      s += line(60, 218, 302, 218, { c: C.red, w: 1.8 }) + line(302, 228, 60, 228, { c: C.red, w: 1.4, dash: '4 3' });
      s += t(240, 262, '투명 웨이퍼 · 유리는 빛이 통과해 놓치기 쉽다', { a: 'm', size: 13, c: C.red });
      return F.svg(480, 276, s);
    } },

  proximity: { cards: ['센서 — 장비의 눈'],
    cap: '근접센서 — 유도형은 금속만, 정전용량형은 금속·비금속·액체까지 감지한다',
    draw: function () {
      var s = divider(240, 16, 196);
      function sensor(x, y, col) {
        return rect(x, y, 30, 60, C.grayL, { c: C.ink, w: 1.4, r: 3 }) + rect(x - 2, y + 60, 34, 8, col) +
          path('M' + (x - 8) + ',' + (y + 76) + ' Q' + (x + 15) + ',' + (y + 96) + ' ' + (x + 38) + ',' + (y + 76), { c: col, w: 1.4, dash: '4 3' });
      }
      function item(x, y, lab, fill, ok) {
        return rect(x, y, 44, 26, fill, { c: C.ink, w: 1.2, r: 3 }) + t(x + 22, y + 44, lab, { a: 'm', size: 13 }) +
          t(x + 22, y - 12, ok ? '○' : '✕', { a: 'm', size: 16, b: 1, c: ok ? C.green : C.red });
      }
      s += t(120, 26, '유도형 — 금속만', { a: 'm', b: 1, size: 16, c: C.blue });
      s += sensor(105, 40, C.blue) + item(40, 150, '금속', '#cbd5e1', 1) + item(98, 150, '플라스틱', '#fde68a', 0) + item(156, 150, '액체', '#bae6fd', 0);
      s += t(360, 26, '정전용량형 — 다 감지', { a: 'm', b: 1, size: 16, c: C.orange });
      s += sensor(345, 40, C.orange) + item(280, 150, '금속', '#cbd5e1', 1) + item(338, 150, '플라스틱', '#fde68a', 1) + item(396, 150, '액체', '#bae6fd', 1);
      return F.svg(480, 214, s);
    } },

  selfhold: { cards: ['시퀀스와 PLC'],
    cap: '자기유지 회로 — 기동(a접점)을 눌렀다 떼도 코일 자신의 a접점이 전기를 물고 있어 계속 동작한다. 정지(b접점)를 누르면 풀린다',
    draw: function () {
      var s = '', L = 30, R = 450, y1 = 70, y2 = 140;
      s += line(L, 30, L, 200, { w: 2.4 }) + line(R, 30, R, 200, { w: 2.4 });
      function aC(x, y, c) { return line(x, y - 14, x, y + 14, { c: c || C.ink, w: 2.4 }) + line(x + 16, y - 14, x + 16, y + 14, { c: c || C.ink, w: 2.4 }); }
      function bC(x, y) { return aC(x, y) + line(x - 4, y + 14, x + 20, y - 14, { w: 1.8 }); }
      /* 1줄 */
      s += line(L, y1, 90, y1, { w: 1.8 }) + aC(90, y1) + line(106, y1, 190, y1, { w: 1.8 }) + bC(190, y1) + line(206, y1, 360, y1, { w: 1.8 });
      s += path('M360,' + (y1 - 16) + ' A14,16 0 0 0 360,' + (y1 + 16), { w: 2.2 }) + path('M384,' + (y1 - 16) + ' A14,16 0 0 1 384,' + (y1 + 16), { w: 2.2 }) + line(398, y1, R, y1, { w: 1.8 });
      s += t(98, y1 - 30, '기동 PB1', { a: 'm', size: 14, b: 1 }) + t(98, y1 + 30, 'a접점', { a: 'm', size: 13, c: C.sub });
      s += t(198, y1 - 30, '정지 PB2', { a: 'm', size: 14, b: 1 }) + t(198, y1 + 30, 'b접점', { a: 'm', size: 13, c: C.sub });
      s += t(372, y1 - 30, '코일 M', { a: 'm', size: 14, b: 1 });
      /* 자기유지 가지 */
      s += F.route([[60, y1], [60, y2], [90, y2]], { w: 1.8, head: 1, c: C.orange }) + aC(90, y2, C.orange) + F.route([[106, y2], [140, y2], [140, y1]], { w: 1.8, head: 1, c: C.orange });
      s += t(62, y2 + 32, 'M 의 a접점 = 자기유지', { size: 14, b: 1, c: C.orange });
      /* 2줄 */
      var y3 = 200;
      s += t(240, y3 - 8, '').replace('<text', '<text');
      s += path('M60,' + y1 + ' L60,' + y2, { c: C.orange, w: 1.8 });
      s += t(290, y2, '손을 떼도 전기가 이 길로 돈다', { size: 13, c: C.orange }).replace('x="290"', 'x="176"');
      return F.svg(480, 206, s.replace(/<text[^>]*><\/text>/g, ''));
    } },

  plcscan: { cards: ['시퀀스와 PLC'],
    cap: 'PLC 의 스캔 — 입력을 읽고 → 프로그램대로 연산하고 → 출력을 바꾸는 한 바퀴를 아주 빠르게 되풀이한다',
    draw: function () {
      var s = '', cx = 240, cy = 118;
      s += rect(150, 30, 180, 176, C.grayL, { c: C.ink, w: 1.8, r: 10 }) + t(cx, 46, 'PLC', { a: 'm', b: 1, size: 16 });
      var P = [[cx, 76, '① 입력 읽기', C.green], [cx + 50, 150, '② 연산', C.blue], [cx - 50, 150, '③ 출력 갱신', C.orange]];
      P.forEach(function (p) { s += box(p[0] - 44, p[1] - 15, 88, 30, { fill: '#fff', c: p[3], label: p[2], size: 13, lc: p[3] }); });
      s += arrow(268, 92, 292, 134, { w: 1.6, head: 7 }) + arrow(244, 164, 238, 164, { w: 1.6, head: 7 }).replace('x1="244"', 'x1="244"') + arrow(188, 134, 212, 92, { w: 1.6, head: 7 });
      s += t(cx, 196, '반복', { a: 'm', size: 13, b: 1, c: C.sub });
      /* 입력기기 · 출력기기 */
      ['버튼', '센서', '리밋스위치'].forEach(function (n, i) { s += box(14, 50 + i * 46, 100, 32, { fill: C.greenL, c: C.green, label: n, size: 14 }); });
      ['솔레노이드밸브', '램프', '전자접촉기'].forEach(function (n, i) { s += box(366, 50 + i * 46, 104, 32, { fill: C.orangeL, c: C.orange, label: n, size: 13 }); });
      s += arrow(116, 112, 148, 112, { c: C.green, w: 2, head: 9 }) + arrow(332, 112, 364, 112, { c: C.orange, w: 2, head: 9 });
      s += t(64, 30, '입력기기', { a: 'm', b: 1, size: 14, c: C.green }) + t(418, 30, '출력기기', { a: 'm', b: 1, size: 14, c: C.orange });
      return F.svg(480, 220, s);
    } },

  /* ═══════════ 12단원 · 안전관리 ═══════════ */
  loto: { cards: ['LOTO — 정비 전 제1원칙'],
    cap: 'LOTO — 차단기·밸브를 자물쇠로 잠그고(Lock) 표지를 달고(Tag) 남은 에너지를 뺀 뒤 작업한다. 열쇠는 작업자 본인이 갖고 본인이 푼다',
    draw: function () {
      var s = '';
      /* 차단기 */
      s += rect(30, 40, 110, 150, C.grayL, { c: C.ink, w: 1.8, r: 8 });
      s += rect(62, 70, 46, 70, '#fff', { c: C.ink, w: 1.4, r: 4 }) + rect(74, 112, 22, 22, C.red, { r: 3 }) + t(85, 84, 'OFF', { a: 'm', size: 13, b: 1, c: C.red });
      /* 자물쇠 */
      s += path('M92,146 L92,136 A14,14 0 0 1 120,136 L120,146', { w: 3, c: C.ink }) + rect(86, 146, 40, 32, C.orange, { r: 4 }) + dot(106, 160, 4, '#fff');
      /* 표지 */
      s += line(126, 164, 150, 190, { w: 1.2 }) + rect(146, 188, 70, 40, C.yellowL, { c: C.red, w: 1.6, r: 4 });
      s += t(181, 202, '작업 중', { a: 'm', size: 13, b: 1, c: C.red, halo: false }) + t(181, 219, '홍길동', { a: 'm', size: 13, halo: false });
      s += t(106, 30, '차단기', { a: 'm', b: 1, size: 15 }).replace('x="106"', 'x="85"');
      /* 순서 */
      var st = [['잠금 (Lock)', C.orange], ['표지 (Tag)', C.red], ['잔류 에너지 방출', C.purple], ['확인 후 작업', C.blue], ['끝나면 본인이 해제', C.green]];
      st.forEach(function (a, i) {
        var y = 26 + i * 40;
        s += F.num(262, y + 14, i + 1, { c: a[1], r: 12 }) + t(282, y + 14, a[0], { b: 1, size: 15, c: a[1] });
        if (i < 4) s += line(262, y + 28, 262, y + 40, { c: C.grayM, w: 2 });
      });
      s += t(282, 139, '방전 · 잔압 · 스프링', { size: 13, c: C.sub });
      return F.svg(480, 240, s);
    } },

  upwind: { cards: ['화학물질과 가스'],
    cap: '가스 누출 경보 — 가스는 바람을 타고 퍼진다. 바람이 불어오는 쪽(풍상)으로 대피하고, 임의로 다가가지 않는다',
    draw: function () {
      var s = '';
      function person(x, y, col) {
        return F.circle(x, y, 8, { fill: col, c: col, w: 1 }) + line(x, y + 8, x, y + 34, { c: col, w: 3 }) + line(x, y + 16, x - 10, y + 26, { c: col, w: 3 }) + line(x, y + 16, x + 10, y + 26, { c: col, w: 3 }) +
          line(x, y + 34, x - 9, y + 52, { c: col, w: 3 }) + line(x, y + 34, x + 9, y + 52, { c: col, w: 3 });
      }
      /* 바람 */
      for (var k = 0; k < 3; k++) s += arrow(40, 34 + k * 14, 150, 34 + k * 14, { c: C.blue, w: 1.6, head: 8 });
      s += t(95, 22, '바람', { a: 'm', b: 1, c: C.blue }).replace('y="22"', 'y="18"');
      /* 누출원 + 구름 */
      s += path('M216,190 L216,120 Q216,104 232,104 Q248,104 248,120 L248,190 Z', { fill: C.orangeL, c: C.orange, w: 1.6 }) + rect(228, 94, 8, 10, C.ink);
      s += t(232, 210, '누출', { a: 'm', b: 1, c: C.orange });
      [[280, 110, 22], [318, 120, 28], [362, 128, 30], [404, 136, 26]].forEach(function (c) { s += F.circle(c[0], c[1], c[2], { fill: C.redL, c: C.red, w: 1, }).replace('fill="' + C.redL + '"', 'fill="' + C.redL + '" fill-opacity=".8"'); });
      s += arrow(252, 100, 300, 92, { c: C.red, w: 1.4, head: 7 });
      /* 사람 */
      s += person(90, 132, C.green) + arrow(76, 150, 30, 150, { c: C.green, w: 2.4, head: 10 });
      s += t(90, 204, '바람 위(풍상)로', { a: 'm', b: 1, c: C.green }) + t(90, 224, '대피 ○', { a: 'm', b: 1, c: C.green });
      s += person(420, 132, C.sub) + t(420, 204, '가스가 가는 쪽', { a: 'm', b: 1, size: 14, c: C.red }) + t(420, 224, '✕', { a: 'm', b: 1, size: 18, c: C.red });
      return F.svg(480, 240, s);
    } },

  esd: { cards: ['정전기(ESD)와 전기 안전'],
    cap: 'ESD 대책 — 몸의 정전기를 손목띠·도전성 매트로 땅(접지)에 흘려보내고, 이온라이저로 공기 중에서 중화한다',
    draw: function () {
      var s = '';
      function gnd(x, y) { return line(x, y, x, y + 10, { w: 1.6 }) + line(x - 12, y + 10, x + 12, y + 10, { w: 2 }) + line(x - 8, y + 15, x + 8, y + 15, { w: 2 }) + line(x - 4, y + 20, x + 4, y + 20, { w: 2 }); }
      /* 작업대 */
      s += rect(150, 120, 240, 12, C.grayM, { c: C.ink, w: 1.4 }) + rect(170, 112, 150, 8, C.greenL, { c: C.green, w: 1.2 });
      s += rect(230, 104, 28, 8, '#374151', { r: 2 });
      /* 사람 팔 · 손목띠 */
      s += path('M60,60 Q100,70 140,98 L196,106', { c: C.ink, w: 10 }).replace('stroke-width="10"', 'stroke-width="10" opacity=".25"');
      s += rect(150, 92, 16, 18, C.blue, { r: 3 });
      s += path('M158,110 Q150,160 110,170 L110,188', { c: C.blue, w: 1.8 }) + gnd(110, 188);
      s += callout(158, 96, 160, 44, '손목띠 — 맨살에 밀착', { c: C.blue, tc: C.blue, b: 1, size: 14, a: 's' });
      /* 매트 접지 */
      s += path('M318,120 L318,170 L340,170 L340,188', { c: C.green, w: 1.8 }) + gnd(340, 188);
      s += callout(310, 116, 356, 150, '도전성 매트', { c: C.green, tc: C.green, b: 1, size: 14 });
      s += callout(244, 104, 244, 76, '칩', { size: 14, a: 'm' });
      /* 이온라이저 */
      s += rect(410, 40, 50, 36, C.purpleL, { c: C.purple, w: 1.4, r: 6 }) + t(435, 90, '이온라이저', { a: 'm', size: 13, b: 1, c: C.purple });
      s += t(396, 66, '+  −', { a: 'e', size: 15, b: 1, c: C.purple }) + arrow(408, 72, 300, 104, { c: C.purple, w: 1.4, head: 7, dash: '4 3' });
      s += t(225, 222, '접지', { a: 'm', b: 1, size: 14 }).replace('x="225"', 'x="225"') + line(122, 218, 200, 218, { c: C.sub, w: 1, dash: '3 3' }) + line(250, 218, 328, 218, { c: C.sub, w: 1, dash: '3 3' });
      return F.svg(480, 236, s);
    } },

  /* ═══════════ 13단원 · 기계요소와 정비 기초 ═══════════ */
  boltorder: { cards: ['조임 — 정비의 8할은 볼트다'],
    cap: '플랜지 볼트는 대각선 순서로 2~3회 나눠 조인다(한쪽부터 다 조이면 기울어 샌다). M10 × 1.5 = 바깥지름 10mm · 피치 1.5mm',
    draw: function () {
      var s = '', cx = 120, cy = 118, R = 70;
      s += F.circle(cx, cy, 92, { fill: C.grayL, c: C.ink, w: 2 }) + F.circle(cx, cy, 40, { fill: '#fff', c: C.ink, w: 1.6 });
      var order = [0, 4, 2, 6, 1, 5, 3, 7]; /* 번호 k 가 놓일 자리(45° 칸) */
      for (var k = 0; k < 8; k++) {
        var a = -Math.PI / 2 + order[k] * Math.PI / 4, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
        s += F.num(x, y, k + 1, { c: k < 2 ? C.red : (k < 4 ? C.orange : C.blue), r: 12, size: 13 });
      }
      s += line(cx, cy - R + 14, cx, cy + R - 14, { c: C.red, w: 1.2, dash: '5 4' }) + line(cx + R - 14, cy, cx - R + 14, cy, { c: C.orange, w: 1.2, dash: '5 4' });
      s += t(cx, 228, '대각선 순서 · 2~3회', { a: 'm', b: 1, size: 15 });
      /* 볼트 */
      var bx = 300, by = 60;
      s += rect(bx, by - 30, 60, 30, C.grayM, { c: C.ink, w: 1.6, r: 2 }) + rect(bx + 14, by, 32, 110, '#fff', { c: C.ink, w: 1.6 });
      for (var i = 0; i < 9; i++) s += line(bx + 14, by + 8 + i * 12, bx + 46, by + 14 + i * 12, { w: 1.2 });
      s += F.dim(bx + 14, by + 124, bx + 46, by + 124, '10', { off: 14, side: -1, size: 14 });
      s += F.dim(bx + 54, by + 32, bx + 54, by + 44, '', { off: 0 }) + t(bx + 64, by + 38, '피치 1.5', { size: 14, b: 1, c: C.blue });
      s += t(bx + 30, by + 178, 'M10 × 1.5', { a: 'm', b: 1, size: 16 });
      s += t(430, 160, '규정 토크로\n토크렌치', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 246, s);
    } },

  bearing: { cards: ['베어링'],
    cap: '구름 베어링(볼) — 바깥바퀴·안바퀴 사이를 볼이 굴러 마찰이 작다. 호칭번호 뒤 두 자리 × 5 = 안지름 (6208 → 40mm)',
    draw: function () {
      var s = '', cx = 120, cy = 118;
      s += F.circle(cx, cy, 90, { fill: C.grayM, c: C.ink, w: 2 }) + F.circle(cx, cy, 72, { fill: '#fff', c: C.ink, w: 1.4 });
      s += F.circle(cx, cy, 52, { fill: C.grayM, c: C.ink, w: 1.4 }) + F.circle(cx, cy, 38, { fill: '#fff', c: C.ink, w: 2 });
      s += F.circle(cx, cy, 62, { fill: 'none', c: C.orange, w: 1, }).replace('stroke-width="1"', 'stroke-width="1" stroke-dasharray="3 3"');
      for (var k = 0; k < 10; k++) { var a = k * Math.PI / 5; s += F.circle(cx + 62 * Math.cos(a), cy + 62 * Math.sin(a), 9, { fill: C.blueL, c: C.blue, w: 1.4 }); }
      s += callout(cx + 80, cy - 40, 250, 40, '바깥바퀴(외륜)', { size: 14 });
      s += callout(cx + 62, cy, 250, 88, '볼', { size: 14, c: C.blue, tc: C.blue, b: 1 });
      s += callout(cx + 44, cy + 22, 250, 136, '안바퀴(내륜)', { size: 14 });
      s += F.dim(cx - 38, cy, cx + 38, cy, '안지름', { off: 0, size: 13 });
      /* 호칭 */
      s += box(250, 170, 64, 40, { fill: C.grayL, c: C.line, label: '62', size: 18 }) + box(318, 170, 64, 40, { fill: C.orangeL, c: C.orange, label: '08', size: 18, lc: C.orange });
      s += t(350, 228, '08 × 5 = 40 mm', { a: 'm', b: 1, size: 15, c: C.orange });
      s += t(420, 190, '6208', { a: 'm', b: 1, size: 15, c: C.sub }).replace('x="420"', 'x="424"');
      return F.svg(480, 244, s);
    } },

  lube: { cards: ['윤활'],
    cap: '윤활 — 두 면 사이에 기름막(유막)을 만들어 마찰을 줄인다. 점도가 너무 높으면 저항·발열, 너무 낮으면 유막이 끊긴다',
    draw: function () {
      var s = '';
      /* 기본 */
      s += rect(60, 40, 220, 40, C.grayM, { c: C.ink, w: 1.6 }) + rect(30, 92, 280, 40, C.grayM, { c: C.ink, w: 1.6 });
      s += rect(30, 80, 280, 12, '#fde68a', { c: C.orange, w: 1 });
      s += arrow(170, 30, 250, 30, { c: C.ink, w: 1.8, head: 8 }).replace('y1="30"', 'y1="24"').replace('y2="30"', 'y2="24"');
      s += callout(296, 86, 340, 70, '유막', { c: C.orange, tc: C.orange, b: 1 });
      s += t(340, 100, '감마 · 냉각 · 밀봉', { size: 13, ans: 1 }) + t(340, 118, '방청 · 청정', { size: 13 });
      /* 점도 */
      s += t(120, 158, '점도가 너무 높다', { a: 'm', b: 1, size: 15, c: C.red, ans: 1 }) + t(360, 158, '점도가 너무 낮다', { a: 'm', b: 1, size: 15, c: C.red, ans: 1 });
      s += rect(40, 170, 160, 16, C.grayM, { c: C.ink, w: 1.2 }) + rect(40, 186, 160, 20, '#fcd34d', { c: C.orange, w: 1 }) + rect(40, 206, 160, 16, C.grayM, { c: C.ink, w: 1.2 });
      s += t(214, 196, '저항·발열', { size: 13, b: 1, c: C.red });
      s += path('M280,188 L340,188 L350,196 L360,188 L440,188 L440,172 L280,172 Z', { fill: C.grayM, c: C.ink, w: 1.2 }) + path('M280,194 L338,194 L350,204 L362,194 L440,194', { c: C.orange, w: 1.4 });
      s += path('M280,200 L340,200 L350,197 L360,200 L440,200 L440,216 L280,216 Z', { fill: C.grayM, c: C.ink, w: 1.2 });
      s += t(350, 234, '유막이 끊겨 금속끼리 닿음', { a: 'm', size: 13, b: 1, c: C.red });
      return F.svg(480, 248, s);
    } },

  pulley: { cards: ['동력 전달과 축 정렬'],
    cap: '회전비 — N₁ × D₁ = N₂ × D₂. 작은 풀리가 큰 풀리를 돌리면 느려지는 대신 토크가 커진다',
    draw: function () {
      var s = '', a = [110, 100, 36], b = [340, 100, 76];
      s += line(a[0], a[1] - a[2], b[0], b[1] - b[2], { w: 3 }) + line(a[0], a[1] + a[2], b[0], b[1] + b[2], { w: 3 });
      s += F.circle(a[0], a[1], a[2], { fill: C.blueL, c: C.blue, w: 2 }) + F.circle(b[0], b[1], b[2], { fill: C.orangeL, c: C.orange, w: 2 });
      s += dot(a[0], a[1], 5) + dot(b[0], b[1], 5);
      s += F.dim(a[0] - a[2], a[1] + a[2] + 18, a[0] + a[2], a[1] + a[2] + 18, 'D₁', { size: 15 });
      s += F.dim(b[0] - b[2], b[1] + b[2] + 18, b[0] + b[2], b[1] + b[2] + 18, 'D₂', { size: 15 });
      s += t(a[0], 26, '모터 N₁ — 빠르다', { a: 'm', b: 1, size: 15, c: C.blue }) + t(b[0], 14, '').replace('<text', '<text');
      s += t(b[0] + 30, 196, '').replace('<text', '<text');
      s += t(b[0] + 106, 40, 'N₂', { a: 'm', b: 1, size: 15, c: C.orange }) + t(b[0] + 106, 60, '느리다', { a: 'm', size: 13, c: C.orange }) + t(b[0] + 106, 78, '토크↑', { a: 'm', size: 13, b: 1, c: C.orange });
      s += box(90, 214, 300, 34, { fill: C.grayL, c: C.line, label: 'N₁ × D₁ = N₂ × D₂', size: 17 });
      return F.svg(480, 258, s.replace(/<text[^>]*><\/text>/g, ''));
    } },

  misalign: { cards: ['동력 전달과 축 정렬'],
    cap: '축 정렬 불량 — 모터 축과 부하 축이 옆으로 비껴 있거나(평행 어긋남) 꺾여 있으면(각도 어긋남) 진동과 베어링 조기 파손이 생긴다',
    draw: function () {
      var s = divider(240, 16, 190);
      function shafts(x0, dy, ang) {
        var o = rect(x0, 70, 90, 50, C.blueL, { c: C.blue, w: 1.6, r: 4 }) + rect(x0 + 90, 88, 50, 14, C.grayM, { c: C.ink, w: 1.2 });
        o += F.g(rect(x0 + 146, 88 + dy, 50, 14, C.grayM, { c: C.ink, w: 1.2 }), { r: 0 });
        return o;
      }
      s += t(120, 30, '평행 어긋남', { a: 'm', b: 1, size: 16, c: C.red });
      s += rect(16, 70, 80, 50, C.blueL, { c: C.blue, w: 1.6, r: 4 }) + rect(96, 88, 60, 14, C.grayM, { c: C.ink, w: 1.2 }) + rect(158, 100, 64, 14, C.grayM, { c: C.ink, w: 1.2 });
      s += line(20, 95, 230, 95, { c: C.sub, w: 1, dash: 'center' }) + line(150, 107, 230, 107, { c: C.red, w: 1, dash: 'center' });
      s += F.dim(226, 95, 226, 107, '', { off: 0 }) + t(56, 95, '모터', { a: 'm', size: 13, b: 1, c: C.blue, halo: false });
      s += t(360, 30, '각도 어긋남', { a: 'm', b: 1, size: 16, c: C.red });
      s += rect(256, 70, 80, 50, C.blueL, { c: C.blue, w: 1.6, r: 4 }) + rect(336, 88, 60, 14, C.grayM, { c: C.ink, w: 1.2 });
      s += '<g transform="rotate(10 398 95)">' + rect(398, 88, 64, 14, C.grayM, { c: C.ink, w: 1.2 }) + line(398, 95, 470, 95, { c: C.red, w: 1, dash: 'center' }) + '</g>';
      s += line(260, 95, 470, 95, { c: C.sub, w: 1, dash: 'center' }) + t(296, 95, '모터', { a: 'm', size: 13, b: 1, c: C.blue, halo: false });
      s += path('M440,95 A42,42 0 0 1 438,104', { c: C.red, w: 1.4 });
      s += t(120, 150, '축이 옆으로 비껴 있다', { a: 'm', size: 14 }) + t(360, 150, '축이 꺾여 있다', { a: 'm', size: 14 });
      s += box(60, 180, 360, 34, { fill: C.grayL, c: C.line, label: '다이얼 게이지 · 레이저로 맞춘다', size: 15 });
      return F.svg(480, 226, s);
    } },

  oring: { cards: ['실(Seal) — 반도체에서 특히 중요'],
    cap: 'O-링은 홈에 넣고 눌러 막는다. 진공 KF 플랜지는 센터링 링(O-링 포함)을 사이에 끼우고 클램프로 조인다',
    draw: function () {
      var s = divider(220, 16, 214);
      /* 누르기 전 · 후 */
      function groove(x0, squeezed) {
        var o = rect(x0, 110, 80, 40, C.grayM, { c: C.ink, w: 1.4 }) + rect(x0 + 24, 110, 32, 20, '#fff', { c: C.ink, w: 1.2 });
        o += squeezed ? rect(x0, 90, 80, 20, C.grayL, { c: C.ink, w: 1.4 }) + ell(x0 + 40, 120, 15, 10, { fill: '#111827', c: '#111827' })
          : rect(x0, 62, 80, 20, C.grayL, { c: C.ink, w: 1.4 }) + F.circle(x0 + 40, 118, 13, { fill: '#111827', c: '#111827', w: 1 });
        return o;
      }
      s += groove(16, 0) + groove(116, 1);
      s += arrow(156, 58, 156, 86, { c: C.red, w: 2, head: 8 });
      s += t(56, 176, '누르기 전', { a: 'm', size: 14 }) + t(156, 176, '눌려 막음', { a: 'm', size: 14, b: 1, c: C.blue });
      s += t(106, 30, 'O-링과 홈', { a: 'm', b: 1, size: 16 });
      s += t(106, 204, '재사용 금지 · 흠집 확인', { a: 'm', size: 13, c: C.red, b: 1 });
      /* KF */
      s += t(350, 30, 'KF 플랜지 체결', { a: 'm', b: 1, size: 16 });
      s += rect(250, 90, 80, 22, '#fff', { c: C.ink, w: 1.4 }) + rect(300, 60, 30, 82, C.grayL, { c: C.ink, w: 1.6 });
      s += rect(370, 90, 80, 22, '#fff', { c: C.ink, w: 1.4 }) + rect(370, 60, 30, 82, C.grayL, { c: C.ink, w: 1.6 });
      s += rect(334, 64, 32, 74, C.blueL, { c: C.blue, w: 1.2 }) + ell(350, 64, 8, 5, { fill: '#111827', c: '#111827' }) + ell(350, 138, 8, 5, { fill: '#111827', c: '#111827' });
      s += path('M296,56 L350,40 L404,56', { c: C.orange, w: 4 }) + path('M296,146 L350,162 L404,146', { c: C.orange, w: 4 });
      s += callout(404, 56, 452, 40, '클램프', { c: C.orange, tc: C.orange, b: 1, size: 14, a: 'm' });
      s += callout(350, 100, 350, 186, '센터링 링 + O-링', { c: C.blue, tc: C.blue, b: 1, size: 14, a: 'm' });
      return F.svg(480, 222, s);
    } },

  /* ═══════════ 14단원 · 전기·전자 기초 ═══════════ */
  rcircuit: { cards: ['옴의 법칙과 전력'],
    cap: '합성저항 — 직렬은 더하고(전류가 같다), 병렬은 줄어든다(전압이 같다). 10Ω 두 개면 직렬 20Ω · 병렬 5Ω',
    draw: function () {
      var s = divider(240, 16, 170);
      function res(x, y, lab, vert) {
        var p = [];
        for (var i = 0; i <= 8; i++) p.push(vert ? [x + (i % 2 ? 8 : -8) * (i && i < 8 ? 1 : 0), y + i * 5] : [x + i * 5, y + (i % 2 ? -8 : 8) * (i && i < 8 ? 1 : 0)]);
        return poly(p, { w: 2 }) + (lab ? t(vert ? x + 16 : x + 20, vert ? y + 20 : y - 18, lab, { a: vert ? 's' : 'm', size: 14, b: 1 }) : '');
      }
      s += t(120, 30, '직렬', { a: 'm', b: 1, size: 17, c: C.blue });
      s += line(20, 80, 50, 80) + res(50, 80, '10Ω') + line(90, 80, 130, 80) + res(130, 80, '10Ω') + line(170, 80, 220, 80);
      s += t(120, 124, '= 20 Ω', { a: 'm', b: 1, size: 17, c: C.blue }) + t(120, 150, '전류가 같다', { a: 'm', size: 13, c: C.sub });
      s += t(360, 30, '병렬', { a: 'm', b: 1, size: 17, c: C.orange });
      s += line(260, 88, 300, 88) + line(300, 64, 300, 112) + line(300, 64, 330, 64) + line(300, 112, 330, 112);
      s += res(330, 64, '10Ω') + res(330, 112, '') + t(350, 134, '10Ω', { a: 'm', size: 14, b: 1 });
      s += line(370, 64, 400, 64) + line(370, 112, 400, 112) + line(400, 64, 400, 112) + line(400, 88, 460, 88);
      s += t(360, 160, '= 5 Ω · 전압이 같다', { a: 'm', b: 1, size: 15, c: C.orange });
      s += box(40, 184, 400, 44, { fill: C.grayL, c: C.line });
      s += t(240, 198, 'V = I × R   ·   P = V × I', { a: 'm', b: 1, size: 16, halo: false }) + t(240, 217, '예: 24 V ÷ 12 Ω = 2 A · 24 × 2 = 48 W', { a: 'm', size: 13, halo: false });
      return F.svg(480, 240, s);
    } },

  ydelta: { cards: ['직류·교류와 3상 모터'],
    cap: '3상 결선 — Y(스타)로 기동해 전류를 낮추고 Δ(델타)로 운전한다(Y-Δ 기동). 세 선 중 두 선을 바꾸면 역회전',
    draw: function () {
      var s = '';
      function coil(x1, y1, x2, y2) {
        var n = 4, dx = (x2 - x1) / n, dy = (y2 - y1) / n, len = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / len * 7, ny = (x2 - x1) / len * 7, d = 'M' + x1 + ',' + y1;
        for (var i = 0; i < n; i++) d += ' Q' + (x1 + dx * (i + 0.5) + nx) + ',' + (y1 + dy * (i + 0.5) + ny) + ' ' + (x1 + dx * (i + 1)) + ',' + (y1 + dy * (i + 1));
        return path(d, { c: C.blue, w: 2 });
      }
      /* Y */
      var c = [80, 110], P = [[80, 44], [24, 150], [136, 150]];
      P.forEach(function (p) { s += coil(c[0], c[1], p[0], p[1]); });
      s += dot(c[0], c[1], 4) + t(80, 26, 'U', { a: 'm', b: 1, size: 14 }) + t(14, 164, 'V', { a: 'm', b: 1, size: 14 }) + t(146, 164, 'W', { a: 'm', b: 1, size: 14 });
      s += t(80, 190, 'Y (스타)', { a: 'm', b: 1, size: 16, c: C.blue }) + t(80, 210, '기동 — 전류↓', { a: 'm', size: 13 });
      /* Δ */
      var Q = [[240, 44], [186, 150], [294, 150]];
      s += coil(Q[0][0], Q[0][1], Q[1][0], Q[1][1]) + coil(Q[1][0], Q[1][1], Q[2][0], Q[2][1]) + coil(Q[2][0], Q[2][1], Q[0][0], Q[0][1]);
      s += t(240, 26, 'U', { a: 'm', b: 1, size: 14 }) + t(176, 164, 'V', { a: 'm', b: 1, size: 14 }) + t(304, 164, 'W', { a: 'm', b: 1, size: 14 });
      s += t(240, 190, 'Δ (델타)', { a: 'm', b: 1, size: 16, c: C.orange }) + t(240, 210, '정상 운전', { a: 'm', size: 13 });
      /* 역회전 */
      s += F.circle(410, 100, 34, { fill: C.grayL, c: C.ink, w: 1.8, label: 'M', size: 18 });
      ['R', 'S', 'T'].forEach(function (n, i) { s += t(334, 60 + i * 30, n, { a: 'm', b: 1, size: 14 }); });
      s += line(344, 60, 380, 76, { w: 1.6 }) + line(344, 90, 376, 118, { c: C.red, w: 1.8 }) + line(344, 120, 376, 94, { c: C.red, w: 1.8 });
      s += path('M392,60 A30,30 0 0 0 386,138', { c: C.red, w: 1.6 }) + arrow(388, 132, 384, 140, { c: C.red, w: 1.6, head: 8 });
      s += t(404, 190, '두 선을 바꾸면', { a: 'm', b: 1, size: 14, c: C.red }) + t(404, 210, '역회전', { a: 'm', b: 1, size: 14, c: C.red });
      return F.svg(480, 226, s);
    } },

  pn: { cards: ['반도체 소자'],
    cap: 'PN 접합(다이오드) — P 쪽에 + 를 걸면 전류가 흐르고(순방향, 실리콘 약 0.7V 강하), 반대로 걸면 막힌다(역방향) → 정류',
    draw: function () {
      var s = '';
      /* 기호 */
      s += line(150, 40, 214, 40, { w: 2 }) + poly([[214, 24], [214, 56], [246, 40]], { close: 1, fill: C.ink, w: 1 }) + line(246, 22, 246, 58, { w: 3 }) + line(246, 40, 310, 40, { w: 2 });
      s += t(150, 18, '애노드(P)', { size: 13, b: 1 }) + t(310, 18, '캐소드(N)', { a: 'e', size: 13, b: 1 });
      function panel(x0, fwd) {
        var o = rect(x0 + 40, 90, 60, 50, C.redL, { c: C.red, w: 1.4 }) + rect(x0 + 100, 90, 60, 50, C.blueL, { c: C.blue, w: 1.4 });
        o += t(x0 + 70, 115, 'P', { a: 'm', b: 1, size: 18, c: C.red, halo: false }) + t(x0 + 130, 115, 'N', { a: 'm', b: 1, size: 18, c: C.blue, halo: false });
        o += poly([[x0 + 40, 115], [x0 + 20, 115], [x0 + 20, 176], [x0 + 86, 176]], { w: 1.6 }) + poly([[x0 + 160, 115], [x0 + 180, 115], [x0 + 180, 176], [x0 + 114, 176]], { w: 1.6 });
        o += line(x0 + 86, 166, x0 + 86, 186, { w: 2.4 }) + line(x0 + 94, 170, x0 + 94, 182, { w: 2.4 });
        o += t(fwd ? x0 + 78 : x0 + 102, 198, '+', { a: 'm', b: 1, size: 15, c: C.red }) + t(fwd ? x0 + 102 : x0 + 78, 198, '−', { a: 'm', b: 1, size: 15 });
        o += fwd ? arrow(x0 + 50, 154, x0 + 150, 154, { c: C.green, w: 2.4, head: 10 }) : t(x0 + 100, 156, '✕ 막힘', { a: 'm', b: 1, size: 15, c: C.red });
        return o;
      }
      s += panel(20, 1) + panel(260, 0);
      s += t(120, 228, '순방향 — 흐른다', { a: 'm', b: 1, size: 15, c: C.green }) + t(360, 228, '역방향 — 막힌다', { a: 'm', b: 1, size: 15, c: C.red });
      return F.svg(480, 244, s.replace('<path d="M20,115', '<path d="M20,115'));
    } },

  meterconn: { cards: ['전기 점검 계측기'],
    cap: '재는 법 — 전압은 부하에 나란히(병렬), 전류는 회로를 끊고 사이에(직렬), 클램프미터는 선을 끊지 않고 물려서 잰다',
    draw: function () {
      var s = '';
      /* 회로 */
      s += poly([[60, 60], [60, 180], [420, 180], [420, 60], [300, 60]], { w: 1.8 }) + line(60, 60, 150, 60, { w: 1.8 }) + line(210, 60, 250, 60, { w: 1.8 });
      s += line(52, 110, 68, 110, { w: 2.6 }) + line(56, 122, 64, 122, { w: 2.6 }) + t(40, 116, '전원', { a: 'e', size: 13 });
      /* 부하 */
      s += box(250, 44, 50, 32, { fill: C.yellowL, c: C.orange, label: '부하', size: 14 });
      /* 전류계 직렬 */
      s += F.circle(180, 60, 20, { fill: C.blueL, c: C.blue, w: 2, label: 'A', size: 17, lc: C.blue });
      s += t(180, 104, '전류계 — 직렬', { a: 'm', size: 14, b: 1, c: C.blue }) + t(180, 122, '회로를 끊고 사이에', { a: 'm', size: 13, c: C.sub });
      /* 전압계 병렬 */
      s += poly([[250, 60], [250, 24], [264, 24]], { w: 1.4 }) + poly([[300, 60], [300, 24], [286, 24]], { w: 1.4 });
      s += F.circle(275, 24, 12, { fill: C.greenL, c: C.green, w: 1.8, label: 'V', size: 14, lc: C.green });
      s += t(330, 24, '전압계 — 병렬', { size: 14, b: 1, c: C.green });
      /* 클램프 */
      s += path('M330,166 A22,22 0 1 1 330,194', { c: C.purple, w: 5 }) + rect(290, 196, 40, 26, C.purpleL, { c: C.purple, w: 1.4, r: 4 });
      s += t(404, 140, '클램프미터\n선을 물린다', { a: 'm', size: 14, b: 1, c: C.purple });
      s += t(60, 214, '저항은 전원을 끄고 잰다', { size: 13, b: 1, c: C.red });
      return F.svg(480, 232, s);
    } },

  /* ═══════════ 15단원 · 측정 · 진단 · 고장분석 ═══════════ */
  caliper: { cards: ['길이 측정 3종'],
    cap: '버니어 캘리퍼스 — 아래 턱으로 바깥지름, 위 턱으로 안지름, 끝의 깊이 바로 깊이를 잰다. 최소 읽음 0.05 / 0.02mm',
    draw: function () {
      var s = '';
      /* 어미자 막대 */
      s += rect(40, 90, 420, 26, C.grayL, { c: C.ink, w: 1.6 });
      for (var x = 90; x < 452; x += 8) s += line(x, 90, x, x % 40 === 10 ? 104 : 98, { w: 1 });
      /* 고정 턱 */
      s += poly([[40, 90], [40, 190], [60, 190], [90, 150], [90, 116]], { close: 1, fill: C.grayM, w: 1.6 });
      s += poly([[56, 90], [56, 56], [66, 56], [80, 90]], { close: 1, fill: C.grayM, w: 1.4 });
      /* 움직이는 턱 (아들자) */
      s += rect(170, 84, 110, 40, C.blueL, { c: C.blue, w: 1.6, r: 3 });
      for (x = 180; x < 272; x += 8.6) s += line(x, 116, x, 108, { c: C.blue, w: 1 });
      s += poly([[170, 124], [170, 190], [150, 190], [124, 150], [124, 124]], { close: 1, fill: C.blueL, c: C.blue, w: 1.6 });
      s += poly([[176, 84], [176, 56], [166, 56], [150, 84]], { close: 1, fill: C.blueL, c: C.blue, w: 1.4 });
      /* 깊이 바 */
      s += rect(460, 99, 10, 8, C.blue);
      /* 물체 */
      s += rect(90, 150, 34, 40, C.orangeL, { c: C.orange, w: 1.4 });
      s += callout(107, 170, 40, 222, '바깥 측정', { c: C.orange, tc: C.orange, b: 1, size: 14, a: 's' }).replace('x="46"', 'x="30"');
      s += callout(110, 62, 120, 30, '안쪽 측정', { b: 1, size: 14 });
      s += callout(466, 103, 440, 150, '깊이 바', { b: 1, size: 14, a: 'm' });
      s += callout(320, 96, 330, 60, '어미자', { size: 14 });
      s += callout(240, 120, 250, 170, '아들자', { size: 14, c: C.blue, tc: C.blue, b: 1 });
      s += t(290, 214, '마이크로미터 0.01 · 다이얼 게이지 0.01', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 232, s);
    } },

  vibspec: { cards: ['상태 감시 — 예지보전의 눈'],
    cap: '진동 스펙트럼 — 회전수의 1배(1×) 성분이 크면 불평형, 2배(2×)가 크면 축 정렬 불량, 고주파 성분이면 베어링 결함',
    draw: function () {
      var s = '', P = [['불평형', [70, 14, 8], 0, C.red], ['축 정렬 불량', [30, 64, 14], 0, C.orange], ['베어링 결함', [18, 12, 8], 1, C.purple]];
      P.forEach(function (p, i) {
        var x0 = 20 + i * 154, y0 = 160;
        s += line(x0, y0, x0 + 140, y0, { w: 1.4 }) + line(x0, y0, x0, 60, { w: 1.4 });
        p[1].forEach(function (h, k) { var big = h === Math.max.apply(null, p[1]) && !p[2]; s += rect(x0 + 14 + k * 26, y0 - h, 12, h, big ? p[3] : C.grayM); });
        s += t(x0 + 20, y0 + 16, '1×', { a: 'm', size: 13 }) + t(x0 + 46, y0 + 16, '2×', { a: 'm', size: 13 }) + t(x0 + 72, y0 + 16, '3×', { a: 'm', size: 13 });
        if (p[2]) { for (var k = 0; k < 5; k++) s += rect(x0 + 96 + k * 8, y0 - 30 - (k % 2) * 12, 5, 30 + (k % 2) * 12, p[3]); s += t(x0 + 114, y0 + 16, '고주파', { a: 'm', size: 13, b: 1, c: p[3] }); }
        s += t(x0 + 70, 34, p[0], { a: 'm', b: 1, size: 15, c: p[3] });
      });
      s += t(240, 206, '가로 = 주파수(회전수의 몇 배)   세로 = 진동 크기', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 220, s);
    } },

  fishbone: { cards: ['고장 원인을 찾는 방법'],
    cap: '특성요인도(어골도) — 결과(고장)에 이르는 원인을 4M(사람·설비·재료·방법) 갈래로 나눠 적는다',
    draw: function () {
      var s = '', y = 118;
      s += arrow(30, y, 370, y, { w: 3, head: 12 }) + box(372, y - 26, 96, 52, { fill: C.redL, c: C.red, label: '고장\n(결과)', size: 15, lc: C.red });
      var B = [[110, 'Man 사람', -1], [250, 'Machine 설비', -1], [110, 'Material 재료', 1], [250, 'Method 방법', 1]];
      B.forEach(function (b) {
        var x = b[0], d = b[2];
        s += line(x - 40, y + d * 80, x + 30, y, { w: 2, c: C.blue });
        s += t(x - 40, y + d * 94, b[1], { a: 'm', b: 1, size: 15, c: C.blue });
        s += line(x - 22, y + d * 54, x + 18, y + d * 54, { c: C.sub, w: 1.2 }) + line(x - 8, y + d * 30, x + 30, y + d * 30, { c: C.sub, w: 1.2 });
      });
      return F.svg(480, 236, s);
    } },

  pareto: { cards: ['고장 원인을 찾는 방법'],
    cap: '파레토도 — 고장 건수를 큰 순서로 세우면 상위 몇 개가 전체의 대부분이다 → 거기부터 손댄다 (수치는 예시)',
    draw: function () {
      var s = '', x0 = 60, y0 = 190, H = 150, v = [42, 24, 14, 9, 6, 5], tot = 100, cum = 0, pts = [];
      s += line(x0, y0, 420, y0, { w: 1.4 }) + line(x0, y0, x0, 30, { w: 1.4 }) + line(420, y0, 420, 30, { w: 1.4 });
      v.forEach(function (h, i) {
        var x = x0 + 10 + i * 56, bh = h / 50 * H;
        s += rect(x, y0 - bh, 40, bh, i < 2 ? C.blue : C.grayM, { op: 0.9 });
        s += t(x + 20, y0 + 16, String.fromCharCode(65 + i), { a: 'm', size: 13 });
        cum += h; pts.push([x + 20, y0 - cum / tot * H]);
      });
      s += poly(pts, { c: C.orange, w: 2.2 });
      pts.forEach(function (p) { s += dot(p[0], p[1], 3.5, C.orange); });
      s += t(x0 - 8, 36, '건수', { a: 'e', size: 13 }) + t(428, 36, '누적 %', { size: 13, c: C.orange, b: 1 });
      s += t(x0 + 70, 26, '상위 2개 ≈ 66%', { a: 'm', size: 14, b: 1, c: C.blue }).replace('y="26"', 'y="24"');
      s += t(240, 226, '고장 종류 (많은 순서)', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 240, s);
    } },

  reliab: { cards: ['신뢰도 계산'],
    cap: '신뢰도 — 직렬은 곱한다(하나만 고장 나도 전체가 선다), 병렬은 둘 다 고장 날 확률만 뺀다(예비기의 힘)',
    draw: function () {
      var s = '';
      s += t(20, 28, '직렬', { b: 1, size: 16, c: C.red });
      s += line(20, 64, 460, 64, { w: 1.8 });
      [80, 200, 320].forEach(function (x) { s += box(x, 46, 80, 36, { fill: '#fff', c: C.ink, label: '0.9', size: 16 }); });
      s += t(240, 106, '0.9 × 0.9 × 0.9 = 0.729', { a: 'm', b: 1, size: 16, c: C.red });
      s += t(20, 142, '병렬', { b: 1, size: 16, c: C.green });
      s += line(20, 190, 100, 190, { w: 1.8 }) + line(100, 160, 100, 220, { w: 1.8 }) + line(100, 160, 140, 160, { w: 1.8 }) + line(100, 220, 140, 220, { w: 1.8 });
      s += box(140, 142, 80, 36, { fill: '#fff', c: C.ink, label: '0.9', size: 16 }) + box(140, 202, 80, 36, { fill: '#fff', c: C.ink, label: '0.9', size: 16 });
      s += line(220, 160, 260, 160, { w: 1.8 }) + line(220, 220, 260, 220, { w: 1.8 }) + line(260, 160, 260, 220, { w: 1.8 }) + line(260, 190, 290, 190, { w: 1.8 });
      s += t(300, 180, '1 − (0.1 × 0.1)', { b: 1, size: 15, c: C.green }) + t(300, 204, '= 0.99', { b: 1, size: 17, c: C.green });
      return F.svg(480, 250, s);
    } },

  /* ═══════════ 16단원 · 팹 유틸리티와 장비 반입 ═══════════ */
  utility: { cards: ['장비에 들어가는 유틸리티'],
    cap: '장비 한 대에 들어가는 것 — 초순수(UPW)·공정 냉각수(PCW)·청정건조공기(CDA)·질소(N₂)·공장 진공·전력(UPS), 그리고 배기',
    draw: function () {
      var s = '', U = [['UPW', '초순수 · 18.2 MΩ·cm', C.blue], ['PCW', '냉각수', C.blue], ['CDA', '공압 구동', C.green], ['N₂', '퍼지', C.purple], ['하우스 배큠', '척 흡착', C.sub], ['전력 · UPS', '순간정전 대비', C.orange]];
      U.forEach(function (u, i) {
        var y = 26 + i * 36;
        s += t(20, y, u[0], { b: 1, size: 15, c: u[2] }) + t(20, y + 16, u[1], { size: 13, c: C.sub }).replace('y="' + (y + 16) + '"', 'y="' + (y + 15) + '"');
        s += arrow(186, y + 4, 300, 70 + i * 22, { c: u[2], w: 2, head: 9 });
      });
      s += t(0, 0, '');
      s += box(300, 56, 110, 130, { fill: C.grayL, c: C.ink, label: '장비', size: 18 });
      s += arrow(355, 56, 355, 18, { c: C.sub, w: 2.4, head: 10 }) + t(368, 26, '배기', { b: 1, size: 15, c: C.sub });
      s += arrow(410, 150, 466, 150, { c: C.sub, w: 2, head: 9 }) + t(438, 172, '폐수', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 236, s.replace(/<text x="0" y="0"[^>]*><\/text>/, '').replace(/t\(20/g, 't(20'));
    } },

  exhaust: { cards: ['배기와 폐수'],
    cap: '배기는 성질별로 따로 뽑는다 — 섞으면 반응해 사고가 난다. 덕트 차압을 늘 감시해 역류를 막는다',
    draw: function () {
      var s = '', D = [['일반', '열 · 수분', C.sub], ['산·알칼리', '습식\n스크러버', C.blue], ['독성·가연성', '연소식\n흡착식', C.red], ['VOC', '별도 처리', C.purple]];
      s += box(40, 186, 400, 40, { fill: C.grayL, c: C.ink, label: '장비 · 웨트 벤치', size: 16 });
      D.forEach(function (d, i) {
        var x = 60 + i * 100;
        s += rect(x + 30, 110, 14, 76, '#fff', { c: d[2], w: 2 });
        s += arrow(x + 37, 176, x + 37, 118, { c: d[2], w: 1.6, head: 7, flow: true });
        s += box(x - 8, 40, 90, 70, { fill: '#fff', c: d[2] }) + t(x + 37, 58, d[0], { a: 'm', b: 1, size: 14, c: d[2], halo: false }) + t(x + 37, 88, d[1], { a: 'm', size: 13, halo: false });
      });
      s += t(240, 22, '섞지 않는다 — 덕트를 따로', { a: 'm', b: 1, size: 15, c: C.red });
      s += F.circle(456, 140, 14, { fill: '#fff', c: C.ink, w: 1.6 }) + line(456, 140, 462, 132, { c: C.red, w: 1.6 });
      s += t(456, 170, '차압', { a: 'm', size: 13, b: 1 });
      return F.svg(480, 240, s);
    } },

  setup7: { cards: ['신규 장비 반입(Set-up) 순서'],
    cap: '신규 장비 셋업 7단계 — 반입 → 레벨링 → 유틸리티 연결 → 점검 → 파워 온 → 검증 → 양산 이관. 안전 설계 기준은 SEMI S2',
    draw: function () {
      var s = '', W = 104, H = 56, X = [12, 128, 244, 360], y1 = 24, y2 = 128;
      var names = ['반입\n(무진동)', '위치 ·\n레벨링', '유틸리티\n후크업', '점검 · 리크\n접지 · 절연', '파워 온\n초기 셋업', '검증\n(Qual)', '양산 이관\n+ 문서화'];
      for (var i = 0; i < 7; i++) {
        var row = i < 4 ? 0 : 1, col = row ? 7 - i - 1 + 1 - 1 : i, x = row ? X[3 - (i - 4)] : X[i], y = row ? y2 : y1;
        s += step(x, y, W, H, i + 1, names[i], { fill: i === 6 ? C.greenL : C.blueL, c: i === 6 ? C.green : C.blue, nc: i === 6 ? C.green : C.blue, size: 13 });
      }
      s += arrow(117, 52, 127, 52, { head: 7, w: 1.6 }) + arrow(233, 52, 243, 52, { head: 7, w: 1.6 }) + arrow(349, 52, 359, 52, { head: 7, w: 1.6 });
      s += arrow(412, 81, 412, 127, { head: 8, w: 1.6 }) + arrow(359, 156, 349, 156, { head: 7, w: 1.6 }) + arrow(243, 156, 233, 156, { head: 7, w: 1.6 });
      s += box(12, 206, 220, 34, { fill: C.orangeL, c: C.orange, label: '인터록 시험 · 로봇 티칭', size: 13 }).replace(/<rect/, '<rect');
      s += box(248, 206, 220, 34, { fill: C.redL, c: C.red, label: '안전 기준 SEMI S2', size: 14, lc: C.red });
      return F.svg(480, 254, s.replace('<rect x="12" y="206"', '<rect x="12" y="206"'));
    } }

  };
})();
