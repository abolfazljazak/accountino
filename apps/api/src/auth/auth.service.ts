import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../users/repositories/user.repository';
import { RegisterDto } from './dto/auth.dto';
import { AuthMessage, PublicMessage } from '@app/common';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async userExists(phone: string) {
    return this.userRepository.findByPhone(phone);
  }

  async register(registerDto: RegisterDto) {
    const { phone, password } = registerDto;
    const userExists = await this.userExists(phone);
    if (userExists) {
      throw new ConflictException(AuthMessage.AlreadyExistAccount);
    }
    const newUser = await this.userRepository.create({
      phone,
      password,
    });

    const accessToken = await this.tokenService.createAccessToken({
      userId: newUser.id,
    });
    const refreshToken = await this.tokenService.createRefreshToken({
      userId: newUser.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
