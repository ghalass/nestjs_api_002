import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionModule } from './position/position.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PositionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
