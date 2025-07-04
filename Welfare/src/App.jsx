import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/SignIn/View/Index'
import Admin from './Pages/Admin/View/Index'
import Dashboard from './Components/admin/MainContent'
import Users from './Components/admin/ManageUsers/CreateUser'
import Edit from './Components/admin/ManageUsers/EditUser'

function App() {

  return (
    <BrowserRouter>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/admin" element={<Admin />} >
        <Route index element={<Dashboard />} />
        <Route path="/admin/user" element={<Users />} />
        <Route path='/admin/edit' element={<Edit />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
