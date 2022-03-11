export class BookCarCommand {
    constructor(
        public readonly carId: string,
        public readonly rateId: string,
        public readonly startDate: string,
        public readonly endDate: string
    ) {}
}
