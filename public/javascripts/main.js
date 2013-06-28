(function(){
  var input = $$('.input')[0]
    , output = $$('.output')[0]
    , statistics = {
      words: $$('.statistics .words')[0],
      percent: $$('.statistics .percent')[0]
    };
  // Event listener.
  input.addEvent('keyup',function(){
    // Nurbling request.
    var nurble_req = new Request({
      url:'/request',
      data:{
        q:input.value
      },
      onSuccess:function(res){
        // Set nurbling output.
        output.set('text',res);

        // Compute statistics.
        var words = output.get('text').split(' ')
          , nurbled = 0;
        for(var i = 0; i < words.length; i++){
          if(words[i].indexOf('nurble') > -1){
            nurbled++;
          }
        }

        // Set statistics.
        statistics.words.set('text', nurbled + ' ');
        statistics.percent.set('text', Math.round(nurbled / words.length * 100) + '% ');
      }
    });
    nurble_req.send();
    // Dynamic textarea.
    input.setStyle('height', 'auto');
    input.setStyle('height', input.scrollHeight + 'px');
  });
})();