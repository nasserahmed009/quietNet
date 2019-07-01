//     queue = [document.body], //fgfdgfd
//     current;
//
// for(let i=0; i<words.length; i++) words[i] = words[i].toUpperCase();
//
// let quietNet = function(){
//   while (current = queue.pop()) {
//     for(word of words){
//       // console.log(word);
//       if (!current.textContent.toUpperCase().includes(word)) continue;
//       for (childNode of current.childNodes) {
//           if(childNode.nodeName == "SCRIPT" || childNode.nodeName == "STYLE" || childNode.nodeName == "NOSCRIPT" ) continue;
//
//           switch (childNode.nodeType) {
//               case Node.TEXT_NODE : // 3
//                   if (childNode.textContent.toUpperCase().includes(word)) {
//                       current.classList.add('qn-originalText','qn-hide');
//                   }
//                   break;
//               case Node.ELEMENT_NODE : // 1
//                   queue.push(childNode);
//                   break;
//           }
//       }
//     }
//   }
// }
//
// quietNet();


// $('.qn-originalText').after(`
//   <div class='qn-clear'></div>
//   <p class="qn-replacementText">A muted word is detected here, <a class="qn-showOriginal">show original content<a></p>
// `);
//
