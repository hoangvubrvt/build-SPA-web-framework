import { UserList } from './views/UserList'
import { User } from './models/User'

const userCollection = User.buildUserCollection()

userCollection.on('change', () => {
  const rootElement = document.getElementById('root')
  new UserList(rootElement, userCollection).render()
})

userCollection.fetch()
