export class BookCarCommand {
    constructor(
        public readonly carId: number,
        public readonly rateId: number,
        public readonly startDate: string,
        public readonly endDate: string
    ) {}
}
