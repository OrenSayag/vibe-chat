import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { createZodDto, ZodValidationPipe } from 'nestjs-zod';
import {
  BackendBaseResponse,
  baseGetListParams,
  getChatListParamsSchema,
  GetChatListResponse,
  getChatSessionParamsSchema,
  GetChatSessionResponse,
  SendMessageRequest,
  sendMessageSchema,
} from '@monday-whatsapp/shared-types';
import { getList } from './methods/get-list';
import { getSession } from './methods/get-session';
import { sendMessage as _sendMessage } from '../whatsapp/methods/send-message';

class GetChatListParamsDto extends createZodDto(getChatListParamsSchema) {}
class GetChatSessionParamsDto extends createZodDto(
  getChatSessionParamsSchema
) {}
class ListSearchParamsDto extends createZodDto(baseGetListParams) {}

@Controller('chat')
export class ChatController {
  @Get(':subscriptionId/list')
  async getChatList(
    @Param() params: GetChatListParamsDto,
    @Query() query: ListSearchParamsDto
  ): Promise<GetChatListResponse> {
    const res = await getList({
      ...params,
      ...query,
    });
    return {
      success: true,
      message: 'Successfully retrieved chat list.',
      data: res,
    };
  }
  @Get(':subscriptionId/session/:phoneNumberId')
  async getChatSession(
    @Param() params: GetChatSessionParamsDto,
    @Query() query: ListSearchParamsDto
  ): Promise<GetChatSessionResponse> {
    const res = await getSession({
      ...params,
      ...query,
    });
    return {
      success: true,
      message: 'Successfully retrieved chat session.',
      data: res,
    };
  }
  @Post(':subscriptionId/send-message')
  async sendMessage(
    @Param('subscriptionId') subscriptionId: string,
    @Body(new ZodValidationPipe(sendMessageSchema)) body: SendMessageRequest
  ): Promise<BackendBaseResponse<{ mid: string }>> {
    if (Number.isNaN(Number(subscriptionId))) {
      throw new BadRequestException('Invalid subscription ID');
    }
    const message = await _sendMessage({
      subscriptionId: Number(subscriptionId),
      sendMessageData: body,
    });
    return {
      success: true,
      message: 'Successfully sent message',
      data: {
        mid: message.id,
      },
    };
  }
}
