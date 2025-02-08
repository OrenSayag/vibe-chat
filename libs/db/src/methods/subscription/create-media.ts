import { db } from '../../config';
import { media } from '../../schema';

type CreateMediaInput = {
  key: string;
  bucket: string;
  mimeType: string;
  size: number;
};

export async function createMedia(input: CreateMediaInput) {
  const [result] = await db
    .insert(media)
    .values(input)
    .returning({ id: media.id });

  return { id: result.id };
} 