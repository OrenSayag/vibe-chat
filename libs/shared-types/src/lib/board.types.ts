import { z } from 'zod';
import { BackendBaseResponse } from './app.types';

export type BoardColumn = {
  id: string;
  title: string;
  type: string;
};

export type Board = {
  id: number;
  columns: BoardColumn[];
  defaultPhoneColumnId?: string;
};

export const updateBoardRequestSchema = z.object({
  defaultPhoneColumnId: z.string().optional(),
});

export type UpdateBoardRequest = z.infer<typeof updateBoardRequestSchema>;

export type UpdateBoardResponse = BackendBaseResponse<undefined>;

export type BoardItemColumn = {
  id: string;
  value: string | null;
  type: 'people' | 'status' | 'date' | 'phone';
};

export type PhoneColumnData = {
  phone: string;
  countryShortName: string | null;
};

export type BoardItemColumnType = BoardItemColumn['type'];

export type BoardItem = {
  id: string;
  name: string;
  column_values: BoardItemColumn[];
};
