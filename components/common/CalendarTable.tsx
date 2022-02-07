import styles from "./CalendarTable.module.scss"

type CalendarTableProps = {
  year: number,
  month: number,
}

const tableCellLength = 42;
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


const CalendarTable: React.FC<CalendarTableProps> = ({ year, month }) => {
  const DaysTr = () => {
    const daysData = (): string[] => {
      const offset = new Date(year, month - 1, 1).getDay()
      console.log(year, month, offset)
      let tableInMonth = Array(offset).fill("null")
      tableInMonth = tableInMonth.concat(Array.from(Array(days[month - 1]), (_, i) => ((i + 1).toString())))
      console.dir(tableInMonth)
      tableInMonth = tableInMonth.concat(Array(tableCellLength - tableInMonth.length).fill("null"))
      return tableInMonth
    }
    const daysInMonth = daysData()
    const trs = []
    for (let i = 0; i < 6; i++) {
      const tr = (
        <tr key={i}>
          {daysInMonth.slice(i * 7, (i + 1) * 7).map((day, j) => {
            return <td className={styles.CalendarTable__td} key={j}>{day}</td>
          })}
        </tr>
      )
      trs.push(tr)
    }
    return <>{trs}</>
  }

  return (
    <table className={styles.CalendarTable}>
      <thead>
        <tr>
          <th className={styles.CalendarTable__th}>日</th>
          <th className={styles.CalendarTable__th}>月</th>
          <th className={styles.CalendarTable__th}>火</th>
          <th className={styles.CalendarTable__th}>水</th>
          <th className={styles.CalendarTable__th}>木</th>
          <th className={styles.CalendarTable__th}>金</th>
          <th className={styles.CalendarTable__th}>土</th>
        </tr>
      </thead>
      <tbody>
        <DaysTr />
      </tbody>
    </table>
  )
}

export default CalendarTable