import fs from 'fs';
import path from 'path';
import ci from 'miniprogram-ci';
import { IInnerUploadOptions } from 'miniprogram-ci/dist/@types/ci/upload';
import { ICreateProjectOptions } from 'miniprogram-ci/dist/@types/ci/project';
import { IGetDevSourceMapOption } from 'miniprogram-ci/dist/@types/ci/getDevSourceMap';
import { IUploadOptions } from 'miniprogram-ci/dist/@types';
import getTemplate from './template';

export type { ICreateProjectOptions } from 'miniprogram-ci/dist/@types/ci/project';

export type UploadInfo = Omit<IInnerUploadOptions, 'project'>

export type GetDevSourceMapOption = Omit<IGetDevSourceMapOption, 'project'>

export type PreviewInfo = Omit<UploadInfo, 'test'>

export type UploadStaticStorageOptions = Omit<IUploadOptions, 'project'>

/** 云开发上传配置 */
export interface UploadFunctionOptions {
    /** 云环境 ID */
    env:string;
    /** 云函数名称 */
    name:string;
    /** 云函数代码目录 */
    path:string;
    /** 是否云端安装依赖 */
    remoteNpmInstall:boolean;
}

/** 用户配置文件 */
export interface UserConfig {
    /** 项目相关配置 */
    project:ICreateProjectOptions;
    /** 上传相关配置 */
    upload?:UploadInfo;
    /** 预览相关配置 */
    preview?:PreviewInfo;
    /** 最近上传版本的sourceMap配置 */
    sourceMapOption?:GetDevSourceMapOption;
    /** 云开发上传配置 */
    uploadFunctionOptions?:UploadFunctionOptions;
    /** 上传云开发静态网站配置 */
    uploadStaticStorageOptions:UploadStaticStorageOptions;
    /** 上传云存储配置 */
    uploadStorageOptions:UploadStaticStorageOptions;
    /** 新建云开发云托管版本配置 */
    uploadContainer:any;
}

/**
 * 获取工程目录的配置文件
 * @param  {string} root
 * @returns UserConfig
 */
export const getConfig = (root:string):UserConfig => {
  const resolvedPath = path.join(root || process.cwd(), 'mini.config.js');
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
 *生成 mini.config.js
 * @param  {string} root
 */
export const createTemplate = (root:string) => {
  const resolvedPath = path.join(root || process.cwd(), 'mini.config.js');
  if (fs.existsSync(resolvedPath)) {
    console.log(
      `\n[${resolvedPath}] 已生成!\n`,
    );
  }else{
    fs.writeFile(resolvedPath, getTemplate(), (err) => {
      if (err) throw err;
      console.log(
        `\n[${resolvedPath}] 已生成!\n`,
      );
    });
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
    });
    console.log('已更新至微信小程序助手~');
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
    await ci.preview({
      project: new ci.Project(projectConfig),
      ...previewInfo,
    });
    console.log('已更新至微信小程序助手~');
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
};

/**
 * 最近上传版本的sourceMap
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {GetDevSourceMapOption} sourceMapOption
 */
export const getDevSourceMap = async(projectConfig:ICreateProjectOptions, sourceMapOption:GetDevSourceMapOption) => {
  try {
    await ci.getDevSourceMap({
      project: new ci.Project(projectConfig),
      ...sourceMapOption,
    });
    console.log('getDevSourceMap 执行完~');
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
};

/**
 * 上传云开发云函数
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadFunctionOptions} uploadFunctionOptions
 */
export const uploadFunction = async(projectConfig:ICreateProjectOptions, uploadFunctionOptions:UploadFunctionOptions) => {
  try {
    await ci.cloud.uploadFunction({
      project: new ci.Project(projectConfig),
      ...uploadFunctionOptions,
    });
    console.log('getDevSourceMap 执行完~');
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
};

/**
 * 上传云开发静态网站
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadStaticStorageOptions} uploadStaticStorageOptions
 */
export const uploadStaticStorage = async(projectConfig:ICreateProjectOptions, uploadStaticStorageOptions:UploadStaticStorageOptions) => {
  try {
    await ci.cloud.uploadStaticStorage({
      project: new ci.Project(projectConfig),
      ...uploadStaticStorageOptions,
    });
    console.log('uploadStaticStorage 执行完~');
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
};


/**
 * 上传云存储
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadStaticStorageOptions} uploadStorageOptions
 */
export const uploadStorage = async(projectConfig:ICreateProjectOptions, uploadStorageOptions:UploadStaticStorageOptions) => {
  try {
    await ci.cloud.uploadStorage({
      project: new ci.Project(projectConfig),
      ...uploadStorageOptions,
    });
    console.log('uploadStorage 执行完~');
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
};

/**
 * 新建云开发云托管版本
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {any} uploadContainer
 */
export const uploadContainer = async(projectConfig:ICreateProjectOptions, uploadContainer:any) => {
  try {
    await ci.cloud.uploadContainer({
      project: new ci.Project(projectConfig),
      ...uploadContainer,
    });
    console.log('uploadContainer 执行完~');
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
};
