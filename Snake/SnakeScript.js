
// this initializes the game and will be used in the main function.
// it takes the main game as a param and the snake.
// it always starts the snake in the middle
function initialize_game(game_board,snake){
    for(i = 0;i < 195; i++){
        game_board[i] = false;
        if(i == 97|| i == 98){
            game_board[i] == true;
        }
    }
    snake[0]= 97;
    snake[1] = 98;
}

function main(){
    var game_board = [];
    var snake_body = [];
    game_over = false;
    initialize_game(game_board,snake_body);
}