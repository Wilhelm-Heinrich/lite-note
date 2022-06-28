import React, { FC } from 'react'
import style from './index.module.css'
interface Iprops {
	children: React.ReactNode
}

const ListCard: FC<Iprops> = ({ children }) => {
	return <div className={style['list-card']}>{children}</div>
}

export default ListCard
