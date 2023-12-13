import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasEntity } from './entities/cita.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitasEntity])],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
