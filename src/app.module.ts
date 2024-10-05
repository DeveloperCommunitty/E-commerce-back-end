import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CadastroModule } from './modules/cadastro/cadastro.module';

@Module({
  imports: [UsuarioModule, CadastroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
