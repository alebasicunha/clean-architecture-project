import { UserData } from '@/entities'

// Interface to save list of users. InMemoryUserRepository implements this interface
export interface UserRepository {
  add(user: UserData): Promise<void>
  findUserByEmail(email: string): Promise<UserData>
  findAllUsers(): Promise<UserData[]>
  exists(user: UserData): Promise<boolean>
}
