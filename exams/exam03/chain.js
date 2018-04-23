module.exports = {
    val : 0,

    one : function () {
        this.val += 1;
        return this;
    },

    two : function () {
        this.val += 2;
        return this;
    },

    result : function () {
        const currentVal = this.val;
        this.val = 0;
        return currentVal;
    }
}
