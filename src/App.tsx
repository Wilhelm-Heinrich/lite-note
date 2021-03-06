import { useState, useEffect, useMemo } from 'react'
import moment from 'moment'
import { csvPaser } from './utils'
import HeaderBar from './components/HeaderBar'
import ListCard from './components/ListCard'
import './App.css'

type ICsv = {
	[key: string]: any
}[]

function App() {
	const [bill, setBill] = useState<ICsv>([])
	const [categories, setCategories] = useState<ICsv>([])
	const [income, setIncome] = useState<string | null>(null)
	const [month, setMonth] = useState<string | null>(null)
	const [expense, setExpense] = useState<string | null>(null)
	const [operation, setOperation] = useState<string>('')
	const [type, setType] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [amount, setAmount] = useState<string>('')
	useEffect(() => {
		const init = async () => {
			const response = await fetch(
				'https://raw.githubusercontent.com/xmindltd/hiring/master/frontend-1/bill.csv'
			)
			const dataStr = await response.text()
			const parsed = csvPaser(dataStr)
			console.log(parsed)
			setBill(parsed)
		}
		init()
	}, [])

	useEffect(() => {
		const init = async () => {
			const response = await fetch(
				'https://raw.githubusercontent.com/xmindltd/hiring/master/frontend-1/categories.csv'
			)
			const dataStr = await response.text()
			const parsed = csvPaser(dataStr)
			setCategories(parsed)
		}
		init()
	}, [])

	useEffect(() => {
		if (month) {
			const filterData = bill.filter(item => {
				const m = new Date(+item.time).getMonth().toString()
				return m === month
			})

			const income = filterData.reduce((acc, cur) => {
				if (+cur.type === 1) {
					acc += Number(cur.amount)
				}
				return acc
			}, 0)
			setIncome(income.toString())
			const expense = filterData.reduce((acc, cur) => {
				if (+cur.type === 0) {
					acc += Number(cur.amount)
				}
				return acc
			}, 0)
			setExpense(expense.toString())
		} else {
			setIncome(null)
			setExpense(null)
		}
	}, [month])

	const getCategory = (id: string) => {
		return categories.find(item => item.id === id)?.name
	}

	const getMore = (type: number) => {
		const obj: any = {}
		const filterData = bill
			.filter(item => {
				const m = new Date(+item.time).getMonth().toString()
				return m === month && +item.type === type
			})
			.sort((a, b) => {
				return +b.amount - +a.amount
			})
		filterData.forEach(item => {
			const category = getCategory(item.category)
			if (obj[category]) {
				obj[category] += Number(item.amount)
			} else {
				obj[category] = Number(item.amount)
			}
		})
		const result = Object.keys(obj).map(key => {
			return {
				category: key,
				amount: obj[key]
			}
		})
		return result
	}

	return (
		<div className="App">
			<HeaderBar
				expense={expense}
				income={income}
				onChange={value => {
					setMonth(value)
				}}
			/>
			<div className="operation">
				<button
					className="add"
					onClick={() => {
						setOperation('add')
					}}
				>
					????????????
				</button>
				{income && expense && (
					<button
						className="more"
						onClick={() => {
							setOperation('more')
						}}
					>
						????????????
					</button>
				)}
			</div>
			<div className="extra">
				{operation === 'add' && (
					<div className="add-bill">
						<span>
							<label>???????????????</label>
							<select
								onChange={e => {
									setType(e.target.value)
								}}
							>
								<option>?????????????????????</option>
								<option value="1">??????</option>
								<option value="0">??????</option>
							</select>
						</span>
						<span>
							<label>???????????????</label>
							<select
								onChange={e => {
									setCategory(e.target.value)
								}}
							>
								<option>?????????????????????</option>
								{categories.map(item => (
									<option key={item.id} value={item.id}>
										{item.name}
									</option>
								))}
							</select>
						</span>
						<span>
							<label>???????????????</label>
							<input
								value={amount}
								type="text"
								onChange={e => {
									setAmount(e.target.value)
								}}
							/>
						</span>
						<span>
							<button
								onClick={() => {
									setBill([
										...bill,
										{
											type,
											category,
											amount,
											time: new Date().getTime() + ''
										}
									])
								}}
							>
								??????
							</button>
						</span>
					</div>
				)}
				{operation === 'more' && (
					<div className="more-bill">
						<div>
							??????:
							<ul>
								{getMore(0).map(item => (
									<li key={JSON.stringify(item)}>
										{item.category}:{item.amount}
									</li>
								))}
							</ul>
						</div>

						<div>
							??????:
							<ul>
								{getMore(1).map(item => (
									<li key={JSON.stringify(item)}>
										{item.category}:{item.amount}
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
			<div
				style={{
					width: '100vw',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-around',
					alignItems: 'flex-start',
					boxSizing: 'border-box'
				}}
			>
				{bill
					.filter(billRow => {
						if (month === null || month === '') return true
						return (
							new Date(+billRow.time).getMonth().toString() ===
							month
						)
					})
					.map(billRow => {
						return (
							<ListCard key={JSON.stringify(billRow)}>
								<div
									style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										justifyContent: 'space-between',
										color: '#999'
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column'
										}}
									>
										<span
											style={{
												color: '#FFF',
												background:
													+billRow.type === 0
														? '#EE6363'
														: '#43CD80',
												padding: '2px 8px',
												borderRadius: '2px',
												marginBottom: '8px'
											}}
										>
											???????????????
											{+billRow.type === 0
												? '??????'
												: '??????'}
										</span>
										<span
											style={{
												color: '#333',
												fontSize: '20px'
											}}
										>
											{getCategory(billRow.category)}
										</span>
									</div>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column'
										}}
									>
										<span
											style={{
												marginBottom: '8px'
											}}
										>
											???????????????
											{moment(+billRow.time).format(
												'YYYY-MM-DD'
											)}
										</span>
										<span
											style={{
												color: '#333',
												fontSize: '18px'
											}}
										>
											???????????????
											{+billRow.type === 0 ? '-' : ''}
											{billRow.amount}
										</span>
									</div>
								</div>
							</ListCard>
						)
					})}
			</div>
		</div>
	)
}

export default App
