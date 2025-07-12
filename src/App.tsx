import { useState } from 'react'

import './App.css'
import Portfolio from './portfolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Portfolio />
    </>
  )
}

export default App
