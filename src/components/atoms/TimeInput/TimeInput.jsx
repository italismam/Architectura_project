import React, { useEffect, useState } from 'react'

const classNames = require('classnames');

const NumberSlider = ({length, onChange, selectedNumberOnInit = 0}) => {
  const numberLength = Array.from({length}, (_, i) => i)
  const [selectedNumber, setSelectedNumber] = useState(selectedNumberOnInit);

  return (
    <div className="time-input__number-slider">
      <button
        className={classNames(
          "time-input__select-button",
          "time-input__select-button--prev",
          {"time-input__select-button--disabled": selectedNumber === 0}
        )}
        onClick={() => {
          setSelectedNumber(a => {
            onChange(a - 1)
            return a - 1
          })
        }}
      />
      {numberLength.map((a) => (
        <div
          className={classNames(
            "time-input__number",
            {"time-input__number--selected": selectedNumber === a},
            {"time-input__number--prev": selectedNumber > a},
            {"time-input__number--next": selectedNumber < a}
          )}
        >
          {a.toString().padStart(2, '0')}
        </div>
      ))}
      <button
        className={classNames(
          "time-input__select-button",
          "time-input__select-button--next",
          {"time-input__select-button--disabled": selectedNumber === length - 1}
        )}
        onClick={() => {
          setSelectedNumber(a => {
            onChange(a + 1)
            return a + 1
          })
        }}
      />
    </div>
  )
}

export const TimeInput = ({onChange}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    onChange(hours + minutes/60)
  }, [hours, minutes])

  return (
    <div className='time-input'>
      <NumberSlider selectedNumberOnInit={12} onChange={(newVal) => {setHours(newVal)}} length={24}/>
      <div>:</div>
      <NumberSlider onChange={(newVal) => {setMinutes(newVal)}} length={60}/>
    </div>
  )
}
