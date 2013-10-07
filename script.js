var current = parseInt((location.hash || '#0').substring(1));
var pages = $('section.presentation article');
var isAnimating = false;
var endCurrPage = false;
var endNextPage = false;
var animEndEventNames = {
	'WebkitAnimation' : 'webkitAnimationEnd',
	'OAnimation' : 'oAnimationEnd',
	'msAnimation' : 'MSAnimationEnd',
	'animation' : 'animationend'
};
// animation end event name
var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
// support css animations
var support = Modernizr.cssanimations;

pages.each(function(index){
  page = pages.eq(index);
  page.attr('id', index);
  page.data('original', page.attr('class') || '');
});
pages.eq(current).addClass('current');

if(!support){
	onEndAnimation(currPage, nextPage);
}

$(window).on('hashchange', function() {
  var index = parseInt((location.hash || '#-1').substring(1));
  if(index>=0&&index<pages.length&&index!=current){
    pages.eq(current).removeClass('current');
    pages.eq(index).addClass('current');
    current = index;
  }
});

window.document.addEventListener('keyup',  function(e){
    var key = e.keyCode ? e.keyCode : e.which;
  if(key==37){
    back();
  }else if(key==39){
    next();
  }
});

document.body.style.overflow = 'hidden';

$('#next').on('click', function(){
  next();
  return false;
});
$('#back').on('click', function(){
  back();
  return false;
});

var next = function(){
  if(isAnimating){
    return;
  }
  if(current < pages.length-1){
    currPage = pages.eq(current);
    nextPage = pages.eq(++current);
    location = 'index.html#'+current;
    isAnimating = true;
    currPage.addClass('moveToLeftEasing').on(animEndEventName, function(){
	    currPage.off(animEndEventName);
	    endCurrPage = true;
	    if(endNextPage){
		    onEndAnimation(currPage, nextPage);
    	}
    });
    
    nextPage.addClass('current moveFromRight ontop').on(animEndEventName, function(){
	    nextPage.off(animEndEventName);
	    endNextPage = true;
	    if(endCurrPage){
		    onEndAnimation(currPage, nextPage);
	    }
    });
  }
};

var back = function(){
  if(isAnimating){
    return;
  }
  if(current > 0){
    currPage = pages.eq(current);
    nextPage = pages.eq(--current);
    location = 'index.html#'+current;
    isAnimating = true;
    currPage.addClass('moveToRightEasing ontop').on(animEndEventName, function(){
	    currPage.off(animEndEventName);
	    endCurrPage = true;
	    if(endNextPage){
		    onEndAnimation(currPage, nextPage);
    	}
    });
    nextPage.addClass('current moveFromLeft').on(animEndEventName, function(){
      nextPage.off(animEndEventName);
	    endNextPage = true;
      if(endCurrPage){
		    onEndAnimation(currPage, nextPage);
	    }
    });
  }
};

function onEndAnimation(outpage, inpage){
	endCurrPage = false;
	endNextPage = false;
	resetPage(outpage, inpage);
	isAnimating = false;
}

function resetPage(outpage, inpage){
	outpage.attr('class', outpage.data('original'));
	inpage.attr('class', 'current '+inpage.data('original'));
}