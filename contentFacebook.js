let words =  ["stack", "web", "github", "Coding", "ahmed", "sharm", "AMIDEAST", "test", "egypt", "sisi","hello"];
let logoIconSrc = chrome.extension.getURL("images/logoIcon.png");
let id=0;
let fbRegex = RegExp('hyperfeed_story_id_.*|tl_unit_.*|mall_post_.*');
let filteredPosts =[];
let alldivs = [];

function qnFindTextAndReplace(word, posts) {
  word = word.toUpperCase();
  for(post of posts){
    $(post).addClass('qn-scanned');
    if(post.textContent.toUpperCase().includes(word)) qnPost(post);
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

alldivs = $('div[id]:not(.qn-scanned)');
filteredPosts = alldivs.filter(function(post){
  return fbRegex.test(alldivs[post].id);
});
console.log("All divs" ,alldivs.length);
console.log("filtered", filteredPosts.length);
quietNet(filteredPosts);

$('body').on('click','.qn-showOriginal', function(e){
  e.preventDefault();
  let showId = parseInt( $(this).attr('qn-original') );
  $('.qn-originalText-'+showId).removeClass('qn-hide');
  $(this).parent().fadeOut(200);
});


chrome.runtime.onMessage.addListener(msg => {
    alldivs = $('div[id]:not(.qn-scanned)');
    filteredPosts = alldivs.filter(function(post){
      return fbRegex.test(alldivs[post].id);
    });
    // console.log(alldivs.length, filteredPosts.length);
    for(filteredPost of filteredPosts) console.log(filteredPost.id);
    quietNet(filteredPosts);
});
// console.log($('div[data-testid="fbfeed_story"]'));
