import { Controller, Get, Param, Query } from '@nestjs/common';
import { createZodDto } from 'nestjs-zod';
import {
  baseGetListParams,
  getChatListParamsSchema,
  GetChatListResponse,
  getChatSessionParamsSchema,
  GetChatSessionResponse,
} from '@monday-whatsapp/shared-types';
import { getList } from './methods/get-list';
import { getSession } from './methods/get-session';

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
    console.log({
      params,
      query,
    });
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
}
