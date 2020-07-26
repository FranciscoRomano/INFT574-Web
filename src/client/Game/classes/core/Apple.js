//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import './Apple.css'
import Snake from './Snake';
import Color3 from './Color3';
import Float2 from './Float2';
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class Apple
{
    constructor()
    {
        // public variables
        this.tag = "apple";
        this.color = new Color3(1.0, 0.2, 0.5);
        this.position = new Float2(0, 0);
    };

    Spawn(board)
    {
        while (true) {

            // generate new position
            this.position.x = Math.round(Math.random() * (board.width - 1));
            this.position.y = Math.round(Math.random() * (board.height - 1));

            // check if valid position
            if (Snake.IsValid(this.position)) break;
        }

        // paint new apple position on board
        board.paintAt(this.position, this.color, this.tag);

        return this;
    };

    Reset(board)
    {
        // set apple position in the corner
        this.position.x = board.width - 2;
        this.position.y = board.height - 2;

        // paint new apple on board
        board.paintAt(this.position, this.color, this.tag);

        return this;
    };
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new Apple();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//