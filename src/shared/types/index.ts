import { Errors } from '../utils';

export type Result<T> = {
  data: T | null;
  Error: keyof typeof Errors | null;
  success: boolean;
};
