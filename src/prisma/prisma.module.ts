import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// import { PrismaService } from './prisma.service';

@Global() // ✅ optionnel mais pratique pour ne pas importer à chaque fois
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
