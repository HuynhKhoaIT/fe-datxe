"use client";
import React, { useEffect, useState } from "react";
import CarForm from "../create/CarForm";
import axios from "axios";
export const revalidate = 60;
export default function UpdateCar({ params }: { params: { carId: number } }) {
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/car/${params?.carId}`);
        console.log(response);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.carId]);
  return <CarForm isEditing={true} dataDetail={car} />;
}
