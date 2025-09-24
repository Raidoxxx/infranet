# 🌐 InfraNet

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.18.2-blue.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)
![License](https://img.shields.io/badge/License-ISC-red.svg)

*Sistema de gestão de infraestrutura e comunicação corporativa*

[Documentação](#-documentação) • [Instalação](#-instalação) • [API](#-api) • [Contribuição](#-contribuição)

</div>

---

## 📖 Sobre o Projeto

O **InfraNet** é uma plataforma corporativa completa para gestão de comunicação interna, anúncios, links compartilhados e métricas de engajamento. Desenvolvido para facilitar a comunicação entre setores e hierarquias organizacionais.

### ✨ Principais Funcionalidades

- 📢 **Sistema de Comunicados** - Criação e gestão de comunicados corporativos
- 🏢 **Gestão de Setores** - Organização hierárquica por departamentos
- 🔗 **Links Compartilhados** - Centralização de recursos importantes
- 👥 **Integração AD** - Autenticação via Active Directory
- 📊 **Métricas e Analytics** - Acompanhamento de visualizações e engajamento
- 🎨 **Personalização Visual** - Sistema flexível de estilos e temas
- 🏷️ **Sistema de Tags** - Categorização e filtragem de conteúdo

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js + Express.js
- **Banco de Dados**: MySQL 8.0+
- **Autenticação**: Active Directory (LDAP)
- **HTTP Client**: Axios
- **CORS**: Configuração para integração frontend
- **Environment**: dotenv para configurações

---

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL 8.0+
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Raidoxxx/infranet.git
   cd infranet
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Copie o arquivo `.env.example` para `.env` e configure:
   ```env
   # Banco de Dados
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=infranet
   
   # Servidor
   PORT=8080
   NODE_ENV=development
   
   # Active Directory
   AD_URL=ldap://seu-ad-server
   AD_BASE_DN=DC=empresa,DC=com
   AD_USERNAME=usuario_ad
   AD_PASSWORD=senha_ad
   ```

4. **Execute as migrações do banco**
   ```bash
   npm run migrate
   ```

5. **Inicie o servidor**
   ```bash
   # Desenvolvimento (com nodemon)
   npm run dev
   
   # Produção
   npm start
   ```

O servidor estará disponível em `http://localhost:8080`

---

## 📡 API

### Endpoints Principais

#### Health Check
```http
GET /v1/api/health
```
Verifica o status da aplicação

#### Usuários
```http
GET /v1/api/users          # Lista usuários
POST /v1/api/users         # Cria usuário
GET /v1/api/users/:id      # Busca usuário específico
PUT /v1/api/users/:id      # Atualiza usuário
DELETE /v1/api/users/:id   # Remove usuário
```

#### Anúncios
```http
GET /v1/api/announcements     # Lista anúncios
POST /v1/api/announcements    # Cria anúncio
GET /v1/api/announcements/:id # Busca anúncio específico
PUT /v1/api/announcements/:id # Atualiza anúncio
DELETE /v1/api/announcements/:id # Remove anúncio
```

#### Setores
```http
GET /v1/api/sectors        # Lista setores
POST /v1/api/sectors       # Cria setor
GET /v1/api/sectors/:id    # Busca setor específico
DELETE /v1/api/sectors/:id # Remove setor
```

### Formato de Resposta

```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### Tratamento de Erros

```json
{
  "success": false,
  "error": "Tipo do erro",
  "message": "Descrição detalhada do erro"
}
```

---

## 🗄️ Banco de Dados

O sistema utiliza uma arquitetura relacional complexa com 17 tabelas principais. Para mais detalhes sobre a estrutura do banco de dados, consulte o arquivo [`DATABASE.md`](./DATABASE.md).

### Principais Entidades

- **Users**: Gestão de usuários e autenticação
- **Sectors**: Departamentos organizacionais
- **Hierarchy**: Cargos e níveis hierárquicos
- **Announcements**: Sistema de comunicados
- **Links**: Recursos compartilhados
- **Tags**: Sistema de categorização
- **Styles**: Personalização visual

---

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `8080` |
| `NODE_ENV` | Ambiente de execução | `development` |
| `DB_HOST` | Host do MySQL | `localhost` |
| `DB_PORT` | Porta do MySQL | `3306` |
| `DB_USER` | Usuário do banco | - |
| `DB_PASSWORD` | Senha do banco | - |
| `DB_NAME` | Nome do banco | `infranet` |
| `AD_URL` | URL do Active Directory | - |
| `AD_BASE_DN` | Base DN do AD | - |

---

## 🏗️ Estrutura do Projeto

```
infranet/
├── src/
│   ├── app.js              # Aplicação principal
│   ├── config/             # Configurações
│   ├── controllers/        # Controladores da API
│   ├── middlewares/        # Middlewares customizados
│   ├── routes/             # Definição de rotas
│   │   ├── v1/            # Versão 1 da API
│   │   └── routes.js      # Router principal
│   └── service/           # Serviços de negócio
├── package.json
├── DATABASE.md            # Documentação do banco
└── README.md
```

---

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar com coverage
npm run test:coverage
```

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Convenções de Código

- Use **camelCase** para variáveis e funções
- Use **PascalCase** para classes
- Mantenha funções pequenas e focadas
- Documente código complexo
- Escreva testes para novas funcionalidades

---

## 📋 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor em produção |
| `npm run dev` | Inicia o servidor em desenvolvimento com nodemon |
| `npm test` | Executa os testes |
| `npm run migrate` | Executa migrações do banco |
| `npm run seed` | Popula o banco com dados de exemplo |
 
---
## 🗺️ Roadmap

### 🚧 Em andamento / Próximos passos

- [x] Estrutura inicial do projeto
- [ ] Autenticação via Active Directory (LDAP)
- [ ] CRUD de usuários, setores e anúncios
- [ ] Sistema de tags e links compartilhados
- [ ] Personalização visual (temas e estilos)
- [ ] Métricas de engajamento e analytics
- [ ] Documentação da API e banco de dados
- [ ] Scripts de migração e seed do banco
- [ ] Implementação de notificações internas
- [ ] Dashboard administrativo avançado
- [ ] Integração com sistemas externos (API REST)
- [ ] Testes automatizados avançados (e2e)
- [ ] Otimização de performance e segurança
- [ ] Deploy automatizado (CI/CD)
- [ ] Documentação de integração frontend

---

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/Raidoxxx/infranet/issues) descrevendo o problema.

---

<div align="center">

**⭐ Se este projeto te ajudou, não se esqueça de dar uma estrela!**

</div>