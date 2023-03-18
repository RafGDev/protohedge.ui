export interface RebalanceNote {
	date: Date;
	note: string;
}

export interface RebalanceNotesResponseDto {
	rebalanceNotes: {
		date: string;
		note: string;
	}[]
}
