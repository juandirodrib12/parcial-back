import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiToken } from './entities/api-token.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiTokenService {

  constructor(

    @InjectRepository(ApiToken)
    private apiTokenRepository: Repository<ApiToken>,

  ) {}

  async create() {
    const token = randomBytes(16).toString('hex');
    const newToken = this.apiTokenRepository.create({ token: token });
    return this.apiTokenRepository.save(newToken);
  }

  async isActive(token: string) {
    const apiToken = await this.apiTokenRepository.findOne({ where: { token } });
    if (!apiToken) {
      throw new NotFoundException('API token not found');
    }
    if (!apiToken.isActive || apiToken.requestsLeft <= 0) {
      return false;
    }
    return true;
  }

  async reduceRequests(token: string) {
    const apiToken = await this.apiTokenRepository.findOne({ where: { token } });
    if (!apiToken) {
      throw new NotFoundException('API token not found');
    }
    apiToken.requestsLeft -= 1;
    return this.apiTokenRepository.save(apiToken);
  }
}