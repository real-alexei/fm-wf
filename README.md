# Fimex — интерактивный прототип платформы

Статический кликабельный прототип платформы [fimex.ae](https://fimex.ae) — B2B-маркетплейса техники
из Дубая. Собран по результатам исследования production-бандлов, мобильного трафика и публичных
страниц: админ-панель, портал поставщика, iOS-приложение и публичный сайт.

**Все данные вымышленные.** Структура экранов, поля и подписи — реконструкция по реальным
артефактам. Это не официальный продукт Fimex.

## Что внутри

| Файл | Приложение |
|---|---|
| `index.html` | Карта платформы — точка входа |
| `about.html` | Как это выяснено: хосты, API, realtime-каналы, инвентарь экранов |
| `provenance.html` | Провенанс: что подтверждено, что выведено, что добавлено в прототипе |
| `admin.html` | Админ-панель: чат, продажи/закупки (8 табов), сервис |
| `admin-catalog.html` | Админ-панель: каталог и настройки |
| `admin-company.html` | Админ-панель: страны, клиенты, поставщики, касса, валюты, логистика, гарантии |
| `supplier.html` | Портал поставщика: Stock, Orders, Packing List, P2P, Service, Statistic, Settings |
| `ios.html` | iOS-приложение «Fimex» в рамке телефона |
| `landing.html` | Публичный сайт fimex.ae |
| `assets/` | Общие стили, JS-хелперы, демо-данные, логотип |

Без сборки, без зависимостей и без сервера: чистые HTML/CSS/JS. Открывается двойным кликом
по `index.html` или с GitHub Pages. Шрифты DIN Next W1G и Bebas Neue лежат локально в
`assets/fonts/`; Inter и Barlow подгружаются с Google Fonts как fallback — без сети
используются системные шрифты.

## Публикация на GitHub Pages

### Вариант 1 — отдельный репозиторий (проще всего)

```bash
cd .dev/fimex/prototype
git init
git add .
git commit -m "Fimex platform prototype"
git branch -M main
git remote add origin git@github.com:<ваш-логин>/<имя-репозитория>.git
git push -u origin main
```

Затем в GitHub: **Settings → Pages → Build and deployment → Deploy from a branch →
Branch: `main`, folder: `/ (root)` → Save**. Через минуту сайт будет доступен по адресу
`https://<ваш-логин>.github.io/<имя-репозитория>/`.

### Вариант 2 — папка в существующем репозитории

Если прототип лежит в подпапке репозитория (например `fimex-prototype/`), включите Pages для
ветки и папки: **Settings → Pages → Branch: `main`, folder: `/docs`** — проще всего скопировать
содержимое этой папки в `docs/` основного репозитория.

### Вариант 3 — GitHub Actions

Добавьте в репозиторий workflow, который публикует содержимое папки как artifact:

```yaml
name: Deploy prototype
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: prototype   # путь к этой папке в репозитории
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Локальный просмотр

```bash
cd prototype
python3 -m http.server 8080
# http://127.0.0.1:8080
```

Ссылки используют hash-навигацию, поэтому работают и через `file://`:
`admin.html#preorder`, `admin-catalog.html#chars.settings`… Открывать лучше `index.html`.

## Условные обозначения

- `public ⚠` / `private ✓` — реальные Pusher-каналы из исследования; публичные читаются без
  авторизации по ключу из клиентского бандла.
- Все компании, люди, e-mail, лицензии, номера заказов, цены и остатки в прототипе **вымышлены**.
  Из исследования взяты только структура, подписи и характер данных. Точный разбор источников каждого экрана и списка добавленных блоков — в `provenance.html`.
