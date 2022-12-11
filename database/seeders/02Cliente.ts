import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cliente from 'App/Models/Cliente';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run() {
    //Criando o usuário
    const user = await User.create({
      email: 'cliente@email.com',
      password: '123456',
      tipo: 'clientes',
    });

    // Inserindo o usuário criado na tabela clientes
    await Cliente.create({
      nome: 'Cliente',
      telefone: '11 9.9999-8888',
      userId: user.id,
    });
  }
}
