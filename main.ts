import { GeneratorConfig } from './types/GeneratorConfig.ts';

(async () => {
  if (Deno.args.length === 0) {
    throw new Error('Must specify a config file');
  }
  const configFile = Deno.args[0];
  const fileContent = await Deno.readFile(configFile);
  const decoder = new TextDecoder('utf-8');
  const config: GeneratorConfig = JSON.parse(decoder.decode(fileContent));
  
  for(const field of config.model) {
    console.log(field);
  }

})();
