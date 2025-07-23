import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from '../post/post.entity';
import { Follower } from '../follower/follower.entity';

@ObjectType()
@Entity()
export class Person {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.person)
  posts: Post[];

  @Field(() => [Follower], { nullable: true })
  @OneToMany(() => Follower, (follower) => follower.person)
  followers: Follower[];
}
