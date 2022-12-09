import BigNumber from 'bignumber.js';

export interface Exposure {
	amount: BigNumber;
	token: string;	
  symbol: string;
}

export interface TokenAllocation {
  percentage: number;
  tokenAddress: string;
  leverage: number; 
  symbol: string;
}

export interface PositionManager {
  positionManagerAddress: string;
  name: string;
  positionWorth: BigNumber;
  costBasis: BigNumber;
  pnl: BigNumber;
  loanWorth: BigNumber;
  liquidationLevel: BigNumber; 
  collateral: BigNumber;
  tokenExposures: Exposure[];
  tokenAllocation: TokenAllocation[];
  canRebalance: boolean;
}

export interface PositionManagerResponseDto {
  positionManagerAddress: string;
  name: string;
  positionWorth: string;
  costBasis: string;
  pnl: string;
  loanWorth: BigNumber;
  liquidationLevel: BigNumber; 
  collateral: BigNumber;
  tokenExposures: {
    symbol: string;
    amount: string;
    token: string;
  }[];
  tokenAllocation: {
    symbol: string;
    percentage: number;
    tokenAddress: string;
    leverage: number;
  }[];
  canRebalance: boolean;
}

export enum PositionType {
	Long,
	Short
}