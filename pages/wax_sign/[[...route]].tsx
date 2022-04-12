import React, { useEffect } from 'react'
import { NextPage } from 'next'

const WaxSign: NextPage = () => {
  useEffect(() => {
    const event = new Event('TX_SIGNED')
    window.dispatchEvent(event)
    window.close()
  }, [])
  return <div>Sign</div>
}

export default WaxSign
