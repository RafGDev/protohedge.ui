import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../common/http-client";
import { toRebalanceNotesModel } from "../common/mapping/rebalance-history-mapping";
import { RebalanceNotesResponseDto } from "../types/rebalance-notes";

export function useRebalanceNotes(vaultAddress: string) {
  return useQuery(["rebalanceNotes", vaultAddress], async () => {
    const res = await apiClient.get<RebalanceNotesResponseDto>(
      `/vault/${vaultAddress}/rebalanceNotes`
    );
    return toRebalanceNotesModel(res.data);
  });
}
