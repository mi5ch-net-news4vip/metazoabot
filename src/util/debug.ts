type Debugger = {
  isDebug: boolean;
  log: (msg: any) => void;
}
var thiz: Debugger|null = null

function createDebuggerInstance(isDebug: boolean): Debugger {
  if (thiz === null) {
    thiz = {
      isDebug: isDebug,
      log: function(msg, key = "") {
        if (this.isDebug) {
          if (msg instanceof Object || msg instanceof Array) {
            console.log(key + ": ")
            for (const k in msg) {
              if (typeof k === "string" || typeof k === "number") {
                console.log(k + ": " + msg[k])
              } else {
                this.log(msg[k])
              }
            }
          } else {
            console.log(key + ": " + msg)
          }
        }
      },
    }
  }
  return thiz
}

export type { Debugger }
export default createDebuggerInstance
