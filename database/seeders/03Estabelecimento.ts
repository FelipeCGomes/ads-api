import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estabelecimento from 'App/Models/Estabelecimento';
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'
import Estado from 'App/Models/Estado';
import Cidade from 'App/Models/Cidade';
import CidadesEstabelecimento from 'App/Models/CidadesEstabelecimento';

export default class extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'lojaoficial@email.com',
      password: '123456',
      tipo: 'estabelecimentos',
    });

    await Estabelecimento.create({
      nome: 'Loja Oficial',
      logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/testing-logo-design-template-ce84480d61b3db9a8e1522a99875832f_screen.jpg?ts=1615794516',
      online: true,
      bloqueado: false,
      userId: user.id,
    })

    for (let i = 2; i < 20; i++) {
      await User.create({
        email: faker.name.firstName() + i + '@gmail.com',
        password: '1234567',
        tipo: 'estabelecimento',
      })
    }

    for (let i = 2; i < 20; i++) {
      await Estabelecimento.create({
        nome: "Loja " + faker.company.name(),
        logo: faker.image.imageUrl(),
        online: true,
        bloqueado: false,
        userId: i,
      })
    }

    await Estado.createMany([
      {
        nome: 'Acre',
        uf: 'AC'
      },
      {
        nome: 'Amazonas',
        uf: 'AM'
      },
      {
        nome: 'Amapá',
        uf: 'AP'
      },
      {
        nome: 'Pará',
        uf: 'PA'
      },
      {
        nome: 'Rondônia',
        uf: 'RO'
      },
      {
        nome: 'Roraima',
        uf: 'RR'
      },
      {
        nome: 'Tocantins',
        uf: 'TO'
      },
    ]);

    await Cidade.createMany([
      {
        nome: 'Rio Branco',
        estado_id: 1,
        ativo: true,
      },
      {
        nome: 'Manaus',
        estado_id: 2,
        ativo: true,
      },
      {
        nome: 'Macapá',
        estado_id: 3,
        ativo: true,
      },
      {
        nome: 'Belém',
        estado_id: 4,
        ativo: true,
      },
      {
        nome: 'Porto Velho',
        estado_id: 5,
        ativo: true,
      },
      {
        nome: 'Boa Vista',
        estado_id: 6,
        ativo: true,
      },
      {
        nome: 'Palmas',
        estado_id: 7,
        ativo: true,
      },
    ]);

    for (let i = 1; i < 20; i++) {
      await CidadesEstabelecimento.create({
        cidade_id: faker.datatype.number({ min: 1, max: 7 }),
        estabelecimento_id: i,
        custo_entrega: faker.datatype.number({ min: 5, max: 20, precision: 0.01 }),
      })
    }

  }
}
