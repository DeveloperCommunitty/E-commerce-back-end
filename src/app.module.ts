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
import { StripeModule } from './modules/stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './modules/cart/cart.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UsuarioModule,
    CadastroModule,
    PerfilModule,
    ProdutosModule,
    AuthModule,
    CaslModule,
    CloudinaryModule,
    EnderecoModule,
    StripeModule,
    CartModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CloudinaryService,
  ],
  controllers: [],
})
export class AppModule {}
