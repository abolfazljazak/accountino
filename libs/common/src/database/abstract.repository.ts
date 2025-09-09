import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFoundException } from '@nestjs/common';
import { AbstractEntity } from '@app/common';

export abstract class AbstractRepository<TEntity extends AbstractEntity> {
  constructor(protected readonly repository: Repository<TEntity>) {}

  async create(document: DeepPartial<TEntity>): Promise<TEntity> {
    const newDocument = this.repository.create(
      document as DeepPartial<TEntity>,
    );
    return await this.repository.save(newDocument);
  }

  async findOneById(id: FindOptionsWhere<TEntity>): Promise<TEntity> {
    const document = await this.repository.findOneBy(id);
    if (!document) throw new NotFoundException('Document was not found');
    return document;
  }

  async find(): Promise<TEntity[]> {
    return this.repository.find();
  }

  async update(
    id: FindOptionsWhere<TEntity>,
    document: QueryDeepPartialEntity<TEntity>,
  ): Promise<TEntity> {
    const updateDocument = await this.repository.update(id, document);
    if (!updateDocument) throw new NotFoundException('Document was not found');
    return this.findOneById(id);
  }

  async delete(id: FindOptionsWhere<TEntity>): Promise<DeleteResult> {
    const document = await this.repository.delete(id);
    if (!document) {
      throw new NotFoundException('Document was not found');
    }

    return document;
  }
}
