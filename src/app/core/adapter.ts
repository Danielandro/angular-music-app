// bridge between API response and our models

export interface Adapter<T> {
  adapt(item: any): T;
}
