export class Entry<T extends Object> {
  fields: T[] = [];
  constructor(fields: T[]) {
    this.fields = fields || [];
  }

  addField(field: T) {
    this.fields.push(field);
  }

  toString() {
    return `{${this.fields
      .filter((field) => !!field)
      .map((field) => field.toString())
      .join(', ')}}`;
  }
}
