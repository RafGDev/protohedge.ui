export interface RebalanceNote {
	date: Date;
	note: string;
}


export interface RebalanceHistoryResponseDto {
	rebalanceHistory: {
		date: string;
		note: string;
	}[]
}
