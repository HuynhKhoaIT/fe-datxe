import { IUser } from "@/types/next-auth";
import { getMyAccount } from "@/utils/user";
import { useState, useEffect } from "react";

interface MyAccountHookResult {
  loading: boolean;
  error: Error | null;
  accountData: any | null;
}

const useMyAccount = (): MyAccountHookResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [accountData, setAccountData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getMyAccount();
        setAccountData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, accountData };
};

export default useMyAccount;
