# AWS Lambda 構築備忘録

## AWS アカウントを作成する

自分のルートアカウントを作成

## AWS のアクセスキーを作成する

新規で Lambda・API Gateway の Deploy を行う IAM ユーザを作成する
この時以下の 5 つの権限を付与する。

- AmazonS3FullAccess
- CloudWatchLogsFullAccess
- AmazonAPIGatewayAdministrator
- AWSCloudFormationFullAccess
- AWSLambda_FullAccess
- IAMFullAccess<br>これないと以下のエラー出る<br>An error occurred: IamRoleLambdaExecution - API: iam:CreateRole User: arn:aws:iam::xxxxxxxxxxxxuser/serverless-travel-app is not authorized to perform: iam:CreateRole on resource: arn:aws:iam::xxxxxxxxxxxx:role/example-dev-ap-northeast-1-lambdaRole.

※IAMFullAccess の代わりにインラインポリシーを付ける方法もあり、それは[ここ](https://qiita.com/akki-memo/items/91b5255efa16b9b3f84a#%E6%A8%A9%E9%99%90%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%97%E3%81%A6%E3%82%82%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%8C%E5%87%BA%E3%82%8B%E5%A0%B4%E5%90%88)を参照

## AWS CLI をインストールする

https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

## AWS プロファイルを作成する

`aws configure`コマンドで profile を作成する

```
$ aws configure
AWS Access Key ID [None]: xxxxxxxxxx
AWS Secret Access Key [None]: xxxxxxxxxx
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

## AWS Lambda 用の handler を作成する（lambda.js）

https://github.com/vendia/serverless-express#minimal-lambda-handler-wrapper

```js
// lambda.js
const serverlessExpress = require("@vendia/serverless-express");
const app = require("./app");
exports.handler = serverlessExpress({ app });
```

## deploy する

成功すると、以下のように`endpoints:`の情報が log に出力される

```bash
$ npx serverless deploy

Serverless: Configuration warning at 'functions.exampleFunction.events[1].http': value 'ANY {proxy+}' does not satisfy pattern /^(?:\*|(GET|POST|PUT|PATCH|OPTIONS|HEAD|DELETE|ANY) (\/\S*))$/i
Serverless:
Serverless: Learn more about configuration validation here: http://slss.io/configuration-validation
Serverless:
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service example.zip file to S3 (961.38 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: example
stage: dev
region: ap-northeast-1
stack: example-dev
resources: 12
api keys:
  None
endpoints:
  ANY - https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev
  ANY - https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/{proxy+}
functions:
  exampleFunction: example-dev-exampleFunction
layers:
  None
Serverless: Deprecation warnings:

Starting with next major, Serverless will throw on configuration errors by default. Adapt to this behavior now by adding "configValidationMode: error" to service configuration
More Info: https://www.serverless.com/framework/docs/deprecations/#CONFIG_VALIDATION_MODE_DEFAULT

Support for "package.include" and "package.exclude" will be removed with next major release. Please use "package.patterns" instead
More Info: https://www.serverless.com/framework/docs/deprecations/#NEW_PACKAGE_PATTERNS

Resolution of lambda version hashes was improved with better algorithm, which will be used in next major release.
Switch to it now by setting "provider.lambdaHashingVersion" to "20201221"
More Info: https://www.serverless.com/framework/docs/deprecations/#LAMBDA_HASHING_VERSION_V2


**************************************************************************************************************************************
Serverless: Announcing Metrics, CI/CD, Secrets and more built into Serverless Framework. Run "serverless login" to activate for free..
**************************************************************************************************************************************
```

## ローカル開発と Lambda の使い分け

ローカル開発時は`npm run start`で `local.js` で Server を起動し localhost:8081 で listen する

## 参考文献

[AWS Lambda へのデプロイ](https://slack.dev/bolt-js/ja-jp/deployments/aws-lambda#aws-lambda-%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)<br>
[【2021 年 6 月最新版】Express を serverless で API Gateway から Lambda を使って Web API を使用する方法](https://qiita.com/akki-memo/items/91b5255efa16b9b3f84a)

# トラブルシューティングの log

## serverless deploy で iam のエラー

### 事象

`npx serverless deploy`を実行した時に IAM の`iam:CreateRole`がないと言われた

> An error occurred: IamRoleLambdaExecution - API: iam:CreateRole User: arn:aws:iam::xxxxxxxxxxxxuser/serverless-travel-app is not authorized to perform: iam:CreateRole on resource: arn:aws:iam::xxxxxxxxxxxx:role/example-dev-ap-northeast-1-lambdaRole.

### 解決

IAMFullAccess をアタッチする<br>
※これ（IAMFullAccess） の代わりに[インラインポリシーを付ける方法](https://qiita.com/akki-memo/items/91b5255efa16b9b3f84a#%E6%A8%A9%E9%99%90%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%97%E3%81%A6%E3%82%82%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%8C%E5%87%BA%E3%82%8B%E5%A0%B4%E5%90%88)もある

## API Gateway の log が見れない

### 解決

API Gateway・AWS Lambda の組み合わせであれば、`CloudWatch > Log groups > /aws/lambda/<API名>-<Lambda Function名>`で見れる

## API Gateway の endpoint にアクセスして 502 エラー

### 事象

https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev にアクセスすると 502 エラーになってしまう

### 解決

`serverless.yml`の`functions_exampleFunction_handler:`のパスが間違っていた<br>
serverless.yml から見てどこにあるのか？を絶対パスで指定<br>

```
NG だったパスの書き方 : `lambda.handler`
OK だったパスの書き方 : `src/server/lambda.handler`
```

## API Gateway の endpoint にアクセスして 401 エラー

### 事象

https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/allCountries にアクセスすると 401 エラーになってしまう（endpoint としては合っているが認証でエラーになっている）

> {"error":{"error":"Unauthorized. You shouldn't be here."},"errorMsg":"Request failed with status code 401"}

### 問題の切り分け log

Lambda 内で 別の API を Call する（axios）のがダメっぽい？<br>
https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/users -> 200<br>
https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/allCountries -> 401

_router/index.js_

```
router.get('/allCountries', controller.allCountries)
router.get('/users', controller.users);
```

_controller/index.js_

```js
const users = (req, res) => {
  res.status(200).send([{ name: "Taro" }, { name: "Hanako" }]);
};

// config for get countries and cities
const axiosConfig = {
  baseURL: "https://api.countrystatecity.in/v1/",
  timeout: 3000,
  headers: { "X-CSCAPI-KEY": `${process.env.COUNTRYSTATECITY_API_KRY}` },
};

const allCountries = async (req, res) => {
  try {
    const countries = await axios.get("countries", axiosConfig);
    res.status(200).send({ countries: countries.data });
  } catch (error) {
    errorHandler(res, error);
  }
};
```

と思ったが、Lambda ないで Call している API `https://api.countrystatecity.in/v1/` には`X-CSCAPI-KEY`が必要で`process.env.COUNTRYSTATECITY_API_KRY`で渡しているがそれが undefined とかになっているのでは・・・？

```js
console.log("COUNTRYSTATECITY_API_KRY", process.env.COUNTRYSTATECITY_API_KRY);
```

の結果・・・

```
2021-07-27T20:29:00.080+09:00	2021-07-27T11:29:00.080Z 2702b0f9-d108-47d1-a0cb-86e7a88129a4 INFO COUNTRYSTATECITY_API_KRY undefined
```

やっぱりこれが原因・・・

### 解決

`serverless.yml`に`useDotenv: true`を記載する<br>
https://www.serverless.com/framework/docs/environment-variables/#resolution-of-environment-variables/

※[AWS CLI で環境変数を設定する](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/configuration-envvars.html)事もできる
