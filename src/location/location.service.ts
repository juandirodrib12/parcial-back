import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Character } from 'src/character/entities/character.entity';

@Injectable()
export class LocationService {

  constructor(

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(Character)
    private characterRepository: Repository<Character>,

  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const owner = await this.characterRepository.findOne({ where: { id: createLocationDto.ownerId } });
    if (!owner) {
      throw new NotFoundException('Owner character not found');
    }
    const newLocation = this.locationRepository.create({
      ...createLocationDto,
      owner,
    });
    return this.locationRepository.save(newLocation);
  }

  async findAll() {
    return await this.locationRepository.find({ relations: { favoriteCharacters: true } });
  }
}
