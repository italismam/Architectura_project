import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ScheduleEditor } from '../../molecules/ScheduleEditor/ScheduleEditor';
import { removeFromSchedule, updateActivity } from '../../../features/schedule/scheduleSlice';
import { CinemaSchedule } from '../../molecules/CinemaSchedule/CinemaSchedule';
import { Button } from '../../atoms/Button/Button';
import { useNavigate } from 'react-router';

const OccupiedTime = ({contentRef, activity, date}) => {
  const [startTime, setStartTime] = useState(activity.startTime);
  const [finishTime, setFinishTime] = useState(activity.finishTime);
  const dispatch = useDispatch();
  const [name, setName] = useState(activity.name);
  const nameInputRef = useRef(null)
  const headerHeight = 44;
  const contentHeight = 600 - headerHeight

  const handleTopBorderDrag = useCallback((event) => {
    event.preventDefault()
    if(event.clientY - contentRef.current.getBoundingClientRect().top >= 0) {
      setStartTime((event.clientY - contentRef.current.getBoundingClientRect().top)/(contentHeight/24))
    }
  }, [])

  const handleBottomBorderDrag = useCallback((event) => {
    event.preventDefault()
    if(event.clientY - contentRef.current.getBoundingClientRect().top >= 0) {
      setFinishTime((event.clientY - contentRef.current.getBoundingClientRect().top)/(contentHeight/24))
    }
  }, [])

  const handleTopBorderMouseUp = useCallback(() => {
    dispatch(updateActivity({id: activity.id, date: date, updatedFields: {startTime}}));
  }, [startTime])

  const handleBottomBorderMouseUp = useCallback(() => {
    dispatch(updateActivity({id: activity.id, date: date, updatedFields: {finishTime}}));
  }, [finishTime])

  const onNewNameSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch(updateActivity({id: activity.id, date: date, updatedFields: {name}}));
    nameInputRef.current.blur()
  }, [name])

  return (
    <div
      style={{
        top: contentHeight/24 * startTime,
        height: contentHeight/24 * (finishTime - startTime)
      }}
      className="day-schedule__occupied-time"
    >
      <div
        onDragEnd={handleTopBorderMouseUp}
        onDrag={handleTopBorderDrag}
        draggable={true}
        className="day-schedule__handler--up day-schedule__handler"
      >
        <div className="day-schedule__handle">
          {`${Math.floor(startTime)}`.padStart(2, '0')}:{`${Math.floor(startTime%1 * 60)}`.padStart(2, "0")}
        </div>
      </div>
      <div className='day-schedule__occupied-time-label'>
        <span>
          {name}
          <form onSubmit={onNewNameSubmit}>
            <input ref={nameInputRef} onChange={(e) => setName(e.target.value)} value={name} className='day-schedule__occupied-time-label-change-input'/>
          </form>
        </span>
        <button onClick={(e) => dispatch(removeFromSchedule({date: date, id: activity.id}))} className='day-schedule__occupied-time-delete-button'/>
      </div>
      <div
        onDragEnd={handleBottomBorderMouseUp}
        onDrag={handleBottomBorderDrag}
        draggable={true}
        className="day-schedule__handler--down day-schedule__handler"
      >
        <div className="day-schedule__handle">
          {`${Math.floor(finishTime)}`.padStart(2, '0')}:{`${Math.floor(finishTime%1 * 60)}`.padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}

export default function DaySchedule({date}) {
  const daysOfAWeek = [
      "Понеділок",
      "Вівторок",
      "Середа",
      "Четвер",
      "П'ятниця",
      "Субота",
      "Неділя"
  ]
  const contentRef = useRef(null)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const activity = useSelector((state) => state.schedule.schedule[date]?.activity)
  
  const arr = Array.from({length: 24}, (_, i) => i + 1)

  return (
    <div className="day-schedule-container">
      <button
        className='day-schedule__back-button'
        onClick={() => {
          navigate("/")
        }}
      >
        Назад
      </button>
      <div className='day-schedule'>
        <h1 className="day-schedule__header">
            {new Date(+date).toLocaleString('default', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </h1>
        <div ref={contentRef} className='day-schedule__content'>
          {arr.map((i) => <div className='day-schedule__hour-string'><span>{i.toString().padStart(2, "0")}</span></div>)}
          {activity?.map((activityItem) => (
            <OccupiedTime key={activityItem.id} activity={activityItem} contentRef={contentRef} date={date}/>
          ))}
        </div>
      </div>
      <ScheduleEditor date={date}/>
      <CinemaSchedule date={date}/>
    </div>
  )
}
