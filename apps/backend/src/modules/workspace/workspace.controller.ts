import { Body, Controller, Param, Patch, Query } from '@nestjs/common';
import {
  updateWorkspaceInfoRequest,
  UpdateWorkspaceInfoResponse,
} from '@monday-whatsapp/shared-types';
import { updateWorkspaceInfo } from '@monday-whatsapp/db';
import { createZodDto, ZodValidationPipe } from 'nestjs-zod';

class UpdateWorkspaceInfoDtp extends createZodDto(updateWorkspaceInfoRequest) {}

@Controller('workspace')
export class WorkspaceController {
  @Patch(':workspaceId')
  public async updateSubscription(
    @Param('workspaceId') workspaceId: string,
    @Query('subscriptionId') subscriptionId: string,
    @Body()
    input: UpdateWorkspaceInfoDtp
  ): Promise<UpdateWorkspaceInfoResponse> {
    await updateWorkspaceInfo({
      workspaceId: Number(workspaceId),
      subscriptionId: Number(subscriptionId),
      data: input,
    });
    return {
      success: true,
      message: 'Successfully updated workspace',
      data: undefined,
    };
  }
}
