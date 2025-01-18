export const apiKeyHeaderName = 'x-api-key';

export type GetAuthState =
  | 'loading'
  | 'allowed'
  | 'workspace-not-allowed'
  | 'board-not-allowed'
  | 'error';
