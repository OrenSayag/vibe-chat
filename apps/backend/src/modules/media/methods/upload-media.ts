import { MediaService } from '../media.service';

export type UploadMediaInput = {
  file: Express.Multer.File;
};

export type UploadMediaOutput = {
  id: number;
};

export async function uploadMedia(
  input: UploadMediaInput,
  mediaService: MediaService
): Promise<UploadMediaOutput> {
  return await mediaService.uploadMedia(input.file);
} 