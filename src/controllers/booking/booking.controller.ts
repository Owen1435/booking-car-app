import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { UseFilters } from '@nestjs/common/decorators';
import {BookingCarFacade} from "@booking-car/application-services";
import { BookCarRequestDto } from './dto/book-car-request.dto';
import {DatabaseExceptionFilter, WrongDatesExceptionFilter } from '@common/filters';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingCarFacade: BookingCarFacade) {}

  @ApiOperation({ summary: 'Booking car' })
  @ApiResponse({ status: 201, description: 'Success booking car', type: String })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async bookCar(@Body() bookingDto: BookCarRequestDto): Promise<string> {
    await this.bookingCarFacade.bookCar(bookingDto);
    return 'The auto has been successfully booked.';
  }
}
