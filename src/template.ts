const getTemplate = () => `const path = require('path');

module.exports = {
  project: {
    appid: '小程序appid',
    type: 'miniProgram',
    projectPath: path.join(__dirname, './dist'),
    privateKeyPath: path.join(__dirname, './private.key'),
  },
  upload: {
    version: '1.1.1',
    desc: 'upload',
    setting: {
      es6: true,
    },
  },
  preview: {
    version: '1.1.1',
    desc: 'preview',
    setting: {
      es6: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: \`\${path.join(__dirname)}/qrcode.jpg\`,
  },
  sourceMapOption: {
    robot: 1,
    sourceMapSavePath: \`\${path.join(__dirname)}/sourceMap.zip\`,
  },
  uploadFunctionOptions: {
    env: '云环境 ID',
    name: '云函数名称',
    path: '云函数代码目录',
    remoteNpmInstall: true,
  },
  uploadStaticStorageOptions: {
    env: '云环境 ID',
    path: '本地文件目录',
    remotePath: '要上传到的远端文件目录',
  },
  uploadStorageOptions: {
    env: '云环境 ID',
    path: '本地文件目录',
    remotePath: '要上传到的远端文件目录',
  },
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
`;
export default getTemplate;
