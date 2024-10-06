import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProfileModule } from './modules/perfil/perfil.module';

@Module({
  imports: [UsuarioModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
