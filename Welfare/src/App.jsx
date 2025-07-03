import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/SignIn/View/Index'
import Admin from './Pages/Admin/View/Index'

function App() {

  return (
    <BrowserRouter>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
