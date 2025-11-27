import { Controller } from '@nestjs/common';
import { ApiTokenService } from './api-token.service';

@Controller('api-token')
export class ApiTokenController {
  constructor(private readonly apiTokenService: ApiTokenService) {}
}
