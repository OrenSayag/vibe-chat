import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';

@Module({
  providers: [],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}
