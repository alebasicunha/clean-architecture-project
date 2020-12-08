import { UserData } from '../user-data'

export interface UserRepository {
  add(user: UserData): Promise<void>
  findUserByEmail(email: string): Promise<void>
  findAllUsers(): Promise<UserData[]>
  exists(user: UserData): Promise<boolean>
}
