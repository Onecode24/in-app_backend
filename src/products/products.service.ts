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
    createProductDto.createdAt = new Date().toString();
    createProductDto.updatedAt = new Date().toString();
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
            // connectOrCreate: {
            //   where: {
            //     id: createProductDto.userId,
            //   },
            //   create: undefined
            // },
            connect: {
              id: createProductDto.userId,
            }
          },
          category: {
            // create: undefined,
            // connectOrCreate: {
            //   where: {
            //     id: createProductDto.categoryId,
            //   },
            //   create: undefined
            // },
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
      }else
        return {
          status: 404,
          message: 'User not found'
        }
}

  async findAll(userId: number) {
    // return `This action returns all products`;
    const userExist = await this.prisma.user.findUnique({
      where: {
        id: userId
      }});
      if(userExist){
        const products = await this.prisma.product.findMany({
          where: {
            userId: userId
          }
        });
        return {
          status: 200,
          ...products
        };
      }else{
        return {
          status: 404,
          message: 'User not found'
        }
      }
  }

  findOne(id: number) {
    const product = this.prisma.product.findUnique({
      where: {
        id: id
      }});
      if(product){
        return {
          status: 200,
          ...product
        };
      }else{
        return {
          status: 404,
          message: 'Product not found'
        }
      }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
