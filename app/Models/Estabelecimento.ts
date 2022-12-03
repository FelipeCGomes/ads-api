import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Estabelecimento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number // chave key db -> pode ser que precise alterar para user_Id

  @column()
  public nome: string;

  @column()
  public logo: string | null; //a logo pode ser null

  @column()
  public bloqueado: boolean;

  @column()
  public online: boolean;



  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
