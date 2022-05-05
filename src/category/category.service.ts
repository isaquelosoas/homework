import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.createCategory(data);
  }

  async getCategories(data: Category): Promise<Category[]> {
    return this.categoryRepository.getCategories(data);
  }
}
