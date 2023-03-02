import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

  constructor(private prisma: PrismaService){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: createCategoryDto
    })
    return category;
  }

  findAll() {
    const categories = this.prisma.category.findMany();
    return categories;
  }

  findOne(id: number) {
    const category = this.prisma.category.findUnique({
      where: {
        id: id
      }
    })
    return category;
  }

  // TODO: Update this to use the Prisma service
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
