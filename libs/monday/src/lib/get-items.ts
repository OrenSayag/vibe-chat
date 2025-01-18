import { monday } from './monday-sdk-instance';
import { BoardItem } from '@monday-whatsapp/shared-types';

type Output = {
  items: BoardItem[];
};

export const getItems = async ({
  groupId,
  boardId,
}: {
  groupId: string;
  boardId: string;
}): Promise<Output> => {
  const getGroupRes: {
    data: {
      boards: {
        groups: {
          id: string;
          items_page: { items: { id: number; name: string }[] };
        }[];
      }[];
    };
  } = await monday.api(`
  query {
  boards (ids: [${boardId}]) {
    groups (ids: ["${groupId}"]) {
      id
      items_page {
        items {
          id
          name
        }
      }
    }
  }
}
  `);

  const itemIds = getGroupRes.data.boards[0]!.groups[0]!.items_page.items.map(
    (it) => it.id
  );
  const getItemsRes: {
    data: { items: BoardItem[] };
  } = await monday.api(`
  query {
  items (ids: [${itemIds.join(', ')}]) {
    id
    name
    column_values {
      id
      value
      type
    }
  }
}
  `);
  return { items: getItemsRes.data.items };
};

export async function getItemsByIds({ ids }: { ids: number[] }) {
  const getItemsRes: {
    data: { items: BoardItem[] };
  } = await monday.api(`
  query {
  items (ids: [${ids.join(', ')}]) {
    id
    name
    column_values {
      id
      value
      type
    }
  }
}
  `);
  return { items: getItemsRes.data.items };
}
