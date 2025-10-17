const express = require("express");
const router = express.Router();
const { Tecnologias, estudante, disciplinas, projetos, contato } = require("./dados");

router.get("/disciplinas", (req, res) => res.json(disciplinas));

router.post("/disciplinas", (req, res) => {
  const { nome } = req.body;
  if (nome && !disciplinas.includes(nome)) disciplinas.push(nome);
  res.status(201).json({ message: "Disciplina adicionada", disciplinas });
});

router.put("/disciplinas/:index", (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;
  if (!disciplinas[index]) return res.status(404).json({ error: "Disciplina não encontrada" });
  disciplinas[index] = nome;
  res.json({ message: "Disciplina atualizada", disciplinas });
});

router.delete("/disciplinas/:index", (req, res) => {
  const { index } = req.params;
  if (!disciplinas[index]) return res.status(404).json({ error: "Disciplina não encontrada" });
  disciplinas.splice(index, 1);
  res.json({ message: "Disciplina removida", disciplinas });
});

router.get("/projetos", (req, res) => res.json(projetos));

router.post("/projetos", (req, res) => {
  const { titulo, descricao, link, techs } = req.body;
  const tecnologiasSelecionadas = Array.isArray(techs) ? techs : [techs];
  projetos.push({ titulo, descricao, link, techs: tecnologiasSelecionadas });
  res.status(201).json({ message: "Projeto adicionado", projetos });
});

router.put("/projetos/:index", (req, res) => {
  const { index } = req.params;
  const { titulo, descricao, link, techs } = req.body;
  if (!projetos[index]) return res.status(404).json({ error: "Projeto não encontrado" });
  const techArray = Array.isArray(techs) ? techs : [techs];
  projetos[index] = { titulo, descricao, link, techs: techArray };
  res.json({ message: "Projeto atualizado", projetos });
});

router.delete("/projetos/:index", (req, res) => {
  const { index } = req.params;
  if (!projetos[index]) return res.status(404).json({ error: "Projeto não encontrado" });
  projetos.splice(index, 1);
  res.json({ message: "Projeto removido", projetos });
});

router.get("/tecnologias", (req, res) => res.json(Tecnologias));

router.post("/tecnologias", (req, res) => {
  const { chave, nome } = req.body;
  if (!chave || !nome) return res.status(400).json({ error: "Campos obrigatórios: chave, nome" });
  Tecnologias[chave] = nome;
  res.status(201).json({ message: "Tecnologia adicionada", Tecnologias });
});

router.put("/tecnologias/:chave", (req, res) => {
  const { chave } = req.params;
  const { nome } = req.body;
  if (!Tecnologias[chave]) return res.status(404).json({ error: "Tecnologia não encontrada" });
  Tecnologias[chave] = nome;
  res.json({ message: "Tecnologia atualizada", Tecnologias });
});

router.delete("/tecnologias/:chave", (req, res) => {
  const { chave } = req.params;
  if (!Tecnologias[chave]) return res.status(404).json({ error: "Tecnologia não encontrada" });
  delete Tecnologias[chave];
  res.json({ message: "Tecnologia removida", Tecnologias });
});

router.get("/estudante", (req, res) => res.json(estudante));

router.post("/estudante", (req, res) => {
  const { nome, curso, instituicao, anoIngresso } = req.body;
  estudante.nome = nome || estudante.nome;
  estudante.curso = curso || estudante.curso;
  estudante.instituicao = instituicao || estudante.instituicao;
  estudante.anoIngresso = anoIngresso || estudante.anoIngresso;
  res.status(201).json({ message: "Estudante criado/atualizado", estudante });
});

router.put("/estudante", (req, res) => {
  const { nome, curso, instituicao, anoIngresso } = req.body;
  estudante.nome = nome || estudante.nome;
  estudante.curso = curso || estudante.curso;
  estudante.instituicao = instituicao || estudante.instituicao;
  estudante.anoIngresso = anoIngresso || estudante.anoIngresso;
  res.json({ message: "Estudante atualizado", estudante });
});

router.delete("/estudante", (req, res) => {
  Object.keys(estudante).forEach((k) => (estudante[k] = null));
  res.json({ message: "Dados do estudante removidos", estudante });
});

router.get("/contato", (req, res) => res.json(contato));

router.post("/contato", (req, res) => {
  const { email, telefone } = req.body;
  if (!email && !telefone) return res.status(400).json({ error: "Forneça email ou telefone" });
  contato.email = email || contato.email;
  contato.telefone = telefone || contato.telefone;
  res.status(201).json({ message: "Contato criado/atualizado", contato });
});

router.put("/contato", (req, res) => {
  const { email, telefone } = req.body;
  contato.email = email || contato.email;
  contato.telefone = telefone || contato.telefone;
  res.json({ message: "Contato atualizado", contato });
});

router.delete("/contato", (req, res) => {
  contato.email = null;
  contato.telefone = null;
  res.json({ message: "Contato removido", contato });
});

module.exports = router;
