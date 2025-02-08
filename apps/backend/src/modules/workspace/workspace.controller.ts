import { Body, Controller, Param, Patch, Query } from '@nestjs/common';
import {
  UpdateBoardRequest,
  UpdateBoardResponse,
  updateWorkspaceInfoRequest,
  UpdateWorkspaceInfoResponse,
} from '@monday-whatsapp/shared-types';
import { updateWorkspaceBoard, updateWorkspaceInfo } from '@monday-whatsapp/db';
import { createZodDto } from 'nestjs-zod';

class UpdateWorkspaceInfoDtp extends createZodDto(updateWorkspaceInfoRequest) {}

@Controller('workspace')
export class WorkspaceController {
  @Patch(':workspaceId')
  public async updateWorkspace(
    @Param('workspaceId') workspaceId: string,
    @Query('subscriptionId') subscriptionId: string,
    @Body()
    input: UpdateWorkspaceInfoDtp
  ): Promise<UpdateWorkspaceInfoResponse> {
    await updateWorkspaceInfo({
      workspaceId: Number(workspaceId),
      subscriptionId,
      data: input,
    });
    return {
      success: true,
      message: 'Successfully updated workspace',
      data: undefined,
    };
  }
  @Patch(':workspaceId/boards/:boardId')
  public async updateBoard(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @Query('subscriptionId') subscriptionId: string,
    @Body()
    input: UpdateBoardRequest
  ): Promise<UpdateBoardResponse> {
    console.log('SHOULD UPDATE BOARD');
    await updateWorkspaceBoard({
      workspaceId: Number(workspaceId),
      subscriptionId,
      data: input,
      boardId: Number(boardId),
    });
    return {
      success: true,
      message: 'Successfully updated board',
      data: undefined,
    };
  }
}
