import { GarageItem } from '../components/garageItem/garageItem';
import React, { useEffect, useState } from 'react';
import { getGarages } from '@/utils/garage';
import { IGarage } from '@/interfaces/garage';
import { Pagination } from '../components/pagination-area/pagination-area';
import { Grid, List } from '@mantine/core';
export default async function Expert() {
    const garageData = await getGarages();
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
            <div className="shop-area car-area list bg pt-50 pb-50">
                <div className="container">
                    <div className="d-flex flex-wrap gap-2 ">
                        {garageData.map((item, index) => (
                            <div style={{ maxWidth: '270px' }}>
                                <GarageItem garage={item} />
                            </div>
                        ))}
                    </div>
                    <Grid>
                        <Grid.Col span={12}>
                            {/* <div className="shop-item-wrapper">
                                <Row>
                                    {garage_data.map((garage: IGarage, index) => (
                                        <GarageItem garage={garage} key={index} />
                                    ))}
                                </Row>
                            </div> */}
                            {/* <Pagination data={garageData} /> */}
                        </Grid.Col>
                    </Grid>
                </div>
            </div>
        </main>
    );
}
