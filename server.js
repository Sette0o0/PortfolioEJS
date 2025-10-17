const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const apiRoutes = require("./api");
const { estudante, disciplinas, projetos, Tecnologias, contato } = require("./dados");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.render("index", { nome: estudante.nome });
});

app.get("/sobre", (req, res) => {
  res.render("sobre", { estudante });
});

app.get("/disciplinas", (req, res) => {
  res.render("disciplinas", { disciplinas, estudante });
});

app.post("/disciplinas", (req, res) => {
  const { nome } = req.body;
  if (nome && !disciplinas.includes(nome)) disciplinas.push(nome);
  res.redirect("/disciplinas");
});

app.delete("/disciplinas/:index", (req, res) => {
  const { nome } = req.body;
  const index = disciplinas.indexOf(nome);
  if (index !== -1) disciplinas.splice(index, 1);
  res.redirect("/disciplinas");
});

app.get("/projetos", (req, res) => {
  res.render("projetos", { projetos, estudante, Tecnologias });
});

app.post("/projetos", (req, res) => {
  const { titulo, descricao, link, techs } = req.body;
  const tecnologiasSelecionadas = Array.isArray(techs) ? techs : [techs];
  projetos.push({ titulo, descricao, link, techs: tecnologiasSelecionadas });
  res.redirect("/projetos");
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

  res.render("dashboard", {
    dados: { totalDisciplinas, totalProjetos, tecnologias },
    estudante,
  });
});

app.get("/contato", (req, res) => {
  res.render("contato", { contato, estudante });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
