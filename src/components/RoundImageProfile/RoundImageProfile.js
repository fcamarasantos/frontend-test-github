import React from 'react'

function RoundImageProfile({size, src, className}) {
  return (
    <div className={className} style={{
        height: size, 
        width: size, 
        backgroundImage:`url(${src})`, 
        borderRadius: '50%', 
        display: 'flex', 
        backgroundSize: 'cover',
        justifySelf: 'center'
    }}></div>
  )
}

export default RoundImageProfile