import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Module,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';
import { CadastroModule } from 'src/modules/cadastro/cadastro.module';
import { EnderecoController } from 'src/modules/endereco/endereco.controller';
import { EnderecoModule } from 'src/modules/endereco/endereco.module';
import { EnderecoService } from 'src/modules/endereco/endereco.service';
import { PerfilModule } from 'src/modules/perfil/perfil.module';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Module({
  imports: [
    UsuarioModule,
    CadastroModule,
    PerfilModule,
    AuthModule,
    CaslModule,
    EnderecoModule,
  ],
  controllers: [EnderecoController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    EnderecoService,
  ],
})
export class AppModule {}
