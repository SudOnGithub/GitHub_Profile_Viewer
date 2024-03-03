const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const searchBox = document.querySelector("#search");

const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  // Concatinating the username with Url
  const data = await response.json();
  console.log(data);
  const card = `
     <div class="card">
     <div>
         <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
     </div>
     <div class="user-info">
         <h2>${data.name}</h2>
         <p>${data.bio}</p>

         <ul class="info">
             <li>${data.followers}<strong>Followers</strong></li>
             <li>${data.following}<strong>Following</strong></li>
             <li>${data.public_repos}<strong>Repos</strong></li>
         </ul>

         <div id="repos">
             <a class="repo" href="#" target="_blank">Repo 1</a>
             <a class="repo" href="#" target="_blank">Repo 2</a>
             <a class="repo" href="#" target="_blank">Repo 3</a>
         </div>
     </div>
 </div>`;
  main.innerHTML = card;
  getRepos(username);
};

// init call
// getUser("SudOnGithub");

const getRepos = async (username) => {
  const repos = document.querySelector("#repos");
  const response = await fetch(APIURL + username + "/repos");
  const data = await response.json();
  data.forEach((item) => {
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = item.html_url;
    // Add html to open it like a webpage
    elem.innerText = item.name;
    elem.target = "_blank";
    // Taaki next page pr khule
    repos.appendChild(elem);
  });
};

const formSubmit = () => {
  
  if (searchBox.value != "") {
    getUser(searchBox.value);
    searchBox.value = ""
  }
  return false;
};


searchBox.addEventListener(
    "focusout", function (){
        formSubmit()
    }
)

// Username daalte hi focusout krte hi info de dega is upar vaale code se