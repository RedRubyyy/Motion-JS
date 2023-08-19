var ease = 'ease';
var easeIn = 'ease-in';
var linear = 'linear';
var TRANSLATE_UNIT = 'rem';
var DEFAULT_SETTING = {
    translate : {
        curva : ease,
        motion : 5,
        time : 500,
        delay : 0
    },
    rotate : {
        curva : ease,
        motion : 360,
        time : 500,
        delay : 0
    }
};
function $Motion (element) {
    return new HTMLMotion (element);
};

class HTMLMotion {
    timeOut = 0;
    transform = {
        translateX : 0,
        translateY : 0,
        rotateX : 0,
        rotateY : 0
    };
    rotate_e = 0;
    constructor (element) {
        this.element = document.querySelector(element);
    };
    applySyle () {
        let styleTemplate = ''
        for (const key in this.transform) {
            let unitStyle = 'deg'
            if (key.includes('translate')) {
                unitStyle = TRANSLATE_UNIT;
            };
            styleTemplate += `${key}(${this.transform[key]}${unitStyle})`
        };
        this.element.style.rotate = `${this.rotate_e}deg`;
        this.element.style.transform = styleTemplate;
    };

    motion (curva = 'ease', time = 500 , {
        moveX = this.transform.rotateX,
        moveY = this.transform.rotateY,
        flipX = this.transform.translateX,
        flipY = this.transform.translateY,
        rotate = this.rotate_e
    } ) {
        const time_s = time / 1000 + 's';
        const entries = {
            translateX : moveX,
            translateY : moveY,
            rotateX :flipX,
            rotateY : flipY};

        setTimeout(() => {
             this.element.style.transition = `${curva} ${time_s}`;
        }, this.timeOut);
        this.timeOut +=  20;
        setTimeout(() => {
            for (const key in entries) {
                this.transform[key] = entries[key];
            };
            this.rotate_e = rotate;
            this.applySyle();
        } , this.timeOut);
        this.timeOut += time;
        return this;
    };
};

function prototypeMotionTemplate (object ,
    {curva , motion , time , type , delay} , callback) {
    const time_s = time / 1000 + 's';
    setTimeout ( function () {
        object.element.style.transition = `${curva} ${time_s}`;
    } , object.timeOut)

    object.timeOut += 20;
    object.timeOut += delay;
    setTimeout( function () {
        if (type != 'rotate') {
            object.transform[type] = motion;
        } else {
            object.rotate_e = motion;
        }
        object.applySyle();
        const callbackTimeout = setTimeout(function () {
            callback(object)
        }, time)
        if (!callback) {
            clearTimeout(callbackTimeout); }
        if (!callback && typeof callback != 'boolean') {
            console.error('callback only function or arrow function'); }
    } , object.timeOut);
    object.timeOut += time;
};

HTMLMotion.prototype.moveX = function ({
    curva = 'ease',
    motion = 7,
    time = 500,
    delay = 0
} = DEFAULT_SETTING.translate , callback = false )  {
    const type = 'translateX'
    const dataMotion = { curva , motion , time , type , delay };
    prototypeMotionTemplate(this , dataMotion , callback)
    return this;
};

HTMLMotion.prototype.moveY = function ({
    curva = 'ease', 
    motion = 7, 
    time = 500, 
    delay = 0
} = DEFAULT_SETTING.translate , callback = false ) {
    const type = 'translateY';
    const dataMotion = { curva , motion , time , type , delay };
    prototypeMotionTemplate(this , dataMotion , callback);
    return this;
}

HTMLMotion.prototype.flipX = function ({
    curva = 'ease',
    motion = 360, 
    time = 500,
    delay = 0
} = DEFAULT_SETTING.rotate , callback = false )  {
    const type = 'rotateX';
    const dataMotion = { curva , motion , time , type , delay };
    prototypeMotionTemplate(this , dataMotion , callback);
    return this;
}
HTMLMotion.prototype.flipY = function ({
    curva = 'ease',
    motion = 360, 
    time = 500, 
    delay = 0
} = DEFAULT_SETTING.rotate , callback = false ) {
    const type = 'rotateY';
    const dataMotion = { curva , motion , time , type , delay };
    prototypeMotionTemplate(this , dataMotion , callback);
    return this;
};

HTMLMotion.prototype.rotate = function ({
    curva = 'ease',
    motion = 360, 
    time = 500, 
    delay = 0
} = DEFAULT_SETTING.rotate , callback = false ) {
    const type = 'rotate';
    const dataMotion = { curva , motion , time , type , delay };
    prototypeMotionTemplate(this , dataMotion , callback);
    return this;
};