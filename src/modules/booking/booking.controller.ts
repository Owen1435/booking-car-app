import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BookCarRequestDto } from './dto/request/book-car-request.dto';
import { BookingService } from './service/booking.service';
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { UseFilters } from '@nestjs/common/decorators';
import { DatabaseExceptionFilter, WrongDatesExceptionFilter } from 'src/common/filters';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Booking car' })
  @ApiResponse({ status: 201, description: 'Success booking car', type: String })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async bookCar(@Body() bookingDto: BookCarRequestDto): Promise<string> {
    await this.bookingService.bookCar(bookingDto);
    return 'The auto has been successfully booked.';
  }
}
