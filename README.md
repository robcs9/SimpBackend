# SimpBackend
Atividade de WEB-2 (IFPE-JBG) - Equipe: Robson e José Cláudio

**Tabela de Administradores usando Sequelize**


**[POST] http://localhost:5000/add** (instancia novos administradores na tabela)

|Tipo|campos|
|----|------|
|String|nome, sobrenome, email, senha, foto|
|Integer|nivel|
|Boolean (1 ou 0)|ativo|

Após a conclusão da requisão, ocorrerá um redirecionamento para

**[GET] http://localhost:5000/print**

onde estarão disponíveis todos os dados da tabela.