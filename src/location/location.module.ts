import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Character } from 'src/character/entities/character.entity';
import { Location } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiTokenModule } from 'src/api-token/api-token.module';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [
    TypeOrmModule.forFeature([Location, Character]),
    ApiTokenModule
  ],
  exports: [LocationService],
})
export class LocationModule {}
