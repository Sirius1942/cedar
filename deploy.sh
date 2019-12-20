#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build:prod

# # 进入生成的文件夹
# cd /dist
# 如果发布到 https://<USERNAME>.github.io
#git push -f git@github.com:Sirius1942/Agaveworkspace.github.io.git master:gh-pages

# 如果发布到 https://<USERNAME>.github.io/<REPO>
#git push -f git@github.com:sirius1942/Agaveworkspace.github.io.git master:gh-pages

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
cd /Users/sirius/Documents/06code/vueprod
rm -rf *
cp -r /Users/sirius/Documents/06code/Agave001/cedar/dist/. /Users/sirius/Documents/06code/vueprod
git init
git add -A
git commit -m 'deploy'
git push -u origin master

cd -