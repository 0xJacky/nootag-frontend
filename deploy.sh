#!/bin/bash

# echo "正在上传项目资源文件"
# ./ossutil cp -rf ./dist/ oss://ibeta-frontend/

# echo "正在上传 404 页面"
# ./ossutil cp -f ./404.html oss://ibeta-frontend/

echo "正在上传项目资源文件"
scp -r dist/* root@uozi:/home/wwwroot/alpha.ibeta.me

echo "正在上传 404 页面"
scp -r 404.html root@uozi:/home/wwwroot/alpha.ibeta.me
