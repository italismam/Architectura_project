import React, { useState } from 'react'
import { TimeInput } from '../../atoms/TimeInput/TimeInput'
import { TextInput } from '../../atoms/TextInput/TextInput'
import { Button } from '../../atoms/Button/Button'
import { addToSchedule, selectDate } from '../../../features/schedule/scheduleSlice'
import { useDispatch } from 'react-redux'

const classNames = require("classnames")

export const ScheduleEditor = ({date}) => {
  const dispatch = useDispatch();
  const [newStartTime, setNewStartTime] = useState(0);
  const [newFinishTime, setNewFinishTime] = useState(0);
  const [name, setName] = useState("");

  return (
    <div className='schedule-editor'>
      <h1 className="schedule-editor__header">Додати до планів</h1>
      <div className='schedule-editor__content'>
        <div>
          <h3>Початок</h3>
          <TimeInput onChange={(newVal) => setNewStartTime(newVal)} />
        </div>
        <div>
          <h3>Закінчення</h3>
          <TimeInput onChange={(newVal) => setNewFinishTime(newVal)}/>
        </div>
        <div>
          <h3>Назва</h3>
          <TextInput onChange={(e) => setName(e.target.value)}/>
        </div>
      </div>
      <Button
        disabled={!name}
        onClick={() => {
          dispatch(addToSchedule({
            date: new Date(date),
            activityItem: {id: Math.random(), startTime: newStartTime, finishTime: newFinishTime, name}
          }))
        }}
        text="Запланувати"
      />
    </div>
  )
}
