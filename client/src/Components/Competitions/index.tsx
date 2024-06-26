import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getCompetitionsList } from '@/redux/Slices/Competitions'
import styles from './Competitions.module.scss'
import Link from 'next/link'

export const Competitions: FC = () => {
	const dispatch = useAppDispatch()
	const data = useAppSelector(state => state.tournament.competitionsList)

	useEffect(() => {
		dispatch(getCompetitionsList())
	}, [])
	
	return (
		<div className={styles.container}>
			{data?.map(competition => {
				const slug = competition.id
				return (
					<Link
						href={{
							pathname: 'competitions/[slug]',
							query: { slug },
						}}
					>
						<div className={styles.card_item}>
							<img src={competition.emblem} />
							<p>{competition.name}</p>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
