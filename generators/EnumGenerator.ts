import { FieldOperator } from '../model/SubscriptionField.ts';
import { EnumModelConfig, FieldType } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';

export class EnumGenerator extends Generator {
  generateValue(config: EnumModelConfig) {
    const length = config.values.length;
    const index = Math.floor(Math.random() * length);
    return config.values[index];
  }

  generateOperator(config: EnumModelConfig): FieldOperator {
    console.log(config.enumType);
    if (config.enumType === FieldType.STRING) {
      return FieldOperator.EQ;
    } else {
      return super.generateOperator(config);
    }
  }
}
