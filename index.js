const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000

const pass = 'alArab757742'
app.use(cors())
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alArab:alArab757742@cluster0.fhmdf.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("burjAlArab").collection("bookings");
  app.post('/addbooking',(req,res)=>{
    const newBooking = req.body
    collection.insertOne(newBooking)
    .then(result=>{
      res.send(result.insertedCount>0)
    })
    console.log(newBooking);
  })
  app.get('/booking',(req,res)=>{
    collection.find({email : req.query.email})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)