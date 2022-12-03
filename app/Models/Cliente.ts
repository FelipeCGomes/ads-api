import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number // chave key db -> pode ser que precise alterar para user_Id

  @column()
  public nome: string;

  @column()
  public telefone: string;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
