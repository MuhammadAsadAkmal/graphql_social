import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personRepository.find({
      relations: ['posts', 'followers'],
    });
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['posts', 'followers'],
    });
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return person;
  }

  async create(name: string): Promise<Person> {
    const person = this.personRepository.create({ name });
    return this.personRepository.save(person);
  }

  async update(id: number, name: string): Promise<Person> {
    await this.personRepository.update(id, { name });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }
}
