import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@UseGuards(ApiTokenGuard)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Patch(':id/favorites/:locationId')
  addFavoriteLocation(
    @Param('id') id: string,
    @Param('locationId') locationId: string,
  ) {
    return this.characterService.addFavorite(+id, +locationId);
  }

  @Get(':id/taxes')
  calculateTaxes(@Param('id') id: string) {
    return this.characterService.calculateTaxes(+id);
  }
}