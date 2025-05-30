'use client'

import { Typography, Button, Autocomplete } from '@mui/material'
import { Delete, Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFlowStore } from '@/store/useFlowStore'
import CustomTextField from '@/@core/components/mui/TextField'
import { useDialog } from '@/hooks/useDialog'
import AddConditionFlowDialog from '@/components/dialogs/flow/AddConditionFlowDialog'
import AddSettingPermissionFlowDialog from '@/components/dialogs/flow/AddSettingPermissionFlowDialog'

const ConditionFlowBar = () => {
  const { showDialog } = useDialog()
  const myDiagram = useFlowStore(state => state.myDiagram)
  const flow = useFlowStore(state => state.flow)
  const updateFlowNodeText = useFlowStore(state => state.updateFlowNodeText)
  const selectedField = useFlowStore(state => state.selectedField)
  const clearSelectedField = useFlowStore(state => state.clearSelectedField)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (selectedField?.key && myDiagram && flow) {
      // const nodeData = myDiagram.model.findNodeDataForKey(selectedField.key)

      const result = flow?.nodeDataArray.find(item => item.key == selectedField.key)
      // setInputValue(nodeData?.text || '')

      setInputValue(result?.text || '')
    }
  }, [selectedField, myDiagram, flow])

  const handleDelete = () => {
    if (!myDiagram) return

    const selectedNode = myDiagram.selection.first()
    if (selectedNode) {
      myDiagram.model.removeNodeData(selectedNode.data)
      clearSelectedField()
    }
  }

  const handleTextChange = (e: any) => {
    const newText = e.target.value
    setInputValue(newText)

    const nodeData = myDiagram?.model?.findNodeDataForKey(selectedField?.key)
    if (!nodeData || !myDiagram) return
    updateFlowNodeText(selectedField.key, newText)
    myDiagram.model.startTransaction('update text')
    myDiagram.model.setDataProperty(nodeData, 'text', newText)
    myDiagram.model.commitTransaction('update text')
  }

  return (
    <div className='w-[280px] min-w-[280px] bg-white flex flex-col transition-all border'>
      <section
        className='w-full h-[86px] flex justify-center items-center py-4 px-6'
        style={{ borderBottom: '1.5px solid #11151A1F' }}
      >
        <div className='flex-1 flex items-center justify-between'>
          <Typography variant='h6'>เงื่อนไข</Typography>
          <Button startIcon={<Delete />} variant='contained' color='error' onClick={handleDelete}>
            ลบ
          </Button>
        </div>
      </section>

      <div className='w-full flex flex-col p-6 gap-4'>
        <div className='w-full flex flex-col pb-4 border-b'>
          <CustomTextField label='ข้อความกำกับ' value={inputValue} onChange={handleTextChange} />
        </div>

        <div className='w-full flex flex-col pb-4 border-b gap-2'>
          <Typography variant='h6'>เงื่อนไขและเส้นทางงาน</Typography>

          <Button
            variant='contained'
            fullWidth
            startIcon={<Add />}
            onClick={() => {
              showDialog({
                id: 'AddConditionFlowDialog',
                component: <AddConditionFlowDialog id='AddConditionFlowDialog' />,
                size: 'sm'
              })
            }}
          >
            เพิ่มเงื่อนไขใหม่
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConditionFlowBar
