import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {ApiBadRequestResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import { UseFilters } from '@nestjs/common/decorators';
import { DatabaseExceptionFilter, WrongDatesExceptionFilter } from 'src/common/filters';
import {BookingCarFacade} from "@booking-car/application-services";
import { BookCarRequestDto } from './dto/book-car-request.dto';

@Controller('booking-new')
export class BookingController {
  constructor(private readonly bookingCarFacade: BookingCarFacade) {}

  @ApiOperation({ summary: 'Booking car' })
  @ApiResponse({ status: 201, description: 'Success booking car', type: String })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async bookCar(@Body() bookingDto: BookCarRequestDto): Promise<string> {
    await this.bookingCarFacade.bookCar(
        bookingDto.carId.toString(),
        bookingDto.rateId.toString(),
        bookingDto.startDate,
        bookingDto.endDate
    );
    return 'The auto has been successfully booked.';
  }
}
