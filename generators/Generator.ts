import { ModelConfig } from '../types/GeneratorConfig.ts';
import { FieldOperator } from '../model/SubscriptionField.ts';
export abstract class Generator {
  abstract generatePublicationField(config: ModelConfig): any;
  abstract generateSubscriptionField(config: ModelConfig): any;

  generateOperator(config: ModelConfig) {
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
}
