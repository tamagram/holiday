import Head from "next/head"
import { useState } from "react"
import CalendarTable from "./common/CalendarTable"
import styles from "./Home.module.scss"


const Home: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())

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
          <CalendarTable year={year} month={month} />
        </div>
      </main>
    </div>
  )
}

export default Home 