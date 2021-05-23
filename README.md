# Project Instructions

# Table of Contents

- [Explain](#Explain)
- [function](#function)
- [technology](#technology)

# Explain

## how to install

This project uses `dotenv`, so you should create `.env` file and file contains below key.<br>
This file is not provided via the project files so create it manually in the project root.

- GEO_NAME_USERNAME : https://www.geonames.org/
- WAETHERBIT_API_KEY : https://www.weatherbit.io/
- PIXABAY_API_KEY : https://pixabay.com/
- COUNTRYSTATECITY_API_KRY : https://countrystatecity.in/

# function

## basic tech

- responsive layout (bootstrap)

## Unique to this Project

- Select a country / city by suggestion<br>国・都市をサジェストで選択
- Draw Return from AIX API on screen<br>Pixabay API からの Return を画面に描画
- Display current weather / 16-day forecast with icon on card component<br>現在の天気・16 日間予報をアイコンと共にカードコンポーネントで表示
- The display changes based on the departure date<br>出発日に基づいて表示が変わる
- If you search by city name and do not hit, return the Agilent API searched by country name<br>都市名で検索してヒットしない場合、国名で検索した Pixabay API を返す
  - If you are viewing the results of a search by country name, alert you with a message to that effect<br>国名で検索した結果を表示している場合は、その旨をメッセージでアラートする
- Display "Submiting" while loading<br>読み込み中は「Submiting」と表示する
- You can enter the end date and display the length of the trip from the departure date to the end date<br>終了日を入力でき、出発日～終了日までの旅行の長さを表示

# FIXME

1. ~~サジェストを Web API (https://countrystatecity.in/) からのデータ取得に変更する~~
1. pixabay api でデータがヒットしないかった時に描画する img を用意しそれを描画するようにする
1. ~~Card コンポーネントのデザインをよくする~~
1. ~~リファクタ：コンポーネントを共通化して、複数の旅リストを追加できるようにする~~
1. リファクタ：国を変更した際に、都市にサジェストされるものも更新されるようにする
1. エラーハンドリング
   1. a

# technology

## front end

- Vanilla Javascript
- HTML5
- Sass(CSS) and bootstrap5

## server side

- node.js(Express)
