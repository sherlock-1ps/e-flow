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
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiZmI1OWEzNmM4N2E2NzY0MmVkNTM3ZWRlZjNjYTI0MTU1ZWJlY2U3Yjk3OWU5NGYzZjZjN2ZhOTlkZDZmYmY0ZTdlMjIwYzM4NjQ5NWMwNzYiLCJpYXQiOjE3NDg4NDIzNjIuMDEzNTkyLCJuYmYiOjE3NDg4NDIzNjIuMDEzNTk1LCJleHAiOjE3ODAzNzgzNjEuOTk5Njc3LCJzdWIiOiI1MTUyMiIsInNjb3BlcyI6W119.WdbbRyLxSpiEOB1-lLQjzmcj8vywTFsGdQ8jTIsBUA6Yzq_SlqAkk0lPFPfKRp-_fvOPGnPuJz0uJlO-yAyvGojREXDPPq8NNkZ5fYUJnDgNzANV8ggnK8Zq2AqqkY6xC6N5j2uG0LU4ecy6tud7ZyrCFnX-j0IRqQrS4oc94MlFB57m703f8ozjIO5xfzTQvjOsBfFxv9jAAvsy6w8tAKyBlbYkF4I9xlebeqD_mDxJr301tnPc-jQ9Ql_LZlFLYPiSJ3CYwxQ127sZR7qWylkHMG076HyxKcJ0rvksC-yYX-cAKT1aZWVfBcECLSu24DY5zt3QKlsLXvqDXmp_nz06B15DBRh8wk_wIOoFMHnRMX9-KjprDYJz9L4jsNY3y49ExJzudpgLVjWmks3YuV3mOpJ3eKTpi38eWiVdfVaVtqWlQ9etqrconOIW3se8IBEovX8NODnMpKTeDnJxoh3NK0nS4G-Nllg6jplV5QH6PAlhJk2h4Cw24lAbacqCCJl6g_M1i2jmBJrL-sJ8Rkgf_uAIxMcre42ZdFvxg2M_YSmzslJ5FHkpGlbQfqwcZi9id6uWPZIQsPtHfb2bbOQkuDK9ZIpMQAUS0tSbc2S3LIBkK-rYe3FeH9MDMwQO16SZjZyd5ahc2GLOZzow9Qw5e2EN7HTU-8ymg9ixtfw'
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
