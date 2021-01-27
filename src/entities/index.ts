/* Index serve para que toda classe dentro do diretório atual possa ser importada
  diretamente pelo diretório, e não mais pelo nome do arquivo que contém a classe.
  Ex:
    >> import { InvalidEmailError } from './errors/invalid_email_error'
    Passa a ser:
    >> import { InvalidEmailError } from './errors'

  E usando Path Mapping (ver tsconfig.json), o import passa a utilizar uma referência
  inicial fixa: src. Assim, o import fica:
    >> import { InvalidEmailError } from '@/entities/errors'
*/
export * from './email'
export * from './name'
export * from './user-data'
export * from './user'
