import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { getDataSourceConfig } from './database.config';

export const AppDataSource = new DataSource(getDataSourceConfig());
