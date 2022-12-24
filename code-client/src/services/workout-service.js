import { reactive } from 'vue'
import Table from './workout-service/table'
import Exercises from './workout-service/exercises'


// localStorage.setItem(key, list.join(','));
// const completedPuzzlesStr = localStorage.getItem(key);

export default class WorkoutService {

    constructor() {

        this.defaults = {
            day: 1,
            cursors: {
                'hams': 0,
                'hip': 0,
                'shoulder': 0,
                'total': 0,
            }
        }


        const storedCursors = this.getCursors();

        if (!storedCursors) {

            this.setCursors(this.defaults.cursors)
        }

        this.start = this.start.bind(this)

        this._state = reactive({
            step: 1, // 1 pause, 2 running
            timerInterval: undefined,
            countdown: 0,
            timeRemain: 10
        });


    }

    getCursors() {
        let cursorsJson

        try {
            cursorsJson = JSON.parse(localStorage.getItem('cursors'));
        } catch (e) {
            console.error(e)
            cursorsJson = this.defaults.cursors
        }
        return cursorsJson
    }

    setCursors(c) {
        localStorage.setItem('cursors', JSON.stringify(c));
    }

    setBlockCursor(blockId, cursorValue) {

        const cursors = this.getCursors()
        cursors[blockId] = cursorValue
        localStorage.setItem('cursors', JSON.stringify(cursors));
    }

    // -----------------------------


    incBlockCursor({ blockId }) {

        const currentBlockCursorValue = this.getCursors()[blockId]
        const incValue = currentBlockCursorValue + 1
        this.setBlockCursor(blockId, incValue);


    }

    // --------------------

    getBlockExercises(blockId) {
        const cursor = this.getCursors()[blockId];
        const block = Table.find(blockItem => blockItem.id === blockId)
        const exercisesIds = block.exercises.slice(cursor, block.byDay + cursor)
        const exes = []
        exercisesIds.forEach(exerciseId => {
            const e = this.getExerciseById(exerciseId);
            if (e) {
                exes.push(e)
            }
        })
        return exes
    }

    getExerciseById(exerciseId) {
        return Exercises.find(exerciseItem => exerciseItem.id === exerciseId)
    }

    getBlocks() {
        return Table.map(item => {
            return {
                name: item.name,
                id: item.id,
            }
        })
    }


    // --------------------

    setExercise(exerciseId) {
        const exec = this.getExerciseById(exerciseId)
        if (exec) {
            console.log(exec)
            this._state.step = 1;

            if (exec.durationSec) {
                this.stepPause()
                clearInterval(this._state.timerInterval);
                this._state.timerInterval = undefined;
                this._state.timeRemain = exec.durationSec;
            }
        }
        return exec
    }

    // --------------------

    get timeRemain() {
        if (this._state.timeRemain > 0) {
            return `-${this._state.timeRemain}`;
        } else {
            return '0'
        }
    }


    stepPause() {
        this._state.step = 1;
    }

    stepRunning() {
        this._state.step = 2;
    }

    get step() {
        return this._state.step;
    }


    // --------------------


    vibrate(pattern) {
        const canVibrate = window.navigator.vibrate
        if (canVibrate) { window.navigator.vibrate(pattern) }
    }

    timer() {
        this._state.timeRemain--;
        if (this._state.timeRemain === 10) {
            this.vibrate([1000, 500, 1000]);
        }
        if (this._state.timeRemain <= 0) {

            this.vibrate([1000, 500, 1000, 500, 1000, 500, 1000]);
            clearInterval(this._state.timerInterval);
            this.stepPause()

        }
    }

    start() {
        this._state.timerInterval = setInterval(() => {
            this.timer()
        }, 1000);
        this.stepRunning()
    }




    contdownStart() {
        const _ = this;
        setTimeout(function() {
            _._state.countdown--;
            if (_._state.countdown > 0) {
                _.contdownStart()
            }
        }, 1000)

    }

    onClickPlay() {
        const _ = this;
        if (this.step == 1) {

            this.contdownStart()
            this.stepRunning()
            setTimeout(function() {
                _.start()
            }, this._state.countdown * 1000);

        } else {
            clearInterval(this._state.timerInterval);
            this.stepPause()
        }

    }




}