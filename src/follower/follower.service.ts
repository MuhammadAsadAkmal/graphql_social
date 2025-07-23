import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './follower.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower)
    private followerRepository: Repository<Follower>,
  ) {}

  async findAll(): Promise<Follower[]> {
    return this.followerRepository.find({
      relations: ['person', 'follower'],
    });
  }

  async findOne(id: number): Promise<Follower> {
    const follower = await this.followerRepository.findOne({
      where: { id },
      relations: ['person', 'follower'],
    });
    if (!follower) {
      throw new NotFoundException(`Follower with ID ${id} not found`);
    }
    return follower;
  }

  async create(personId: number, followerId: number): Promise<Follower> {
    const follower = this.followerRepository.create({
      person: { id: personId },
      follower: { id: followerId },
    });
    return this.followerRepository.save(follower);
  }

  async remove(id: number): Promise<void> {
    await this.followerRepository.delete(id);
  }
}
