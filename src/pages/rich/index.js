import React, { useState } from 'react'
// 富文本编辑器
import { Editor } from 'react-draft-wysiwyg'
import { Button, Card, Modal } from 'antd'
/* 
draft-js react富文本的编辑器框架
draft-js 提供的convertToRaw用于把不可变的数据转换为js对象
draftToHtml将呢内容转换为纯html
*/
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function RichText() {
  // 定义默认状态，
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [showRichText, setShowRichText] = useState(false)

  const getText = () => {
    // editorState传递到服务器不是我们需要的数据类型，js对象
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    setShowRichText(true)
  }

  // 清空内容
  const clearText = () => {
    setEditorState(EditorState.createEmpty())
  }

  return (
    <div style={{ width: '100%' }}>
      <Card style={{ height: 450 }}>
        <Editor
          editorState={editorState}
          // 状态发生改变的时候
          onEditorStateChange={val => setEditorState(val)}
        />
      </Card>
      <Card>
        <Button type="primary" onClick={getText} style={{ marginRight: 10 }}>
          提交
        </Button>

        <Button type="primary" onClick={clearText}>
          清空内容
        </Button>
      </Card>

      <Modal
        title="转换后的内容"
        open={showRichText}
        onCancel={() => {
          setShowRichText(false)
        }}
        footer={null}
      >
        {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      </Modal>
    </div>
  )
}
