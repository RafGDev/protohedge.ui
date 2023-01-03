import { Duration, Interval } from "date-fns";

export interface RebalanceInfo {
	rebalanceIntervalSeconds: number;
	durationRemainingSeconds: number;
}

export interface RebalanceInfoResponseDto {
	rebalanceIntervalSeconds: number;
	durationRemainingSeconds: number;
}



