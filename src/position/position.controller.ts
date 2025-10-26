import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

// @Roles(Role.USER)
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @UseGuards(JwtAuthGuard)
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

  @Roles(Role.ADMIN, Role.EDITOR)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deletePosition(@Param('id', ParseIntPipe) id: number) {
    return this.positionService.deletePosition(id);
  }
}
