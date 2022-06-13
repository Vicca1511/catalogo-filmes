const Filme = require("../models/Filmes"); //trazendo o filme que está cadastrado os dados na tabela no meu banco de dados
let message = "";
let type = "";
const orderById = { order: [["id", "ASC"]] }; //objeto e ele vai ter o order, que tem um array que tem outro array, falo o campo que eu quero ordenar e como eu quero ordenar

const Op = require("sequelize").Op; //trazendo os pacotes de operadores do sequelize

//getAll - Lista todos
const getAll = async (req, res) => {
  //async, aguarda porque eu vou lá fazer a consulta espere as ações para renderizar a página
  try {
    //tente por esse caminho se der certo
    const filmes = await Filme.findAll(orderById); //aguardando
    res.render("index", {
      filmes,
      message,
      type,
      filmeSearch: [],
    });
  } catch (err) {
    //deu erro
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

//rota para pegar o ID do filme selecionado
const getById = async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id); //encontrando o filme que foi escolhido pelo id, findByPk procurar pela chave primaria que é o id, e esse id vai chegar por parametro
    const filmes = await Filme.findAll(orderById);//só para melhorar a vizualização
    res.render("details", {
      filme,
      message,
      type,
      filmeSearch: [],
    });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

//rota de criação do filme
const create = (req, res) => {
  try {
    res.render("create", { message, type });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

const creation = async (req, res) => {
  try {
    const filme = req.body; //a requisição que vem do body, pegando os dados que vem do body
    if (
         !filme.nome || 
         !filme.descricao || 
         !filme.imagem) 
         {
      message = "Preencha todos os campos para cadastro!";
      type = "danger";
      return res.redirect("/criar");
    }
    await Filme.create(filme); //model filme e cria o filme que chegou, async espera essa transação
    res.redirect("/");
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

//rota editar filme
const edit1 = async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("edit", {
      message: "Filme não foi encontrado!",
      type: "danger",
    });
  }
  res.render("edit", {
    filme,
    message: "Editado com sucesso",
    type:"success",
  });
};

//rota de edição do filme
const edit = async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id);
    const { nome, descricao, imagem } = req.body;

    filme.nome = nome;
    filme.descricao = descricao;
    filme.imagem = imagem;

    const filmeEditado = await filme.save();
    // res.render("editar", {
    //     filme: filmeEditado,
    //     message:"Filme editado com sucesso!",
    // });
    res.redirect("/");
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};



//rota da prof duda deletar
const delet = async (req,res) => {
  try{
    const filme = await Filme.findByPk(req.params.id);

    if(!filme){
      res.render("delete", {
        message: "Filme não foi encontrado!",
        type: "danger",
      });
    }
    res.render("delete", {
      filme, message:"",
    });
  }catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
}
};

const delete1 = async (req,res) => {
  const filme = await Filme.findByPk(req.params.id);

  if(!filme){
    res.render("delete", {
      message: "Filme não encontrado",
    });
  }

  await filme.destroy();
  res.redirect("/");
};

//rota de pesquisar filme
const findName = async (req, res) => {
  try {
    const filme = await Filme.findAll({
      where: {
        //onde, ele apontando onde vai buscar
        nome: {
          //ele busca no nome
          [Op.like]: `%${req.body.filme}%`, //para pegar o nome que vem do input
        }, //esse valor vem do meu campo de body, que vem do input filme
      },
      order: [["id", "ASC"]],
    });

    if (filme.length == 0) {
      message = "Filme não foi encontrado",
      type = "danger"
      return res.redirect("/"); //parar a função de pesquisa
    }

    res.render("index", {
      filmes: [],
      message,
      type,
      filmeSearch: filme,
    });
  } catch (err) {
    //deu erro, venha nesse caminho
    res.status(500).send({ err: err.message }); //vem do objeto erro
  }
};

module.exports = {
  getAll,
  getById,
  create,
  creation,
  edit1,
  edit,
  delet,
  delete1,
  findName,
 
};