const userInput = document.querySelector("#user-input");
const findBtn = document.querySelector(".find-btn");
const fetchData = document.querySelector(".fetch-data");
const notFoundUI = `  <div class="tag">
        <h1>User Not Found</h1>
        <button class="try-again">Try Again</button>
      </div>`;

function getGithubUser() {
  const apiURL = `https://api.github.com/users/${userInput.value}`;

  if (!userInput.value) {
    fetchData.innerHTML = notFoundUI;
  } else {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User Not Found");
        }
        return response.json();
      })
      .then((user) => {
        // If data is present, return user details we enter data in UI through this parameter
        fetchData.innerHTML = `     
        <div class="user-data">
        <img src="${user.avatar_url || "/img/anonymous.jpg"
          }" alt="avatar-url" />
        <div class="personal-info">
          <h1 class="name">${user.name || "Anonymous"}</h1>
          <p class="user-name">${user.login}</p>
          <p class="user-address">Location : ${user.location || "Not Present"
          }</p>
        </div>
        <div class="user-bio">
          <p>${user.bio}</p>
        </div>

        <button class="account-url"><a href="${user.html_url
          }">Go to Profile</a></button>
        <div class="github-info">
          <p class="visibility">View Mode: <span>${user.user_view_type
          }</span></p>
          <p class="user-repo">Repositories : <span>${user.public_repos
          }</span></p>
          <p class="user-follower">Followers :<span> ${user.followers
          }</span></p>
          <p class="user-follower">Following :<span> ${user.following
          }</span></p>
        </div>
      </div>`;
      })
      .catch((err) => {
        fetchData.innerHTML = notFoundUI;
      });
  }
}


findBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getGithubUser();
});

// Add functionality to the "Try Again" button
fetchData.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("try-again")) {
    // Clear the data and allow the user to try again
    fetchData.innerHTML = "";
    userInput.value = ""; // Clear the input field
  }
});

// nav bar
const barIcon = document.querySelector(".icon");
const navLinks = document.querySelector(".navlinks");
const navLinksli = document.querySelectorAll(".navlinks li");

barIcon.addEventListener("click", () => {
  navLinks.classList.toggle("left");
});
navLinksli.forEach((li) => {
  li.addEventListener("click", () => {
    navLinks.classList.remove("left");
  });
});

// practice
// const data = fetch(apiURL)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("User Not Found");
//     }
//     return response.json();
//   })
//   .then((response) => {
//     if (response.ok) {
//       return (userData.innerHTML = `

//     `);
//     }
//   });
