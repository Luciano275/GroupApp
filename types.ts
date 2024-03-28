export type ResponseErrors = {
  title?: string[];
  code?: string[];
}

export type ResponseGroupAction = {
  errors?: ResponseErrors;
  message: null | string;
  success: null | boolean;
}