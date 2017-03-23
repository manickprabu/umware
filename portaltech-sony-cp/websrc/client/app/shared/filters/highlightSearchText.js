angular.module('conceptProposal').filter('highlightSearchText',function($sce){
    return function(text, phrase) {
          if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
            '<span class="highlight">$1</span>');
          return $sce.trustAsHtml(text)
        }
})
