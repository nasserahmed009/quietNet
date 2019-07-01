let words =  ["stack", "web", "github", "label", "ahmed", "mohmed", "amr warda", "test", "egypt", "sisi","hello"];
let id=0;

function qnFindTextAndReplace(word, tweets) {
  word = word.toUpperCase();
  for(tweet of tweets){
    $(tweet).addClass('qn-scanned');
    console
    if(tweet.textContent.toUpperCase().includes(word)) qnTweet(tweet);
  }
}


function qnTweet(tweet){
  $(tweet).addClass('qn-originalText qn-hide qn-originalText-'+id);
  $(tweet).after(`
    <p class="qn-replacementText">This tweet contains one of the muted words, <a class="qn-showOriginal" qn-original="`+id+`">Uncover the tweet<a></p>
  `);
  id++;
}


function quietNet(selectors){
  for(word of words) qnFindTextAndReplace(word, selectors);
}

quietNet( $('.tweet:not(.qn-scanned)') );

$('body').on('click','.qn-showOriginal', function(e){
  e.preventDefault();
  let showId = parseInt( $(this).attr('qn-original') );
  $('.qn-originalText-'+showId).slideDown(200).removeClass('qn-hide');
  $(this).parent().slideUp(200);
});


chrome.runtime.onMessage.addListener(msg => {
  quietNet($('.tweet:not(.qn-scanned)'));
});
