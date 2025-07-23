import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Person } from '../person/person.entity';

@ObjectType()
@Entity()
export class Follower {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Person)
  @ManyToOne(() => Person, (person) => person.followers)
  @JoinColumn()
  person: Person;

  @Field(() => Person)
  @ManyToOne(() => Person)
  @JoinColumn()
  follower: Person;
}
