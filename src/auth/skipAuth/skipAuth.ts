import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const IS_PUBLIC_KEY = async (configService: ConfigService) => ({
    IS_PUBLIC_KEY: configService.get<string>('IS_PUBLIC_KEY'), 
});

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);