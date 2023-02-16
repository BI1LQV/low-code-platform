import { expose } from "comlink"
import * as api from "./main"
expose(api)
self.postMessage("loaded")
