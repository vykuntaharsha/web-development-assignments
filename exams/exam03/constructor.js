module.exports = function (props){
    this.word = props;
    this.getWord = function () {
        return this.word;
    };
}
