'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useDialog } from '@/hooks/useDialog'

interface AddSettingPermissionFlowDialogProps {
  id: string
}

const AddSettingPermissionFlowDialog = ({ id }: AddSettingPermissionFlowDialogProps) => {
  const { closeDialog } = useDialog()
  const [filterType, setFilterType] = useState('บุคคล')
  const [searchText, setSearchText] = useState('')
  const [leftList, setLeftList] = useState<any[]>([])
  const [rightList, setRightList] = useState<any[]>([])

  const transferSelectedToRight = () => {
    // Placeholder for logic
  }

  const transferSelectedToLeft = () => {
    // Placeholder for logic
  }

  return (
    <Grid container spacing={2} className='flex flex-col'>
      <Grid item xs={12}>
        <Typography variant='h5' className='text-center'>
          ตั้งค่าสิทธิ
        </Typography>
      </Grid>

      <Grid item xs={12} className='px-6 space-y-4'>
        <FormControl component='fieldset'>
          <RadioGroup row value={filterType} onChange={e => setFilterType(e.target.value)}>
            {['บุคคล', 'ตำแหน่ง', 'หน่วยงาน'].map(option => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          placeholder='ค้นหา'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          variant='outlined'
          size='small'
        />

        <div className='flex space-x-2 font-semibold text-sm text-gray-700'>
          {['ซ้าย', 'ขว'].map((_, i) => (
            <div key={i} className='w-1/2 flex space-x-4'>
              <span className='w-1/6'>เลือก</span>
              <span className='w-2/5'>ชื่อ</span>
              <span className='w-2/5'>ประเภท</span>
            </div>
          ))}
        </div>

        <div className='flex space-x-4'>
          <div className='w-1/2 h-96 border border-gray-300 rounded overflow-y-auto space-y-2 p-2'>
            {/* Left list placeholder */}
          </div>

          <div className='flex flex-col justify-center items-center gap-4'>
            <Button variant='text' onClick={transferSelectedToRight}>
              ▶
            </Button>
            <Button variant='text' onClick={transferSelectedToLeft}>
              ◀
            </Button>
          </div>

          <div className='w-1/2 h-96 border border-gray-300 rounded overflow-y-auto space-y-2 p-2'>
            {/* Right list placeholder */}
          </div>
        </div>
      </Grid>

      <Grid item xs={12} className='flex items-center justify-end gap-2 px-6'>
        <Button variant='contained' color='secondary' onClick={() => closeDialog(id)}>
          ยกเลิก
        </Button>
        <Button variant='contained' onClick={() => closeDialog(id)}>
          ยืนยัน
        </Button>
      </Grid>
    </Grid>
  )
}

export default AddSettingPermissionFlowDialog
