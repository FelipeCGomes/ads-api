import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Cliente from 'App/Models/Cliente';
import User from 'App/Models/User';
import CreateClienteValidator from 'App/Validators/CreateClienteValidator';
import EditClienteValidator from 'App/Validators/EditClienteValidator';

export default class ClientesController {
    //Cadastrar Cliente
    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateClienteValidator);
        //Criando um novo usuário
        const user = await User.create(
            {
                email: payload.email,
                password: payload.password,
                tipo: 'clientes',
            });

        //Associando o usuario a tablea clientes
        const cliente = await Cliente.create({
            nome: payload.nome,
            telefone: payload.telefone,
            userId: user.id,
        });

        return response.ok({
            id: cliente.id,
            nome: cliente.nome,
            email: user.email,
            telefone: cliente.telefone,

        });
    }

    //Editar Cliente
    public async update({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(EditClienteValidator);

        //Dados do usuário autenticado
        const userAuth = await auth.use("api").authenticate();

        //Criando uma transação para garantir que os dados sejam editados em ambas as tabelas
        const trx = await Database.transaction();

        try {
            const user = await User.findByOrFail("id", userAuth.id);
            const cliente = await Cliente.findByOrFail('userId', userAuth.id);

            //Passou a senha oara autualizar?
            if (payload.password) {
                user.merge({
                    email: payload.email,
                    password: payload.password,
                });
            } else {
                user.merge({
                    email: payload.email,
                });
            }
            await user.save(); //Salvando os dados na tabela users

            cliente.merge({
                nome: payload.nome,
                telefone: payload.telefone,
            });
            await cliente.save(); //Salvando os dados na tabela clientes

            await trx.commit();

            return response.ok({
                id: cliente.id,
                nome: cliente.nome,
                email: user.email,
                telefone: cliente.telefone,
            });

        } catch (error) {
            await trx.rollback(); //Desfazendo as alterações
            return response.badRequest("Falha ao atualizar dados!"); //Retornando o erro
        }
    }



}

