import { FieldOperator } from '../model/SubscriptionField.ts';
import { EnumModelConfig, FieldType, NumberModelConfig } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';

export class EnumGenerator extends Generator {
  generateValue() {
    const config = this.config as EnumModelConfig;
    const length = config.values.length;
    const index = Math.floor(Math.random() * length);
    return config.values[index];
  }

  generateOperator(): FieldOperator {
    const config = this.config as EnumModelConfig;
    if (config.enumType === FieldType.STRING) {
      return FieldOperator.EQ;
    } else {
      return super.generateOperator();
    }
  }
}
