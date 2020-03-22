import { Entry } from '../model/Entry.ts';
import { PublicationField } from '../model/PublicationField.ts';
import { SubscriptionField } from '../model/SubscriptionField.ts';
import { ModelConfig } from '../types/GeneratorConfig.ts';
import { FieldGenerator } from './FieldGenerator.ts';

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
    const maybeFields = this.fieldGenerators.map((generator) => generator.generateSubscriptionField());
    const fields = maybeFields.filter((maybeField) => maybeField.exists).map((maybeField) => maybeField.value);
    if (fields.length === 0) {
      const randomFieldToAdd = Math.floor(Math.random() * maybeFields.length);
      fields.push(maybeFields[randomFieldToAdd].value);
    }
    return new Entry<SubscriptionField>(fields);
  }
}
