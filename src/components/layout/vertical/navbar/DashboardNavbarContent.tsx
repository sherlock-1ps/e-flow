'use client'
import { useState } from 'react'

import { InsertDriveFileOutlined, AccountTreeOutlined } from '@mui/icons-material'

// Component Imports

// Util Imports
import type { SelectChangeEvent } from '@mui/material'
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import NavToggle from '../NavToggle'

const DashboardNavbarContent = () => {
  const router = useRouter()
  const { lang: locale } = useParams()

  return (
    <Card>
      <CardContent className='flex gap-2 items-center justify-end'>
        {/* <NavToggle /> */}
        <Button variant='contained' className='capitalize' startIcon={<InsertDriveFileOutlined />} color='secondary'>
          จัดการแบบฟอร์ม
        </Button>
        <Button variant='contained' className='capitalize' startIcon={<AccountTreeOutlined />}>
          จัดการเวิร์กโฟลว์
        </Button>
      </CardContent>
    </Card>
  )
}

export default DashboardNavbarContent
