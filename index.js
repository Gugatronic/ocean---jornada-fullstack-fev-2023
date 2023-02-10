const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://admin:1wez9e99yu1ecSp8@cluster0.ownz8xt.mongodb.net";
const DB_NAME ="ocean-bancodados-09-02-2023";


async function main() {

//Conexão com o banco de dados
console.log("Conectando com o banco de dados...");
const client = await MongoClient.connect(DB_URL);
const db = client.db(DB_NAME);
const collection = db.collection("itens");
console.log("Banco de dados conectado com Sucesso!");



const app = express();

// O que vier no body da requisição,está em JSON
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Endpoint /oi -> olá , mundo!
app.get('/oi',function(req,res){
  res.send("Olá,mundo!");
});

// Lista de informações
const itens = ["Rick Sanchez","Morty Smith","Summer Smith"];
//                  0               1             2

// CRUD -> Lista de Informações

// Endpoint Read All -> [GET] /item
app.get("/item",async function (req,res){
  const documentos = await collection.find().toArray();
  res.send(itens);
});

// Endpoint Read Single by ID -> [GET]/item/:id
app.get("/item/:id",function(req,res){
  const id = req.params.id;
  const item = collection.findOne({_id: new ObjectId(id)});
  res.send(item);
});

// Endpoint Create -> [Post]/item
app.post("/item", async function(req,res){
  //console.log(req.body);
  const item = req.body;
  await collection.insertOne(item);
  res.send(item);

});


// Endpoint Update -> [PUT] / item / :id
app.put("/item/:id" , async function (req,res){
  const id = req.params.id;
  const body = req.body;

  ///console.log(id,body);

 await collection.updateOne(
    {_id: new ObjectId(id)},
    {$set:body}
  );
  res.send(body);






});






app.listen(3000)
}

main();