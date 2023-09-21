import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './jwtConstants'; 
import { JwtModule } from '@nestjs/jwt';
@Module({
  providers: [AuthService,UsersService],
  controllers: [AuthController],
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ]
})
export class AuthModule {}
