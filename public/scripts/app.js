/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from tweets.json
const tweetData = [{
        "user": {
            "name": "Newton",
            "avatars": {
                "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
                "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
                "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": {
                "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    },
    {
        "user": {
            "name": "Johann von Goethe",
            "avatars": {
                "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
        },
        "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
    }
];

function renderTweets(tweets) {
    $( "#tweet-container" ).empty();
    for (let i = 0; i < tweets.length; i++) {

        var $tweet = createTweetElement(tweets[i]);

        $('#tweet-container').prepend($tweet);
    }
}
// loads all tweets from database
function loadTweets() {
    $.ajax({
        url: '/tweets',
        method: "GET"
    }).then(function (response) {
        renderTweets(response);
    });
}


function createTweetElement(tweet) {
    var $footer = $('<footer></footer>');
    var $date = $('<span></span>').text(tweet.created_at);
    var $icon1 = $('<i></i>').addClass('fab fa-font-awesome-flag');
    var $icon2 = $('<i></i>').addClass('fas fa-retweet');
    var $icon3 = $('<i></i>').addClass('fas fa-heart');
    var $divIcon = $('<div></div>').addClass('icons');
    $divIcon.append($icon1);
    $divIcon.append($icon2);
    $divIcon.append($icon3);
    $footer.append($date);
    $footer.append($divIcon)
    var $p1 = $('<p></p>').addClass('posted-tweet').text(tweet.content.text);
    var $header = $('<header></header>');
    var $image1 = $('<img></img>').addClass('profile-pic').attr('src', tweet.user.avatars.small);
    var $h4 = $('<h4></h4>').addClass('real-name').text(tweet.user.name);
    var $h3 = $('<h3></h3>').addClass('handle').text(tweet.user.handle);
    $header.append($image1);
    $header.append($h4);
    $header.append($h3);
    var $article = $('<article></article>').addClass('tweet');
    $article.append($header);
    $article.append($p1);
    $article.append($footer);

    return $article;
}
$(document).ready(function () {
   $('.togglebtn').on('click', function(event) {
        $('.new-tweet').toggleClass('active');
        });

    var $button = $('#load-more-tweets');
    $button.on('click', function () {
    });
     
    $(".new-tweet form").on("submit", function (event) {
        event.preventDefault();
        let $ta = $(this).find('.text-area');
        let $message = $ta.val();
        let errorMsg;
        if ($message === "") {
            errorMsg = 'Please enter a message';
            $( ".error" ).text(errorMsg).slideDown( "slow");
        } else if ($message.length > 140) {
    
            errorMsg = 'Please enter 140 characters or less';
            $( ".error" ).text(errorMsg).slideDown( "slow");
        } else {
            $.ajax({
                    url: '/tweets',
                    method: 'POST',
                    data: $(this).serialize(),
                })
                .then(function () {
                    loadTweets();
                    $( ".error" ).text("").slideDown( "up");
                });
        }
    });
    loadTweets();
});

