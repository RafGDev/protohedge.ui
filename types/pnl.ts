import BigNumber from 'bignumber.js';
import { TimePointDto } from './time-point';

export interface Pnl {
	pnlWorth: BigNumber;
	pnlPercentage: string;
	costBasis: BigNumber;
	positionWorth: BigNumber;
}

export interface HistoricPnlResponseDto {
	historicPnl: TimePointDto[];
}