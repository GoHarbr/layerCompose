export const LC_SYMBOL = Symbol()
export const IS_DEV_MODE = process.env.NODE_ENV !== 'production'

export const $isService = Symbol()
export const $dataPointer = Symbol()
export const $onInitialize = Symbol()
export const $setData = Symbol()