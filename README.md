# Fimex.ae — wireframes приложений

Реконструкция экранов по продакшн-бандлам (06.11.2026). 4 приложения, 52 экрана:
Admin SPA (32) · Портал поставщика (9) · iOS app (11) · обзорная страница.

## Публикация на GitHub Pages

```bash
# 1. Создать пустой репозиторий, например fimex-wireframes, затем:
git init -b main
git add .
git commit -m "Fimex wireframes"
git remote add origin git@github.com:<you>/fimex-wireframes.git
git push -u origin main

# 2. GitHub → Settings → Pages → Source: Deploy from a branch → main / (root) → Save
# 3. Через ~1 минуту сайт доступен: https://<you>.github.io/fimex-wireframes/
```

Файл `.nojekyll` отключает Jekyll-обработку — все страницы отдаются как есть.
Шрифты (Bebas Neue, DIN Next) лежат локально в `assets/fonts/`.
