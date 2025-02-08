import { BackendBaseResponse } from "../lib/app.types";

export type GetUserDefaultSubscriptionResponse = BackendBaseResponse<{
  defaultSubscriptionId?: string;
}>;