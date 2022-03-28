import "modern-css-reset";
import "./../assets/styles/tailwind.css";
import "./../assets/styles/style.sass";
import "phosphor-icons";
import tweetData from "./data.json";

window.addEventListener("load", () => {
  renderTweets();
  initSearchEvents();
  initEventTweets();
  initNewTweetEvents();
});

const feed = document.querySelector(".tweet_content_items");

//CONTADOR
let isButtonActive = false;
let newTweetText = "";
const newTweetButton = document.querySelector(".send_tweet_content .button_twittear");
const counter = document.querySelector(".tweet_counter");
const newTweetTextArea = document.querySelector("textarea");

const initNewTweetEvents = () => {
  newTweetButton.addEventListener("click", () => {
    if (isButtonActive) {
      createTweetAndUpdate();
    }
  });
  newTweetTextArea.addEventListener("keyup", () => {
    newTweetText = newTweetTextArea.value;
    checkNewTweetLength();
    updateCounter();
  });
};

const updateCounter = () => {
  counter.innerHTML = 140 - newTweetTextArea.value.length;
};


const createTweetAndUpdate = () => {
  const new_tweet = {
    name: "Claudia Sarabia",
    user_name: "@clo_sarabia",
    tweets: newTweetText,
    profile_pic: "/assets/images/profile_pic.png",
    interactions: {
        likes: "",
        rt: "",
        comments: "",
        compartir: ""
    }
  };
  tweetData.unshift(new_tweet);
  renderTweets();
  newTweetTextArea.value = ""
  hideCounter();
};

const checkNewTweetLength = () => {
  //newTweetText = newTweetTextArea.value;
  if (newTweetText.length == 0) {
    setTweetButtonOff();
    hideCounter();
  } else if (newTweetText.length > 0 && newTweetText.length <= 140) {
    setTweetButtonOn();
    showCounter();
  } else {
    setTweetButtonOff();
    showCounter();
  }
};

const setTweetButtonOff = () => {
    console.log("off");
  newTweetButton.classList.remove("clickable");
  isButtonActive = false;
};

const setTweetButtonOn = () => {
    console.log("on");
  newTweetButton.classList.add("clickable");
  isButtonActive = true;
};

const hideCounter = () => {
  counter.classList.remove("visible");
};

const showCounter = () => {
  counter.classList.add("visible");
};

//


const renderTweets = () => {
  let feedString = "";

  for (let i = 0; i < tweetData.length; i++) {
    const tweet = tweetData[i];
    feedString += `
        <div class="tweet_content">
          <div class="profile_pic"> <!--caja uno-->
            <img src="${tweet.profile_pic}" width="40px" height="40px">
          </div>
          <div class="tweet_info"> <!--caja dos-->
            <div class="username_info">
              <div class="name">${tweet.name}</div>
              <div class="user_name">${tweet.user_name}</div>
              <div class="hours">12h</div>
              <div class="opciones">
                <img src="assets/images/tres_puntos.svg" width="20px" height="20px">
              </div>
            </div>
            <div class="tweet_text">
            ${tweet.tweets}
            </div>
            <div class="interactions">
              <img src="assets/images/comentario.svg" width="20px" height="20px">${tweet.interactions.comments}
              <img src="assets/images/rt.svg" width="20px" height="20px">${tweet.interactions.rt}
              <img src="assets/images/me_gusta.svg" class="feed_like" width="20px" height="20px">${tweet.interactions.likes}
              <img src="assets/images/compartir.svg" width="20px" height="20px">${tweet.interactions.compartir}
            </div>
        </div>
        </div>`;
  }

  feed.innerHTML = feedString;

  initEventTweets();
};


/**
 * 
 * Este codigo blabla
 * 
 */
const initEventTweets = () => {
  //usuario hace acción (evento)

  const likeButtons = document.querySelectorAll(".feed_like");

  for (let i = 0; i < likeButtons.length; i++) {
    const likeButton = likeButtons[i];
    likeButton.addEventListener("click", () => {
      tweetData[i].interactions.likes++;
      renderTweets();
    });
  }
  document.addEventListener("click", () => {
    updateTweets();
  });
};

const updateTweets = () => {
  //modificamos el array de tweets
  renderTweets();
};

//SEARCH INPUT

let filteredTweets = [];

const searchInput = document.querySelector(".search_input");

const initSearchEvents = () => {
  searchInput.addEventListener("keyup", () => {
    let userInput = searchInput.value;

    if (userInput.length > 3) {
      filterTweets();
    } else {
      renderTweets();
    }
  });
};

const filterTweets = () => {
  let userInput = searchInput.value;
  filteredTweets = tweetData.filter((tweet) =>
    tweet.tweets.includes(userInput)
  );

  if (filteredTweets.length > 0) {
    renderFilteredTweets(); // tenemos que inicializar eventos
  } else {
    renderEmpty(); // acaba el programa
  }
};

const renderEmpty = () => {
  const messageNotFound = "Not found";
  feed.innerHTML = messageNotFound;
};

const renderFilteredTweets = () => {
  let feedString = "";
  const feed = document.querySelector(".tweet_content_items");

  for (let i = 0; i < filteredTweets.length; i++) {
    const tweet = filteredTweets[i];
    feedString += `
        <div class="tweet_content">
          <div class="profile_pic"> <!--caja uno-->
            <img src="${tweet.profile_pic} width="40px" height="40px">
          </div>
          <div class="tweet_info"> <!--caja dos-->
            <div class="username_info">
              <div class="name">${tweet.name}</div>
              <div class="user_name">${tweet.user_name}</div>
              <div class="hours">12h</div>
              <div class="opciones">
                <img src="assets/images/tres_puntos.svg" width="20px" height="20px">
              </div>
            </div>
            <div class="tweet_text">
            ${tweet.tweets}
            </div>
            <div class="interactions">
              <img src="assets/images/comentario.svg" width="20px" height="20px">${tweet.interactions.comments}
              <img src="assets/images/rt.svg" width="20px" height="20px">${tweet.interactions.rt}
              <img src="assets/images/me_gusta.svg" class="feed_like" width="20px" height="20px">${tweet.interactions.likes}
              <img src="assets/images/compartir.svg" width="20px" height="20px">
            </div>
        </div>
        </div>`;
  }

  feed.innerHTML = feedString;

  initEventTweets();
};

//send tweet - newTweetControler.js


