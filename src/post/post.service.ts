import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['person'],
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['person'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(
    title: string,
    content: string,
    personId: number,
  ): Promise<Post> {
    const post = this.postRepository.create({
      title,
      content,
      person: { id: personId },
    });
    return this.postRepository.save(post);
  }

  async update(id: number, title: string, content: string): Promise<Post> {
    await this.postRepository.update(id, { title, content });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
