import Head from "next/head"
import { off } from "process"
import { useEffect, useState } from "react"
import styles from "./Home.module.scss"

const tableCellLength = 42;
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const Home: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
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

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1)
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
  }
  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1)
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.main}>
        {year}年{month}月
        <div>
          <input
            className={styles.PrevButton}
            type="button" value="prev"
            onClick={prevMonth}
          ></input>
          <input
            className={styles.NextButton}
            type="button" value="next"
            onClick={nextMonth}
          ></input>
        </div>
        <div>
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
        </div>
      </main>
    </div>
  )
}

export default Home 