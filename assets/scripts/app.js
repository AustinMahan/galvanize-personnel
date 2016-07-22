// Your code here!
$(document).ready(function() {
  $.ajax({
    url:'https://galvanize-student-apis.herokuapp.com/gpersonnel/roles',
    method: "GET"
  }).done(function (data){
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $('#roleSelect').append('<option value="' + data[i].title + '">' + data[i].title + '</option>')
    }
    $('select').change(function(){
      data.forEach(function(role){
        if (role.title == $('#roleSelect').val()) {
          $('img').attr('src', role.img);
        };
      });
    });
  });




  $('button').click(function() {
    if ($('#fName').val().length !== 0 && $('#lName').val().length !== 0 ) {
      var fName = $('#fName').val()
      var lName = $('#lName').val()
      var role = $('#roleSelect').val()
      $.ajax({
        url:'http://galvanize-student-apis.herokuapp.com/gpersonnel/users',
        method: 'POST',
        data: { firstName: fName, lastName: lName, role: role },
        success: function(suc){
          $('.success').append(suc.message);
          $('.success').fadeIn()
          setTimeout(function(){
            $('.success').fadeOut()
          }, 2000);
        },
        error: function(err){
          $('.save-status').append(err.responseJSON.message);
          $('.save-status').fadeIn()
          setTimeout(function(){
            $('.save-status').fadeOut()
          }, 2000);
        // console.log(err.responseText.slice(err.responseText.indexOf(':')+2, err.responseText.lastIndexOf('"')));
        }
      })
    }
  })

})
