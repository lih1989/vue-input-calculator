#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
echo Build Library...
npm run build

echo Build Demo...
npm run build-demo

# переход в каталог сборки
cd demo

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

echo Публикация...
git init
git add -A
git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:lih1989/vue-input-calculator.git master:gh-pages

cd -
