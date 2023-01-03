import { Interval } from 'date-fns';
import { RebalanceInfo, RebalanceInfoResponseDto } from '../../types/rebalance-info';

export function toRebalanceInfoModel(dto: RebalanceInfoResponseDto): RebalanceInfo {
	return {
		rebalanceIntervalSeconds: dto.rebalanceIntervalSeconds,
		durationRemainingSeconds: dto.durationRemainingSeconds
	};
}
