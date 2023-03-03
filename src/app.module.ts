import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [PrismaModule, UsersModule, CategoryModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
