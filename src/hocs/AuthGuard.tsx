/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthRedirect from '@/components/AuthRedirect'
import { useAuthStore } from '@/store/useAuthStore'
import type { Locale } from '@configs/i18n'
import type { PropsWithChildren } from 'react'
import PermissionRedirect from './PermissionRedirect'
import { useAuthAccountQueryOption } from '@/queryOptions/auth/authQueryOptions'
import { useDialog } from '@/hooks/useDialog'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'

interface AuthGuardProps extends PropsWithChildren {
  locale: Locale
  session: string | null
}

const AuthGuard = ({ children, locale, session }: AuthGuardProps) => {
  const { showDialog } = useDialog()
  const router = useRouter()
  const accessToken = useAuthStore(state => state.accessToken)
  const profile = useAuthStore(state => state.profile)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [mounted, setMounted] = useState(false)

  const { mutateAsync, isPending } = useAuthAccountQueryOption()

  useEffect(() => {
    console.log('check auth')

    handleCallCheckAuth(
      token ||
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiM2E0NGM5YjhiMDBiZWNiYjA5OTI2MDA3MWMxNjI2NDFjNzMwN2E0ZjVhMDQxY2I2YjlhMzI2NDU3ZTk0OWI2ZjYzZmZiMTk1YjE3MjNhZTQiLCJpYXQiOjE3NDkwMTY5MDguNjQyMzY0LCJuYmYiOjE3NDkwMTY5MDguNjQyMzY3LCJleHAiOjE3ODA1NTI5MDguNjMxODU0LCJzdWIiOiI1MTUyMiIsInNjb3BlcyI6W119.LK2NR70o0ofqNoNHXPI6FNGDavXij6KNrDsnTQ_1xZOart2U_BXioqmih-I8IQBSwG9AVHBXfcjYh3pgqtCz4Y_aFG3GmQFxVsZ0oFzXHLQ3iOO1372MeVpOLdcsaGQSUweq4g4nkEP8wzu8Obl4NIxby1QZhSiPxGAVsCT0-ICNAAZIDiqmQKJCul1IihWNLMd2l28nG3TqC3m_wF70LSO_J7Of8HuPG863nV5Hf2CR0g9Fd6ewjqpt28x96_e6tRx-BbCO3gRhEqr1K6c5R4ZDjqX7ra1mDQ9SOBWDaP99qNLV_U-dkLG-z4CDB3UKm8JUbf56-KRuCQwR-jKnsl0grDJ8Yq6tWn7aZ6n2y-12GWpm1CN8YSBDLfcPI6U3sU2DwOeg9ZvC-V6mZkzU8RO1whPh92E2dtFwkKgmvhRbx8cqhIezt3x6sym8mQVvedrApZkaCRgIYlyNSr3NsIR8yjay9IKWQTwQrzMycArfOc7q96uQ_NfzOCipriEBKviWVNhUsH1ogIddoPwjoNlHauKd9cbnXTBoJbAsvnDWUPy7XCAmE1j97skLoc4yUKGIM9oSuF7C-G80-AOBtvtVbjhlCVW2qWHi0mg_9bT9V-BXilj3HBvzKXccNgiimxSBLetyFZUnJA6rs90uE9eE06HkPXTQs_2nNAkQg00'
    )
  }, [])

  const handleCallCheckAuth = async (key: any) => {
    try {
      const response = await mutateAsync({ token: key })
      if (response.code == 'SUCCESS') {
        useAuthStore.getState().setTokens(response?.result?.data?.accessToken)
        setMounted(true)
      }
    } catch (error) {
      showDialog({
        id: 'alertErrorToken',
        component: (
          <ConfirmAlert
            id='alertErrorToken'
            title={'Invailid JWT'}
            content1={'please login again!'}
            onClick={() => {
              alert('fill jwt in url')
            }}
          />
        ),
        size: 'sm'
      })
    }
  }

  if (!mounted) return null

  // const isLoggedIn = !!session && !!accessToken && !!profile
  const isLoggedIn = !!accessToken && !!profile

  // console.log('isLoggedIn', isLoggedIn)
  // console.log('accessToken', accessToken)
  // console.log('profile', profile)

  // return isLoggedIn ? (
  //   <PermissionRedirect lang={locale} permission={profile?.permission}>
  //     {children}
  //   </PermissionRedirect>
  // ) : (
  //   <AuthRedirect lang={locale} />
  // )

  return <>{children}</>
}

export default AuthGuard
