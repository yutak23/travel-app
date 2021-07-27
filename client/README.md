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

## 実装時に参考にしたもの

### Validation の実装

- [Vue.js で computed に引数を渡す方法](https://qiita.com/wataru65818460/items/f38898236512f654df4c)<br>vee-validate の slot props の値を使った computed を実装する際に参考になった

- [Validate Before Submit](https://vee-validate.logaretm.com/v3/guide/forms.html#validate-before-submit)<br>vee-validate での Form submit 時のバリデーションを実装する際に参考になった

### Suggetion の実装

`api.countrystatecity.in`から非同期でデータ取得をするので、 **Vuex の仕組み** + **computed** で`<datalist>`にデータを渡すように実装

- [HTML5 の autocomplete 属性を使う](https://www.sukerou.com/2019/05/vuejs3.html#toc_headline_1)<br>最もシンプルでライブラリに依存しないので良さげ<br>※autocomplete 属性は iOS で未対応なのが欠点

- [人気なのは vue-simple-suggest らしい](https://github.com/KazanExpress/vue-simple-suggest)
