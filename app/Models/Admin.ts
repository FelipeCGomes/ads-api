import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number // chave key db -> pode ser que precise alterar para user_id

  @column()
  public nome: string;


  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
