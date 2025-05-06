|Rota:  /users                          | Método | Descrição                                |
| --------------------------------- | ------ | ---------------------------------------- |
| `/signup` | POST    | Cadastrar novo usuário                 |
| `/signin`                    | POST   | Obter token de acesso                          |
| `/updatePassword`                | put    | Atualizar senha            |






| Rota: /sensor-data                          | Método | Descrição                                |
| --------------------------------- | ------ | ---------------------------------------- |
| `/find/?date=YYYY-MM-DD` | GET    | Busca registros por data                 |
| `/`                    | POST    | Salvar novo registro                          |
| `/`                | GET    |  Obtém todos registros             |
| `/:id`   | GET    | Obtém pela id                  |
| `/:id`                  | PUT   | Atualiza por id |
| `/:id`                  | DELETE  | Deleta por id |






| Rota: /labwind                          | Método | Descrição                                |
| --------------------------------- | ------ | ---------------------------------------- |
| `/by-date?date=YYYY-MM-DD` | GET    | Busca registros por data                 |
| `/last`                    | GET    | Último registro                          |
| `/extremes`                | GET    | Valores extremos (máx/min)               |
| `/chart?date=YYYY-MM-DD`   | GET    | Dados para gráficos                      |
| `/alerts`                  | GET    | Verifica alertas com base no último dado |
