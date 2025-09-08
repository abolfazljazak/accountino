import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/database';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
