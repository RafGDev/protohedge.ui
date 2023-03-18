import BigNumber from "bignumber.js";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Vault } from '../../types/vault';
import colors from "../../styles/styles";
import { formatMoney } from "../../common/money";

interface ExposureChartProps {
  vault: Vault;
}

const longExposureKey = 'Long Exposure';
const shortExposureKey = 'Short Exposure';

export function ExposureChart(props: ExposureChartProps) {
  const initialExposures: { [key: string]: { longExposure: BigNumber, shortExposure: BigNumber } } = {};

  const exposures = Object.entries(props.vault.positionManagers.reduce((current, position) => {
    position.tokenExposures.forEach(exposure => {

      if (exposure.token.toLowerCase() !== process.env.btcAddress?.toLowerCase() && exposure.token.toLowerCase() !== process.env.ethAddress?.toLowerCase()) return;
      if (!current[exposure.symbol]) {
        current[exposure.symbol] = {
          longExposure: new BigNumber(0),
          shortExposure: new BigNumber(0),
        };
      }

      if (exposure.amount.gt(0)) {
        current[exposure.symbol].longExposure = current[exposure.symbol].longExposure.plus(exposure.amount);
      } else if (exposure.amount.lt(0)) {
        current[exposure.symbol].shortExposure = current[exposure.symbol].shortExposure.plus(exposure.amount);
      }
    });

    return current;
  }, initialExposures) || {})
    .map(([symbol, exposure]) => ({ symbol: symbol, [longExposureKey]: exposure.longExposure.toNumber(), [shortExposureKey]: exposure.shortExposure.abs().toNumber() }))

  return (
      <ResponsiveContainer>
        <BarChart height={250} data={exposures}>
          <CartesianGrid strokeDasharray='3 3' stroke={colors['primary-light']} />
          <XAxis dataKey="symbol" stroke={colors.text} />
          <YAxis
            stroke={colors.text}
            tickFormatter={(val: any) => formatMoney(new BigNumber(val))} />
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
          <Bar
            dataKey={longExposureKey}
            fill={colors.green}
          />

          <Bar
            dataKey={shortExposureKey}
            fill={colors.purple}
          />
        </BarChart>
      </ResponsiveContainer>
  );
}
