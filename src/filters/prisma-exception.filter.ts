import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    let message = 'Erreur inconnue liée à la base de données';

    switch (exception.code) {
      case 'P2002':
        // Contrainte d'unicité violée
        message = `Contrainte unique violée : une valeur existe déjà pour ce champ.`;
        throw new ConflictException(message);

      case 'P2003':
        // Violation de clé étrangère
        message = `Impossible de supprimer ou modifier cet élément car il est utilisé ailleurs (clé étrangère).`;
        throw new BadRequestException(message);

      case 'P2025':
        // Enregistrement introuvable
        message = `L'élément recherché n'existe pas ou a déjà été supprimé.`;
        throw new NotFoundException(message);

      default:
        throw new InternalServerErrorException(
          `Erreur Prisma non gérée (${exception.code})`,
        );
    }
  }
}
