//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import './Board.css'
import Block from './Block'
import Float2 from './Float2'

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Board object
export default class Board
{
    constructor(parent, cols, rows)
    {
        // public variables
        this.cols = cols;
        this.rows = rows;
        this.blocks = [];
        this.target = parent.appendChild(document.createElement("div"));
        this.target.id = "INFT574-board";

        // create block array
        for (let y = 0; y < rows; y++)
            for (let x = 0; x < cols; x++)
                this.blocks.push(new Block(this.target, x, y));
        
        // set html element properties
        this.target.style.width = ((Block.DEFAULT_WIDTH * cols)) + 'px';
        this.target.style.height = ((Block.DEFAULT_HEIGHT * rows)) + 'px';
    };

    clear()
    {
        // clear all blocks
        this.blocks.forEach(block => block.clear());

        return this;
    };

    clearAt(position)
    {
        // clear block at position
        let index = position.y * this.cols + position.x;
        this.blocks[index].clear();

        return this;
    };

    paintAt(position, color, tag)
    {
        // paint block at position
        let index = position.y * this.cols + position.x;
        this.blocks[index].paint(color, tag);

        return this;
    };

};

// Board static variables
Board.ID_TAGS = [ "graphics-board-default" ];

Object.defineProperties(Board.prototype, {
    "width": { get() { return this.cols; } },
    "height": { get() { return this.rows; } },
    "length": { get() { return this.blocks.length; } },
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//