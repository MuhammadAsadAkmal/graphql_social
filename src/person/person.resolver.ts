import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Person } from './person.entity';
import { PersonService } from './person.service';

const pubSub = new PubSub();

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query(() => [Person])
  async persons(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Query(() => Person)
  async person(@Args('id') id: number): Promise<Person> {
    return this.personService.findOne(id);
  }

  @Mutation(() => Person)
  async createPerson(@Args('name') name: string): Promise<Person> {
    const person = await this.personService.create(name);
    void pubSub.publish('personCreated', { personCreated: person });
    return person;
  }

  @Mutation(() => Person)
  async updatePerson(
    @Args('id') id: number,
    @Args('name') name: string,
  ): Promise<Person> {
    return this.personService.update(id, name);
  }

  @Mutation(() => Boolean)
  async removePerson(@Args('id') id: number): Promise<boolean> {
    await this.personService.remove(id);
    return true;
  }

  @Subscription(() => Person)
  personCreated() {
    return pubSub.asyncIterableIterator('personCreated');
  }
}
