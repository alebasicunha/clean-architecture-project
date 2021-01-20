import { InvalidEmailError } from '../../entities/errors/invalid-email-error'
import { InvalidNameError } from '../../entities/errors/invalid-name-error'
import { User } from '../../entities/user'
import { UserData } from '../../entities/user-data'
import { Either, left, right } from '../../shared/either'
import { UserRepository } from './ports/user-repository'

export class RegisterUserOnMailingList {
  // Use case: create user and add to repository (FakeObject: InMemoryUserRepository)
  private readonly userRepo: UserRepository

  // UserRepository is a interface tha InMemoryUserRepository implements
  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  // Create user with data user (request), add it to the mailing list and return user or error (with Either).
  public async registerUserOnMailingList (request: UserData):
    Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
    // if name or email is invalid return error, user can't be created
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    // with user created successufully, add to repository if user doesn't exsit yet
    if (!(await this.userRepo.exists(request))) {
      await this.userRepo.add(request)
    }

    return right(request)
  }
}
