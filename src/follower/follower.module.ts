import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follower.entity';
import { FollowerService } from './follower.service';
import { FollowerResolver } from './follower.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  providers: [FollowerService, FollowerResolver],
  exports: [FollowerService],
})
export class FollowerModule {}
