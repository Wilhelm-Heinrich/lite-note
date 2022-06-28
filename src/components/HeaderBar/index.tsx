import React, { FC } from 'react'
import style from './index.module.css'

interface Iprops {
	income: string | null
	expense: string | null
	onChange: (value: string | null) => void
}

const HeaderBar: FC<Iprops> = ({ expense, income, onChange }) => {
	return (
		<div className={style.filter}>
			<select
				name=""
				id=""
				onChange={e => {
					onChange(e.target.value)
				}}
			>
				<option value="">请选择月份</option>
				<option value="0">1月</option>
				<option value="1">2月</option>
				<option value="2">3月</option>
				<option value="3">4月</option>
				<option value="4">5月</option>
				<option value="5">6月</option>
				<option value="6">7月</option>
				<option value="7">8月</option>
				<option value="8">9月</option>
				<option value="9">10月</option>
				<option value="10">11月</option>
				<option value="11">12月</option>
			</select>
			{income && <span className="income">收入：{income}</span>}
			{expense && <span className="expense">支出：{expense}</span>}
		</div>
	)
}

export default HeaderBar
