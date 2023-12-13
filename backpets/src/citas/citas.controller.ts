import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';


@Controller('citas')
export class CitasController { 
  constructor(
    private readonly citasService: CitasService
){}


@Get()
async getAll(){
    return await this.citasService.getAll();
}

@Get(':id')
async getOne(@Param('id', ParseIntPipe) id: number){
    return await this.citasService.findById(id);
}


@UsePipes(new ValidationPipe({ whitelist: true }))
@Post()
async create(@Body() dto: CreateCitaDto ){
    return await this.citasService.create(dto);
}

@UsePipes(new ValidationPipe({ whitelist: true }))
@Put(':id')
async update(@Param('id', ParseIntPipe)id:number, @Body() dto: CreateCitaDto){
    return await this.citasService.update(id,dto);
}

@Delete(':id')
async delete(@Param('id', ParseIntPipe) id: number){
    return await this.citasService.delete(id)
}

}
