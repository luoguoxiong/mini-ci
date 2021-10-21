import { cac } from 'cac';
import { uploadProject, previewProject, getConfig, getDevSourceMap, uploadFunction, uploadStaticStorage, uploadContainer, createTemplate } from './utils';
const cli = cac('mini');

cli
  .option('init', '初始化默认的配置文件')
  .option('upload', '小程序上传')
  .option('preview', '小程序预览')
  .option('getDevSourceMap', '最近上传版本的sourceMap')
  .option('uploadFunction', '上传云开发云函数')
  .option('uploadStaticStorage', '上传云开发静态网站')
  .option('uploadStorageOptions', '上传云存储')
  .option('uploadContainer', '新建云开发云托管版本');

// 初始化默认的配置文件
cli.command('[root]')
  .alias('init')
  .action(async(root:string) => {
    createTemplate(root);
  });

// 上传
cli.command('[root]')
  .alias('upload')
  .action(async(root:string) => {
    const config = getConfig(root);
    if(config.upload){
      await uploadProject(config.project, config.upload);
    }else{
      console.log('upload字段缺少配置信息');
    }
  });

// 预览
cli.command('[root]')
  .alias('preview')
  .action(async(root:string) => {
    const config = getConfig(root);
    if(config.preview){
      await previewProject(config.project, config.preview);
    }else{
      console.log('preview字段缺少配置信息');
    }
  });

// 最近上传版本的sourceMap
cli.command('[root]')
  .alias('getDevSourceMap')
  .action(async(root:string) => {
    const config = getConfig(root);
    if(config.sourceMapOption){
      await getDevSourceMap(config.project, config.sourceMapOption);
    }else{
      console.log('sourceMapOption字段缺少配置信息');
    }
  });

// 上传云开发云函数
cli.command('[root]')
  .alias('uploadFunction')
  .action(async(root:string) => {
    const config = getConfig(root);
    if(config.uploadFunctionOptions){
      await uploadFunction(config.project, config.uploadFunctionOptions);
    }else{
      console.log('uploadFunction字段缺少配置信息');
    }
  });

// 上传云开发静态网站
cli.command('[root]')
  .alias('uploadStaticStorage')
  .action(async(root:string) => {
    const config = getConfig(root);
    if(config.uploadStaticStorageOptions){
      await uploadStaticStorage(config.project, config.uploadStaticStorageOptions);
    }else{
      console.log('uploadStaticStorage字段缺少配置信息');
    }
  });

// 上传云存储
cli.command('[root]')
  .alias('uploadStorage')
  .action(async(root:string) => {
    const config = getConfig(root);
    if(config.uploadStorageOptions){
      await uploadStaticStorage(config.project, config.uploadStorageOptions);
    }else{
      console.log('uploadStorageOptions字段缺少配置信息');
    }
  });

// 新建云开发云托管版本
cli.command('[root]')
  .alias('uploadContainer')
  .action(async(root:string) => {
    const config = getConfig(root);
    if(config.uploadContainer){
      await uploadContainer(config.project, config.uploadContainer);
    }else{
      console.log('uploadContainer字段缺少配置信息');
    }
  });

cli.help();

cli.version(require('../package.json').version);

cli.parse();
