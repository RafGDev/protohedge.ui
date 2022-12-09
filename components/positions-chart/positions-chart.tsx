import BigNumber from 'bignumber.js';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { Vault } from '../../types/vault';

interface PositionsChartProps {
    vault: Vault;
}

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
      ).map(([symbol, position]) => ({ symbol: symbol, positionWorth: position.positionWorth, loanWorth: position.loanWorth, liquidationLevel: position.liquidationLevel, collateral: position.collateral }));

    return (
      <BarChart width={730} height={250} data={positions}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="symbol" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="positionWorth" fill="#8482a8" />
        <Bar dataKey="loanWorth" fill="#8884d8" />
        <Bar dataKey="liquidationLevel" fill="#82ca9d" />
        <Bar dataKey="collateral" fill="#32cb9b" />
        
      </BarChart>
    );
}