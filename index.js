const { spawn } = require("child_process");
const app = require("express")();

let subprocesses = [];

app.get("/", (req, res) => {
  res.status(200).end();
});


app.get("/moarload", (req, res) => {
  const cat = spawn("cat", ["/dev/urandom"]);
  subprocesses.push(cat);
  cat.stdout.on('data', (data) => {});

  res.send("🤘🤘🤘🤘🤘🤘🤘 INCREASING LOAD 🤘🤘🤘🤘🤘🤘🤘🤘").status(200).end();
});

app.get("/lessload", (req, res) => {
  if(subprocesses.length > 0) {
    subprocesses[subprocesses.length - 1].kill('SIGKILL');
    subprocesses.pop();
    res.send("💀💀💀💀💀💀💀 Decreasing load 💀💀💀💀💀💀💀").status(200).end();
  } else {
    res.status(400).end();
  }
});

app.listen(process.env.PORT || 1026)
