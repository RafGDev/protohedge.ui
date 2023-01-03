import { RebalanceHistoryResponseDto, RebalanceNote } from "../../types/rebalance-history";

export function toRebalanceHistoryModel(dto: RebalanceHistoryResponseDto): RebalanceNote[] {
		return dto.rebalanceHistory.map(rh => ({
			date: new Date(rh.date),
			note: rh.note
		}))
}

