import { describe, expect, it } from "vitest"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { app } from "@/main"
import { binderList, dslList, propList, useCanvasStore } from "@/store"
import type { DslContainerElement } from "@/models"
import { containerSlots, functionalSlots } from "@/models"
mount(app)
function checkMaps(i: number) {
  expect(Array.from(binderList.keys())).toHaveLength(i)
  expect(Array.from(dslList.keys())).toHaveLength(i + 1)
  expect(Array.from(propList.keys())).toHaveLength(i)
}
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
    expect(Array.from(dslList.keys())).toMatchInlineSnapshot(`
      [
        "root",
      ]
    `)
    expect(propList).toMatchInlineSnapshot("Map {}")
  })
  let appended: DslContainerElement
  it("should works for method `insertElement` when parent is root", () => {
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
    checkMaps(i)
  })
  it("should works for method `insertElement` when parent is child", () => {
    insertElement({
      type: functionalSlots.EInput,
      binder: ref(`${i++}`),
      prop: {},
    }, appended)
    expect(root).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [
              {
                "id": "1",
                "parent": [Circular],
                "type": 0,
              },
            ],
            "id": "0",
            "parent": [Circular],
            "type": 100,
          },
        ],
        "id": "root",
        "type": 101,
      }
    `)
    checkMaps(i)
  })
  it("should works for method `appendElement`", () => {
    expect(appendElement({
      type: containerSlots.EFlex,
      binder: ref(`${i++}`),
      prop: {},
    }, appended, "before"))
    checkMaps(i)
  })
})
