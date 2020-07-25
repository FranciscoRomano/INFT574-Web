//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class Float2 extends Float32Array
{
    constructor(x, y) { super([ x, y ]); };
    
    clone() { return new Float2(this.x, this.y); };
};

Float2.Dot = function(lhs, rhs) { return lhs.x * rhs.x + lhs.y * rhs.y; };
Float2.Add = function(lhs, rhs) { return new Float2(lhs.x + rhs.x, lhs.y + rhs.y); };
Float2.Sub = function(lhs, rhs) { return new Float2(lhs.x - rhs.x, lhs.y - rhs.y); };
Float2.Mul = function(lhs, rhs) { return new Float2(lhs.x * rhs.x, lhs.y * rhs.y); };
Float2.Div = function(lhs, rhs) { return new Float2(lhs.x / rhs.x, lhs.y / rhs.y); };

Float2.Equals = function(lhs, rhs) {
    return lhs.x === rhs.x && lhs.y === rhs.y;
};

Float2.Random = function(min = 0, max = 1) {
    return new Float2(
        Math.random() * (max - min) + min,
        Math.random() * (max - min) + min
    );
};

// Float2 Object Getters & Setters
Object.defineProperties(Float2.prototype, {

    // Color values
    "r": { get() { return this[0]; }, set(v) { return this[0] = v; } },
    "g": { get() { return this[1]; }, set(v) { return this[1] = v; } },

    // Position values
    "x": { get() { return this[0]; }, set(v) { return this[0] = v; } },
    "y": { get() { return this[1]; }, set(v) { return this[1] = v; } },
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//