import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePersonDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  bio?: string;
} 