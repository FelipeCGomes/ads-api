import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Estado from 'App/Models/Estado';
import Estabelecimento from 'App/Models/Estabelecimento';

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nome: string;

  @column()
  public estado_id: number;

  @column()
  public ativo: boolean;


  @hasOne(() => Estado, {
    foreignKey: 'id',
    localKey: 'estado_id'
  })
  public estado: HasOne<typeof Estado>;

  @manyToMany(() => Estabelecimento,{
    pivotTable: 'cidades_estabelecimentos', //nome da tabela pivot
    localKey: 'id', //chave primaria da tabela cidades
    pivotForeignKey: 'cidade_id', //chave estrangeira da tabela pivot
    relatedKey: 'id', //chave primaria da tabela estabelecimentos
    pivotRelatedForeignKey: 'estabelecimento_id' //chave estrangeira da tabela pivot

  })
  public estabelecimentos: ManyToMany<typeof Estabelecimento>;

}
