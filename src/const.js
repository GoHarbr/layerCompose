export const IS_DEV_MODE = process.env.NODE_ENV !== 'production'

if (IS_DEV_MODE) {
    console.warn("layerCompose symbols loaded. You should see this message only once. Check your bundler (ie: webpack) configuration otherwise")
}

export const $isLc = Symbol('isLc')
export const $compositionId = Symbol('compositionId')
export const $isCompositionInstance = Symbol("isCompositionInstance")

export const $isService = Symbol('isService')
export const $dataPointer = Symbol('dataPointer')
export const $extendSuper = Symbol('extendSuper')
export const $runOnInitialize = Symbol('runOnInitialize')
export const $initializedCalls = Symbol('initializedCalls')

export const $initializer = Symbol()
export const $isInitialized = Symbol()
export const $setData = Symbol()
export const $functionSymbolIds = Symbol('array-of-function-symbol-ids')

export const $isSealed = Symbol("isSealed")
// export const $spec = Symbol()
export const $composition = Symbol('composition')
export const $layers = Symbol("layers")
export const $layerOrder = Symbol("layerOrder")

export const $dataProxyMap = Symbol('dataProxyMap')
export const $borrowedKeys = Symbol('borrowedKeys')
export const $writableKeys = Symbol('writableKeys')

export const $layerId = Symbol("layerId")
export const $$ = Symbol('$$')

// export const $isSetter = Symbol("isSetter")
// export const $isGetter = Symbol("isGetter")
