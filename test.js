const https = require("https");

const get = (path, callback) => {
  https.get(
    {
      hostname: "api.github.com",
      path: path,
      headers: { "User-Agent": "Mozilla/5.0" },
    },
    (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        callback(data);
      });
    }
  );
};

const tryPrint = (data) => {
  try {
    console.log(JSON.parse(data));
  } catch {
    console.log(data);
  }
};

const getPath = (url, s = ".com/") => url.indexOf(s) + s.length - 1;
const doSomething = (data) => {
  const { repos_url } = JSON.parse(data);
  const path = repos_url.substring(
    repos_url.indexOf(".com/") + ".com/".length - 1
  );
  get(path, (data) => {
    const repos = JSON.parse(data);
    const commits_urls = repos.map((repo) => repo.commits_url);
    console.log(commits_urls);
    const urlPath = getPath(commits_urls[0]);
    get(urlPath, (data) => console.log(data));
  });
};

get("/users/defunkt", doSomething);
