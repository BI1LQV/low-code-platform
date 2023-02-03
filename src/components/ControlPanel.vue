<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from "vue"
import { Plus } from "@element-plus/icons-vue"
import { useCanvasStore } from "@/store/canvasStore"
import type { allSlotsKey } from "@/models/slots"
import { containerSlots } from "@/models/slots"
import { Slots } from "@/slots"
import type { NewSlotDragger } from "@/models/drags"
import { useFuncStore } from "@/store/funcStore"
import { clearableReactive } from "@/composables/clearableReactive"
const { nameToIdMap } = useFuncStore()
const { setFunc, funcMap } = useFuncStore()

const AsyncMonacoEditor = defineAsyncComponent(() => {
  return import("@/components/MonacoEditor.vue").then((res) => {
    return res.default
  })
})

const activeName = ref("comps")

const showedSlots = Array.from(Slots.keys())
showedSlots.splice(showedSlots.findIndex(i => i === containerSlots.ERoot), 1)

const canvasStore = useCanvasStore()
const {
  setSelectedElement, clearDragEffect,
} = canvasStore

function dragHandler(ev: DragEvent, type: allSlotsKey) {
  ev.dataTransfer!.setData("text/plain", JSON.stringify({ type: "newSlot", slot: type } as NewSlotDragger))
  setSelectedElement({ id: "" })
}

const showAddBind = ref(false)
const [form, setForm, clearForm] = clearableReactive(() => ({
  type: "js",
  name: "",
  impl: "",
  baseUrl: "",
  inputTmp: "",
  receiverTmp: "",
  isDirect: false,
  inputs: [] as string[],
  receivers: [] as string[],
}))

function handleClose() {
  clearForm()
  showAddBind.value = false
}

function addFunc() {
  setFunc(form)
  showAddBind.value = false
}

const funcList = computed(() => Object.values(funcMap))
const nameList = computed(() => Object.keys(nameToIdMap))

function modify(scope: any) {
  // @ts-expect-error okay
  setForm(funcMap[scope.row.name])
  showAddBind.value = true
}
</script>

<template>
  <div w-200px border-3px>
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件" name="comps">
        <template v-for="name of showedSlots" :key="name">
          <div></div>
          <button
            draggable="true"
            @dragstart="dragHandler($event, name)"
            @dragend="clearDragEffect()"
          >
            {{ Slots.get(name)!.name }}
          </button>
        </template>
      </el-tab-pane>
      <el-tab-pane label="数据绑定" name="binds">
        <el-button type="primary" size="small" @click="showAddBind = true">添加</el-button>
        <el-table :data="funcList" stripe style="width: 100%">
          <el-table-column prop="name" />
          <el-table-column>
            <template #default="scope">
              <el-button @click="modify(scope)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
  <el-dialog
    v-model="showAddBind"
    title="添加数据绑定"
    width="50%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="120px">
      <el-form-item label="绑定函数名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="输入绑定列表">
        <el-button
          v-for="input of form.inputs" :key="input"
          type="warning"
          round
          disabled
        >
          {{ input }}
        </el-button>
        <el-select v-model="form.inputTmp">
          <el-option v-for="name of nameList" :key="name" :label="name" :value="name"></el-option>
        </el-select>
        <el-button
          type="primary" :icon="Plus" circle
          @click="() => { form.inputs.push(form.inputTmp);form.inputTmp = '' }"
        />
      </el-form-item>
      <el-form-item label="输出绑定">
        <el-button
          v-for="receiver of form.receivers" :key="receiver"
          type="warning"
          round
          disabled
        >
          {{ receiver }}
        </el-button>
        <el-select v-model="form.receiverTmp">
          <el-option v-for="name of nameList" :key="name" :label="name" :value="name"></el-option>
        </el-select>
        <el-button
          type="primary" :icon="Plus" circle
          @click="() => { form.receivers.push(form.receiverTmp);form.receiverTmp = '' }"
        />
      </el-form-item>
      <el-form-item label="绑定函数类型">
        <el-select v-model="form.type">
          <el-option label="JavaScript函数" value="js" />
          <el-option label="Python云函数" value="py" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type === 'js'" label="绑定函数实现体">
        <AsyncMonacoEditor
          v-model="form.impl"
          height="300px"
          language="json"
        ></AsyncMonacoEditor>
      </el-form-item>
      <template v-else>
        <el-form-item label="绑定目标地址">
          <el-input v-model="form.baseUrl"></el-input>
        </el-form-item>
        <el-form-item label="是否直连">
          <el-checkbox v-model="form.isDirect"></el-checkbox>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="showAddBind = false">取消</el-button>
        <el-button type="primary" @click="addFunc">
          添加绑定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
