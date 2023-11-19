export interface ICar {
    map(arg0: (item: any, index: any) => import('react').JSX.Element): import('react').ReactNode;
    id?: number;
    licensePlates?: string;
    automakerId?: number;
    carNameId?: number;
    vinNumber?: number;
    color?: string;
    maintenanceDate?: string;
    registrationDate?: string;
    civilInsuranceDate?: string;
    materialInsuranceDate?: string;
    description?: string;
    kmRepair?: number;
    machineNumber?: number;
    brandCarName?: any;
    modelCarName?: any;
}
