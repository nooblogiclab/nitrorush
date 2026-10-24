/* ECC Classroom app logic – vanilla JS, no dependencies */
(function () {
  "use strict";
  var LS = "ssc-classroom-v1";
  var S = load() || fresh();

  function fresh() { return { xp: 0, answered: 0, correct: 0, per: {}, streak: { last: "", n: 0 }, mocks: [] }; }
  function load() { try { return JSON.parse(localStorage.getItem(LS)); } catch (e) { return null; } }
  function save() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} }
  function subj(id) { return (window.SSC_SUBJECTS || []).find(function (s) { return s.id === id; }); }
  function per(id) { if (!S.per[id]) S.per[id] = { a: 0, c: 0 }; return S.per[id]; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ================= KaTeX maths pipeline =================
     Content stays plain Unicode (x², √, Δ, →, ½, □ …). MX() finds maths
     runs and typesets them with KaTeX; prose passes through untouched.
     If KaTeX hasn't loaded yet (CDN still fetching / offline), maths
     renders as Unicode now and upgrades in place once KaTeX arrives. */
  var MB0 = "\x01", MB1 = "\x02";
  function katexReady() { try { return !!(((typeof window !== "undefined") ? window : {}).katex); } catch (e) { return false; } }
  /* Wrap first occurrence of each keyword in MB0/MB1 (case-insensitive).
     Falls back to whitespace-insensitive matching ("a = b" also ticks "a=b"). */
  function markKeys(raw, keys) {
    var s = String(raw == null ? "" : raw);
    (keys || []).forEach(function (k) {
      var e = String(k == null ? "" : k);
      if (!e || e.length <= 2) return;
      var i = s.toLowerCase().indexOf(e.toLowerCase());
      if (i >= 0) { s = s.slice(0, i) + MB0 + s.slice(i, i + e.length) + MB1 + s.slice(i + e.length); return; }
      var ne = e.replace(/\s+/g, "");
      if (!ne) return;
      var map = [], p;
      for (p = 0; p < s.length; p++) if (!/\s/.test(s[p])) map.push(p);
      var ns = map.map(function (q) { return s[q]; }).join("");
      var j = ns.toLowerCase().indexOf(ne.toLowerCase());
      if (j < 0 || j + ne.length > map.length) return;
      var a = map[j], b = map[j + ne.length - 1];
      s = s.slice(0, a) + MB0 + s.slice(a, b + 1) + MB1 + s.slice(b + 1);
    });
    return s;
  }
  /* Unicode maths signals. ASCII "= + / %" are signals; ASCII "-" is NOT
     (hyphen joins prose like Chandrayaan-1, which then has no signal). */
  var MSIG = "²³¹⁰⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉ₙₓₑₐₒᵤ⁻⁺√∛ΔπθλμσφΩαβγΣ∞×÷≠±≤≥≈≡→←↑↓∴∵∝∂∫∑∏½¼¾⅓⅔⅛⅜⅝⅞°′″□−⋅·";
  function mStrip(t) { return String(t).replace(/\x01|\x02/g, ""); }
  function mHasSig(t) {
    t = mStrip(t);
    for (var _i = 0; _i < t.length; _i++) {
      var c = t[_i];
      if (MSIG.indexOf(c) !== -1 || c === "=" || c === "+" || c === "/" || c === "%") return true;
    }
    return false;
  }
  var MWORDY = /^[A-Za-z0-9()\[\]{},.;:!?'"“”’°′″+*\/%|=\-_²³¹⁰⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉ₙₓₑₐₒᵤ⁻⁺√∛ΔπθλμσφΩαβγ∞×÷≠±≤≥≈≡→←↑↓∴∵∝∂∫∑∏Σ½¼¾⅓⅔⅛⅜⅝⅞°′″□−⋅·]*$/;
  function mStrong(t) {
    var s = mStrip(t);
    if (!s || s.length > 14) return false;
    if (!MWORDY.test(s)) return false;
    if (mHasSig(t)) return true;
    if (/^[A-Za-z]$/.test(s)) return true;              /* single-letter variable */
    if (/[0-9()\[\]_+*\/%|°′″]/.test(s)) return true;    /* digits / brackets / ops */
    if (/^[A-Z0-9(),.;:]+$/.test(s)) return true;       /* HH, TH, TT, XY, S, N … */
    return false;
  }
  var MPURE = /^[A-Za-z,.;:!?'"“”’]+$/;   /* plain prose word: peel off maths edges */
  /* Split one line into {t:"x"|"m", s} pieces. Markers ride inside pieces. */
  function mSegmentLine(line) {
    var parts = String(line).split(/(\s+)/g), out = [];
    var words = [];
    for (var pi = 0; pi < parts.length; pi += 2) words.push({ w: parts[pi], sp: parts[pi + 1] || "" });
    var i = 0;
    while (i < words.length) {
      if (words[i].w === "" || !mStrong(words[i].w)) { out.push({ t: "x", s: words[i].w + words[i].sp }); i++; continue; }
      var j = i, run = [];
      while (j < words.length && words[j].w !== "" && mStrong(words[j].w)) { run.push(words[j]); j++; }
      var sig = false, k;
      for (k = 0; k < run.length; k++) if (mHasSig(run[k].w)) { sig = true; break; }
      if (!sig) { for (k = 0; k < run.length; k++) out.push({ t: "x", s: run[k].w + run[k].sp }); i = j; continue; }
      var pre = "", post = "";
      while (run.length) { var fs = mStrip(run[0].w); if (fs.length >= 2 && MPURE.test(fs) && !mHasSig(run[0].w)) pre += run[0].w + run[0].sp, run.shift(); else break; }
      while (run.length) { var ls = mStrip(run[run.length - 1].w); if (ls.length >= 2 && MPURE.test(ls) && !mHasSig(run[run.length - 1].w)) { var l = run.pop(); post = l.w + l.sp + post; } else break; }
      if (!run.length) { if (pre || post) out.push({ t: "x", s: pre + post }); i = j; continue; }
      var core = run.map(function (r) { return r.w; }).join(" ");
      var tailSp = run[run.length - 1].sp;
      var bal = function (s) { s = mStrip(s); var o = 0; for (var q = 0; q < s.length; q++) { var ch = s[q]; if (ch === "(" || ch === "[" || ch === "{") o++; else if (ch === ")" || ch === "]" || ch === "}") o--; } return o; };
      var g = 0;
      while (g++ < 8 && bal(core) > 0) { var li = Math.max(core.lastIndexOf("("), core.lastIndexOf("["), core.lastIndexOf("{")); if (li < 0) break; post = core.slice(li) + post; core = core.slice(0, li); }
      g = 0;
      while (g++ < 8 && bal(core) < 0) { var ci = core.search(/[)\]\}]/); if (ci < 0) break; pre = pre + core.slice(0, ci + 1); core = core.slice(ci + 1); }
      if (pre) out.push({ t: "x", s: pre });
      out.push({ t: "m", s: core });
      if (tailSp + post) out.push({ t: "x", s: tailSp + post });
      i = j;
    }
    return out;
  }
  var SUPMAP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+", "ⁿ": "n", "ˣ": "x", "ᵃ": "a", "ᵇ": "b", "ᶜ": "c", "ᵈ": "d", "ᵉ": "e", "ᶠ": "f", "ᵍ": "g", "ʰ": "h", "ⁱ": "i", "ʲ": "j", "ᵏ": "k", "ˡ": "l", "ᵐ": "m", "ᵒ": "o", "ᵖ": "p", "ʳ": "r", "ˢ": "s", "ᵗ": "t", "ᵘ": "u", "ᵛ": "v", "ʷ": "w", "ʸ": "y", "ᶻ": "z" };
  var SUBMAP = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9", "₋": "-", "₊": "+", "ₙ": "n", "ₓ": "x", "ₑ": "e", "ₐ": "a", "ₒ": "o", "ᵤ": "u", "ᵣ": "r", "ₛ": "s", "ₜ": "t", "ₕ": "h", "ₖ": "k", "ₗ": "l", "ₘ": "m", "ₚ": "p" };
  var SYMMAP = { "×": "\\times", "÷": "\\div", "≠": "\\neq", "±": "\\pm", "≤": "\\le", "≥": "\\ge", "≈": "\\approx", "≡": "\\equiv", "→": "\\to", "←": "\\gets", "↑": "\\uparrow", "↓": "\\downarrow", "∴": "\\therefore", "∵": "\\because", "∝": "\\propto", "∂": "\\partial", "∫": "\\int", "∑": "\\sum", "∏": "\\prod", "Δ": "\\Delta", "π": "\\pi", "θ": "\\theta", "λ": "\\lambda", "μ": "\\mu", "σ": "\\sigma", "φ": "\\phi", "Ω": "\\Omega", "α": "\\alpha", "β": "\\beta", "γ": "\\gamma", "Σ": "\\Sigma", "∞": "\\infty", "…": "\\ldots", "□": "\\square", "·": "\\cdot", "⋅": "\\cdot", "−": "-", "’": "'", "‘": "'", "“": '"', "”": '"' };
  var FRACMAP = { "½": "1/2", "¼": "1/4", "¾": "3/4", "⅓": "1/3", "⅔": "2/3", "⅛": "1/8", "⅜": "3/8", "⅝": "5/8", "⅞": "7/8" };
  var FNS = { sin: "\\sin", cos: "\\cos", tan: "\\tan", cot: "\\cot", sec: "\\sec", csc: "\\csc", cosec: "\\csc", log: "\\log", ln: "\\ln" };
  function texWord(w) {
    if (FNS[w]) return FNS[w] + " ";
    if (w.length >= 3 || (w.length === 2 && (/^[A-Z]+$/.test(w) || /^[A-Z][a-z]$/.test(w)))) return "\\text{" + w + "}";
    return w;
  }
  function texOperand(op) {
    var m = /^([A-Za-z]+)([0-9.]+)$/.exec(op);
    if (m && m[1].length <= 3) return texWord(m[1]) + "_{" + m[2] + "}";
    if (/^[A-Za-z]+$/.test(op)) return texWord(op);
    return op;
  }
  var GREEK1 = "ΔπθλμσφΩαβγ∞";
  /* Convert one maths-run string (may hold MB0/MB1) to TeX. bold=true wraps
     keywords in \boldsymbol; st tracks open groups across √ recursion. */
  function texRun(core, bold, st) {
    var out = "", i = 0, lastText = false;
    var emitTextWord = function (tw) { if (lastText) out += "\\ "; out += "\\text{" + tw + "}"; lastText = true; };
    while (i < core.length) {
      var ch = core[i];
      if (ch === MB0) { if (bold) { out += "\\boldsymbol{"; st.depth++; } lastText = false; i++; continue; }
      if (ch === MB1) { if (bold && st.depth > 0) { out += "}"; st.depth--; } lastText = false; i++; continue; }
      if (/[A-Za-z0-9]/.test(ch)) {
        var a = "", b = "";
        while (i < core.length && /[A-Za-z]/.test(core[i])) a += core[i++];
        while (i < core.length && /[0-9.]/.test(core[i])) b += core[i++];
        var op1 = a + b;
        if (core[i] === "/" && op1.length >= 1 && op1.length <= 3) {
          var j2 = i + 1, c = "", d2 = "";
          while (j2 < core.length && /[A-Za-z]/.test(core[j2])) c += core[j2++];
          while (j2 < core.length && /[0-9.]/.test(core[j2])) d2 += core[j2++];
          var sfx = "";
          while (j2 < core.length && (SUPMAP[core[j2]] !== undefined || SUBMAP[core[j2]] !== undefined)) {
            sfx += (SUPMAP[core[j2]] !== undefined ? "^{" + SUPMAP[core[j2]] + "}" : "_{" + SUBMAP[core[j2]] + "}"); j2++;
          }
          var op2 = c + d2;
          var pure = function (s) { return /^[A-Za-z]{2,}$/.test(s); };
          /* Board style (Oct 2026): short ratios stack FULL-SIZE like the SSC
             activity sheet (\dfrac, not tiny \frac) — "a1/a2", "12/52", "km/h". */
          if (op2.length >= 1 && op2.length <= 3 && !(pure(op1) && pure(op2))) {
            out += "\\dfrac{" + texOperand(op1) + "}{" + texOperand(op2) + sfx + "}"; i = j2; lastText = false; continue;
          }
        }
        if (/^[A-Za-z]+$/.test(op1) && op1.length >= 2 && lastText) { out += "\\ "; out += texWord(op1); lastText = true; }
        else { out += texOperand(op1); lastText = (/^\\text/.test(texOperand(op1)) ? true : false); }
        continue;
      }
      if (SUPMAP[ch] !== undefined) { var s2 = ""; while (i < core.length && SUPMAP[core[i]] !== undefined) s2 += SUPMAP[core[i++]]; out += "^{" + s2 + "}"; lastText = false; continue; }
      if (SUBMAP[ch] !== undefined) { var b2 = ""; while (i < core.length && SUBMAP[core[i]] !== undefined) b2 += SUBMAP[core[i++]]; out += "_{" + b2 + "}"; lastText = false; continue; }
      if (ch === "_") { i++; var u = ""; while (i < core.length && /[A-Za-z0-9]/.test(core[i])) u += core[i++]; if (!u) out += "\\_"; else out += "_{" + (/^[A-Za-z]+$/.test(u) ? texWord(u) : u) + "}"; lastText = false; continue; }
      if (ch === "√" || ch === "∛") {
        var cmd = ch === "√" ? "\\sqrt{" : "\\sqrt[3]{"; i++;
        if (core[i] === "(") {
          var dep = 0, jx = i, done = false;
          for (; jx < core.length; jx++) { if (core[jx] === "(") dep++; else if (core[jx] === ")") { dep--; if (!dep) { done = true; break; } } }
          var inner = core.slice(i + 1, done ? jx : core.length);
          i = done ? jx + 1 : core.length;
          out += cmd + texRun(inner, bold, st) + "}"; lastText = false; continue;
        }
        var r = "";
        while (i < core.length && (/[A-Za-z0-9]/.test(core[i]) || SUPMAP[core[i]] !== undefined || SUBMAP[core[i]] !== undefined || GREEK1.indexOf(core[i]) !== -1)) r += core[i++];
        out += cmd + texRun(r, bold, st) + "}"; lastText = false; continue;
      }
      if (SYMMAP[ch] !== undefined) { out += SYMMAP[ch]; var nx = i + 1; while (core[nx] === " ") nx++; if (/[A-Za-z]/.test(core[nx] || "")) out += " "; lastText = false; i++; continue; }
      if (FRACMAP[ch] !== undefined) { out += FRACMAP[ch]; lastText = false; i++; continue; }
      if (ch === "%") { out += "\\%"; lastText = false; i++; continue; }
      if (ch === "&") { out += "\\&"; lastText = false; i++; continue; }
      if (ch === "#") { out += "\\#"; lastText = false; i++; continue; }
      if (ch === "{") { out += "\\{"; lastText = false; i++; continue; }
      if (ch === "}") { out += "\\}"; lastText = false; i++; continue; }
      if (ch === "*") { out += "\\times"; var nx2 = i + 1; while (core[nx2] === " ") nx2++; if (/[A-Za-z]/.test(core[nx2] || "")) out += " "; lastText = false; i++; continue; }
      if (ch === "/") { out += "/"; lastText = false; i++; continue; }
      if (ch === "°") { out += "^{\\circ}"; lastText = false; i++; continue; }
      if (ch === "′") { out += "'"; lastText = false; i++; continue; }
      if (ch === "″") { out += "''"; lastText = false; i++; continue; }
      if (ch === " ") { i++; continue; }
      if (ch === "+" || ch === "=" || ch === "-") { out += ch; lastText = false; i++; continue; }
      if ("()[]|,.;:!?\"'".indexOf(ch) !== -1) { out += ch; lastText = false; i++; continue; }
      i++;
    }
    return out;
  }
  /* Render TeX -> HTML now, or stash a pending span for the KaTeX onload pass. */
  function texRender(tex, disp, alt, coreRaw) {
    if (katexReady()) {
      try { return window.katex.renderToString(tex, { throwOnError: true, displayMode: !!disp }); } catch (e) {}
      if (alt && alt !== tex) { try { return window.katex.renderToString(alt, { throwOnError: true, displayMode: !!disp }); } catch (e2) {} }
    }
    var fb = (coreRaw != null ? coreRaw : tex);
    var fbe = esc(fb).split(MB0).join("<b>").split(MB1).join("</b>");
    return '<span class="mx-pend" data-tex="' + encodeURIComponent(tex) + '" data-d="' + (disp ? 1 : 0) + '">' + fbe + "</span>";
  }
  function mxRunHtml(core) {
    var st = { depth: 0 };
    var bt = texRun(core, true, st);
    while (st.depth-- > 0) bt += "}";
    var pt = texRun(core, false, { depth: 0 });
    return texRender(bt, false, pt, core);
  }
  var MDELIM = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;
  /* MX: raw content string -> HTML with KaTeX maths. Same contract as esc. */
  function MX(raw) {
    var s = String(raw == null ? "" : raw);
    if (!s) return "";
    var hasM = s.indexOf(MB0) !== -1;
    if (s.indexOf("$") === -1 && s.indexOf("\\(") === -1 && s.indexOf("\\[") === -1 && !mHasSig(s)) {
      var e0 = esc(s);
      return hasM ? e0.split(MB0).join("<b>").split(MB1).join("</b>") : e0;
    }
    var out = "", last = 0, m, chunks = [];
    MDELIM.lastIndex = 0;
    while ((m = MDELIM.exec(s))) {
      chunks.push({ e: false, s: s.slice(last, m.index) });
      chunks.push({ e: true, d: !!(m[1] || m[2]), s: m[1] || m[2] || m[3] || m[4] });
      last = m.index + m[0].length;
    }
    chunks.push({ e: false, s: s.slice(last) });
    for (var ci = 0; ci < chunks.length; ci++) {
      var c = chunks[ci];
      if (c.e) { out += texRender(c.s, c.d, null, c.s); continue; }
      var lines = c.s.split("\n");
      for (var li = 0; li < lines.length; li++) {
        if (li) out += "\n";
        var segs = mSegmentLine(lines[li]);
        for (var si = 0; si < segs.length; si++) {
          var g2 = segs[si];
          if (g2.t === "x") out += esc(g2.s).split(MB0).join("<b>").split(MB1).join("</b>");
          else out += mxRunHtml(g2.s);
        }
      }
    }
    return out;
  }
  /* Upgrade pending Unicode spans once KaTeX arrives. */
  function upgradeMath(root) {
    if (!katexReady()) return 0;
    var n = 0, list = (root || document).querySelectorAll("span.mx-pend");
    for (var i = 0; i < list.length; i++) {
      try {
        list[i].outerHTML = window.katex.renderToString(decodeURIComponent(list[i].getAttribute("data-tex")), { throwOnError: true, displayMode: list[i].getAttribute("data-d") === "1" });
        n++;
      } catch (e) { /* keep Unicode fallback */ }
    }
    return n;
  }
  window.__katexReady = function () { try { upgradeMath(document); } catch (e) {} };
  window.__MX = MX; window.__mSeg = mSegmentLine; window.__texRun = texRun; window.__modelPaper = buildModelPaper;
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function chName(s, ch) { var c = s.chapters.find(function (x) { return x.id === ch; }); return c ? c.name : ch; }
  function hotBadge(q) { return q.hot ? ' <span class="kbd">⭐ ' + esc(q.hot) + "</span>" : ""; }
  function stars(w) { return w === "high" ? "★★★" : (w === "low" ? "★" : "★★"); }
  function rateBadge(c) {
    if (!c || !c.w) return "";
    var label = c.w === "high" ? "High weightage" : (c.w === "low" ? "Low weightage" : "Medium weightage");
    return ' <span class="kbd">' + stars(c.w) + " " + label + "</span>";
  }

  function touchDay() {
    var d = new Date().toISOString().slice(0, 10);
    if (S.streak.last !== d) {
      var y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      S.streak.n = (S.streak.last === y) ? S.streak.n + 1 : 1;
      S.streak.last = d; save();
    }
  }
  function addXP(n) { S.xp += n; save(); paintTop(); }
  function record(id, ok) {
    S.answered++; if (ok) S.correct++;
    var p = per(id); p.a++; if (ok) p.c++;
    touchDay(); save(); paintTop();
  }
  function acc() { return S.answered ? Math.round(100 * S.correct / S.answered) : 0; }

  function paintTop() {
    var x = document.getElementById("xpEl"); if (x) x.textContent = S.xp;
    var st = document.getElementById("streakEl"); if (st) st.textContent = S.streak.n;
    var c = document.getElementById("countEl"); if (c) c.textContent = countdown();
  }
  function countdown() {
    var now = new Date();
    var yr = now.getMonth() > 5 ? now.getFullYear() + 1 : now.getFullYear();
    var t = new Date(yr, 2, 1) - now; // ~1 March
    if (t < 0) t = 0;
    return Math.ceil(t / 864e5) + "d";
  }

  /* ---------- tabs ---------- */
  var tabs = document.querySelectorAll("#tabsCtn .tab");
  tabs.forEach(function (b) {
    b.addEventListener("click", function () {
      tabs.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      document.querySelectorAll(".sec").forEach(function (s) { s.classList.remove("active"); });
      document.getElementById("sec-" + b.dataset.t).classList.add("active");
      if (b.dataset.t === "dash") renderDash();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  function go(t) {
    tabs.forEach(function (x) { x.classList.toggle("active", x.dataset.t === t); });
    document.querySelectorAll(".sec").forEach(function (s) { s.classList.remove("active"); });
    document.getElementById("sec-" + t).classList.add("active");
    if (t === "dash") renderDash();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- dashboard ---------- */
  function renderDash() {
    var el = document.getElementById("sec-dash");
    var cards = (window.SSC_SUBJECTS || []).map(function (s) {
      var p = per(s.id), tot = s.mcq.length || 1;
      var pct = Math.min(100, Math.round(100 * p.a / (tot * 2)));
      var a = p.a ? Math.round(100 * p.c / p.a) : 0;
      return '<div class="subj" data-go="' + s.id + '"><div class="dot" style="background:' + s.color + '">' + s.icon + '</div>' +
        '<div style="flex:1"><b>' + esc(s.name) + '</b><div class="mut">' + s.mcq.length + ' MCQs · ' + s.shortQs.length + ' short/long · ' + s.chapters.length + ' chapters</div>' +
        '<div class="bar"><i style="width:' + pct + '%"></i></div><div class="mut">Practised ' + p.a + ' · accuracy ' + a + '%</div></div></div>';
    }).join("");
    var best = (S.mocks || []).slice(-3).reverse().map(function (m) {
      return "<div>📝 " + esc(m.name) + " — <b>" + m.score + "/" + m.total + "</b> (" + m.when + ")</div>";
    }).join("") || '<div class="mut">No 40-mark paper yet — take one under ⏱️ Mock Test.</div>';

    el.innerHTML =
      '<div class="card hero"><h2>Namaste, ECC warrior! 🙏</h2>' +
      '<div class="mut">Today: 1 chapter Learn + 10 Practice MCQs + 1 revision round. Board rule: <b>keywords fetch marks, story does not</b> — definition → labelled points → conclusion.</div>' +
      '<div class="row" style="margin-top:10px"><button class="btn acc" id="dStart">Start 10-Q quick practice</button>' +
      '<button class="btn ghost" id="dMock">Take Science-II 40-mark paper</button>' +
      '<button class="btn ghost" id="dLearn">Revise a chapter</button></div></div>' +
      '<div class="grid cols3" style="margin-top:12px">' +
      '<div class="stat"><b>' + S.xp + '</b><span>Total XP</span></div>' +
      '<div class="stat"><b>' + acc() + '%</b><span>Overall accuracy (' + S.answered + ' answered)</span></div>' +
      '<div class="stat"><b>' + S.streak.n + ' 🔥</b><span>Day streak — practise daily</span></div></div>' +
      '<div class="card" style="margin-top:12px"><h2>Subjects</h2><div class="grid cols2">' + cards + '</div></div>' +
      '<div class="card" style="margin-top:12px"><h2>Recent 40-mark papers</h2>' + best +
      '<h3>How to use this classroom</h3><ul class="tight"><li><b>Learn</b> a chapter → <b>Practice</b> its MCQs → master it with a <b>chapter-wise 40-mark paper</b> (board blueprint: Science 5/5/4/6/15/5 · Algebra 4/4/4/8/3/6/8/3).</li>' +
      '<li>Written answers are scored on <b>keywords</b> — tick the keywords you actually wrote. That is exactly how the examiner ticks.</li>' +
      '<li>Maths gives step marks — formula → substitution → unit → answer. Never leave a sum half-written.</li>' +
      '<li>Chapters carry <b>★★★/★★/★ weightage stars</b> — master ★★★ first (see the 🧭 Smart plan in 📄 Papers Guide), then take each chapter\'s <b>40-mark solo paper</b> from 📖 Learn.</li></ul></div>';
    el.querySelectorAll("[data-go]").forEach(function (d) {
      d.addEventListener("click", function () { startPractice(d.dataset.go); go("prac"); });
    });
    document.getElementById("dStart").onclick = function () { startPractice("sci2", null, 10); go("prac"); };
    document.getElementById("dMock").onclick = function () { startMock({ mode: "subject", s: "sci2" }); go("mock"); };
    document.getElementById("dLearn").onclick = function () { go("learn"); };
  }

  /* ---------- learn ---------- */
  var L = { s: "sci2", ch: null };
  function renderLearn() {
    var el = document.getElementById("sec-learn");
    var s = subj(L.s) || window.SSC_SUBJECTS[0];
    L.s = s.id; if (!L.ch) L.ch = s.chapters[0].id;
    var c = s.chapters.find(function (x) { return x.id === L.ch; }) || s.chapters[0];
    L.ch = c.id;
    var subBtns = window.SSC_SUBJECTS.map(function (x) {
      return '<button class="chip' + (x.id === s.id ? " sel" : "") + '" data-s="' + x.id + '">' + x.icon + " " + esc(x.short) + "</button>";
    }).join("");
    var chBtns = s.chapters.map(function (x) {
      return '<button class="chip' + (x.id === c.id ? " sel" : "") + '" data-c="' + x.id + '">' + stars(x.w) + " " + esc(x.name) + "</button>";
    }).join("");
    var relQ = s.mcq.filter(function (q) { return q.ch === c.id; }).slice(0, 4);
    el.innerHTML = '<div class="card"><h2>📖 Learn</h2><div class="mut">' + esc(s.pattern) + '</div>' +
      '<h3>Subject</h3><div class="row">' + subBtns + '</div><h3>Chapter</h3><div class="row">' + chBtns + "</div></div>" +
      '<div class="card"><h2>' + s.icon + " " + esc(c.name) + "</h2><div class='mut'>" + esc(s.name) + rateBadge(c) + (c.wx ? "<br>⚖️ " + esc(c.wx) : "") + "</div><h3>⭐ Key points (learn these cold)</h3><ul class='tight'>" +
      c.notes.map(function (n) { return "<li>" + MX(n) + "</li>"; }).join("") + "</ul>" +
      (c.formulas.length ? "<h3>🧪 Must-remember</h3><ul class='tight'>" + c.formulas.map(function (f) { return "<li><span class='kbd'>" + MX(f) + "</span></li>"; }).join("") + "</ul>" : "") +
      "<h3>⚠️ Board traps</h3>" + c.traps.map(function (t) { return '<div class="trap">' + MX(t) + "</div>"; }).join("") +
      (relQ.length ? "<h3>🔎 Quick check from this chapter</h3>" + relQ.map(function (q, i) {
        return "<div class='mut' style='margin:6px 0'><b>Q" + (i + 1) + ".</b> " + MX(q.q) + " → <b>" + MX(q.opts[q.ans]) + "</b>" + hotBadge(q) + "</div>";
      }).join("") : "") +
      '<div class="row" style="margin-top:10px"><button class="btn acc" id="lPrac">Practise ' + esc(c.name) + ' MCQs</button>' +
      '<button class="btn" id="lMaster">🎯 40-mark paper: this chapter</button>' +
      '<button class="btn ghost" id="lPrint">🖨 Printable test (offline)</button>' +
      '<button class="btn ghost" id="lFlash">Revise as flashcards</button></div></div>';
    el.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { L.s = b.dataset.s; L.ch = null; renderLearn(); }; });
    el.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { L.ch = b.dataset.c; renderLearn(); }; });
    document.getElementById("lPrac").onclick = function () { startPractice(s.id, c.id, 10); go("prac"); };
    document.getElementById("lMaster").onclick = function () { startMock({ mode: "chapter", s: s.id, ch: c.id }); go("mock"); };
    document.getElementById("lPrint").onclick = function () { renderPrintPaper(s.id, c.id, true); };
    document.getElementById("lFlash").onclick = function () { F.s = s.id; F.i = 0; renderFlash(); go("flash"); };
  }

  /* ---------- practice ---------- */
  var P = { s: "sci2", ch: "all", n: 10, list: [], i: 0, picked: -1, done: 0, ok: 0, lock: false };
  function startPractice(sid, ch, n) {
    if (sid) P.s = sid; if (ch !== undefined) P.ch = ch || "all"; if (n) P.n = n;
    var s = subj(P.s);
    var pool = s.mcq.filter(function (q) { return P.ch === "all" || q.ch === P.ch; });
    pool = shuffle(pool).slice(0, Math.min(P.n, pool.length));
    P.list = pool; P.i = 0; P.done = 0; P.ok = 0; P.picked = -1; P.lock = false;
    renderPractice();
  }
  function renderPractice() {
    var el = document.getElementById("sec-prac");
    var s = subj(P.s);
    var subBtns = window.SSC_SUBJECTS.map(function (x) {
      return '<button class="chip' + (x.id === P.s ? " sel" : "") + '" data-s="' + x.id + '">' + x.icon + " " + esc(x.short) + "</button>";
    }).join("");
    var chOpts = '<button class="chip' + (P.ch === "all" ? " sel" : "") + '" data-c="all">All chapters</button>' +
      s.chapters.map(function (c) { return '<button class="chip' + (P.ch === c.id ? " sel" : "") + '" data-c="' + c.id + '">' + esc(c.name) + "</button>"; }).join("");
    var counts = [5, 10, 15, 20].map(function (n) {
      return '<button class="chip' + (P.n === n ? " sel" : "") + '" data-n="' + n + '">' + n + " Qs</button>";
    }).join("");
    var body = "";
    if (!P.list.length) {
      body = '<div class="mut">Choose filters and press <b>Start</b>.</div>';
    } else if (P.i < P.list.length) {
      var q = P.list[P.i];
      body = '<div class="qmeta">Q' + (P.i + 1) + " / " + P.list.length + " · " + esc(chName(s, q.ch)) + " · score " + P.ok + "</div>" +
        "<h2 style='margin:6px 0'>" + MX(q.q) + "</h2><div>" + hotBadge(q) + "</div>" +
        q.opts.map(function (o, k) {
          var cls = "opt";
          if (P.lock) { if (k === q.ans) cls += " right"; else if (k === P.picked) cls += " wrong"; }
          else if (k === P.picked) cls += " picked";
          return '<button class="' + cls + '" data-o="' + k + '"' + (P.lock ? " disabled" : "") + "><b>" + "ABCD"[k] + ".</b> " + MX(o) + "</button>";
        }).join("") +
        (P.lock ? '<div class="exp"><b>' + (P.picked === q.ans ? "✅ Correct! +10 XP" : "❌ Correct answer: " + MX(q.opts[q.ans])) + "</b><br>" + MX(q.exp) + "</div>" +
          '<div class="row" style="margin-top:10px"><button class="btn acc" id="pNext">' + (P.i + 1 < P.list.length ? "Next →" : "See result") + "</button></div>"
          : '<div class="row" style="margin-top:10px"><button class="btn" id="pCheck"' + (P.picked < 0 ? " disabled" : "") + ">Check answer</button></div>");
    } else {
      var pct = P.done ? Math.round(100 * P.ok / P.done) : 0;
      body = '<h2>' + (pct >= 80 ? "🌟 Outstanding!" : pct >= 60 ? "💪 Good job!" : "📚 Keep practising!") + "</h2>" +
        "<p>You scored <b>" + P.ok + " / " + P.done + "</b> (" + pct + "%) in " + esc(s.name) + ".</p>" +
        (pct < 60 ? '<div class="trap">Tip: go to 📖 Learn, re-read the chapter notes, then retry with 5 Qs.</div>' : "") +
        '<div class="row"><button class="btn acc" id="pAgain">Retry (' + P.n + ' Qs)</button><button class="btn ghost" id="pMock">Try a 40-mark paper</button></div>';
    }
    el.innerHTML = '<div class="card"><h2>✍️ Practice MCQs</h2><div class="mut">Instant feedback + explanation, like a teacher beside you. XP: +10 per correct.</div>' +
      '<h3>Subject</h3><div class="row">' + subBtns + '</div><h3>Chapter</h3><div class="row">' + chOpts + '</div>' +
      '<h3>Length</h3><div class="row">' + counts + '</div><div class="row" style="margin-top:10px"><button class="btn acc" id="pStart">▶ Start practice</button></div></div>' +
      '<div class="card" id="pBody">' + body + "</div>";
    el.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { P.s = b.dataset.s; P.ch = "all"; P.list = []; renderPractice(); }; });
    el.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { P.ch = b.dataset.c; P.list = []; renderPractice(); }; });
    el.querySelectorAll("[data-n]").forEach(function (b) { b.onclick = function () { P.n = +b.dataset.n; renderPractice(); }; });
    var st = document.getElementById("pStart"); if (st) st.onclick = function () { startPractice(); };
    el.querySelectorAll("[data-o]").forEach(function (b) {
      b.onclick = function () { if (P.lock) return; P.picked = +b.dataset.o; renderPractice(); };
    });
    var ck = document.getElementById("pCheck");
    if (ck) ck.onclick = function () {
      P.lock = true; P.done++;
      var q = P.list[P.i], good = P.picked === q.ans;
      if (good) { P.ok++; addXP(10); } else addXP(2);
      record(P.s, good); renderPractice();
    };
    var nx = document.getElementById("pNext");
    if (nx) nx.onclick = function () { P.i++; P.picked = -1; P.lock = false; renderPractice(); };
    var ag = document.getElementById("pAgain"); if (ag) ag.onclick = function () { startPractice(); };
    var pm = document.getElementById("pMock"); if (pm) pm.onclick = function () { startMock({ mode: "subject", s: P.s }); go("mock"); };
  }

  /* ================= 40-MARK BLUEPRINT PAPERS =================
     Q1.A 5×1 MCQ · Q1.B 5×1 one-markers · Q2.A reasons any 2/3 (4m)
     Q2.B any 3/5 (6m) · Q3 any 5/7 (15m) · Q4 any 1/2 (5m) = 40 */
  var M = { mode: "subject", s: "sci2", ch: "he2", set: 1, mins: 60, phase: "setup", paper: null, si: 0, ii: 0, reveal: false };
  var MAST = function () { return window.SSC_MASTERY || {}; };

  function sampleNeed(pool, n) {
    pool = shuffle(pool);
    return pool.slice(0, Math.min(n, pool.length));
  }
  function asItem(o, kind, nominal, chapterId) {
    return { q: o.q, marks: o.marks || nominal, model: o.model || "", keys: o.keys || null, box: o.box || null, hot: o.hot || null,
      ch: o.ch || chapterId, kind: kind, nominal: nominal, picked: -1, award: 0, done: false };
  }
  function deriveOne(m, chapterId) {
    return { q: m.q, marks: 1, model: m.opts[m.ans], keys: [m.opts[m.ans]], hot: m.hot || null,
      ch: m.ch || chapterId, kind: "one", nominal: 1, picked: -1, award: 0, done: false };
  }
  function masteryFor(sid, ch) { return MAST()[sid + ":" + ch] || null; }

  /* Board Q4 pairs its two 5-mark options from DIFFERENT streams —
     verified on the official 2024-25 papers (Shaalaa):
     Sci-I: Physics vs Chemistry (2025: rainbow proof vs carbon-chains table);
     Sci-II: Biology vs Environment (2025: animal adaptation vs my-role-in-environment). */
  var STREAMS = {
    sci1: { A: { label: "Physics", icon: "🔭", chs: ["g", "ee", "he", "rl", "le", "sp"] },
            B: { label: "Chemistry", icon: "⚗️", chs: ["pc", "cr", "me", "cc"] } },
    sci2: { A: { label: "Biology", icon: "🧬", chs: ["he2", "lp1", "lp2", "ac", "mi", "cb"] },
            B: { label: "Environment", icon: "🌱", chs: ["em", "ge", "sh", "dm"] } }
  };
  function aggregateMastery(sid) {
    var st = STREAMS[sid]; if (!st) return null;    var agg = { one: [], reasons: [], two: [], three: [], streamA: st.A.icon + " " + st.A.label, streamB: st.B.icon + " " + st.B.label, fivePair: null };
    var allChs = st.A.chs.concat(st.B.chs), covered = 0;
    allChs.forEach(function (cid) {
      var m = masteryFor(sid, cid); if (!m) return; covered++;
      ["one", "reasons", "two", "three"].forEach(function (k) {
        (m[k] || []).forEach(function (o) { agg[k].push({ q: o.q, model: o.model, keys: o.keys, hot: o.hot, ch: cid }); });
      });
    });
    if (covered < allChs.length) return null;
    var pickFive = function (chs, streamLabel) {
      var pool = [];
      chs.forEach(function (cid) { var m = masteryFor(sid, cid); (m.five || []).forEach(function (o) { pool.push({ o: o, ch: cid, stream: streamLabel }); }); });
      if (!pool.length) return null;
      return pool[Math.floor(Math.random() * pool.length)];
    };
    var a = pickFive(st.A.chs, agg.streamA), b = pickFive(st.B.chs, agg.streamB);
    if (!a || !b) return null;
   agg.fivePair = [a, b];
   return agg;
 }
  /* Full-syllabus pools for non-Science subjects (History, Geography,
     English, Geometry): every chapter carries a complete mastery bank, so
     subject papers draw written answers from ALL chapters — not just the
     small shared shortQs list. This is what lets the 5 model sets come out
     genuinely different instead of dealing the same ~20 Qs every time. */
  function collectMastery(sid) {
    var s = subj(sid); if (!s) return null;
    var agg = { one: [], reasons: [], two: [], three: [], five: [] };
    var covered = 0;
    s.chapters.forEach(function (c) {
      var m = masteryFor(sid, c.id); if (!m) return; covered++;
      ["one", "reasons", "two", "three", "five"].forEach(function (k) {
        (m[k] || []).forEach(function (o) {
          agg[k].push({ q: o.q, model: o.model, keys: o.keys, hot: o.hot, ch: c.id, box: o.box || null });
        });
      });
    });
    return covered ? agg : null;
  }

  function buildPaper(mode, sid, chid) {
    if (sid === "alg") return buildAlgPaper(mode, sid, chid);
    if (sid === "eng" && mode !== "chapter" && window.SSC_ENG && window.SSC_ENG.tp) return buildEngPaper(mode, sid, chid);
    var s = subj(sid), mast = (mode === "chapter") ? masteryFor(sid, chid) : null;
    var chPool = function (arr) { return arr.filter(function (x) { return x.ch === chid; }); };
    // Q1.A MCQ — chapter mode uses ONLY the chapter's own MCQs (never foreign)
    var mcqSrc = (mode === "chapter") ? chPool(s.mcq) : s.mcq;
    var mcqTake = sampleNeed(mcqSrc.length ? mcqSrc : s.mcq, 5);
    var usedQ = {};
    mcqTake.forEach(function (m) { usedQ[m.q] = 1; });
    var mcq = mcqTake.map(function (m) {
      var it = asItem({ q: m.q, model: m.opts[m.ans], keys: [m.opts[m.ans]], hot: m.hot, ch: m.ch }, "mcq", 1, m.ch);
      it.opts = m.opts; it.ans = m.ans; return it;
    });
    // Q1.B one-markers
    var one;
    var agg = (mode === "subject") ? aggregateMastery(sid) : null;
    var genAgg = (mode === "subject" && !agg) ? collectMastery(sid) : null;
    if (mast && mast.one) {
      one = sampleNeed(mast.one, 5).map(function (o) { return asItem(o, "one", 1, chid); });
    } else if (agg) {
      one = sampleNeed(agg.one, 5).map(function (o) { return asItem(o, "one", 1, o.ch); });
    } else if (genAgg && genAgg.one.length) {
      one = sampleNeed(genAgg.one, 5).map(function (o) { return asItem(o, "one", 1, o.ch); });
    } else if (mode === "chapter") {
      // chapter's own MCQs in one-line format (own chapter only, never foreign)
      var chMcq = s.mcq.filter(function (m) { return m.ch === chid; });
      var restC = chMcq.filter(function (m) { return !usedQ[m.q]; });
      restC = restC.concat(chMcq.filter(function (m) { return usedQ[m.q]; })); // chapter's own MCQs only — never foreign
      one = sampleNeed(restC, 5).map(function (m) { return deriveOne(m, m.ch); });
    } else {
      var restS = s.mcq.filter(function (m) { return !usedQ[m.q]; });
      one = sampleNeed(restS, 5).map(function (m) { return deriveOne(m, m.ch); });
    }
    // Written pools
    var sciSubj = (sid === "sci1" || sid === "sci2");
    var reaPool, twoPool, threePool, fivePool, reaTitle = sciSubj ? "Q2.A · Give scientific reasons — any 2 of 3" : "Q2.A · Short answers — any 2 of 3";
    if (mast) {
      reaPool = mast.reasons; twoPool = mast.two; threePool = mast.three; fivePool = mast.five;
    } else if (agg) {
      reaPool = agg.reasons; twoPool = agg.two; threePool = agg.three; fivePool = [];
      reaTitle = "Q2.A · Give scientific reasons — any 2 of 3";
    } else if (genAgg) {
      reaPool = genAgg.reasons; twoPool = genAgg.two; threePool = genAgg.three; fivePool = genAgg.five;
    } else {
      var shorts = (mode === "chapter") ? chPool(s.shortQs) : s.shortQs.slice();
      var fill = function (arr, want) {
        if (arr.length >= want) return arr;
        // subject papers pool across chapters; chapter papers use their own chapter only
        var more = s.shortQs.filter(function (x) { return arr.indexOf(x) === -1 && (mode === "subject" || x.ch === chid); });
        return arr.concat(sampleNeed(more, want - arr.length));
      };
      var topUp = function (arr, pool, want) {
        var extra = pool.filter(function (x) { return arr.indexOf(x) === -1; });
        return arr.concat(sampleNeed(extra, Math.max(0, want - arr.length)));
      };
      var isRea = function (x) { return /reason|why/i.test(x.q); };
      if (mode === "chapter") {
        var chRea = shorts.filter(isRea);
        // chapter's own shortQs only — never borrow other chapters here
        reaPool = topUp(chRea.length ? chRea : shorts.slice(0, 3), shorts, 3);
        if (!chRea.length) reaTitle = "Q2.A · Short answers — any 2 of 3";
      } else {
        reaPool = fill(shorts.filter(isRea), 3);
        if (reaPool.length < 2) { reaPool = fill(shorts.slice(0, 3), 3); reaTitle = "Q2.A · Short answers — any 2 of 3"; }
      }
      twoPool = fill(shorts.filter(function (x) { return x.marks <= 2; }), 5);
      threePool = fill(shorts.filter(function (x) { return x.marks === 3; }), 7);
      var chFive = shorts.filter(function (x) { return x.marks >= 4; });
      if (mode === "chapter") {
        // chapter's own long answer (or its best 3-marker, attempted as a 5-mark answer)
        fivePool = chFive.length ? chFive : shorts.filter(function (x) { return x.marks === 3; }).slice(0, 1);
      } else {
        fivePool = fill(chFive, 2);
        if (!fivePool.length && threePool.length) fivePool = [threePool[0]];
      }
    }
    var threeWant = ((agg || genAgg) ? 8 : 7); // board gives 8 sub-questions in Q3 (2024-25 papers); full-bank subject papers hold 8
    var threeItems = sampleNeed(threePool, threeWant).map(function (o) { return asItem(o, "w", 3, o.ch || chid); });
    var fiveItems, fiveTitle = "Q4 · Long answer — any 1 of 2 (5m)";
    if (agg && agg.fivePair) {
      fiveTitle += " · " + agg.streamA + " vs " + agg.streamB + " — attempt your stronger stream";
      fiveItems = agg.fivePair.map(function (p) { var it = asItem(p.o, "w", 5, p.ch); it.stream = p.stream; return it; });
    } else {
      fiveItems = sampleNeed(fivePool, 2).map(function (o) { return asItem(o, "w", o.marks >= 4 ? o.marks : 5, o.ch || chid); });
    }
    var secs = [
      { id: "mcq", title: "Q1.A · MCQ — 5 × 1", need: mcq.length, nominal: 1, max: mcq.length, items: mcq, choice: false },
      { id: "one", title: "Q1.B · One-line answers — 5 × 1", need: one.length, nominal: 1, max: one.length, items: one, choice: false },
      { id: "rea", title: reaTitle + " (4m)", need: Math.min(2, reaPool.length), nominal: 2, max: Math.min(2, reaPool.length) * 2, items: sampleNeed(reaPool, 3).map(function (o) { return asItem(o, "w", 2, o.ch || chid); }), choice: true },
      { id: "two", title: "Q2.B · Short answers — any 3 of 5 (6m)", need: Math.min(3, twoPool.length), nominal: 2, max: Math.min(3, twoPool.length) * 2, items: sampleNeed(twoPool, 5).map(function (o) { return asItem(o, "w", 2, o.ch || chid); }), choice: true },
      { id: "three", title: "Q3 · Structured answers — any 5 of " + threeItems.length + " (15m)", need: Math.min(5, threeItems.length), nominal: 3, max: Math.min(5, threeItems.length) * 3, items: threeItems, choice: true },
      { id: "five", title: fiveTitle, need: Math.min(1, fiveItems.length), nominal: 5, max: Math.min(1, fiveItems.length) * 5, items: fiveItems, choice: true }
    ];
    var total = secs.reduce(function (a, x) { return a + x.max; }, 0);
    var focus = { n: 0, t: 0 };
    if (mode === "chapter") {
      secs.forEach(function (sec) { sec.items.forEach(function (it) { focus.t++; if (it.ch === chid) focus.n++; }); });
    }
    return { sections: secs, total: total, mastery: !!(mast || agg || genAgg), focus: focus };
  }

  /* English follows its OWN official board blueprint (March 2026 paper,
     80 marks · 3 hrs): SECTION I Language Study Q1 (10) · SECTION II
     Textual Passages Q2 (20) · SECTION III Poetry Q3 (10) · SECTION IV
     Non-textual Passage + Summary Q4 (15) · SECTION V Writing Skills
     Q5 letter / Q6 transfer + speech (15) · SECTION VI Creative
     Writing Q7 (10) = 80. Banks live in src/data-english.js. */
  function buildEngPaper(mode, sid, chid) {
    var E = window.SSC_ENG || {};
    var W = function (o, nominal, ch, raw) {
      var it = asItem(o, "w", nominal, ch);
      if (raw) it.rawKey = true;
      return it;
    };
    var pick1 = function (arr) { var a = sampleNeed(arr || [], 1); return a.length ? a[0] : null; };
    var g1 = sampleNeed(E.g1, 6).map(function (o) { return W(o, 1, "gr"); });
    var g2 = sampleNeed(E.g2, 3).map(function (o) { return W(o, 2, "gr"); });
    var tr = sampleNeed(E.tr, 2).map(function (o) { return W(o, 2, "gr"); });
    var tps = sampleNeed(E.tp, 2);
    var mkPass = function (p, tag) {
      if (!p) return [];
      return (p.acts || []).map(function (o) { return W(o, 2, "rc"); });
    };
    var poems = sampleNeed(E.po, 2);
    var p1items = [];
    if (poems[0]) {
      p1items.push(W(poems[0].a1, 2, "rc"));
      p1items.push(W(poems[0].a2, 2, "rc"));
      var a3 = asItem({ q: poems[0].a3.q, model: poems[0].a3.model, keys: [poems[0].a3.model], hot: null }, "mcq", 1, "rc");
      a3.opts = poems[0].a3.opts; a3.ans = poems[0].a3.ans; a3.exp = poems[0].a3.exp;
      p1items.push(a3);
    }
    var p2items = poems[1] ? [W({ q: poems[1].appr.q.replace("Write an appreciation of the poem", 'Write an appreciation of the poem "' + poems[1].title + '"'), model: poems[1].appr.model, keys: poems[1].appr.keys }, 5, "rc", true)] : [];
    var nps = sampleNeed(E.np, 1);
    var n1items = nps[0] ? nps[0].acts.map(function (o) { return W(o, 2, "rc"); }) : [];
    var n2items = nps[0] ? [W({ q: 'Q.4 (B) Summary: write a summary of the passage "' + nps[0].title + '" above and suggest a suitable title.', model: nps[0].summary + " Title: " + nps[0].sumTitle + ".", keys: [nps[0].sumTitle] }, 5, "rc", true)] : [];
    var fL = pick1(E.ltF), iL = pick1(E.ltI);
    var w1 = [];
    if (fL) w1.push(W({ q: fL.q, model: fL.model, keys: fL.keys }, 5, "wr", true));
    if (iL) w1.push(W({ q: iL.q, model: iL.model, keys: iL.keys }, 5, "wr", true));
    var tV = pick1(E.tfV), tB = pick1(E.tfB);
    var w2 = [];
    if (tV) w2.push(W({ q: tV.q, model: tV.model, keys: tV.keys }, 5, "wr", true));
    if (tB) w2.push(W({ q: tB.q, model: tB.model, keys: tB.keys }, 5, "wr", true));
    var sV = pick1(E.spV), sC = pick1(E.spC);
    var w3 = [];
    if (sV) w3.push(W({ q: sV.q, model: sV.model, keys: sV.keys }, 5, "wr", true));
    if (sC) w3.push(W({ q: sC.q, model: sC.model, keys: sC.keys }, 5, "wr", true));
    var cT = pick1(E.crT), cR = pick1(E.crR);
    var w4 = [];
    if (cT) w4.push(W({ q: cT.q, model: cT.model, keys: cT.keys }, 5, "wr", true));
    if (cR) w4.push(W({ q: cR.q, model: cR.model, keys: cR.keys }, 5, "wr", true));
    var cS = pick1(E.crS), cE = pick1(E.crE);
    var w5 = [];
    if (cS) w5.push(W({ q: cS.q, model: cS.model, keys: cS.keys }, 5, "wr", true));
    if (cE) w5.push(W({ q: cE.q, model: cE.model, keys: cE.keys }, 5, "wr", true));
    var secs = [
      { id: "g1", title: "Q.1 (A) A1 · Do as directed — any 4 of 6", need: Math.min(4, g1.length), nominal: 1, max: Math.min(4, g1.length), items: g1, choice: true },
      { id: "g2", title: "Q.1 (A) A2 · Do as directed — any 2 of 3", need: Math.min(2, g2.length), nominal: 2, max: Math.min(2, g2.length) * 2, items: g2, choice: true },
      { id: "tr", title: "Q.1 (B) · Do as directed — any 1 of 2", need: Math.min(1, tr.length), nominal: 2, max: Math.min(1, tr.length) * 2, items: tr, choice: true },
      { id: "t1", title: "Q.2 (A) · Textual passage — A1 to A5", need: 5, nominal: 2, max: 10, items: mkPass(tps[0]), choice: true, passage: tps[0] ? tps[0].text : "", ptitle: tps[0] ? tps[0].title : "" },
      { id: "t2", title: "Q.2 (B) · Textual passage — B1 to B5", need: 5, nominal: 2, max: 10, items: mkPass(tps[1]), choice: true, passage: tps[1] ? tps[1].text : "", ptitle: tps[1] ? tps[1].title : "" },
      { id: "p1", title: "Q.3 (A) · Poetry extract — A1, A2, A3", need: p1items.length, nominal: 2, max: p1items.reduce(function (a, it) { return a + it.nominal; }, 0), items: p1items, choice: false, passage: poems[0] ? poems[0].verse : "", ptitle: poems[0] ? (poems[0].title + " — " + poems[0].poet) : "" },
      { id: "p2", title: "Q.3 (B) · Appreciation of the poem", need: Math.min(1, p2items.length), nominal: 5, max: Math.min(1, p2items.length) * 5, items: p2items, choice: false, passage: poems[1] ? poems[1].verse : "", ptitle: poems[1] ? (poems[1].title + " — " + poems[1].poet) : "" },
      { id: "n1", title: "Q.4 (A) · Non-textual passage — A1 to A5", need: 5, nominal: 2, max: 10, items: n1items, choice: true, passage: nps[0] ? nps[0].text : "", ptitle: nps[0] ? nps[0].title : "" },
      { id: "n2", title: "Q.4 (B) · Summary of the passage with title", need: Math.min(1, n2items.length), nominal: 5, max: Math.min(1, n2items.length) * 5, items: n2items, choice: false, passage: "", ptitle: nps[0] ? ("Same passage: " + nps[0].title) : "" },
      { id: "w1", title: "Q.5 (A) · Formal letter (A1) or informal letter (A2) — any one", need: Math.min(1, w1.length), nominal: 5, max: Math.min(1, w1.length) * 5, items: w1, choice: true },
      { id: "w2", title: "Q.6 (A) · Verbal to non-verbal (A1) or bio-sketch (A2) — any one", need: Math.min(1, w2.length), nominal: 5, max: Math.min(1, w2.length) * 5, items: w2, choice: true },
      { id: "w3", title: "Q.6 (B) · Speech (B1) or views and counterviews (B2) — any one", need: Math.min(1, w3.length), nominal: 5, max: Math.min(1, w3.length) * 5, items: w3, choice: true },
      { id: "w4", title: "Q.7 (A) · Theme expansion (A1) or news report (A2) — any one", need: Math.min(1, w4.length), nominal: 5, max: Math.min(1, w4.length) * 5, items: w4, choice: true },
      { id: "w5", title: "Q.7 (B) · Story development (B1) or narrated experience (B2) — any one", need: Math.min(1, w5.length), nominal: 5, max: Math.min(1, w5.length) * 5, items: w5, choice: true }
    ];
    var total = secs.reduce(function (a, x) { return a + x.max; }, 0);
    return { sections: secs, total: total, mastery: true, focus: { n: 0, t: 0 }, eng: true };
  }

  /* Algebra (Maths-1) follows its OWN board blueprint (March 2026 paper,
     40 marks · 2 hrs): Q1.A 4×1 MCQ · Q1.B 4×1 · Q2.A activities any 2/3
     (4m) · Q2.B any 4/5 (8m) · Q3.A activity any 1/2 (3m) · Q3.B any 2/4
     (6m) · Q4 any 2/3 (8m) · Q5 any 1/2 (3m) = 40. Q4 items are answered
     at 4-mark depth, Q5 at 3-mark depth. */
  function buildAlgPaper(mode, sid, chid) {
    var s = subj(sid);
    var acts = window.SSC_ALG_ACT || { two: [], three: [] };
    var W = function (o, nominal, chapterId) { return asItem(o, "w", nominal, o.ch || chapterId); };
    var chActs = function (k) { return (acts[k] || []).filter(function (o) { return o.ch === chid; }); };
    var collect = function (k) {
      var arr = [];
      s.chapters.forEach(function (c) {
        var mm = masteryFor(sid, c.id);
        if (mm && mm[k]) mm[k].forEach(function (o) { arr.push({ q: o.q, model: o.model, keys: o.keys, hot: o.hot, ch: c.id }); });
      });
      return arr;
    };
    var mcqPool = (mode === "chapter") ? s.mcq.filter(function (x) { return x.ch === chid; }) : s.mcq;
    var mcqTake = sampleNeed(mcqPool.length ? mcqPool : s.mcq, 4);
    var usedQ = {};
    mcqTake.forEach(function (m) { usedQ[m.q] = 1; });
    var mcq = mcqTake.map(function (m) {
      var it = asItem({ q: m.q, model: m.opts[m.ans], keys: [m.opts[m.ans]], hot: m.hot, ch: m.ch }, "mcq", 1, m.ch);
      it.opts = m.opts; it.ans = m.ans; return it;
    });
    var one, a2Items, twoItems, a3Items, threeItems, fourItems, fiveItems;
    if (mode === "chapter") {
      var m = masteryFor(sid, chid) || { one: [], two: [], three: [], five: [] };
      one = sampleNeed(m.one || [], 4).map(function (o) { return W(o, 1, chid); });
      if (one.length < 4) {
        var restC = s.mcq.filter(function (x) { return x.ch === chid && !usedQ[x.q]; });
        one = one.concat(sampleNeed(restC, 4 - one.length).map(function (x) { return deriveOne(x, x.ch); }));
      }
      var notAct = function (arr, acts) { return arr.filter(function (o) { return acts.every(function (a) { return a.q !== o.q; }); }); };
      var a2base = chActs("two");
      var a2Top = sampleNeed(notAct(m.two || [], acts.two || []), Math.max(0, 3 - a2base.length));
      var a2Items = shuffle(a2base.slice(0, 3).concat(a2Top)).map(function (o) { return W(o, 2, chid); });
      var a2Qs = {};
      a2Items.forEach(function (o) { a2Qs[o.q] = 1; });
      twoItems = sampleNeed((m.two || []).filter(function (o) { return !a2Qs[o.q]; }), 5).map(function (o) { return W(o, 2, chid); });
      var a3base = chActs("three");
      var a3Items = (a3base.length >= 2 ? sampleNeed(a3base, 2)
        : shuffle(a3base.concat(sampleNeed(notAct(m.three || [], acts.three || []), 2 - a3base.length)))).map(function (o) { return W(o, 3, chid); });
      var threeFull = (m.three || []).slice();
      var a3Qs0 = {};
      a3Items.forEach(function (o) { a3Qs0[o.q] = 1; });
      var used3 = {};
      threeItems = sampleNeed(threeFull.filter(function (o) { return !a3Qs0[o.q]; }), 4).map(function (o) { used3[o.q] = 1; return W(o, 3, chid); });
      var a3Qs = a3Qs0;
      var fourPool = (m.five || []).concat(threeFull.filter(function (o) { return !used3[o.q] && !a3Qs[o.q]; }));
      var used4 = {};
      fourItems = sampleNeed(fourPool, 3).map(function (o) { used4[o.q] = 1; return W(o, 4, chid); });
      var fivePool = threeFull.filter(function (o) { return !used3[o.q] && !used4[o.q] && !a3Qs[o.q]; });
      fiveItems = sampleNeed(fivePool.length >= 2 ? fivePool : threeFull, 2).map(function (o) { return W(o, 3, chid); });
    } else {
      var onePool = collect("one");
      one = sampleNeed(onePool.length ? onePool : s.mcq.filter(function (x) { return !usedQ[x.q]; }).map(function (x) { return { q: x.q, model: x.opts[x.ans], keys: [x.opts[x.ans]], hot: x.hot, ch: x.ch }; }), 4)
        .map(function (o) { return (o.opts !== undefined && o.ans !== undefined) ? deriveOne(o, o.ch) : W(o, 1, o.ch); });
      a2Items = sampleNeed(acts.two || [], 3).map(function (o) { return W(o, 2, o.ch); });
      var twoFull = collect("two");
      if (twoFull.length < 5) twoFull = twoFull.concat(s.shortQs.filter(function (x) { return x.marks <= 2; }).map(function (x) { return { q: x.q, model: x.model, keys: x.keys, ch: x.ch }; }));
      twoItems = sampleNeed(twoFull, 5).map(function (o) { return W(o, 2, o.ch); });
      a3Items = sampleNeed(acts.three || [], 2).map(function (o) { return W(o, 3, o.ch); });
      var threeFullS = shuffle(collect("three"));
      if (threeFullS.length < 6) threeFullS = threeFullS.concat(s.shortQs.filter(function (x) { return x.marks === 3; }).map(function (x) { return { q: x.q, model: x.model, keys: x.keys, ch: x.ch }; }));
      threeItems = threeFullS.slice(0, 4).map(function (o) { return W(o, 3, o.ch); });
      fiveItems = threeFullS.slice(4, 6).map(function (o) { return W(o, 3, o.ch); });
      if (fiveItems.length < 2) fiveItems = fiveItems.concat(sampleNeed(collect("three"), 2 - fiveItems.length).map(function (o) { return W(o, 3, o.ch); }));
      var fourFull = collect("five");
      fourItems = sampleNeed(fourFull.length >= 3 ? fourFull : fourFull.concat(collect("three")), 3).map(function (o) { return W(o, 4, o.ch); });
    }
    var secs = [
      { id: "mcq", title: "Q1.A · MCQ — 4 × 1", need: mcq.length, nominal: 1, max: mcq.length, items: mcq, choice: false },
      { id: "one", title: "Q1.B · One-mark answers — 4 × 1", need: one.length, nominal: 1, max: one.length, items: one, choice: false },
      { id: "a2", title: "Q2.A · Complete the activity — any 2 of 3 (4m)", need: Math.min(2, a2Items.length), nominal: 2, max: Math.min(2, a2Items.length) * 2, items: a2Items, choice: true },
      { id: "two", title: "Q2.B · Solve — any 4 of 5 (8m)", need: Math.min(4, twoItems.length), nominal: 2, max: Math.min(4, twoItems.length) * 2, items: twoItems, choice: true },
      { id: "a3", title: "Q3.A · Complete the activity — any 1 of 2 (3m)", need: Math.min(1, a3Items.length), nominal: 3, max: Math.min(1, a3Items.length) * 3, items: a3Items, choice: true },
      { id: "three", title: "Q3.B · Solve — any 2 of 4 (6m)", need: Math.min(2, threeItems.length), nominal: 3, max: Math.min(2, threeItems.length) * 3, items: threeItems, choice: true },
      { id: "four", title: "Q4 · Solve — any 2 of 3 (8m)", need: Math.min(2, fourItems.length), nominal: 4, max: Math.min(2, fourItems.length) * 4, items: fourItems, choice: true },
      { id: "five", title: "Q5 · Solve — any 1 of 2 (3m)", need: Math.min(1, fiveItems.length), nominal: 3, max: Math.min(1, fiveItems.length) * 3, items: fiveItems, choice: true }
    ];
    var total = secs.reduce(function (a, x) { return a + x.max; }, 0);
    var focus = { n: 0, t: 0 };
    if (mode === "chapter") {
      secs.forEach(function (sec) { sec.items.forEach(function (it) { focus.t++; if (it.ch === chid) focus.n++; }); });
    }
    return { sections: secs, total: total, mastery: true, focus: focus, alg: true };
  }

  /* Seeded RNG for deterministic MODEL SETS (same Set N = same paper, every
     device, every time — like a printed board model-paper booklet). */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function seedOf(sid, setNo) {
    var h = 2166136261, str = sid + ":modelset:" + setNo;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    // avalanche: adjacent set numbers must NOT give correlated streams
    // (raw FNV differs by one bit for "…:4" vs "…:5", and the multiplier
    // preserves low-bit correlation into mulberry32's first outputs).
    h ^= h >>> 15; h = Math.imul(h, 0x2C1B3C6D); h ^= h >>> 12;
    h = Math.imul(h, 0x297A2D39); h ^= h >>> 15;
    return h >>> 0;
  }
  function withSeed(seed, fn) {
    var r = Math.random; Math.random = mulberry32(seed);
    try { return fn(); } finally { Math.random = r; }
  }
  /* 5 full-syllabus MODEL SETS per subject (final-exam-hall papers): tries
     seeded candidate builds and keeps the one covering the most chapters
     with the fewest repeated questions. */
  function scoreModelPaper(p) {
    var seen = {}, qseen = {}, dupes = 0;
    p.sections.forEach(function (sec) {
      sec.items.forEach(function (it) {
        if (it.ch) seen[it.ch] = 1;
        var key = String(it.q);
        if (qseen[key]) dupes++; else qseen[key] = 1;
      });
    });
    return Object.keys(seen).length * 1000 - dupes;
  }
  function buildModelPaper(sid, setNo) {
    var best = null, bestScore = -1e9;
    for (var t = 0; t < 400; t++) {
      var p = withSeed(seedOf(sid, setNo) + t * 7919, function () { return buildPaper("subject", sid); });
      var sc = scoreModelPaper(p) + (t === 0 ? 0.5 : 0); // stable tie-break
      if (sc > bestScore) { bestScore = sc; best = p; }
    }
    best.model = { sid: sid, set: setNo };
    return best;
  }
  function startMock(opts) {
    opts = opts || {};
    if (opts.mode) M.mode = opts.mode;
    if (opts.s) M.s = opts.s;
    var s = subj(M.s);
    if (opts.ch) M.ch = opts.ch;
    else if (M.mode === "chapter") {
      var validCh = s.chapters.some(function (c) { return c.id === M.ch; });
      if (!validCh) {
        var hasM = s.chapters.some(function (c) { return masteryFor(s.id, c.id); });
        M.ch = hasM ? s.chapters.filter(function (c) { return masteryFor(s.id, c.id); })[0].id : s.chapters[0].id;
      }
    }
    if (opts.mins) M.mins = opts.mins;
    else M.mins = (M.mode === "chapter") ? 60 : ((M.s === "alg" || M.s === "geo") ? 120 : ((M.s === "eng") ? 180 : 90));
    M.paper = (M.mode === "model") ? buildModelPaper(M.s, M.set) : buildPaper(M.mode, M.s, M.ch);
    M.phase = "run"; M.si = 0; M.ii = 0; M.reveal = false;
    M.secs = M.mins * 60;
    clearInterval(M.timer);
    M.timer = setInterval(function () {
      M.secs--;
      var t = document.getElementById("mTimer");
      if (t) {
        var m = Math.floor(Math.max(0, M.secs) / 60), ss = Math.max(0, M.secs) % 60;
        t.textContent = "⏱ " + m + ":" + (ss < 10 ? "0" : "") + ss;
        if (M.secs <= 300) t.style.background = "#dc2626";
      }
      if (M.secs <= 0) { clearInterval(M.timer); autoFinish(); }
    }, 1000);
    renderMock();
  }
  function curSec() { return M.paper.sections[M.si]; }
  function secScore(sec) {
    var sum = sec.items.reduce(function (a, it) { return a + (it.done ? it.award : 0); }, 0);
    return Math.min(sum, sec.max);
  }
  function paperScore() { return M.paper.sections.reduce(function (a, s) { return a + secScore(s); }, 0); }
  function autoFinish() {
    M.paper.sections.forEach(function (sec) {
      sec.items.forEach(function (it) {
        if (it.kind === "mcq" && !it.done) { it.done = true; it.award = (it.picked === it.ans) ? 1 : 0; }
        else if (!it.done) { it.done = true; it.award = 0; }
      });
    });
    finishPaper(true);
  }
  function finishPaper(auto) {
    clearInterval(M.timer);
    M.phase = "result";
    var sc = paperScore();
    S.mocks.push({ name: (M.mode === "chapter" ? chName(subj(M.s), M.ch) : subj(M.s).short) + " · " + M.paper.total + "m", score: Math.round(sc * 2) / 2, total: M.paper.total, when: new Date().toLocaleDateString() });
    addXP(Math.round(sc * 5)); touchDay(); save();
    renderMock(); renderDash();
    if (auto) { var n = document.getElementById("mNote"); if (n) n.textContent = "Time over — paper auto-submitted. Unattempted answers scored zero."; }
  }

  function renderMock() {
    var el = document.getElementById("sec-mock");
    var s = subj(M.s);
    var modeBtns = '<button class="chip' + (M.mode === "subject" ? " sel" : "") + '" data-mode="subject">📄 Full subject paper</button>' +
      '<button class="chip' + (M.mode === "chapter" ? " sel" : "") + '" data-mode="chapter">🎯 Chapter mastery (40m)</button>' +
      '<button class="chip' + (M.mode === "model" ? " sel" : "") + '" data-mode="model">🏛️ Model paper · Set 1–5 (exam hall)</button>';
    var subBtns = window.SSC_SUBJECTS.map(function (x) {
      return '<button class="chip' + (x.id === M.s ? " sel" : "") + '" data-s="' + x.id + '">' + x.icon + " " + esc(x.short) + "</button>";
    }).join("");
    var chBtns = "";
    if (M.mode === "chapter") {
      chBtns = '<h3>Chapter</h3><div class="row">' + s.chapters.map(function (c) {
        var star = masteryFor(s.id, c.id) ? " 📚" : "";
        return '<button class="chip' + (M.ch === c.id ? " sel" : "") + '" data-c="' + c.id + '">' + stars(c.w) + " " + esc(c.name) + star + "</button>";
      }).join("") + '</div><div class="mut">★★★ = high board weightage · 📚 = every chapter paper uses only its own lesson Qs (see focus meter on the paper).</div>';
    }
    var setBtns = "";
    if (M.mode === "model") {
      setBtns = '<h3>Model set — 5 fixed full-syllabus papers (same Set N = same paper, everywhere)</h3><div class="row">' + [1, 2, 3, 4, 5].map(function (n) {
        return '<button class="chip' + (M.set === n ? " sel" : "") + '" data-set="' + n + '">Set ' + n + "</button>";
      }).join("") + '</div><div class="mut">🏛️ Exam-hall rules: full syllabus (all chapters), board blueprint, no peeking — sit in one go with paper + pen, then check the teacher key.</div>';
    }
    var engFull = (M.s === "eng" && M.mode !== "chapter");
    var times = (engFull ? [60, 120, 150, 180] : [30, 60, 90, 120]).map(function (m) {
      return '<button class="chip' + (M.mins === m ? " sel" : "") + '" data-m="' + m + '">' + m + " min</button>";
    }).join("");
    var head = '<div class="card"><h2>' + (engFull ? "⏱️ 80-Mark Official Board Paper (English)" : "⏱️ 40-Mark Board Blueprint Paper") + '</h2><div class="mut">' +
      ((M.s === "alg") ? 'Q1.A 4×1 MCQ · Q1.B 4×1 · Q2.A activities 2/3 (4m) · Q2.B 4/5 (8m) · Q3.A activity 1/2 (3m) · Q3.B 2/4 (6m) · Q4 2/3 (8m) · Q5 1/2 (3m) = <b>40</b>' :
       (M.s === "geo") ? 'Q1 4×1 MCQ + constructions 4×1 · Q2–Q5 with diagrams (figure = marks!) = <b>40</b>' :
       engFull ? 'Q1 Language Study 10 · Q2 Textual passages 20 · Q3 Poetry 10 · Q4 Non-textual + summary 15 · Q5 Letter 5 · Q6 Transfer + speech 10 · Q7 Creative writing 10 = <b>80</b>' :
       'Q1.A 5×1 MCQ · Q1.B 5×1 · Q2.A reasons 2/3 (4m) · Q2.B 3/5 (6m) · Q3 5/8 (15m) · Q4 1/2 (5m) = <b>40</b>') +
      ((M.mode === "subject" || M.mode === "model") && (M.s === "sci1" || M.s === "sci2") ? '<br>Q4 here pairs two streams like the board: ' + (M.s === "sci1" ? "🔭 Physics vs ⚗️ Chemistry" : "🧬 Biology vs 🌱 Environment") + ' — attempt your stronger one.' : "") + '</div>' +
      '<h3>Mode</h3><div class="row">' + modeBtns + '</div><h3>Subject</h3><div class="row">' + subBtns + '</div>' + chBtns + setBtns +
      '<h3>Time</h3><div class="row">' + times + '</div>' +
      '<div class="row" style="margin-top:10px"><button class="btn acc" id="mStart">▶ Start ' + (engFull ? "80-mark" : "40-mark") + ' paper (' + M.mins + ' min)</button>' +
      ((M.mode === "chapter" || M.mode === "model") ? '<button class="btn ghost" id="mPrint">🖨 Printable version (offline)</button>' : "") + "</div></div>";
    var body = "";
    if (M.phase === "setup") {
      body = '<div class="card"><h2>How marking works here (same as the board)</h2>' +
        '<ul class="tight"><li><b>MCQ & one-markers:</b> auto / self-checked, 1 mark each.</li>' +
        '<li><b>Written answers:</b> reveal the model, then <b>tick only the keywords you actually wrote</b>. Score = keywords × marks. That is exactly how the examiner ticks.</li>' +
        '<li><b>Choice sections</b> ("any 3 of 5" / "any 4 of 5" / "any 2 of 3"): attempt extra if you want — only the best count, capped at the section max.</li>' +
        '<li><b>Maths papers (Algebra):</b> step marking — formula → substitution → answer with statement. In activities, fill every □ box; each box can carry a step mark.</li>' +
        '<li>Write on paper first. Minimal story, maximum structure: definition → labelled points → diagram/formula → one-line conclusion. Underline keywords.</li></ul></div>';
    } else if (M.phase === "run") {
      body = renderRun(s);
    } else if (M.phase === "result") {
      body = renderResult(s);
    }
    el.innerHTML = head + body;
    el.querySelectorAll("[data-mode]").forEach(function (b) { b.onclick = function () { M.mode = b.dataset.mode; M.mins = (M.mode === "chapter") ? 60 : ((M.s === "alg" || M.s === "geo") ? 120 : ((M.s === "eng") ? 180 : 90)); M.phase = "setup"; renderMock(); }; });
    el.querySelectorAll("[data-s]").forEach(function (b) {
      b.onclick = function () {
        clearInterval(M.timer); M.s = b.dataset.s;
        var ns = subj(M.s);
        M.ch = ns.chapters[0].id;
        var withM = ns.chapters.filter(function (c) { return masteryFor(ns.id, c.id); });
        if (M.mode === "chapter" && withM.length) M.ch = withM[0].id;
        if (M.mode === "model") M.paper = null; // stale set paper must never reprint under a new subject/set
        if (M.mode !== "chapter") M.mins = (M.s === "alg" || M.s === "geo") ? 120 : ((M.s === "eng") ? 180 : 90);
        M.phase = "setup"; renderMock();
      };
    });
    el.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { M.ch = b.dataset.c; M.phase = "setup"; renderMock(); }; });
    el.querySelectorAll("[data-set]").forEach(function (b) { b.onclick = function () { M.set = +b.dataset.set; M.paper = null; M.phase = "setup"; renderMock(); }; });
    el.querySelectorAll("[data-m]").forEach(function (b) { b.onclick = function () { M.mins = +b.dataset.m; renderMock(); }; });
    var st = document.getElementById("mStart"); if (st) st.onclick = function () { startMock(); };
    var mp = document.getElementById("mPrint"); if (mp) mp.onclick = function () {
      if (M.mode === "model") { if (!M.paper || !M.paper.model || M.paper.model.sid !== M.s || M.paper.model.set !== M.set) M.paper = buildModelPaper(M.s, M.set); if (M.s === "eng") { renderEngPrintPaper(); return; } renderModelPrintPaper(); return; }
      renderPrintPaper(M.s, M.ch, true);
    };
    wireRun(el, s);
  }

  function renderRun(s) {
    var sec = curSec(), it = sec.items[M.ii];
    var doneCount = sec.items.filter(function (x) { return x.done; }).length;
    var h = '<div class="card"><div class="row" style="justify-content:space-between"><span class="qmeta">' +
      esc(sec.title) + " · item " + (M.ii + 1) + "/" + sec.items.length + " · done " + doneCount + " · paper score " + (Math.round(paperScore() * 2) / 2) + "/" + M.paper.total +
      '</span><span class="timer" id="mTimer"></span></div><div id="mNote" class="mut"></div>';
    if (M.mode === "chapter" && M.paper.focus && M.paper.focus.t) {
      h += '<div class="mut">🎯 Focus meter: ' + M.paper.focus.n + "/" + M.paper.focus.t + " questions are from <b>" + esc(chName(s, M.ch)) + "</b>" + (M.paper.focus.n < M.paper.focus.t ? " — the rest are labelled booster Qs from this subject (attempted extra still caps at section max)." : " — 100% this lesson.") + "</div>";
    }
    if (!M.paper.mastery && M.mode === "chapter") h += '<div class="mut">Assembled from the general bank — full PYQ-banked paper for this chapter arrives with the textbook.</div>';
    if (sec.passage) h += '<div class="exp rawmod"><b>📖 Read' + (sec.ptitle ? " — " + esc(sec.ptitle) : "") + ':</b><br>' + MX(sec.passage) + "</div>";
    if (it.kind === "mcq") {
      h += "<h2 style='margin:6px 0'>" + MX(it.q) + "</h2>" + '<div class="mut">Chapter: ' + esc(chName(s, it.ch)) + " " + hotBadge(it) + "</div>" +
        it.opts.map(function (o, k) {
          return '<button class="opt' + (it.picked === k ? " picked" : "") + '" data-o="' + k + '"><b>' + "ABCD"[k] + ".</b> " + MX(o) + "</button>";
        }).join("") + runNav(sec, true);
    } else {
      h += "<h2 style='margin:6px 0'>(" + it.nominal + " mark" + (it.nominal > 1 ? "s" : "") + ") " + (it.box ? activityQ(it.q) : MX(it.q)) + "</h2>" +
        '<div class="mut">Chapter: ' + esc(chName(s, it.ch)) + (it.stream ? ' · <span class="kbd">' + esc(it.stream) + " option</span>" : "") + " " + hotBadge(it) + ' · Write it on paper first, then reveal.</div>';
      if (!M.reveal) {
        h += '<div class="row" style="margin:10px 0"><button class="btn ghost" id="wShow">Show model answer + keywords</button></div>' + runNav(sec, false);
      } else {
        if (it.box && it.q.indexOf("□") >= 0) h += '<div class="exp fact"><b>✅ Filled activity (every box):</b><br>' + fillBoxes(it.q, it.box) + "</div>";
        h += '<div class="exp"><b>Model answer:</b><br>' + MX(it.model) + "</div>";
        if (it.keys && it.keys.length) {
          h += "<h3>🔑 Tick the keywords you actually wrote (" + it.keys.length + " = full marks):</h3>" +
            it.keys.map(function (k, i) {
              return '<label style="display:block;border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin:6px 0;font-size:14px;cursor:pointer"><input type="checkbox" data-k="' + i + '" style="transform:scale(1.3);margin-right:8px"> ' + MX(k) + "</label>";
            }).join("") +
            '<div class="row" style="margin-top:8px"><span class="pill" style="background:#0f172a;color:#fde68a;border:0">Your marks: <b id="wLive">0</b> / ' + it.nominal + '</span>' +
            '<button class="btn ok" id="wConfirm">Confirm & next</button><button class="btn ghost" id="wSkip">Skip (0)</button></div>';
        } else {
          h += '<h3>Mark yourself honestly:</h3><div class="row"><button class="btn ok" data-a="full">Full ' + it.nominal + '</button>' +
            '<button class="btn" data-a="half">Half</button><button class="btn bad" data-a="zero">Missed (0)</button></div>';
        }
        h += runNav(sec, false);
      }
    }
    return h + "</div>";
  }
  function runNav(sec, mcqLike) {
    var h = '<div class="row" style="margin-top:10px">';
    if (M.ii > 0) h += '<button class="btn ghost" id="rPrev">← Back</button>';
    if (mcqLike && M.ii + 1 < sec.items.length) h += '<button class="btn" id="rNext">Next →</button>';
    else if (M.si + 1 < M.paper.sections.length) h += '<button class="btn acc" id="rSecNext">Submit section →</button>';
    else h += '<button class="btn ok" id="rFinish">Finish paper → result</button>';
    return h + "</div><div class='mut'>Timer auto-submits. Choice sections cap at max — extra attempts only help.</div>";
  }
  function liveScore(it) {
    var boxes = document.querySelectorAll("[data-k]");
    var n = 0; boxes.forEach(function (b) { if (b.checked) n++; });
    var v = it.keys.length ? (it.nominal * n / it.keys.length) : 0;
    return Math.round(v * 2) / 2;
  }
  function confirmWritten(it, award) {
    var sec = curSec();
    if (it.done) M._adj = (M._adj || 0) - it.award;
    it.award = Math.min(award, it.nominal);
    if (!it.done) { it.done = true; record(M.s, it.award >= it.nominal / 2); if (it.award === it.nominal) addXP(it.nominal * 2); }
    advance();
  }
  function advance() {
    var sec = curSec();
    M.reveal = false;
    if (M.ii + 1 < sec.items.length) { M.ii++; renderMock(); }
    else if (M.si + 1 < M.paper.sections.length) { M.si++; M.ii = 0; renderMock(); }
    else finishPaper(false);
  }
  function wireRun(el, s) {
    if (M.phase !== "run") {
      var rt = document.getElementById("mRetry"); if (rt) rt.onclick = function () { M.phase = "setup"; renderMock(); };
      return;
    }
    var sec = curSec(), it = sec.items[M.ii];
    el.querySelectorAll("[data-o]").forEach(function (b) {
      b.onclick = function () {
        it.picked = +b.dataset.o;
        if (!it.done) { it.done = true; it.award = (it.picked === it.ans) ? 1 : 0; record(M.s, it.award === 1); if (it.award) addXP(2); }
        renderMock();
      };
    });
    var sh = document.getElementById("wShow");
    if (sh) sh.onclick = function () { M.reveal = true; renderMock(); };
    el.querySelectorAll("[data-k]").forEach(function (b) {
      b.onchange = function () { var lv = document.getElementById("wLive"); if (lv) lv.textContent = liveScore(it); };
    });
    var cf = document.getElementById("wConfirm");
    if (cf) cf.onclick = function () { confirmWritten(it, liveScore(it)); };
    var sk = document.getElementById("wSkip");
    if (sk) sk.onclick = function () { confirmWritten(it, 0); };
    el.querySelectorAll("[data-a]").forEach(function (b) {
      b.onclick = function () {
        var v = b.dataset.a === "full" ? it.nominal : b.dataset.a === "half" ? it.nominal / 2 : 0;
        confirmWritten(it, v);
      };
    });
    var pv = document.getElementById("rPrev");
    if (pv) pv.onclick = function () { M.ii--; M.reveal = false; renderMock(); };
    var nx = document.getElementById("rNext");
    if (nx) nx.onclick = function () { M.ii++; renderMock(); };
    var sn = document.getElementById("rSecNext");
    if (sn) {
      sn.onclick = function () {
        if (sec.id === "mcq") {
          sec.items.forEach(function (x) { if (!x.done) { x.done = true; x.award = (x.picked === x.ans) ? 1 : 0; record(M.s, x.award === 1); } });
        }
        M.si++; M.ii = 0; M.reveal = false; renderMock();
      };
    }
    var fn = document.getElementById("rFinish");
    if (fn) {
      fn.onclick = function () {
        if (sec.id === "mcq") sec.items.forEach(function (x) { if (!x.done) { x.done = true; x.award = (x.picked === x.ans) ? 1 : 0; } });
        finishPaper(false);
      };
    }
  }
  function renderResult(s) {
    var sc = Math.round(paperScore() * 2) / 2, tot = M.paper.total;
    var pct = tot ? Math.round(100 * sc / tot) : 0;
    var grade = pct >= 85 ? "🌟 Distinction! Board-ready." : pct >= 60 ? "📈 First class — fix the missed keywords." : pct >= 35 ? "📝 Passing — re-learn, then retry this paper." : "🧱 Rebuild needed — Learn tab first, then retry.";
    var rows = M.paper.sections.map(function (sec) {
      var sub = sec.items.map(function (it, i) {
        var ans = it.kind === "mcq" ? it.opts[it.ans] : it.model;
        return "<tr><td>" + esc(sec.id.toUpperCase()) + "." + (i + 1) + "</td><td>" + MX(it.q) + "</td><td>" + boldKeys(ans, it.keys) + keyLine(it.keys) + "</td><td>" + it.award + "/" + it.nominal + "</td></tr>";
      }).join("");
      return "<tr><th colspan='4' style='background:#0f172a;color:#fde68a'>" + esc(sec.title) + " — " + secScore(sec) + "/" + sec.max + "</th></tr>" + sub;
    }).join("");
    return '<div class="card" id="mNoteCard"><h2>' + grade + "</h2>" +
      "<p>Score: <b>" + sc + " / " + tot + "</b> (" + pct + "%) · " + esc(M.mode === "chapter" ? chName(s, M.ch) : s.name) + " · " + new Date().toLocaleString() + '</p><div id="mNote" class="mut"></div>' +
      '<table class="pat" style="margin-top:10px"><tr><th>Q</th><th>Question</th><th>Model / keywords</th><th>You</th></tr>' + rows + "</table>" +
      '<div class="trap">Study the 🔑 column: every keyword you missed is one tick the examiner would not give. Re-attempt those answers on paper with the keywords underlined.</div>' +
      '<div class="row" style="margin-top:10px"><button class="btn acc" id="mRetry">↻ New paper, same settings</button>' +
      '<button class="btn ghost" onclick="window.print()">🖨 Print / save PDF</button></div></div>';
  }

  /* ---------- flashcards ---------- */
  var F = { s: "sci2", i: 0, flip: false, deck: [], _s: "" };
  function buildDeck(sid) {
    var s = subj(sid), d = [];
    s.chapters.forEach(function (c) {
      c.notes.forEach(function (n) { d.push({ f: c.name + " — complete this idea", b: n }); });
      c.traps.forEach(function (t) { d.push({ f: c.name + " — ⚠️ trap check", b: t }); });
      c.formulas.forEach(function (f) { d.push({ f: c.name + " — recall", b: f }); });
    });
    s.shortQs.forEach(function (q) {
      d.push({ f: "(" + q.marks + "m) " + q.q, b: q.model + (q.keys ? " 🔑 " + q.keys.join(" · ") : "") });
    });
    return shuffle(d);
  }
  function renderFlash() {
    var el = document.getElementById("sec-flash");
    if (!F.deck.length || F._s !== F.s) { F.deck = buildDeck(F.s); F._s = F.s; F.i = 0; F.flip = false; }
    var s = subj(F.s);
    var subBtns = window.SSC_SUBJECTS.map(function (x) {
      return '<button class="chip' + (x.id === F.s ? " sel" : "") + '" data-s="' + x.id + '">' + x.icon + " " + esc(x.short) + "</button>";
    }).join("");
    var c = F.deck[F.i];
    el.innerHTML = '<div class="card"><h2>🃏 Flashcards</h2><div class="mut">Tap the card to flip. Say the answer aloud before flipping — board examiners love exact keywords.</div>' +
      '<div class="row" style="margin-top:8px">' + subBtns + '</div>' +
      '<div class="row" style="margin-top:8px"><button class="btn ghost" id="fShuf">🔀 Shuffle (' + F.deck.length + ' cards)</button><span class="mut">' + (F.i + 1) + " / " + F.deck.length + "</span></div></div>" +
      '<div class="card"><div class="flash' + (F.flip ? " flip" : "") + '" id="fCard"><div class="flashInner"><div class="face"><b>' + MX(c.f) + "</b></div>" +
      '<div class="face back">' + MX(c.b) + "</div></div></div>" +
      '<div class="row" style="margin-top:12px;justify-content:space-between"><button class="btn ghost" id="fPrev">← Prev</button>' +
      '<button class="btn" id="fKnow">I knew it (+2 XP)</button>' +
      '<button class="btn ghost" id="fNext">Next →</button></div></div>';
    el.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { F.s = b.dataset.s; F.flip = false; renderFlash(); }; });
    document.getElementById("fCard").onclick = function () { F.flip = !F.flip; renderFlashKeep(); };
    document.getElementById("fPrev").onclick = function () { F.i = (F.i - 1 + F.deck.length) % F.deck.length; F.flip = false; renderFlash(); };
    document.getElementById("fNext").onclick = function () { F.i = (F.i + 1) % F.deck.length; F.flip = false; renderFlash(); };
    document.getElementById("fShuf").onclick = function () { F.deck = shuffle(F.deck); F.i = 0; F.flip = false; renderFlash(); };
    document.getElementById("fKnow").onclick = function () { addXP(2); touchDay(); F.i = (F.i + 1) % F.deck.length; F.flip = false; renderFlash(); };
  }
  function renderFlashKeep() {
    var c = document.getElementById("fCard");
    if (c) c.classList.toggle("flip", F.flip);
    else renderFlash();
    F.flip = document.getElementById("fCard").classList.contains("flip");
  }

  /* ---------- formulas ---------- */
  var FO = { s: "sci1" };
  function renderForm() {
    var el = document.getElementById("sec-form");
    var s = subj(FO.s);
    var subBtns = window.SSC_SUBJECTS.map(function (x) {
      return '<button class="chip' + (x.id === FO.s ? " sel" : "") + '" data-s="' + x.id + '">' + x.icon + " " + esc(x.short) + "</button>";
    }).join("");
    var rows = [];
    s.chapters.forEach(function (c) {
      c.formulas.forEach(function (f) { rows.push("<tr><td>" + esc(c.name) + "</td><td><span class='kbd'>" + MX(f) + "</span></td></tr>"); });
      c.notes.slice(0, 2).forEach(function (n) { rows.push("<tr><td>" + esc(c.name) + "</td><td>" + MX(n) + "</td></tr>"); });
    });
    if (!rows.length) rows.push("<tr><td colspan='2'>This subject is theory-heavy — use Flashcards instead.</td></tr>");
    el.innerHTML = '<div class="card"><h2>🧪 Formula & Fact Lab</h2><div class="mut">One-page revision before the exam. Copy into your notebook.</div>' +
      '<div class="row" style="margin-top:8px">' + subBtns + '</div></div>' +
      '<div class="card"><h2>' + s.icon + " " + esc(s.name) + '</h2><table class="pat"><tr><th>Chapter</th><th>Formula / key fact</th></tr>' + rows.join("") + "</table>" +
      '<div class="row" style="margin-top:10px"><button class="btn ghost" onclick="window.print()">🖨 Print this sheet</button></div></div>';
    el.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { FO.s = b.dataset.s; renderForm(); }; });
  }

  /* ---------- papers guide ---------- */
  function renderPapers() {
    var el = document.getElementById("sec-papers");
    el.innerHTML = '<div class="card hero"><h2>🧭 Smart plan: is mastering all 10 lessons a waste of time?</h2>' +
      '<div class="mut">Short answer: <b>no — but giving all 10 equal time IS wasteful.</b> The paper itself tells you how to split effort:</div>' +
      '<ul class="tight"><li><b>Q1 (10 marks) spans the whole syllabus.</b> Zero-ing any chapter still costs ~1–2 marks. So every chapter deserves at least Q1-level prep (terms, diagrams, one-line facts) — never skip a chapter cold.</li>' +
      '<li><b>Choice does the rest.</b> Q2.B (any 3 of 5), Q3 (any 5 of 8), Q4 (any 1 of 2 streams). You only need ~70% of the syllabus at full answering depth; the weakest ~30% just needs Q1-level + one fallback answer (especially one Q4-stream fallback).</li>' +
      '<li><b>Depth rule:</b> ★★★ chapters → full 5-mark depth (diagram/flowchart + 5 keywords). ★★ → solid 3-mark depth. ★ → Q1-level + key terms. Chapters in this app carry these stars, counted from the 2022–25 board papers (Science) or the standard blueprint (others). <b>Algebra splits differently:</b> Q1 8 · Q2 12 · Q3 9 · Q4 8 · Q5 3 — Q1 spans all 6 chapters, activities (Q2.A/Q3.A) reward stepwise box-filling, so every chapter deserves at least activity-level prep. <b>English is a full 80m paper:</b> Q1 10 · Q2 20 · Q3 10 · Q4 15 · Q5–Q6 15 · Q7 10 — choice sits inside every question, so attempt all seven.</li></ul>' +
      '<div class="mut"><b>Pick your plan:</b> 🏆 <b>40/40:</b> all ★★★ at 5-mark depth + ★★ at 3-mark + ★ at Q1-level, then 1 full paper weekly. 🛡️ <b>35+ safe:</b> ★★★ full + ★★ at 3-mark, ★ only Q1-level. 🆘 <b>2-week rescue:</b> only ★★★ chapters + Q1 terms across all chapters + one ready Q4 answer per stream — this alone covers ~30/40.</div></div>' +
      '<div class="card hero"><h2>📄 Board Papers Guide</h2>' +
      '<div class="mut">Your link collects <b>Science & Technology Part 2</b> previous papers (English Medium) with solutions. Use them like this:</div>' +
      '<ul class="tight"><li>Master chapters one by one with the <b>chapter-wise 40-mark papers</b> here, then solve <b>one full paper every Sunday</b> with a timer.</li>' +
      '<li>Download papers + solutions — <a href="https://www.shaalaa.com/search-question-papers/maharashtra-board-10th-standard-ssc-english-medium_662?subjects=science-and-tech-2_3285&page=2" target="_blank" rel="noopener">Shaalaa — SSC Science & Tech Part 2 papers</a> · <a href="https://www.shaalaa.com/search-question-papers/maharashtra-board-10th-standard-ssc-english-medium_662?subjects=science-and-tech-1_3355" target="_blank" rel="noopener">Shaalaa — Part 1 papers</a> · <a href="https://www.shaalaa.com/question-paper-solution/maharashtra-board-ssc-algebra-mathematics-1-10th-standard-2025-2026-board-question-paper_20632" target="_blank" rel="noopener">Shaalaa — Algebra 2025-26 board paper (the blueprint this app follows)</a></li>' +
      "<li>Check answers with the solutions PDF, then re-attempt every lost mark in this app's Practice tab.</li></ul></div>" +
      '<div class="card"><h2>Science & Tech — exact board blueprint (40 marks · 2 hrs)</h2>' +
      '<table class="pat"><tr><th>Q</th><th>Type</th><th>Marks</th><th>Strategy</th></tr>' +
      "<tr><td>Q1.A</td><td>5 MCQs (only first attempt counts!)</td><td>5×1 = 5</td><td>60 sec each; eliminate first</td></tr>" +
      "<tr><td>Q1.B</td><td>True/false · odd-one · match · name · co-relation</td><td>5×1 = 5</td><td>One line, exact term</td></tr>" +
      "<tr><td>Q2.A</td><td>Scientific reasons — any 2 of 3</td><td>2×2 = 4</td><td>Reason + example, no story</td></tr>" +
      "<tr><td>Q2.B</td><td>Short answers — any 3 of 5 (some have a/b sub-options)</td><td>3×2 = 6</td><td>2 labelled points each</td></tr>" +
      "<tr><td>Q3</td><td>Structured — any 5 of 8 (distinguish, flowcharts, tables, short notes)</td><td>5×3 = 15</td><td>Definition → 3 points → diagram</td></tr>" +
      "<tr><td>Q4</td><td>Long answer — any 1 of 2, options from DIFFERENT streams (see 🎯 below)</td><td>1×5 = 5</td><td>Attempt your stronger stream; headings + diagram</td></tr></table>" +
      '<div class="mut">≈ 3 min per mark. Keep 15 min at the end for revision + underlining keywords.</div></div>' +
      '<div class="card"><h2>➗ Mathematics – 1 (Algebra) — exact board blueprint (40 marks · 2 hrs, March 2026 paper)</h2>' +
      '<div class="mut">This app\'s <b>Algebra papers (mock + printable) follow this exact pattern</b> — counts, choices and marks verified against the official 2025-26 paper.</div>' +
      '<table class="pat"><tr><th>Q</th><th>Type</th><th>Marks</th><th>Strategy</th></tr>' +
      "<tr><td>Q1.A</td><td>4 MCQs — 4 options each (only first attempt counts!)</td><td>4×1 = 4</td><td>60 sec each; write the alphabet; eliminate first</td></tr>" +
      "<tr><td>Q1.B</td><td>4 one-mark solves (Cramer Dx/D, quadratic form, sample space, GST rate)</td><td>4×1 = 4</td><td>One clean step + answer</td></tr>" +
      "<tr><td>Q2.A</td><td>Complete the activity — any 2 of 3 (fill the □ boxes stepwise)</td><td>2×2 = 4</td><td>Fill EVERY box; each box can carry a step mark</td></tr>" +
      "<tr><td>Q2.B</td><td>Solve — any 4 of 5</td><td>4×2 = 8</td><td>Formula → substitution → answer</td></tr>" +
      "<tr><td>Q3.A</td><td>Complete the activity — any 1 of 2 (GST / root-verify / Cramer / median-class)</td><td>1×3 = 3</td><td>Show each substitution line</td></tr>" +
      "<tr><td>Q3.B</td><td>Solve — any 2 of 4 (one sub-part may split 1½ + 1½)</td><td>2×3 = 6</td><td>Statement + steps + verification line</td></tr>" +
      "<tr><td>Q4</td><td>Solve — any 2 of 3 (quadratic sums, shares + brokerage + GST, median)</td><td>2×4 = 8</td><td>4 labelled steps; table for stats</td></tr>" +
      "<tr><td>Q5</td><td>Solve — any 1 of 2 (pie diagram with value of a, or simultaneous-equation word problem)</td><td>1×3 = 3</td><td>Diagram / define x,y → frame → solve → verify</td></tr></table>" +
      '<div class="mut">Time plan: Q1 (8m) 15 min · Q2 (12m) 35 min · Q3 (9m) 30 min · Q4 (8m) 25 min · Q5 (3m) 10 min · revision 5 min. All questions compulsory; calculator not allowed; numbers on the right = full marks.</div></div>' +
      '<div class="card"><h2>📝 English — exact board blueprint (80 marks · 3 hrs, March 2026 paper)</h2>' +
      '<div class="mut">This app\'s <b>English full papers + Model Sets 1–5 follow this exact pattern</b> — sections, choices and marks verified against the official 2025-26 board paper.</div>' +
      '<table class="pat"><tr><th>Q</th><th>Type</th><th>Marks</th><th>Strategy</th></tr>' +
      "<tr><td>Q1</td><td>Language Study — A1 do-as-directed any 4, A2 any 2, B any 1 (degrees / No sooner / voice)</td><td>4 + 4 + 2 = 10</td><td>Grammar forms must be exact; full stop after each</td></tr>" +
      "<tr><td>Q2</td><td>Two textual passages — each with 5 activities × 2 (web, Q, vocabulary, grammar, personal response)</td><td>10 + 10 = 20</td><td>Own words; one point per mark</td></tr>" +
      "<tr><td>Q3</td><td>Poetry — (A) extract A1 + A2 + rhyme MCQ, (B) appreciation paragraph (title, poet, rhyme, figures, theme)</td><td>5 + 5 = 10</td><td>Learn the 5-point appreciation frame cold</td></tr>" +
      "<tr><td>Q4</td><td>Non-textual passage — A1–A5 (T/F, Q, antonyms, grammar, measures) + summary with title</td><td>10 + 5 = 15</td><td>Summary = one-third length, own words</td></tr>" +
      "<tr><td>Q5–Q6</td><td>Writing — formal/informal letter (any 1), verbal→non-verbal or bio-sketch (any 1), speech or views (any 1)</td><td>5 + 5 + 5 = 15</td><td>Format first: address, date, subject, greeting, title</td></tr>" +
      "<tr><td>Q7</td><td>Creative — theme expansion or news report (any 1), story development or experience (any 1)</td><td>5 + 5 = 10</td><td>100 words, title, past tense for narration</td></tr></table>" +
      '<div class="mut">Time plan (3-hr paper): Q1 25 min · Q2 40 min · Q3 20 min · Q4 30 min · Q5–Q6 40 min · Q7 25 min. Official paper: <a href="https://www.shaalaa.com/question-paper-solution/maharashtra-board-ssc-english-10th-standard-2025-2026-board-question-paper_20627" target="_blank" rel="noopener">Shaalaa — English 2025-26 board paper</a>.</div></div>' +
      '<div class="card"><h2>🎯 The Q4 option game (checked on the official 2024-25 papers)</h2>' +
      '<ul class="tight"><li><b>Science Part 1:</b> Q4 = <b>🔭 Physics vs ⚗️ Chemistry</b>. In March 2025: (i) prove a rainbow is refraction + dispersion + total internal reflection, <b>OR</b> (ii) complete the C1–C10 carbon-chains table. A physics-lover and a chemistry-lover each get a fair 5 marks.</li>' +
      '<li><b>Science Part 2:</b> Q4 = <b>🧬 Biology vs 🌱 Environment</b>. In March 2025: (i) my-role-in-environmental-conservation flowchart, <b>OR</b> (ii) animal-adaptation similarities across classes. In 2018 it was covalent compounds vs excretory system — same idea, streams differ.</li>' +
      '<li><b>Strategy:</b> take your stronger stream to full 5-mark depth (labelled diagram/flowchart + 5 keywords), and keep <b>one ready-made fallback answer</b> in the weaker stream. Never walk into Q4 with only one stream prepared.</li>' +
      '<li>This app\'s <b>full-subject Science papers already pair Q4 exactly like this</b> — look for the stream badge (e.g. “⚗️ Chemistry option”) on each Q4 question.</li></ul></div>' +
      '<div class="card"><h2>🔑 The keyword rule (why toppers score more with fewer words)</h2>' +
      '<ul class="tight"><li>Every written answer has <b>N tickable keywords for N marks</b>. The examiner scans; each keyword found = one tick.</li>' +
      '<li>Format that wins: <b>definition/formula first → numbered points (one keyword each) → labelled diagram → one-line conclusion.</b></li>' +
      '<li>Underline the keywords. In numericals: formula → substitution → unit → final statement. Each line can carry a step mark.</li>' +
      '<li>Attempt ALL — choice + step marking mean a structured half-answer still earns 1–2 marks. Blank earns 0.</li></ul></div>' +
      '<div class="grid cols2"><div class="card"><h2>⏰ Time plan (2-hr paper)</h2><ul class="tight"><li>Q1 (10 marks): 20 min</li><li>Q2 (10 marks): 30 min</li><li>Q3 (15 marks): 40 min</li><li>Q4 (5 marks): 15 min</li><li>Revision + underlining: 15 min</li></ul></div>' +
      '<div class="card"><h2>✍️ Presentation = marks</h2><ul class="tight"><li>Draw labelled diagrams in pencil with a ruler.</li><li>Write formula → substitution → unit → final statement in numericals.</li><li>Underline keywords; leave a line between answers.</li><li>Attempt all — step marking rewards honest tries.</li></ul></div></div>' +
      '<div class="card"><h2>🗓 4-week sprint plan</h2><ul class="tight"><li><b>Week 1:</b> Sci-II ch 1–4, one chapter paper each + daily 10 MCQs.</li><li><b>Week 2:</b> Sci-I light/heat/electricity chapter papers + Algebra.</li><li><b>Week 3:</b> History + Geography maps + English writing (1 letter + 1 expansion).</li><li><b>Week 4:</b> 3 full subject papers + only flashcards + formulas.</li></ul></div>';
  }

  /* ============ OFFLINE PRINTABLE CHAPTER TEST (40m) ============
     Fixed board-pattern paper for printing / PDF (Science pattern):
     Q1.A 5 MCQ + Q1.B 5 objective (10m) · Q2.A reasons any 2/3 (4m) ·
     Q2.B any 3/5 (6m) · Q3 any 5/8 (15m) · Q4 any 1/2 (5m).
     Algebra uses its own March-2026 pattern via buildAlgPrintData /
     renderAlgPrintPaper: 4 + 4 + 4 + 8 + 3 + 6 + 8 + 3 = 40.
     Deterministic chapter-first order (no shuffle) so the printed
     paper is stable. */
  function buildPrintData(sid, chid) {
    if (sid === "alg") return buildAlgPrintData(sid, chid);
    var s = subj(sid), m = masteryFor(sid, chid) || { one: [], reasons: [], two: [], three: [], five: [] };
    var chMcq = s.mcq.filter(function (x) { return x.ch === chid; });
    var take = function (a, n) { return a.slice(0, n); };
    var mcq = take(chMcq, 5); // chapter's own MCQs only — every chapter now carries 5+
    var one = take(m.one || [], 5); // chapter's own one-mark answers only
    var rea = take(m.reasons || [], 3);
    var two = take(m.two || [], 5);
    var three = take(m.three || [], 8);
    var five = take(m.five || [], 2);
    if (three.length < 8) {
      var fill3 = s.shortQs.filter(function (x) { return x.ch === chid && x.marks === 3; })
        .filter(function (x) { return three.every(function (t) { return t.q !== x.q; }); })
        .slice(0, 8 - three.length).map(function (x) { return { q: x.q, model: x.model, keys: x.keys }; });
      three = three.concat(fill3);
    }
    return { mcq: mcq, one: one, rea: rea, two: two, three: three, five: five, filled: false };
  }
  /* Deterministic chapter-first Algebra printout (40m, March 2026 pattern):
     Q1.A 4 MCQ + Q1.B 4 + Q2.A any 2/3 activities + Q2.B any 4/5 +
     Q3.A any 1/2 activity + Q3.B any 2/4 + Q4 any 2/3 + Q5 any 1/2. */
  function buildAlgPrintData(sid, chid) {
    var s = subj(sid), m = masteryFor(sid, chid) || { one: [], reasons: [], two: [], three: [], five: [] };
    var acts = window.SSC_ALG_ACT || { two: [], three: [] };
    var chMcq = s.mcq.filter(function (x) { return x.ch === chid; });
    var take = function (a, n) { return a.slice(0, n); };
    var notIn = function (arr, used) { return arr.filter(function (x) { return used.every(function (u) { return u.q !== x.q; }); }); };
    var mcq = take(chMcq, 4);
    var usedMcq = {};
    mcq.forEach(function (q) { usedMcq[q.q] = 1; });
    var one = take(m.one || [], 4);
    if (one.length < 4) {
      one = one.concat(chMcq.filter(function (x) { return !usedMcq[x.q]; }).slice(0, 4 - one.length)
        .map(function (x) { return { q: x.q, model: x.opts[x.ans], keys: [x.opts[x.ans]] }; }));
    }
    var a2Acts = (acts.two || []).filter(function (o) { return o.ch === chid; });
    var a2 = take(a2Acts.concat(notIn(m.two || [], a2Acts)), 3);
    var two = take(notIn(m.two || [], a2), 5);
    var a3Acts = (acts.three || []).filter(function (o) { return o.ch === chid; });
    var a3 = take(a3Acts.concat(notIn(m.three || [], a3Acts)), 2);
    var three = take(notIn(m.three || [], a3), 4);
    var four = take(m.five || [], 2).concat(notIn(m.three || [], three.concat(a3)).slice(0, 1));
    var fiveQ = notIn(m.three || [], three.concat(four).concat(a3)).slice(0, 2);
    return { alg: true, mcq: mcq, one: one, a2: a2, two: two, a3: a3, three: three, four: four, fiveQ: fiveQ };
  }
  function printKeyHtmlAlg(d) {
    var h = '<div class="sq key"><b>ANSWER KEY — teacher copy (do not distribute). Marking = keywords ticked.</b>';
    h += "<div class='stopper'><b>✍️ How a topper writes (board pattern):</b> formula → substitution → answer with statement. In activities, fill <b>every □ box</b> stepwise — each box can carry a step mark. Underline the keywords. Attempt extra — only the best count.</div>";
    h += "<div class='smut'>Q1.A answers:</div><ol>";
    d.mcq.forEach(function (q) { h += "<li>" + MX(q.opts[q.ans]) + " <span class='smut'>— " + MX(q.exp || "") + "</span></li>"; });
    h += "</ol><div class='smut'>Q1.B model answers:</div><ol>";
    d.one.forEach(function (o) { h += "<li>" + kpts(o.model, o.keys) + keyLine(o.keys).replace("<br>", " ") + "</li>"; });
    h += "</ol>";
    h += keySecHtmlAct("Q2.A activities (complete the boxes)", d.a2, 2) + keySecHtml("Q2.B solve", d.two, 2);
    h += keySecHtmlAct("Q3.A activity (complete the boxes)", d.a3, 3) + keySecHtml("Q3.B solve", d.three, 3);
    h += keySecHtml("Q4 solve", d.four, 4) + keySecHtml("Q5 solve", d.fiveQ, 3);
    return h + "</div>";
  }
  function renderAlgPrintPaper(sid, chid, keyChk) {
    var s = subj(sid);
    var c = s.chapters.find(function (x) { return x.id === chid; }) || s.chapters[0];
    var d = buildAlgPrintData(s.id, c.id);
    var host = document.getElementById("printPaper");
    var h = '<div class="noprint prow">' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppKey"' + (keyChk ? " checked" : "") + ' style="transform:scale(1.3);margin-right:6px">Include answer key (teacher copy)</label>' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppCompact" style="transform:scale(1.3);margin-right:6px">Compact print (smaller)</label>' +
      '<span style="flex:1"></span>' +
      '<button class="btn ghost" id="ppClose">← Back to app</button>' +
      '<button class="btn acc" id="ppGo">🖨 Print / save PDF</button></div>';
    h += '<div class="sheet board">' +
      '<div class="bpage qsheet">' + boardHead(s, c, 1);
    h += '<div class="bq"><div class="bqh"><span>Q.1 (A) Choose the correct option and write its alphabet (only the first attempt counts):</span><span class="bm">[4]</span></div><ol class="bnum">';
    d.mcq.forEach(function (q) {
      h += "<li>" + MX(q.q) + "<div class='bopt'>" + q.opts.map(function (o, k) { return "<span>(" + "ABCD"[k] + ") " + MX(o) + "</span>"; }).join("") + "</div></li>";
    });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.1 (B) Solve the following questions:</span><span class="bm">[4]</span></div><ol class="bnum">';
    d.one.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.2 (A) Complete and write any TWO activities from the following:</span><span class="bm">[4]</span></div><ol class="bnum">';
    d.a2.forEach(function (o) { h += "<li>" + activityQ(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.2 (B) Solve any FOUR sub-questions from the following:</span><span class="bm">[8]</span></div><ol class="bnum">';
    d.two.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.3 (A) Complete and write any ONE activity from the following:</span><span class="bm">[3]</span></div><ol class="bnum">';
    d.a3.forEach(function (o) { h += "<li>" + activityQ(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.3 (B) Solve any TWO sub-questions of the following:</span><span class="bm">[6]</span></div><ol class="bnum">';
    d.three.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.4 Solve any TWO sub-questions of the following:</span><span class="bm">[8]</span></div><ol class="bnum">';
    d.four.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.5 Solve any ONE sub-question of the following:</span><span class="bm">[3]</span></div><ol class="bnum">';
    d.fiveQ.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>" + boardFootFlow(s, c) + "</div>";
    h += '<div id="ppKeySec" class="bpage keysheet">' +
      '<div class="bcredit">Designed by <b>SURAJ SINGH SIR</b> &nbsp;·&nbsp; EDUTECH COACHING CLASSES</div>' +
      '<div class="bq"><b>Marks table (for the examiner):</b><table class="st"><tr><th>Q</th><th>Q1.A</th><th>Q1.B</th><th>Q2.A (any 2)</th><th>Q2.B (any 4)</th><th>Q3.A (any 1)</th><th>Q3.B (any 2)</th><th>Q4 (any 2)</th><th>Q5 (any 1)</th><th>Total</th></tr>' +
      "<tr><td><b>Max</b></td><td>4</td><td>4</td><td>4</td><td>8</td><td>3</td><td>6</td><td>8</td><td>3</td><td><b>40</b></td></tr>" +
      "<tr><td><b>Got</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table></div>" +
      printKeyHtmlAlg(d) + "</div>";
    h += '<div class="smut bgen">Generated by ECC Classroom · chapter bank: ' + esc(s.short + ":" + c.id) + " · 100% this-chapter Qs · Algebra board pattern (March 2026).</div></div>";
    host.innerHTML = h;
    stampPages(host);
    host.hidden = false;
    var applyKey = function () {
      var on = document.getElementById("ppKey").checked;
      var kss = host.querySelectorAll(".keysheet");
      for (var ki2 = 0; ki2 < kss.length; ki2++) kss[ki2].style.display = on ? "" : "none";
    };
    document.getElementById("ppKey").onchange = applyKey; applyKey();
    var applyCompact = function () { host.classList.toggle("compact-print", document.getElementById("ppCompact").checked); };
    document.getElementById("ppCompact").onchange = applyCompact; applyCompact();
    document.getElementById("ppClose").onclick = function () { host.hidden = true; host.innerHTML = ""; window.scrollTo({ top: 0 }); };
    document.getElementById("ppGo").onclick = function () { window.print(); };
    armPrintButton(host);
    window.scrollTo({ top: 0 });
    if (host.scrollIntoView) host.scrollIntoView();
  }
  /* Full-syllabus MODEL SET printout (exam-hall paper): renders the live
     M.paper sections (board titles already on them) + teacher key. Works for
     every subject, including Algebra's activity sections. */
  /* Full-syllabus ENGLISH MODEL SET printout: exact official section layout
     (Sections I–VI, Q.1–Q.7), passages/poems as quoted blocks, OR layout
     for any-one-of-two writing tasks, teacher key with raw-format models
     for letters/speeches/stories (format must NOT be bullet-split). */
  function engKeyItems(title, items, marks) {
    var s = "<div class='smut'>" + title + " (" + marks + "m each — tick keywords):</div><ol>";
    items.forEach(function (o) {
      if (o.kind === "mcq") {
        s += "<li>" + MX(o.model) + (o.exp ? " <span class='smut'>— " + MX(o.exp) + "</span>" : "") + "</li>";
      } else if (o.rawKey) {
        s += "<li><div class='rawmod'>" + MX(o.model) + "</div>" + keyLine(o.keys) + "</li>";
      } else {
        s += "<li>" + kpts(o.model, o.keys) + keyLine(o.keys) + "</li>";
      }
    });
    return s + "</ol>";
  }
  function printKeyHtmlEng(p) {
    var byId = {};
    p.sections.forEach(function (sec) { byId[sec.id] = sec; });
    var h = '<div class="sq key"><b>ANSWER KEY — ENGLISH MODEL SET ' + p.model.set + ' (teacher copy, do not distribute). Marking = keywords ticked.</b>';
    h += "<div class='stopper'><b>✍️ How a topper writes (English board pattern):</b> grammar — exact form + full stop. Passages — answer in your own words, one point per mark. Summary — one-third length + title. Writing skills — format first (address, date, subject / headline, greeting, title), then points, then close. Underline key words.</div>";
    h += engKeyItems("Q.1 (A) A1 grammar", byId.g1.items, 1) + engKeyItems("Q.1 (A) A2 grammar", byId.g2.items, 2) + engKeyItems("Q.1 (B) transforms", byId.tr.items, 2);
    h += engKeyItems("Q.2 (A) " + (byId.t1.ptitle || "passage"), byId.t1.items, 2) + engKeyItems("Q.2 (B) " + (byId.t2.ptitle || "passage"), byId.t2.items, 2);
    h += engKeyItems("Q.3 (A) " + (byId.p1.ptitle || "poem"), byId.p1.items, 2) + engKeyItems("Q.3 (B) appreciation", byId.p2.items, 5);
    h += engKeyItems("Q.4 (A) " + (byId.n1.ptitle || "passage"), byId.n1.items, 2) + engKeyItems("Q.4 (B) summary", byId.n2.items, 5);
    h += engKeyItems("Q.5 (A) letters", byId.w1.items, 5) + engKeyItems("Q.6 (A) transfer", byId.w2.items, 5) + engKeyItems("Q.6 (B) speech/views", byId.w3.items, 5);
    h += engKeyItems("Q.7 (A) theme/report", byId.w4.items, 5) + engKeyItems("Q.7 (B) story/experience", byId.w5.items, 5);
    return h + "</div>";
  }
  function renderEngPrintPaper() {
    var s = subj(M.s), p = M.paper, setNo = (p && p.model) ? p.model.set : M.set;
    var byId = {};
    p.sections.forEach(function (sec) { byId[sec.id] = sec; });
    var C = { name: "FULL SYLLABUS · MODEL SET " + setNo };
    var OPT = { time: "Time: 3 Hours", marks: "Max. Marks: 80" };
    var host = document.getElementById("printPaper");
    var h = '<div class="noprint prow">' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppKey" checked style="transform:scale(1.3);margin-right:6px">Include answer key (teacher copy)</label>' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppCompact" style="transform:scale(1.3);margin-right:6px">Compact print (smaller)</label>' +
      '<span style="flex:1"></span>' +
      '<button class="btn ghost" id="ppClose">← Back to app</button>' +
      '<button class="btn acc" id="ppGo">🖨 Print / save PDF</button></div>';
    h += '<div class="sheet board">' +
      '<div class="bpage qsheet">' + boardHead(s, C, OPT);
    var g1 = byId.g1, g2 = byId.g2, tr = byId.tr;
    h += '<div class="bqh"><span>SECTION I: LANGUAGE STUDY</span><span class="bm">[10]</span></div>';
    h += '<div class="bq"><div class="bqh"><span>Q.1 (A) A1. Do as directed (any four):</span><span class="bm">[4]</span></div><ol class="bnum">';
    g1.items.forEach(function (it) { h += "<li>" + MX(it.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.1 (A) A2. Do as directed (any two):</span><span class="bm">[4]</span></div><ol class="bnum">';
    g2.items.forEach(function (it) { h += "<li>" + MX(it.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.1 (B) Do as directed (any one):</span><span class="bm">[2]</span></div>';
    h += '<div class="bopt1"><b>Option 1: </b>' + MX(tr.items[0].q) + "</div>" + '<div class="bor">— OR —</div><div class="bopt1"><b>Option 2: </b>' + MX(tr.items[1].q) + "</div></div>";
    var passBlock = function (sec) {
      var t = '<div class="bq"><div class="bqh"><span>' + esc(sec.title) + '</span><span class="bm">[' + sec.max + "]</span></div>";
      if (sec.ptitle) t += "<div class='smut'><b>" + esc(sec.ptitle) + "</b></div>";
      if (sec.passage) t += "<div class='bpass rawmod'>" + MX(sec.passage) + "</div>";
      t += '<ol class="bnum">';
      sec.items.forEach(function (it) {
        if (it.kind === "mcq") t += "<li>" + MX(it.q) + "<div class='bopt'>" + it.opts.map(function (o, k) { return "<span>(" + "ABCD"[k] + ") " + MX(o) + "</span>"; }).join("") + "</div></li>";
        else t += "<li>" + MX(it.q) + "</li>";
      });
      return t + "</ol></div>";
    };
    h += '<div class="bqh"><span>SECTION II: TEXTUAL PASSAGES (Reading Skills, Vocabulary and Grammar)</span><span class="bm">[20]</span></div>';
    h += passBlock(byId.t1) + passBlock(byId.t2);
    h += '<div class="bqh"><span>SECTION III: POETRY</span><span class="bm">[10]</span></div>';
    h += passBlock(byId.p1) + passBlock(byId.p2);
    h += '<div class="bqh"><span>SECTION IV: NON-TEXTUAL PASSAGE (Reading Skills, Vocabulary, Grammar and Summary)</span><span class="bm">[15]</span></div>';
    h += passBlock(byId.n1);
    h += '<div class="bq"><div class="bqh"><span>Q.4 (B) Summary Writing: write a summary of the passage above and suggest a suitable title.</span><span class="bm">[5]</span></div><ol class="bnum">';
    byId.n2.items.forEach(function (it) { h += "<li>" + MX(it.q) + "</li>"; });
    h += "</ol></div>";
    var orBlock = function (sec, head) {
      var t = '<div class="bq"><div class="bqh"><span>' + head + '</span><span class="bm">[' + sec.max + "]</span></div>";
      t += '<div class="bopt1"><b>Option 1: </b>' + MX(sec.items[0].q) + "</div>" + '<div class="bor">— OR —</div><div class="bopt1"><b>Option 2: </b>' + MX(sec.items[1].q) + "</div>";
      return t + "</div>";
    };
    h += '<div class="bqh"><span>SECTION V: WRITING SKILLS</span><span class="bm">[15]</span></div>';
    h += orBlock(byId.w1, "Q.5 (A) A1 or A2, do any one of the following:");
    h += orBlock(byId.w2, "Q.6 (A) A1 or A2, do any one of the following:");
    h += orBlock(byId.w3, "Q.6 (B) B1 or B2, attempt any one of the following:");
    h += '<div class="bqh"><span>SECTION VI: CREATIVE WRITING</span><span class="bm">[10]</span></div>';
    h += orBlock(byId.w4, "Q.7 (A) A1 or A2, do any one of the following:");
    h += orBlock(byId.w5, "Q.7 (B) B1 or B2, do any one of the following:");
    h += boardFootFlow(s, C) + "</div>";
    h += '<div id="ppKeySec" class="bpage keysheet">' +
      '<div class="bcredit">Designed by <b>SURAJ SINGH SIR</b> &nbsp;·&nbsp; EDUTECH COACHING CLASSES</div>' +
      '<div class="bq"><b>Marks table (for the examiner) — English Model Set ' + setNo + ':</b><table class="st"><tr>' +
      '<th>Q</th>' + p.sections.map(function (sec) { return "<th>" + esc(sec.id.toUpperCase()) + "<br>(max " + sec.max + ")</th>"; }).join("") + '<th>Total</th></tr><tr><td><b>Got</b></td>' +
      p.sections.map(function () { return "<td></td>"; }).join("") + '<td></td></tr></table></div>' +
      printKeyHtmlEng(p) + "</div>";
    h += '<div class="smut bgen">Generated by ECC Classroom · full-syllabus ENGLISH MODEL SET ' + setNo + ' · official 80-mark blueprint (March 2026).</div></div>';
    host.innerHTML = h;
    stampPages(host);
    host.hidden = false;
    var applyKey = function () {
      var on = document.getElementById("ppKey").checked;
      var kss = host.querySelectorAll(".keysheet");
      for (var ki2 = 0; ki2 < kss.length; ki2++) kss[ki2].style.display = on ? "" : "none";
    };
    document.getElementById("ppKey").onchange = applyKey; applyKey();
    var applyCompact = function () { host.classList.toggle("compact-print", document.getElementById("ppCompact").checked); };
    document.getElementById("ppCompact").onchange = applyCompact; applyCompact();
    document.getElementById("ppClose").onclick = function () { host.hidden = true; host.innerHTML = ""; window.scrollTo({ top: 0 }); };
    document.getElementById("ppGo").onclick = function () { window.print(); };
    armPrintButton(host);
    window.scrollTo({ top: 0 });
    if (host.scrollIntoView) host.scrollIntoView();
  }
  function printKeyHtmlModel(p) {
    var h = '<div class="sq key"><b>ANSWER KEY — MODEL SET ' + p.model.set + ' (teacher copy, do not distribute). Marking = keywords ticked.</b>';
    h += "<div class='stopper'><b>✍️ How a topper writes (board pattern):</b> formula → substitution → answer with statement. In activities, fill <b>every □ box</b> stepwise — each box can carry a step mark. Underline the keywords. Attempt extra — only the best count.</div>";
    p.sections.forEach(function (sec) {
      if (sec.id === "mcq") {
        h += "<div class='smut'>" + esc(sec.title) + " — answers:</div><ol>";
        sec.items.forEach(function (it) { h += "<li>" + MX(it.model) + "</li>"; });
        h += "</ol>";
      } else if (sec.items.some(function (it) { return it.box; })) {
        h += keySecHtmlAct(sec.title, sec.items, sec.nominal);
      } else {
        h += keySecHtml(sec.title, sec.items, sec.nominal);
      }
    });
    return h + "</div>";
  }
  function renderModelPrintPaper() {
    var s = subj(M.s), p = M.paper, setNo = (p && p.model) ? p.model.set : M.set;
    var C = { name: "FULL SYLLABUS · MODEL SET " + setNo };
    var host = document.getElementById("printPaper");
    var h = '<div class="noprint prow">' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppKey" checked style="transform:scale(1.3);margin-right:6px">Include answer key (teacher copy)</label>' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppCompact" style="transform:scale(1.3);margin-right:6px">Compact print (smaller)</label>' +
      '<span style="flex:1"></span>' +
      '<button class="btn ghost" id="ppClose">← Back to app</button>' +
      '<button class="btn acc" id="ppGo">🖨 Print / save PDF</button></div>';
    h += '<div class="sheet board">' +
      '<div class="bpage qsheet">' + boardHead(s, C);
    p.sections.forEach(function (sec) {
      h += '<div class="bq"><div class="bqh"><span>' + esc(sec.title) + '</span><span class="bm">[' + sec.max + "]</span></div>";
      if (sec.id === "mcq") {
        h += '<ol class="bnum">';
        sec.items.forEach(function (it) {
          h += "<li>" + MX(it.q) + "<div class='bopt'>" + it.opts.map(function (o, k) { return "<span>(" + "ABCD"[k] + ") " + MX(o) + "</span>"; }).join("") + "</div></li>";
        });
        h += "</ol>";
      } else if (sec.items.length === 2 && sec.need === 1) {
        h += '<div class="bopt1"><b>Option 1: </b>' + (sec.items[0].box ? activityQ(sec.items[0].q) : MX(sec.items[0].q)) + "</div>" +
          '<div class="bor">— OR —</div><div class="bopt1"><b>Option 2: </b>' + (sec.items[1].box ? activityQ(sec.items[1].q) : MX(sec.items[1].q)) + "</div>";
      } else {
        h += '<ol class="bnum">';
        sec.items.forEach(function (it) { h += "<li>" + (it.box ? activityQ(it.q) : MX(it.q)) + (it.stream ? ' <span class="kbd">' + esc(it.stream) + "</span>" : "") + "</li>"; });
        h += "</ol>";
      }
      h += "</div>";
    });
    h += boardFootFlow(s, C) + "</div>";
    h += '<div id="ppKeySec" class="bpage keysheet">' +
      '<div class="bcredit">Designed by <b>SURAJ SINGH SIR</b> &nbsp;·&nbsp; EDUTECH COACHING CLASSES</div>' +
      '<div class="bq"><b>Marks table (for the examiner) — Model Set ' + setNo + ':</b><table class="st"><tr><th>Q</th>' +
      p.sections.map(function (sec) { return "<th>" + esc(sec.id.toUpperCase()) + "<br>(max " + sec.max + ")</th>"; }).join("") +
      '<th>Total</th></tr><tr><td><b>Got</b></td>' +
      p.sections.map(function () { return "<td></td>"; }).join("") +
      '<td></td></tr></table></div>' +
      printKeyHtmlModel(p) + "</div>";
    h += '<div class="smut bgen">Generated by ECC Classroom · full-syllabus MODEL SET ' + setNo + ' · ' + esc(s.short) + " · all chapters.</div></div>";
    host.innerHTML = h;
    stampPages(host);
    host.hidden = false;
    var applyKey = function () {
      var on = document.getElementById("ppKey").checked;
      var kss = host.querySelectorAll(".keysheet");
      for (var ki2 = 0; ki2 < kss.length; ki2++) kss[ki2].style.display = on ? "" : "none";
    };
    document.getElementById("ppKey").onchange = applyKey; applyKey();
    var applyCompact = function () { host.classList.toggle("compact-print", document.getElementById("ppCompact").checked); };
    document.getElementById("ppCompact").onchange = applyCompact; applyCompact();
    document.getElementById("ppClose").onclick = function () { host.hidden = true; host.innerHTML = ""; window.scrollTo({ top: 0 }); };
    document.getElementById("ppGo").onclick = function () { window.print(); };
    armPrintButton(host);
    window.scrollTo({ top: 0 });
    if (host.scrollIntoView) host.scrollIntoView();
  }
  function printQNum(sec, i) { return sec + "." + (i + 1); }
  function armPrintButton(host) {
    var go = host.querySelector("#ppGo");
    if (!go) return;
    var ims = host.querySelectorAll(".wmstamp img");
    var need = ims.length, done = 0;
    if (!need) { go.disabled = false; return; }
    go.disabled = true; var label = go.textContent;
    var tick = function () { if (++done >= need) { go.disabled = false; go.textContent = label; } };
    for (var i = 0; i < ims.length; i++) {
      if (ims[i].complete && ims[i].naturalWidth) tick();
      else { ims[i].addEventListener("load", tick); ims[i].addEventListener("error", tick); }
    }
  }
  /* Board activity-sheet style (matches official practice sheet):
     head + Seat No. + Note, then all Qs in ONE flowing sheet (no forced
     page splits — the browser fills each printed page, so no half-empty
     pages). Teacher key + marks table live AFTER the Qs (toggleable). */
  /* Edutech ownership stamp: one ink-mark overlay per printed page, in front of content. */
  var WM_SRC = "data:image/webp;base64,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";
  /* Preload the stamp at boot so it is cached (and printed) instantly when a paper is opened. */
  try { var _wmPre = new Image(); _wmPre.decoding = "sync"; _wmPre.src = WM_SRC; } catch (e) {}
  function stampPages(host) {
    if (host && !host.querySelector(".wmprint")) host.insertAdjacentHTML("afterbegin", '<div class="wmstamp wmprint" aria-hidden="true"><img src="' + WM_SRC + '" alt=""></div>');
    if (!host || !host.querySelectorAll) return;
    var ps = host.querySelectorAll(".bpage");
    for (var i = 0; i < ps.length; i++) {
      if (!ps[i].querySelector(".wmstamp")) ps[i].insertAdjacentHTML("afterbegin", '<div class="wmstamp" aria-hidden="true"><img src="' + WM_SRC + '" alt=""></div>');
    }
  }
  function subjLine(s) {
    return esc(s.name).toUpperCase().replace(/ [–—-] PART (\d)/, " (PART $1)");
  }
  function chapLine(c) {
    var m = /^(\d+)\.\s*(.*)$/.exec(c.name || "");
    if (m) return "CHAPTER " + m[1] + ": " + m[2].toUpperCase();
    return esc(c.name).toUpperCase();
  }
  function boardHead(s, c, opt) {
    var boxes = "<span class='seats'>" + "<i></i><i></i><i></i><i></i><i></i><i></i>" + "</span>";
    var btime = "Time: 2 Hours", bmarks = "Max. Marks: 40";
    if (opt && typeof opt === "object") {
      if (opt.time) btime = opt.time;
      if (opt.marks) bmarks = opt.marks;
    }
    return '<div class="btop"><span>Code No. __________</span></div>' +
      '<div class="seatline">Seat No. ' + boxes + "</div>" +
      '<div class="bhead"><div class="bh0">ECC CLASSROOM PRACTICE SERIES</div>' +
      '<div class="bh1">SSC BOARD PRACTICE TEST</div>' +
      '<div class="bh2">' + subjLine(s) + "</div>" +
      '<div class="bh3">' + chapLine(c) + "</div>" +
      '<div class="btime"><span>' + btime + "</span><span>" + bmarks + "</span></div></div>" +
      '<div class="bcredit bcredit-head">Designed by <b>SURAJ SINGH SIR</b> &nbsp;·&nbsp; EDUTECH COACHING CLASSES</div>' +
      '<div class="bnote"><b>Note:</b><ol>' +
      "<li>All questions are compulsory.</li>" +
      "<li>Use of a calculator is not allowed.</li>" +
      "<li>The numbers to the right of the questions indicate full marks.</li>" +
      "<li>For each MCQ [Q.1(A)], only the first attempt will be evaluated and given credit.</li>" +
      "<li>Write the correct option alphabet (A, B, C or D) along with the answer for Q.1(A).</li>" +
      "</ol></div>";
  }
  /* Flowing-sheet footer (generic chapters): no "Page X of 3" since the
     questions now flow naturally instead of forced 3 pages. */
  function boardFootFlow(s, c) {
    return '<div class="bfoot">ECC CLASSROOM &nbsp;|&nbsp; ' + esc(s.short.toUpperCase() + " — " + c.name.toUpperCase()) + "</div>" +
      '<div class="bcredit">Designed by <b>SURAJ SINGH SIR</b> &nbsp;·&nbsp; EDUTECH COACHING CLASSES</div>';
  }
  /* Exact board-sheet paper for Science-II Ch 4 (Environmental Management):
     mirrors the official activity-sheet question set (Q1–Q4 + passage Q4).
     Single flowing sheet (was 3 forced pages — the bigger WYSIWYG type made
     fixed pages spill into half-empty pages, so it flows like every chapter). */
  function renderEMSheet(host, keyChk) {
    var h = '<div class="noprint prow">' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppKey"' + (keyChk ? " checked" : "") + ' style="transform:scale(1.3);margin-right:6px">Include answer key (teacher copy)</label>' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppCompact" style="transform:scale(1.3);margin-right:6px">Compact print (smaller)</label>' +
      '<span style="flex:1"></span>' +
      '<button class="btn ghost" id="ppClose">← Back to app</button>' +
      '<button class="btn acc" id="ppGo">🖨 Print / save PDF</button></div>';
    var S = { name: "Science & Technology – Part 2", short: "Sci-II" };
    var C = { name: "4. Environmental Management" };
    var mcq = [
      ["The Red List containing details of threatened species is officially published by __________.", ["UNEP", "IUCN", "WWF", "IPCC"]],
      ["Pink pages in the Red Data Book carry the names of __________ species.", ["Extinct", "Endangered", "Safe", "Endemic"]],
      ["Sacred groves are forest patches conserved in the name of God by __________.", ["Forest Department", "Local Tribals / Society", "Municipal Body", "Central Government"]],
      ["The Wildlife Protection Act in India was enacted in the year __________.", ["1972", "1980", "1986", "2010"]],
      ["Which of the following is a man-made factor affecting environmental balance?", ["Earthquake", "Deforestation", "Tsunami", "Volcanic Eruption"]]
    ];
    h += '<div class="sheet board">';
    // ---------- flowing question sheet (header once, then all Qs) ----------
    h += '<div class="bpage qsheet">' + boardHead(S, C, 1);
    h += '<div class="bq"><div class="bqh"><span>Q.1 (A) Choose the correct option and write its alphabet:</span><span class="bm">[5]</span></div><ol class="bnum">';
    mcq.forEach(function (m) {
      h += "<li>" + m[0] + "<div class='bopt'>" + m[1].map(function (o, k) { return "<span>(" + "ABCD"[k] + ") " + o + "</span>"; }).join("") + "</div></li>";
    });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.1 (B) Solve the following questions:</span><span class="bm">[5]</span></div><ol class="bnum">' +
      "<li>Find the odd one out: Dodo, Giant Squirrel, Malabar Pied Hornbill, Lesser Florican.</li>" +
      "<li>Complete the correlation: Kaziranga National Park : Rhinoceros :: Manas Sanctuary : _______________.</li>" +
      "<li>State True or False: Radioactive radiations and X-rays are natural physical factors affecting the environment.</li>" +
      "<li>Reorganize to form a valid food chain: Frog → Grasshopper → Eagle → Paddy Field → Snake.</li>" +
      "<li>Name the following: Person popularly honored as the 'Forest Man of India'.</li>" +
      "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.2 (A) Give scientific reasons (Attempt ANY 2):</span><span class="bm">[4]</span></div><ol class="bnum">' +
      "<li>Sacred groves play a vital role in conserving biodiversity and protecting rare plant species.</li>" +
      "<li>Human beings hold a crucial and responsible position in maintaining environmental balance.</li>" +
      "<li>Controlling environmental pollution is effective and essential for overall environmental management.</li>" +
      "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.2 (B) Answer the following questions (Attempt ANY 3):</span><span class="bm">[6]</span></div><ol class="bnum">' +
      "<li>Distinguish between: Natural Environment and Artificial (Man-made) Environment (2 points each).</li>" +
      "<li>State any two Indian Environmental Protection Laws along with their specific enactment years.</li>" +
      "<li>Define the following terms:<ol class='bsub' type='a'><li>Ecosystem</li><li>Environmental Pollution</li></ol></li>" +
      "<li>Write two physical factors and two chemical factors that directly affect an ecosystem.</li>" +
      "<li>Mention two key environmental values we learn from the life and mission of Jadav Molai Payeng.</li>" +
      "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.3 Answer the following questions (Attempt ANY 5):</span><span class="bm">[15]</span></div><ol class="bnum">' +
      "<li>Complete the following concept diagram showing factors affecting environment:<div class='cmap'><div class='cbox ctop'>Factors affecting environment</div><div class='cfork'></div><div class='crow'><div class='ccol'><div class='cbox'>Natural Factors</div><div class='cblank'>e.g. Earthquakes, ................</div></div><div class='ccol'><div class='cbox'>Man-made Factors</div><div class='cblank'>e.g. Deforestation, ................</div></div></div></div></li>" +
      "<li>Explain the significance of the quote: “We have received this Earth on lease from our future generations and not as ancestral property from our ancestors.”</li>" +
      "<li>Write a short note on the Chipko Movement <b>or</b> Bishnoi Movement highlighting their role in forest conservation.</li>" +
      "<li>State any three distinct roles an individual can play for environmental protection (e.g., Prevention, Control, Awareness).</li>" +
      "<li>What are biodiversity hotspots? Name two biodiversity hotspots located in India.</li>" +
      "<li>Observe the paddy field food chain (Paddy Field → Grasshopper → Frog → Snake → Eagle) and answer:<ol class='bsub' type='a'><li>What will happen to the frog population if grasshoppers are destroyed by excessive pesticides?</li><li>Which trophic consumer level is represented by the snake?</li><li>What overall impact will a sudden decline in frogs have on the crop yield?</li></ol></li>";
    h += "<li>Complete the missing entries in the table regarding threatened species:<table class='st btab'><tr><th>Category of Threatened Species</th><th>Example Species</th></tr><tr><td>i. Endangered Species</td><td>_______________</td></tr><tr><td>ii. Rare Species</td><td>_______________</td></tr><tr><td>iii. Vulnerable Species</td><td>_______________</td></tr></table></li>" +
      "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.4 Answer ANY ONE of the following questions:</span><span class="bm">[5]</span></div>' +
      "<div class='bopt1'><b>Option 1:</b> Read the passage given below and answer the sub-questions:</div>" +
      "<div class='bpass'>“Jadav Molai Payeng is an environmental activist from Assam. Born in 1951, he worked as a forest worker from a young age. After severe floods in the Brahmaputra river caused large-scale death of snakes on sandbars, Payeng started planting bamboo saplings to provide shade and shelter. In 1979, the local Social Forestry Department initiated a tree plantation scheme on 200 hectares of land. Payeng worked continuously on the project even after its completion. Through 30 years of unflagging effort, he single-handedly transformed a barren sandbar of 1,360 acres into a lush sanctuary known today as 'Molai Jungle'. Recognizing his selfless contribution, the Government of India honored him with the prestigious 'Padma Shri' award.”</div>" +
      "<ol class='bnum bsub1'>" +
      "<li>Why did Jadav Molai Payeng initially start planting bamboo saplings? (1M)</li>" +
      "<li>What is the total area of the forest developed through Payeng's individual efforts? (1M)</li>" +
      "<li>Which national civilian honor was conferred upon Jadav Molai Payeng? (1M)</li>" +
      "<li>What core message or value does Payeng's life demonstrate to society? (1M)</li>" +
      "<li>Name two wild animals that have inhabited 'Molai Jungle'. (1M)</li></ol>" +
      '<div class="bor">— OR —</div>' +
      "<div class='bopt1'><b>Option 2:</b> Answer the following questions on environmental management:</div>" +
      "<ol class='bnum bsub1'>" +
      "<li>Define environmental pollution and name two major types of pollution. (1M)</li>" +
      "<li>Explain the importance of public participation in environmental protection. (1M)</li>" +
      "<li>State two major harmful impacts of radioactive pollution on living organisms. (1M)</li>" +
      "<li>Why is conservation of biodiversity necessary for ecological stability? (1M)</li>" +
      "<li>Mention two practical steps students can take to protect local flora and fauna. (1M)</li></ol></div>" +
      boardFootFlow(S, C) + "</div>";
    // ---------- teacher section (own sheet) ----------
    h += '<div id="ppKeySec" class="bpage keysheet">' +
      '<div class="bcredit">Designed by <b>SURAJ SINGH SIR</b> &nbsp;·&nbsp; EDUTECH COACHING CLASSES</div>' +
      '<div class="bq"><b>Marks table (for the examiner):</b><table class="st"><tr><th>Q</th><th>Q1.A</th><th>Q1.B</th><th>Q2.A (any 2)</th><th>Q2.B (any 3)</th><th>Q3 (any 5)</th><th>Q4 (any 1)</th><th>Total</th></tr>' +
      "<tr><td><b>Max</b></td><td>5</td><td>5</td><td>4</td><td>6</td><td>15</td><td>5</td><td><b>40</b></td></tr>" +
      "<tr><td><b>Got</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table></div>" +
      '<div class="sq key"><b>ANSWER KEY — teacher copy (do not distribute). Marking = keywords ticked.</b>' +
      "<div class='stopper'><b>✍️ How a topper writes (board pattern):</b> open with a 1-line definition → write <b>one full sentence per mark</b>, linked with because / so / therefore → close with <b>Hence, …</b> restating the answer. Underline the keywords. One extra point as insurance.</div>" +
      "<div class='smut'>Q1.A answers:</div><ol>" +
      "<li><b>(B) IUCN</b> <span class='smut'>— Red List publisher; pink pages = endangered, green = now safe.</span></li>" +
      "<li><b>(B) Endangered</b> <span class='smut'>— pink pages carry endangered species names.</span></li>" +
      "<li><b>(B) Local Tribals / Society</b> <span class='smut'>— 13,000+ god-named forests, society-conserved.</span></li>" +
      "<li><b>(A) 1972</b> <span class='smut'>— Wildlife Protection Act 1972 (Forest Act 1980, Environment Act 1986).</span></li>" +
      "<li><b>(B) Deforestation</b> <span class='smut'>— man-made; earthquake/tsunami/volcano are natural.</span></li></ol>" +
      "<div class='smut'>Q1.B model answers (one complete sentence each):</div><ol>" +
      "<li>The odd one out is the <b>Dodo</b>, because it is an <b>extinct</b> bird, while the Giant Squirrel, Malabar Pied Hornbill and Lesser Florican are all <b>living threatened species of India</b>. <span class='smut'>🔑 extinct vs living</span></li>" +
      "<li><b>Manas Sanctuary : Tiger.</b> Kaziranga is famous for the <b>one-horned rhinoceros</b>, and similarly Manas is famous for the <b>Royal Bengal tiger</b>, so the tiger completes the correlation. <span class='smut'>🔑 Manas : Tiger</span></li>" +
      "<li><b>False.</b> <b>UV and IR radiations are natural</b> radiations, whereas <b>X-rays and atomic-plant radiations are artificial</b> radiations. <span class='smut'>🔑 X-rays artificial (textbook p.40)</span></li>" +
      "<li><b>Paddy Field → Grasshopper → Frog → Snake → Eagle.</b> In the paddy agro-ecosystem the grasshopper feeds on paddy, the frog feeds on the grasshopper, the snake feeds on the frog and the eagle preys on the snake. <span class='smut'>🔑 paddy agro-ecosystem order</span></li>" +
      "<li><b>Jadav Molai Payeng,</b> who <b>single-handedly planted the 1360-acre Molai Jungle</b> in Assam over 30 years and was honoured with the <b>Padmashree</b>. <span class='smut'>🔑 Payeng · 1360 acres · Padmashree</span></li></ol>" +
      "<div class='smut'>Q2.A reasons (2m each — one bullet per tick):</div><ol>" +
      "<li><ul class='kpts'><li><b>Sacred groves</b> are forest patches <b>conserved in the name of God</b>, so they receive special protection from <b>society rather than the government</b>.</li><li>Because of this religious protection, human interference inside groves is minimum.</li><li>They therefore shelter many <b>rare and endemic species</b> like mini-sanctuaries.</li><li><b>Hence</b> sacred groves play a vital role in conserving biodiversity.</li></ul></li>" +
      "<li><ul class='kpts'><li><b>Human life is an integral part of nature</b> and human survival is closely linked with the environment.</li><li>Due to <b>population explosion and industrialization</b>, humans have over-utilised natural resources and <b>disturbed the environmental balance</b>.</li><li>At the same time only human beings, with intelligence, laws and movements, can <b>conserve and improve nature</b>.</li><li><b>Hence</b> human beings hold a crucial and responsible position in maintaining environmental balance.</li></ul></li>" +
      "<li><ul class='kpts'><li><b>Pollution is the root cause of environmental imbalance</b>, as air, water and soil pollution harm living organisms and damage biodiversity.</li><li>When pollution is <b>controlled, natural cycles and food chains function properly</b> and the balance is restored.</li><li>Without pollution control, all other conservation efforts fail.</li><li><b>Hence</b> controlling pollution is effective and essential for environmental management.</li></ul></li></ol>" +
      "<div class='smut'>Q2.B short (2m each — one bullet per tick):</div><ol>" +
      "<li><ul class='kpts'><li>The <b>natural environment</b> (air, water, land, forests, wildlife) is <b>formed by nature without human intervention</b>, whereas the <b>artificial environment</b> (cities, farms, dams, industries) is <b>created by human beings</b>.</li><li>Natural factors act in <b>sudden episodes or natural cycles</b>, whereas man-made factors act <b>continuously and accumulate</b> over time.</li><li>Ecosystems can usually <b>recover gradually</b> from natural disturbances, whereas man-made damage is often <b>long-lasting and difficult to reverse</b>.</li><li>Natural factors <b>cannot be prevented</b> (only mitigated through disaster management), whereas man-made factors <b>can be controlled and prevented</b> through laws and conservation.</li></ul></li>" +
      "<li><ul class='kpts'><li>The <b>Forest (Conservation) Act was passed in 1980</b>; forest land cannot be used for non-forest purposes <b>without central permission</b>.</li><li>The <b>Environment (Protection) Act was passed in 1986</b>; releasing pollutants beyond prescribed limits is punishable with <b>imprisonment up to five years or a fine up to one lakh rupees</b>.</li></ul></li>" +
      "<li>(a) An <b>ecosystem is formed by biotic and abiotic factors and their interactions</b> with each other in a <b>definite geographical area</b>; a small pond is an ecosystem and the Earth is the largest ecosystem. (b) <b>Environmental pollution is an undesirable change</b> in the surroundings caused by pollutants, which <b>harms living organisms and disturbs the environmental balance</b>.</li>" +
      "<li><ul class='kpts'><li>Two <b>physical factors</b> are <b>sunlight and temperature</b>, which control the growth and activities of organisms.</li><li>Two <b>chemical factors</b> are <b>gases like oxygen and carbon dioxide</b> in the air, and <b>minerals and salts</b> dissolved in soil and water.</li></ul></li>" +
      "<li><ul class='kpts'><li>From Payeng's life we learn that a <b>single determined person can create a forest</b> — he transformed a barren sandbar into the <b>1360-acre Molai Jungle</b> through 30 years of planting and care.</li><li>We also learn the values of <b>positive attitude and love for nature</b>, <b>hard work with patience</b>, and dedication to future generations, for which he was honoured with the <b>Padmashree</b>.</li></ul></li></ol>" +
      "<div class='smut'>Q3 semi-long (3m each — one bullet per tick):</div><ol>" +
      "<li><ul class='kpts'><li><b>Natural factors</b> (earthquakes, floods, volcanoes, droughts) act through <b>inherent earthly phenomena without human intervention</b>.</li><li><b>Man-made factors</b> (deforestation, industrialisation, pollution, unplanned urbanisation) act <b>continuously through human activities</b>.</li><li>The environmental balance is still maintained through the <b>continuous operation of natural cycles and food chains</b>.</li></ul></li>" +
      "<li><ul class='kpts'><li>This quote means that the <b>Earth is not our ancestral property</b> to exploit, but is <b>borrowed on lease from our future generations</b>.</li><li>Therefore we must use natural resources <b>judiciously and sustainably</b>, satisfying everyone's need but not greed.</li><li>Conservation of the environment is thus our <b>duty towards ourselves and the generations to come</b>.</li></ul></li>" +
      "<li><ul class='kpts'><li>The <b>Chipko movement began in 1973</b>, when trees in the Himalayan foothills were to be cut down for commercial purposes.</li><li><b>Chandiprasad Bhatt and Sunderlal Bahuguna</b> started a movement to prevent this felling.</li><li>Women in large numbers <b>protected each tree by embracing it</b> — holding hands and encircling the trees — so the movement came to be called Chipko.</li><li>It showed that a <b>determined public movement is the strongest tool of forest conservation</b> (in the same spirit, the Bishnoi community of Khejarli had earlier sacrificed lives hugging trees).</li></ul></li>" +
      "<li><ul class='kpts'><li>For <b>prevention</b>: avoid plastic, save water and use only the required quantity of natural resources.</li><li>For <b>control</b>: stop harmful activities like throwing garbage in public places, and take part in plantation and cleanliness drives.</li><li>For <b>awareness</b>: educate family and friends about conservation and participate in environmental activities.</li></ul></li>" +
      "<li><ul class='kpts'><li><b>Biodiversity hotspots</b> are regions with <b>rich endemic biodiversity that face severe threat</b> and need urgent conservation.</li><li>Two hotspots located in India are the <b>Western Ghats</b> and the <b>Eastern Himalaya</b>.</li></ul></li>" +
      "<li>(a) Frogs feed on grasshoppers, so if grasshoppers are destroyed, <b>frogs will lose their food and the frog population will decline</b>. (b) The snake is the <b>tertiary (third-order) consumer</b>, feeding on the secondary consumer frog. (c) With fewer frogs, <b>grasshoppers will multiply unchecked and destroy more paddy, so the crop yield will fall</b>.</li>" +
      "<li><ul class='kpts'><li><b>Endangered species</b> are those whose number has declined or habitat shrunk so much that they <b>may become extinct soon</b> if not protected.</li><li>Example: <b>lion-tailed monkey</b>.</li><li><b>Rare species</b> are <b>very uncommon and rarely encountered</b> and may vanish fast.</li><li>Example: <b>red panda</b>.</li><li><b>Vulnerable species</b> are <b>declining continuously</b> and need protection.</li><li>Example: <b>tiger</b>.</li></ul></li></ol>" +
      "<div class='smut'>Q4 (5 × 1m — one complete sentence per mark):</div><ol>" +
      "<li><b>Option 1:</b> (1) After severe Brahmaputra floods killed large numbers of snakes on the sandbars, Payeng planted bamboo saplings <b>to give them shade and shelter</b>. (2) Through 30 years of work he developed <b>1,360 acres</b> of forest, known today as <b>Molai Jungle</b>. (3) The Government of India conferred the <b>Padma Shri</b> on him. (4) His life shows that <b>a single determined person can establish a forest</b>, and teaches dedication, love for nature and responsibility towards future generations. (5) <b>Royal Bengal tigers and one-horned rhinoceros</b> (along with elephants and deer) inhabit Molai Jungle.</li>" +
      "<li><b>Option 2:</b> (1) <b>Environmental pollution is an undesirable change</b> in the surroundings caused by pollutants; two major types are <b>air pollution and water pollution</b>. (2) Environmental problems can be solved only when protection becomes an <b>effective public movement</b>, so <b>large-scale participation of the people</b> is essential for conservation. (3) Any two: <b>cancerous ulceration</b> occurs due to high X-ray radiations; <b>body tissues are destroyed</b>; <b>genetic changes</b> occur; <b>vision is adversely affected</b>. (4) Biodiversity keeps <b>food chains, natural cycles and ecosystem stability</b> working, and its loss collapses ecosystems, so its <b>conservation is necessary for ecological stability</b>. (5) Any two: <b>plant and care for trees</b>; protect local animals and birds; <b>follow refuse-reduce-reuse-recycle</b>; spread awareness about conservation.</li></ol>" +
      "</div></div>";
    h += '<div class="smut bgen">Generated by ECC Classroom · Sci-II Ch 4 · mirrors the board activity-sheet pattern.</div></div>';
    host.innerHTML = h;
    stampPages(host);
    host.hidden = false;
    var applyKey = function () {
      var on = document.getElementById("ppKey").checked;
      var kss = host.querySelectorAll(".keysheet");
      for (var ki2 = 0; ki2 < kss.length; ki2++) kss[ki2].style.display = on ? "" : "none";
    };
    document.getElementById("ppKey").onchange = applyKey; applyKey();
    var applyCompact = function () { host.classList.toggle("compact-print", document.getElementById("ppCompact").checked); };
    document.getElementById("ppCompact").onchange = applyCompact; applyCompact();
    document.getElementById("ppClose").onclick = function () { host.hidden = true; host.innerHTML = ""; window.scrollTo({ top: 0 }); };
    document.getElementById("ppGo").onclick = function () { window.print(); };
    armPrintButton(host);
    window.scrollTo({ top: 0 });
    if (host.scrollIntoView) host.scrollIntoView();
  }
  function renderPrintPaper(sid, chid, withKey) {
    var host0 = document.getElementById("printPaper");
    var keyChk0 = withKey === undefined ? true : !!withKey;
    if (sid === "sci2" && chid === "em") { renderEMSheet(host0, keyChk0); return; }
    if (sid === "alg") { renderAlgPrintPaper(sid, chid, keyChk0); return; }
    var s = subj(sid);
    var c = s.chapters.find(function (x) { return x.id === chid; }) || s.chapters[0];
    var d = buildPrintData(s.id, c.id);
    var host = document.getElementById("printPaper");
    var keyChk = withKey === undefined ? true : !!withKey;
    var sciPaper = (sid === "sci1" || sid === "sci2");
    var reaHead = sciPaper ? "Q.2 (A) Give scientific reasons (Attempt ANY 2):" : "Q.2 (A) Answer the following questions (Attempt ANY 2):";
    var h = '<div class="noprint prow">' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppKey"' + (keyChk ? " checked" : "") + ' style="transform:scale(1.3);margin-right:6px">Include answer key (teacher copy)</label>' +
      '<label style="font-size:13px;font-weight:700"><input type="checkbox" id="ppCompact" style="transform:scale(1.3);margin-right:6px">Compact print (smaller)</label>' +
      '<span style="flex:1"></span>' +
      '<button class="btn ghost" id="ppClose">← Back to app</button>' +
      '<button class="btn acc" id="ppGo">🖨 Print / save PDF</button></div>';
    // ---- questions: ONE flowing sheet (no forced page splits, so no
    // half-empty pages — the browser fills each printed page naturally) ----
    h += '<div class="sheet board">' +
      '<div class="bpage qsheet">' + boardHead(s, c, 1);
    h += '<div class="bq"><div class="bqh"><span>Q.1 (A) Choose the correct option and write its alphabet:</span><span class="bm">[5]</span></div><ol class="bnum">';
    d.mcq.forEach(function (q) {
      h += "<li>" + MX(q.q) + "<div class='bopt'>" + q.opts.map(function (o, k) { return "<span>(" + "ABCD"[k] + ") " + MX(o) + "</span>"; }).join("") + "</div></li>";
    });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.1 (B) Solve the following questions:</span><span class="bm">[5]</span></div><ol class="bnum">';
    d.one.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>' + reaHead + '</span><span class="bm">[4]</span></div><ol class="bnum">';
    d.rea.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.2 (B) Answer the following questions (Attempt ANY 3):</span><span class="bm">[6]</span></div><ol class="bnum">';
    d.two.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.3 Answer the following questions (Attempt ANY 5):</span><span class="bm">[15]</span></div><ol class="bnum">';
    d.three.forEach(function (o) { h += "<li>" + MX(o.q) + "</li>"; });
    h += "</ol></div>";
    h += '<div class="bq"><div class="bqh"><span>Q.4 Answer ANY ONE of the following questions:</span><span class="bm">[5]</span></div>';
    if (d.five[0]) h += '<div class="bopt1"><b>Option 1: </b>' + MX(d.five[0].q) + "</div>";
    if (d.five[1]) h += '<div class="bor">— OR —</div><div class="bopt1"><b>Option 2: </b>' + MX(d.five[1].q) + "</div>";
    h += "</div>" + boardFootFlow(s, c) + "</div>";
    // Teacher section (key + examiner table) — own sheet, hidden for student printouts
    h += '<div id="ppKeySec" class="bpage keysheet">' +
      '<div class="bcredit">Designed by <b>SURAJ SINGH SIR</b> &nbsp;·&nbsp; EDUTECH COACHING CLASSES</div>' +
      '<div class="bq"><b>Marks table (for the examiner):</b><table class="st"><tr><th>Q</th><th>Q1.A</th><th>Q1.B</th><th>Q2.A (any 2)</th><th>Q2.B (any 3)</th><th>Q3 (any 5)</th><th>Q4 (any 1)</th><th>Total</th></tr>' +
      "<tr><td><b>Max</b></td><td>5</td><td>5</td><td>4</td><td>6</td><td>15</td><td>5</td><td><b>40</b></td></tr>" +
      "<tr><td><b>Got</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table></div>" +
      printKeyHtml(d) + "</div>";
    h += '<div class="smut bgen">Generated by ECC Classroom · chapter bank: ' + esc(s.short + ":" + c.id) + " · 100% this-chapter Qs.</div></div>";
    host.innerHTML = h;
    stampPages(host);
    host.hidden = false;
    var applyKey = function () {
      var on = document.getElementById("ppKey").checked;
      var kss = host.querySelectorAll(".keysheet");
      for (var ki2 = 0; ki2 < kss.length; ki2++) kss[ki2].style.display = on ? "" : "none";
    };
    document.getElementById("ppKey").onchange = applyKey; applyKey();
    var applyCompact = function () { host.classList.toggle("compact-print", document.getElementById("ppCompact").checked); };
    document.getElementById("ppCompact").onchange = applyCompact; applyCompact();
    document.getElementById("ppClose").onclick = function () { host.hidden = true; host.innerHTML = ""; window.scrollTo({ top: 0 }); };
    document.getElementById("ppGo").onclick = function () { window.print(); };
    armPrintButton(host);
    window.scrollTo({ top: 0 });
    if (host.scrollIntoView) host.scrollIntoView();
  }
  /* boldKeys: model answer with examiner keywords bolded + KaTeX maths.
     kpts: same, split one bullet per sentence (board: one tick per sentence).
     Both take RAW model + keys (not pre-escaped HTML). */
  function boldKeys(model, keys) { return MX(markKeys(model || "", keys)); }
  function kpts(model, keys) {
    var marked = markKeys(model || "", keys);
    var parts = String(marked).split(/(?<=\.)\s+(?=[A-Z(0-9"“])/);
    if (parts.length < 2) return MX(marked);
    return "<ul class='kpts'><li>" + parts.map(function (p) { return MX(p); }).join("</li><li>") + "</li></ul>";
  }
  function keyLine(keys) {
    if (!keys || !keys.length) return "";
    return "<br><span class='smut'>🔑 " + keys.map(function (k) { return MX(k); }).join(" · ") + "</span>";
  }
  /* fillBoxes: render an activity stem with every □ replaced by its
     answer in a green box (used in the mock reveal + teacher key, so an
     activity is never "only blank boxes" once revealed). Falls back to
     plain MX when no box answers exist (regular solve-type Qs). */
  /* activityQ: activity stems render with REAL board-style answer boxes
     (empty bordered squares) instead of the □ glyph — like the printed
     SSC board paper. Used for question display; the key uses fillBoxes. */
  /* renderActivity: activity stems with REAL board-style boxes. A □ standing
     alone renders as an empty bordered box; a □ glued to a slash renders as
     a STACKED box-fraction exactly like the SSC sheet (□/6 = box over 6,
     □/□ = box over box, Σxᵢfᵢ/□ = expression over box). `filled`+`box`
     fills the boxes (teacher key / mock reveal), otherwise they stay empty
     (question side). Box order follows the bank's box[] array. */
  var TOKLEAD = /^[A-Za-z0-9()\u2070-\u209F\u00B2\u00B3\u00B9\u0391-\u03C9\u2212%.]+/;
  var TOKTRAIL = /([^\s=+\-×÷∴∵*,;\/]*[A-Za-z0-9\u2070-\u209F\u00B2\u00B3\u00B9\u0391-\u03C9][^\s=+\-×÷∴∵*,;\/]*)\s*\/$/;
  function renderActivity(q, box, filled) {
    if (String(q).indexOf("□") < 0) return MX(q);
    var texts = String(q).split("□"), n = texts.length - 1, k = 0, i = 0, out = "";
    var val = function (j) { return (box && j < box.length) ? box[j] : "?"; };
    var sbox = "<span class='qbox'></span>";
    var fbox = function (j) { return "<span class='fillbox'>" + MX(val(j)) + "</span>"; };
    var bx = function (j) { return filled ? fbox(j) : sbox; };
    var frac = function (num, den) { return "<span class='qfrac'><span class='qfnum'>" + num + "</span><span class='qfden'>" + den + "</span></span>"; };
    while (k < n) {
      var Tprev = texts[i], Tnext = (i + 1 < texts.length) ? texts[i + 1] : "";
      if (/^\s*\/\s*$/.test(Tnext) && k + 1 < n) {
        out += MX(Tprev) + frac(bx(k), bx(k + 1));
        k += 2; i += 2; continue;
      }
      var lead = Tnext.replace(/^\s+/, "");
      if (lead.charAt(0) === "/") {
        var after = lead.slice(1).replace(/^\s+/, "");
        var tm = TOKLEAD.exec(after);
        if (tm && /[A-Za-z0-9\u0391-\u03C9]/.test(tm[0])) {
          out += MX(Tprev) + frac(bx(k), MX(tm[0]));
          texts[i + 1] = after.slice(tm[0].length);
          k += 1; i += 1; continue;
        }
      }
      var te = Tprev.replace(/\s+$/, "");
      if (te.charAt(te.length - 1) === "/") {
        var bm = TOKTRAIL.exec(te);
        if (bm) {
          out += MX(te.slice(0, te.length - bm[0].length)) + frac(MX(bm[1]), bx(k));
          k += 1; i += 1; continue;
        }
      }
      out += MX(Tprev) + bx(k);
      k += 1; i += 1; continue;
    }
    out += MX(texts[i] || "");
    return out;
  }
  function activityQ(q) { return renderActivity(q, null, false); }
  function fillBoxes(q, box) { return renderActivity(q, box, true); }
  function keySecHtmlAct(title, arr, marks) {
    var s = "<div class='smut'>" + title + " (" + marks + "m each — filled boxes + model, tick keywords):</div><ol>";
    arr.forEach(function (o) { s += "<li>" + (o.box ? "<div class='fact'><b>✅ Filled activity:</b> " + fillBoxes(o.q, o.box) + "</div>" : MX(o.q)) + kpts(o.model, o.keys) + keyLine(o.keys) + "</li>"; });
    return s + "</ol>";
  }
  function keySecHtml(title, arr, marks) {
    var s = "<div class='smut'>" + title + " (" + marks + "m each — tick keywords):</div><ol>";
    arr.forEach(function (o) { s += "<li>" + kpts(o.model, o.keys) + keyLine(o.keys) + "</li>"; });
    return s + "</ol>";
  }
  function printKeyPages(d) {
    return [printKeyHtml(d)];
  }
  function printKeyHtml(d) {
    var h = '<div class="sq key"><b>ANSWER KEY — teacher copy (do not distribute). Marking = keywords ticked.</b>';
    h += "<div class='stopper'><b>✍️ How a topper writes (board pattern):</b> open with a 1-line definition → write <b>one full sentence per mark</b>, linked with because / so / therefore → close with <b>Hence, …</b> restating the answer. Underline the keywords. Always write <b>one extra point as insurance</b> — only the best count, capped at max.</div>";
    h += "<div class='smut'>Q1.A answers:</div><ol>";
    d.mcq.forEach(function (q) { h += "<li>" + MX(q.opts[q.ans]) + " <span class='smut'>— " + MX(q.exp || "") + "</span></li>"; });
    h += "</ol><div class='smut'>Q1.B model answers:</div><ol>";
    d.one.forEach(function (o) { h += "<li>" + kpts(o.model, o.keys) + keyLine(o.keys).replace("<br>", " ") + "</li>"; });
    h += "</ol>";
    h += keySecHtml("Q2.A reasons", d.rea, 2) + keySecHtml("Q2.B short", d.two, 2);
    h += keySecHtml("Q3 semi-long", d.three, 3) + keySecHtml("Q4 long", d.five, 5);
    return h + "</div>";
  }

  /* ---------- boot ---------- */
  paintTop(); touchDay(); paintTop();
  renderDash(); renderLearn(); renderPractice(); renderMock(); renderFlash(); renderForm(); renderPapers();
})();
