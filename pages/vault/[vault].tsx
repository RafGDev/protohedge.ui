import { useRouter } from 'next/router';
import { ExposureChart } from '../../components/exposure-chart/exposure-chart';
import { PnlChart } from '../../components/pnl-chart/pnl-chart';
import { PositionsChart } from '../../components/positions-chart/positions-chart';
import { LiquidityIndicator } from '../../components/liquidity-indicator/liquidity-indicator';;
import { useHistoricPnl } from '../../hooks/use-historic-pnl';
import { useVault } from '../../hooks/use-vault';
import { RebalanceHistory } from '../../components/rebalance-history/rebalance-history';
import { useRebalanceHistory } from '../../hooks/use-rebalance-history';
import { RebalanceTimer } from '../../components/rebalance-timer/rebalance-timer';
import { useRebalanceInfo } from '../../hooks/use-rebalance-info';

export default function VaultContainer() {
  const router = useRouter();
  if (!router.isReady) return '...Loading';
  const {vault} = router.query;

  if (!vault) {
    return router.back();
  }

  return <Vault vaultAddress={vault as string} />
}

interface VaultProps {
  vaultAddress: string;
}

function Vault(props: VaultProps) {
  const { data: vault, error: vaultError, isLoading: vaultIsLoading } = useVault(props.vaultAddress);
  const { data: historicPnl, error: historicPnlError, isLoading: historicPnlIsLoading } = useHistoricPnl(props.vaultAddress);
  const { data: rebalanceHistory, error: rebalanceHistoryError, isLoading: rebalanceHistoryIsLoading } = useRebalanceHistory(props.vaultAddress);
  const { data: rebalanceInfo, error: rebalanceError, isLoading: rebalanceInfoIsLoading } = useRebalanceInfo(props.vaultAddress);

  if (vaultIsLoading || !vault || historicPnlIsLoading || !historicPnl || rebalanceHistoryIsLoading || !rebalanceHistory || rebalanceInfoIsLoading || !rebalanceInfo) return <>'...Loading'</>;

  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
          <div className="min-h-[250px]"><ExposureChart vault={vault} /></div>
          <div className="min-h-[250px]"><PositionsChart vault={vault} /></div>
          <div className="min-h-[250px]"><PnlChart historicPnl={historicPnl} /></div>
          <div className="min-h-[250px]"><RebalanceHistory rebalanceHistory={rebalanceHistory} /></div>
          <div className="min-h-[250px]"><RebalanceTimer rebalanceInfo={rebalanceInfo} /></div>
      </div>

      <LiquidityIndicator vault={vault} />
    </div>
  )
}
