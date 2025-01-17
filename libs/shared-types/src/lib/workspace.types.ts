import { z } from 'zod';
import {
  ActivatedItem,
  BackendBaseResponse,
  DeactivatedItem,
} from './app.types';

export type Workspace = ActivatedItem & {
  activatedBoards: ActivatedItem[];
  deactivatedBoards: DeactivatedItem[];
};

export const updateWorkspaceInfoRequest = z.object({
  activatedBoards: z.array(z.string()),
});

export type UpdateWorkspaceInfoRequest = z.infer<
  typeof updateWorkspaceInfoRequest
>;

export type UpdateWorkspaceInfoResponse = BackendBaseResponse<undefined>;
