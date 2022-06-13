const routes = require("express").Router();//nativo do express, caminho que ele será executado em routes
const FilmeController = require("../controllers/FilmeControllers");//acessa o controllers

routes.get("/", FilmeController.getAll);//listar tudo que tem na rota (cadastrado no banco)
routes.get("/filmes/:id", FilmeController.getById);//rota para pegar o filme por id e estou chamando a rota detalhes
routes.get("/create", FilmeController.criar);//rota de exibição da criação do filme
routes.post("/create", FilmeController.criacao);//rota de criacao dos filmes
routes.get("/edit/:id", FilmeController.editar1);//rota de validação se existe o filme para eu editar
routes.post("/edit/:id", FilmeController.editar);//rota de edição
routes.get("/delete/:id", FilmeController.deletar);//rota para deletar o filme
routes.post("/delete/:id", FilmeController.deletar1);//rota para deletar o filme
routes.post("/search", FilmeController.pesquisaNome);//rota para pesquisar um filme
module.exports = routes;//exporto ela para qualquer caminho