import { DateModelConfig } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';

export class DateGenerator extends Generator {
  months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  generateValue() {
    const config = this.config as DateModelConfig;
    const minDate = new Date(config.minDate).getTime();
    const maxDate = new Date(config.maxDate).getTime();

    const date = new Date(minDate + Math.random() * (maxDate - minDate));
    date.setHours(0, 0, 0);
    const day = date.getDate();
    const month = this.months[date.getMonth()];
    const year = date.getFullYear();
    return `${day > 10 ? day : '0' + day}-${month}-${year}`;
  }
}
