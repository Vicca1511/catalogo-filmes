const routes = require("express").Router();//nativo do express, caminho que ele será executado em routes
const FilmeController = require("../controllers/FilmeControllers");//acessa o controllers

routes.get("/", FilmeController.getAll);//listar tudo que tem na rota (cadastrado no banco)
routes.get("/filmes/:id", FilmeController.getById);//rota para pegar o filme por id e estou chamando a rota detalhes
routes.get("/create", FilmeController.create);//rota de exibição da criação do filme
routes.post("/create", FilmeController.creation);//rota de criacao dos filmes
routes.get("/edit/:id", FilmeController.edit1);//rota de validação se existe o filme para eu editar
routes.post("/edit/:id", FilmeController.edit);//rota de edição
routes.get("/delet/:id", FilmeController.delet);//rota para deletar o filme
routes.post("/delet/:id", FilmeController.delet1);//rota para deletar o filme
routes.post("/search", FilmeController.findName);//rota para pesquisar um filme
module.exports = routes;//exporto ela para qualquer caminho