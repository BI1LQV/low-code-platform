import { describe, expect, it } from "vitest"
import { ref } from "vue"
import { JUST_FOR_TEST } from "@/main"
import { binderList, dslList, implList, propList, useCanvasStore } from "@/store"
import type { DslSunElement } from "@/models"
import { containerSlots } from "@/models"
JUST_FOR_TEST// 不写这个就被tree-shake了

let i = 0
describe("canvasStore", () => {
  const { root, insertElement, appendElement } = useCanvasStore()
  it("should init", () => {
    expect(root).toMatchInlineSnapshot(`
      {
        "children": [],
        "id": "root",
        "type": 101,
      }
    `)
    expect(binderList).toMatchInlineSnapshot("Map {}")
    expect(dslList).toMatchInlineSnapshot(`
      Map {
        "root" => {
          "children": [],
          "id": "root",
          "type": 101,
        },
      }
    `)
    expect(implList).toMatchInlineSnapshot("Map {}")
    expect(propList).toMatchInlineSnapshot("Map {}")
  })
  let appended: DslSunElement
  it("should works for method `insertElement`", () => {
    appended = insertElement({
      type: containerSlots.EFlex,
      binder: ref(`${i++}`),
      prop: {},
    })
    expect(appended).toMatchInlineSnapshot(`
      {
        "children": [],
        "id": "0",
        "parent": {
          "children": [
            [Circular],
          ],
          "id": "root",
          "type": 101,
        },
        "type": 100,
      }
    `)
    expect(binderList).toMatchInlineSnapshot(`
      Map {
        "0" => RefImpl {
          "__v_isRef": true,
          "__v_isShallow": false,
          "_rawValue": "0",
          "_value": "0",
          "dep": undefined,
        },
      }
    `)
    expect(dslList).toMatchInlineSnapshot(`
      Map {
        "root" => {
          "children": [
            {
              "children": [],
              "id": "0",
              "parent": [Circular],
              "type": 100,
            },
          ],
          "id": "root",
          "type": 101,
        },
        "0" => {
          "children": [],
          "id": "0",
          "parent": {
            "children": [
              [Circular],
            ],
            "id": "root",
            "type": 101,
          },
          "type": 100,
        },
      }
    `)
    expect(implList).toMatchInlineSnapshot("Map {}")
    expect(propList).toMatchInlineSnapshot(`
      Map {
        "0" => {},
      }
    `)
    it("should works for method `appendElement`", () => {
      expect(appendElement({
        type: containerSlots.EFlex,
        binder: ref(`${i++}`),
        prop: {},
      }, appended, "before"))
      expect(binderList).toMatchInlineSnapshot("Map {}")
      expect(dslList).toMatchInlineSnapshot(`
        Map {
          "root" => {
            "children": [],
            "id": "root",
            "type": 101,
          },
        }
      `)
      expect(implList).toMatchInlineSnapshot("Map {}")
      expect(propList).toMatchInlineSnapshot("Map {}")
    })
  })
})
