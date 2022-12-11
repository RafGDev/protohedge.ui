import { useRouter } from 'next/router';
import { ExposureChart } from '../../components/exposure-chart/exposure-chart';
import { PnlChart } from '../../components/pnl-chart/pnl-chart';
import { PositionsChart } from '../../components/positions-chart/positions-chart';
import { useHistoricPnl } from '../../hooks/use-historic-pnl';
import { useVault } from '../../hooks/use-vault';

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

  if (vaultIsLoading || !vault || historicPnlIsLoading || !historicPnl) return <>'...Loading'</>;

  return (
    <>
      <ExposureChart vault={vault} />
      <PositionsChart vault={vault} />
      <PnlChart historicPnl={historicPnl} />
    </>
  )
}