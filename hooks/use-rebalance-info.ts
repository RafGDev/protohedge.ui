import { useQuery } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '../common/http-client';
import { toRebalanceInfoModel } from '../common/mapping/rebalance-info-mapping';
import { RebalanceHistoryResponseDto } from '../types/rebalance-history';
import { RebalanceInfoResponseDto } from '../types/rebalance-info';


export function useRebalanceInfo(vaultAddress: string) {
	return useQuery(['rebalanceInfo', vaultAddress], async () => {
		const res = await apiClient.get<ApiResponse<RebalanceInfoResponseDto>>(`/vault/${vaultAddress}/rebalanceInfo`);
		return toRebalanceInfoModel(res.data.data);
	});
}
