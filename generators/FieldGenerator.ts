import { ModelConfig, FieldType } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';
import { EnumGenerator } from './EnumGenerator.ts';
import { NumberGenerator } from './NumberGenerator.ts';
import { DateGenerator } from './DateGenerator.ts';

export class FieldGenerator {
  private fieldConfig: ModelConfig;
  private generator: Generator;

  constructor(fieldConfig: ModelConfig) {
    this.fieldConfig = fieldConfig;
    switch (fieldConfig.type) {
      case FieldType.ENUM:
        this.generator = new EnumGenerator();
        break;
      case FieldType.DOUBLE:
        this.generator = new NumberGenerator();
        break;
      case FieldType.DATE:
        this.generator = new DateGenerator();
        break;
      default:
        throw new Error(`Invalid field type: ${fieldConfig.type}`);
    }
  }

  generatePublicationField() {
    return this.generator.generatePublicationField(this.fieldConfig);
  }

  generateSubscriptionField() {
    return this.generator.generateSubscriptionField(this.fieldConfig);
  }
}
