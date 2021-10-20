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

/**
 * 获取工程目录的配置文件
 * @param  {string} root
 * @returns UserConfig
 */

var getConfig = function getConfig(root) {
  var resolvedPath = path.join(root, 'mini.config.js');

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
            return ci.upload(_objectSpread2(_objectSpread2({
              project: new ci.Project(projectConfig)
            }, uploadInfo), uploadInfo.otherUploadInfo));

          case 3:
            console.log('已上传到微信开发平台');
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
            try {
              ci.preview(_objectSpread2(_objectSpread2({
                project: new ci.Project(projectConfig)
              }, previewInfo), previewInfo.otherPreviewInfo)).catch(function (e) {
                console.log(e);
              });
              console.log('已上传到微信开发平台');
            } catch (error) {
              console.log('error', JSON.stringify(error));
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function previewProject(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var cli = cac('mini');
cli.option('-init', '使用默认的配置文件'); // 上传

cli.command('[root]').alias('upload').action( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root) {
    var configRoot, config;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configRoot = root || process.cwd();
            config = getConfig(configRoot);

            if (!config.upload) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return uploadProject(config.project, config.upload);

          case 5:
            _context.next = 8;
            break;

          case 7:
            console.log('upload字段缺少配置信息');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // 预览

cli.command('[root]').alias('preview').action( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root) {
    var configRoot, config;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            configRoot = root || process.cwd();
            config = getConfig(configRoot);

            if (!config.preview) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return previewProject(config.project, config.preview);

          case 5:
            _context2.next = 8;
            break;

          case 7:
            console.log('preview字段缺少配置信息');

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
cli.help();
cli.version(require('../package.json').version);
cli.parse();
