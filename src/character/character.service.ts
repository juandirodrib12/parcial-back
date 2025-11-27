import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { In, Repository } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class CharacterService {

  constructor(

    @InjectRepository(Character)
    private characterRepository: Repository<Character>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const newCharacter = await this.characterRepository.create(createCharacterDto);
    return this.characterRepository.save(newCharacter);
  }

  async addFavorite(characterId: number, locationId: number) {
    const character = await this.characterRepository.findOne({ where: { id: characterId }, relations: { favoriteLocations: true } });
    const location = await this.locationRepository.findOne({ where: { id: locationId } });
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    character.favoriteLocations.push(location);
    await this.characterRepository.save(character);
  }

  async calculateTaxes(id: number) {
    const character = await this.characterRepository.findOne({ where: { id }, relations: { location: true } });
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    if (!character.location) {
      return 0;
    }
    if (character.employee) {
      return character.location.cost * (1+0.08);
    }
    return character.location.cost*(1+0.03);
  }
}