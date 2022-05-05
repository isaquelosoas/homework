import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @Get()
  getCategories(data: Category) {
    return this.categoryService.getCategories(data);
  }
}
