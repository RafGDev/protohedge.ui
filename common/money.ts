import BigNumber from "bignumber.js";
import { USDC_MULTIPLIER } from "./constants";

export function formatMoney(number: BigNumber) {
  return `$${number.div(USDC_MULTIPLIER).toNumber().toFixed(2).toLocaleString()}`; 
}
