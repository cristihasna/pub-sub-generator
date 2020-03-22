import { ModelConfig } from '../types/GeneratorConfig.ts';
import { FieldOperator, SubscriptionField } from '../model/SubscriptionField.ts';
import { PublicationField } from '../model/PublicationField.ts';
export abstract class Generator {
  abstract generateValue(config: ModelConfig): any;

  generatePublicationField(config: ModelConfig): PublicationField {
    const value = this.generateValue(config);
    return new PublicationField(config.name, value);
  }

  generateOperator(config: ModelConfig): FieldOperator {
    if (typeof config.subscription?.equal_frequency !== 'undefined') {
      const shouldBeEqual = Math.random() < config.subscription.equal_frequency;
      if (shouldBeEqual) {
        return FieldOperator.EQ;
      } else {
        return Math.random() <= 0.5 ? FieldOperator.LT : FieldOperator.GT;
      }
    }

    const rand = Math.random();
    if (rand <= 0.33) {
      return FieldOperator.LT;
    } else if (rand <= 0.66) {
      return FieldOperator.EQ;
    } else {
      return FieldOperator.GT;
    }
  }

  generateSubscriptionField(config: ModelConfig): SubscriptionField | null {
    const frequency = config.subscription && config.subscription.frequency;
    const shouldExist = frequency ? Math.random() <= frequency : Math.random() < 0.5;
    if (!shouldExist) {
      return null;
    }
    const operator = this.generateOperator(config);
    const value = this.generateValue(config);
    return new SubscriptionField(config.name, operator, value);
  }
}
