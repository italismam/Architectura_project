import React from 'react'

export const TextInput = ({onChange}) => {
  return (
    <div className='text-input'>
        <input onChange={onChange} className='text-input__input'/>
    </div>
  )
}
