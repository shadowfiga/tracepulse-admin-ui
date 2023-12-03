import { useEffect, useState } from "react";

export interface UseInitialize {
  loading: boolean;
}

const useInitialize = (): UseInitialize => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    loading,
  };
};

export default useInitialize;
