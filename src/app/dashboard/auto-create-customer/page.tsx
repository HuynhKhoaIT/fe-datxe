import React from "react";
import styles from "./index.module.scss";
import axios from "axios";
import { useSearchParams } from "next/navigation";
export default  function AutoCreateCustomer() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const phone = searchParams.get("phone");
    const res =  axios.post(
        `/api/customer`,
        {
          fullName: name,
          phoneNumber: phone,
          cityId: 0,
          districtId: 0,
          wardId: 0,
          address: '',
          dob: '',
          description: '',
          sex: 'MALE',
          garageId: process.env.GARAGE_DEFAULT,
          status: 'PUBLIC',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

  return (
    <>
    </>
  );
}