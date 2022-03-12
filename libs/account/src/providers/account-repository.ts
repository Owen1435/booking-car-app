/** Репозиторий домена */
import {
    GetAccountForAllCarsResponseDto
} from "@account/application-services/queries/get-account-for-all-cars/get-account-for-all-cars.response.dto";
import {
    GetAccountForCarResponseDto
} from "@account/application-services/queries/get-account-for-car/get-account-for-car.response.dto";

export interface AccountRepository {
    getAccountForCar(carId: string): Promise<GetAccountForCarResponseDto>
    getAccountForAllCars(): Promise<GetAccountForAllCarsResponseDto>
}
