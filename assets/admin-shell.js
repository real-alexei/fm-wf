/* Fimex prototype — shared admin shell: topbar, sidebar, hash router, command palette. */
(function () {
  var ICONS = {
    chat: '<path d="M21 11.5a8 8 0 0 1-8 8H7l-4 3v-6.5a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/><path d="M8 10h8M8 14h5"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    wrench: '<path d="M14.5 6.5a4 4 0 0 0-5.2 5L4 16.8V20h3.2l5.3-5.3a4 4 0 0 0 5-5.2l-2.6 2.6-2.8-2.8 2.4-2.8Z"/>',
    gear: '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    tree: '<path d="M5 4v16M5 7h6M5 12h10M5 17h6"/><rect x="11" y="4" width="9" height="6" rx="1"/><rect x="15" y="14" width="5" height="6" rx="1"/>',
    truck: '<path d="M2 7h11v9H2zM13 10h4l4 4v2h-8z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.2"/><circle cx="17" cy="17" r="2.2"/>',
    alert: '<path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v6M12 18h.01"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    tag: '<path d="M20 12 12 20l-9-9V3h8l9 9Z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    flag: '<path d="M5 21V4h13l-2 4 2 4H5"/>',
    code: '<path d="m9 8-5 4 5 4M15 8l5 4-5 4"/>',
    users: '<path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1"/><circle cx="9.5" cy="7.5" r="3.5"/><path d="M17 11a3 3 0 1 0 0-6M21 19v-1a4 4 0 0 0-3-3.9"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 4 5.6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.6-4-9s1.5-6.4 4-9Z"/>',
    store: '<path d="M3 9 5 4h14l2 5M4 9v11h16V9"/><path d="M9 20v-6h6v6M3 9h18"/>',
    factory: '<path d="M3 21V9l5 3V9l5 3V9l5 3v9H3Z"/><path d="M7 21v-4h4v4"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    coins: '<ellipse cx="9" cy="6.5" rx="6" ry="3"/><path d="M3 6.5v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M3 11.5v5c0 1.7 2.7 3 6 3 1.2 0 2.4-.2 3.3-.5"/><ellipse cx="16.5" cy="16" rx="4.5" ry="2.4"/>',
    shield: '<path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2"/><path d="M6 14h12v7H6z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
  };

  function icon(name) {
    return '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.grid) + '</svg>';
  }
  function flag(abbr) {
    var map = { AE: '🇦🇪', KZ: '🇰🇿', UZ: '🇺🇿', SA: '🇸🇦', QA: '🇶🇦', KW: '🇰🇼', US: '🇺🇸', JP: '🇯🇵' };
    return map[abbr] || '🌐';
  }

  var PAGES = {
    admin: 'admin.html',
    catalog: 'admin-catalog.html',
    company: 'admin-company.html'
  };

  var NAV = [
    {
      items: [
        { id: 'chat', label: 'Чат', icon: 'chat', page: 'admin', badge: 3 },
        { id: 'preorder', label: 'Продажи', icon: 'box', page: 'admin' },
        { id: 'service', label: 'Сервис', icon: 'wrench', page: 'admin' }
      ]
    },
    {
      group: 'Настройки',
      items: [
        { id: 'catalog-group', label: 'Каталог', icon: 'grid', children: [
          { id: 'chars-settings', label: 'Характеристики', page: 'catalog' },
          { id: 'nomenclature', label: 'Номенклатура', page: 'catalog' },
          { id: 'cargo', label: 'Карго', page: 'catalog' },
          { id: 'percents', label: 'Наценки', page: 'catalog' },
          { id: 'penalty', label: 'Штрафы', page: 'catalog' }
        ] },
        { id: 'sales-group', label: 'Продажи', icon: 'tag', children: [
          { id: 'reason-settings', label: 'Причины возврата', page: 'catalog' },
          { id: 'wholesale-types', label: 'Типы опта', page: 'catalog' },
          { id: 'delivery-statuses', label: 'Статусы доставки', page: 'catalog' }
        ] },
        { id: 'constants', label: 'Константы приложения', icon: 'code', page: 'catalog' },
        { id: 'users', label: 'Команда', icon: 'users', page: 'catalog' },
        { id: 'countries', label: 'Страны', icon: 'globe', page: 'company' },
        { id: 'customers', label: 'Клиенты', icon: 'store', page: 'company' },
        { id: 'suppliers', label: 'Поставщики', icon: 'factory', page: 'company' },
        { id: 'payment', label: 'Касса', icon: 'card', page: 'company' },
        { id: 'currencies', label: 'Валюты', icon: 'coins', page: 'company' },
        { id: 'logistics', label: 'Логистика', icon: 'truck', page: 'company' },
        { id: 'warranty', label: 'Гарантии', icon: 'shield', page: 'company' }
      ]
    }
  ];

  var state = { page: 'admin', screen: 'chat', country: Demo.countries[0] };

  function flatNav() {
    var out = [];
    NAV.forEach(function (sec) {
      sec.items.forEach(function (it) {
        if (it.children) it.children.forEach(function (c) { out.push({ label: it.label + ' / ' + c.label, id: c.id, page: c.page, icon: it.icon }); });
        else out.push({ label: it.label, id: it.id, page: it.page, icon: it.icon });
      });
    });
    return out;
  }

  function href(item) {
    return PAGES[item.page] + '#' + item.id;
  }

  function buildSidebar() {
    var html = '';
    NAV.forEach(function (sec) {
      if (sec.group) html += '<div class="side-group">' + sec.group + '</div>';
      sec.items.forEach(function (it) {
        if (it.children) {
          html += '<div class="side-item" data-nav-group="' + it.id + '"><span class="ico">' + icon(it.icon) + '</span>' + it.label + '<span class="side-caret">▾</span></div>';
          html += '<div data-nav-children="' + it.id + '">';
          it.children.forEach(function (c) {
            html += '<a class="side-item sub" data-screen="' + c.id + '" data-page="' + c.page + '" href="' + href(c) + '">' + c.label + '</a>';
          });
          html += '</div>';
        } else {
          var badge = it.badge ? '<span class="side-badge">' + it.badge + '</span>' : '';
          html += '<a class="side-item" data-screen="' + it.id + '" data-page="' + it.page + '" href="' + href(it) + '"><span class="ico">' + icon(it.icon) + '</span>' + it.label + badge + '</a>';
        }
      });
    });
    return html;
  }

  function buildTopbar() {
    var c = state.country;
    return '' +
      '<a class="admin-brand" href="admin.html#preorder" title="Fimex admin (прототип)">' +
        '<span class="wordmark">FIMEX<span>.</span></span>' +
        '<span class="tag">admin</span>' +
      '</a>' +
      '<div class="global-search" data-cmdk><span style="display:flex;gap:7px;align-items:center">' + icon('search') + ' Поиск по панели…</span><span class="kbd">⌘K</span></div>' +
      '<div class="admin-global">' +
        '<button class="country-chip" data-country>' + flag(c.abbr) + ' <span>' + c.name + ' · ' + c.currency + '</span> <span class="muted">▾</span></button>' +
        '<button class="icon-btn" data-bell title="Уведомления">' + icon('bell') + '<span class="unread">3</span></button>' +
        '<div class="me" data-me>' +
          '<span class="avatar">' + Demo.me.initials + '</span>' +
          '<span class="who"><b>' + Demo.me.name + '</b><span>' + Demo.me.role + '</span></span>' +
        '</div>' +
      '</div>';
  }

  function render() {
    var shell = document.getElementById('shell');
    if (!shell) return;
    shell.innerHTML = '<header class="admin-topbar">' + buildTopbar() + '</header>' +
      '<aside class="admin-sidebar">' + buildSidebar() + '</aside>' +
      '<main class="admin-main"></main>';
    var main = shell.querySelector('.admin-main');
    var screens = document.getElementById('screens');
    if (screens) {
      while (screens.firstChild) main.appendChild(screens.firstChild);
      screens.remove();
    }
    bindShell();
    renderScreen(state.screen);
  }

  function renderScreen(screen) {
    var found = false;
    FX.qa('.screen[data-screen]').forEach(function (el) {
      var on = el.getAttribute('data-screen') === screen;
      el.classList.toggle('active', on);
      if (on) found = true;
    });
    if (!found) {
      var item = flatNav().filter(function (i) { return i.id === screen; })[0];
      if (item && item.page !== state.page) { location.href = href(item); return; }
      var first = FX.q('.screen[data-screen]');
      if (first) { screen = first.getAttribute('data-screen'); first.classList.add('active'); }
    }
    state.screen = screen;
    FX.qa('.side-item[data-screen]').forEach(function (el) {
      var own = el.getAttribute('data-screen') === screen;
      el.classList.toggle('active', own);
      if (own) {
        var children = el.closest('[data-nav-children]');
        if (children) {
          var grp = FX.q('[data-nav-group="' + children.getAttribute('data-nav-children') + '"]');
          if (grp) grp.classList.add('active');
        }
      }
    });
    document.querySelectorAll('.admin-main').forEach(function (m) { m.scrollTop = 0; });
    window.scrollTo(0, 0);
    if (typeof FimexAdmin.onScreen === 'function') FimexAdmin.onScreen(screen);
  }

  function bindShell() {
    FX.delegate(document, '[data-nav-group]', 'click', function (e, el) {
      var box = FX.q('[data-nav-children="' + el.getAttribute('data-nav-group') + '"]');
      if (box) box.hidden = !box.hidden;
    });
    FX.delegate(document, '.side-item[data-screen]', 'click', function (e, el) {
      var page = el.getAttribute('data-page');
      if (page === state.page) {
        e.preventDefault();
        var scr = el.getAttribute('data-screen');
        if (location.hash !== '#' + scr) history.replaceState(null, '', '#' + scr);
        renderScreen(scr);
      }
    });
    FX.on(window, 'hashchange', function () {
      var scr = location.hash.replace('#', '') || state.screen;
      renderScreen(scr);
    });
    FX.delegate(document, '[data-cmdk]', 'click', openCommandPalette);
    FX.delegate(document, '[data-bell]', 'click', openNotifications);
    FX.delegate(document, '[data-me]', 'click', openMe);
    FX.delegate(document, '[data-country]', 'click', openCountry);
    FX.delegate(document, '[data-print]', 'click', function () { window.print(); });
    FX.on(document, 'keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCommandPalette(); }
    });
  }

  /* ---------- overlays ---------- */
  function overlay(id, html) {
    var host = document.getElementById(id);
    if (!host) {
      host = document.createElement('div');
      host.id = id;
      host.className = 'modal-backdrop';
      host.hidden = true;
      host.style.zIndex = 950;
      document.body.appendChild(host);
    }
    host.innerHTML = html;
    host.hidden = false;
    var inp = host.querySelector('input');
    if (inp) setTimeout(function () { inp.focus(); }, 30);
    return host;
  }

  function openCommandPalette() {
    var items = flatNav();
    var html = '<div class="cmdk" data-palette>' +
      '<input class="input" placeholder="Перейти к экрану…" data-cmdk-input>' +
      '<div class="cmdk-list" data-cmdk-list></div>' +
      '</div>';
    var host = overlay('cmdk-host', html);
    var input = host.querySelector('[data-cmdk-input]');
    var list = host.querySelector('[data-cmdk-list]');
    var sel = 0;
    function draw() {
      var q = input.value.toLowerCase().trim();
      var found = items.filter(function (i) { return !q || (i.label + ' ' + i.id).toLowerCase().indexOf(q) !== -1; });
      sel = Math.max(0, Math.min(sel, found.length - 1));
      list.innerHTML = found.length ? found.map(function (i, idx) {
        return '<div class="cmdk-item' + (idx === sel ? ' sel' : '') + '" data-go="' + i.page + '#' + i.id + '"><span style="color:var(--muted)">' + icon(i.icon) + '</span>' + i.label + '<span class="where">' + (PAGES[i.page] === PAGES[state.page] ? 'этот раздел' : PAGES[i.page]) + '</span></div>';
      }).join('') : '<div class="cmdk-empty">Ничего не найдено</div>';
    }
    input.addEventListener('input', function () { sel = 0; draw(); });
    input.addEventListener('keydown', function (e) {
      var found = list.querySelectorAll('.cmdk-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(found.length - 1, sel + 1); draw(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); draw(); }
      if (e.key === 'Enter') { var it = list.querySelectorAll('.cmdk-item')[sel]; if (it) go(it.getAttribute('data-go')); }
    });
    list.addEventListener('click', function (e) {
      var it = e.target.closest('.cmdk-item'); if (it) go(it.getAttribute('data-go'));
    });
    function go(target) {
      host.hidden = true;
      var page = target.split('#')[0];
      if (page === PAGES[state.page]) { location.hash = '#' + target.split('#')[1]; }
      else location.href = target;
    }
    draw();
  }

  function openNotifications() {
    var html = '<div class="modal narrow" role="dialog" aria-modal="true">' +
      '<div class="modal-head"><h3>Уведомления</h3><button class="modal-close" data-close>×</button></div>' +
      '<div class="modal-body" style="padding:0">' +
      Demo.notifications.map(function (n) {
        return '<div style="display:flex;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line)">' +
          '<span class="dot ' + (n.unread ? 'blue' : '') + '" style="margin-top:5px"></span>' +
          '<div><div class="strong" style="font-size:13px">' + FX.esc(n.title) + '</div>' +
          '<div class="muted" style="font-size:12px;margin-top:1px">' + FX.esc(n.body) + '</div>' +
          '<div class="faint" style="font-size:10.5px;margin-top:3px">' + FX.esc(n.at) + '</div></div></div>';
      }).join('') +
      '</div><div class="modal-foot"><button class="btn btn-default btn-sm" data-close>Закрыть</button></div></div>';
    overlay('notif-host', html);
  }

  function openMe() {
    var html = '<div class="modal narrow" role="dialog" aria-modal="true">' +
      '<div class="modal-head"><h3>Аккаунт</h3><button class="modal-close" data-close>×</button></div>' +
      '<div class="modal-body">' +
        '<div class="row" style="gap:12px"><span class="avatar lg">' + Demo.me.initials + '</span>' +
        '<div><div class="strong">' + Demo.me.name + '</div><div class="muted small">' + Demo.me.email + '</div>' +
        '<div><span class="badge badge-blue" style="margin-top:6px">superadmin</span></div></div></div>' +
        '<div class="divider" style="margin:16px 0"></div>' +
        '<div class="stack tight small muted"><div>Компания: ' + Demo.company.name + '</div>' +
        '<div>Роль: полный доступ ко всем разделам</div>' +
        '<div>Сессия: Bearer-токен в localStorage (так в реальном SPA)</div></div>' +
      '</div><div class="modal-foot"><button class="btn btn-default btn-sm" data-close>Закрыть</button>' +
      '<button class="btn btn-primary btn-sm" data-act="logout">Log out</button></div></div>';
    var host = overlay('me-host', html);
    host.querySelector('[data-act="logout"]').addEventListener('click', function () {
      host.hidden = true; FX.toast('В прототипе выход не выполняется — это демо', '', 2600);
    });
  }

  function openCountry() {
    var html = '<div class="modal narrow" role="dialog" aria-modal="true">' +
      '<div class="modal-head"><h3>Страна реализации</h3><button class="modal-close" data-close>×</button></div>' +
      '<div class="modal-body" style="padding:8px">' +
      Demo.countries.map(function (c, i) {
        return '<div class="cmdk-item" data-country-pick="' + i + '"><span class="row-flag">' + flag(c.abbr) + '</span>' +
          '<span>' + c.name + '</span><span class="where">' + c.currency + ' · ' + c.rate + '</span></div>';
      }).join('') +
      '</div></div>';
    var host = overlay('country-host', html);
    host.addEventListener('click', function (e) {
      var it = e.target.closest('[data-country-pick]');
      if (!it) return;
      state.country = Demo.countries[Number(it.getAttribute('data-country-pick'))];
      var chip = FX.q('[data-country]');
      if (chip) chip.innerHTML = flag(state.country.abbr) + ' <span>' + state.country.name + ' · ' + state.country.currency + '</span> <span class="muted">▾</span>';
      host.hidden = true;
      FX.toast('Страна переключена: ' + state.country.name, 'ok');
    });
  }

  var FimexAdmin = {
    mount: function (opts) {
      opts = opts || {};
      state.page = opts.page || 'admin';
      var screen = (location.hash || '').replace('#', '') || opts.screen || 'chat';
      state.screen = screen;
      if (!document.getElementById('shell')) {
        var main = document.createElement('div');
        main.id = 'shell';
        document.body.insertBefore(main, document.body.firstChild);
      }
      render();
    },
    icon: icon,
    flag: flag,
    onScreen: null
  };
  window.FimexAdmin = FimexAdmin;
})();
