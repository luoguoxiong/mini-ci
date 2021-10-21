'use strict';

var cac = require('cac');
var fs = require('fs');
var path = require('path');
var ci = require('miniprogram-ci');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var ci__default = /*#__PURE__*/_interopDefaultLegacy(ci);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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

/**
 * 获取工程目录的配置文件
 * @param  {string} root
 * @returns UserConfig
 */

const getConfig = root => {
  const resolvedPath = path__default['default'].join(root || process.cwd(), 'mini.config.js');

  try {
    let userConfig;

    if (fs__default['default'].existsSync(resolvedPath)) {
      delete require.cache[require.resolve(resolvedPath)];
      userConfig = require(resolvedPath);

      if (!('project' in userConfig)) {
        console.log('project config is no exit');
        throw 'project config is no exit';
      }

      return userConfig;
    } else {
      throw `${resolvedPath} is no exit`;
    }
  } catch (e) {
    console.log(`failed to load config from ${resolvedPath}`);
    throw e;
  }
};
/**
 * 生成 mini.config.js
 * @param  {string} root
 */

const createTemplate = root => {
  const resolvedPath = path__default['default'].join(root || process.cwd(), 'mini.config.js');

  if (fs__default['default'].existsSync(resolvedPath)) {
    console.log(`\n[${resolvedPath}] 已生成!\n`);
  } else {
    fs__default['default'].writeFile(resolvedPath, getTemplate(), err => {
      if (err) throw err;
      console.log(`\n[${resolvedPath}] 已生成!\n`);
    });
  }
};
/**
 * 上传小程序
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadInfo} uploadInfo
 */

const uploadProject = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (projectConfig, uploadInfo) {
    try {
      yield ci__default['default'].upload(_objectSpread2({
        project: new ci__default['default'].Project(projectConfig)
      }, uploadInfo));
      console.log('已更新至微信小程序助手~');
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  });

  return function uploadProject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 预览小程序
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {PreviewInfo} previewInfo
 */

const previewProject = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (projectConfig, previewInfo) {
    try {
      yield ci__default['default'].preview(_objectSpread2({
        project: new ci__default['default'].Project(projectConfig)
      }, previewInfo));
      console.log('已更新至微信小程序助手~');
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }
  });

  return function previewProject(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 最近上传版本的sourceMap
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {GetDevSourceMapOption} sourceMapOption
 */

const getDevSourceMap = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (projectConfig, sourceMapOption) {
    try {
      yield ci__default['default'].getDevSourceMap(_objectSpread2({
        project: new ci__default['default'].Project(projectConfig)
      }, sourceMapOption));
      console.log('getDevSourceMap 执行完~');
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }
  });

  return function getDevSourceMap(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 上传云开发云函数
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadFunctionOptions} uploadFunctionOptions
 */

const uploadFunction = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (projectConfig, uploadFunctionOptions) {
    try {
      yield ci__default['default'].cloud.uploadFunction(_objectSpread2({
        project: new ci__default['default'].Project(projectConfig)
      }, uploadFunctionOptions));
      console.log('getDevSourceMap 执行完~');
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }
  });

  return function uploadFunction(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * 上传云开发静态网站
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadStaticStorageOptions} uploadStaticStorageOptions
 */

const uploadStaticStorage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (projectConfig, uploadStaticStorageOptions) {
    try {
      yield ci__default['default'].cloud.uploadStaticStorage(_objectSpread2({
        project: new ci__default['default'].Project(projectConfig)
      }, uploadStaticStorageOptions));
      console.log('uploadStaticStorage 执行完~');
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }
  });

  return function uploadStaticStorage(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * 新建云开发云托管版本
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {any} uploadContainer
 */

const uploadContainer = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (projectConfig, _uploadContainer) {
    try {
      yield ci__default['default'].cloud.uploadContainer(_objectSpread2({
        project: new ci__default['default'].Project(projectConfig)
      }, _uploadContainer));
      console.log('uploadContainer 执行完~');
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }
  });

  return function uploadContainer(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

const cli = cac.cac('mini');
cli.option('init', '初始化默认的配置文件').option('upload', '小程序上传').option('preview', '小程序预览').option('getDevSourceMap', '最近上传版本的sourceMap').option('uploadFunction', '上传云开发云函数').option('uploadStaticStorage', '上传云开发静态网站').option('uploadStorageOptions', '上传云存储').option('uploadContainer', '新建云开发云托管版本'); // 上传

cli.command('[root]').alias('init').action( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (root) {
    createTemplate(root);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // 上传

cli.command('[root]').alias('upload').action( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (root) {
    const config = getConfig(root);

    if (config.upload) {
      yield uploadProject(config.project, config.upload);
    } else {
      console.log('upload字段缺少配置信息');
    }
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()); // 预览

cli.command('[root]').alias('preview').action( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (root) {
    const config = getConfig(root);

    if (config.preview) {
      yield previewProject(config.project, config.preview);
    } else {
      console.log('preview字段缺少配置信息');
    }
  });

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}()); // 最近上传版本的sourceMap

cli.command('[root]').alias('getDevSourceMap').action( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (root) {
    const config = getConfig(root);

    if (config.sourceMapOption) {
      yield getDevSourceMap(config.project, config.sourceMapOption);
    } else {
      console.log('sourceMapOption字段缺少配置信息');
    }
  });

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}()); // 上传云开发云函数

cli.command('[root]').alias('uploadFunction').action( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (root) {
    const config = getConfig(root);

    if (config.uploadFunctionOptions) {
      yield uploadFunction(config.project, config.uploadFunctionOptions);
    } else {
      console.log('uploadFunction字段缺少配置信息');
    }
  });

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}()); // 上传云开发静态网站

cli.command('[root]').alias('uploadStaticStorage').action( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (root) {
    const config = getConfig(root);

    if (config.uploadStaticStorageOptions) {
      yield uploadStaticStorage(config.project, config.uploadStaticStorageOptions);
    } else {
      console.log('uploadStaticStorage字段缺少配置信息');
    }
  });

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}()); // 上传云存储

cli.command('[root]').alias('uploadStorageOptions').action( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (root) {
    const config = getConfig(root);

    if (config.uploadStorageOptions) {
      yield uploadStaticStorage(config.project, config.uploadStorageOptions);
    } else {
      console.log('uploadStorageOptions字段缺少配置信息');
    }
  });

  return function (_x7) {
    return _ref7.apply(this, arguments);
  };
}()); // 新建云开发云托管版本

cli.command('[root]').alias('uploadContainer').action( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (root) {
    const config = getConfig(root);

    if (config.uploadContainer) {
      yield uploadContainer(config.project, config.uploadContainer);
    } else {
      console.log('uploadContainer字段缺少配置信息');
    }
  });

  return function (_x8) {
    return _ref8.apply(this, arguments);
  };
}());
cli.help();
cli.version(require('../package.json').version);
cli.parse();
