var express = require('express')
var router = express.Router() 

var fs = require("fs");
var path = require("path");
var db = require("../db/db.json");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

function readData(){
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'))); 
}

function writeData(data){
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data), (err) => {
    if (err) return (err);
  })
}

router.post("/notes", (req, res) => {
  let data = readData()
  req.body.id = data.length; 
  data.push(req.body);
  writeData(data)
  res.send(data)
})

router.get("/notes", (req, res) => {
  res.json(readData())
})
 
router.delete("/notes/:id", (req, res) => {
  let data = readData()
  let filtered = data.filter((value) => req.params.id != value.id);
  writeData(filtered);
  res.send(filtered)
})

module.exports = router;
