import React, { useEffect } from 'react'
import { redirectTo  } from '@reach/router'

const NotFoundPage = () => {
  
  useEffect(() => {
    redirectTo('/')
  })

  return (
    <></>
  );
}

export default NotFoundPage
