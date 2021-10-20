import { ICreateProjectOptions } from 'miniprogram-ci/dist/@types/ci/project';
export type { ICreateProjectOptions } from 'miniprogram-ci/dist/@types/ci/project';
/** 用户配置文件 */
export interface UserConfig {
    /** 项目相关配置 */
    project: ICreateProjectOptions;
    /** 上传相关配置 */
    upload?: UploadInfo;
    /** 预览相关配置 */
    preview?: PreviewInfo;
}
/** 上传相关参数 */
export interface UploadInfo {
    /** 版本号信息 */
    version: string;
    /** 描述 */
    desc: string;
    /** 编译相关配置 */
    setting?: Record<string, any>;
    /** 其他上传参数 */
    otherUploadInfo: Record<string, any>;
}
/** 预览相关参数 */
export interface PreviewInfo {
    /** 版本号信息 */
    version: string;
    /** 描述 */
    desc: string;
    /** 编译相关配置 */
    setting?: Record<string, any>;
    /** 其他预览参数 */
    otherPreviewInfo: Record<string, any>;
}
/**
 * 获取工程目录的配置文件
 * @param  {string} root
 * @returns UserConfig
 */
export declare const getConfig: (root: string) => UserConfig;
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
