export class Email {
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
    // local part não pode ser maior que 64 char nem vazio
    const [local, domain] = email.split('@')
    if (local.length > 64 || local.length === 0) {
      return false
    }
    // domain part não pode ser mairo que 255
    if (domain.length > 255 || domain.length === 0) {
      return false
    }
    return true
  }
}
