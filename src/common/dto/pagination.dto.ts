import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationDto {
  @Field(() => Int, { defaultValue: 1 })
  page?: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  limit?: number = 10;

  @Field(() => String, { nullable: true })
  sortBy?: string;

  @Field(() => String, { defaultValue: 'ASC' })
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
} 