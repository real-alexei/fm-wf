#!/usr/bin/env python3
"""Генератор wireframes по инвентарю экранов Fimex (.dev/fimex/SCREENS.md)."""
import html, os

OUT = os.path.dirname(__file__)
os.makedirs(OUT, exist_ok=True)

CSS = """
@font-face { font-family:'Bebas'; src:url('assets/fonts/BebasNeueRegular-s.p.6dc224e2.woff') format('woff'); font-display:swap; }
@font-face { font-family:'DIN'; src:url('assets/fonts/dinnextw1g-s.p.09a4ca7e.woff2') format('woff2'); font-weight:400; font-display:swap; }
@font-face { font-family:'DIN'; src:url('assets/fonts/dinnextw1g_medium-s.p.cd040f6c.woff2') format('woff2'); font-weight:500; font-display:swap; }
@font-face { font-family:'DIN'; src:url('assets/fonts/dinnextw1g_bold-s.p.26af13c1.woff2') format('woff2'); font-weight:700; font-display:swap; }
:root { --bd:#d4d7de; --bg:#f4f5f7; --blk:#fafbfc; --tx:#1a1a1a; --dim:#7a7f8a; --acc:#113AC8; --red:#C20C0D; }
* { box-sizing:border-box; margin:0; padding:0; }
body { font:13px/1.5 'DIN',-apple-system,'Segoe UI',Arial,sans-serif; background:var(--bg); color:var(--tx); }
.appnav { position:sticky; top:0; z-index:50; background:#0d0d0f; color:#fff; padding:0 28px; display:flex; gap:6px; align-items:center; height:56px;}
.appnav .logo { font-family:'Bebas'; font-size:24px; letter-spacing:2px; margin-right:24px; }
.appnav .logo span { color:var(--acc); }
.appnav a { color:#b9c4e8; text-decoration:none; font-size:12px; padding:6px 12px; border-radius:6px; transition:.15s;}
.appnav a:hover { background:#22242c; color:#fff; }
.appnav a.here { background:var(--acc); color:#fff; }
.pagenav { position:fixed; top:56px; left:0; bottom:0; width:240px; overflow-y:auto; background:#fff; border-right:1px solid #e5e7eb; padding:14px 10px; z-index:49;}
.pagenav .grp { font-size:10px; text-transform:uppercase; letter-spacing:.6px; color:#9aa0ac; margin:12px 8px 4px; font-weight:700;}
.pagenav .grp:first-child { margin-top:2px; }
.pagenav a { display:block; font-size:11.5px; color:#3a3d45; padding:4px 10px 4px 14px; text-decoration:none; border-radius:6px; border-left:2px solid transparent; transition:.12s; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.pagenav a:hover { background:#f2f4f9; color:var(--acc); }
.pagenav a .n { color:#b3b8c4; font-size:10px; margin-right:5px; font-family:ui-monospace,Menlo,monospace;}
.mainwrap { margin-left:240px; }
@media (max-width:900px){ .pagenav{position:static;width:auto;max-height:260px} .mainwrap{margin-left:0} }
.screen { margin:34px auto; max-width:1320px; padding:0 24px;}
.screentitle { font-family:'Bebas'; font-size:22px; letter-spacing:1px; margin-bottom:4px; display:flex; align-items:baseline; gap:10px;}
.screentitle .num { color:var(--acc); font-size:15px; }
.screenmeta { font-size:11px; color:var(--dim); margin-bottom:10px; font-family:ui-monospace,Menlo,monospace;}
.frame { background:#fff; border:1px solid #d9dbe2; border-radius:10px; overflow:hidden; box-shadow:0 2px 14px rgba(20,25,60,.06);}
.frame.mobile { width:402px; height:874px; margin:0 auto; display:flex; flex-direction:column;}
.frame.mobile .block { flex:0 0 auto; }
.frame.mobile .content { flex:1 1 auto; }
.frame.desktop { width:1280px; max-width:100%; height:800px; display:flex; flex-direction:column;}
.bar { border:1px dashed var(--bd); background:var(--blk); color:#444; padding:7px 12px; font-size:11px; min-height:28px; display:flex; align-items:center; gap:8px; flex-wrap:wrap;}
.bar b { font-weight:700; }
.layout { display:flex; flex:1; min-height:0; }
.sidebar { width:200px; border-right:1px solid #eceef2; background:#fbfbfc; padding:10px; font-size:11.5px; flex-shrink:0;}
.sidebar .item { padding:6px 10px; border-radius:6px; margin-bottom:2px; color:#3a3d45;}
.sidebar .item.active { background:#e4eafb; color:var(--acc); font-weight:700; }
.sidebar .item.sub { padding-left:24px; color:#8a8f9a; font-size:11px;}
.content { flex:1; padding:12px; overflow:auto; display:flex; flex-direction:column; gap:10px;}
.tabs { display:flex; gap:4px; flex-wrap:wrap; border-bottom:2px solid #e5e7eb; padding-bottom:0;}
.tab { border:1px solid #dde0e6; border-bottom:none; background:#f4f5f8; border-radius:6px 6px 0 0; padding:5px 14px; font-size:11.5px; color:#666;}
.tab.active { background:#fff; font-weight:700; color:var(--acc); position:relative; top:2px; border-bottom:2px solid #fff;}
.table { border:1px solid #e3e5ea; width:100%; border-collapse:collapse; font-size:11px; border-radius:6px; overflow:hidden;}
.table th { background:#f2f4f9; border:1px solid #e3e5ea; padding:6px 8px; text-align:left; font-weight:700; white-space:nowrap; color:#3a3d45;}
.table td { border:1px solid #eef0f4; padding:6px 8px; color:#b9bcc6; }
.blocks { display:flex; gap:10px; flex-wrap:wrap; }
.block { border:1px dashed #c9cdd8; background:#fbfbfc; border-radius:8px; padding:12px; font-size:11px; color:#666; flex:1; min-width:120px; min-height:54px;}
.block b { display:block; color:#1a1a1a; margin-bottom:4px; font-size:12px;}
.modal { border:1px solid #d5d8e0; background:#fff; border-radius:10px; padding:14px; width:440px; margin:8px auto; box-shadow:0 8px 30px rgba(20,25,60,.10);}
.modal h4 { font-size:13px; margin-bottom:8px; }
.field { border:1px solid #d8dbe2; border-radius:6px; background:#fcfcfd; padding:7px 10px; margin:5px 0; color:#9aa0ac; font-size:11px;}
.btn { display:inline-block; border:1px solid #c6cad4; background:#f2f3f6; border-radius:6px; padding:5px 14px; font-size:11px; margin:2px 4px 2px 0; color:#333; font-weight:500;}
.btn.primary { background:var(--acc); border-color:var(--acc); color:#fff; font-weight:700;}
.chip { display:inline-block; border:1px solid #d5d8e0; border-radius:12px; padding:2px 10px; font-size:10px; margin:2px; background:#f7f8fa; color:#666;}
.note { font-size:10.5px; color:#9aa0ac; margin-top:6px; font-family:ui-monospace,Menlo,monospace;}
.grid { display:grid; gap:8px; }
.g2 { grid-template-columns:1fr 1fr; } .g3 { grid-template-columns:1fr 1fr 1fr; } .g4 { grid-template-columns:repeat(4,1fr); }
.phonebar { text-align:center; font-size:10px; color:#9aa0ac; padding:5px; border-bottom:1px dashed var(--bd); background:#fbfbfc;}
.tabbar { margin-top:auto; display:flex; border-top:1px solid #e3e5ea; background:#fff;}
.tabbar div { flex:1; text-align:center; padding:9px 0; font-size:10px; color:#9aa0ac; border-top:2px solid transparent;}
.tabbar div.active { color:var(--acc); border-top-color:var(--acc); font-weight:700; }
.hero { padding:56px 24px; text-align:center; border:1px dashed var(--bd); background:linear-gradient(135deg,#f6f8ff,#fbfcfd); border-radius:8px;}
.hero h2 { font-family:'Bebas'; font-size:34px; letter-spacing:1.5px; font-weight:400;}
h2.w { font-size:13px; margin:6px 0; color:#333;}
.wlabel { font-size:10px; color:#9aa0ac; text-transform:uppercase; letter-spacing:.6px; margin-bottom:2px;}
.cardrow { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; margin:14px 0;}
.card { background:#fff; border:1px solid #e3e5ea; border-radius:12px; padding:18px; box-shadow:0 2px 10px rgba(20,25,60,.05);}
.card h3 { font-family:'Bebas'; font-size:19px; letter-spacing:.8px; margin-bottom:6px;}
.card .cmeta { font-size:11px; color:var(--dim); margin-bottom:10px; font-family:ui-monospace,Menlo,monospace;}
.card a.btn { text-decoration:none; margin-top:8px; }
.card ul { margin:8px 0 0 16px; font-size:11.5px; color:#555;}
h1.pagetitle { font-family:'Bebas'; font-size:30px; letter-spacing:1.5px; margin:26px 0 4px; font-weight:400;}
.pagemeta { color:var(--dim); font-size:12px; margin-bottom:10px;}
.diag { display:flex; gap:8px; align-items:stretch; flex-wrap:wrap; margin:12px 0; font-size:11px;}
.diag .node { border:1px solid #d5d8e0; background:#fff; border-radius:8px; padding:10px 12px; }
.diag .node b { display:block; font-size:12px; }
.diag .arr { align-self:center; color:#b9bcc6; font-size:16px;}
.legend { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:12px; margin:12px 0;}
.litem { background:#fff; border:1px solid #e3e5ea; border-radius:10px; padding:12px; display:flex; flex-direction:column; gap:8px;}
.ldemo { border:1px dashed #e0e3ea; border-radius:8px; padding:10px; background:#fcfcfd; overflow:hidden;}
.lcap { font-size:11px; color:#666; line-height:1.45;}
"""

def esc(s): return html.escape(s, quote=True)

def table(cols, rows=4):
    ths = ''.join(f'<th>{esc(c)}</th>' for c in cols)
    tds = ''.join('<tr>' + ''.join('<td>…</td>' for _ in cols) + '</tr>' for _ in range(rows))
    return f'<table class="table"><tr>{ths}</tr>{tds}</table>'

def tabs(items, active=0):
    return '<div class="tabs">' + ''.join(
        f'<div class="tab{" active" if i==active else ""}">{esc(t)}</div>' for i, t in enumerate(items)) + '</div>'

def sidebar(items, active=''):
    out = []
    for it in items:
        if isinstance(it, tuple):
            label, sub = it
            out.append(f'<div class="item sub">{esc(label)}</div>')
        else:
            out.append(f'<div class="item{" active" if it==active else ""}">{esc(it)}</div>')
    return f'<div class="sidebar">{"".join(out)}</div>'

def field(label): return f'<div class="field">{esc(label)}</div>'
def btn(label, primary=False): return f'<span class="btn{" primary" if primary else ""}">{esc(label)}</span>'
def block(title, body=''):
    return f'<div class="block"><b>{esc(title)}</b>{body}</div>'

def desktop_screen(sid, title, meta, body_html, side=None, topbar='Fimex Admin'):
    side_html = side or ''
    return f'''
<div class="screen" id="{sid}">
  <div class="screentitle">{esc(title)}</div>
  <div class="screenmeta">{meta}</div>
  <div class="frame desktop">
    <div class="bar"><b>{esc(topbar)}</b></div>
    <div class="layout">{side_html}<div class="content">{body_html}</div></div>
  </div>
</div>'''

def mobile_screen(sid, title, meta, body_html, tabbar=None, active_tab=''):
    tb = ''
    if tabbar:
        tb = '<div class="tabbar">' + ''.join(
            f'<div{" class=active" if t==active_tab else ""}>{esc(t)}</div>' for t in tabbar) + '</div>'
    return f'''
<div class="screen" id="{sid}">
  <div class="screentitle">{esc(title)}</div>
  <div class="screenmeta">{meta}</div>
  <div class="frame mobile">
    <div class="phonebar">9:41 · Fimex · iOS</div>
    {body_html}
    {tb}
  </div>
</div>'''

def page(app_title, screens_html, nav_apps, nav_screens, here=''):
    links = ''.join(f'<a href="{esc(h)}"{" class=here" if h==here else ""}>{esc(t)}</a>' for t, h in nav_apps)
    # группировка по «Раздел — подраздел»
    nav_html = ''
    last_g = None
    num = 0
    for sid, t in nav_screens:
        num += 1
        g = t.split(' — ')[0] if ' — ' in t else None
        if g != last_g:
            if g: nav_html += f'<div class="grp">{esc(g)}</div>'
            last_g = g
        label = t.split(' — ')[-1] if ' — ' in t else t
        nav_html += f'<a href="#{esc(sid)}"><span class="n">{num:02d}</span>{esc(label)}</a>'
    return f'''<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(app_title)} — Fimex wireframes</title>
<style>{CSS}</style></head>
<body>
<div class="appnav"><div class="logo">FIMEX<span>·</span>WF</div>{links}</div>
{('<div class="pagenav">' + nav_html + '</div>') if nav_html else ''}
<div class="mainwrap">
{screens_html}
</div>
</body></html>'''

# ============================= ADMIN SPA =============================
ADMIN_MENU = ['Dashboard','Chat','Preorder (Sales)','Service','Settings',
  ('Catalog','sub'),('— Chars settings','sub'),('— Nomenclature','sub'),('— Cargo','sub'),('— Percents','sub'),
  ('— Reason settings','sub'),('— Wholesale types','sub'),('— Delivery statuses','sub'),('— Constants','sub'),
  ('— Penalty','sub'),('— Users','sub'),('— Countries','sub'),('— Customers','sub'),('— Suppliers','sub'),
  ('— Payments','sub'),('— Currencies','sub'),('— Logistics','sub'),('— Warranty','sub')]

def aside(active):
    items = []
    for it in ADMIN_MENU:
        if isinstance(it, tuple): items.append(it)
        else: items.append(it)
    return sidebar(items, active)

admin = []

admin.append(desktop_screen('a-login','Login (OAuth)','/oauth/authorize · JWT → localStorage.api_token',
  '<div class="modal"><h4>Fimex Admin — Sign in</h4>'+field('Email *')+field('Password *')+btn('Sign in',True)+
  '<div class="note">Ошибка 500 вместо 401 при битом токене (F2)</div></div>'))

admin.append(desktop_screen('a-dash','Dashboard (index)','/dashboard · редирект на redirect_route из app state',
  '<div class="blocks">'+block('redirect_route → default section')+block('Guards check (VIEW)')+'</div>',
  aside('Dashboard')))

admin.append(desktop_screen('a-chat','Chat','/dashboard/chat · API: chat/fetch-chats, fetch-chat, send, seen, clear, fetch-countries, fetch-total-unseen · Pusher: admin-handler-channel (chat-support)',
  '<div class="layout" style="gap:8px">'
  '<div style="width:260px">'+field('Name or ID')+'<div class="block"><b>Фильтры</b>'+btn('Все')+btn('Непрочитанные')+'</div>'+block('Список чатов','страна → клиенты, unread badges')+'</div>'
  '<div style="flex:1"><div class="bar">Customer Chat · {id}</div>'+block('Сообщения','DD.MM.YYYY separators, attachments (fancybox)')+field('messageField…')+btn('messageSend',True)+btn('Очистить чат')+'</div>'
  '</div>', aside('Chat')))

# ---- preorder mega-screen
def preorder(tab_sid, tab_title, active_tab, inner, note=''):
    TABS = ['Stock','Закупки','Продажи','Доставка клиентов','Доставка поставщиков','Штрафы','P2P','Статистика']
    KEYS = ['stock','suppliers','customers-orders','delivery-customers','delivery-suppliers','penalty-country','p2p-trade','statistics-country']
    body = tabs(TABS, TABS.index(active_tab)) + inner
    active_tab = KEYS[TABS.index(active_tab)]
    if note: body += f'<div class="note">{esc(note)}</div>'
    admin.append(desktop_screen(tab_sid, f'Preorder — {tab_title}',
        f'/dashboard/preorder?type={active_tab} · компонент AKt, HOC xb([type])', body, aside('Preorder (Sales)')))

preorder('a-pre-stock','Stock','Stock',
  '<div class="bar">Фильтры: Brand · Category · Subcategory · Q-ty · Price</div>'
  + table(['№','Image','Code','Description of Goods','Brand','Category','Stock price','Q-ty','Total $','Actions'])
  + '<div class="blocks">'+block('Summary','итоги по выборке')+block('Export','GET preorder/stock/fetch-data / fetch-products')+'</div>')

preorder('a-pre-purch','Закупки — список поставщиков','Закупки',
  '<div class="bar">Apply Filters: Supplier Name · Date · Country</div>'
  + table(['Supplier Name','Country','Orders','Q-ty','Total $','Status','Actions'])
  + '<div class="note">Состояния: suppliers → supplier → supplier-order → supplier-product → supplier-packing → supplier-imei (drill-down). Права: sales.purchase.orders/.order/.packing_list/.imei</div>')

preorder('a-pre-purch-order','Закупки — заказ поставщика','Закупки',
  '<div class="bar">Supplier: {name} · Order № · Order Date · Status</div>'
  + table(['Image','Code','Description of Goods','Model','Q-ty','Price','Total $','Warranty','Cargo'])
  + '<div class="blocks">'+block('mark/{id}','пометки')+block('change-order-product')+block('IMEI сканер','scan-imei / imeis/{id}')+block('Packing list')+block('Export Excel','export-excel-orders / -products')+'</div>')

preorder('a-pre-sales','Продажи — заказы клиентов','Продажи',
  '<div class="bar">Apply Filters: Customer Name · Order № · Order Date · Status · Country</div>'
  + table(['Number order','Customer Name','Country','Q-ty','Total $','Status','Logistics','Actions'])
  + '<div class="blocks">'+block('change-order-delivery-status')+block('change-logistic')+block('change-wholesale')+block('update-bill-to')+block('remove-pdf')+block('rollback')+'</div>'
  + '<div class="note">Состояния: customers-orders → customer-order → customer-packing-list → customer-imei. Export: export-excel-order(s), -products, -tax</div>')

preorder('a-pre-deliv-c','Доставка клиентам','Доставка клиентов',
  '<div class="bar">Fetch-filter · даты from/to · folders</div>'
  + table(['Number order','Customer Name','Country','Delivery status','Checkpoint at','Pickup at','Q-ty','Total $'])
  + btn('change-deliveries-status',True))

preorder('a-pre-deliv-s','Доставка поставщиков','Доставка поставщиков',
  '<div class="bar">Fetch-filter · folders</div>'
  + table(['Supplier','Order №','Status','Q-ty','Total $','Actions']))

preorder('a-pre-penalty','Штрафы','Штрафы',
  '<div class="tabs">'+''.join(f'<div class="tab">{t}</div>' for t in ['penalty-country','penalty-supplier','penalty-client','penalty-number'])+'</div>'
  + table(['Country/Supplier/Client','Number order','Penalty price','Reasons','Status','Actions'])
  + '<div class="blocks">'+block('mark-paid')+block('update-qty')+block('change-status')+'</div>')

preorder('a-pre-p2p','P2P trade','P2P',
  '<div class="bar">fetch-filter-meta · fetch-current-bids / fetch-completed-bids</div>'
  + table(['Bid №','Product','Customer','Price offer','Q-ty','Status','Actions'])
  + '<div class="blocks">'+block('remove-bid')+block('Pusher: refresh-p2p','admin-handler-channel ⚠public')+'</div>'
  + '<div class="note">История: fetch-history/{id}</div>')

preorder('a-pre-stats','Статистика','Статистика',
  '<div class="bar">filters: from/to · country</div>'
  + '<div class="blocks">'+block('Diagram','fetch-diagram')+block('Customer diagram','fetch-customer-diagram')+block('Chars diagram','fetch-chars-diagram')+block('Rates','fetch-rates · Курс')+'</div>'
  + table(['Brand','Category','Quantity','Amount','Average Rate','Warranty expenses'])
  + '<div class="blocks">'+block('Sidebar stats','fetch-sidebar-stats')+block('Warranty expenses')+'</div>')

# ---- settings screens
admin.append(desktop_screen('a-set-chars','Settings — Chars settings','/dashboard/settings/catalog/chars-settings · API: catalog/chars/*',
  '<div class="blocks">'+block('Дерево характеристик','TreeView: группы → характеристики')+block('Правая панель — редактирование')+'</div>'
  '<div class="modal" style="width:640px"><h4>Характеристика</h4><div class="grid g2">'
  + field('Название характеристики *') + field('Название *')
  + field('Название в продукт инфо (RU)') + field('Название в продукт инфо (EN)')
  + field('Название товара в прайслисте (приложение)') + field('Название товара в инфо') + '</div>'
  + '<div class="blocks">' + block('Использовать как','Группировать по / Фильтровать по / Сортировать по') + block('Вывод в прайс листе') + block('Вывести в фильтре') + block('Обязательно для заполнения') + '</div>'
  + '<div class="blocks">' + block('Тип диаграмы','Круговая / Линейная + Цвет диаграммы') + block('Иконка / Цвет') + block('Добавить эмоджи в название') + '</div>'
  + btn('Добавить значение') + btn('Сохранить',True) + '</div>', aside('Settings')))

admin.append(desktop_screen('a-set-nom','Settings — Nomenclature','/dashboard/settings/catalog/nomenclature · API: catalog/{brand,category,product,tree}/*',
  '<div class="layout" style="gap:8px"><div style="width:280px">'+block('Дерево','Бренд → Категория → Товар (TreeView)')+btn('Добавить код +')+'</div>'
  '<div style="flex:1"><div class="modal" style="width:100%"><h4>Товар / Бренд / Категория</h4><div class="grid g3">'
  + field('Бренд *') + field('Группа товаров *') + field('Название *')
  + field('Код товара') + field('Код производства') + field('Код товара ВЭД')
  + field('Автогенерация кода товара') + field('Кол-во символов') + field('Вес г')
  + field('Название бренда') + field('Логотип (белый фон)') + field('Логотип (темный фон)')
  + field('Константа выбора параметров (RU)') + field('Константа выбора параметров (EN)') + field('Описание')
  + '</div>'+ block('Изображения','upload-images') + btn('Сохранить',True) + '</div></div></div>', aside('Settings')))

admin.append(desktop_screen('a-set-cargo','Settings — Cargo','/dashboard/settings/catalog/cargo · API: catalog/cargo/{fetch-meta,fetch-products,save,batch-save}',
  '<div class="tabs"><div class="tab active">Клиенты</div><div class="tab">Поставщики</div></div>'
  + table(['Название','Карго (UZS)','…','…'])
  + btn('Save') + btn('Batch save'), aside('Settings')))

admin.append(desktop_screen('a-set-perc','Settings — Percents (наценки)','/dashboard/settings/catalog/percents · API: settings/percents/* (НОВОЕ)',
  '<div class="bar">Brand / Category</div>'
  + table(['Brand / Category','% cats','% char-groups','Visibility','Actions'])
  + '<div class="blocks">'+block('change-cat-percent')+block('change-cat-visibility')+block('change-char-group-percent')+block('change-char-group-visibility')+'</div>', aside('Settings')))

admin.append(desktop_screen('a-set-reason','Settings — Reason settings','/dashboard/settings/reason-settings · API: settings/reason-return/*',
  table(['Название','Сумма штрафа','Tax','Порядок'])
  + '<div class="modal"><h4>Причина возврата</h4>'+field('Название')+field('Сумма штрафа')+field('Tax:')+btn('Сохранить',True)+'</div>', aside('Settings')))

admin.append(desktop_screen('a-set-whs','Settings — Wholesale types','/dashboard/settings/wholesale-types · API: settings/wholesale-types/*',
  table(['Название в админке','Название Ru','Название En','Название в приложении Ru','Название в приложении En','Иконки','Actions'])
  + '<div class="modal"><h4>Тип опта</h4>'+field('Название в админке')+field('Название Ru')+field('Название En')+field('Название в приложении Ru')+field('Название в приложении En')+btn('Upload: Иконка (светлый фон)')+btn('Upload: Иконка (темный фон)')+btn('Сохранить',True)+'</div>', aside('Settings')))

admin.append(desktop_screen('a-set-ds','Settings — Delivery statuses','/dashboard/settings/delivery-status · API: settings/delivery-status/*',
  '<div class="blocks">'+block('Группы статусов','attach-group / sort-statuses')+block('handle-radio / handle-checkbox','флаги поведения')+'</div>'
  + table(['Иконка','Название','Название Ru','Название En','Цвет','Цвет тёмная версия','Выдача','Actions'])
  + btn('Add New Status',True), aside('Settings')))

admin.append(desktop_screen('a-set-const','Settings — Constants','/dashboard/settings/constants · API: settings/constants/* · переопределение текстовок iOS/андроид (fi_/ma_)',
  '<div class="bar">Фильтры: Все группы · Все ключи · Оба приложения · Search</div>'
  + table(['Ключ','Группа','Экран','Текст RU','Текст EN','Где применить','Actions'])
  + '<div class="modal"><h4>Добавить переопределение</h4>'+field('Ключ (как в коде, префикс fi_/ma_ добавится)')+field('Группа')+field('Экран (необязательно, напр. OrderDetailViewController)')+field('Текст RU')+field('Текст EN')+btn('Создать',True)+'</div>', aside('Settings')))

admin.append(desktop_screen('a-set-pen','Settings — Penalty','/dashboard/settings/penalty · API: settings/penalty-category/*',
  '<div class="bar">Brand / Category</div>'+table(['Brand / Category','Penalty %','…'])+btn('Сохранить',True), aside('Settings')))

admin.append(desktop_screen('a-set-users','Settings — Users','/dashboard/settings/users · API: settings/users/* + privs/* + autologin',
  '<div class="bar">'+btn('Add Team Member',True)+'</div>'
  + table(['Name','Email','Роль','Updated','Actions (edit / autologin / delete)'])
  + '<div class="modal"><h4>Team member</h4>'+field('Name')+field('Email')+field('Роль')+field('Пароль')+field('Повторите пароль')+btn('Create',True)+'</div>'
  + '<div class="note">privs: fetch-menu-list, fetch-menu-privs, save-page-privs, save-geo-privs, change-status. autologin — magic-ссылка для входа за пользователя/поставщика (F9)</div>', aside('Settings')))

admin.append(desktop_screen('a-set-countries','Settings — Countries','/dashboard/settings/countries · матрица закупка × реализация',
  table(['Country of purchase','Country of Implementation →','…','…'])
  + '<div class="modal" style="width:640px"><h4>Edit Country</h4><div class="grid g2">'
  + field('Название *')+field('Сокращенное Название *')+field('Валюта *')+field('Time Zone *')
  + field('Префикс констант')+field('Название приложения')+field('Контрольная точка накладных *')+field('Контрольная точка накладных по факту *')
  + field('Кол-во дней для вывода заказов полученных товаров')+field('Минимальная сумма заказа за период *')+field('Шаг суммы в P2p трейде *')+field('Оплата по умолчанию')
  + '</div>'+block('Регионы','create-region / sort-regions')+block('Лого в стикере','Upload')+btn('Сохранить',True)+'</div>'
  + '<div class="note">+ Purchase-подраздел (НОВОЕ): settings/countries/purchase/* — закупочные настройки по странам, delivery-days</div>', aside('Settings')))

admin.append(desktop_screen('a-cust','Customers — список','/dashboard/settings/customers/:id_country · API: customers/*',
  '<div class="bar">Filters: fetch-filters · search-customers-by-country · '+btn('Add New',True)+'</div>'
  + table(['User Name','Company name','Countries / Regions','Status','Subscription','Balance/Deposit/Penalty','Actions'])
  + '<div class="modal" style="width:640px"><h4>Client card</h4><div class="grid g2">'
  + field('Company name')+field('E-mail *')+field('Company phone')+field('Company address')
  + field('Contract')+field('TRN / TRN Number')+field('License')+field('License end date')
  + field('Language *')+field('Wholesale *')+field('Mode of payment')+field('Password *')
  + '</div><div class="blocks">'+block('Флаги','isEnableAppSubscription / isEnableCompanies / isEnableCustomerCreatable / isFreeZone / Reseller')+block('Send Message')+'</div>'
  + btn('Save',True)+btn('Delete Company')+'</div>'
  + '<div class="note">Payments: fetch-list/create/update/delete + fetch-last-date. История и чат — отдельные роуты</div>', aside('Settings')))

admin.append(desktop_screen('a-cust-hist','Customers — история','/dashboard/settings/customers/history/:id_country/:id_customer',
  '<div class="bar">Date range picker (DD.MM.YY)</div>'
  + '<div class="tabs"><div class="tab active">ORDERS</div><div class="tab">P2P ORDERS</div><div class="tab">P2P</div></div>'
  + table(['Date','Order №','Description of Goods','Q-ty','Price','Total $','Status']), aside('Settings')))

admin.append(desktop_screen('a-sup','Suppliers — список','/dashboard/settings/suppliers/:id_country · API: suppliers/* + catalog-access (НОВОЕ)',
  '<div class="bar">Filters: fetch-filter-statuses · fetch-managers · '+btn('Add',True)+'</div>'
  + table(['Name','Company name','Phone','Email','Purchases','Status','Actions'])
  + '<div class="modal" style="width:640px"><h4>Supplier</h4><div class="grid g2">'
  + field('Name *')+field('Company name')+field('Email *')+field('Phone')
  + field('Company Address')+field('TRN / TRN Number')+field('License *')+field('License end date')
  + field('Purchases *')+field('Password *')+field('Repeat password *')+field('Comment')
  + '</div>'+block('Documents','Upload')+block('Admin account')+block('Catalog access','catalog-access / save-access — НОВОЕ')+btn('Save',True)+'</div>', aside('Settings')))

admin.append(desktop_screen('a-pay','Payments — печатные формы','/dashboard/settings/payment/{customers,suppliers}/… · 8 форм',
  '<div class="blocks">'
  + block('customers/:impl/ballance/cash_receipt') + block('customers/:impl/ballance/cash_refund')
  + block('customers/:impl/penalty/cash_receipt') + block('customers/:impl/penalty/cash_refund')
  + block('customers/:impl/deposit/cash_receipt') + block('customers/:impl/deposit/cash_refund')
  + block('suppliers/cash_receipt') + block('suppliers/cash_refund')
  + '</div><div class="note">Компоненты Qce/Jce/Zce/tle — receipt/refund шаблоны</div>', aside('Settings')))

admin.append(desktop_screen('a-set-curr','Settings — Currencies','/dashboard/settings/currencies · API: settings/currencies/*',
  '<div class="bar">'+btn('+ Add currency',True)+'</div>'
  + table(['Name','ISO','Symbol','Currency rate','Actions'])
  + '<div class="modal"><h4>Unlock</h4>'+field('Password')+btn('Unlock',True)+'<div class="note">unlock защищён паролем</div></div>', aside('Settings')))

admin.append(desktop_screen('a-set-log','Settings — Logistics','/dashboard/settings/logistics/:id_country · API: settings/logistics/* (НОВОЕ)',
  '<div class="bar">'+btn('Add company',True)+'</div>'
  + table(['Name','Company name','Phone','Company address','License','License end date','Default','Actions'])
  + '<div class="modal"><h4>Logistics company</h4>'+field('Name *')+field('Company name')+field('Company phone')+field('Company address')+field('License *')+field('License end date')+field('Address')+btn('Upload documents')+btn('Save',True)+'</div>', aside('Settings')))

admin.append(desktop_screen('a-set-war','Settings — Warranty','/dashboard/settings/warranty · API: settings/warranties/*',
  table(['Название в админке','Название Ru/En','Название2 Ru/En','Кол. мес','% по странам','Actions'])
  + '<div class="modal" style="width:680px"><h4>Редактировать гарантии</h4>'
  + '<div class="bar">Rich-text: Заголовок · Раздел · Список · Цитата · Выделенный блок</div>'
  + field('Базовая Гарантия Ru')+field('Базовая Гарантия En')+field('Доп. Гарантия Ru')+field('Доп. Гарантия En')
  + btn('Добавить тип гарантии')+btn('Сохранить',True)+'</div>', aside('Settings')))

admin.append(desktop_screen('a-service','Service — возвраты','/dashboard/service/:id_country · API: service/*',
  '<div class="bar">Apply Filters: Brand · Model · Customers status · Suppliers status · Date of Sale · Delivery Status</div>'
  + table(['Order №','Serial number / IMEI','Description of Goods','Customers','Suppliers','Old price','Discount price','Loss %','Status name','Date of Sale','Actions'])
  + '<div class="blocks">'+block('Add photo')+block('Add Comment')+block('Diagnostics')+block('Reason for return')+block('Custom statuses','save-custom-status')+block('Export sold-out')+'</div>', aside('Service')))

admin.append(desktop_screen('a-404','404','/page-404, /*',
  '<div class="hero"><h2>404</h2><div>Страница не найдена</div></div>', aside('')))

# ============================= SUPPLIER PORTAL =============================
PORTAL_NAV = ['Orders','P2P','Packing List','Service','Statistic','Stock']

def paside(active):
    return sidebar(PORTAL_NAV + [('Settings','sub'),('Log Out','sub')], active)

portal = []

portal.append(desktop_screen('p-landing','Landing fimex.ae','/ · Next.js 16, PPR, x-nextjs-cache: HIT',
  '<div class="hero"><h2>We make purchases easier</h2>'+btn('Get Started',True)+btn('Sign in')+'</div>'
  '<div class="blocks">'
  + block('Direct-to-Customer Sales','Sell directly to clients running their own retail stores')
  + block('24/7 Sales Access','Get access to consistent sales')
  + block('Higher Profit Margins','without middlemen')
  + block('Wide Product Range','Over 2,000 products')
  + block('Speed and Simplicity','List and sell in 3 clicks')
  + '</div>'
  + '<div class="bar">Office 304, Building 3W (West Wing), DAFZA, Dubai, UAE · info@fimex.ae · © 2026 FIMEX</div>'
  + '<div class="note">Cookie-баннер: «By continuing to use this site, you agree to our use of cookies» — Accept All</div>',
  topbar='Fimex · Get Started / Sign in'))

portal.append(desktop_screen('p-login','Sign in','/dashboard · POST /api/auth',
  '<div class="modal"><h4>Sign in</h4>'+field('Email Address')+field('Password')+btn('Sign in',True)+'<div class="note">Forgot password? · Join Fimex</div></div>'
  '<div class="modal"><h4>Forgot password?</h4>'+field('Email')+btn('Send code',True)+'<div class="note">forgot/send-code → check-code → reset/{code}</div></div>',
  topbar='Fimex'))

portal.append(desktop_screen('p-register','Join Fimex (регистрация поставщика)','POST /api/auth/register · 422 показывает поля',
  '<div class="modal" style="width:520px"><h4>Join Fimex</h4>'
  + field('Company Name *')+field('Company Adress')+field('Email *')+field('Phone *')
  + field('Brands *')+field('How long on the market? *')+field('Average quarterly turnover *')
  + field('Password (8+ chars, digit, lower, upper)')
  + btn('Register',True)+'<div class="note">+ confirm-email/{code} — подтверждение почты; вероятно ручная модерация</div></div>',
  topbar='Fimex'))

portal.append(desktop_screen('p-stock','Stock','/dashboard/supplier/stock · API: supplier/pricelist/fetch-list, products/* · Pusher: stock_provider_{id} ⚠public',
  '<div class="bar">'+btn('+ Add GOODS',True)+btn('Add Stock')+field('Search / IMEI-SN')+'</div>'
  + table(['Code','Description of Goods','Q-ty','Price','Available at','Actions'])
  + '<div class="blocks">'+block('Empty state','«Your Stock is empty» / «Add goods that are in stock to receive orders from customers»')+block('Did not find product you need?','create-proposed')+'</div>'
  + '<div class="note">Мутации: update-price, update-qty, update-available-at, clear. Лента обновлений приходит по публичному каналу stock_provider_{id}</div>',
  paside('Stock'), topbar='Fimex Supplier'))

portal.append(desktop_screen('p-orders','Orders / Packing List','/dashboard/supplier(/) · API: orders/seen, orders/fix-quantity, purchase-statment/fetch-orders',
  '<div class="bar">Filters: Date · Status · Brand · Category</div>'
  + table(['Order №','Date','Description of Goods','Brand','Category','Model','IMEI','Q-ty','Price','Tax','Penalty','Status','Total:'])
  + '<div class="blocks">'+block('Invoice')+block('Purchase order')+block('Balance: Debit / Credit / $ Amount / Penalty')+'</div>',
  paside('Orders'), topbar='Fimex Supplier'))

portal.append(desktop_screen('p-p2p','P2P','/dashboard/supplier/p2p · API: p2p/approve/{id}, p2p/offer-price/{id}',
  '<div class="bar">Filters · Time</div>'
  + table(['Bid','Product','Current offer','My price','Q-ty','Status','Actions'])
  + '<div class="blocks">'+block('offer-price/{id}','предложить цену')+block('approve/{id}','подтвердить')+'</div>'
  + '<div class="note">Pusher: private-supplier-handler-channel-{id} → refresh-p2p, broadcast-orders</div>',
  paside('P2P'), topbar='Fimex Supplier'))

portal.append(desktop_screen('p-stat','Statistic','/dashboard/supplier/statistic',
  '<div class="bar">Filters · Time · CLEAR</div>'
  + '<div class="blocks">'+block('Sales chart')+block('Top products')+block('Totals')+'</div>',
  paside('Statistic'), topbar='Fimex Supplier'))

portal.append(desktop_screen('p-service','Service','/dashboard/supplier/service',
  table(['Order №','IMEI/Serial','Description','Status','Date','Actions']),
  paside('Service'), topbar='Fimex Supplier'))

portal.append(desktop_screen('p-settings','Settings / Profile / Members','API: supplier/profile/*, members/*',
  '<div class="modal" style="width:640px"><h4>Profile</h4><div class="grid g2">'
  + field('Company Name')+field('Email')+field('Phone')+field('Avatar')
  + '</div>'+btn('Change Email')+btn('Change Password')+btn('update-working-day')+'</div>'
  + '<div class="modal" style="width:640px"><h4>CORPORATE ACCESS — Add your team</h4>'
  + table(['Member','Email','Access: Full Access / Limited','Manage products (toggle)','Actions'])
  + btn('Add Member',True)+btn('Invite User')+'<div class="note">Active till · License · members/toggle-manage-products/{id}</div></div>'
  + '<div class="blocks">'+block('payment-info/fetch-list')+block('profile/preview-disable')+block('send-code / change-email')+'</div>',
  paside('Settings'), topbar='Fimex Supplier'))

# ============================= iOS APP =============================
IOS_TABS = ['Каталог','Заказы','P2P','Уведомления','Профиль']
ios = []

ios.append(mobile_screen('i-login','Логин','app-api: auth/check-email → auth/login · x-app-access header',
  '<div class="content" style="justify-content:center">'+field('Email')+field('Пароль')+btn('Войти',True)+'<div class="note">check-email: {"exist":true} → пароль</div></div>'))

ios.append(mobile_screen('i-paywall','Подписка (paywall)','IAP: Fimex Monthly 7 990 ₽ / Fimex Yearly 44 990 ₽',
  '<div class="content" style="justify-content:center">'+block('Fimex Monthly','7 990 ₽ / мес')+block('Fimex Yearly','44 990 ₽ / год')+btn('Оформить',True)+'<div class="note">fi_company_license_expired_title: «Срок лицензии вашей компании истек»</div></div>'))

ios.append(mobile_screen('i-catalog','Каталог — категории','catalog/fetch-categories · fetch-popular-subcategories',
  '<div class="bar">Popular</div>'
  + '<div class="grid g2" style="padding:10px">'+''.join(block(c) for c in ['iPhone','iPad','MacBook','Watch','AirPods','…'])+'</div>',
  IOS_TABS, 'Каталог'))

ios.append(mobile_screen('i-subcat','Подкатегории','catalog/fetch-subcategories?id_category=',
  '<div class="bar">iPhone</div>'
  + '<div class="content">'+''.join(block(c) for c in ['iPhone 18 Pro Max','iPhone 18 Pro','iPhone 18','…'])+'</div>'
  + '<div class="note">choose_parameters_ru: «Выберите объем памяти и цвет»</div>',
  IOS_TABS, 'Каталог'))

ios.append(mobile_screen('i-pricelist','Прайс-лист товара','catalog/fetch-pricelist · fetch-pricelist-percents · qty-filter',
  '<div class="bar">Фильтры: qty (1/5/20/50/100) · % наценки (0.25…3)</div>'
  + '<div class="content">'
  + block('iPhone 18 Pro Max 512Gb Glacier','MJWC4 LL/A · stock 8 · от 1 234 $ · сроки поставки')
  + block('…','range_qty / stock_qty / total_qty / char_filter')
  + '<div class="note">3.34.0: товары с разными сроками отгрузки — заранее дешевле</div></div>',
  IOS_TABS, 'Каталог'))

ios.append(mobile_screen('i-order-detail','Детали заказа (OrderDetailViewController)','экран из констант; statuses: my-orders/statuses',
  '<div class="content">'+block('Заказ QF75CR88','F:10059 · logistics: MG XPORTS FZCO')+block('Статус','Ожидает сборки / Выдан … (цветные бейджи)')+block('Товары','qty 16 · 14 320 $')+block('pickup_at / checkpoint_at')+'</div>',
  IOS_TABS, 'Заказы'))

ios.append(mobile_screen('i-cart','Корзина','profile/my-orders/cart → {total_qty, discounted, preorders}',
  '<div class="content">'+block('Preorder','товары с qty')+block('Discounted')+btn('Оформить',True)+'</div>',
  IOS_TABS, 'Заказы'))

ios.append(mobile_screen('i-orders','Мои заказы','profile/my-orders/ · issued-orders',
  '<div class="bar">Фильтр по статусам</div>'
  + '<div class="content">'+block('Текущие preorders')+block('Issued orders (выданные)')+block('Собственные накладные','3.34.0: создавайте и называйте свои накладные')+'</div>',
  IOS_TABS, 'Заказы'))

ios.append(mobile_screen('i-p2p','P2P-ставки','profile/p2p-bids/ · approved-bids',
  '<div class="content">'+block('Текущие ставки','{data:[]}')+block('Одобренные','approved-bids')+'</div>',
  IOS_TABS, 'P2P'))

ios.append(mobile_screen('i-notif','Уведомления','profile/notifications/count-unread',
  '<div class="content">'+block('Список уведомлений')+'</div>',
  IOS_TABS, 'Уведомления'))

ios.append(mobile_screen('i-profile','Профиль','profile/user · logistics · wholesales · qty-filter',
  '<div class="content">'
  + block('Пользователь / компания')
  + block('Способ оплаты (wholesales)','Cash / Online … · wholesales/update')
  + block('Логистика','logistics/fetch-logistics — 3.32.0: синхронизация логистов')
  + block('Фильтр количеств','fetch-qty-filter: 1/5/20/50/100')
  + block('Команда','до 5 участников (3.34.0, corporate)')
  + block('Статистика брендов','statistics/brands')
  + block('Чат поддержки')
  + '</div>',
  IOS_TABS, 'Профиль'))

# ============================= WRITE PAGES =============================
apps = [('Admin SPA','admin.html'),('Портал поставщика','supplier.html'),('iOS app','ios.html'),('Лендинг','supplier.html#p-landing')]
def write(fname, title, screens, extra_css=''):
    import re as _re
    # нумеруем экраны
    n = [0]
    def _num(m):
        n[0] += 1
        return m.group(1) + f'<span class="num">{n[0]:02d}</span>'
    screens = _re.sub(r'(<div class="screentitle">)', _num, screens)
    ids = _re.findall(r'class="screen" id="([^"]+)">\s*<div class="screentitle">(?:<span[^>]*>[^<]*</span>)?([^<]+)<', screens)
    navs = [(i, t.strip()) for i, t in ids]
    html_out = page(title, f'<h1 class="pagetitle" style="padding:0 24px">{esc(title)}</h1>' + screens, apps, navs, here=fname)
    open(os.path.join(OUT, fname), 'w').write(html_out)
    print(fname, 'ok,', len(navs), 'screens')

write('admin.html', 'Admin SPA (admin/app/front.fimex.ae)', '\n'.join(admin))
write('supplier.html', 'Портал поставщика (fimex.ae)', '\n'.join(portal))
write('ios.html', 'iOS app Fimex (fzco.fimex.app)', '\n'.join(ios))

# index
n_admin = sum(1 for _ in admin); n_portal = sum(1 for _ in portal); n_ios = sum(1 for _ in ios)
idx = f'''
<h1 class="pagetitle" style="padding:0 24px">Fimex.ae — wireframes приложений</h1>
<div class="pagemeta" style="padding:0 24px">Реконструировано из продакшн-бандлов 06.11.2026 · реальные роуты, табы, колонки таблиц и лейблы · не является официальным дизайном Fimex</div>
<div style="padding:0 24px">
<div class="cardrow">
  <div class="card"><h3>Admin SPA</h3><div class="cmeta">admin / app / front.fimex.ae · React + Vite</div>
    <ul><li>{n_admin} экранов</li><li>Preorder: 8 вкладок (закупки, продажи, P2P…)</li><li>Settings: 18 разделов</li><li>279 API-роутов</li></ul>
    <a class="btn primary" href="admin.html">Открыть →</a></div>
  <div class="card"><h3>Портал поставщика</h3><div class="cmeta">fimex.ae/dashboard · Next.js 16</div>
    <ul><li>{n_portal} экранов</li><li>Лендинг + регистрация поставщика</li><li>Stock / Orders / P2P / Statistic</li><li>Корпоративные участники</li></ul>
    <a class="btn primary" href="supplier.html">Открыть →</a></div>
  <div class="card"><h3>iOS app «Fimex»</h3><div class="cmeta">fzco.fimex.app · App Store id6444686382</div>
    <ul><li>{n_ios} экранов</li><li>Подписка 7 990 ₽/мес · 44 990 ₽/год</li><li>Каталог → прайс-лист → заказы</li><li>P2P-ставки, чат поддержки</li></ul>
    <a class="btn primary" href="ios.html">Открыть →</a></div>
</div>
<h2 class="w" style="margin-top:22px">Архитектура</h2>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin:12px 0">
  <div style="flex:1;min-width:180px;border:1px solid #d5d8e0;background:#fff;border-radius:8px;padding:12px;font-size:11px"><b>Admin SPA</b><br>admin / app / front.fimex.ae<br>React + Vite, Bearer JWT</div>
  <div style="flex:1;min-width:180px;border:1px solid #d5d8e0;background:#fff;border-radius:8px;padding:12px;font-size:11px"><b>Портал поставщика</b><br>fimex.ae/dashboard<br>Next.js 16, RTK Query</div>
  <div style="flex:1;min-width:180px;border:1px solid #d5d8e0;background:#fff;border-radius:8px;padding:12px;font-size:11px"><b>iOS app «Fimex»</b><br>нативное, Alamofire<br>x-app-access + JWT</div>
</div>
<div style="text-align:center;color:#9aa0ac;font-size:18px;line-height:1">↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓</div>
<div style="border:1px solid #c3c9f5;background:#eef1ff;border-radius:8px;padding:12px;font-size:11px;margin:8px 0"><b>api.fimex.ae</b> — Laravel (PHP 8.2) за DDoS-Guard<br><span style="font-family:ui-monospace,Menlo,monospace">/api/v1/admin/* (279 роутов) · /api/v1/supplier/* + /api/auth/* · /app-api/v1/* · /api/broadcasting/auth</span></div>
<div style="border:1px solid #d5d8e0;background:#fff;border-radius:8px;padding:12px;font-size:11px;margin:8px 0"><b>Pusher (ws-eu, app key 8ad086…)</b><br>⚠ public: admin-warehouse · admin-handler-channel · stock_provider_{id} &nbsp;&nbsp;|&nbsp;&nbsp; ✓ private: admin-preorder-{id} · supplier-handler-channel-{id}</div>
<h2 class="w" style="margin-top:26px">Как читать wireframes</h2>
<div class="legend">
  <div class="litem"><div class="ldemo"><span style="font-family:'Bebas';font-size:16px"><span style="color:var(--acc);font-size:11px">01</span> НАЗВАНИЕ ЭКРАНА</span><br><span class="note" style="margin-top:2px">api/v1/admin/route → данные</span></div><div class="lcap">Заголовок экрана со сквозным номером. Моноширинная строка под ним — реальные API-роуты и источник данных, найденные в бандле.</div></div>
  <div class="litem"><div class="ldemo"><span class="tab active">Вкладка</span><span class="tab">Ещё одна</span></div><div class="lcap">Табы / вкладки экрана. Активная подсвечена синим. Названия взяты из i18n-словарей приложения.</div></div>
  <div class="litem"><div class="ldemo"><table class="table"><tr><th>ID</th><th>Статус</th><th>Сумма</th></tr><tr><td>…</td><td>…</td><td>…</td></tr></table></div><div class="lcap">Таблица: показаны реальные колонки из кода (порядок и названия). «…» в ячейках — данные.</div></div>
  <div class="litem"><div class="ldemo"><div class="block" style="min-height:34px"><b>Блок</b>контент</div></div><div class="lcap">Пунктирный блок — контентная область: карточка, список, форма. Подпись внутри — что там находится.</div></div>
  <div class="litem"><div class="ldemo"><span class="btn primary">Главное действие</span><span class="btn">Вторичное</span></div><div class="lcap">Кнопки: синяя — основное действие экрана, серая — вторичное.</div></div>
  <div class="litem"><div class="ldemo"><span class="chip">фильтр</span><span class="chip">статус</span></div><div class="lcap">Чипы — фильтры, статусы, быстрые переключатели.</div></div>
  <div class="litem"><div class="ldemo"><span class="note">3.34.0: поле range_qty · choose_parameters_ru</span></div><div class="lcap">Серая моноширинная приписка — деталь из кода: версия приложения, имена полей, ключи локализации.</div></div>
  <div class="litem"><div class="ldemo" style="display:flex;gap:10px;align-items:flex-end"><div style="width:34px;height:64px;border:1.5px solid #c3c9f5;border-radius:6px;background:#eef1ff"></div><div style="width:74px;height:52px;border:1.5px solid #c3c9f5;border-radius:6px;background:#eef1ff"></div></div><div class="lcap">Рамка устройства: узкая высокая (402×874) — экран iOS с таббаром внизу; широкая (1280×800) — веб-экран.</div></div>
  <div class="litem"><div class="ldemo"><div class="sidebar" style="width:110px;padding:6px"><div class="item active" style="padding:3px 8px">Раздел</div><div class="item" style="padding:3px 8px">Раздел</div></div></div><div class="lcap">Сайдбар внутри рамки — меню разделов приложения; активный пункт подсвечен.</div></div>
  <div class="litem"><div class="ldemo" style="font-size:11px;color:var(--dim)">⚠ public-канал &nbsp;·&nbsp; ✓ private-канал</div><div class="lcap">Пометки безопасности: ⚠ — находка из аудита (.dev/fimex/AUDIT.md), требует внимания.</div></div>
</div>
<div class="note">Источники: .dev/fimex/STRUCTURE.md · SCREENS.md · AUDIT.md · site-recon/ (бандлы и инвентари)</div>
</div>'''
open(os.path.join(OUT,'index.html'),'w').write(page('Обзор', idx, apps, [], here='index.html'))
print('index.html ok')
