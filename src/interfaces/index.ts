export interface BarbershopInterface {
    id: string;
    name: string;
    address: string;
    phones: string[];
    description: string;
    imageURL: string;
    BarbershopServices: BarbershopServiceInterface[];
    createdAt: Date;
    updatedAt: Date;
}

export interface BarbershopServiceInterface {
    id: string;
    name: string;
    description: string;
    price: number;
    imageURL: string;
    createdAt: Date;
    updatedAt: Date;
    Barbershop: string;
    barbershopId: string;
}