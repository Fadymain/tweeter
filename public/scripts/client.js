/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const renderTweets = function (tweets) {
    $("#tweet-section").empty()
    for (let tweet of tweets) {
      const $jTweets = createTweetElement(tweet);
      $("#tweet-section").prepend($jTweets)
    }
  }

  $("#tweetcent").submit(function (event) {
    event.preventDefault();
    const serializeData = $(this).serialize();
    console.log("serializedData", serializeData);

    if (serializeData === "text=") {
      $("#error").text("You cannot submit an empty tweet")
    } else if (serializeData.length > 140) {
      $("#error").text("Yore tweet has too many characters")
    } else {
      $.post("/tweets", serializeData, (response) => {
        $("#error").empty();
        this.reset();
        console.log("response", response);
        loadTweets()
      })
    }

    // if (serializeData === "text=" || serializeData.length > 140) {
    //   alert("Input Error");
    // } else {
    //   $.post("/tweets", serializeData, (response) => {
    //     console.log("response", response);
    //     loadTweets()
    //   })
    // }
  })

  const loadTweets = function () {
    
    $.ajax({
      url: '/tweets', 
      method: "GET",
      success: function(data) {
        console.log("success", data)
      }
    })
      .then(function(data) {
        renderTweets(data);
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  }
  loadTweets();

  const createTweetElement = function (tweet) {
    let $tweet = `
<article class="article-section">
<header class="postTweetSect">
  <div class="leftSideTweet">
    <img src="${tweet.user.avatars}">
    <p id="tweetName">${tweet.user.name}</p>
  </div>
  
  <div>${tweet.user.handle}</div>
</header>
<div class="tweetedText">
  <p>${tweet.content.text}</p>
</div>
<footer class="tweetedBottom">
  <span class="daysAgo">${timeago.format(tweet.created_at)}</span>
  <div id="tweetBottomRight">
    <i id="icon1" class="fas fa-flag"></i>
    <i id="icon2" class="fas fa-retweet"></i>
    <i id="icon3" class="fas fa-heart"></i>
  </div>
</footer>
</article>
`

    return $tweet;
  }


})

