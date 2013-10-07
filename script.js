var current = 0;
var $pages = $('section.presentation article');
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
var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
		// support css animations
var support = Modernizr.cssanimations;

$pages.eq(current).addClass('current');

if( !support ) {
	onEndAnimation( $currPage, $nextPage );
}

window.document.addEventListener('keyup',  function(e){
    var key = e.keyCode ? e.keyCode : e.which;
  if(key==37){
    previous();
  }else if(key==39){
    next();
  }
});

var next = function(e){
  if(current < $pages.length-1){
    $currPage = $pages.eq(current);
    $nextPage = $pages.eq(++current);
    $currPage.addClass('moveToLeftEasing').on(animEndEventName, function(){
	    $currPage.off(animEndEventName);
	    endCurrPage = true;
	    if(endNextPage){
		    onEndAnimation( $currPage, $nextPage );
    	}
    });
    
    $nextPage.addClass('current moveFromRight ontop').on(animEndEventName, function(){
	    $nextPage.off(animEndEventName);
	    endNextPage = true;
	    if(endCurrPage){
		    onEndAnimation( $currPage, $nextPage);
	    }
    });
  }
};

var previous = function(e){
  if(current > 0){
    $currPage = $pages.eq(current);
    $nextPage = $pages.eq(--current);
    $currPage.addClass('moveToRightEasing ontop').on(animEndEventName, function(){
	    $currPage.off(animEndEventName);
	    endCurrPage = true;
	    if(endNextPage){
		    onEndAnimation($currPage, $nextPage);
    	}
    });
    $nextPage.addClass('current moveFromLeft').on(animEndEventName, function(){
      $nextPage.off(animEndEventName);
	    endNextPage = true;
      if(endCurrPage){
		    onEndAnimation($currPage, $nextPage);
	    }
    });
  }
};

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr('class', '');
		$inpage.attr('class', 'current');
	}