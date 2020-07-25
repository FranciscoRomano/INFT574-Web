//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export default class Color3 extends Float32Array
{
    constructor(r, g, b) { super([ r, g, b ]); };

    clone() { return new Color3(this.r, this.g, this.b); };
};

Color3.Equals = function(lhs, rhs) {
    return lhs.x === rhs.x && lhs.y === rhs.y && lhs.z === rhs.z;
};

Color3.Random = function(min = 0, max = 1) {
    return new Color3(
        Math.random() * (max - min) + min,
        Math.random() * (max - min) + min,
        Math.random() * (max - min) + min
    );
};

// Color3 Object Getters & Setters
Object.defineProperties(Color3.prototype, {
    "r": { get() { return this[0]; }, set(v) { return this[0] = v; } },
    "g": { get() { return this[1]; }, set(v) { return this[1] = v; } },
    "b": { get() { return this[2]; }, set(v) { return this[2] = v; } },
    "css": { get() {
            let r = Math.round(this.r * 255.0);
            let g = Math.round(this.g * 255.0);
            let b = Math.round(this.b * 255.0);
            return "rgb(" + r + ", " + g + ", " + b + ")";
    } },
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//