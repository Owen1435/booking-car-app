export class GetReportForCarResponseDto {
    carId: number;
    data: {
        day: string;
        percent: number;
    }[]
}