import { GarageItem } from "../components/garageItem/garageItem";
import React, { useEffect, useState } from "react";
import { getGarages } from "@/utils/garage";
export default async function Expert() {
  const garageData = await getGarages();
  return (
    <div className="shop-area car-area list bg pt-50 pb-50">
      <div className="container">
        <div className="d-flex flex-wrap gap-2 ">
          {garageData.map((item, index) => (
            <div style={{ maxWidth: "270px" }}>
              <GarageItem garage={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
