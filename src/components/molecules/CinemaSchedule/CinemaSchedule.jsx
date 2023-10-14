import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const classNames = require('classnames');

const CinemaScheduleItem = ({item, activity}) => {
  const [fitsInSchedule, setFitsInSchedule] = useState(true);
  
  useEffect(() => {
    setFitsInSchedule(true)
    for(let i = 0; i < activity.length; i++) {
      if(
        (item.start > activity[i].startTime && item.start < activity[i].finishTime) ||
        (item.end > activity[i].startTime && item.end < activity[i].finishTime) ||
        (item.start < activity[i].startTime && item.end > activity[i].finishTime) ||
        (item.start > activity[i].startTime && item.end < activity[i].finishTime)
      ) {
        setFitsInSchedule(false)
      }
    } 
  }, [...activity, activity])

  return (
    <div className={classNames('cinema-schedule__item', {'cinema-schedule__item--active': fitsInSchedule})}>
      <img className="cinema-schedule__item-poster" src={item.poster}/>
      <div className="cinema-schedule__item-time">
        {Math.floor(item.start).toString().padStart(2, '0')}:{((item.start % 1) * 60).toString().padStart(2, '0')}
      </div>
    </div>
  )
}

export const CinemaSchedule = ({date}) => {
  const cinemaSchedule = useSelector((state) => state.schedule.cinemaSchedule)
  const activity = useSelector((state) => state.schedule.schedule[date].activity)

  return (
    <div className='cinema-schedule'>
      <h1 className='cinema-schedule__header'>Розклад сеансів</h1>
      {cinemaSchedule.map((item) => <CinemaScheduleItem key={item.id} item={item} activity={activity}/>)}
    </div>
  )
}
