/* Fimex prototype — small UI helpers (no framework, no network). */
(function () {
  var FX = {};

  FX.q = function (sel, root) { return (root || document).querySelector(sel); };
  FX.qa = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  FX.on = function (el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts); };
  FX.delegate = function (root, sel, ev, fn) {
    FX.on(root, ev, function (e) {
      var t = e.target.closest(sel);
      if (t && root.contains(t)) fn(e, t);
    });
  };
  FX.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  FX.money = function (n, prefix) {
    var v = Math.round(Number(n) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return prefix ? prefix + v : v;
  };
  FX.num = FX.money;
  FX.pct = function (n) { return (Math.round((Number(n) || 0) * 1000) / 10) + '%'; };
  FX.money2 = function (n) {
    return (Number(n) || 0).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  FX.date = function (y, m, d) {
    var mm = m < 10 ? '0' + m : '' + m, dd = d < 10 ? '0' + d : '' + d;
    return dd + '.' + mm + '.' + y;
  };
  FX.uid = function (p) { return (p || 'id') + '-' + Math.random().toString(36).slice(2, 8); };
  FX.initials = function (name) {
    return String(name || '').trim().split(/\s+/).slice(0, 2).map(function (x) { return x[0] || ''; }).join('').toUpperCase();
  };
  FX.by = function (arr, key, val) {
    for (var i = 0; i < (arr || []).length; i++) if (arr[i][key] === val) return arr[i];
    return null;
  };

  /* toast */
  FX.toast = function (msg, type, ms) {
    var host = FX.q('.toast-host');
    if (!host) { host = document.createElement('div'); host.className = 'toast-host'; document.body.appendChild(host); }
    var el = document.createElement('div');
    el.className = 'toast' + (type ? ' ' + type : '');
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () {
      el.style.transition = 'opacity .2s ease, transform .2s ease';
      el.style.opacity = '0'; el.style.transform = 'translateY(6px)';
      setTimeout(function () { el.remove(); }, 220);
    }, ms || 2400);
  };

  /* modal / drawer */
  FX.modal = function (id) { var el = document.getElementById(id); if (el) el.hidden = false; };
  FX.closeModal = function (id) {
    var el = id ? document.getElementById(id) : null;
    if (el) { el.hidden = true; return; }
    FX.qa('.modal-backdrop:not([hidden])').forEach(function (x) { x.hidden = true; });
  };
  FX.drawer = function (id) { var el = document.getElementById(id); if (el) el.hidden = false; };
  FX.closeDrawer = function (id) {
    var el = id ? document.getElementById(id) : null;
    if (el) { el.hidden = true; return; }
    FX.qa('.drawer-backdrop:not([hidden])').forEach(function (x) { x.hidden = true; });
  };
  /* click on backdrop / [data-close] closes; Esc closes topmost */
  FX.on(document, 'click', function (e) {
    if (e.target.classList && e.target.classList.contains('modal-backdrop')) e.target.hidden = true;
    if (e.target.classList && e.target.classList.contains('drawer-backdrop') && e.target.dataset.static !== '1') e.target.hidden = true;
    var closer = e.target.closest && e.target.closest('[data-close]');
    if (closer) {
      var host = closer.closest('.modal-backdrop, .drawer-backdrop');
      if (host) host.hidden = true;
    }
  });
  FX.on(document, 'keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = FX.qa('.modal-backdrop:not([hidden]), .drawer-backdrop:not([hidden])').pop();
    if (open) open.hidden = true;
  });

  /* tabs: root .tabs, buttons .tab[data-tab], panels [data-tab-panel] */
  FX.tabs = function (root) {
    FX.qa('[data-tabs]', root || document).forEach(function (wrap) {
      if (wrap.dataset.bound) return;
      wrap.dataset.bound = '1';
      var key = wrap.getAttribute('data-tabs') || 'tab';
      var panels = [];
      var scope = wrap.getAttribute('data-tabs-scope');
      var container = scope ? FX.q(scope) : wrap.closest('[data-tabs-container]') || document;
      panels = FX.qa('[data-tab-panel="' + key + '"]', container);
      FX.delegate(wrap, '.tab', 'click', function (e, tab) {
        FX.qa('.tab', wrap).forEach(function (t) { t.classList.toggle('active', t === tab); });
        panels.forEach(function (p) { p.hidden = p.getAttribute('data-tab-name') !== tab.dataset.tab; });
      });
    });
  };

  /* simple table text filter */
  FX.filterRows = function (table, query) {
    var q = String(query || '').toLowerCase().trim();
    FX.qa('tbody tr', table).forEach(function (tr) {
      var hit = !q || tr.textContent.toLowerCase().indexOf(q) !== -1;
      tr.hidden = !hit;
    });
  };

  FX.copy = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { FX.toast('Скопировано: ' + text, 'ok'); });
    } else {
      var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); FX.toast('Скопировано: ' + text, 'ok'); } catch (err) { FX.toast('Не удалось скопировать', 'error'); }
      t.remove();
    }
  };

  /* money formatter for tables: numeric cell inputs */
  FX.bindQty = function (root) {
    FX.qa('input.qty', root || document).forEach(function (inp) {
      FX.on(inp, 'change', function () {
        inp.value = Math.max(0, Math.round(Number(inp.value) || 0));
        FX.toast('Сохранено', 'ok', 1500);
      });
    });
  };

  window.FX = FX;
})();
