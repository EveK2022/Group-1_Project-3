const app = require('./routes');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Go to:  /public  /user");
});


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
  
});

