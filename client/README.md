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

## データ取得の Mock 化

サーバサイドがない状態（フロントエンドだけ）で実装を進める事を想定し、Web API を Mock 化して実装を進める

# 実装時に参考にしたもの

## Validation の実装

- [Vue.js で computed に引数を渡す方法](https://qiita.com/wataru65818460/items/f38898236512f654df4c)<br>vee-validate の slot props の値を使った computed を実装する際に参考になった

- [Validate Before Submit](https://vee-validate.logaretm.com/v3/guide/forms.html#validate-before-submit)<br>vee-validate での Form submit 時のバリデーションを実装する際に参考になった

## Suggetion の実装

`api.countrystatecity.in`から非同期でデータ取得をするので、 **Vuex の仕組み** + **computed** で`<datalist>`にデータを渡すように実装

- [HTML5 の autocomplete 属性を使う](https://www.sukerou.com/2019/05/vuejs3.html#toc_headline_1)<br>最もシンプルでライブラリに依存しないので良さげ<br>※autocomplete 属性は iOS で未対応なのが欠点

- [人気なのは vue-simple-suggest らしい](https://github.com/KazanExpress/vue-simple-suggest)

## Translate の実装

基本的には AWS SDK を使う時には、`AWS.config`に色々設定をする必要があるが、以下の 3 つについては環境変数で定義しておけば自動的にそれを使ってくれる<br>
[SDK バージョン 3 開発者ガイド　環境変数から Node.js への認証情報のロード](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/loading-node-credentials-environment.html)

| AWS.config の Key | 環境変数の Key        | 説明                                                                   |
| ----------------- | --------------------- | ---------------------------------------------------------------------- |
| accessKeyId       | AWS_ACCESS_KEY_ID     | your AWS access key ID                                                 |
| secretAccessKey   | AWS_SECRET_ACCESS_KEY | your AWS secret access key                                             |
| sessionToken      | AWS_SESSION_TOKEN     | (AWS.Credentials) the optional AWS session token to sign requests with |

```js
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Translate.html
AWS.config.apiVersions = {
  translate: "2017-07-01",
  accessKeyId: xxxxxxxxxx,
  secretAccessKey: xxxxxxxxxx,
  // sessionToken: xxxxxxxxxx
};

var translate = new AWS.Translate();
```

AWS SDK をインストールするが、v3 からはそれぞれの client で分割されているので、必要なものをインストールするようにする<br>
client 一覧は[ここを参照](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)

今回は translate なので[これ](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-translate/index.html)

フロントエンド（Vue 側）で`@aws-sdk/client-translate`をインストールして、`TranslateTextCommand`とかを使ってみようとしたが、Vue の公式に以下のような記述があり、**環境変数に秘密キーを含めてはダメ（静的にバンドルされるので）** と書かれているので、サーバサイド側でやる事に切り替える・・・

> **WARNING**<br>
> Do not store any secrets (such as private API keys) in your app!（アプリにシークレット（秘密の API キーなど）を保存しないでください！）<br>
> Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.（環境変数はビルドに埋め込まれています。つまり、アプリのファイルを調べることで、誰でも環境変数を表示できます。）

ちなみに、上記の事から以下のように、Vue では環境変数の内、誤って秘密キーを読み込まないように`NODE_ENV, BASE_URL, VUE_APP_というprefixが付いたもの`だけしか読み込まれない仕組みになっている<br>

> Note that only NODE*ENV, BASE_URL, and variables that start with VUE_APP* will be statically embedded into the client bundle with webpack.DefinePlugin. It is to avoid accidentally exposing a private key on the machine that could have the same name.（NODE * ENV、BASE_URL、および VUE_APP *で始まる変数のみが、webpack.DefinePlugin を使用してクライアントバンドルに静的に埋め込まれることに注意してください。 同じ名前の可能性のある秘密鍵をマシン上で誤って公開しないようにするためです。）

AWS.config では環境変数を credentials として自動で読み込んでくれるが、上記の制約上`AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY`は読み込まれない対象になる・・・

※API リファレンス
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Translate.html#translateText-property
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-translate/classes/translatetextcommand.html
https://docs.aws.amazon.com/translate/latest/dg/API_TranslateText.html
