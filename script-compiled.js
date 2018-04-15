'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, display));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.setState({
                running: false,
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: 'format',
        value: function format(times) {
            return this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var miliseconds = this.state.times.miliseconds;
            var seconds = this.state.times.seconds;
            var minutes = this.state.times.minutes;

            miliseconds += 1;
            if (miliseconds >= 100) {
                seconds += 1;
                miliseconds = 0;
            };
            if (seconds >= 60) {
                minutes += 1;
                seconds = 0;
            };

            this.setState({
                times: {
                    minutes: minutes,
                    seconds: seconds,
                    miliseconds: miliseconds
                }
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.state.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: 'resetStoper',
        value: function resetStoper() {
            this.stop();
            this.reset();
        }
    }, {
        key: 'addResult',
        value: function addResult() {
            var element = document.createElement('li');
            element.innerHTML = this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(Math.floor(this.state.times.miliseconds));
            document.querySelector('.results').appendChild(element);
        }
    }, {
        key: 'clearResults',
        value: function clearResults() {
            var list = document.querySelector('.results').querySelectorAll('li');
            var listArr = Array.from(list);

            listArr.forEach(function (el) {
                document.querySelector('.results').removeChild(el);
            });
        }
    }, {
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement('div', { className: 'container' }, React.createElement('nav', { className: 'controls' }, React.createElement('a', { href: '#', className: 'button', id: 'start', onClick: function onClick() {
                    return _this3.start();
                } }, 'Start'), React.createElement('a', { href: '#', className: 'button', id: 'stop', onClick: function onClick() {
                    return _this3.stop();
                } }, 'Stop'), React.createElement('a', { href: '#', className: 'button', id: 'reset', onClick: function onClick() {
                    return _this3.reset();
                } }, 'Reset')), React.createElement('div', { className: 'stopwatch' }, this.format()), React.createElement('div', { className: 'btnsh' }, React.createElement('a', { href: '#', className: 'button2', id: 'res', onClick: function onClick() {
                    return _this3.addResult();
                } }, 'Result'), React.createElement('a', { href: '#', className: 'button2', id: 'clear', onClick: function onClick() {
                    return _this3.clearResults();
                } }, 'Clear Results')), React.createElement('ul', { className: 'results' }));

            /*
            <div className={'container'}>
                <nav className={'controls'}>
                    <a href={'#'} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
                    <a href={'#'} className={'button'} id={'stop'}>Stop</a>
                    <a href={'#'} className={'button'} id={'reset'}>Reset</a>
                </nav>
                <div className={'stopwatch'}></div>
                <div className={'btns'}>
                    <a href={'#'} className={'button2'} id={'res'}>Result</a>
                    <a href={'#'} className={'button2'} id={'clear'}>Clear Results</a>
                </div>
                <ul className={'results'}></ul>
            </div>
            */
        }
    }]);

    return Stopwatch;
}(React.Component);

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
