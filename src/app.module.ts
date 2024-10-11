import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CaslModule } from './casl/casl.module';
import { CadastroModule } from './modules/cadastro/cadastro.module';
import { PerfilModule } from './modules/perfil/perfil.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { EnderecoService } from './modules/endereco/endereco.service';
import { EnderecoController } from './modules/endereco/endereco.controller';

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
