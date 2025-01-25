import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { BoughtsService } from './boughts.service';
import { RegisterBoughtDto } from './dto/register-bought.dto';
import { UpdateBoughtDto } from './dto/update-bought.dto';

@Controller('boughts')
export class BoughtsController {
  constructor(private readonly boughtsService: BoughtsService) {}

  @Post()
  register(@Body() registerBoughtDto: RegisterBoughtDto) {
    return this.boughtsService.register(registerBoughtDto);
  }

  @Get()
  findAll() {
    return this.boughtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.boughtsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBoughtDto: UpdateBoughtDto) {
    return this.boughtsService.update(id, updateBoughtDto);
  }
}
