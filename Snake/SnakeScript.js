

class GameBoard{
    constructor(){
        //
        // FIRST INDEX IS where it is in the row and the second is what row it is in.
        //
        this.SnakeBody =  [];
        this.BoardArray = [];
        this.GameRunning = true;
        this.head = [6,6];
        this.tail = [6,8];
        this.gameFrameUpdate;
        if(this.BoardArray[Math.floor((Math.random() * 13) + 1)])
        this.isFood = [];
        this.direction = 'N';
        this.length = 3;
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
        this.BoardArray[6][8] = true;
        // pushes head into beginning of array.
        this.SnakeBody.push([6,6]);
        this.SnakeBody.push([6,7]);
        this.SnakeBody.push([6,8]);
     
    
    }

    drawSnake(){
        var canvas = document.getElementById("Board");
        const width = canvas.width = 455;
        const height = canvas.height = 455;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(43, 21, 91)';
        ctx.fillRect(this.isFood[0]*32.5,this.isFood[1]*32.5, 32.5, 32.5);
        
        var i;
        ctx.fillStyle = 'rgb(255, 0, 0)';
        for(i = 1; i < this.SnakeBody.length ; ++i){

                ctx.fillRect(this.SnakeBody[i][0]*32.5,this.SnakeBody[i][1]*32.5, 33, 33);
        }
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(this.SnakeBody[0][0]*32.5,this.SnakeBody[0][1]*32.5, 33, 33);
        document.getElementById("Length").innerHTML = "Your Length: " + this.length;
    }

    // need to fix out of range indexing
    moveSnake(){
        if(this.GameRunning){
        //var old_head = this.head;
        this.BoardArray[this.tail[0]][this.tail[1]] = false;
        if(this.direction == 'N'){
            if(this.head[1]-1 < 0){
                this.GameRunning = false;
               
                return false;
            }
            else if(this.BoardArray[this.head[0]][this.head[1]-1]){
                this.GameRunning = false;
            
                return false;
            }
            else{
                this.SnakeBody.unshift([this.head[0],this.head[1]-1])
                this.head[1] = this.head[1]-1;
                this.tail = this.SnakeBody[this.SnakeBody.length-1];
                this.SnakeBody.pop();
                
            }
            
        }
        else if(this.direction == 'E'){
            if(this.head[0]+1 > 13){
                this.GameRunning = false;
                return false;
            }
            else if(this.BoardArray[this.head[0]+1][this.head[1]]){
                this.GameRunning = false;
             
                return false;
            }
            else{
                this.SnakeBody.unshift([this.head[0]+1,this.head[1]])
                this.head[0] = this.head[0]+1;
                this.tail = this.SnakeBody[this.SnakeBody.length-1];
                this.SnakeBody.pop();
                
            }
        }
        else if(this.direction == 'S'){
            if(this.head[1]+1 > 13){
                this.GameRunning = false;
                
                return false;
                
            }
            else if(this.BoardArray[this.head[0]][this.head[1]+1]){
                this.GameRunning = false;
               
                return false;
            }
            else{
                this.SnakeBody.unshift([this.head[0],this.head[1]+1])
                this.head[1] = this.head[1]+1;
                this.tail = this.SnakeBody[this.SnakeBody.length-1];
                this.SnakeBody.pop();
                
            }
        }
        // direction would be west
        else{
            if(this.head[0]-1 <0){
                this.GameRunning = false;
                
                return false;

            }
            else if(this.BoardArray[this.head[0]-1][this.head[1]]){
                this.GameRunning = false;
                
                return false;
               
            }
            else{
                this.SnakeBody.unshift([this.head[0]-1,this.head[1]])
                this.head[0] = this.head[0]-1;
                this.BoardArray[this.head[0]][this.head[1]] = true;
                
                this.tail = this.SnakeBody[this.SnakeBody.length-1];
                this.SnakeBody.pop();
                
                
            }
    
        }

        this.BoardArray[this.head[0]][this.head[1]] = true;
        this.BoardArray[this.tail[0]][this.tail[1]] = true;
        return true;
    }
    else{
        window.location.reload(true);
        }
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
        this.BoardArray[this.tail[0]][this.tail[1]] = true;
        this.length++;
        var audio = new Audio('Eat.mp3');
        audio.play();
    }

    loop(){
        
        var Game_is_running = MainBoard.moveSnake();
        if(Game_is_running){
            MainBoard.checkFood();
            MainBoard.drawSnake(); 
        }
        else{
         window.location.reload(true);
        }
        
            
        
    
    }
    
}









function main(){
    
    MainBoard = new GameBoard();
    var myAudio = new Audio('theme.mp3'); 
    myAudio.volume = 0.4;
    myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();}, false);
    myAudio.play();
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
                
                
            }
        
            break;
    
            
          default:
            return; // Quit when this doesn't handle the key event.
        } 
      // Cancel the default action to avoid it being handled twice
        event.preventDefault();}, true);
        setInterval(MainBoard.loop,250);
        
    }
    document.getElementById("Start").onclick = function () { main() };




