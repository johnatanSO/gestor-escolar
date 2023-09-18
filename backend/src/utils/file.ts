import fs from 'fs'

export async function deleteFile(filePath: string) {
  try {
    // Verifica se o arquivo existe
    await fs.promises.stat(filePath)
    // Caso exista, ele passa direto e executa a função que removerá o arquivo
    // Caso não exista, ele dispara um erro e vai para o catch
  } catch (err) {
    // O catch retorna e não faz nada, já que não existe o arquivo
    return
  }

  // Função que remove o arquivo existente
  await fs.promises.unlink(filePath)
}
