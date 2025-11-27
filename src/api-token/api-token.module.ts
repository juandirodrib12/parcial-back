import { Module } from '@nestjs/common';
import { ApiTokenService } from './api-token.service';
import { ApiTokenController } from './api-token.controller';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiToken } from './entities/api-token.entity';

@Module({
  controllers: [ApiTokenController, ApiTokenGuard],
  providers: [ApiTokenService],
  imports: [
    TypeOrmModule.forFeature([ApiToken])
  ],
  exports: [ApiTokenService, ApiTokenGuard],

})
export class ApiTokenModule {}
