import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from "./components/Dashboard"
import EntityDetail from "./components/EntityDetail"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/entity/:uen" element={<EntityDetail />} />
      </Routes>
    </Router>
  )
}

export default App
