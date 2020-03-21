export enum FieldOperator {
  GT = '>',
  LT = '<',
  EQ = '='
}


export class SubscriptionField {
  private fieldName: string;
  private operator: FieldOperator;
  private fieldValue: number | string;
  constructor(fieldName: string, operator: FieldOperator, fieldValue: number | string) {
    this.fieldName = fieldName;
    this.operator = operator;
    this.fieldValue = fieldValue;
  }

  toString() {
    return `(${this.fieldName}, ${this.operator}, ${this.fieldValue})`;
  }
}
