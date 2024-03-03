/**
 * External Dependencies.
 */
import axios from "axios";
/**
 * Internal Dependencies.
 */
import {
  GET_CUSTOMERS_DLBD_ENDPOINT
} from "./constants/endpoints";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import ForgotPassword from '@/app/forgot-password/page';
/**
 * Get getMyAccount.
 *
 * @return {Promise<void>}
 */


export async function getCustomersFromDLBD(token : string){
  const res = await fetch(GET_CUSTOMERS_DLBD_ENDPOINT,{
    headers: {
      "Content-Type": "application/json",
      "Authorization":"Bearer "+token
    },
  });

  const data = await res.json();
  return data;
}