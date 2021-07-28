# client

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 実装について

## api.countrystatecity.in からのデータ取得について

やり方は以下の 2 つあるように思えたが、今回は、

- 一度読み込んだらその値は変化しないので computed である必要はない

という観点で 『2』 の実装にする

1. computed + Vuex<br> この実装方法だと、Vuex の Store に非同期処理を実装し、その結果が返ってきたら Store の state が更新されてその更新をキャッチして computed が走り html の方にデータが渡る（store の state が依存している値なので非同期処理でそれが変化するタイミングで computed が走る）
1. data<br> この実装方法だと、ライフサイクルフックの created・updated に非同期処理を実装しその結果を data に代入する事で、html の方にデータを渡す（Vuex とか他の仕組みを使わない方法）

## 実装時に参考にしたもの

### Validation の実装

- [Vue.js で computed に引数を渡す方法](https://qiita.com/wataru65818460/items/f38898236512f654df4c)<br>vee-validate の slot props の値を使った computed を実装する際に参考になった

- [Validate Before Submit](https://vee-validate.logaretm.com/v3/guide/forms.html#validate-before-submit)<br>vee-validate での Form submit 時のバリデーションを実装する際に参考になった

### Suggetion の実装

`api.countrystatecity.in`から非同期でデータ取得をするので、 **Vuex の仕組み** + **computed** で`<datalist>`にデータを渡すように実装

- [HTML5 の autocomplete 属性を使う](https://www.sukerou.com/2019/05/vuejs3.html#toc_headline_1)<br>最もシンプルでライブラリに依存しないので良さげ<br>※autocomplete 属性は iOS で未対応なのが欠点

- [人気なのは vue-simple-suggest らしい](https://github.com/KazanExpress/vue-simple-suggest)
