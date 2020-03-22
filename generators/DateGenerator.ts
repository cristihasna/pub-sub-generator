import { PublicationField } from '../model/PublicationField.ts';
import { SubscriptionField } from '../model/SubscriptionField.ts';
import { DateModelConfig } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';

export class DateGenerator extends Generator {
  months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  generatePublicationField(config: DateModelConfig) {
    const value = this.generateValue(config);
    return new PublicationField(config.name, value);
  }

  generateValue(config: DateModelConfig) {
    const minDate = new Date(config.minDate).getTime();
    const maxDate = new Date(config.maxDate).getTime();

    const date = new Date(minDate + Math.random() * (maxDate - minDate));
    date.setHours(0, 0, 0);
    const day = date.getDate();
    const month = this.months[date.getMonth()];
    const year = date.getFullYear();
    return `${day > 10 ? day : '0' + day}-${month}-${year}`;
  }

  generateSubscriptionField(config: DateModelConfig) {
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
