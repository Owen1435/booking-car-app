export class CalculatePriceQuery {
    constructor(
        public readonly startDate: string,
        public readonly endDate: string,
        public readonly rateId: string
    ) {}
}
