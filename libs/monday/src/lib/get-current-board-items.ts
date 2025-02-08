import { monday } from '@vibe-chat/monday';
import { BoardItem } from '@vibe-chat/shared-types';

type Input =
  | {
      columnTypeFilter?: string[];
    }
  | undefined;

type Output = BoardItem[];

export const getCurrentBoardItems = async (input: Input): Promise<Output> => {
  const { columnTypeFilter } = input ?? {};
  const ctx = await monday.get('context');
  const currentBoardId = (ctx.data as any)['boardId'];
  if (!currentBoardId) {
    throw new Error('No current board id in context');
  }
  const query = `
query {
  boards (ids: ${currentBoardId}) {
    items_page {
      cursor
      items {
        id
        name
        column_values${
          columnTypeFilter ? `(types: [${columnTypeFilter.join(', ')}])` : ''
        } {
          id
          value
          type
        }
      }
    }
  }
}

  `;
  const getBoardItemsRes: {
    data: {
      boards: {
        items_page: {
          items: BoardItem[];
        };
      }[];
    };
  } = await monday.api(query);

  return getBoardItemsRes.data.boards[0].items_page.items;
};
