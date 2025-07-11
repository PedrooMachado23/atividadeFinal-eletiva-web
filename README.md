# Requisitos:
- node: v22.17.0
- psql (PostgreSQL) 16.3

# Como rodar:
Atingido todos os requisitos instalados na sua máquina, voce precisa:

- Clonar o repositório
```bash
git clone https://github.com/PedrooMachado23/atividadeFinal-eletiva-web.git
```

Clonado o repositório, é necessario configurar as variáveis de ambiente e instalar as dependências do backend:

- Navegue até a pasta backend do repositório
```bash
cd seu/caminho/atividadeFinal-eletiva-web/backend
```
- Crie um arquivo '.env' e defina as variáveis necessárias (o arquivo '.env_example' é um exemplo de como o arquivo deve ser escrito) e, então, instale as dependências:
```bash
npm install
```

- Faça o setup inicial do ORM (prisma)
```bash
npx prisma db pull
npx prisma db generate
```

- Faça o insert inicial para poder logar como admin (databaseDML.sql)
```bash
psql -U <seu_usuario> -f caminho\para\arquivoDML\databaseDML.sql
```

Agora, é necessário instalar as dependências do frontend

- Navegue até a pasta frontend e instale as dependências
```bash
cd seu/caminho/atividadeFinal-eletiva-web/frontend
npm install
```

Com todas as dependências instaladas, basta iniciar as instâncias:

- Execute no frontend
```bash
npm run build
npm run preview
```
- Execute no backend
```bash
npm run dev
```

Obs: Como padrão, se estiver sem usuarios cadastros, uma conta será cadastrada automaticamente:
- usename: admin
- senha: 123

Agora basta acessar `http://localhost:4173/` no seu navegador e começar a usar a aplicação.
