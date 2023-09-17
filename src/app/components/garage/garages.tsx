import { IGarage } from '@/interfaces/garage';
import { getGarages } from '@/utils/garage';
import { GarageItem } from '../garageItem/garageItem';
import { GetStaticPathsResult } from 'next';
import { GetStaticPropsResult } from 'next';

interface GaragesProps {
    garages: IGarage[];
}

export default function Garages({ garages }: GaragesProps) {
    return (
        <div className="row">
            {garages?.map((garage: IGarage, index: number) => <GarageItem garage={garage} key={index} />)}
        </div>
    );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<GaragesProps>> {
    // Fetch data to generate dynamic paths
    const garageList = await getGarages();

    return {
        props: {
            garages: garageList,
        },
    };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    return {
        paths: [],
        fallback: false, // Set to 'blocking' or true if needed
    };
}
