import { EventEmitter, EventEmitterArgs, EventEmitterArgsReturn, EventEmitterReturn } from "./EventEmitter";

const eventEmitterNumber = new EventEmitterArgs<number>()
const eventEmitterObject = new EventEmitterArgs<{ name: string, age: number }>()
const eventEmitter = new EventEmitter()
const eventEmitterReturn = new EventEmitterReturn<number>()
const eventEmitterNumberReturnBoolean = new EventEmitterArgsReturn<number, boolean>()

eventEmitterNumber.on('execAfterSeconds', (seconds) => {
    console.log(`Event emitted after ${seconds} seconds`)
});

eventEmitterReturn.on('checkCoinPrice', () => 50)

eventEmitter.on('exec', () => {
    console.log('Event emitted')
})

eventEmitterObject.on('personCreated', (person) => {
    console.log(`Name: ${person.name} - Age: ${person.age}`)
})

eventEmitterNumberReturnBoolean.on('checkScore', (score) => {
    if (score > 7) return true

    return false
})

console.log('Started...')

setTimeout(() => {
    eventEmitterNumber.trigger('execAfterSeconds', 1)
}, 1000);

setTimeout(() => {
    eventEmitter.trigger('exec')
}, 500)

setTimeout(() => {
    eventEmitterObject.trigger('personCreated', {
        name: 'Carlos',
        age: 54
    })
}, 1500)

setTimeout(() => {
    const results1 = eventEmitterNumberReturnBoolean.trigger('checkScore', 5)
    const results2 = eventEmitterNumberReturnBoolean.trigger('checkScore', 8)

    function convertBoolean(value: boolean) {
        return value ? 'Accepted' : 'Rejected'
    }

    console.log(`Result 1: ${convertBoolean(results1[0])}`)
    console.log(`Result 2: ${convertBoolean(results2[0])}`)
}, 2000)

setTimeout(() => {
    const results = eventEmitterReturn.trigger('checkCoinPrice')

    console.log(`Coin price: ${results[0]}`)
}, 2500)