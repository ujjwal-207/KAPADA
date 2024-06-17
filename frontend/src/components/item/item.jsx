import React from 'react'
import './item.css'
const Item = (props) => {
  return (
    <div className='item'>
      <img src={props.image} alt='' />
      <p>{props.name}</p>
      <div className='item-prices'>
        <div className='item-prices-new'>
        रु{props.new_price}
        </div>
        <div className='item-prices-old'>
        रु{props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
