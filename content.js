console.log('main script');
let words =  ["stack", "web", "github", "label", "ahmed", "mohmed", "amr warda", "test", "egypt", "sisi","hello"];
let id=0;

// the main function of the plugin, search for the text and replace it
function qnFindTextAndReplace(word, selectors) {
  word = word.toUpperCase();
  for (let i=0; i<selectors.length; i++) {
    let selector = selectors[i];
    if( selector.style && $(selector).is(":hidden") ) continue;

    if( $(selector).attr("qn-scanned") == "qn-scanned" ) continue;
    window.setTimeout(function(){
      $(selector).attr("qn-scanned", "qn-scanned");
    },0);
    // break if the muted word dosen't match the selector
    if (!selector.textContent.toUpperCase().includes(word)) continue;
    // break if the selector is one of those
    if(selector.nodeName == "SCRIPT" || selector.nodeName == "STYLE" || selector.nodeName == "NOSCRIPT" || selector.nodeName == "CITE" ) continue;
    // if node type = 3 -text node-, hide the originalText and replace it
    if (selector.nodeType == 3) qnReplaceText(selector);
    // if not text node check its childs
    else if(selector.childNodes.length > 0){
      qnFindTextAndReplace(word, selector.childNodes);
    }
  }
}


function qnReplaceText(selector){
  $( selector.parentElement ).addClass('qn-originalText qn-hide qn-originalText-'+id);
  $( selector.parentElement ).after(`
    <p class="qn-replacementText">A muted word is detected here, <a class="qn-showOriginal" qn-original="`+id+`">show original content<a></p>
  `);
  id++;
}


function quietNet(selectors){
  for(word of words) qnFindTextAndReplace(word, selectors);
}

quietNet(document.getElementsByTagName('body'));

$('body').on('click','.qn-showOriginal', function(e){
  e.preventDefault();
  let showId = parseInt( $(this).attr('qn-original') );
  $('.qn-originalText-'+showId).removeClass('qn-hide');
  $(this).parent().slideUp(200);
});


chrome.runtime.onMessage.addListener(msg => {
  quietNet($('body').find('*:not([qn-scanned]'));
  // let filtered = $('body').find('*:not([qn-scanned]').filter(function(){
  //   return !$(this).attr('qn-scaned') && this.tagName != "SCRIPT";
  // });

  // quietNet(document.getElementsByTagName('body'));
  // console.log(filtered);
});
