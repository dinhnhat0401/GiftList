const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "e182c6e0a9a6bbbb065c9f75b59ad767ff86b78a4fae9fcae1c96d6e290a6e4c";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
