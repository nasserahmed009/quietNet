let words =  ["stack", "web", "github", "label", "ahmed", "mohmed", "amr warda", "test", "egypt", "sisi","hello"];
let id=0;

function qnFindTextAndReplace(word, posts) {
  word = word.toUpperCase();
  for(post of posts){
    $(post).addClass('qn-scanned');
    console
    if(post.textContent.toUpperCase().includes(word)) qnPost(post.childNodes[0]);
  }
}


function qnPost(post){
  $(post).addClass('qn-originalText qn-hide qn-originalText-'+id);
  $(post).after(`
    <p class="qn-replacementText qn-replacementText-facebook">This post contains one of the muted words, <a class="qn-showOriginal" qn-original="`+id+`">Uncover the post<a></p>
  `);
  id++;
}


function quietNet(posts){
  for(word of words) qnFindTextAndReplace(word, posts);
}

quietNet($('div[data-testid="fbfeed_story"]>div:not(.qn-scanned)'));

$('body').on('click','.qn-showOriginal', function(e){
  e.preventDefault();
  let showId = parseInt( $(this).attr('qn-original') );
  $('.qn-originalText-'+showId).fadeIn(200).removeClass('qn-hide');
  $(this).parent().fadeOut(200);
});


chrome.runtime.onMessage.addListener(msg => {
  quietNet($('div[data-testid="fbfeed_story"]>div:not(.qn-scanned)'));
});
// console.log($('div[data-testid="fbfeed_story"]'));
