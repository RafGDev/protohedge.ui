import { useQuery } from "@tanstack/react-query";
import { apiClient, ApiResponse } from "../common/http-client";
import { toRebalanceHistoryModel } from "../common/mapping/rebalance-history-mapping";
import { RebalanceHistoryResponseDto } from "../types/rebalance-history";

export function useRebalanceHistory(vaultAddress: string) {
	return useQuery(['rebalanceHistory', vaultAddress], async () => {
		const res = await apiClient.get<ApiResponse<RebalanceHistoryResponseDto>>(`/vault/${vaultAddress}/rebalanceHistory`);
		return toRebalanceHistoryModel(res.data.data);
	});
}
