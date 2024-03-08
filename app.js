let num = Math.floor(Math.random() * 11);

console.log(num)

let hint = $('#hint')
hint.text('Game Started');

let no_guesses = 10;

$("#inputfield").on('keypress', function (e) {
  
  if (e.which === 13) {
    takeGuess();
   }
});

$("#inputbtn").on('click', function () {
  takeGuess()
});

function takeGuess() {
  if(isNaN($('#inputfield').val())) {
    hint.text('Guess should be number');
    return;
  } 

  $(document.body).removeClass('large')
  $(document.body).removeClass('small')
  
  if(no_guesses <= 0){
    $('#num').text(num);
    hint.text('Game Over');
    return;
  }
  console.log($('#inputfield').val());
  
  let numval = $('#inputfield').val()

  if (numval == num) {
    $('#num').text(num);
    hint.text('You guessed right');
    no_guesses = 0
  } else if (numval > num) {
    hint.text('Try Smaller Number');
    $(document.body).addClass('large')
    no_guesses -= 1 
  } else if (numval < num) {
    hint.text('Try Larger Number');
    no_guesses -= 1 
    $(document.body).addClass('small')
  } 
  $('#inputfield').val("")
  $('#gleft').text(no_guesses);
}