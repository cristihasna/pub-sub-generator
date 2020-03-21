import { ModelConfig, FieldType } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';
import { EnumGenerator } from './EnumGenerator.ts';
import { NumberGenerator } from './NumberGenerator.ts';

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
      default:
        this.generator = new EnumGenerator();
    }
  }

  generatePublicationField() {
    return this.generator.generatePublicationField(this.fieldConfig);
  }

  generateSubscriptionField() {
    return this.generator.generateSubscriptionField(this.fieldConfig);
  }
}
