import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../common/http-client";
import { toVaultModel } from '../common/mapping/vault-mapping';
import { VaultResponseDto } from '../types/vault';

export function useVault(vaultAddress: string) {
	return useQuery(['vault', vaultAddress], async () => {
		const res = await apiClient.get<VaultResponseDto>(`/vault/${vaultAddress}`);
		return toVaultModel(res.data);
	});
}