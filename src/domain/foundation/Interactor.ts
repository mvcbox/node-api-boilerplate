export interface Interactor<T, R> {
  validateInputAssert(input: T): Promise<void>;
  handle(input: T): Promise<R>;
}
