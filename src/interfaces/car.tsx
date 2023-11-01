export interface ICar {
    map(arg0: (item: any, index: any) => import('react').JSX.Element): import('react').ReactNode;
    id?: string | number;
    licensePlates?: string;
    automakerId?: BigInteger;
    carNameId?: BigInteger;
    vinNumber?: BigInteger;
    color?: string;
    maintenanceDate?: string;
    registrationDate?: string;
    civilInsuranceDate?: string;
    materialInsuranceDate?: string;
}
