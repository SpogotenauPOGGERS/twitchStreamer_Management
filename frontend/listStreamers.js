const main = document.querySelector(".main");

export default function renderStreamers() {
  clearElement(main);
  const searchForm = document.createElement("form");
  const searchSpace = document.createElement("div");
  searchSpace.classList.add("searchSpace");
  const searchInput = document.createElement("input");
  searchInput.classList.add("searchInput");
  searchInput.placeholder = "Search for a Streamer";
  searchForm.append(searchInput);
  searchSpace.append(searchForm);
  const submitSearch = document.createElement("button");
  submitSearch.classList.add("submitSearch");
  submitSearch.textContent = "Search";
  searchSpace.append(submitSearch);
  main.append(searchSpace);

  const allStreamers = document.createElement("div");
  allStreamers.classList.add("allStreamers");

  submitSearch.addEventListener("click", (e) => {
    let searchedStreamer = searchInput.value;
    console.log(searchedStreamer.length);
    if (searchedStreamer.length !== 0) {
      clearElement(allStreamers);
      fetch(`http://localhost:8000/getSpec/${searchedStreamer}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.length === 0) {
            const nothingFound = document.createElement("h1");
            nothingFound.textContent = "nothing found:(";
            nothingFound.classList.add("nothingFound");
            allStreamers.append(nothingFound);
          }
          data.forEach((streamer) => {
            const streamerDiv = document.createElement("div");
            streamerDiv.innerHTML = `<div class ="streamerDiv">${streamer.Channel}</div>`;
            allStreamers.appendChild(streamerDiv);
            main.append(allStreamers);
          });
          const streamerName = document.querySelectorAll(".streamerDiv");
          streamerName.forEach((streamer) => {
            streamer.addEventListener("click", (e) => {
              const targetStreamer = data.find(
                (targetStreamer) =>
                  targetStreamer.Channel == e.target.textContent
              );
              displayStreamer(targetStreamer);
            });
          });
        });
    } else {
      clearElement(allStreamers);
      fetch("http://localhost:8000/")
        .then((res) => res.json())
        .then((data) => {
          data.forEach((streamer) => {
            const streamerDiv = document.createElement("div");
            streamerDiv.innerHTML = `<div class ="streamerDiv">${streamer.Channel}</div>`;
            allStreamers.appendChild(streamerDiv);
            main.append(allStreamers);
          });
          const streamerName = document.querySelectorAll(".streamerDiv");
          streamerName.forEach((streamer) => {
            streamer.addEventListener("click", (e) => {
              const targetStreamer = data.find(
                (targetStreamer) =>
                  targetStreamer.Channel == e.target.textContent
              );
              displayStreamer(targetStreamer);
            });
          });
        });
    }
  });

  fetch("http://localhost:8000/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((streamer) => {
        const streamerDiv = document.createElement("div");
        streamerDiv.innerHTML = `<div class ="streamerDiv">${streamer.Channel}</div>`;
        allStreamers.appendChild(streamerDiv);
        main.append(allStreamers);
      });
      const streamerName = document.querySelectorAll(".streamerDiv");
      streamerName.forEach((streamer) => {
        streamer.addEventListener("click", (e) => {
          const targetStreamer = data.find(
            (targetStreamer) => targetStreamer.Channel == e.target.textContent
          );
          displayStreamer(targetStreamer);
        });
      });
    });
}

function displayStreamer(targetStreamer) {
  removeHash();
  clearElement(main);
  let streamerStats = document.createElement("div");
  streamerStats.classList.add("streamerStats");
  console.log(targetStreamer);
  console.log(targetStreamer["Watch time(Minutes)"]);
  streamerStats.innerHTML = `
    <p>Channel: ${targetStreamer.Channel}</p>
    <p>Watchtime in minutes: ${targetStreamer["Watch time(Minutes)"]}</p>
    <p>Streamtime in minutes: ${targetStreamer["Stream time(minutes)"]}</p>
    <p>Peak viewers: ${targetStreamer["Peak viewers"]}</p>
    <p>Average viewers: ${targetStreamer["Average viewers"]}</p>
    <p>Followers: ${targetStreamer.Followers}</p>
    <p>Followers gained: ${targetStreamer["Followers gained"]}</p>
    <p>Views gained: ${targetStreamer["Views gained"]}</p>
    <p>Partnered: ${targetStreamer.Partnered}</p>
    <p>Mature: ${targetStreamer.Mature}</p>
    <p>Language: ${targetStreamer.Language}</p>
    `;
  if (targetStreamer.team != null) {
    streamerStats.innerHTML += `
        <p>Team: ${targetStreamer.team}</p>
        `;
  }
  main.append(streamerStats);
  const editBtns = document.createElement("div");
  editBtns.classList.add("editBtns");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.textContent = "DELETE";
  editBtns.append(deleteBtn);
  deleteBtn.addEventListener("click", (e) =>
    deleteStreamer(targetStreamer.Channel)
  );
  const addTeamBtn = document.createElement("button");
  addTeamBtn.classList.add("addTeamBtn");
  addTeamBtn.textContent = "ADD TEAM";
  if (targetStreamer.team == null) {
    editBtns.append(addTeamBtn);
  }
  addTeamBtn.addEventListener("click", (e) => addTeam(targetStreamer.Channel));
  main.append(editBtns);
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

function deleteStreamer(streamer) {
  fetch(`http://localhost:8000/delete/${streamer}`, {
    method: "DELETE",
  }).then((res) => res.json());
  removeHash();
  location.hash = "streamers";
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
