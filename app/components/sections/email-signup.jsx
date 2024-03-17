'use client'

import _ from 'lodash'
import React from 'react'
import Link from 'next/link'

export function EmailSignup({ data, settings }) {
  const { fields } = data

  return (
    <section className="relative z-100 py-2 md:py-14">
      <div className="container relative z-1 mx-auto max-w-8xl text-left">
        <div className="border p-4 md:p-8 lg:p-12 xl:flex xl:items-center bg-white">
          <div className="xl:-mt-2 xl:w-0 xl:flex-1">
            {/* title */}
            <h2 className="font-heading font-normal text-gray-900 text-2xl md:text-4xl">{fields.title}</h2>
          </div>
          <div className="mt-8 sm:max-w-lg xl:mt-0 xl:ml-8">
            <form name="form1294" className="wufoo sm:flex" acceptCharset="UTF-8" autoComplete="off" encType="multipart/form-data" method="post" action={_.get(settings, 'fields.wufooEmailSignupFormUrl')}>
              <label htmlFor="emailAddress" className="sr-only">Email address</label>
              <input id="Field6" name="Field6" spellCheck="false" type="email" autoComplete="email" maxLength="255" required="" className="w-full border-gray-300 px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700" placeholder="Enter your email" />
              <button id="saveForm" name="saveForm" type="submit" className="button mt-3 flex w-full border-transparent bg-primary text-white hover:border-transparent hover:bg-primary-600 hover:text-white focus:ring-white focus:ring-offset-primary-600 sm:ml-3 sm:mt-0 sm:w-auto sm:flex-shrink-0">Subscribe</button>

              <div className="hidden">
                <label htmlFor="comment">Do Not Fill This Out</label>
                <textarea name="comment" id="comment" rows="1" cols="1"></textarea>
                <input type="hidden" id="idstamp" name="idstamp" value={_.get(settings, 'fields.wufooEmailSignupFormPassword')} />
                <input type="hidden" id="encryptedPassword" name="encryptedPassword" value="" />
              </div>
            </form>

            <p className="mt-3 text-center text-sm text-gray-400">
              We care about the protection of your data. Read our
              <Link href="/privacy-policy" target="_blank" className="font-bold text-secondary-200 hover:text-gray-600"> Privacy Policy. </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
