'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export function BackButton() {
  let pathname = usePathname();
  const splitPath = pathname.split('/')
  const previous = splitPath.slice(0, -1).join("/")

  return (
    <div className="flex mt-4 ml-2">
      <Link href={previous} >
        <div className="px-4 py-3.5 bg-primary-200 rounded-full hover:bg-primary-300 transition duration-150 ease-in-out">
          <i className="text-xl fa-solid fa-arrow-left"></i>
        </div>
      </Link>
    </div>
  )
}
