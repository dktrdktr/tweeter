/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeTxt = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    <p>${escapeTxt(content.text)}</p>
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
      $("#error-msg").html("Sorry, the tweet is too long!");
      $("#error-msg").slideDown("fast");
      return;
    }
    if (tweetLength === 0) {
      $("#error-msg").html("It's not possible to post an empty tweet");
      $("#error-msg").slideDown("fast");
      return;
    }
    $.post("/tweets", $("#newTweet").serialize())
      .then(() => {
        $("#tweet-text").val("");
        $(".counter").val("140");

        if ($("#error-msg").css("display") === "block") {
          $("#error-msg").css({ display: "none" });
        }
        loadTweets();
      })
      .catch(() => {
        $("#error-msg").html(
          "Sorry there was an error submitting your tweet, please try later."
        );
        $("#error-msg").slideDown("fast");
        return;
      });
  });

  // Form toggle functionality
  $("#tweet-nav-button").click(function () {
    if ($(".new-tweet").css("display") === "block") {
      $(".new-tweet").slideUp("fast");
    } else {
      $(".new-tweet").slideDown("fast");
      $("#tweet-text").focus();
    }
  });
});
