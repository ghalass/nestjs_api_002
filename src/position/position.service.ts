import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(readonly prisma: PrismaService) {}

  async getAllPositions() {
    return await this.prisma.position.findMany();
  }

  async getOnePosition(id: number) {
    const position = await this.prisma.position.findUnique({ where: { id } });
    if (!position)
      throw new NotFoundException('Aucune position trouvée avec cet ID');
    return position;
  }

  async createPosition(data: CreatePositionDto) {
    const positionExiste = await this.prisma.position.findUnique({
      where: { name: data.name },
    });

    if (positionExiste)
      throw new BadRequestException(
        'Cette position existe déjà, veuillez en choisir une autre',
      );
    return await this.prisma.position.create({ data });
  }

  async updatePosition(id: number, data: UpdatePositionDto) {
    const positionExiste = await this.prisma.position.findUnique({
      where: { id },
    });

    if (!positionExiste)
      throw new BadRequestException(
        "Cette position n'existe pas, on ne peut pas le modifier",
      );
    return await this.prisma.position.update({ where: { id }, data });
  }

  async deletePosition(id: number) {
    const positionExiste = await this.prisma.position.findUnique({
      where: { id },
    });

    if (!positionExiste)
      throw new BadRequestException(
        "Cette position n'existe pas, on ne peut pas le supprimer",
      );
    return await this.prisma.position.delete({ where: { id } });
  }
}
