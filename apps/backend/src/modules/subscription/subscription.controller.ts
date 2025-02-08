import { createSubscription as _createSubscription } from '@vibe-chat/db';
import {
  BackendBaseResponse,
  CreateSubscriptionInfoResponse,
  GetSubscriptionInfoResponse,
  organizationInfoSchema,
  updateSubscriptionInfoRequest,
} from '@vibe-chat/shared-types';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createZodDto } from 'nestjs-zod';
import { MediaService } from '../media/media.service';
import { SubscriptionService } from './subscription.service';

class UpdateSubscriptionRequestDto extends createZodDto(
  updateSubscriptionInfoRequest
) {}

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly mediaService: MediaService
  ) {}
  @Get(':accountId')
  public async getSubscription(
    @Param('accountId') accountId: string
  ): Promise<GetSubscriptionInfoResponse> {
    const { id, info } = await this.subscriptionService.getSubscription({
      accountId,
      type: 'mondayAccountId',
    });
    return {
      success: true,
      message: 'Successfully retrieved subscription info',
      data: {
        info,
        id,
      },
    };
  }
  @Patch(':subscriptionId')
  public async updateSubscription(
    @Param('subscriptionId') subscriptionId: string,
    @Body() input: UpdateSubscriptionRequestDto
  ): Promise<BackendBaseResponse<undefined>> {
    await this.subscriptionService.updateSubscription({
      info: input,
      subscriptionId,
    });
    return {
      success: true,
      message: 'Successfully updated subscription',
      data: undefined,
    };
  }
  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, callback) => {
        const validImageTypes = /^image\/(jpeg|png|gif|bmp|webp)$/;
        if (!validImageTypes.test(file.mimetype)) {
          callback(
            new BadRequestException(
              'Invalid image type. Only browser supported images are allowed.'
            ),
            false
          );
        }
        callback(null, true);
      },
    })
  )
  public async createSubscription(
    @UploadedFile() image: Express.Multer.File,
    @Body('organizationInfo') organizationInfo: string,
    @Body('userId') userId: string
  ): Promise<CreateSubscriptionInfoResponse> {
    const parsedOrgInfo = parseAndValidateOrgInfo(organizationInfo);

    let mediaId: number | undefined;
    if (image) {
      const result = await this.mediaService.uploadMedia(image);
      mediaId = result.id;
    }

    const { id } = await _createSubscription({
      organizationInfo: {
        ...parsedOrgInfo,
        image: mediaId || parsedOrgInfo.image,
      },
      userId,
    });

    return {
      success: true,
      message: 'Successfully created subscription',
      data: { id },
    };

    function parseAndValidateOrgInfo(orgInfo: string) {
      let parsedOrgInfo;
      try {
        parsedOrgInfo = JSON.parse(orgInfo);
      } catch (error) {
        throw new BadRequestException(
          'Invalid JSON format for organization info'
        );
      }

      const result = organizationInfoSchema.safeParse(parsedOrgInfo);
      if (!result.success) {
        throw new BadRequestException('Invalid organization info format');
      }

      return result.data;
    }
  }
}
