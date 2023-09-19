
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { databaseConfig } from './database.config';

@Module({
  imports: [ // If you're using configuration files (optional)
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig,
    }),
  ],
})
export class DatabaseModule {}