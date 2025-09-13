import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../users/repositories/user.repository';
import { RegisterDto } from './dto/auth.dto';
import { AuthMessage, PublicMessage } from '@app/common';
import { UserStatus } from '../users/enums/status.enum';
import { Roles } from '../users/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async userExists(phone?: string, email?: string) {
    return this.userRepository.findbyEmailOrPhone(phone, email);
  }

  async register(registerDto: RegisterDto) {
    const { email, phone, password } =
      registerDto;
    const userExists = await this.userExists(phone, email);
    if (userExists) {
      throw new ConflictException(AuthMessage.AlreadyExistAccount);
    }
    const newUser = await this.userRepository.create({
      email,
      phone,
      password,
    });
    return {
      data: newUser,
      status: HttpStatus.OK,
      success: true,
      message: PublicMessage.Created,
    };
  }
}
