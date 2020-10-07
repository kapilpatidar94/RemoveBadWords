var bad = ["dog*", "cat*"];
var replacement = ["***"];
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function replaceBad(sentence){
	return sentence.split(/\b/).map(w => {
		for(var i=0; i<bad.length; i++){
      
			var badToken = bad[i];
      // console.log("oaoaoaoao",w.replace(new RegExp('^' + escapeRegExp(badToken.slice(0,-1)) + '(.*)$', 'i'), replacement[0]+'$1'));
			if(badToken.slice(-1)==='*') { // ends with *
				w= w.replace(new RegExp('^' + escapeRegExp(badToken.slice(0,-1)) + '(.*)$', 'i'), replacement[0]+'$1');
			}
			if(badToken.slice(0)==='*') { // starts with *
			w=	w.replace(new RegExp('^(.*)'+ escapeRegExp(badToken.slice(1)) + '$', 'i'), '$1' + replacement[0]);
			}
			if(badToken.slice(-1)==='!') { // ens with !
			w= w.replace(new RegExp('^'+ escapeRegExp(badToken.slice(0,-1)) + '$', ''), replacement[0]);
			}
			w= w.replace(new RegExp('^'+badToken+'$', 'i'), replacement[0]);
		}
    // console.log("*****",w);
    return w;
	}).join('');
}

var test=['When we were returning from the picnic, it was raining cats and dogs.',' It is said that a cat hath nine lives, yet care would wear them all out.','We spend a fortune on giving our cats and dogs the good life.'
];

test.forEach(s => {
	console.log(s + ' => ' + replaceBad(s)); 
})