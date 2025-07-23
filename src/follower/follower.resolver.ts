import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Follower } from './follower.entity';
import { FollowerService } from './follower.service';

@Resolver(() => Follower)
export class FollowerResolver {
  constructor(private readonly followerService: FollowerService) {}

  @Query(() => [Follower])
  async followers(): Promise<Follower[]> {
    return this.followerService.findAll();
  }

  @Query(() => Follower)
  async follower(@Args('id') id: number): Promise<Follower> {
    return this.followerService.findOne(id);
  }

  @Mutation(() => Follower)
  async createFollower(
    @Args('personId') personId: number,
    @Args('followerId') followerId: number,
  ): Promise<Follower> {
    return this.followerService.create(personId, followerId);
  }

  @Mutation(() => Boolean)
  async removeFollower(@Args('id') id: number): Promise<boolean> {
    await this.followerService.remove(id);
    return true;
  }
}
