class Stopwatch extends React.Component {
    constructor(display) {
        super(display);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        };
    }

    reset() {
        this.setState({
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });

    }

    format(times) {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState ({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }


     calculate() { 
        let miliseconds = this.state.times.miliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;

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
                 minutes,
                 seconds,
                 miliseconds
             }
         })
    }
    
    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }

    resetStoper() {
        this.stop();
        this.reset();
    }

    addResult() {
        let element = document.createElement('li');
        element.innerHTML = `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
        document.querySelector('.results').appendChild(element);
    }

    clearResults() {
        const list = document.querySelector('.results').querySelectorAll('li');
        var listArr = Array.from(list);

        listArr.forEach(function (el) {
            document.querySelector('.results').removeChild(el);
        });
    }
    
    
    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
    
    render() {
        
        return React.createElement('div', {className: 'container'},
                    React.createElement('nav', {className: 'controls'},
                        React.createElement('a', {href: '#', className: 'button', id: 'start', onClick: () => this.start()}, 'Start'),
                        React.createElement('a', {href: '#', className: 'button', id: 'stop', onClick: () => this.stop()}, 'Stop'), 
                        React.createElement('a', {href: '#', className: 'button', id: 'reset', onClick: () => this.reset()}, 'Reset'), 
                        ), 
                    React.createElement('div', {className: 'stopwatch'}, this.format()),
                    React.createElement('div', {className: 'btnsh'}, 
                        React.createElement('a', {href: '#', className: 'button2', id: 'res', onClick: () => this.addResult()}, 'Result'),                
                        React.createElement('a', {href: '#', className: 'button2', id: 'clear', onClick: () => this.clearResults()}, 'Clear Results')),
                     React.createElement('ul', {className: 'results'}, ))
        
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
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
    







