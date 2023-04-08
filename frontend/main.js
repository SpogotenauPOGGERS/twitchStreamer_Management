const main = document.querySelector(".main");

export default function renderAddPage() {
  clearElement(main);
  console.log("hallo");
  let addForm = document.createElement("form");
  addForm.classList.add("addForm");

  let channelLabel = document.createElement("label");
  channelLabel.textContent = "Channel name";
  channelLabel.htmlFor = "channel";
  addForm.append(channelLabel);
  let channelInput = document.createElement("input");
  channelInput.required = true;
  channelInput.name = "channel";
  channelInput.type = "text";
  addForm.append(channelInput);
  let watchTimeLabel = document.createElement("label");
  watchTimeLabel.textContent = "Watch time";
  watchTimeLabel.htmlFor = "watchTime";
  addForm.append(watchTimeLabel);
  let watchTimeInput = document.createElement("input");
  watchTimeInput.name = "watchTime";
  watchTimeInput.type = "number";
  addForm.append(watchTimeInput);
  let streamTimeLabel = document.createElement("label");
  streamTimeLabel.textContent = "Stream time";
  streamTimeLabel.htmlFor = "streamTime";
  addForm.append(streamTimeLabel);
  let streamTimeInput = document.createElement("input");
  streamTimeInput.name = "streamTime";
  streamTimeInput.type = "number";
  addForm.append(streamTimeInput);
  let peakViewersLabel = document.createElement("label");
  peakViewersLabel.textContent = "Peak viewers";
  peakViewersLabel.htmlFor = "peakViewers";
  addForm.append(peakViewersLabel);
  let peakViewersInput = document.createElement("input");
  peakViewersInput.name = "peakViewers";
  peakViewersInput.type = "number";
  addForm.append(peakViewersInput);
  let averageViewersLabel = document.createElement("label");
  averageViewersLabel.textContent = "Average viewers";
  averageViewersLabel.htmlFor = "averageViewers";
  addForm.append(averageViewersLabel);
  let averageViewersInput = document.createElement("input");
  averageViewersInput.name = "averageViewers";
  averageViewersInput.type = "number";
  addForm.append(averageViewersInput);
  let followersLabel = document.createElement("label");
  followersLabel.textContent = "Followers";
  followersLabel.htmlFor = "followers";
  addForm.append(followersLabel);
  let followersInput = document.createElement("input");
  followersInput.name = "followers";
  followersInput.type = "number";
  addForm.append(followersInput);
  let followerGainedLabel = document.createElement("label");
  followerGainedLabel.textContent = "Followers gained";
  followerGainedLabel.htmlFor = "followerGained";
  addForm.append(followerGainedLabel);
  let followerGainedInput = document.createElement("input");
  followerGainedInput.name = "followerGained";
  followerGainedInput.type = "number";
  addForm.append(followerGainedInput);
  let viewsGainedLabel = document.createElement("label");
  viewsGainedLabel.textContent = "Views gained";
  viewsGainedLabel.htmlFor = "viewsGained";
  addForm.append(viewsGainedLabel);
  let viewsGainedInput = document.createElement("input");
  viewsGainedInput.name = "viewsGained";
  viewsGainedInput.type = "number";
  addForm.append(viewsGainedInput);
  let partneredLabel = document.createElement("label");
  partneredLabel.textContent = "Partnered";
  partneredLabel.htmlFor = "partnered";
  addForm.append(partneredLabel);
  let partneredInput = document.createElement("input");
  partneredInput.name = "partnered";
  partneredInput.type = "checkbox";
  addForm.append(partneredInput);
  let matureLabel = document.createElement("label");
  matureLabel.textContent = "Mature";
  matureLabel.htmlFor = "mature";
  addForm.append(matureLabel);
  let matureInput = document.createElement("input");
  matureInput.name = "mature";
  matureInput.type = "checkbox";
  addForm.append(matureInput);
  let languageLabel = document.createElement("label");
  languageLabel.textContent = "Language";
  languageLabel.htmlFor = "language";
  addForm.append(languageLabel);
  let languageInput = document.createElement("input");
  languageInput.name = "language";
  languageInput.type = "text";
  addForm.append(languageInput);

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add new Streamer";
  addBtn.classList.add("add");
  main.append(addForm);
  main.append(addBtn);

  addBtn.addEventListener("click", (e) => {
    let streamerName = addForm.channel.value;
    e.preventDefault(e);
    const newStreamerData = {
      streamer: addForm.channel.value,
      watchTime: addForm.watchTime.value,
      streamTime: addForm.streamTime.value,
      peakViewers: addForm.peakViewers.value,
      averageViewers: addForm.averageViewers.value,
      followers: addForm.followers.value,
      followerGained: addForm.followerGained.value,
      viewsGained: addForm.viewsGained.value,
      partnered: addForm.partnered.checked,
      mature: addForm.mature.checked,
      language: addForm.language.value,
    };
    fetch("http://localhost:8000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStreamerData),
    }).then((res) => res.json());

    clearElement(main);
    const teamText = document.createElement("h1");
    teamText.textContent = `Should we add a team to ${streamerName}?`;
    teamText.classList.add("teamText");
    main.append(teamText);
    const buttonsSpace = document.createElement("div");
    buttonsSpace.classList.add("buttonsSpace");
    main.append(buttonsSpace);
    const yesAddTeamBtn = document.createElement("button");
    yesAddTeamBtn.textContent = "Yes";
    yesAddTeamBtn.classList.add("yesBtn");
    buttonsSpace.append(yesAddTeamBtn);
    const noAddTeamBtn = document.createElement("button");
    noAddTeamBtn.textContent = "No";
    noAddTeamBtn.classList.add("noBtn");
    buttonsSpace.append(noAddTeamBtn);
    yesAddTeamBtn.addEventListener("click", (e) => addTeam(streamerName));
    noAddTeamBtn.addEventListener("click", (e) => {
      removeHash();
      location.hash = "streamers";
    });
  });
}

function addTeam(streamer) {
  clearElement(main);
  let addTeamForm = document.createElement("form");
  addTeamForm.classList.add("addTeamForm");

  let teamLabel = document.createElement("label");
  teamLabel.textContent = "Team";
  teamLabel.htmlFor = "team";
  addTeamForm.append(teamLabel);
  let teamInput = document.createElement("input");
  teamInput.name = "team";
  teamInput.type = "text";
  addTeamForm.append(teamInput);
  main.append(addTeamForm);
  let addTeamBtn = document.createElement("button");
  addTeamBtn.textContent = `Add team to ${streamer}`;
  addTeamBtn.classList.add("add");
  main.append(addTeamBtn);
  addTeamBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let teamData = {
      streamer: streamer,
      team: addTeamForm.team.value,
    };
    fetch("http://localhost:8000/put", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    }).then((res) => res.json());
    removeHash();
    location.hash = "streamers";
  });
}

function removeHash() {
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
