const QAPI = require("quizizz.js");
const client = new QAPI.QuizizzClient();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

app.use(cors());
app.use(bodyParser.json());
const PORT = 8080;
// const { myHeaders, myHeaders1 } = require("./headers");


app.listen(PORT, () => console.log(`Its alive on http://localhost:${PORT}`));


const myHeaders = new Headers();
myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0");
myHeaders.append("Accept", "application/json");
myHeaders.append("Accept-Language", "en-US,en;q=0.5");
myHeaders.append("Accept-Encoding", "gzip, deflate, br, zstd");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Credentials", "include");
myHeaders.append("x-q-traceid", "Root=1-66866af7-6a23ebde15e15b52e1c3af38;Parent=a36931c11833398e;Sampled=1");
myHeaders.append("X-Amzn-Trace-Id", "Root=1-66866af7-6a23ebde15e15b52e1c3af38;Parent=a36931c11833398e;Sampled=1");
myHeaders.append("x-quizizz-uid", "53988cb6-d3ea-467b-b873-b0ed75db4438");
myHeaders.append("x-csrf-token", "iZi4qLjT-xKRrw3YSMjN-hRFumzJ7xWqB3-8");
myHeaders.append("experiment-name", "main_main");
myHeaders.append("Origin", "https://quizizz.com");
myHeaders.append("DNT", "1");
myHeaders.append("Sec-GPC", "1");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Referer", "https://quizizz.com/");
myHeaders.append("Cookie", `suid=8f220839-e8b3-4556-8d0d-19e6400bce70; _ga_NYFWYHHSPY=GS1.1.1720085238.1.0.1720085238.60.0.0; _ga=GA1.1.2005138535.1720085238`);
myHeaders.append("Sec-Fetch-Dest", "empty");
myHeaders.append("Sec-Fetch-Mode", "cors");
myHeaders.append("Sec-Fetch-Site", "same-site");
myHeaders.append("TE", "trailers");

const myHeaders1 = new Headers();
myHeaders1.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0");
myHeaders1.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8");
myHeaders1.append("Accept-Language", "en-US,en;q=0.5");
myHeaders1.append("Accept-Encoding", "gzip, deflate, br, zstd");
myHeaders1.append("Connection", "keep-alive");
myHeaders1.append("Upgrade-Insecure-Requests", "1");
myHeaders1.append("Sec-Fetch-Dest", "document");
myHeaders1.append("Sec-Fetch-Mode", "navigate");
myHeaders1.append("Sec-Fetch-Site", "none");
myHeaders1.append("Sec-Fetch-User", "?1");
myHeaders1.append("If-None-Match", "W/2afb-/kcSRxOhFVTXxP0hk3YpQusc7PU");
myHeaders1.append("Priority", "u=1");
myHeaders1.append("TE", "trailers");

let gameId = "";
let quizizzUID = "";



app.post("/answer", async (req, res) => {
  const inputValue = req.body.value;
  const responseMessage = `${inputValue}`;
  console.log(responseMessage);
  const roomId = await getRoomId(responseMessage);
  const quizId = await getQuizId(roomId)
  console.log(quizId);
  const a = await answerGet(quizId);

  res.json(a);
});

async function getRoomId(pin) {
  let roomHash = "";
  const raw = JSON.stringify({
    roomCode: `${pin}`,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://game.quizizz.com/play-api/v5/checkRoom",
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    if (!result.room || !result.room.hash) {
      throw new Error("Invalid room data");
    }
    roomHash = result.room.hash;
    quizizzUID = result.room.hostSessionId;
    console.log(quizizzUID)
    console.log(roomHash);
    return roomHash
  } catch (error) {
    console.error("Error fetching room or game data:", error);
  }
  return roomHash;
}

async function getQuizId(quizid) {
  myHeaders1.append("Cookie", `quizizz_uid=${quizizzUID}; QUIZIZZ_EXP_SLOT=22; QUIZIZZ_EXP_NAME=main_main; QUIZIZZ_EXP_LEVEL=live; QUIZIZZ_EXP_VERSION=v2; g_state={i_p:1720639883519,i_l:3}; __zlcmid=1KYmX68J30H1cEu; qnps_date_checked=1710477960181; qnps_was_prompted=false; qnps_pending=false; locale=en; crowdinLangCode=en; definiteCountry=AL; _sid=nWnW9yD5-kZ9IOTS68I1cXB3X1ZPQqd52l46kRorEMsuArGdWpLGepnSM36kCzOAdlt0RsiWa0hhnUXjCeWA7WVE2yljL8ii.BEHDM3Z3LF4aQj9xnPwJmQ.LqBT-77uAjfrYLTR; _csrf=W5gslamELUvi6P4FCB5GNgPO; x-csrf-token=wgponxf6-WdI5NrP_C4x1phtPRvgSlTA-CT8; suid=428cf4e8-28d9-4654-8025-76edd5d095ba`);
  const requestOptions1 = {
    method: "GET",
    headers: myHeaders1,
    redirect: "follow",
  };
  const gameResponse = await fetch(
    `https://quizizz.com/_api/main/game/${quizid}`,
    requestOptions1
  );

  const gameResult = await gameResponse.json();
  gameId = gameResult.data.quizId;
  console.log(gameId);
  return gameId;
}

async function answerGet(gameId) {
  const quizData = (await client.fetchQuiz(gameId)).info.questions;
  const objectsArray = [];
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

