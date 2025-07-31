export type ServiceResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};
