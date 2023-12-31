import React, { useEffect, useState } from 'react'

const Popup = ({ status, message }) => {

    let statusColor;

    if(status === 'success') {
        statusColor = 'border-green-400 bg-green-100';
    }

    if(status === 'error') {
        statusColor = 'border-red-400 bg-red-100';
    }

    if(status === 'warning') {
        statusColor = 'border-yellow-400 bg-yellow-100';
    }

  return (
    <div className={`rounded-xl w-auto h-auto px-4 py-1 bg-white border-2 ${statusColor} fixed top-5 left-1/2 transform -translate-x-1/2 ${status ? "translate-y-0" : "-translate-y-0"} transition-all duration-300`}>
        {message}
    </div>
  )
}

export default Popup