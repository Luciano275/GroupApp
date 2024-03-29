export type ResponseErrors = {
  title?: string[];
  code?: string[];
}

export type ResponseGroupAction = {
  errors?: ResponseErrors;
  message: null | string;
  success: null | boolean;
}

export type ApiNotificationsResponse = {
  notifications: {
    id: number;
    group: {
      id: number;
      title: string;
    };
    created_at: Date;
  }[],
  nextCursor: null | number;
}

export type ReactQueryNotificationsResponse = {
  pages: {
    notifications: ApiNotificationsResponse[],
    pageParams: Number[]
  }[]
}