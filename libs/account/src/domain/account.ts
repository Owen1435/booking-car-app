export interface Account {
    id: string;
    carId?: string
    carLoadByDay: CarLoadByDay[]
}

export interface CarLoadByDay {
    day: string;
    percent: number;
}