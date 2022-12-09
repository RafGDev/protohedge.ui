import BigNumber from "bignumber.js";
import { PositionManager, PositionManagerResponseDto } from "../../types/position-manager";

export function toPositionManagerModel(dto: PositionManagerResponseDto): PositionManager {
	return {
		positionManagerAddress: dto.positionManagerAddress,
		name: dto.name,
		positionWorth: new BigNumber(dto.positionWorth),
		costBasis: new BigNumber(dto.costBasis),
		pnl: new BigNumber(dto.pnl),
		loanWorth: new BigNumber(dto.loanWorth),
		liquidationLevel: new BigNumber(dto.liquidationLevel),
		collateral: new BigNumber(dto.collateral),
		tokenExposures: dto.tokenExposures.map(e => ({
			symbol: e.symbol,
			amount: new BigNumber(e.amount),	
			token: e.token
		})),
		tokenAllocation: dto.tokenAllocation.map(t => ({
			symbol: t.symbol,
			percentage: t.percentage,
			tokenAddress: t.tokenAddress,
			leverage: t.leverage
		})),
		canRebalance: dto.canRebalance
	};	
}

