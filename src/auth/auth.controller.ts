import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // auth/register - create account
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() regiserDto: RegisterDto) {
        return this.authService.register(regiserDto);
    }

    // auth/login - Login
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    // auth/me - Get current user
    @Get('me')
    @UseGuards(JwtAuthGuard) // authentication
    getProfile(@CurrentUser() user: any) {
        return user;
    }
}
