import styles from './liquidity-indicator.module.scss';
import { Vault } from '../../types/vault';
import { formatMoney } from '../../common/money';
import BigNumber from 'bignumber.js';

interface LiquidityIndicatorProps {
  vault: Vault;
}

const colors = [
  '#0984e3',
  '#fab1a0',
  '#6c5ce7',
  '#fdcb6e',
  '#00b894',
  '#636e72',
  '#d63031'
];

function getPercentage(metric: BigNumber, vaultWorth: BigNumber) {
  return metric.div(vaultWorth).toNumber() * 100; 
}

export function LiquidityIndicator(props: LiquidityIndicatorProps) {
  const availableLiquidityPercentage = getPercentage(props.vault.availableLiquidity, props.vault.vaultWorth);
  const vaultWorth = formatMoney(props.vault.vaultWorth);

  const positionsWorth = props.vault.positionManagers
    .filter(positionManager => !positionManager.positionWorth.isZero())
    .map((positionManager, i) => (
      <div className="flex items-center justify-center first:rounded-l-md last:rounded-r-md text-ellipsis overflow-hidden" style={{backgroundColor: colors[i % colors.length], width: `${getPercentage(positionManager.positionWorth, props.vault.vaultWorth)}%`}}>
        <span>{positionManager.name} ({formatMoney(positionManager.positionWorth)})</span>
      </div>
    ));
  
  return (
    <>
    <div className="h-5 border rounded-md flex" >
      {positionsWorth}
    </div>

      <div className={styles.vaultWorth}>
        Vault Worth ({vaultWorth})
      </div>
    </>
  );
}


