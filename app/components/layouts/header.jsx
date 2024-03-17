import React from 'react'
import { HeaderAside, HeaderMobile } from '@/components/layouts'

export async function Header() {
  return (
    <>
      <HeaderMobile/>
      <HeaderAside/>
    </>
  )
}
