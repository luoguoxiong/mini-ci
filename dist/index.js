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

/**
 * 获取工程目录的配置文件
 * @param  {string} root
 * @returns UserConfig
 */

const getConfig = root => {
  const resolvedPath = path__default['default'].join(root, 'mini.config.js');

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
 * 上传小程序
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadInfo} uploadInfo
 */

const uploadProject = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (projectConfig, uploadInfo) {
    try {
      yield ci__default['default'].upload(_objectSpread2(_objectSpread2({
        project: new ci__default['default'].Project(projectConfig)
      }, uploadInfo), uploadInfo.otherUploadInfo));
      console.log('已上传到微信开发平台');
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
      ci__default['default'].preview(_objectSpread2(_objectSpread2({
        project: new ci__default['default'].Project(projectConfig)
      }, previewInfo), previewInfo.otherPreviewInfo)).catch(e => {
        console.log(e);
      });
      console.log('已上传到微信开发平台');
    } catch (error) {
      console.log('error', JSON.stringify(error));
    }
  });

  return function previewProject(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

const cli = cac.cac('mini');
cli.option('-init', '使用默认的配置文件'); // 上传

cli.command('[root]').alias('upload').action( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (root) {
    const configRoot = root || process.cwd();
    const config = getConfig(configRoot);

    if (config.upload) {
      yield uploadProject(config.project, config.upload);
    } else {
      console.log('upload字段缺少配置信息');
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // 预览

cli.command('[root]').alias('preview').action( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (root) {
    const configRoot = root || process.cwd();
    const config = getConfig(configRoot);

    if (config.preview) {
      yield previewProject(config.project, config.preview);
    } else {
      console.log('preview字段缺少配置信息');
    }
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
cli.help();
cli.version(require('../package.json').version);
cli.parse();
