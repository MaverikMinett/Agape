import { Module } from '@agape/api';
import { AdminUsersController } from './users.controller';

@Module({
  controllers: [AdminUsersController]
})
export class AdminUsersModule {}
