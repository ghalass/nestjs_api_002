import { IsString, MinLength } from 'class-validator';

export class UpdatePositionDto {
  @IsString({
    message: 'Le nom de la position doit être une chaîne de caractères',
  })
  @MinLength(2, {
    message: 'Le nom de la position doit contenir au moins 2 caractères',
  })
  name: string;
}
