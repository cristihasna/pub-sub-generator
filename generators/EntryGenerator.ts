import { FieldGenerator } from './FieldGenerator.ts';
import { ModelConfig } from '../types/GeneratorConfig.ts';
import { PublicationField } from '../model/PublicationField.ts';
import { Entry } from '../model/Entry.ts';
import { SubscriptionField } from '../model/SubscriptionField.ts';

export class EntryGenerator {
  private fieldGenerators: FieldGenerator[] = [];

  addField(field: ModelConfig) {
    const fieldGenerator = new FieldGenerator(field);
    this.fieldGenerators.push(fieldGenerator);
  }

  generatePublication(): Entry<PublicationField> {
    const fields = this.fieldGenerators.map((generator) => generator.generatePublicationField());
    return new Entry<PublicationField>(fields);
  }

  generateSubscription(): Entry<SubscriptionField> {
    const fields = this.fieldGenerators.map((generator) => generator.generateSubscriptionField());
    return new Entry<SubscriptionField>(fields);
  }
}
