// Teste Tecnico 
/**
 * Testes de API - GoRest (https://gorest.co.in)
 *
 * Objetivo:
 * Executar um fluxo real de testes encadeados, utilizando a API pública do GoRest.
 * O teste cria um usuário, valida seu retorno, o busca por ID, atualiza seus dados
 * e valida a atualização — sem excluir o registro.
 *
 * Ferramenta: Playwright Test (request fixture)
 * Linguagem: TypeScript
 */

import { test, expect } from '@playwright/test'

test.describe.serial('GoRest - Teste de usuários', () => {
  let userId: number // armazenará o ID do usuário criado

  const baseUrl = 'https://gorest.co.in/public/v2/'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer c0d89818f07fb94a8822c209cf04364f637b1c05e8152f6769bf8574867e3bfb`, // substitua pelo seu token
  }

  
  // Cenário 1 - GET: Deve listar usuários existentes
  // Valida se o endpoint retorna status 200 e um array de usuários.
   
  test('GET - Deve listar usuários existentes', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users`, { headers })
    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(Array.isArray(data)).toBeTruthy()
    expect(data.length).toBeGreaterThan(0)

    console.log(`✅ ${data.length} usuários listados com sucesso.`)
  })

  
  // Cenário 2 - POST: Deve criar um novo usuário
  // Armazena o ID do usuário para uso nos próximos testes.
   
  test('POST - Deve criar um novo usuário', async ({ request }) => {
    const newUser = {
      name: 'Luiz QA Playwright',
      gender: 'male',
      email: `luiz_${Date.now()}@example.com`, // email único
      status: 'active',
    }

    const response = await request.post(`${baseUrl}/users`, { headers, data: newUser })
    expect(response.status()).toBe(201)

    const json = await response.json()
    userId = json.id // salva o id para os próximos testes

    expect(json).toMatchObject({
      name: newUser.name,
      email: newUser.email,
      gender: newUser.gender,
      status: newUser.status,
    })

    console.log(`✅ Usuário criado com ID: ${userId}`)
  })

  
  // Cenário 3 - GET: Deve buscar o usuário recém-criado pelo ID
   
  test('GET - Deve buscar o usuário criado por ID', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/${userId}`, { headers })
    expect(response.status()).toBe(200)

    const json = await response.json()
    expect(json.id).toBe(userId)
    expect(json.name).toContain('Luiz QA')

    console.log(`✅ Usuário encontrado: ${json.name}`)
  })
  
  // Cenário 4 - PATCH: Deve atualizar o nome do usuário criado
  // Usa o ID obtido no POST anterior.
   
  test('PATCH - Deve atualizar o nome do usuário', async ({ request }) => {
    const updatedUser = { name: 'Luiz QA Atualizado' }

    const response = await request.patch(`${baseUrl}/users/${userId}`, {
      headers,
      data: updatedUser,
    })

    expect(response.status()).toBe(200)

    const json = await response.json()
    expect(json.name).toBe(updatedUser.name)

    console.log(`✅ Usuário '${userId}' atualizado para: ${json.name}`)
  })
test('DELETE - Deve excluir o usuário criado', async ({ request }) => {
  const response = await request.delete(`https://gorest.co.in/public/v2/users/${userId}`, { headers })

  expect(response.status()).toBe(204)

  console.log(`✅ Usuário com ID ${userId} excluído com sucesso.`)
})
})
