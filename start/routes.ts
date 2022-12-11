import Route from '@ioc:Adonis/Core/Route'

//Login para os tres perfis de usuários
Route.post('/login', 'AuthController.login');
Route.post('/logout', 'AuthController.logout');

Route.post('/cliente/cadastro', 'ClientesController.store');

Route.get('/cidades', 'CidadesController.index');
Route.get('/cidades/:id/estabelecimentos', 'CidadesController.Estabelecimentos');//retorna os estabelecimentos de UMA cidade

//Grupo de rotas Protegidas
Route.group(() => {
    Route.get('auth/me', 'AuthController.me');

    //Editar perfil
    Route.put('/cliente', 'ClientesController.update');

}).middleware('auth');

Route.get('/', async () => {
  return { ads_api: 'Api Rodando' };
});