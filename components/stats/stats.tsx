import BigNumber from "bignumber.js";
import styled from "styled-components";
import { formatMoney } from "../../common/money";
import { Vault } from "../../types/vault";
import { StatsCard } from "../stats-card/stats-card";

interface Props {
  vault: Vault;
}

styled(StatsCard)``;

export default function Stats(props: Props) {
  const positionsWorth = props.vault.positionManagers.reduce(
    (prev, current) => prev.plus(current.positionWorth),
    new BigNumber(0)
  );

  return (
    <>
      <StatsCard name="Total Profit" value={formatMoney(props.vault.pnl)} />
      <StatsCard name="Positions Worth" value={formatMoney(positionsWorth)} />
    </>
  );
}
