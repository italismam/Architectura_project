import React from 'react'

const classNames = require("classnames")

export const Button = ({text, onClick, disabled}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'button',
        {"button--disabled": disabled}
      )}
    >
        {text}
    </div>
  )
}
