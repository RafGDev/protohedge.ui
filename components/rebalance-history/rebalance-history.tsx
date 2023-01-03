import { format } from 'date-fns';
import React from 'react';
import { RebalanceNote } from '../../types/rebalance-history';

interface IProps {
	rebalanceHistory: RebalanceNote[]; 
}

export function RebalanceHistory(props: IProps) {
	console.log('It is: ');
	console.log(props.rebalanceHistory);
	const renderedRebalanceNote = props.rebalanceHistory.map((rebalanceNote: RebalanceNote) => (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{format(rebalanceNote.date, "dd MMM hh:mm a")}
			</th>
			<td className="py-4 px-6"> {rebalanceNote.note}
			</td>
		</tr>
	));

	return (
		<div className="overflow-x-auto relative">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="py-3 px-6">
							Date	
						</th>
						<th scope="col" className="py-3 px-6">
							Note
						</th>
					</tr>
				</thead>
				<tbody>
					{renderedRebalanceNote}
				</tbody>
			</table>
		</div>
	);
}
