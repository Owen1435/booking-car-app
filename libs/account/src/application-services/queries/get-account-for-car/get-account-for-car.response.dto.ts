export class GetAccountForCarResponseDto {
    carId: string;
    data: Array<{
        day: string;
        percent: number;
    }>
}