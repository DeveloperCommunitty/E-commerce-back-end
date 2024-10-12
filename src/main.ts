import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('API E-Commerce NestJS')
    .setDescription(
      'API de E-Commerce oferece recursos para criar, gerenciar e integrar plataformas de comércio eletrônico. Ela permite operações de produtos, pedidos, clientes e carrinhos de compras, com autenticação baseada em tokens para segurança. Use esta API para listar, criar, atualizar e excluir produtos, processar pedidos, gerenciar clientes e trabalhar com carrinhos de compras.\n\n`Desenvolvedores`\n- [Wesley Santos](https://www.instagram.com/_wesley.dev/) \n\n- [Jhoão Pedro](https://www.instagram.com/jhoao_ns/) \n\n- [Pedro Gabriel](https://www.instagram.com/pedin_nm/) \n\n- [Naelly Silva]() \n\n- [Leandro Barbosa](https://www.linkedin.com/in/leandrobarbosav/)',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access_token',
    )
    .addTag('Login')
    .addTag('Cadastrar')
    .addTag('Usuarios')
    .addTag('Perfil')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const options = {
    customSiteTitle: 'API E-Commerce',
    customCss: `.topbar-wrapper a {
                content: url(https://i.imgur.com/fAjARMz.png);
                width: 150px;
                height: auto;
            }
            .swagger-ui .topbar {
                background-color: #000000;
                border-bottom: 7px solid #9cff1e;
            }
            .topbar-wrapper span {
                display: none;
            }`,
  };

  SwaggerModule.setup('docs', app, document, options);

  await app.listen(3000);
}
bootstrap();
