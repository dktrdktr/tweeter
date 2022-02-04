(function () {
  $(() => {
    $("#tweet-text").on("input", onInput);
  });

  const onInput = function () {
    const $input = $(this);
    let len = $input.val().length;
    let charsLeft = 140 - len;

    const $form = $input.closest("form");
    const $counter = $form.find(".counter");

    $counter.html(charsLeft);
    if (charsLeft < 0) {
      return $counter.addClass("red");
    }
    $counter.removeClass("red");
  };
})();
