const projectData = {};
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('webbapp'));

const port = 8080;

const server = app.listen(port, listening);

function listening() {
    console.log(`server running on localhost:${port}`);
}

app.get('/all', callBack)

function callBack(req, res) {
    res.send(projectData);
};

app.post('/save', function (req,res) {
    projectData.nameOne = req.body.name;
    projectData.birthdayOne = req.body.birthday;
    projectData.countryOne = req.body.country;
    projectData.imageOne = req.body.image;
    console.log(req.body.country);
    res.end();
});