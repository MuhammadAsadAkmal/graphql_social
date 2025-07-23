import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => Post)
  async post(@Args('id') id: number): Promise<Post> {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
    @Args('personId') personId: number,
  ): Promise<Post> {
    return this.postService.create(title, content, personId);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('content') content: string,
  ): Promise<Post> {
    return this.postService.update(id, title, content);
  }

  @Mutation(() => Boolean)
  async removePost(@Args('id') id: number): Promise<boolean> {
    await this.postService.remove(id);
    return true;
  }
}
