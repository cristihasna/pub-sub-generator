export class Maybe<T> {
  value: T;
  exists: boolean = true;
  constructor(value: T, exists?: boolean) {
    this.value = value;
    if (typeof exists !== 'undefined') {
      this.exists = exists;
    }
  }
}
