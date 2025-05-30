'use client'

import { useCreateFlowQueryOption } from '@/queryOptions/form/formQueryOptions'
import { useFlowStore } from '@/store/useFlowStore'
import { Button } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const NavBarFlow = ({ onSave }: any) => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const flow = useFlowStore(state => state.flow)
  const updateFlowInfo = useFlowStore(state => state.updateFlowInfo)

  const { mutateAsync } = useCreateFlowQueryOption()

  const handleSave = async () => {
    onSave()
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <p className='text-[#11151A99] text-[14px]'>Name :</p>
          <input
            className='text-sm min-w-[250px] border-b border-gray-400 focus:outline-none focus:border-black'
            value={flow?.name ?? ''}
            onChange={e => updateFlowInfo({ name: e.target.value })}
          />
        </div>
        <div className='flex gap-2'>
          <p className='text-[#11151A99] text-[14px]'>Version :</p>
          <input
            className='text-sm w-[80px] border-b border-gray-400 focus:outline-none focus:border-black'
            value={flow?.version ?? ''}
            onChange={e => updateFlowInfo({ version: e.target.value })}
          />
        </div>
      </div>
      <Button onClick={handleSave} variant='contained' className='flex items-center justify-center w-[144px]'>
        บันทึก
      </Button>
    </>
  )
}

export default NavBarFlow
