import type { Ref } from "vue"
import { Fragment, computed, defineComponent, ref } from "vue"
import { ElButton, ElFormItem, ElInput, ElRadioButton, ElRadioGroup, ElSwitch } from "element-plus"
import "element-plus/es/components/switch/style/css"
import "element-plus/es/components/button/style/css"
import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"

export const Component = defineComponent({
  name: "下载",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop, isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    const downloadable = computed(() => Boolean(binder.value))
    function downloadFile() {
      const element = document.createElement("a")
      element.setAttribute("href", `data:application/octet-stream;base64,${binder.value}`)
      element.setAttribute("download", prop.filename)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
    return () => {
      if (isProd) {
        return <ElButton {...prop} disabled={!downloadable.value} onClick={downloadFile}>{prop.innerVal}</ElButton>
      } else {
        return <ElButton {...prop} disabled={false}>{prop.innerVal}</ElButton>
      }
    }
  },
})

export function Prop(): CommonOptions {
  return {
    "style": {
      ...(() => {
        const base = BaseStyleImpl()
        // @ts-expect-error 偷懒。
        delete base["background-color"]
        // @ts-expect-error 偷懒。
        delete base.color
        return base
      })(),
    },
    "innerVal": "点此下载",
    "type": "primary",
    "round": false,
    "plain": false,
    "text": false,
    "bg": false,
    "size": "default",
    "filename": "文件名.txt",
  }
}

export const AttrPanel = defineComponent({
  props: ["prop"],
  setup(p) {
    return () => {
      return (<Fragment>
        <ElFormItem label="按钮名称">
          <ElInput v-model={p.prop.innerVal}></ElInput>
        </ElFormItem>
        <ElFormItem label="文件名称">
          <ElInput v-model={p.prop.filename}></ElInput>
        </ElFormItem>
        <ElFormItem label="尺寸">
          <ElRadioGroup v-model={p.prop.size}>
            <ElRadioButton label="default" />
            <ElRadioButton label="small" />
            <ElRadioButton label="large" />
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="按钮类型">
          <ElRadioGroup v-model={p.prop.type}>
            <ElRadioButton label="default" />
            <ElRadioButton label="primary" />
            <ElRadioButton label="success" />
            <ElRadioButton label="info" />
            <ElRadioButton label="warning" />
            <ElRadioButton label="danger" />
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="是否圆角">
          <ElSwitch v-model={p.prop.round}></ElSwitch>
        </ElFormItem>
        <ElFormItem label="是否次要">
          <ElSwitch v-model={p.prop.plain}></ElSwitch>
        </ElFormItem>
        <ElFormItem label="纯文本">
          <ElSwitch v-model={p.prop.text}></ElSwitch>
        </ElFormItem>
        {p.prop.text
          ? <ElFormItem label="带背景">
          <ElSwitch v-model={p.prop.bg}></ElSwitch>
        </ElFormItem>
          : null}
      </Fragment>)
    }
  },
})
export function Binder() {
  return ref("")
}
