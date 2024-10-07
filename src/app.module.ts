import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProfileModule } from './modules/perfil/perfil.module';
import { CadastroModule } from './modules/cadastro/cadastro.module';

@Module({
  imports: [UsuarioModule, ProfileModule, CadastroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
