import { useQuery } from "@tanstack/react-query";
import { apiClient, ApiResponse } from "../common/http-client";
import { toTimePointModels } from '../common/mapping/time-series-mapping';
import { HistoricPnlResponseDto } from "../types/pnl";
import { TimePointDto } from '../types/time-point';

export function useHistoricPnl(vaultAddress: string) {
	return useQuery(['vault', vaultAddress, 'historicPnl'], async () => {

		const res = await apiClient.get<ApiResponse<HistoricPnlResponseDto>>(`/vault/${vaultAddress}/historicPnl`);
		return toTimePointModels(res.data.data.historicPnl);
	});
}
