class Logger {
    constructor() {

    }

    /**
     * This function is log text without affect to the line of file is logging
     */
    log = function () {
        return Function.prototype.bind.call(console.log, console, '%c Log: ', 'background: gray; color: #fff');
    }();

    debug = function () {
        return Function.prototype.bind.call(console.log, console, '%c Debug: ', 'background: gray; color: #fff');
    }();


    info = function () {
        return Function.prototype.bind.call(console.log, console, '%c Info: ', 'background: green; color: #fff');
    }();

    warn = function () {
        return Function.prototype.bind.call(console.log, console, '%c Warn: ', 'background: yellow; color: #000');
    }();

    error = function () {
        return Function.prototype.bind.call(console.log, console, '%c Error: ', 'background: red; color: #fff');
    }();

}
export const logger = new Logger();
