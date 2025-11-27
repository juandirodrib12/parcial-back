import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTokenService } from './api-token.service';

@Controller('token')
export class ApiTokenController {
  constructor(private readonly apiTokenService: ApiTokenService) {}

  @Post()
  create() {
    return this.apiTokenService.create();
  }

  @Get(':idToken')
  isActive(@Param('idToken') idToken: string) {
    return this.apiTokenService.isActive(idToken);
  }

  @Patch('/reduce/:idToken')
  reduceRequests(@Param('idToken') idToken: string) {
    return this.apiTokenService.reduceRequests(idToken);
  }
}
