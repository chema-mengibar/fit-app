import Table from './workout-service/table'
import Exercises from './workout-service/exercises'

export default class WorkoutService {

    constructor() {



        this.cursors = {
            'hams': 0,
            'hip': 0,
            'shoulder': 0,
            'total': 0,
        }

    }

    getBlockExercises(blockId) {

        const cursor = this.cursors[blockId];
        const block = Table.find(blockItem => blockItem.id === blockId)

        const exercisesIds = block.exercises.slice(cursor, block.byDay)

        const exes = []

        exercisesIds.forEach(exerciseId => {
            const e = this.getExerciseById(exerciseId);
            if (e) {
                exes.push(e)
            }
        })

        console.log(blockId, exercisesIds)
        console.log(exes)
        console.log('---')
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




}