const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// datos quemados
const users = [
  { username: 'testuser', password: '1234' }
];

// ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});



// index pasa a aser /
app.get('/index.html', (req, res) => res.redirect('/'));


// definición de páginas
const pages = {
  '/about': 'about.html',
  '/contacto': 'contacto.html',
  '/dashboard': 'dashboard.html',
  '/register': 'register.html',
  '/success': 'success.html',
  '/recursos': 'recursos.html',
  '/main': 'main.html'
};

Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', file));
  });
});

// login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.redirect('/recursos');
  } else {
    return res.status(401).send('Usuario o contraseña incorrectos. <a href="/">Volver</a>');
  }
});

// registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Faltan datos. <a href="/register">Volver</a>');
  }

  const exists = users.some(u => u.username === username);

  if (exists) {
    return res.status(400).send('El usuario ya existe. <a href="/register">Volver</a>');
  }

  users.push({ username, password });
  console.log('Usuario registrado:', username);
  return res.redirect('/success');
});

// errores 404 con HTML
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'html', '404.html'));
});

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
