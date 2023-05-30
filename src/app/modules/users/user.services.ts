import config from '../../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incrimental id
  const id = await generateUserId()
  user.id = id

  //deafult password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createUser) {
    throw new Error('Faild to create user!')
  }
  return createdUser
}

export default { createUser }
