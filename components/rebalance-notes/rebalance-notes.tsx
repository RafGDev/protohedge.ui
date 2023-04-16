import { format } from "date-fns";
import React, { useState } from "react";
import { RebalanceNote } from "../../types/rebalance-notes";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import classNames from "classnames";

interface IProps {
  rebalanceNotes: RebalanceNote[];
}

const pageSize = 5;

export function RebalanceNotes(props: IProps) {
  const [page, setPage] = useState(0);
  const amountOfPages = Math.ceil(props.rebalanceNotes.length / pageSize);

  const renderedRebalanceNote = props.rebalanceNotes
    .slice(page * pageSize, page * pageSize + pageSize)
    .map((rebalanceNote: RebalanceNote) => (
      <tr className="bg-primary-dark border border-primary-light dark:bg-primary-dark dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {format(rebalanceNote.date, "dd MMM hh:mm a")}
        </th>
        <td className="py-4 px-6"> {rebalanceNote.note}</td>
      </tr>
    ));

  const arrowLeftClassNames = classNames({
    "hover:text-secondary cursor-pointer": page > 0,
    "cursor-disabled opacity-50": page === 0,
  });

  const arrowRightClassNames = classNames({
    "hover:text-secondary cursor-pointer": page < amountOfPages - 1,
    "cursor-disabled opacity-50": page === amountOfPages - 1,
  });

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="border border-primary-light text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
            <th scope="col" className="py-3 px-6">
              Note
            </th>
          </tr>
        </thead>
        <tbody>{renderedRebalanceNote}</tbody>
      </table>

      <div className="flex align-center justify-center mt-5">
        <AiOutlineArrowLeft
          size={25}
          className={arrowLeftClassNames}
          onClick={page > 0 ? () => setPage(page - 1) : undefined}
        />
        <AiOutlineArrowRight
          size={25}
          className={arrowRightClassNames}
          onClick={
            page < amountOfPages - 1 ? () => setPage(page + 1) : undefined
          }
        />
      </div>
    </div>
  );
}
