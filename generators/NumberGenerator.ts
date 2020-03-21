import { PublicationField } from '../model/PublicationField.ts';
import { SubscriptionField } from '../model/SubscriptionField.ts';
import { NumberModelConfig } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';

export class NumberGenerator extends Generator {
  generatePublicationField(config: NumberModelConfig) {
    const value = this.generateValue(config);
    return new PublicationField(config.name, value);
  }

  generateValue(config: NumberModelConfig) {
    const minValue = config.minValue;
    const maxValue = config.maxValue;
    const step = config.step;
    const min = Math.floor(minValue / step);
    const max = Math.floor(maxValue / step);
    const k = min + Math.floor(Math.random() * (max - min));
    return Math.round(k * step * 1e9) / 1e9;
  }

  generateSubscriptionField(config: NumberModelConfig) {
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
