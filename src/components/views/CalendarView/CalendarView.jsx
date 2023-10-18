import React, { useEffect } from 'react'
import Calendar from '../../organisms/Calendar/Calendar'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export const CalendarView = () => {

  return (
    <div className='App'>
      <Calendar/>
    </div>
  )
}
