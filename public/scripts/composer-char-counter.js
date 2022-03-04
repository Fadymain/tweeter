$(document).ready(function() {
  $("#tweet-text").on("input", function(event) {
    const wordCount = $(this).val().length;
    if (wordCount > 140) {
      document.querySelector(".counter").classList.add("redCounter")
    } else {
      document.querySelector(".counter").classList.remove("redCounter")
    }
    $(".counter").text(140 - wordCount)
  });
})
