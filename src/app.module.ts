import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedKernelModule } from './shared-kernel/shared-kernel.module';
import { PropertyModule } from './property/property.module';
import { MongooseConfigModule } from './property/infrastructure/mongoose/mongoose.module';
import config from './property/infrastructure/config';
import { environments } from './environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    SharedKernelModule,
    PropertyModule,
    MongooseConfigModule,
  ],
})
export class AppModule {}
