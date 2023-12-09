import fs from 'node:fs'
import { promisify } from 'node:util'

const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

export async function createPath() {
  const path = './downloads'

  try {
    await access(path, fs.constants.F_OK)
    console.log('Pasta já existe!')
  } catch (err) {
    try {
      await mkdir(path)
      console.log('Pasta criada com sucesso!')
    } catch (mkdirErr) {
      console.error('Erro ao criar a pasta:', mkdirErr)
    }
  }

  return path
}
