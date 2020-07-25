//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

import './Block.css'
import Float2 from './Float2'
import Color3 from './Color3'

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Block object
export default class Block
{
    constructor(parent, x, y)
    {
        // public variables
        this.color = Color3.Random(0.1, 0.3);
        this.target = parent.appendChild(document.createElement("div"));
        this.target.id = "INFT574-block";

        // get padding & margin data
        let style1 = getComputedStyle(parent);
        let pad = new Float2(
            parseFloat(style1.paddingLeft.split("px")[0]),
            parseFloat(style1.paddingTop.split("px")[0])
        );
        let style2 = getComputedStyle(this.target);
        let mar = new Float2(
            parseFloat(style2.marginLeft.split("px")[0]),
            parseFloat(style2.marginTop.split("px")[0])
        );

        // set html element properties
        this.target.style.top = (y * Block.DEFAULT_HEIGHT) + pad.y + 'px';
        this.target.style.left = (x * Block.DEFAULT_WIDTH) + pad.x + 'px';
        this.target.style.width = (Block.DEFAULT_WIDTH - mar.x * 2) + 'px';
        this.target.style.height = (Block.DEFAULT_HEIGHT - mar.y * 2) + 'px';
        this.target.style.backgroundColor = this.color.css;
    };

    clear()
    {
        // re-paint block element
        return this.paint(this.color, "");
    };

    paint(color, tag)
    {
        // set class & color
        this.target.className = tag;
        this.target.style.backgroundColor = color.css;

        return this;
    };
};

// Block static variables
Block.DEFAULT_WIDTH = 32;
Block.DEFAULT_HEIGHT = 32;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//