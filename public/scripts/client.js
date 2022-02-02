/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  const createTweetElement = ({ user, content, created_at }) => {
    const htmlMarkup = `
    <article class="tweet">
    <header>
      <div>
      <img src="${user.avatars}" alt="" />
      <span>${user.name}</span>
      </div>
      <span>${user.handle}</span>
    </header>
    <p>${content.text}</p>
    <footer>
      <span>${timeago.format(created_at)}</span>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
  `;
    return htmlMarkup;
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach((tweetObj) => {
      const $tweet = createTweetElement(tweetObj);
      $("#tweets-container").append($tweet);
    });
  };

  renderTweets(data);
});
