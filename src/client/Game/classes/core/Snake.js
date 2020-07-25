//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import './Snake.css'
import Block from './Block';
import Color3 from './Color3';
import Float2 from './Float2';
import Apple from './Apple';
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class Snake
{
    constructor()
    {
        // public variables
        this.tag = "snake";
        this.color1 = new Color3(0.2, 0.8, 0.4);
        this.color2 = new Color3(0.8, 0.8, 0.4);
        this.chunks = [];
    };

    Grow(board, direction)
    {    
        // calculate new position
        let position = Float2.Add(this.head, direction);
        if (position.x >= board.width) position.x = 0;
        if (position.y >= board.height) position.y = 0;
        if (position.x < 0) position.x = board.width - 1;
        if (position.y < 0) position.y = board.height - 1;

        // add position to chunks
        this.chunks.push(position);
        board.paintAt(position, this.color2, this.tag);

        return this;
    }

    Move(board, direction)
    {
        // calculate new position
        let position = Float2.Add(this.head, direction);
        if (position.x >= board.width) position.x = 0;
        if (position.y >= board.height) position.y = 0;
        if (position.x < 0) position.x = board.width - 1;
        if (position.y < 0) position.y = board.height - 1;

        if (this.IsValid(position)) {

            // add position to chunks
            this.chunks.push(position);
            board.paintAt(position, this.color1, this.tag);

            // clear previous tail
            board.clearAt(this.chunks.splice(0, 1)[0]);
        }
        else this.chunks.push(position);


        return this;
    }

    Reset(board)
    {
        // reset variables
        this.chunks = [
            new Float2(1, 1),
            new Float2(2, 1),
            new Float2(3, 1),
        ];

        // paint snake chunks
        board.paintAt(this.chunks[0], this.color1, this.tag);
        board.paintAt(this.chunks[1], this.color1, this.tag);
        board.paintAt(this.chunks[2], this.color1, this.tag);

        return this;
    };

    IsDead()
    {
        // iterate through chunks (ignore head)
        for (let i = 0; i < this.index; i++)
            // check if head is colliding with itself
            if (Float2.Equals(this.head, this.chunks[i]))
                return true;

        return false;
    };

    IsValid(position)
    {
        // iterate through all chunks
        for (let i = 0; i < this.length; i++)
            // check if point is colliding
            if (Float2.Equals(position, this.chunks[i]))
                return false;
                
        return true;
    };
};

Object.defineProperties(Snake.prototype, {
    "tail": { get() { return this.chunks[0]; } },
    "head": { get() { return this.chunks[this.index]; } },
    "index": { get() { return this.chunks.length - 1; } },
    "length": { get() { return this.chunks.length; } },
    "position": { get() { return this.chunks[this.index]; } },
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new Snake();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//