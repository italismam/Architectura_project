import React from 'react'
import DaySchedule from '../../organisms/DaySchedule/DaySchedule'
import { useOutletContext, useParams } from 'react-router-dom';

export const ScheduleView = () => {
  const {selectedDate} = useParams();

  return (
    <div className='App'>
      <DaySchedule date={selectedDate}/>
    </div>
  )
}
