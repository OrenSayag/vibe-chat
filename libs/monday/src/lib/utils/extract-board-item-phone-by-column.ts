import { BoardItem, PhoneColumnData } from '@vibe-chat/shared-types';

type Input = {
  boardItem: BoardItem;
  columnId: string;
};

type Output = string | undefined;

export const extractBoardItemPhoneByColumn = ({
  columnId,
  boardItem,
}: Input): Output => {
  const columnValue = boardItem.column_values
    .filter((c) => c.type === 'phone')
    .find((c) => c.id == columnId)?.value;
  if (!columnValue) {
    return undefined;
  }
  const data: PhoneColumnData = JSON.parse(columnValue);
  return data.phone;
};
