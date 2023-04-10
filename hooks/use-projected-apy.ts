import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { apiClient } from "../common/http-client";

export function useProjectedApy(vaultAddress: string) {
  return useQuery(["projectedApy", vaultAddress], async () => {
    const res = await apiClient.get<string>(
      `/vault/${vaultAddress}/projectedApy`
    );

    return new BigNumber(res.data);
  });
}
