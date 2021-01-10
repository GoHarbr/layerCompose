import layerCompose from "../src"

describe("Layering", () => {
    test("should have access to data", () => {
        const check = jest.fn()

        const C = layerCompose({
            method(d) {
                check("A", d.key)
            }
        },{
            method(d) {
                check("B", d.key)
            }
        })

        C({key: 'v'}).method()
        expect(check).toHaveBeenCalledWith('A', 'v')
        expect(check).toHaveBeenCalledWith('B', 'v')
    })

    test("layer fragments are composed in proper order", () => {
        let top
        let bottom
        let middle
        const C = layerCompose(
            [{
                top(d) {
                    top = 0
                }
            },
                {
                    top(d) {
                        top = 1
                    },
                    middle(d) {
                        middle = 0
                    }
                    },

            ],

            [
                {
                    middle(d) {
                        middle = 1
                    },
                    top(d) {
                        top = 2
                    },
                },
                {
                    top(d) {
                        top = 3
                    },
                    bottom(d) {
                        bottom = 0
                    }
                }
            ]
        )

        const c = C()

        c.top()
        expect(top).toEqual(0)

        c.bottom()
        expect(bottom).toEqual(0)

        c.middle()
        expect(middle).toEqual(0)
    })

    test.skip("methods could be overridden", () => {
        let pass, fail
        const C = layerCompose(($) => {
            $.method.override(m => {
                pass = true
                m({isFail: false})
            })
        }, {
            method(d, {isFail = true}) {
                expect(pass).toBe(true)
                fail = isFail
            }
        })

        C().method()

        expect(pass).toBe(true)
        expect(fail).toBe(false)
    })

    test("methods could be getters", () => {
        const C = layerCompose(
            {
                getMyKey(d) {
                    return d.key
                }
            }
        )

        const c = C({key:'v'})

        expect(c.myKey).toBe('v')
    })

    test("watcher methods should be called", () => {
        /* watcher methods are methods defined above the call site */

        const checkWatch = jest.fn()
        const checkNormal = jest.fn()
        const C = layerCompose({
            watch() {
                checkWatch()
            }
        }, ({watch}) => ({
            method() {
                watch()
            }
        }), {
            watch() {
                checkNormal()
            }
        })

        C().method()
        expect(checkNormal).toHaveBeenCalled()
        expect(checkWatch).toHaveBeenCalled()
    })
})
