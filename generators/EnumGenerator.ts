import { FieldType } from '../types/GeneratorConfig.ts';
import { EnumModelConfig } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';
import { PublicationField } from '../model/PublicationField.ts';
import { FieldOperator, SubscriptionField } from '../model/SubscriptionField.ts';

export class EnumGenerator extends Generator {
  generatePublicationField(config: EnumModelConfig) {
    const length = config.values.length;
    const index = Math.floor(Math.random() * length);
    return new PublicationField(config.name, config.values[index]);
  }

  generateSubscriptionField(config: EnumModelConfig) {
    const frequency = config.subscription && config.subscription.frequency;
    const shouldExist = frequency ? Math.random() <= frequency : Math.random() < 0.5;
    if (!shouldExist) {
      return null;
    }
    let operator: FieldOperator;
    if (config.valueType === FieldType.DOUBLE && config.subscription?.equal_frequency) {
      const shouldBeEqual = Math.random() <= config.subscription.equal_frequency;
      if (shouldBeEqual) {
        operator = FieldOperator.EQ;
      } else {
        operator = Math.random() > 0.5 ? FieldOperator.GT : FieldOperator.LT;
      }
    } else if (config.valueType !== FieldType.DOUBLE) {
      operator = FieldOperator.EQ;
    } else {
      operator = this.generateOperator(config);
    }

    const index = Math.floor(Math.random() * config.values.length);
    return new SubscriptionField(config.name, operator, config.values[index]);
  }
}
