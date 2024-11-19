import './App.css'
import Dashboard from './Component/Dashboard'
import ErrorBoundary from './Component/ErrorBoundry'

function App() {

  return (
    <>
    <ErrorBoundary>
      <Dashboard/>
    </ErrorBoundary>
    </>
  )
}

export default App
