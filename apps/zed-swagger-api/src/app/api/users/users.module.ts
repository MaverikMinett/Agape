import { Module } from '@agape/api';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
