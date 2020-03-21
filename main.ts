import { EntryGenerator } from './generators/EntryGenerator.ts';
import { Entry } from './model/Entry.ts';
import { PublicationField } from './model/PublicationField.ts';
import { SubscriptionField } from './model/SubscriptionField.ts';
import { GeneratorConfig } from './types/GeneratorConfig.ts';

(async () => {
  if (Deno.args.length === 0) {
    throw new Error('Must specify a config file');
  }
  const configFile = Deno.args[0];
  const fileContent = await Deno.readFile(configFile);
  const decoder = new TextDecoder('utf-8');
  const config: GeneratorConfig = JSON.parse(decoder.decode(fileContent));

  const entryGenerator = new EntryGenerator();
  for (const field of config.model) {
    entryGenerator.addField(field);
  }

  const publications: Entry<PublicationField>[] = [];
  const subscriptions: Entry<SubscriptionField>[] = [];

  for (let i = 0; i < config.entriesCount; i++) {
    publications.push(entryGenerator.generatePublication());
    subscriptions.push(entryGenerator.generateSubscription());
  }

  const encoder = new TextEncoder();
  Deno.writeFile(
    config.output.publications,
    encoder.encode(publications.map((publication) => publication.toString()).join('\n'))
  );
  Deno.writeFile(
    config.output.subscriptions,
    encoder.encode(subscriptions.map((publication) => publication.toString()).join('\n'))
  );
})();
