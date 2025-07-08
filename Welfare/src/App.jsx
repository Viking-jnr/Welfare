import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Pages/SignIn/View/Index'
import Admin from './Pages/Admin/View/Index'
import Dashboard from './Components/admin/MainContent'
import Users from './Components/admin/ManageUsers/CreateUser'
import Edit from './Components/admin/ManageUsers/EditUser'
import CreateAccount from './Components/admin/ManageAccounts/CreateAccount'
import EditAccount from './Components/admin/ManageAccounts/EditAcount'
import CreateExpense from './Components/admin/ManageExpenses/CreateExpense'
import EditExpense from './Components/admin/ManageExpenses/EditExpense'
import View from './Components/admin/BookofAccounts/View'
import Payments from './Components/admin/BookofAccounts/Payments'
import Accounts from './Components/admin/BookofAccounts/Accounts'
import Reports from './Components/admin/Reports'

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
        <Route path='/admin/create-account' element={<CreateAccount />} />
        <Route path='/admin/edit-account' element={<EditAccount />} />
        <Route path='/admin/create-expense' element={<CreateExpense />} />
        <Route path='/admin/edit-expense' element={<EditExpense />} />
        <Route path='/admin/view-contributions' element={<View />} />
        <Route path='/admin/manage-payments' element={<Payments />} />
        <Route path='/admin/accounts' element={<Accounts />} />
        <Route path='/admin/reports' element={<Reports />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
