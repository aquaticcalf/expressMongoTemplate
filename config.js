const dotenv = require('dotenv');
dotenv.config();

const PORT = 5555;

// a sample mongodb atlas url, MUST CHANGE to your own
const mongoDBURL =  "mongodb+srv://"+process.env.MONGO_NAME+":"+process.env.MONGO_PASSWORD+"@<cluster>/<dbname>?retryWrites=true&w=majority";

module.exports = { PORT, mongoDBURL };