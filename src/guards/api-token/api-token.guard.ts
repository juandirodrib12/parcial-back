import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiTokenService } from 'src/api-token/api-token.service';

@Injectable()
export class ApiTokenGuard implements CanActivate {

  constructor(private readonly apiTokenService: ApiTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiToken = request.headers['api-token'];

    if (!apiToken) {
      throw new UnauthorizedException('API token is missing');
    }

    const isValid = await this.apiTokenService.isActive(apiToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid API token');
    }
    return true;
  }
}