import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin';
import Cliente from 'App/Models/Cliente';
import Estabelecimento from 'App/Models/Estabelecimento';
import User from 'App/Models/User';

export default class AuthController {

    //rota login
    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email');
        const password = request.input('password');

        try {
            const user = await User.findByOrFail("email", email);

            let expira_em;

            switch (user.tipo) {
                case "clientes":
                    expira_em = "30days";
                    break;
                case "estabelecimentos":
                    expira_em = "7days";
                    break;
                case "admin":
                    expira_em = "1days";
                    break;
                default:
                    expira_em = "30days";
                    break;
            }

            const token = await auth.use('api').attempt(email, password, {
                expiresIn: expira_em,
                name: user.serialize().email,
            });

            response.ok(token);
        } catch (error) {
            return response.badRequest("Invalid credentials");
        }
    }

    //rota logout
    public async logout({ auth, response }: HttpContextContract) {
        try {
            await auth.use('api').revoke();

        }
        catch (error) {
            return response.unauthorized("Falha ao realizar logout");
        }

        return response.ok({
            revoked: true,
        });
    };

    //rota verifica usuário
    public async me({ auth, response }: HttpContextContract) {
        const userAuth = await auth.use("api").authenticate();

        let data;

        switch (userAuth.tipo) {
            case "clientes":
                const cliente = await Cliente.findByOrFail("user_id", userAuth.id);
                data = {
                    id_cliente: cliente.id,
                    nome: cliente.nome,
                    telefone: cliente.telefone,
                    email: userAuth.email,
                };
                break;
            case "estabelecimentos":
                const estabelecimento = await Estabelecimento.findByOrFail("user_id", userAuth.id);
                data = {
                    id_estabelecimento: estabelecimento.id,
                    nome: estabelecimento.nome,
                    logo: estabelecimento.logo,
                    online: estabelecimento.online,
                    bloqueado: estabelecimento.bloqueado,
                    email: userAuth.email,
                };
                break;
            case "admins":
                const admin = await Admin.findByOrFail("userId", userAuth.id);
                data = {
                    id_admin: admin.id,
                    nome: admin.nome,
                    email: userAuth.email,
                };
                break;
            default:
                return response.unauthorized("Usuário não autorizado");
        }

        return response.ok(data);

    }


}
