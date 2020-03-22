import { NumberModelConfig } from '../types/GeneratorConfig.ts';
import { Generator } from './Generator.ts';

export class NumberGenerator extends Generator {
  generateValue(config: NumberModelConfig) {
    const minValue = config.minValue;
    const maxValue = config.maxValue;
    const step = config.step;
    const min = Math.floor(minValue / step);
    const max = Math.floor(maxValue / step);
    const k = min + Math.floor(Math.random() * (max - min));
    return Math.round(k * step * 1e9) / 1e9;
  }
}
