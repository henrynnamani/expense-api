import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signup(@Body() registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }
}
