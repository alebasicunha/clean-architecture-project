import { Email } from '../../src/entities'

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email = 'any@mail.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('should not accept strings larger than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email = '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain part larger than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty domain part', () => {
    const email = 'local@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain with a part larger than 63 chars', () => {
    const email = 'local@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with invalid char', () => {
    const email = 'local part@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with two dots', () => {
    const email = 'local..part@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with ending dots', () => {
    const email = 'localpart.@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email without an at-sign', () => {
    const email = 'localpartmail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
