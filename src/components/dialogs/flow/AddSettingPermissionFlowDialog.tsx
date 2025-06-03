/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Checkbox,
  Pagination
} from '@mui/material'
import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import {
  useGetDepartmentExternalQueryOption,
  useGetPersonExternalQueryOption,
  useGetPositionExternalQueryOption
} from '@/queryOptions/form/formQueryOptions'

interface AddSettingPermissionFlowDialogProps {
  id: string
}

const mockData = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  name: `ชื่อที่ ${i + 1}`,
  type: i % 3 === 0 ? 'บุคคล' : i % 3 === 1 ? 'ตำแหน่ง' : 'หน่วยงาน'
}))

const DebouncedInput = ({ value: initialValue, onChange, isEng = false, debounce = 550, maxLength, ...props }: any) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => {
        const input = e.target.value
        if (!isEng) {
          setValue(input)

          return
        }
        const isValid = /^[a-zA-Z0-9]*$/.test(input)
        if (isValid) {
          setValue(input)
        }
      }}
      inputProps={{
        ...(maxLength ? { maxLength } : {}),
        ...(props.inputProps || {})
      }}
    />
  )
}

const AddSettingPermissionFlowDialog = ({ id }: AddSettingPermissionFlowDialogProps) => {
  const { closeDialog } = useDialog()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(40)
  const [filterType, setFilterType] = useState('บุคคล')
  const [searchText, setSearchText] = useState('')
  const [leftList, setLeftList] = useState<any[]>([])
  const [rightList, setRightList] = useState<any[]>([])
  const [selectedLeft, setSelectedLeft] = useState<number[]>([])
  const [selectedRight, setSelectedRight] = useState<number[]>([])
  const [leftPage, setLeftPage] = useState(1)
  const leftPageSize = 10

  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'type' | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null
  })

  const [sortConfigRight, setSortConfigRight] = useState<{
    key: 'name' | 'type' | null
    direction: 'asc' | 'desc' | null
  }>({
    key: null,
    direction: null
  })

  const { data: personLists } = useGetPersonExternalQueryOption(page, pageSize, '', '')

  const handleSortRight = (key: 'name' | 'type') => {
    setSortConfigRight(prev => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' }
        if (prev.direction === 'desc') return { key: null, direction: null }
      }
      return { key, direction: 'asc' }
    })
  }

  const sortedRightList = [...rightList].sort((a, b) => {
    if (!sortConfigRight.key || !sortConfigRight.direction) return 0
    const valA = a[sortConfigRight.key]!.toLowerCase()
    const valB = b[sortConfigRight.key]!.toLowerCase()
    if (valA < valB) return sortConfigRight.direction === 'asc' ? -1 : 1
    if (valA > valB) return sortConfigRight.direction === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (key: 'name' | 'type') => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' }
        if (prev.direction === 'desc') return { key: null, direction: null }
      }
      return { key, direction: 'asc' }
    })
  }

  useEffect(() => {
    let filtered = mockData.filter(item => {
      const textMatch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.type.toLowerCase().includes(searchText.toLowerCase())
      const matchesType = item.type === filterType
      return matchesType && textMatch
    })

    if (sortConfig.key && sortConfig.direction) {
      filtered = [...filtered].sort((a, b) => {
        const key = sortConfig.key as 'name' | 'type'
        const valA = a[key].toLowerCase()
        const valB = b[key].toLowerCase()
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    setLeftList(filtered.filter(i => !rightList.some(r => r.id === i.id)))
    setLeftPage(1)
  }, [filterType, searchText, sortConfig, rightList])

  const transferSelectedToRight = () => {
    const toMove = personLists?.items?.data.filter((item: any) => selectedLeft.includes(item.F_PERSON_ID)) || []

    const mapped = toMove.map((item: any) => ({
      id: item.F_PERSON_ID,
      name: `${item.F_FIRST_NAME} ${item.F_LAST_NAME}`,
      type: item.F_POSITION_NAME || '-'
    }))

    const updatedRight = [...rightList, ...mapped.filter((i: any) => !rightList.some(r => r.id === i.id))]
    setRightList(updatedRight)
    setSelectedLeft([])
  }

  const transferSelectedToLeft = () => {
    const remaining = rightList.filter(item => !selectedRight.includes(item.id))
    setRightList(remaining)
    setSelectedRight([])
  }

  const toggleLeftSelect = (id: number) => {
    setSelectedLeft(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]))
  }

  const toggleRightSelect = (id: number) => {
    setSelectedRight(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]))
  }

  const toggleAllLeftSelect = () => {
    const ids = personLists?.items?.data
      .filter((item: any) => !rightList.some(r => r.id === item.F_PERSON_ID)) // ⛔ กรองออกก่อน
      .map((item: any) => item.F_PERSON_ID)

    const allSelected = ids.every((id: any) => selectedLeft.includes(id))

    setSelectedLeft(
      allSelected ? selectedLeft.filter(id => !ids.includes(id)) : [...new Set([...selectedLeft, ...ids])]
    )
  }

  const toggleAllRightSelect = () => {
    const ids = rightList.map(item => item.id)
    const allSelected = ids.every(id => selectedRight.includes(id))
    setSelectedRight(allSelected ? [] : [...ids])
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

        <div className='flex  '>
          {/* Left List */}
          <div className='flex flex-col gap-2 w-1/2'>
            <Typography variant='h6' className='text-center'>
              สิทธิที่สามารถเลือกได้
            </Typography>
            <DebouncedInput
              label='ค้นหา'
              placeholder={'....'}
              value={''}
              onChange={(newText: any) => setSearchText(newText)}
            />
            <div className='w-full flex items-center px-2 font-semibold text-sm text-gray-700'>
              <button
                className='w-1/6 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 border border-gray-300'
                onClick={toggleAllLeftSelect}
              >
                เลือก
              </button>
              <button
                className='w-2/5 text-left px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 border border-gray-300 ml-2'
                onClick={() => handleSort('name')}
              >
                ชื่อ{' '}
                {sortConfig.key === 'name' &&
                  (sortConfig.direction === 'asc' ? '▲' : sortConfig.direction === 'desc' ? '▼' : '')}
              </button>
              <button
                className='w-2/5 text-left px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 border border-gray-300 ml-2'
                onClick={() => handleSort('type')}
              >
                ประเภท{' '}
                {sortConfig.key === 'type' &&
                  (sortConfig.direction === 'asc' ? '▲' : sortConfig.direction === 'desc' ? '▼' : '')}
              </button>
            </div>
            <div className='w-full border border-gray-300 rounded overflow-y-auto space-y-2 p-2 h-[380px]'>
              {personLists?.items?.data?.map((item: any, index: number) => {
                const isMoved = rightList.some(r => r.id === item.F_PERSON_ID)

                return (
                  <div key={index} className='flex items-center'>
                    <Checkbox
                      checked={selectedLeft.includes(item.F_PERSON_ID)}
                      disabled={isMoved}
                      onChange={() => toggleLeftSelect(item.F_PERSON_ID)}
                    />
                    <Typography className={`w-2/5 ${isMoved ? 'text-textDisabled' : ' text-black'}`}>
                      {item.F_FIRST_NAME} {item.F_LAST_NAME}
                    </Typography>
                    <Typography className={`w-2/5 ${isMoved ? 'text-textDisabled' : 'text-black'}`}>
                      {item.F_POSITION_NAME}
                    </Typography>
                  </div>
                )
              })}
            </div>
            <div className='flex justify-center mt-2'>
              <Pagination
                count={personLists?.items?.last_page ?? 1}
                page={page}
                onChange={(_, value) => setPage(value)}
                size='small'
              />
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-col justify-center items-center gap-4'>
            <Button variant='text' onClick={transferSelectedToRight}>
              ▶
            </Button>
            <Button variant='text' onClick={transferSelectedToLeft}>
              ◀
            </Button>
          </div>

          {/* Right List */}
          <div className='flex flex-col gap-2 w-1/2'>
            <Typography variant='h6' className='text-center'>
              สิทธิที่เลือกแล้ว
            </Typography>
            <DebouncedInput
              label='ค้นหา'
              placeholder={'....'}
              value={''}
              onChange={(newText: any) => setSearchText(newText)}
            />
            <div className='w-full flex items-center px-2 font-semibold text-sm text-gray-700'>
              <button
                className='w-1/6 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 border border-gray-300'
                onClick={toggleAllRightSelect}
              >
                เลือก
              </button>
              <button
                className='w-2/5 text-left px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 border border-gray-300 ml-2'
                onClick={() => handleSortRight('name')}
              >
                ชื่อ{' '}
                {sortConfigRight.key === 'name' &&
                  (sortConfigRight.direction === 'asc' ? '▲' : sortConfigRight.direction === 'desc' ? '▼' : '')}
              </button>
              <button
                className='w-2/5 text-left px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 border border-gray-300 ml-2'
                onClick={() => handleSortRight('type')}
              >
                ประเภท{' '}
                {sortConfigRight.key === 'type' &&
                  (sortConfigRight.direction === 'asc' ? '▲' : sortConfigRight.direction === 'desc' ? '▼' : '')}
              </button>
            </div>
            <div className='w-full border border-gray-300 rounded overflow-y-auto space-y-2 p-2 h-[380px]'>
              {sortedRightList.map(item => (
                <div key={item.id} className='flex space-x-4 items-center'>
                  <Checkbox checked={selectedRight.includes(item.id)} onChange={() => toggleRightSelect(item.id)} />
                  <Typography className='w-2/5 text-black'>{item.name}</Typography>
                  <Typography className='w-2/5 text-black'>{item.type}</Typography>
                </div>
              ))}
            </div>
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
