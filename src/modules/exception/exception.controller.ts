import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Delete,
  Body,
  Param,
  Headers,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/middleware/filters/http-exception.filter';
import { ExceptionService } from './exception.service';


@ApiBearerAuth()
@ApiTags('exception')
@UseFilters(new HttpExceptionFilter())
@Controller('/exception')
export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {}

  // 查询
  @Get()
  fetch(@Query() { id }, @Headers('token') token): string {
    if (!id) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: '请求参数id 必传', error: 'id is required' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.exceptionService.fetch(id);
  }

  // 创建
  @Post()
  @ApiBody({ description: '填写更新内容' })
  save(@Body() { message }): string {
    return this.exceptionService.save(message);
  }

  // 更新
  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '请输入message' })
  update(@Param() { id }, @Body() { message }): string {
    return this.exceptionService.update(id, message);
  }

  // 删除
  @Delete()
  remove(@Query() { id }): string {
    return this.exceptionService.remove(id);
  }
}
