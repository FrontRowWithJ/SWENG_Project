const PAT = "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";

const getDay = (format, asString = false) => {
  const day = new Date(format).getDay();
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return asString ? daysOfTheWeek[day] : day;
};

const get = async (url) => {
  let data = "";
  let toResolve;
  const promise = new Promise((resolve) => (toResolve = resolve));

  const options = {
    method: "GET",
    headers: { "User-Agent": "Mozilla/5.0", Authorization: `token ${PAT}` },
  };
  fetch(url, options).then((response) => {
    data = response.json();
    toResolve();
  });
  await promise;
  return data;
};

const getCommitDates = async (commit_url) => {
  const commits = await get(commit_url);
  const commitDates = commits.map(
    ({
      commit: {
        author: { date },
      },
    }) => date
  );
  const commitDays = commitDates.map((date) => getDay(date));
  return commitDays;
};

const getDayTally = (days) => {
  const result = [0, 0, 0, 0, 0, 0, 0];
  days.forEach((day) => result[day]++);
  return result;
};

const getDaysCommitted = async (user = "defunkt") => {
  let tally = undefined;
  let tallyResolved;
  const promise = new Promise((resolve) => (tallyResolved = resolve));
  get(`https://api.github.com/users/${user}`)
    .then(async (data) => {
      const { repos_url } = data;
      return await get(repos_url);
    })
    .then(async (repos = []) => {
      const commit_urls = repos.map(({ commits_url: cu }) => cu.slice(0, -6));
      const result = [];
      for (const commit_url of commit_urls) {
        const days = await getCommitDates(commit_url);
        result.push(days);
      }
      tally = getDayTally(result.flat());
      tallyResolved();
    });
  await promise;
  return tally;
};

export default getDaysCommitted;
