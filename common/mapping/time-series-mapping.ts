import BigNumber from 'bignumber.js';
import { TimePoint, TimePointDto } from '../../types/time-point';

export function toTimePointModels(timePointDtos: TimePointDto[]): TimePoint[] {
	return timePointDtos.map(toTimePointModel);
}

export function toTimePointModel(timePointDto: TimePointDto): TimePoint {
	return {
		timestamp: new Date(timePointDto.timestamp),
		point: new BigNumber(timePointDto.point)
	};
}



