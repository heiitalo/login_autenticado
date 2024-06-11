<h1>Login Autenticado</h1>



<h2>Descrição</h2>
<p>Este projeto implementa um sistema de login autenticado com rotas protegidas utilizando Node.js e MySQL com Prisma ORM. O objetivo é fornecer uma base sólida para a autenticação de usuários, incluindo registro, login e gerenciamento de sessões.</p>

<h2>Índice</h2>
<ul>
    <li><a href="#instalação">Instalação</a></li>
    <li><a href="#configuração">Configuração</a></li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#autores">Autores</a></li>
</ul>

<h2 id="instalação">Instalação</h2>
<p>Siga as instruções abaixo para instalar e configurar o projeto localmente.</p>

<h3>Pré-requisitos</h3>
<ul>
    <li>Node.js instalado</li>
    <li>npm ou yarn instalado</li>
    <li>MySQL instalado e configurado</li>
</ul>

<h3>Passos</h3>
<ol>
    <li>
        <p>Clone o repositório</p>
        <pre><code>git clone https://github.com/heiitalo/login_autenticado.git</code></pre>
    </li>
    <li>
        <p>Entre no diretório do projeto</p>
        <pre><code>cd login_autenticado</code></pre>
    </li>
    <li>
        <p>Instale as dependências</p>
        <pre><code>npm install
# ou
yarn install</code></pre>
    </li>
</ol>

<h2 id="configuração">Configuração</h2>
<ol>
    <li>
        <p>Crie um banco de dados no MySQL:</p>
        <pre><code>CREATE DATABASE nome_do_banco;</code></pre>
    </li>
    <li>
        <p>Crie um arquivo <code>.env</code> na raiz do projeto e adicione as seguintes variáveis de ambiente:</p>
        <pre><code>PORT=3300
DATABASE_URL=mysql://seu_usuario:sua_senha@localhost:3306/nome_do_banco
SECRET_KEY=sua_chave_secreta</code></pre>
    </li>
    <li>
        <p>Siga a documentação do prisma para configuração:</p>
        <p>Confira o <a href="https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-mysql" target="_blank" rel="noopener noreferrer">prisma</a>.</p>
    </li>


</ol>

<h2 id="uso">Uso</h2>
<p>Para iniciar o servidor, use o comando abaixo:</p>
<pre><code>npm run dev
# ou
yarn dev</code></pre>
<p>O servidor estará disponível em <code>http://localhost:3300</code>.</p>

<h2>Endpoints</h2>
<ul>
    <li><code>POST /user/cadUsuario</code>: Cadastro de novo usuário.</li>
    <li><code>POST /user/login</code>: Autenticação do usuário.</li>
    <li><code>GET /user/logout</code>: Desvincula o token do usuário.</li>
    <li><code>PATCH /user/cadFotoUsuario/:id</code>: Adiciona ou atualiza a foto do usuário.</li>
    <li><code>POST /user/envioEmailRecuperarSenha</code>: Envia o email de recuperação de senha para o email cadastrado, logo depois gera um token para a alteração da senha.</li>
    <li><code>PATCH /user/resetSenha/:resetToken</code>: Rota para a alteração da senha.</li>
    <li><code>PATH /user/updateUsuario</code>: Altera o usuário.</li>
    <li><code>GET /user/getAllUsuario</code>: Buscas todos os usuários cadastrados.</li>
    <li><code>GET /user/getUsuarioByNome/:nome</code>: Buscas todos os usuários cadastrados com o nome fornecido no parametro.</li>
        <li><code>GET /user/getUsuarioByEmail/:email</code>: Buscasa o usuário cadastrado com o email fornecido no parametro.</li>
        <li><code>GET /user/getUsuarioByCPF/:cpf</code>: Buscas o usuário cadastrado com o cpf fornecido no parametro.</li>
        <li><code>GET /user/getUsuarioById/:id</code>: Buscas o usuário cadastrado com o id fornecido no parametro.</li>

    
</ul>


<h2 id="licença">Licença</h2>
<p>Este projeto está licenciado sob a Licença MIT - veja o arquivo <a href="LICENSE">LICENSE</a> para mais detalhes.</p>

<h2 id="autores">Autores</h2>
<ul>
    <li><strong>Italo</strong> - <a href="https://github.com/heiitalo">heiitalo</a></li>
</ul>

