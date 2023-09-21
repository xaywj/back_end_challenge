import { AuthService } from './auth.service'; 
import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post()
  async login(@Body() AuthDto: AuthDto) {
    const user:any = await this.AuthService.findusername(AuthDto.username);
    const isMatch = await bcrypt.compare(AuthDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    const payload = { id: user?.id, username: user?.username, role: "admin" };
   const token=await this.jwtService.signAsync(payload);
   return {
    'token':token
   }
  }
}
