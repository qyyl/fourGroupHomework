import Vue from 'vue'
import VueHtml5Editor from 'vue-html5-editor'
export default function () {
  const opt = {
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
    name: 'vue-html5-editor',
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    showModuleName: true,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    icons: {
      text: 'fa fa-pencil',
      color: 'fa fa-paint-brush',
      font: 'fa fa-font',
      align: 'fa fa-align-justify',
      list: 'fa fa-list',
      link: 'fa fa-chain',
      unlink: 'fa fa-chain-broken',
      tabulation: 'fa fa-table',
      image: 'fa fa-file-image-o',
      hr: 'fa fa-minus',
      eraser: 'fa fa-eraser',
      undo: 'fa-undo fa',
      'full-screen': 'fa fa-arrows-alt',
      info: 'fa fa-info'
    },
    // 配置图片模块
    image: {
      // 文件最大体积，单位字节
      sizeLimit: 512 * 1024 * 10,
      // 上传参数,默认把图片转为base64而不上传
      // upload config,default null and convert image to base64
      upload: {
        url: null,
        headers: {},
        params: {},
        fieldName: {}
      },
      // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
      // width和height是文件的最大宽高
      compress: {
        width: 600,
        height: 600,
        quality: 80
      },
      //   响应数据处理,最终返回图片链接
      uploadHandler (responseText) {
        var json = JSON.parse(responseText)
        if (json.status === 200) {
          return json.data
        } else {
          alert(json.error)
        }
      }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    language: 'zh-cn',
    // 自定义语言
    i18n: {
      'zh-cn': {
        align: '对齐方式',
        image: '图片',
        list: '列表',
        link: '链接',
        unlink: '去除链接',
        table: '表格',
        font: '文字',
        fullscreen: '全屏',
        text: '排版',
        eraser: '格式清除',
        info: '关于',
        color: '颜色',
        pleaseEnterUrl: '请输入地址',
        createLink: '创建链接',
        bold: '加粗',
        italic: '倾斜',
        underline: '下划线',
        strikeThrough: '删除线',
        subscript: '上标',
        superscript: '下标',
        heading: '标题',
        fontName: '字体',
        fontSize: '文字大小',
        leftJustify: '左对齐',
        centerJustify: '居中',
        rightJustify: '右对齐',
        orderedList: '有序列表',
        unorderedList: '无序列表',
        foreColor: '前景色',
        backgroundColor: '背景色',
        rowCount: '行数',
        columnCount: '列数',
        save: '确定',
        upload: '上传',
        progress: '进度',
        unknown: '未知',
        pleaseWait: '请稍等',
        error: '错误',
        abort: '中断',
        reset: '重置'
      }
    },
    // 隐藏不想要显示出来的模块
    hiddenModules: [],
    // 自定义要显示的模块，并控制顺序
    visibleModules: [
      'font',
      'align',
      'image',
      'undo'
    ],
    // 扩展模块，具体可以参考examples或查看源码
    // extended modules
    modules: {
    }
  }
  Vue.use(VueHtml5Editor, opt)
}
