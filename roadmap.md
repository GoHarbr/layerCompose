- babel
    - read function call and convert (arg1, arg2) into {arg1, arg2}

- async
    - if constructor is async, check that `.then()` is called within 100ms

- internal interface
    - private state
    - live transforms / lenses
    - verify $ methods exist
    
- external interface
    - private method
  - warn when accesing an internal var when an external accessor is available (on a different layer)
  
- services

- composition
  ---- fix: double include of common layers/compositions
  - casting (when wrapping over itself)
  - test: services should not be reused between instances 
