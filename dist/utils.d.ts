import { IInnerUploadOptions } from 'miniprogram-ci/dist/@types/ci/upload';
import { ICreateProjectOptions } from 'miniprogram-ci/dist/@types/ci/project';
import { IGetDevSourceMapOption } from 'miniprogram-ci/dist/@types/ci/getDevSourceMap';
import { IUploadOptions } from 'miniprogram-ci/dist/@types';
export type { ICreateProjectOptions } from 'miniprogram-ci/dist/@types/ci/project';
export declare type UploadInfo = Omit<IInnerUploadOptions, 'project'>;
export declare type GetDevSourceMapOption = Omit<IGetDevSourceMapOption, 'project'>;
export declare type PreviewInfo = Omit<UploadInfo, 'test'>;
export declare type UploadStaticStorageOptions = Omit<IUploadOptions, 'project'>;
/** 云开发上传配置 */
export interface UploadFunctionOptions {
    /** 云环境 ID */
    env: string;
    /** 云函数名称 */
    name: string;
    /** 云函数代码目录 */
    path: string;
    /** 是否云端安装依赖 */
    remoteNpmInstall: boolean;
}
/** 用户配置文件 */
export interface UserConfig {
    /** 项目相关配置 */
    project: ICreateProjectOptions;
    /** 上传相关配置 */
    upload?: UploadInfo;
    /** 预览相关配置 */
    preview?: PreviewInfo;
    /** 最近上传版本的sourceMap配置 */
    sourceMapOption?: GetDevSourceMapOption;
    /** 云开发上传配置 */
    uploadFunctionOptions?: UploadFunctionOptions;
    /** 上传云开发静态网站配置 */
    uploadStaticStorageOptions: UploadStaticStorageOptions;
    /** 上传云存储配置 */
    uploadStorageOptions: UploadStaticStorageOptions;
    /** 新建云开发云托管版本配置 */
    uploadContainer: any;
}
/**
 * 获取工程目录的配置文件
 * @param  {string} root
 * @returns UserConfig
 */
export declare const getConfig: (root: string) => UserConfig;
/**
 * 生成 mini.config.js
 * @param  {string} root
 */
export declare const createTemplate: (root: string) => void;
/**
 * 上传小程序
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadInfo} uploadInfo
 */
export declare const uploadProject: (projectConfig: ICreateProjectOptions, uploadInfo: UploadInfo) => Promise<void>;
/**
 * 预览小程序
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {PreviewInfo} previewInfo
 */
export declare const previewProject: (projectConfig: ICreateProjectOptions, previewInfo: PreviewInfo) => Promise<void>;
/**
 * 最近上传版本的sourceMap
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {GetDevSourceMapOption} sourceMapOption
 */
export declare const getDevSourceMap: (projectConfig: ICreateProjectOptions, sourceMapOption: GetDevSourceMapOption) => Promise<void>;
/**
 * 上传云开发云函数
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadFunctionOptions} uploadFunctionOptions
 */
export declare const uploadFunction: (projectConfig: ICreateProjectOptions, uploadFunctionOptions: UploadFunctionOptions) => Promise<void>;
/**
 * 上传云开发静态网站
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadStaticStorageOptions} uploadStaticStorageOptions
 */
export declare const uploadStaticStorage: (projectConfig: ICreateProjectOptions, uploadStaticStorageOptions: UploadStaticStorageOptions) => Promise<void>;
/**
 * 上传云存储
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {UploadStaticStorageOptions} uploadStorageOptions
 */
export declare const uploadStorage: (projectConfig: ICreateProjectOptions, uploadStorageOptions: UploadStaticStorageOptions) => Promise<void>;
/**
 * 新建云开发云托管版本
 * @param  {ICreateProjectOptions} projectConfig
 * @param  {any} uploadContainer
 */
export declare const uploadContainer: (projectConfig: ICreateProjectOptions, uploadContainer: any) => Promise<void>;
