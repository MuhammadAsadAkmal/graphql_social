import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class MockRepository<T> {
  public createQueryBuilder = jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
    getMany: jest.fn(),
  }));

  public find = jest.fn();
  public findOne = jest.fn();
  public save = jest.fn();
  public update = jest.fn();
  public delete = jest.fn();
  public create = jest.fn();
}

export const createMockRepository = <T>(): jest.Mocked<Repository<T>> => {
  return new MockRepository() as jest.Mocked<Repository<T>>;
};

export const getRepositoryMock = <T>(entity: any) => {
  return {
    provide: getRepositoryToken(entity),
    useValue: createMockRepository<T>(),
  };
};

export const createTestingModule = async (
  providers: any[],
  imports: any[] = [],
): Promise<TestingModule> => {
  return Test.createTestingModule({
    imports,
    providers,
  }).compile();
}; 