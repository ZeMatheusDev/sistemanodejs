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
  minutos boolean,
  
  PRIMARY KEY (`id`)
);


e a ultima tabela N to N...

CREATE TABLE `usuario_servico` (
  id INT AUTO_INCREMENT,
  usuario_id INT,
  servico_id INT,
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

