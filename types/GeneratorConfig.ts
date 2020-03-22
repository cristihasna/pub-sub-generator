export enum FieldType {
  ENUM = 'enum',
  STRING = 'string',
  DOUBLE = 'double',
  DATE = 'date'
}

export interface BaseModelConfig {
  name: string;
  type: FieldType;
  subscription?: {
    frequency?: number;
    equal_frequency?: number;
  };
}
export interface EnumModelConfig extends BaseModelConfig {
  type: FieldType.ENUM;
  enumType: FieldType.DOUBLE | FieldType.STRING;
  values: (number | string)[];
}

export interface NumberModelConfig extends BaseModelConfig {
  type: FieldType.DOUBLE;
  minValue: number;
  maxValue: number;
  step: number;
}

export interface DateModelConfig extends BaseModelConfig {
  type: FieldType.DATE;
  minDate: Date;
  maxDate: Date;
}

export type ModelConfig = BaseModelConfig;

export interface GeneratorConfig {
  entriesCount: number;
  output: {
    publications: string;
    subscriptions: string;
  };
  model: ModelConfig[];
}
