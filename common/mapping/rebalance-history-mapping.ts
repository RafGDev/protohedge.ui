import { RebalanceNotesResponseDto, RebalanceNote } from "../../types/rebalance-notes";

export function toRebalanceNotesModel(dto: RebalanceNotesResponseDto): RebalanceNote[] {
		return dto.rebalanceNotes.map(rh => ({
			date: new Date(rh.date),
			note: rh.note
		}))
}

