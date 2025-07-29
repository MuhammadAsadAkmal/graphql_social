import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Person } from '../person/person.entity';
import { Post } from '../post/post.entity';
import { Follower } from '../follower/follower.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
  host: 'localhost',
    port: 5432,
    username: 'graphql_user',
    password: 'admin',
    database: 'graphql_social',
    synchronize: false,
    logging: true,
    entities: [Person, Post, Follower],
    migrations: ['src/migration/*.ts'],
    subscribers: [],
});
