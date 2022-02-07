import { useEffect, useState } from "react";
import styles from "./CalendarTable.module.scss"

type CalendarTableProps = {
  year: number,
  month: number,
}

const tableCellLength = 42;
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const today = new Date();


const CalendarTable: React.FC<CalendarTableProps> = ({ year, month }) => {
  const [holidays, setHolidays] = useState({} as { [yyyymmdd: string]: string })

  useEffect(() => {
    fetch(`https://holidays-jp.github.io/api/v1/${year}/date.json`)
      .then((response) => {
        response.json().then((data) => {
          setHolidays(data);
          console.dir(data)
        })
      }).catch((err) => {
        console.error(err)
      })
  }, [year])

  const DaysTr = () => {
    const daysData = (): string[] => {
      const offset = new Date(year, month - 1, 1).getDay()
      let tableInMonth = Array(offset).fill("null")
      tableInMonth = tableInMonth.concat(Array.from(Array(days[month - 1]), (_, i) => ((i + 1).toString())))
      tableInMonth = tableInMonth.concat(Array(tableCellLength - tableInMonth.length).fill("null"))
      return tableInMonth
    }
    const daysInMonth = daysData()
    const trs = []
    for (let i = 0; i < 6; i++) {
      const tr = (
        <tr key={i}>
          {daysInMonth.slice(i * 7, (i + 1) * 7).map((day, j) => {
            console.log(`${year}-${('0' + (month + 1)).slice(-2)}-${('0' + (i * 7 + j)).slice(-2)}`)
            if (day === today.getDate().toString() &&
              month === today.getMonth() + 1 &&
              year === today.getFullYear()) return <td className={styles.CalendarTable__td__Today} key={j}>{day}</td>
            else if (holidays[`${year}-${('0' + month).slice(-2)}-${('0' + (day)).slice(-2)}`]) return <td className={styles.CalendarTable__td__Holiday} key={j}>{day}</td>
            else if (j === 0) return <td className={styles.CalendarTable__td__Sunday} key={j}>{day}</td>
            else if (j === 6) return <td className={styles.CalendarTable__td__Saturday} key={j}>{day}</td>
            else return <td className={styles.CalendarTable__td} key={j}>{day}</td>
          })}
        </tr>
      )
      trs.push(tr)
    }
    return <>{trs}</>
  }

  return (<>
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
  </>
  )
}

export default CalendarTable