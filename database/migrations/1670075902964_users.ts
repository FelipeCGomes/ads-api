import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('tipo', 20).notNullable() //Tipo de usuario (admin, estabelecimento,cliente)
      table.string('remember_me_token').nullable()

      table.timestamps(true, true)

    })
  }
  
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
/*REGRAS DE NEGÓCIO
  => email unico
   => NÃO é permitido usar o mesmo email para uma conta de administrador, estabelecimento e cliente.
*/