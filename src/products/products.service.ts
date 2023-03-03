import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {

  constructor(
    private prisma: PrismaService
  ){}

  async create(createProductDto: CreateProductDto) {
      const userExist = await this.prisma.user.findUnique({
        where: {
          id: createProductDto.userId
        }
        });

        const productCreateInput: Prisma.ProductCreateInput = {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          quantity: createProductDto.quantity,
          image: '',
          user: {
            // create: undefined,
            connectOrCreate: {
              where: {
                id: createProductDto.userId,
              },
              create: undefined
            },
            connect: {
              id: createProductDto.userId,
            }
          },
          category: {
            // create: undefined,
            connectOrCreate: {
              where: {
                id: createProductDto.categoryId,
              },
              create: undefined
            },
            connect: {
              id: createProductDto.categoryId,
            }
          }
        }

      if(userExist){
        const product = await this.prisma.product.create({
          data: productCreateInput
        })
        return {
          status: 201,
          ...product
        };
  }
}

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
