import { cac } from 'cac';
import fs from 'fs';
import path from 'path';
import ci from 'miniprogram-ci';

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

var getTemplate = function getTemplate() {
  return "const path = require('path');\n\nmodule.exports = {\n  project: {\n    appid: 'wxff35a1041f79d45c',\n    type: 'miniProgram',\n    projectPath: path.join(__dirname, './dist'),\n    privateKeyPath: path.join(__dirname, './private.key'),\n  },\n  upload: {\n    version: '1.1.1',\n    desc: 'upload',\n    setting: {\n      es6: true,\n    },\n  },\n  preview: {\n    version: '1.1.1',\n    desc: 'preview',\n    setting: {\n      es6: true,\n    },\n    qrcodeFormat: 'image',\n    qrcodeOutputDest: `${path.join(__dirname)}/qrcode.jpg`,\n  },\n  sourceMapOption: {\n    robot: 1,\n    sourceMapSavePath: `${path.join(__dirname)}/sourceMap.zip`,\n  },\n  uploadFunctionOptions: {\n    env: '\u4E91\u73AF\u5883 ID',\n    name: '\u4E91\u51FD\u6570\u540D\u79F0',\n    path: '\u4E91\u51FD\u6570\u4EE3\u7801\u76EE\u5F55',\n    remoteNpmInstall: true,\n  },\n  uploadStaticStorageOptions: {\n    env: '\u4E91\u73AF\u5883 ID',\n    path: '\u672C\u5730\u6587\u4EF6\u76EE\u5F55',\n    remotePath: '\u8981\u4E0A\u4F20\u5230\u7684\u8FDC\u7AEF\u6587\u4EF6\u76EE\u5F55',\n  },\n  uploadStorageOptions: {\n    env: '\u4E91\u73AF\u5883 ID',\n    path: '\u672C\u5730\u6587\u4EF6\u76EE\u5F55',\n    remotePath: '\u8981\u4E0A\u4F20\u5230\u7684\u8FDC\u7AEF\u6587\u4EF6\u76EE\u5F55',\n  },\n  uploadContainer: {\n    env: '\u4E91\u73AF\u5883 ID',\n    version: {\n      uploadType: 'package',\n      flowRatio: 0,\n      cpu: 0.25,\n      mem: 0.5,\n      minNum: 0,\n      maxNum: 1,\n      policyType: 'cpu',\n      policyThreshold: 60,\n      containerPort: 80,\n      serverName: 'server',\n      versionRemark: 'ci',\n      envParams: '{}',\n      buildDir: '',\n      dockerfilePath: '',\n    },\n    containerRoot: 'the/path/to/container',\n  },\n};\n";
};

/**
 * 获取工程目录的配置文件
 * @param  {string} root
 * @returns UserConfig
 */

var getConfig = function getConfig(root) {
  var resolvedPath = path.join(root || process.cwd(), 'mini.config.js');

  try {
    var userConfig;

    if (fs.existsSync(resolvedPath)) {
      delete require.cache[require.resolve(resolvedPath)];
      userConfig = require(resolvedPath);

      if (!('project' in userConfig)) {
        console.log('project config is no exit');
        throw 'project config is no exit';
      }

      return userConfig;
    } else {
      throw "".concat(resolvedPath, " is no exit");
    }
  } catch (e) {
    console.log("failed to load config from ".concat(resolvedPath));
    throw e;
  }
};
/**
 *生成 mini.config.js
 * @param  {string} root
 */

var createTemplate = function createTemplate(root) {
  var resolvedPath = path.join(root || process.cwd(), 'mini.config.js');

  if (fs.existsSync(resolvedPath)) {
    console.log("\n[".concat(resolvedPath, "] \u5DF2\u751F\u6210!\n"));
  } else {
    fs.writeFile(resolvedPath, getTemplate(), function (err) {
      if (err) throw err;
      console.log("\n[".concat(resolvedPath, "] \u5DF2\u751F\u6210!\n"));
    });
  }
};
/**
 * 上传小程序
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadInfo} uploadInfo
 */

var uploadProject = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(projectConfig, uploadInfo) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return ci.upload(_objectSpread2({
              project: new ci.Project(projectConfig)
            }, uploadInfo));

          case 3:
            console.log('已更新至微信小程序助手~');
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(JSON.stringify(_context.t0));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function uploadProject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 预览小程序
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {PreviewInfo} previewInfo
 */

var previewProject = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(projectConfig, previewInfo) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return ci.preview(_objectSpread2({
              project: new ci.Project(projectConfig)
            }, previewInfo));

          case 3:
            console.log('已更新至微信小程序助手~');
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log('error', JSON.stringify(_context2.t0));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function previewProject(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 最近上传版本的sourceMap
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {GetDevSourceMapOption} sourceMapOption
 */

var getDevSourceMap = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(projectConfig, sourceMapOption) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return ci.getDevSourceMap(_objectSpread2({
              project: new ci.Project(projectConfig)
            }, sourceMapOption));

          case 3:
            console.log('getDevSourceMap 执行完~');
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.log('error', JSON.stringify(_context3.t0));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function getDevSourceMap(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 上传云开发云函数
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadFunctionOptions} uploadFunctionOptions
 */

var uploadFunction = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(projectConfig, uploadFunctionOptions) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return ci.cloud.uploadFunction(_objectSpread2({
              project: new ci.Project(projectConfig)
            }, uploadFunctionOptions));

          case 3:
            console.log('getDevSourceMap 执行完~');
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log('error', JSON.stringify(_context4.t0));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function uploadFunction(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * 上传云开发静态网站
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadStaticStorageOptions} uploadStaticStorageOptions
 */

var uploadStaticStorage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(projectConfig, uploadStaticStorageOptions) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return ci.cloud.uploadStaticStorage(_objectSpread2({
              project: new ci.Project(projectConfig)
            }, uploadStaticStorageOptions));

          case 3:
            console.log('uploadStaticStorage 执行完~');
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            console.log('error', JSON.stringify(_context5.t0));

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 6]]);
  }));

  return function uploadStaticStorage(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * 新建云开发云托管版本
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {any} uploadContainer
 */

var uploadContainer = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(projectConfig, _uploadContainer) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return ci.cloud.uploadContainer(_objectSpread2({
              project: new ci.Project(projectConfig)
            }, _uploadContainer));

          case 3:
            console.log('uploadContainer 执行完~');
            _context7.next = 9;
            break;

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7["catch"](0);
            console.log('error', JSON.stringify(_context7.t0));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 6]]);
  }));

  return function uploadContainer(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var cli = cac('mini');
cli.option('init', '初始化默认的配置文件').option('upload', '小程序上传').option('preview', '小程序预览').option('getDevSourceMap', '最近上传版本的sourceMap').option('uploadFunction', '上传云开发云函数').option('uploadStaticStorage', '上传云开发静态网站').option('uploadStorageOptions', '上传云存储').option('uploadContainer', '新建云开发云托管版本'); // 上传

cli.command('[root]').alias('init').action( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createTemplate(root);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // 上传

cli.command('[root]').alias('upload').action( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root) {
    var config;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = getConfig(root);

            if (!config.upload) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return uploadProject(config.project, config.upload);

          case 4:
            _context2.next = 7;
            break;

          case 6:
            console.log('upload字段缺少配置信息');

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()); // 预览

cli.command('[root]').alias('preview').action( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(root) {
    var config;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            config = getConfig(root);

            if (!config.preview) {
              _context3.next = 6;
              break;
            }

            _context3.next = 4;
            return previewProject(config.project, config.preview);

          case 4:
            _context3.next = 7;
            break;

          case 6:
            console.log('preview字段缺少配置信息');

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}()); // 最近上传版本的sourceMap

cli.command('[root]').alias('getDevSourceMap').action( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root) {
    var config;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            config = getConfig(root);

            if (!config.sourceMapOption) {
              _context4.next = 6;
              break;
            }

            _context4.next = 4;
            return getDevSourceMap(config.project, config.sourceMapOption);

          case 4:
            _context4.next = 7;
            break;

          case 6:
            console.log('sourceMapOption字段缺少配置信息');

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}()); // 上传云开发云函数

cli.command('[root]').alias('uploadFunction').action( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(root) {
    var config;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            config = getConfig(root);

            if (!config.uploadFunctionOptions) {
              _context5.next = 6;
              break;
            }

            _context5.next = 4;
            return uploadFunction(config.project, config.uploadFunctionOptions);

          case 4:
            _context5.next = 7;
            break;

          case 6:
            console.log('uploadFunction字段缺少配置信息');

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}()); // 上传云开发静态网站

cli.command('[root]').alias('uploadStaticStorage').action( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(root) {
    var config;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            config = getConfig(root);

            if (!config.uploadStaticStorageOptions) {
              _context6.next = 6;
              break;
            }

            _context6.next = 4;
            return uploadStaticStorage(config.project, config.uploadStaticStorageOptions);

          case 4:
            _context6.next = 7;
            break;

          case 6:
            console.log('uploadStaticStorage字段缺少配置信息');

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}()); // 上传云存储

cli.command('[root]').alias('uploadStorageOptions').action( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(root) {
    var config;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            config = getConfig(root);

            if (!config.uploadStorageOptions) {
              _context7.next = 6;
              break;
            }

            _context7.next = 4;
            return uploadStaticStorage(config.project, config.uploadStorageOptions);

          case 4:
            _context7.next = 7;
            break;

          case 6:
            console.log('uploadStorageOptions字段缺少配置信息');

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x7) {
    return _ref7.apply(this, arguments);
  };
}()); // 新建云开发云托管版本

cli.command('[root]').alias('uploadContainer').action( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(root) {
    var config;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            config = getConfig(root);

            if (!config.uploadContainer) {
              _context8.next = 6;
              break;
            }

            _context8.next = 4;
            return uploadContainer(config.project, config.uploadContainer);

          case 4:
            _context8.next = 7;
            break;

          case 6:
            console.log('uploadContainer字段缺少配置信息');

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x8) {
    return _ref8.apply(this, arguments);
  };
}());
cli.help();
cli.version(require('../package.json').version);
cli.parse();
