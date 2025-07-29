import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { LoggerService } from './logger.service';
import { EntityNotFoundException } from '../exceptions/custom.exception';

export abstract class BaseService<T> {
  protected abstract readonly logger: LoggerService;

  constructor(protected readonly repository: Repository<T>) {}

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    try {
      return await this.repository.find(options);
    } catch (error) {
      this.logger.error(`Error finding all entities: ${error.message}`);
      throw error;
    }
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    try {
      const entity = await this.repository.findOne(options);
      if (!entity) {
        throw new EntityNotFoundException(this.getEntityName(), options.where);
      }
      return entity;
    } catch (error) {
      this.logger.error(`Error finding entity: ${error.message}`);
      throw error;
    }
  }

  async findById(id: number): Promise<T> {
    return this.findOne({ where: { id } as any });
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const entity = this.repository.create(data);
      const result = await this.repository.save(entity);
      this.logger.log(`Created ${this.getEntityName()} with id: ${(result as any).id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating entity: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    try {
      await this.repository.update(id, data);
      return this.findById(id);
    } catch (error) {
      this.logger.error(`Error updating entity: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw new EntityNotFoundException(this.getEntityName(), id);
      }
      this.logger.log(`Deleted ${this.getEntityName()} with id: ${id}`);
    } catch (error) {
      this.logger.error(`Error removing entity: ${error.message}`);
      throw error;
    }
  }

  protected abstract getEntityName(): string;
} 