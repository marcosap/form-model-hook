import React from 'react'
import { useMyHook } from 'form-model-hook'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App