import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { MemberType } from './schemas';
import { StatusCodes } from 'http-status-codes';
import { FavTypeValidationPipe } from './pipes/favTypeValidation.pipe';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post(':member/:id')
  addToFav(
    @Param('member', FavTypeValidationPipe) member: MemberType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    this.favsService.addToFav(member, id);
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete(':member/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(
    @Param('member', FavTypeValidationPipe) member: MemberType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favsService.removeFromFav(member, id);
  }
}
