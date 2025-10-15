const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dados = require("./dados")

const estudante = dados.estudante
const disciplinas = dados.disciplinas
const projetos = dados.projetos
const contato = dados.contato
const tecnologias = dados.tecnologias

app.get("/", (req, res) => {
  res.render("index", { nome: estudante.nome });
});


app.get("/sobre", (req, res) => {
  res.render("sobre", { estudante });
});


app.get("/disciplinas", (req, res) => {
  res.render("disciplinas", { disciplinas, estudante });
});


app.get("/projetos", (req, res) => {
  res.render("projetos", { projetos, estudante });
});


app.get("/contato", (req, res) => {
  res.render("contato", { contato, estudante });
});


app.get("/dashboard", (req, res) => {
  const totalDisciplinas = disciplinas.length;
  const totalProjetos = projetos.length;

  const contador = {};

  projetos.forEach((p) => {
    p.techs.forEach((t) => {
      contador[t] = (contador[t] || 0) + 1;
    });
  });

  const tecnologias = Object.entries(contador)
    .sort((a, b) => b[1] - a[1])
    .map(([nome, qtd]) => ({ nome, qtd }));

  const dados = { totalDisciplinas, totalProjetos, tecnologias };

  res.render("dashboard", { dados, estudante });
});



app.post("/projetos", (req, res) => {
  const { titulo, descricao, link } = req.body;
  projetos.push({ titulo, descricao, link });
  res.send("Projeto adicionado com sucesso!");
});

app.put("/projetos/:index", (req, res) => {
  const { index } = req.params;
  const { titulo, descricao, link } = req.body;
  projetos[index] = { titulo, descricao, link };
  res.send("Projeto atualizado com sucesso!");
});

app.delete("/projetos/:index", (req, res) => {
  const { index } = req.params;
  projetos.splice(index, 1);
  res.send("Projeto removido com sucesso!");
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
