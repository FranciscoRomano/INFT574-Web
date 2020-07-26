//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class Events
{
    constructor()
    {
        this.methods = [];
    };

    // release event(s)
    Release(args = {})
    {
        let keys = Object.keys(args);
        for (let i = 0; i < this.methods.length; i++) {
            let done = 1, json = this.methods[i];
            keys.forEach(k => done &= json[k] === args[k]);
            if (done) this.methods.splice(i--, 1)[0].release();
        }
        return this;
    };

    // add event timeout
    Timeout(method, timeout = 0)
    {
        this.methods.push({
            "handle": window.setTimeout(method, timeout),
            "method": method,
            "timeout": timeout,
            "release": function () { window.clearTimeout(this.handle) },
        });
        return this;
    };

    // add event interval
    Interval(method, timeout = 0)
    {
        this.methods.push({
            "handle": window.setInterval(method, timeout),
            "method": method,
            "timeout": timeout,
            "release": function () { window.clearInterval(this.handle) },
        });
        return this;
    };

    // add event listener
    Listener(target, type, method, options = false)
    {
        this.methods.push({
            "type": type,
            "handle": target.addEventListener(type, method, options),
            "method": method,
            "target": target,
            "options": options,
            "release": function() { target.removeEventListener(type, method, options) },
        });
        return this;
    };
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new Events();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//