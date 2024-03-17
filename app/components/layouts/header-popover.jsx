'use client'

import React, { Fragment } from 'react'
import Link from 'next/link';
import _ from 'lodash'
import Image from 'next/image';
// tailwind
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// components
import { ButtonLink, MobileSubNav } from '@/components/layouts'

export function HeaderPopover({ navigation, general }) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <div className="container bg-white flex max-w-screen-2xl items-center justify-between py-4">
            <Link href="/" className="xl:flex xl:pb-2">
              <Image 
                className="h-14 w-auto" 
                src="https://fluxconsole.com/files/item/1334/177514/mobile-logo-2.svg" 
                alt={_.get(general, 'organizationName')}
                height={500}
                width={500}
              />
            </Link>
            <div className="flex items-end justify-end xl:flex-col">
            <div className="flex items-center">
                <div className="ml-8 hidden space-x-3 md:flex">
                  <a href="/contact" className="button inline-flex border-primary text-gray-700 hover:bg-primary hover:text-white focus:ring-primary">Get Started</a>
                </div>
              </div>
              <div className="ml-6 xl:hidden">
                <Popover.Button className="inline-flex items-center justify-center border-2 p-2 text-gray hover:border-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition xl:hidden"
            >
              {({ close }) => (
                <div className="overflow-hidden bg-white shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <Link href="/">
                      <Image
                        src="https://fluxconsole.com/files/item/1334/177514/mobile-logo-2.svg"
                        alt={_.get(general, 'organizationName')}
                        height={1000}
                        width={1000}
                        className="h-12 w-auto"
                      />
                    </Link>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close main menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="py-4 space-y-1 px-2 pt-2 pb-3 max-h-[700px] overflow-y-scroll">
                    {
                      navigation?.map((item, i) => {
                        if (_.get(item, 'parentId') === 0) {
                          const subNav = _.filter(navigation, data => data.parentId === item.id);

                          if (subNav.length === 0) {
                            return (
                              <div
                                onClick={() => close()}
                                key={item.name}
                              >
                                <ButtonLink
                                  className="block w-full py-2 pl-8 pr-4 uppercase tracking-wide text-gray-900 hover:bg-gray-100"
                                  navigation={navigation}
                                  data={{
                                  button: {
                                      url: _.get(item, 'fields.nav.url') ? _.get(item, 'fields.nav.url') : item.slug,
                                      text: item.name,
                                      target: _.get(item, 'fields.nav.target'),
                                    },
                                    buttonPageLink: _.get(item, 'fields.pageLink'),
                                  }}
                                  key={item.name}
                                />
                              </div>
                            )
                          }

                          return <MobileSubNav item={item} subNav={subNav} key={item.name} closeMenu={() => close()} navigation={navigation}/>
                        }
                      })
                    }
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
