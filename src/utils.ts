import fs from 'fs';
import path from 'path';
import ci from 'miniprogram-ci';
import { ICreateProjectOptions } from 'miniprogram-ci/dist/@types/ci/project';

export type { ICreateProjectOptions } from 'miniprogram-ci/dist/@types/ci/project';

/** 用户配置文件 */
export interface UserConfig {
    /** 项目相关配置 */
    project:ICreateProjectOptions;
    /** 上传相关配置 */
    upload?:UploadInfo;
    /** 预览相关配置 */
    preview?:PreviewInfo;
}

/** 上传相关参数 */
export interface UploadInfo{
    /** 版本号信息 */
    version:string;
    /** 描述 */
    desc:string;
    /** 编译相关配置 */
    setting?:Record<string, any>;
    /** 其他上传参数 */
    otherUploadInfo:Record<string, any>;
}

/** 预览相关参数 */
export interface PreviewInfo{
    /** 版本号信息 */
    version:string;
    /** 描述 */
    desc:string;
    /** 编译相关配置 */
    setting?:Record<string, any>;
    /** 其他预览参数 */
    otherPreviewInfo:Record<string, any>;
}

/**
 * 获取工程目录的配置文件
 * @param  {string} root
 * @returns UserConfig
 */
export const getConfig = (root:string):UserConfig => {
  const resolvedPath = path.join(root, 'mini.config.js');
  try {
    let userConfig:UserConfig;
    if(fs.existsSync(resolvedPath)){
      delete require.cache[require.resolve(resolvedPath)];
      userConfig = require(resolvedPath);
      if(!('project' in userConfig)){
        console.log('project config is no exit');
        throw 'project config is no exit';
      }
      return userConfig;
    }else{
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
export const uploadProject = async(projectConfig:ICreateProjectOptions, uploadInfo:UploadInfo) => {
  try {
    await ci.upload({
      project: new ci.Project(projectConfig),
      ...uploadInfo,
      ...uploadInfo.otherUploadInfo,
    });
    console.log('已上传到微信开发平台');
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

/**
 * 预览小程序
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {PreviewInfo} previewInfo
 */
export const previewProject = async(projectConfig:ICreateProjectOptions, previewInfo:PreviewInfo) => {
  try {
    ci.preview({
      project: new ci.Project(projectConfig),
      ...previewInfo,
      ...previewInfo.otherPreviewInfo,
    }).catch((e) => {
      console.log(e);
    });
    console.log('已上传到微信开发平台');
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
};
