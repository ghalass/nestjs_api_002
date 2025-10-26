import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import refreshJwtConfig from './config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, role } = createUserDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        'Email dèjà utilisé par un autre utilisateur!',
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { user, access_token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new ConflictException('Email ou mot de passe incorrect');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException('Email ou mot de passe incorrect');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      access_token,
      refreshToken,
    };
  }

  async validateUser(userId: number) {
    if (!userId) {
      throw new NotFoundException('User ID manquant pour validateUser()');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    return user;
  }

  async refreshToken(userId: number) {
    const payload = { sub: userId };
    const access_token = this.jwtService.sign(payload);
    return {
      id: userId,
      access_token,
    };
  }
}
