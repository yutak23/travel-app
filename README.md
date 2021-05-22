# Project Instructions

## Table of Contents

- [Explain](#Explain)
- [function](#function)
- [technology](#technology)

## Explain

### how to install

this project uses `dotenv`, so you should create `.env` file and file contains below key.

- GEO_NAME_USERNAME : https://www.geonames.org/
- WAETHERBIT_API_KEY : https://www.weatherbit.io/
- PIXABAY_API_KEY : https://pixabay.com/
- COUNTRYSTATECITY_API_KRY : https://countrystatecity.in/

## function

- 国・都市をサジェストで選択できるようにした
- Pixabay API からの Return を画面に描画する
- 現在の天気・16 日間予報をアイコンと共にカードコンポーネントで表示できるようにした

## ToDo

1. ~~サジェストを Web API (https://countrystatecity.in/) からのデータ取得に変更する~~
1. pixabay api でデータがヒットしないかった時に描画する img を用意しそれを描画するようにする
1. ~~Card コンポーネントのデザインをよくする~~
1. エラーハンドリング
   1. a

## technology

### front end

- Vanilla Javascript
- HTML5
- Sass(CSS) and bootstrap5

### server side

- node.js(Express)
