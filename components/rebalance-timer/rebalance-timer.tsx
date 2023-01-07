"use client";

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { RebalanceInfo } from '../../types/rebalance-info';
import { formatDuration } from 'date-fns'
import styles from './rebalance-timer.module.scss';


interface IProps {
	rebalanceInfo: RebalanceInfo;
}

const formatDistanceLocale: {[key: string]: string} = { xSeconds: '{{count}} sec', xMinutes: '{{count}} min', xHours: '{{count}} h' }
const shortEnLocale = { formatDistance: (token: string, count: any) => formatDistanceLocale[token].replace('{{count}}', count) }

export function RebalanceTimer(props: IProps) {
	const percentage = (props.rebalanceInfo.durationRemainingSeconds / props.rebalanceInfo.rebalanceIntervalSeconds * 100).toFixed(0);
	const rebalanceRemaining = formatDuration({ minutes: Math.floor(props.rebalanceInfo.durationRemainingSeconds / 60) }, { format: ['hours', 'minutes', 'seconds'], locale: shortEnLocale })
	const [ timeRemaining, setTimeRemaining ] = useState<number | null>(null);

	useEffect(() => {
		setTimeRemaining(props.rebalanceInfo.durationRemainingSeconds);
		const interval = setInterval(() => {
			setTimeRemaining((timeRemaining) => {
				if (timeRemaining === null) return props.rebalanceInfo.durationRemainingSeconds;
				if (timeRemaining === 0) return props.rebalanceInfo.rebalanceIntervalSeconds;
				return timeRemaining - 1;
			});
		}, 1000);		

		return () => {
			clearInterval(interval);			
		};
	}, []);

	return (
		<div className={styles.flexWrapper}>
			<div className={styles.singleChart}>
				<svg viewBox="0 0 36 36" className={classNames(styles.circularChart, styles.blue)}>
					<path className={styles.circleBg}
						d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
					<path className={styles.circle}
						stroke-dasharray={`${percentage}, 100`}
						d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
					/>
					<text x="18" y="20.35" className={styles.percentage}>{rebalanceRemaining}</text>
				</svg>
			</div>
		</div>
	);
}
