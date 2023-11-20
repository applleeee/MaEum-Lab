import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceEntity } from 'src/orm_entity/choice.entity';
import { ChoiceResolver } from './choice.resolver';
import { ChoiceService } from './choice.service';
import { ChoiceRepository } from './choice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChoiceEntity])],
  providers: [ChoiceResolver, ChoiceService, ChoiceRepository],
})
export class ChoiceModule {}
