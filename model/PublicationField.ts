export class PublicationField {
  private fieldName: string;
  private fieldValue: number | string;
  constructor(fieldName: string, fieldValue: number | string) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
  }

  toString() {
    return `(${this.fieldName} = ${this.fieldValue})`;
  }
}
