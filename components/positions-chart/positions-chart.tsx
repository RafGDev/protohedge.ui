import BigNumber from 'bignumber.js';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatMoney } from '../../common/money';
import colors from '../../styles/styles';
import { Vault } from '../../types/vault';

interface PositionsChartProps {
    vault: Vault;
}

const loanWorthKey = 'Loan Worth';
const liquidationLevelKey = 'Liquidation Level';
const collateralKey = 'Collateral';

export function PositionsChart(props: PositionsChartProps) {
    const initialPositions: {[key: string]: { positionWorth: number, loanWorth?: number, liquidationLevel?: number, collateral?: number }} = {};

      const positions = Object.entries(
        props.vault.positionManagers.reduce((current, position) => {
          current[position.name] = { positionWorth: position.positionWorth.toNumber() };

          if (position.loanWorth.gt(0)) {
            current[position.name].loanWorth = position.loanWorth.toNumber();
          }

          if (position.liquidationLevel.gt(0)) {
            current[position.name].liquidationLevel = position.liquidationLevel.toNumber();
          }

          if (position.collateral.gt(0)) {
            current[position.name].collateral = position.collateral.toNumber();
          }

          return current;
        }, initialPositions) || {},
      ).map(([symbol, position]) => ({ 
        symbol: symbol,
        [loanWorthKey]: position.loanWorth,
        [liquidationLevelKey]: position.liquidationLevel,
        [collateralKey]: position.collateral
      }));

    return (
      <ResponsiveContainer>
        <BarChart height={250} data={positions}>
          <CartesianGrid strokeDasharray='3 3' stroke={colors['primary-light']} />
          <XAxis dataKey="symbol" stroke={colors.text} />
          <YAxis
            stroke={colors.text}
            tickFormatter={(val: any) => formatMoney(new BigNumber(val))}
          />
          <Tooltip 
            cursor={{
              fill: colors['primary-dark']
            }}
            contentStyle={{
              backgroundColor: colors['primary-dark']
            }}
            formatter={(val: any) => formatMoney(new BigNumber(val))}
          />
          <Legend />

          <Bar dataKey={loanWorthKey} fill={colors.green} />
          <Bar dataKey={liquidationLevelKey} fill={colors.purple} />
          <Bar dataKey={collateralKey} fill={colors.blue} />
          
        </BarChart>
      </ResponsiveContainer>
    );
}
