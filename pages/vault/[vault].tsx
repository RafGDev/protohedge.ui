import { useRouter } from "next/router";
import { ExposureChart } from "../../components/exposure-chart/exposure-chart";
import { PnlChart } from "../../components/pnl-chart/pnl-chart";
import { PositionsChart } from "../../components/positions-chart/positions-chart";
import { LiquidityIndicator } from "../../components/liquidity-indicator/liquidity-indicator";
import { useHistoricPnl } from "../../hooks/use-historic-pnl";
import { useVault } from "../../hooks/use-vault";
import { RebalanceNotes } from "../../components/rebalance-notes/rebalance-notes";
import { useRebalanceNotes } from "../../hooks/use-rebalance-history";
import { RebalanceTimer } from "../../components/rebalance-timer/rebalance-timer";
import { useRebalanceInfo } from "../../hooks/use-rebalance-info";
import styled from "styled-components";
import Stats from "../../components/stats/stats";
import { useProjectedApy } from "../../hooks/use-projected-apy";

export default function VaultContainer() {
  const router = useRouter();
  if (!router.isReady) return "...Loading";
  const { vault } = router.query;

  if (!vault) {
    return router.back();
  }

  return <Vault vaultAddress={vault as string} />;
}

interface VaultProps {
  vaultAddress: string;
}

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  padding: 10px;
  min-height: 100px;
`;

function Vault(props: VaultProps) {
  const {
    data: vault,
    error: vaultError,
    isLoading: vaultIsLoading,
  } = useVault(props.vaultAddress);
  const {
    data: historicPnl,
    error: historicPnlError,
    isLoading: historicPnlIsLoading,
  } = useHistoricPnl(props.vaultAddress);
  const {
    data: rebalanceNotes,
    error: rebalanceNotesError,
    isLoading: rebalanceNotesIsLoading,
  } = useRebalanceNotes(props.vaultAddress);
  const {
    data: rebalanceInfo,
    error: rebalanceError,
    isLoading: rebalanceInfoIsLoading,
  } = useRebalanceInfo(props.vaultAddress);

  if (
    vaultIsLoading ||
    !vault ||
    historicPnlIsLoading ||
    !historicPnl ||
    rebalanceNotesIsLoading ||
    !rebalanceNotes ||
    rebalanceInfoIsLoading ||
    !rebalanceInfo
  )
    return <>'...Loading'</>;

  return (
    <div>
      <TopGrid>
        <Stats vault={vault} />
        <RebalanceTimer rebalanceInfo={rebalanceInfo} />
      </TopGrid>
      <LiquidityIndicator vault={vault} />

      <div className="grid grid-cols-2 gap-8">
        <div className="min-h-[250px]">
          <ExposureChart vault={vault} />
        </div>
        <div className="min-h-[250px]">
          <PositionsChart vault={vault} />
        </div>
        <div className="min-h-[250px]">
          <PnlChart historicPnl={historicPnl} />
        </div>
        <div className="min-h-[250px]">
          <RebalanceNotes rebalanceNotes={rebalanceNotes} />
        </div>
        <div className="min-h-[250px]"></div>
      </div>
    </div>
  );
}
