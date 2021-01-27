import { Either, left, right } from '../shared'
import { InvalidEmailError } from './errors'

export class Email {
  public readonly value: string

  private constructor (email: string) {
    this.value = email
  }

  // factory method to create an email if it's valid or return error
  static create (email: string): Either<InvalidEmailError, Email> {
    if (Email.validate(email)) {
      return right(new Email(email))
    }

    return left(new InvalidEmailError(email))
  }

  // metodo para validar emails
  // estrutura de um email valido: local-part@domain
  static validate (email : string): boolean {
    // email nao pode ser nulo nem vazio
    if (!email) {
      return false
    }
    // email não pode ser maior que 320 chars
    if (email.length > 320) {
      return false
    }

    // regular expression for valid chars
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!emailRegex.test(email)) {
      return false
    }

    // local part não pode ser maior que 64 char nem vazio
    const [local, domain] = email.split('@')
    if (local.length > 64 || local.length === 0) {
      return false
    }
    // domain part não pode ser mairo que 255
    if (domain.length > 255 || domain.length === 0) {
      return false
    }
    // nenhuma das subparts do domain pode ser maior que 63 chars
    const domainParts = domain.split('.')
    if (domainParts.some(function (part) {
      return part.length > 63
    })) {
      return false
    }
    return true
  }
}
