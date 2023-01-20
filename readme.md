Olá, seja bem vindo ao sistema de fluxo de atendimento com serviços e pagamento criado por Matheus :)

Primeiro passo é baixar o MySQL e rodar os seguintes comandos, o primeira para criar a tabela de usuario:

CREATE TABLE `usuario` (
	id INT AUTO_INCREMENt,
  login varchar(50),
  senha varchar(50),
  valorTotal varchar(50),
  admin boolean,
  
  PRIMARY KEY (`id`)
);

logo após, a tabela de serviços...

CREATE TABLE `servico` (
	id INT AUTO_INCREMENt,
  nome varchar(50),
  profissional varchar(50),
  preco varchar(50),
  comissao varchar(50),
  
  PRIMARY KEY (`id`)
);


e a ultima tabela N to N...

CREATE TABLE `usuario_servico` (
  id INT AUTO_INCREMENT,
  usuario_id INT,
  servico_id INT,
  iniciado boolean,
  minutosAtuais varchar(50),
  minutosFinais varchar(50),
  PRIMARY KEY (`id`),

  -- RELACIONANDO AS TABELAS
  CONSTRAINT `fk_usuario` 
  FOREIGN KEY(usuario_id) 
  REFERENCES usuario (id) 
  ON DELETE cascade,

  CONSTRAINT `fk_servico`
  FOREIGN KEY (servico_id)
  REFERENCES servico(id)
  ON DELETE cascade
);


e para finalizar o banco, fazer inserts nos serviços e deixar como padrao para que o usuario possa adicionar

insert into servico (nome, profissional, preco, comissao) values ('Criação de um site', 'Matheus', 1000, 200);

insert into servico (nome, profissional, preco, comissao) values ('Auxilio em dietas', 'Pedro', 200, 40);

insert into servico (nome, profissional, preco, comissao) values ('Auxilio em exercicios de academia', 'Gabriel', 300, 60);

insert into servico (nome, profissional, preco, comissao) values ('Limpar casa', 'Isabelle', 150, 30);


agora iremos adicionar o sequelize e o mysql2 para utilizar o mysql no node, use esses comandos:
npm install --save sequelize
npm install --save mysql2

apos fazer isso, iremos importar o template handlebars para basicamente poder passar os valores do back para o front e etc...
npm install --save express-handlebars

o proximo passo é instalar o body-parser para pegar dados enviados no cadastro 
npm install --save body-parser

logo após instalamos o express-session para iniciar sessoes no login
npm install --save express-session