//some comment
(function() {
  $.ajax(function() {
    define('nested-level-define', ['a'], function(a) {
      console.log(a);
    });
  });
});
