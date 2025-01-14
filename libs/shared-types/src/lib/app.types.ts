export type ListItem<T = string> = {
  label: string;
  value: T;
};

export type DeactivatedItem = ListItem<{
  id: string;
}>;

export type ActivatedItem = ListItem<{
  activationDate: string;
  id: string;
}>;

export type BackendBaseResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
