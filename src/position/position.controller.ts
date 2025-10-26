import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/all')
  getAllPositions() {
    return this.positionService.getAllPositions();
  }

  @Get('/:id')
  getOnePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.getOnePosition(id);
  }

  @Post()
  createPosition(@Body() data: CreatePositionDto) {
    return this.positionService.createPosition(data);
  }

  @Put('/:id')
  updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePositionDto,
  ) {
    return this.positionService.updatePosition(id, data);
  }

  @Delete('/:id')
  deletePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.deletePosition(id);
  }
}
