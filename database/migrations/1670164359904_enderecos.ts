import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();

      table.integer('cliente_id').notNullable().unsigned().references('id').inTable('clientes');
      table.integer('cidade_id').notNullable().unsigned().references('id').inTable('cidades');
      table.string('rua').notNullable();
      table.string('bairro').notNullable();
      table.string('numero').nullable();
      table.string('ponto_referencia').nullable();
      table.string('complemento').nullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
