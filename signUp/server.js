const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs'); // Require EJS
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dada.sql',
  database: 'thriftup'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set EJS as view engine
app.set('view engine', 'ejs');

// Login route
app.post('/signin', async (req, res) => {
  const email = req.body.mail;
  const password = req.body.mp;
console.log('received email',email);
console.log('received password',password);

const sql = 'SELECT * FROM client WHERE `Adresse mail` = ?';

  connection.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(401).send('Adresse e-mail incorrecte');
    }

    const user = results[0]; // Première ligne de résultats de la requête SQL
try{
    if (password === user['mot de passe']) {
      // Connexion réussie
      return res.status(200).send('Connexion réussie !');
    } else {
      // Mot de passe incorrect
      return res.status(401).send('Mot de passe incorrect');
    } 
} catch {
  console.error("erreur lors de la comparaison ",error);
  return res.status(500).send('erreur interne du serveur');
}
  });
});
// Render EJS file
app.get('/', (req, res) => {
  res.render('sign_in'); // Replace 'index' with the name of your EJS file (without the .ejs extension)
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
