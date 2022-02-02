$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function () {
    let tweetLength = $(this).val().length;
    let tweetLengthCount = 140 - tweetLength;
    const counter = $(this).siblings().children().eq(1);
    counter.val(tweetLengthCount);
    if (tweetLengthCount < 0) {
      counter.addClass("counter-char-limit");
    } else {
      counter.removeClass("counter-char-limit");
    }
  });
});
