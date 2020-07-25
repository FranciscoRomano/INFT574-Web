//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Apple from "./core/Apple";
import Board from "./core/Board";
import Snake from "./core/Snake";
import Float2 from "./core/Float2";
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class SnakeManager {

    constructor()
    {
        // public variables
        this.score = 0;
        this.board = null;
        this.moves = [ new Float2(0, 0) ];
    };

    Reset()
    {
        // clear board
        this.board.clear();

        // reset snake & apple
        Snake.Reset(this.board);
        Apple.Reset(this.board);
        
        // update default variables
        this.score = 0;
        this.moves = [ new Float2(1, 0) ];

        return this;
    };

    Update()
    {
        // update current direction from move registry
        if (this.moves.length > 1) this.moves[0] = this.moves.splice(1, 1)[0];

        // calculate snake position with direction
        let position = Float2.Add(Snake.position, this.direction);
        if (position.x >= this.board.width) position.x = 0;
        if (position.y >= this.board.height) position.y = 0;
        if (position.x < 0) position.x = this.board.width - 1;
        if (position.y < 0) position.y = this.board.height - 1;
        
        // check if snake is eating apple
        if (Float2.Equals(position, Apple.position)) {

            // grow snake in direction
            Snake.Grow(this.board, this.direction);

            // update to score value
            this.score += 100;
            
            // spawn apple on board
            Apple.Spawn(this.board);
        }
        else {

            // simply move snake
            Snake.Move(this.board, this.direction);
        }

        return this;
    };

    Initiate(parent, width, height)
    {
        // create new board
        this.board = new Board(parent, width, height);

        return this;
    };

    IsGameOver()
    {
        // check if game is over
        return Snake.IsDead() || !(Snake.length < this.board.length);
    };

    IsSnakeDead()
    {
        // check snake status
        return Snake.IsDead();
    };

    OnKeyDownEvent(e)
    {
        // calculate direction by key
        let direction = null
        if ((e.keyCode == 87 || e.keyCode == 38)) direction = new Float2( 0,-1);
        if ((e.keyCode == 83 || e.keyCode == 40)) direction = new Float2( 0, 1);
        if ((e.keyCode == 65 || e.keyCode == 37)) direction = new Float2(-1, 0);
        if ((e.keyCode == 68 || e.keyCode == 39)) direction = new Float2( 1, 0);

        // check if direction if valid
        if (direction && Float2.Dot(this.moves[1] || this.direction, direction) >= 0.0) {

            // check if moves are at the limit
            if (this.moves.length < 3) {

                // add new direction to snake moves
                this.moves.push(direction);
            }
            else this.moves.splice(1, 1, direction);
        }

        return this;
    };

};

Object.defineProperties(SnakeManager.prototype, {
    "direction": { get() { return this.moves[0]; }, set(v) { this.moves[0] = v; } },
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new SnakeManager;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//