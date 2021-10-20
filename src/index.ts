import { cac } from 'cac';
import { uploadProject, previewProject, getConfig } from './utils';
const cli = cac('mini');

cli
  .option('-init', '使用默认的配置文件');

// 上传
cli.command('[root]')
  .alias('upload')
  .action(async(root:string) => {
    const configRoot = root || process.cwd();
    const config = getConfig(configRoot);
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
    const configRoot = root || process.cwd();
    const config = getConfig(configRoot);
    if(config.preview){
      await previewProject(config.project, config.preview);
    }else{
      console.log('preview字段缺少配置信息');
    }
  });


cli.help();

cli.version(require('../package.json').version);


cli.parse();
