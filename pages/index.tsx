import { useRouter } from "next/router";
import styled from "styled-components";
import { ExposureChart } from "../components/exposure-chart/exposure-chart";
import { LiquidityIndicator } from "../components/liquidity-indicator/liquidity-indicator";
import { PnlChart } from "../components/pnl-chart/pnl-chart";
import { PositionsChart } from "../components/positions-chart/positions-chart";
import { RebalanceNotes } from "../components/rebalance-notes/rebalance-notes";
import { RebalanceTimer } from "../components/rebalance-timer/rebalance-timer";
import Stats from "../components/stats/stats";
import { useHistoricPnl } from "../hooks/use-historic-pnl";
import { useRebalanceNotes } from "../hooks/use-rebalance-history";
import { useRebalanceInfo } from "../hooks/use-rebalance-info";
import { useVault } from "../hooks/use-vault";

export default function VaultContainer() {
  const vaultAddress = "0x519676f17927175982CD64aEa6c026Bb9CdB67f5";
  return <Vault vaultAddress={vaultAddress} />;
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
