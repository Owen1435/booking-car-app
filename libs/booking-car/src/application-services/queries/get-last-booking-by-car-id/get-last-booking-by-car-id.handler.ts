import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLastBookingByCarIdQuery } from './get-last-booking-by-car-id.query';
import {Inject} from "@nestjs/common";
import {BookingCarRepository} from "@booking-car/providers";
import {BookingCarDomain} from "@booking-car/domain/booking-car-domain";
import {
    GetLastBookingResponseDto
} from "@booking-car/application-services/queries/get-last-booking-by-car-id/get-last-booking.response.dto";

@QueryHandler(GetLastBookingByCarIdQuery)
export class GetLastBookingByCarIdHandler implements ICommandHandler<GetLastBookingByCarIdQuery> {
    constructor(@Inject('BookingCarRepository') private repository: BookingCarRepository) {}

    async execute(command: GetLastBookingByCarIdQuery): Promise<GetLastBookingResponseDto> {
        const { carId } = command;
        const booking = await this.repository.getLastBookingByCarId(carId)

        return new BookingCarDomain(booking);
    }
}
