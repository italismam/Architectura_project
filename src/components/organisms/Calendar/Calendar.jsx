import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '../../../features/schedule/scheduleSlice';

const monthCount = 31

const classNames = require('classnames');

function getMousePos(e) {
  return {x:e.clientX,y:e.clientY};
}

const Number = ({date, activity, isPrev, isNext, isToday}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(selectDate(date))
  }

  return (
    <td
      className={classNames(
        "calendar__number",
        {"calendar__number--active": !isPrev && !isNext},
        {"calendar__number--is-today": isToday}
      )}
      onClick={onClick}
    >
        {date.getDate()}
        <div className="calendar__activity-container">
          {activity ? activity.map(() => <div className='calendar__activity-circle'/>) : ""}
        </div>
    </td>
  )
}

export default function Calendar() {
  const daysOfAWeek = [
      "ПН",
      "ВТ",
      "СР",
      "ЧТ",
      "ПТ",
      "СБ",
      "НД"
  ]

  const mouseTailRef = useRef(null)
  const calendarRef = useRef(null)
  const todayDate = useMemo(() => new Date(), [])

  const schedule = useSelector((state) => state.schedule.schedule)
 
  const onTableMouseLeave = useCallback((e) => {
    mouseTailRef.current.style.opacity = 0
  }, [mouseTailRef, calendarRef])

  const onTableMouseEnter = useCallback((e) => {
    mouseTailRef.current.style.opacity = 1
  }, [mouseTailRef, calendarRef])

  const onTableMouseMove = useCallback((e) => {
    mouseTailRef.current.style.left = `${getMousePos(e).x - calendarRef.current.getBoundingClientRect().left}px`
    mouseTailRef.current.style.top = `${getMousePos(e).y - calendarRef.current.getBoundingClientRect().top}px`
  }, [mouseTailRef, calendarRef])

  const [weeksByDays, setWeekByDays] = useState([[]]);

  const daysArr = useMemo(() => {
    return Array.from(
      {length: new Date(todayDate.getYear(), todayDate.getMonth() + 1, 0).getDate()},
      (_, i) => {
        const date = new Date(todayDate.getFullYear(), todayDate.getMonth(), i + 1);
        return {
          date,
          isToday: todayDate.getDate() === date.getDate(),
          activity: schedule[date.getTime()]?.activity ? schedule[date.getTime()].activity : []
        }
      }
    )
  }, [])
  
  useEffect(() => {
    let firstDayInMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);

    const firstDayInWeekIndex = firstDayInMonth.getDay() === 0 ? 6 : firstDayInMonth.getDay() - 1;
    let firstWeekDaysLeft = 7 - firstDayInWeekIndex
    
    let weeksByDaysTemp = [[]];
    for(let i = 0; i < firstDayInWeekIndex; i++) {
      const date = new Date(todayDate.getYear(), todayDate.getMonth() - 1, 31 - firstDayInWeekIndex + i)
      weeksByDaysTemp[0].push({
        date,
        isPrev: true,
      })
    }

    for(let i = 0; i < firstWeekDaysLeft; i++) {
      weeksByDaysTemp[0].push(daysArr[i])
    }

    let restOfTheDays = daysArr.slice(firstWeekDaysLeft, daysArr.length);
    for(let i = 0; i < restOfTheDays.length / 7; i++) {
      weeksByDaysTemp[i+1] = [];

      for(let j = 0; j < 7; j++) {
        if(restOfTheDays[i * 7 + j]) {
          weeksByDaysTemp[i+1].push(restOfTheDays[i * 7 + j])
        } else {
          break;
        }
      }
    }

    const nextDaysArr = Array.from(
      {length: 7 - weeksByDaysTemp[weeksByDaysTemp.length - 1].length},
      (_, i) => ({
        date: new Date(todayDate.getYear(), todayDate.getMonth() + 1, i + 1),
        isNext: true,
      })
    )

    weeksByDaysTemp[weeksByDaysTemp.length - 1] = [...weeksByDaysTemp[weeksByDaysTemp.length - 1], ...nextDaysArr]

    setWeekByDays(weeksByDaysTemp)
  }, [])

  return (
    <div style={{paddingBottom: 40}}>
        <h1 className="calendar__month-title">{todayDate.toLocaleString('default', { month: 'long' })}</h1>
        <table
          onMouseLeave={onTableMouseLeave}
          onMouseEnter={onTableMouseEnter}
          onMouseMove={onTableMouseMove}
          ref={calendarRef}
          className='calendar'
        >
            <div className="calendar__background">
              <div ref={mouseTailRef} className="calendar__mouse-tail"></div>
            </div>
            <tr className='calendar__header'>
                {daysOfAWeek.map((el) => <th>{el}</th>)}
            </tr>
            {weeksByDays.map((el) => (
                <tr>
                    {el.map(a => (
                        <Number {...a}/>
                    ))}
                </tr>
            ))}
        </table>
    </div>
  )
}
