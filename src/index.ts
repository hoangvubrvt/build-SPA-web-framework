import { UserForm } from './views/UserForm'
import { User } from './models/User'

const user = User.buildUser({ name: 'MY NAME', age: 20, id: 1 })
const userForm = new UserForm(document.getElementById('root')!, user)
userForm.render()
