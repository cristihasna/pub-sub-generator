import { ModelConfig } from '../types/GeneratorConfig.ts';
import { FieldOperator, SubscriptionField } from '../model/SubscriptionField.ts';
import { PublicationField } from '../model/PublicationField.ts';
import { Maybe } from '../model/Maybe.ts';
export abstract class Generator {
  protected config: ModelConfig;
  constructor(config: ModelConfig) {
    this.config = config;
  }
  abstract generateValue(): any;

  generatePublicationField(): PublicationField {
    const value = this.generateValue();
    return new PublicationField(this.config.name, value);
  }

  generateOperator(): FieldOperator {
    if (typeof this.config.subscription?.equal_frequency !== 'undefined') {
      const shouldBeEqual = Math.random() < this.config.subscription.equal_frequency;
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

  generateSubscriptionField(): Maybe<SubscriptionField> {
    const frequency = this.config.subscription && this.config.subscription.frequency;
    const shouldExist = frequency ? Math.random() <= frequency : Math.random() < 0.5;

    const operator = this.generateOperator();
    const value = this.generateValue();
    const field = new SubscriptionField(this.config, operator, value);
    return new Maybe<SubscriptionField>(field, shouldExist);
  }
}
