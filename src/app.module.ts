import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './app/users/users.module'; 
import { User } from './app/users/entities/user.entity';
import { RoleModule } from './app/role/role.module';
import { ProductModule } from './app/product/product.module';
import { RateModule } from './app/rate/rate.module';  
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    // TypeOrmModule.forFeature([User]),
    UsersModule,
    RoleModule,
    ProductModule,
    RateModule,
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
