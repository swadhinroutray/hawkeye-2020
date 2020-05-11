require("dotenv").config();

const fetch = require("node-fetch");

function parseCookies(response) {
  const raw = response.headers.raw()["set-cookie"];
  return raw
    .map((entry) => {
      const parts = entry.split(";");
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join(";");
}

async function addQuestions(region, level) {
  var loginCookie = parseCookies(
    await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: "swadhin.routray@gmail.com",
        password: "a",
      }),
    })
  );

  //console.log("HERE GOES NOTHING")
  //console.log(loginCookie)

  fetch("http://localhost:8080/api/admin/addquestion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: loginCookie,
    },
    body: JSON.stringify({
      question: "The dogs are out",
      answer: "Tedros Adhanom Ghebreyesus",
      region: region,
      level: level,
      keywords: ["WHO", "World Health Organisation", "Baha Men"],
    }),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

async function loopAdd() {
  var i;
  for (i = 0; i < 5; i++) {
    var j;
    for (j = 0; j <= 6; j++) {
      addQuestions(i, j);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
}

async function addHawksQuestions(level) {
  var loginCookie = parseCookies(
    await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: "a@g.com",
        password: "a",
      }),
    })
  );

  fetch("http://localhost:8080/api/admin/addhawksnestquestion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: loginCookie,
    },
    body: JSON.stringify({
      question: "The dogs are out",
      answer: "Tedros",
      level: level,
      keywords: ["WHO", "World Health Organisation", "Baha Men"],
    }),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

async function loopHN() {
  for (var j = 1; j <= 7; j++) {
    addHawksQuestions(j);
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

loopAdd();
loopHN();
