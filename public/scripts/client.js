/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
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
    // $("#tweets-container").html("");
    $("#tweets-container").empty();
    tweets.forEach((tweetObj) => {
      const $tweet = createTweetElement(tweetObj);
      $("#tweets-container").prepend($tweet);
    });
  };

  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" }).then(function (moreTweetsJson) {
      renderTweets(moreTweetsJson);
    });
  };

  loadTweets();
  $("#newTweet").submit(function (event) {
    event.preventDefault();
    const tweetLength = $("#tweet-text").val().length;
    if (tweetLength > 140) {
      alert("Sorry, tweet is too long!");
      return;
    }
    if (tweetLength === 0) {
      alert("Why post an empty tweet?");
      return;
    }
    $.post("/tweets", $("#newTweet").serialize())
      .then(() => {
        alert("Tweet submited!");
        $("#tweet-text").val("");
        $(".counter").val("140");
        loadTweets();
      })
      .catch(() => alert("Sorry, there was an error"));
  });
});
