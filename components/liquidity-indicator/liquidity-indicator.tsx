import styles from './liquidity-indicator.module.scss';
import { Vault } from '../../types/vault';
import { formatMoney } from '../../common/money';
import BigNumber from 'bignumber.js';
import classNames  from 'classnames';
import colors from '../../styles/styles';

interface LiquidityIndicatorProps {
  vault: Vault;
}

const indicatorColors = [
  colors.green,
  colors.purple,
  colors.blue,
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
  const classes = classNames('flex items-center justify-center first:rounded-l-md last:rounded-r-md text-ellipsis overflow-hidden pb-3 px-1')
  const positionsWorth = props.vault.positionManagers
    .filter(positionManager => !positionManager.positionWorth.isZero())
    .map((positionManager, i) => (
      <div className={classes} style={{backgroundColor: indicatorColors[i % indicatorColors.length], width: `calc(${getPercentage(positionManager.positionWorth, props.vault.vaultWorth)}%)`, textOverflow: 'ellipsis', overflow: 'hidden', display: 'inline-block'}}>
        <span>{positionManager.name} ({formatMoney(positionManager.positionWorth)})</span>
      </div>
    ))
    .concat([
      <div className={classes} style={{backgroundColor: indicatorColors[indicatorColors.length], width: `calc(${availableLiquidityPercentage}%)`, textOverflow: 'ellipsis', overflow: 'hidden', display: 'inline-block'}}>
        <span>Available Liquidity ({formatMoney(props.vault.availableLiquidity)})</span>
      </div>
    ])
  
  return (
    <>
    <div className="h-5 border border-primary-light rounded-md flex h-6" >
      {positionsWorth}
    </div>

      <div className={styles.vaultWorth}>
        Vault Worth ({vaultWorth})
      </div>
    </>
  );
}


