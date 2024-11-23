<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Pricing Engine Service</h1>
<p>Ce projet est une API Node.js pour un moteur de tarification, développée avec TypeScript, Sequelize et Express.js .</p>

  <h2>Fonctionnalités de l'application</h2>
  <ul>
    <li><strong>Création d'un produit</strong> (<code>POST /products</code>) : Permet de créer un produit en spécifiant son prix de base et les règles associées à ce produit.</li>
    <li><strong>Récupération d'un produit</strong> (<code>GET /products/:productId</code>) : Permet de récupérer un produit spécifique en utilisant son identifiant unique (UUID).</li>
    <li><strong>Calcul d'un devis</strong> (<code>POST /calculateQuote/:productId</code>) : Permet de calculer un devis pour un produit en envoyant des données utilisateur. Le calcul du prix final est basé sur les règles définies pour ce produit.</li>
  </ul>

  <h2>Prérequis</h2>
  <ul>
    <li><strong>Node.js</strong> (version 16 ou supérieure)</li>
    <li><strong>npm</strong> ou <strong>yarn</strong> pour gérer les dépendances</li>
    <li><strong>MySQL</strong> pour la base de données (ou toute autre base de données compatible avec Sequelize)</li>
  </ul>

  <h2>Installation</h2>
  <p>Clonez ce dépôt sur votre machine locale :</p>
  <pre><code>git clone https://github.com/username/node-template-2024.git
cd node-template-2024</code></pre>
  <p>Installez les dépendances :</p>
  <pre><code>npm install</code></pre>


  <h2>Exemple de fichier <code>.env</code></h2>
  <pre><code># Port de l'application
PORT=3000

# Configuration de la base de données
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pricing_engine
DB_USER=root
DB_PASSWORD=yourpassword
</code></pre>

  <h2>Exemple d'utilisation</h2>

  <h3>1. Créer un produit</h3>
  <p>Envoyez une requête <strong>POST</strong> à <code>/products</code> avec un corps de la requête au format suivant :</p>
  <pre><code>{
  "basePrice": 100,
  "rules": [
    {
      "conditions": [
        {
          "field": "age",
          "operator": ">",
          "value": 20,
          "type": "AND"
        },
        {
          "field": "income",
          "operator": "<",
          "value": 4000
        }
      ],
      "operation": {
        "field": "price",
        "operator": "-",
        "value": "100"
      }
    }
  ]
}</code></pre>

  <h3>2. Récupérer un produit</h3>
<p>Envoyez une requête <strong>GET</strong> à <code>/products/:productId</code> où <code>:productId</code> est l'UUID du produit que vous souhaitez récupérer après avoir créé un produit.</p>


  <h3>3. Calculer un devis</h3>
  <p>Envoyez une requête <strong>POST</strong> à <code>/calculateQuote/:productId</code> avec les données utilisateur dans le corps de la requête :</p>
  <pre><code>{
  "age": 25,
  "location": "Paris"
}</code></pre>

  <h2>Développement</h2>
  <p>Pour démarrer, utilisez la commande suivante qui compile et lance le projet avec <strong>nodemon</strong> :</p>
  <pre><code>npm run dev</code></pre>

</body>
</html>
