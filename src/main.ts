import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as bodyParser from 'body-parser';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use('/webhook', bodyParser.raw({ type: 'application/json' }));

  const config = new DocumentBuilder()
    .setTitle('API E-Commerce NestJS')
    .setDescription(
      'API de E-Commerce oferece recursos para criar, gerenciar e integrar plataformas de comércio eletrônico. Ela permite operações de produtos, pedidos, clientes e carrinhos de compras, com autenticação baseada em tokens para segurança. Use esta API para listar, criar, atualizar e excluir produtos, processar pedidos, gerenciar clientes e trabalhar com carrinhos de compras.\n\n' +
        '`Desenvolvedores`\n' +
        '- [Wesley Santos](https://www.linkedin.com/in/wesley-santos-developer/)\n' +
        '- [Jhoão Pedro](https://www.linkedin.com/in/jhoaosantos/)\n' +
        '- [Pedro Gabriel](https://www.linkedin.com/in/pedro-gabriel-488a05284/)\n' +
        '- [Naelly Silva](https://www.linkedin.com/in/naelly-silva-34613a20b/)\n' +
        '- [Leandro Barbosa](https://www.linkedin.com/in/leandrobarbosav/)\n\n' +
        '**Usuários de Teste**:\n\n' +
        '- **Cliente**:\n' +
        '  - **E-mail**: cliente@example.com\n' +
        '  - **Senha**: cliente123\n' +
        '  - **Permissões**: Acesso a operações de visualização e manipulação de seu próprio carrinho e pedidos.\n\n' +
        '- **Administrativo**:\n' +
        '  - **E-mail**: admin@example.com\n' +
        '  - **Senha**: admin123\n' +
        '  - **Permissões**: Acesso completo a todas as operações, incluindo criação, atualização e exclusão de produtos, além do gerenciamento de pedidos e usuários.\n\n',
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
    .addTag('Perfis')
    .addTag('Endereços')
    .addTag('Produtos')
    .addTag('Carrinhos')
    .addTag('Pagamentos')
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
