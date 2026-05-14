import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async register(registerDto: RegisterDto) {
        const user = await this.usersService.create(registerDto);

        const token = this.generateToken(user.id, user.email);

        return {
            user,
            access_token: token,
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password
        )

        if (!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateToken(user.id, user.email);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            access_token: token,
        };
    }

    // VALIDATE: Check if token is valid
    async validateUser(userId: string) {
        return this.usersService.findOne(userId);
    }

    private generateToken(userId: string, email: string): string {
        const payload = {
            sub: userId,
            email: email
        };

        return this.jwtService.sign(payload); // Token expires in 7 days (set in module config)
    }
}
