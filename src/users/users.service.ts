import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {

    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    })

    if(userExists){
      return{
        status: 409,
        message: "User already exists"
      }
    }


    const user = await this.prisma.user.create({
      data: createUserDto
    })
    return {
      status: 201,
      ...user
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if(user){
      return {
        status: 200,
        ...user
      };
    }else{
      return "User not found";
    }
  }
  
  // TODO: Implement update and remove methods
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(email: string, password: string){
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if(user){
      if(user.password == password){
        return {
          status: 200,  
          ...user
        };
      }else{
        return {
          status: 401,
          message: "Wrong password" 
        };
      }
    }else{
      return {
        status: 404,
        message: "User not found"
      };
    }
  }

}
