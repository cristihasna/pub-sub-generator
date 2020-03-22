import { Entry } from '../model/Entry.ts';
import { PublicationField } from '../model/PublicationField.ts';
import { SubscriptionField } from '../model/SubscriptionField.ts';
import { ModelConfig, FieldType } from '../types/GeneratorConfig.ts';
import { EnumGenerator } from './EnumGenerator.ts';
import { NumberGenerator } from './NumberGenerator.ts';
import { DateGenerator } from './DateGenerator.ts';
import { Generator } from './Generator.ts';

export class EntryGenerator {
  private generators: Generator[] = [];

  addField(fieldConfig: ModelConfig) {
    let generator: Generator;
    switch (fieldConfig.type) {
      case FieldType.ENUM:
        generator = new EnumGenerator(fieldConfig);
        break;
      case FieldType.DOUBLE:
        generator = new NumberGenerator(fieldConfig);
        break;
      case FieldType.DATE:
        generator = new DateGenerator(fieldConfig);
        break;
      default:
        throw new Error(`Invalid field type: ${fieldConfig.type}`);
    }
    this.generators.push(generator);
  }

  generatePublication(): Entry<PublicationField> {
    const fields = this.generators.map((generator) => generator.generatePublicationField());
    return new Entry<PublicationField>(fields);
  }

  generateSubscription(): Entry<SubscriptionField> {
    const maybeFields = this.generators.map((generator) => generator.generateSubscriptionField());
    const fields = maybeFields.filter((maybeField) => maybeField.exists).map((maybeField) => maybeField.value);
    if (fields.length === 0) {
      const randomFieldToAdd = Math.floor(Math.random() * maybeFields.length);
      fields.push(maybeFields[randomFieldToAdd].value);
    }
    return new Entry<SubscriptionField>(fields);
  }
}
