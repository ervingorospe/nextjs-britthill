'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
// functions
import { splitWuffooForm } from '@/function/embed-codes'

export function FormWufoo({ data, className, titleText }) {
  const { fields } = data

  const [wufooForm, setWufooForm] = useState({})

  useEffect(() => {
    if (fields.embed)
      setWufooForm(splitWuffooForm(fields.embed))
  }, [fields.embed])

  return (
    <div>
      {
        fields.embed && (
          <div className={className}>
            {
              titleText && (
                <p className="text-center font-bold text-4xl p-4 text-gray-700">{titleText}</p>
              )
            }
            
            <div className="w-full">
              <div dangerouslySetInnerHTML={{__html: wufooForm.divElement}}/>
              <Script
                id="form-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: eval(`${wufooForm.scriptCode}`),
                }}
              />
            </div>
          </div>
        )
      }
    </div>
  )
}
