import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycardController } from './keycard/keycard.controller';
import { ItemController } from './item/item.controller';

@Module({
  imports: [],
  controllers: [AppController, KeycardController, ItemController],
  providers: [AppService],
})
export class AppModule {}
