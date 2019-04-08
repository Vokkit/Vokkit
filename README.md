# Vokkit
웹 브라우저로 접속할 수 있는 복셀 서버

voxel server launcher accessed via a web browser

## How to build
`npm run build` 또는 `npm run watch`를 이용하십시오. (webpack을 사용합니다.)

use `npm run build` or `npm run watch` (webpack build)

클라이언트는 서버를 실행할 때마다 자동으로 빌드됩니다.

Client will be automatically built when the server starts.

## Plugin
플러그인은 `src` 폴더가 아닌 `build` 폴더를 `require` 해야 합니다. 추후에 개발 환경을 제작할 예정입니다.

Plugins should `require` `build` folder, not `src` folder. We're going to make development environment for Vokkit plugin.
