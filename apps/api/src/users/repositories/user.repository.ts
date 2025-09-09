import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/common';

export class UserRepository extends AbstractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async findbyEmailOrPhone(email?: string, phone?: string) {
    return this.userRepository.findOne({
      where: {
        email,
        phone,
      },
    });
  }
}
