import { Module } from '@agape/api';
import { AdminOrganizationsController } from './organizations.controller';

@Module({
  controllers: [AdminOrganizationsController],
})
export class AdminOrganizationsModule {}
