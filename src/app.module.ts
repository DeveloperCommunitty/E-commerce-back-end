import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CaslModule } from './casl/casl.module';
import { CadastroModule } from './modules/cadastro/cadastro.module';
import { PerfilModule } from './modules/perfil/perfil.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EnderecoModule } from './modules/endereco/endereco.module';

@Module({
  imports: [
    UsuarioModule,
    CadastroModule,
    PerfilModule,
    ProdutosModule,
    AuthModule,
    CaslModule,
    CloudinaryModule,
    EnderecoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CloudinaryService,
  ],
})
export class AppModule {}
