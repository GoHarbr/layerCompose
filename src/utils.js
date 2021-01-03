/* Object that who's keys are not all arrays or composed functions */
import {$dataPointer, $isService, LC_SYMBOL} from "./const"

export function isServiceLayer(l) {
    return !Array.isArray(l) && Object.values(l).findIndex(_ => !Array.isArray(_) && !isLcConstructor(_)) === -1
}

export function isFragmentOfLayers(what) {
    return Array.isArray(what) || isLcConstructor(what)
}

export function isLcConstructor(what) {
    return what.lcId === LC_SYMBOL
}

export function isService(what) {
    return !!what[$isService]
}

export function mustBeBuilt(l) {
    return isFunction(l)
}

function isFunction(what) {
    return (typeof what === 'function') // fixme, this will not always be correct
}

export function getDataFromPointer(compositionInstance) {
    return compositionInstance[$dataPointer]
}
