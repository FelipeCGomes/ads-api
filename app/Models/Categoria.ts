import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Produto from 'App/Models/Produto';

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nome: string;

  @column()
  public descricao: string;

  @column()
  public posicao: string;

  @column()
  public ativo: boolean;

  @column()
  public estabelecimentoId: number;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt: DateTime | null;

  //uma categoria tem muitos produtos
  @hasMany(() => Produto, {
    foreignKey: 'categoriaId',
    localKey: 'id',

  })
  public produtos: HasMany<typeof Produto>;

}
