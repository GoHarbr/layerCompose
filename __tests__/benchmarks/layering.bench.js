/*
* Records
* layerCompose x 660,319,297 ops/sec ±0.58% (89 runs sampled)
* layerCompose x 771,980,180 ops/sec ±1.10% (88 runs sampled)
*
* */

const Benchmark = require('benchmark')
const layerCompose = require('../../lib').default

var suite = new Benchmark.Suite

const data = "this_obj"

function log(what) {
    return what
}

function twoLogs_global() {
    log('A', data)
    log('B', data)
}

function twoLogs_this() {
    log('A', this)
    log('B', this)
}

const a = [log, log]
function two_array_global() {
    for (const f of a) {
        f(data)
    }
}

const fa = Object.freeze([log, log])
function two_frozenArray_global() {
    for (const f of fa) {
        f(data)
    }
}

const C = layerCompose({
    method() {
        log("A", this)
    }
}, {
    method() {
        log("B", this)
    }
})
const c = C(data)

// add tests
suite
//     .add('direct global', function () {
//     twoLogs_global()
// })
    .add('direct this', function () {
        twoLogs_this.call(data)
    })
    // these two are obviously slow
    // .add('array', function () {
    //     two_array_global()
    // })
    // .add('frozen array', function () {
    //     two_frozenArray_global()
    // })
    .add('two direct calls', function () {
        log(data)
        log(data)
    })
    .add('layerCompose', function () {
        c.method()
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target))
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    .run({'async': false})