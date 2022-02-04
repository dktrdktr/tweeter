(function () {
  $(() => {
    // Fetch tweets on page load
    loadTweets();

    // Form toggle functionality
    $("#tweet-nav-button").click(toggleTweetButton);

    // Handle tweet form submission
    $("#newTweet").submit(submitTweet);
  });

  // Helper function to protect XSS attack via User Input
  const escapeTxt = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and prepends it to the tweets container
  const renderTweets = function (data) {
    $tweets = $("#tweets-container");
    $tweets.empty();
    data.forEach((tweetObj) => {
      const $tweet = createTweetElement(tweetObj);
      $tweets.prepend($tweet);
    });
  };

  // Fetches and renders tweets from the server
  const loadTweets = () => {
    $.get("/tweets").then((data) => {
      renderTweets(data);
    });
  };

  const toggleTweetButton = () => {
    if ($(".new-tweet").css("display") === "block") {
      $(".new-tweet").slideUp("fast");
    } else {
      $(".new-tweet").slideDown("fast");
      $(".form-textarea").focus();
    }
  };

  const submitTweet = function (event) {
    event.preventDefault();

    const $form = $(this);
    const $input = $form.find("textarea");
    const $counter = $form.find("output");
    const $errorMsg = $form.find("p");

    // validation
    const tweetLength = $input.val().length;
    if (tweetLength > 140) {
      $errorMsg.html("Sorry, the tweet is too long!");
      $errorMsg.slideDown("fast");
      return;
    }
    if (tweetLength === 0) {
      $errorMsg.html("It's not possible to post an empty tweet");
      $errorMsg.slideDown("fast");
      return;
    }
    $.post("/tweets", $form.serialize())
      .then(() => {
        $input.val("");
        $counter.val("140");
        // remove error message if it is displayed
        if ($errorMsg.css("display") === "block") {
          $errorMsg.css({ display: "none" });
        }
        loadTweets();
      })
      .catch(() => {
        $errorMsg.html(
          "Sorry there was an error submitting your tweet, please try later."
        );
        $errorMsg.slideDown("fast");
        return;
      });
  };
})();
