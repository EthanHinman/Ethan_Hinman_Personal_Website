
class GameBoard{
    constructor(){
        //
        // FIRST INDEX IS where it is in the row and the second is what row it is in.
        //
        this.SnakeBody =  [];
        this.BoardArray = [];
        this.GameRunning = true;
        this.head = [6,6];
        this.tail = [6,6];
        if(this.BoardArray[Math.floor((Math.random() * 13) + 1)])
        this.isFood = [];
        this.direction = 'N';
        
        // direction to figure out how the snake should move. I use a compass N,E,S,W to figure out the direction.
        // the snake starts out moving north.
        
        // constructs 14 rows all false for if there is a snake there.
        var i;
        for(i = 0; i < 14; i++){
            var row_array = [false,false,false,false,false,false,false,false,false,false,false,false,false,false];
            this.BoardArray.push(row_array);
        }
        // says there is a snake there.
        this.BoardArray[6][6] = true;
        this.BoardArray[6][7] = true;
        // pushes head into beginning of array.
        this.SnakeBody.push([6,6]);
        this.SnakeBody.push([6,7]);
    }

    drawSnake(){
        var canvas = document.getElementById("Board");
        const width = canvas.width = 455;
        const height = canvas.height = 455;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(43, 21, 91)';
        ctx.fillRect(this.isFood[0]*33,this.isFood[1]*33, 22.5, 22.5);
        
        var i;
        ctx.fillStyle = 'rgb(255, 0, 0)';
        for(i = 1; i < this.SnakeBody.length ; ++i){

                ctx.fillRect(this.SnakeBody[i][0]*32.5,this.SnakeBody[i][1]*32.5, 33, 33);
        }
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(this.SnakeBody[0][0]*32.5,this.SnakeBody[0][1]*32.5, 33, 33);
    }

    // need to fix out of range indexing
    moveSnake(){
        var old_head = this.head;
        if(this.direction == 'N'){
            if(this.head[1]-1 < 0){
                this.GameRunning = false;
                alert("You lost and ran out of bounds");
            }
            else if(this.BoardArray[this.head[0]][this.head[1]-1]){
                this.GameRunning = false;
                alert("You lost because you hit yourself");}
            else{
                this.SnakeBody.unshift([this.head[0],this.head[1]-1])
                this.head[1] = this.head[1]-1;
                //alert("hey we made it");
            }
            
        }
        else if(this.direction == 'E'){
            if(this.head[0]+1 > 13){
                this.GameRunning = false;
                alert("You lost and ran out of bounds");
            }
            else if(this.BoardArray[this.head[0]+1][this.head[1]]){
                this.GameRunning = false;
                alert("You lost because you hit yourself");
            }
            else{
                this.SnakeBody.unshift([this.head[0]+1,this.head[1]])
                this.head[0] = this.head[0]+1;
            }
        }
        else if(this.direction == 'S'){
            if(this.head[1]+1 > 13){
                this.GameRunning = false;
                alert("You lost and ran out of bounds");
                
            }
            else if(this.BoardArray[this.head[0]][this.head[1]+1]){
                this.GameRunning = false;
                alert("You lost because you hit yourself");
            }
            else{
                this.SnakeBody.unshift([this.head[0],this.head[1]+1])
                this.head[1] = this.head[1]+1;
            }
        }
        // direction would be west
        else{
            if(this.head[0]-1 <0){
                this.GameRunning = false;
                alert("You lost and ran out of bounds");

            }
            else if(this.BoardArray[this.head[0]-1][this.head[1]]){
                this.GameRunning = false;
                alert("You lost because you hit yourself");
            }
            else{
                this.SnakeBody.unshift([this.head[0]-1,this.head[1]])
                this.head[0] = this.head[0]-1;
            }
        }
        
        this.BoardArray[this.head[0]][this.head[1]] = true;
        this.BoardArray[this.tail[0]][this.tail[1]] = false;
        
        this.tail = this.SnakeBody[this.SnakeBody.length-1];
        
        this.SnakeBody.pop();
    }
    checkFood(){
        if(this.head[0] == this.isFood[0] && this.head[1] == this.isFood[1]){
            this.growSnake();
            this.drawSnake();
            
            this.generateFood();
        }
    }

    generateFood(){
        var x = Math.floor((Math.random() * 13) + 1);
        var y = Math.floor((Math.random() * 13) + 1);
        if(!this.BoardArray[y][x]){
            this.isFood = [y,x];
        }
        else{
            this.generateFood();
        }
    }

    growSnake(){
        
        
        
        this.SnakeBody.push([this.tail[0],this.tail[1]]);
        this.tail[1] =this.tail[1] +1;
    }
    loop(){
        MainBoard.moveSnake();
        MainBoard.checkFood();
        MainBoard.drawSnake(); 
    }
    shiftSnake(old_head){
        var i;
        var second_holder_value;
        for(i = 1; i < this.SnakeBody.length; ++i){
            second_holder_value =this.SnakeBody[i];
            this.SnakeBody =old_head;
            old_head = second_holder_value;
        }

    }
}









function main(){
    
    MainBoard = new GameBoard();
    MainBoard.generateFood();
    MainBoard.drawSnake();
    
    window.addEventListener("keyup", function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
      
        switch (event.key) {
          case "ArrowDown":
            // code for "down arrow" key press.
            if(MainBoard.direction == 'N'){
    
            }
            else
            {
                MainBoard.direction = 'S';
                //MainBoard.loop();
            }
            break;
          case "ArrowUp":
            // code for "up arrow" key press.
            if(MainBoard.direction == 'S'){
    
            }
            else
            {
                MainBoard.direction = 'N';
                //MainBoard.loop();
            }
            break;
          case "ArrowLeft":
            // code for "left arrow" key press.
            if(MainBoard.direction == 'E'){
    
            }
            else
            {
                MainBoard.direction = 'W';
                //MainBoard.loop(); 
            }
            break;
            
          case "ArrowRight":
            // code for "right arrow" key press.
            if(MainBoard.direction == 'W'){
    
            }
            else
            {
                MainBoard.direction = 'E';
                //MainBoard.loop();
                
            }
        
            break;
    
            
          default:
            return; // Quit when this doesn't handle the key event.
        }loop();
      // Cancel the default action to avoid it being handled twice
        event.preventDefault();}, true);
        setInterval(MainBoard.loop,250);
    }
    






