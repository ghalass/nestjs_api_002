import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePositionDto {
  @IsString({
    message: 'Le nom de la position doit être une chaîne de caractères',
  })
  @MinLength(2, {
    message: 'Le nom de la position doit contenir au moins 2 caractères',
  })
  @ApiProperty({
    description: 'Le nom de la position',
    minLength: 2,
    maxLength: 50,
    required: true,
    example: 'Développeur Backend',
  })
  name: string;
}
