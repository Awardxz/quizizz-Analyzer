const QAPI = require("quizizz.js");
const client = new QAPI.QuizizzClient();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const PORT = 8080;

let gameId = "";
app.listen(PORT, () => console.log(`Its alive on http://localhost:${PORT}`));
let responseMessage = "";

app.post("/answer", async (req, res) => {
  const inputValue = req.body.value;
  responseMessage = `${inputValue}`;

  const a = await answerGet(responseMessage);

  res.json(a);
});

async function getRoomId(pin) {
  const { myHeaders } = require("./headers");

  let roomHash = "";

  const raw = JSON.stringify({
    roomCode: "496134",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://game.quizizz.com/play-api/v5/checkRoom", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      roomHash = result.room.hash;
      console.log(roomHash);
      
    })
    .catch((error) => console.error(error));

  console.log(roomHash);
}

async function answerGet(gameId) {
  const quizData = (await client.fetchQuiz(gameId)).info.questions;
  let objectsArray = [];
  quizData.forEach((question) => {
    const big = new QAPI.Structure(question.structure);
    const question1 = big.title.text;
    const questionn = question1
      .toString()
      .replaceAll("<p>", "")
      .replaceAll("</p>", "");
    const answer = big.choices;
    const answernumber = big.answerNumber;
    const answerFinal = answer[answernumber].text.toString();
    const actualAnswer = answerFinal
      .replaceAll("<p>", "")
      .replaceAll("</p>", "");
    let object = {
      question: questionn,
      answer: actualAnswer,
    };
    objectsArray.push(object);
    console.log(object);
  });
  return objectsArray;
}
