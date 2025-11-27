import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { ApiTokenModule } from 'src/api-token/api-token.module';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [
    TypeOrmModule.forFeature([Character, Location]),
    ApiTokenModule
  ],
  exports: [CharacterService],
})
export class CharacterModule {}
