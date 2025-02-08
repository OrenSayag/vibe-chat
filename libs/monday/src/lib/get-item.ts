import { monday } from './monday-sdk-instance';
import { BoardItem } from '@vibe-chat/shared-types';

type Input = {
  itemId: number;
};

type Output = {
  item: BoardItem;
};

export const getItem = async ({ itemId }: Input): Promise<Output> => {
  const getItemRes: {
    data: { items: BoardItem[] };
  } = await monday.api(`
  query {
  items (ids: [${itemId}]) {
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
  return { item: getItemRes.data.items[0] };
};
