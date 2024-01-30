const connectDB = require('./config/database')
const { MongoClient, ObjectId } = require('mongodb')
const Sunscreen = require('../models/Sunscreen')

let dbConnectionStr = process.env.DB_STRING,
    db, 
    collection

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(client => {
    console.log('Connected to database.')
    db = client.db('sunscreen-database')
    collection = db.collection('sunscreens')
  })
  .catch(error => console.error(error))


// jquery autocomplete search of database
// uses MongoDB search index definition (see below)
const searchSunscreens = async (req, res) => {
  try {
    let result = await collection.aggregate([
      {
        $search: {
          compound: {
            should: [
              {
                autocomplete: {
                  query: `${req.query.query}`,
                  path: 'brand',
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 3,
                  }
                }
              },
              {
                autocomplete: {
                  query: `${req.query.query}`,
                  path: 'name',
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 3,
                  }
                }
              }
            ]
          }
        }
      }
    ]).toArray()
    res.send(result)
  } catch(error) {
    res.status(500).send({message: error.message})
  }
}

const getSearchResults = async (req, res) => {
  try {
    let result = await collection.findOne({
      '_id': ObjectId(req.params.id)
    })
    res.send(result)
  } catch(error) {
    res.status(500).send({message: error.message})
  }
}

module.exports = {
  searchSunscreens,
  getSearchResults,
}


/* --------------------------------------------------
MongoDB search index definition:
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "brand": {
        "foldDiacritics": true,
        "maxGrams": 7,
        "minGrams": 3,
        "tokenization": "edgeGram",
        "type": "autocomplete"
      },
      "name": {
        "foldDiacritics": true,
        "maxGrams": 7,
        "minGrams": 3,
        "tokenization": "edgeGram",
        "type": "autocomplete"
      }
    }
  }
}
-------------------------------------------------- */
