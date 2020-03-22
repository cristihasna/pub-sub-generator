import { ModelConfig } from '../types/GeneratorConfig.ts';

export enum FieldOperator {
  GT = '>',
  LT = '<',
  EQ = '='
}

export class SubscriptionField {
  private fieldConfig: ModelConfig;
  private operator: FieldOperator;
  private fieldValue: number | string;
  constructor(fieldConfig: ModelConfig, operator: FieldOperator, fieldValue: number | string) {
    this.fieldConfig = fieldConfig;
    this.operator = operator;
    this.fieldValue = fieldValue;
  }

  toString() {
    return `(${this.fieldConfig.name}, ${this.operator}, ${this.fieldValue})`;
  }

  get config() {
    return this.fieldConfig;
  }
}
