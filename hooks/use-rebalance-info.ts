import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../common/http-client';
import { toRebalanceInfoModel } from '../common/mapping/rebalance-info-mapping';
import { RebalanceNotesResponseDto } from '../types/rebalance-notes';
import { RebalanceInfoResponseDto } from '../types/rebalance-info';


export function useRebalanceInfo(vaultAddress: string) {
	return useQuery(['rebalanceInfo', vaultAddress], async () => {
		const res = await apiClient.get<RebalanceInfoResponseDto>(`/vault/${vaultAddress}/rebalanceInfo`);
		return toRebalanceInfoModel(res.data);
	});
}
