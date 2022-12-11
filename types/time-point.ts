import BigNumber from 'bignumber.js';

export interface TimePoint {
	timestamp: Date;	
	point: BigNumber;
}

export interface TimePointDto {
	timestamp: string;
	point: string;
}

