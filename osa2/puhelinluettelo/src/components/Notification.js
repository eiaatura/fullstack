import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    
    const style = {
      "color": message.color_green ? "green" : "red",
      "background": "#D3D3D3",
      "fontSize": "150%",
      "borderStyle": "solid",
      "borderRadius": "2px",
      "padding": "5px"
    }
    return (<div style={style}> {message.content} </div>)
  }
  
  export default Notification