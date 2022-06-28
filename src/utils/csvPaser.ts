type ICsvRecord = Array<any>

export default (
	csvStr: string
): {
	[key: string]: any
}[] => {
	const lines = csvStr.split('\n')
	const fields = lines[0].split(',')
	const data: ICsvRecord[] = lines.slice(1).map(line => line.split(','))
	return data.map((record, i) => {
		const result: {
			[key: string]: any
		} = {}
		record.forEach((value, index) => {
			result[fields[index]] = value
		})
		return result
	})
}
