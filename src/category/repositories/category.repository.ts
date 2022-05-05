import { Injectable } from '@nestjs/common';
import { Category, Prisma, PrismaClient } from '@prisma/client';
import { PrismaException } from '../../user/exceptions/prisma.exceptions';

const prisma = new PrismaClient();

@Injectable()
export class CategoryRepository {
  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return prisma.category
      .create({ data })
      .catch((error: Prisma.PrismaClientKnownRequestError) => {
        throw new PrismaException('Error creating category', error);
      });
  }

  async getCategories(data: Prisma.CategoryWhereInput): Promise<Category[]> {
    return prisma.category.findMany({ where: data }).catch((err) => {
      throw new PrismaException('Category not found', err);
    });
  }
}
