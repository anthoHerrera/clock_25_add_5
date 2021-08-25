import React from "react";
import Counter from "./Counter";
import Title from "./Title";
import Session from "./Session";
import Buttons from "./Buttons";

import "./App.scss";

const accurateInterval = function (fn: any, time: any) {
    var cancel: any, nextAt: any, timeout: any, wrapper: any;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        return fn();
    };
    cancel = function () {
        return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
        cancel: cancel,
    };
};

type AppProps = {};

type AppState = {
    break: number;
    session: number;
    timer: number;
    timeState: string;
    timerType: string;
    intervalID: any;
    alarmColor: object;
};

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            break: 5,
            session: 25,
            timer: 1500,
            timeState: "stopped",
            timerType: "Session",
            intervalID: "",
            alarmColor: { color: "#2c3e50" },
        };
        this.reset = this.reset.bind(this);
        this.clockDisplay = this.clockDisplay.bind(this);
        this.breakControl = this.breakControl.bind(this);
        this.sessionControl = this.sessionControl.bind(this);
        this.timerControl = this.timerControl.bind(this);
        this.countDown = this.countDown.bind(this);
        this.countDownControl = this.countDownControl.bind(this);
        this.switchTimer = this.switchTimer.bind(this);
        this.alarmActivate = this.alarmActivate.bind(this);
        this.warningTimer = this.warningTimer.bind(this);
        this.checkTimer = this.checkTimer.bind(this);
    }

    audioBeep: any = "";

    reset = (): void => {
        this.setState({
            break: 5,
            session: 25,
            timer: 1500,
            timeState: "stopped",
            timerType: "Session",
            alarmColor: { color: "#2c3e50" },
        });
        if (this.state.intervalID) {
            this.state.intervalID.cancel();
        }
    };

    timerControl = (
        sign: string,
        currentValue: number,
        timerType: string
    ): void => {
        if (this.state.timeState === "running") return;
        if (this.state.timerType === timerType) {
            if (sign === "-" && currentValue !== 1) {
                this.setState({
                    session: currentValue - 1,
                    timer: currentValue * 60 - 60,
                });
            } else if (sign === "+" && currentValue !== 60) {
                this.setState({
                    session: currentValue + 1,
                    timer: currentValue * 60 + 60,
                });
            }
        } else {
            if (sign === "-" && currentValue !== 1) {
                this.setState({
                    break: currentValue - 1,
                });
            } else if (sign === "+" && currentValue !== 60) {
                this.setState({
                    break: currentValue + 1,
                });
            }
        }
    };

    breakControl = (e: any) => {
        this.timerControl(e.currentTarget.value, this.state.break, "break");
    };
    sessionControl = (e: any) => {
        this.timerControl(e.currentTarget.value, this.state.session, "Session");
    };

    clockDisplay = (): string => {
        let minutes: any = Math.floor(this.state.timer / 60);
        let seconds: any = this.state.timer - minutes * 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return minutes + ":" + seconds;
    };

    countDown = (): void => {
        this.setState({
            intervalID: accurateInterval(() => {
                this.setState({
                    timer: this.state.timer - 1,
                });
                this.checkTimer();
            }, 1000),
        });
    };

    countDownControl() {
        if (this.state.timeState === "stopped") {
            this.countDown();
            this.setState({ timeState: "running" });
        } else {
            this.setState({ timeState: "stopped" });
            if (this.state.intervalID) {
                this.state.intervalID.cancel();
            }
        }
    }

    switchTimer = (num: number, str: string): void => {
        this.setState({
            timer: num,
            timerType: str,
            alarmColor: { color: "#2c3e50" },
        });
    };
    alarmActivate = (_timer: number): void => {
        if (_timer === 0) {
            this.audioBeep.play();
        }
    };

    warningTimer = (_timer: number): void => {
        if (_timer < 61) {
            this.setState({ alarmColor: { color: "#C0392B" } });
        } else {
            this.setState({ alarmColor: { color: "#2c3e50" } });
        }
    };

    checkTimer = (): void => {
        let timer = this.state.timer;
        this.warningTimer(timer);
        this.alarmActivate(timer);
        if (timer < 0) {
            if (this.state.intervalID) {
                this.state.intervalID.cancel();
            }
            if (this.state.timerType === "Session") {
                this.countDown();
                this.switchTimer(this.state.break * 60, "Break");
            } else {
                this.countDown();
                this.switchTimer(this.state.session * 60, "Session");
            }
        }
    };

    render() {
        return (
            <div id="app">
                <Title title="25 + 5 Clock" />
                <Counter
                    addID="break-increment"
                    lengthTimer={this.state.break}
                    lengthID="break-length"
                    minID="break-decrement"
                    title="Break Length"
                    titleID="break-label"
                    updateCounter={this.breakControl}
                />
                <Counter
                    addID="session-increment"
                    lengthTimer={this.state.session}
                    lengthID="session-length"
                    minID="session-decrement"
                    title="Session Length"
                    titleID="session-label"
                    updateCounter={this.sessionControl}
                />
                <Session
                    title={this.state.timerType}
                    timer={this.clockDisplay}
                    styled={this.state.alarmColor}
                />
                <Buttons
                    playStop={this.countDownControl}
                    resetTimer={this.reset}
                />
                <audio
                    id="beep"
                    preload="auto"
                    ref={(audio) => {
                        this.audioBeep = audio;
                    }}
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                />
                <div className="author">
                    {" "}
                    Coded by <br />
                    <a
                        href="https://github.com/anthoHerrera/clock_25_add_5"
                        target="_blank"
                    >
                        Anthony Herrera
                    </a>
                </div>
            </div>
        );
    }
}

export default App;
