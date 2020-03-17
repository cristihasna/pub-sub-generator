export interface StringModelConfig {
  name: string;
  type: 'string';
  values: string[];
  subscription?: {
    frequency?: number;
    equal_frequency?: number;
  };
}

export interface NumberModelConfig {
  name: string;
  type: 'double';
  minValue: number;
  maxValue: number;
  step: number;
  subscription?: {
    frequency?: number;
  };
}

export interface DateModelConfig {
  name: string;
  type: 'date';
  minDate: Date;
  maxDate: Date;
  subscription?: {
    frequency?: number;
  };
}

export interface GeneratorConfig {
  publications: number;
  subscriptions: number;
  model: (StringModelConfig | NumberModelConfig | DateModelConfig)[];
}
