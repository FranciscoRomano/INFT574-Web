//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Apple from "./core/Apple";
import Snake from "./core/Snake";
import Board from "./core/Board";
import Block from "./core/Block";
import Float2 from "./core/Float2";
import Float3 from "./core/Float3";

//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class SnakeBoard
{
    constructor(parent, cols, rows)
    {
        /** @type { number   } */ this.cols = cols;
        /** @type { number   } */ this.rows = rows;
        /** @type { Board    } */ this.grid = new Board(parent, cols, rows);
        /** @type { Float2   } */ this.o_direction = new Float2(1.0, 0.0);
        /** @type { Float2   } */ this.n_direction = new Float2(1.0, 0.0);

        this.load();
    };

    load() {

        // 
        this.grid.clear();
        Snake.Reset(this);
        Apple.Reset(this);

        // set defaults
        this.o_direction = new Float2(1.0, 0.0);
        this.n_direction = new Float2(1.0, 0.0);

        return this;
    };

    tick() {

        // calculate snake position
        let position = Float2.Add(Snake.position, this.n_direction);

        // check if snake is eating apple
        if (Float2.Equals(position, Apple.position)) {

            // grow snake in direction
            Snake.Grow(this, this.n_direction);

            // spawn new apple on board
            Apple.Spawn(this);
        }
        else {

            // simply move snake
            Snake.Move(this, this.n_direction);
        }

        // return snake status
        return !Snake.IsDead() || Snake.length != this.grid.length;

        // if 

        // // reset snake tail tile
        // this.grid.search(this.snake_tiles[0]).paint();

        // // update-shift snake tiles
        // for (let i = 0; i < this.snake_index; i++)
        //     this.snake_tiles[i] = this.snake_tiles[i + 1].clone();

        // // move snake head by diretion
        // this.snake_tiles[this.snake_index].x += this.n_direction.x;
        // this.snake_tiles[this.snake_index].y += this.n_direction.y;
        // if (this.snake_tiles[this.snake_index].x < 0) this.snake_tiles[this.snake_index].x += this.cols;
        // if (this.snake_tiles[this.snake_index].y < 0) this.snake_tiles[this.snake_index].y += this.rows;
        // if (this.snake_tiles[this.snake_index].x >= this.cols) this.snake_tiles[this.snake_index].x -= this.cols;
        // if (this.snake_tiles[this.snake_index].y >= this.rows) this.snake_tiles[this.snake_index].y -= this.rows;
        // this.grid.search(this.snake_tiles[this.snake_index]).paint(this.snake_color);
        // this.o_direction = this.n_direction.clone();

        // // check if snake is eating an apple
        // if (Float2.Equals(this.snake_tiles[this.snake_index], this.apple_coord)) {
            
        //     // add new snake tile and paint
        //     this.snake_index++;
        //     this.snake_tiles.splice(0, 0, this.snake_tiles[0].clone());
        //     this.grid.search(this.apple_coord).paint(new Float3(0.8, 0.8, 0.4));

        //     while (true && this.snake_tiles.length < this.grid.blocks.length) {

        //         this.apple_coord = Float2.Random();
        //         this.apple_coord.x = Math.round(this.apple_coord.x * (this.cols - 1));
        //         this.apple_coord.y = Math.round(this.apple_coord.y * (this.rows - 1));

        //         let finished = true;

        //         for (let i = 0; finished && i < this.snake_tiles.length; i++)
        //             if (Float2.Equals(this.apple_coord, this.snake_tiles[i]))
        //                 finished = false;

        //         if (finished) {
        //             this.grid.search(this.apple_coord).paint(this.apple_color);
        //             break;
        //         }
        //     }
        // };

        // // check if snake is colliding with itself
        // let collision = false;
        // for (let i = 0; !collision && i < this.snake_index; i++)
        //     if (Float2.Equals(this.snake_tiles[this.snake_index], this.snake_tiles[i]))
        //         collision = true;

        // return !collision;
    };
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//