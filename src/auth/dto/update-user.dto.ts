import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString({
    message: "Le prénom de l'utilisateur doit être une chaîne de caractères",
  })
  @MinLength(2, {
    message: "Le prénom de l'utilisateur doit contenir au moins 2 caractères",
  })
  @IsNotEmpty({
    message: "Le prénom de l'utilisateur est requis pour s'inscrire",
  })
  @Optional()
  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    minLength: 2,
    maxLength: 50,
    required: true,
    example: 'Mohamed',
  })
  firstName: string;

  @IsString({
    message: "Le nom de l'utilisateur doit être une chaîne de caractères",
  })
  @MinLength(2, {
    message: "Le nom de l'utilisateur doit contenir au moins 2 caractères",
  })
  @IsNotEmpty({
    message: "Le nom de l'utilisateur est requis pour s'inscrire",
  })
  @Optional()
  @ApiProperty({
    description: "Le nom de l'utilisateur",
    minLength: 2,
    maxLength: 50,
    required: true,
    example: 'GHalass',
  })
  lastName: string;

  @IsString({
    message: "L'email de l'utilisateur doit être une chaîne de caractères",
  })
  @IsEmail(
    {
      blacklisted_chars: '?!/$^#&%[]{}',
    },
    {
      message: "Un email de l'utilisateur est requis pour s'inscrire",
    },
  )
  @IsNotEmpty({
    message: "L'addresse Email n'est pas valide",
  })
  @Optional()
  @ApiProperty({
    description: "L'email de l'utilisateur",
    required: true,
    example: 'exemple@email.com',
  })
  email: string;

  @IsString({
    message:
      "Le mot de passe de l'utilisateur doit être une chaîne de caractères",
  })
  @MinLength(8, {
    message:
      "Le mot de passe de l'utilisateur doit contenir au moins 8 caractères",
  })
  @IsNotEmpty({
    message: "Un mot de passe de l'utilisateur est requis pour s'inscrire",
  })
  @Optional()
  @ApiProperty({
    description: "Le nom de l'utilisateur",
    minLength: 8,
    required: true,
  })
  password: string;
}
