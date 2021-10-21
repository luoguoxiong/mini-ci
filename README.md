# mini-ci
基于微信提供的CI方法封装的更加方便、自动化构建的CI工具库。

## Installation

Install `mini-ci` via yarn or npm.

```shell
npm i @tools-list/mini-ci -g
```

### Usage

```shell
# 初始化配置文件
$ mini init

# 小程序上传
$ mini upload

# 小程序 预览
$ mini preview

# 小程序 最近上传版本的sourceMap
$ mini getDevSourceMap

# 小程序 上传云开发云函数
$ mini uploadFunction

# 小程序 上传云开发静态网站
$ mini uploadStaticStorage

# 小程序 上传云存储
$ mini uploadStorage

# 小程序 新建云开发云托管版本
$ mini uploadContainer
```

## mini.config.js

```js
const path = require('path');

module.exports = {
  // 项目配置
  project: {
    appid: '小程序appid',
    type: 'miniProgram',
    projectPath: '小程序目录',
    privateKeyPath: '上传秘钥',
  },
  // 小程序上传
  upload: {
    version: '1.1.1',
    desc: 'upload',
    setting: {
      es6: true,
    },
  },
  // 小程序预览
  preview: {
    version: '1.1.1',
    desc: 'preview',
    setting: {
      es6: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: `${path.join(__dirname)}/qrcode.jpg`,
  },
  //最近上传版本的sourceMap
  sourceMapOption: {
    robot: 1,
    sourceMapSavePath: `${path.join(__dirname)}/sourceMap.zip`,
  },
  // 上传云开发云函数
  uploadFunctionOptions: {
    env: '云环境 ID',
    name: '云函数名称',
    path: '云函数代码目录',
    remoteNpmInstall: true,
  },
  // 上传云开发静态网站
  uploadStaticStorageOptions: {
    env: '云环境 ID',
    path: '本地文件目录',
    remotePath: '要上传到的远端文件目录',
  },
  // 上传云存储
  uploadStorageOptions: {
    env: '云环境 ID',
    path: '本地文件目录',
    remotePath: '要上传到的远端文件目录',
  },
  // 新建云开发云托管版本
  uploadContainer: {
    env: '云环境 ID',
    version: {
      uploadType: 'package',
      flowRatio: 0,
      cpu: 0.25,
      mem: 0.5,
      minNum: 0,
      maxNum: 1,
      policyType: 'cpu',
      policyThreshold: 60,
      containerPort: 80,
      serverName: 'server',
      versionRemark: 'ci',
      envParams: '{}',
      buildDir: '',
      dockerfilePath: '',
    },
    containerRoot: 'the/path/to/container',
  },
};
```

**参数与官方保持一致 https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html**

