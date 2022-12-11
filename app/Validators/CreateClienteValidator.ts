import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClienteValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    nome: schema.string({ trim: true },
      [
        rules.minLength(3),
        rules.maxLength(200),
      ]),

    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email' }),
    ]),

    password: schema.string({ trim: true }, [
      rules.minLength(6),
      rules.maxLength(180),
    ]),

    telefone: schema.string({ trim: true }, [
      rules.mobile({ locale: ['pt-BR'] }),
      rules.maxLength(15),
      rules.unique({ table: 'clientes', column: 'telefone' }),
    ]),


  })


  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
      'email.email': 'O campo {{ field }} deve ser um email válido',
      'email.unique': 'O email informado já está em uso',
      'password.minLength': 'A senha deve ter no mínimo 6 caracteres',
      'password.maxLength': 'A senha deve ter no máximo 180 caracteres',
      'nome.minLength': 'O nome deve ter no mínimo 3 caracteres',
      'nome.maxLength': 'O nome deve ter no máximo 200 caracteres',
      'telefone.mobile': 'O telefone deve ser um número válido',
      'telefone.maxLength': 'O telefone deve ter no máximo 15 caracteres',
      'telefone.unique': 'O telefone informado já está em uso',

  }
}
