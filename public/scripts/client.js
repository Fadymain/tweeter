/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
for (let tweet of tweets) {
  const $jTweets = createTweetElement(tweet);
  $("#tweet-section").prepend($jTweets)
}
}

$("#tweetcent").submit(function(event) {
  event.preventDefault();
  const serializeData = $(this).serialize();
  console.log("serializedData", serializeData);
  $.post("/tweets/", serializeData, (response) => {
    loadTweets();
    console.log("response", response);
  })
})

const loadTweets = function() {
  $.ajax({
    url: "/tweets/",
    method: "GET",
    success: (data) => {
      console.log("data", data);
      renderTweets(data);
    },
    error: (err) => {
      console.log("err", err);
    }
  })
}
loadTweets();

const createTweetElement = function(tweet) {
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

renderTweets(data);


  
})