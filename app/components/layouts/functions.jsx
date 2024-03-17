'use client'

import React, { Fragment } from 'react';
import Link from 'next/link'
import _ from 'lodash'
import { Popover, Transition } from '@headlessui/react'
// function
import { buttonNav } from '@/function/navigation'

export const Nav = ({ navigation, className }) => {
  return (
    <nav>
      <ul>
        {
          navigation?.map(item => {
            if (_.get(item, 'parentId') === 0){
              const subNav = _.filter(navigation, data => data.parentId === item.id);

              if (subNav.length === 0) {
                return (
                  <ButtonLink
                    className={className}
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
                )
              }

              return (
                <SubNav
                  navigation={navigation}
                  item={item}
                  subNav={subNav}
                  key={item.name}
                />
              )
            }
          })
        }
      </ul>
    </nav>
  )
}

export const SubNav = ({ navigation, className, item, subNav }) => {
  return (
    <Popover
      className="group relative"
    >
      {({ open }) => (
        <>
          <Popover.Button styles={{ border: 'none !important;' }} className="cursor-pointer w-full text-gray-900 hover:bg-gray-100">
            <span className="flex items-center w-full py-2 pl-8 pr-4 uppercase tracking-wide ">
              <span>{item.name}</span>
              <svg
                className={`group-hover/child-nav:text-link-hover text-link ml-2 h-5 w-5 fill-current transition-transform ${open ? 'rotate-180 text-link-hover' : ''}`}
                x-description="Heroicon name: solid/chevron-down"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              className="block"
              static
            >
              {({ close }) => (
                <div className="relative grid">
                  {
                    subNav?.map(subItem => {
                      if (_.get(subItem, 'fields.showInNavigation')) 
                        return (
                          <div
                            onClick={() => close()}
                            key={subItem.name}
                          >
                            <SubNavButton
                              className="group/child-nav flex items-center hover:bg-gray-100"
                              data={{
                                button: {
                                  url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                                  text: subItem.name,
                                  target: _.get(subItem, 'fields.nav.target'),
                                },
                                buttonPageLink: _.get(subItem, 'fields.pageLink'),
                              }}
                              navigation={navigation}
                            />
                          </div>
                        )
                    })
                  }
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}


export const ButtonLink = ({ data, className, navigation }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ? `/${_.get(data, 'button.url')}` : '/'
  }

  if (data.buttonPageLink) {
    buttonDetails = buttonNav(navigation, data)
  }

  return (
    <Link href={buttonDetails.url} className={className} target={buttonDetails.target}>
      {buttonDetails.text}
    </Link>
  )
}

const SubNavButton = ({ data, className, navigation }) => {
  let buttonDetails = {
    ..._.get(data, 'button'),
    url: _.get(data, 'button.url') ? `/${_.get(data, 'button.url')}` : '/'
  }

  if (data.buttonPageLink) {
    buttonDetails = buttonNav(navigation, data)
  }

  return (
    <Link href={buttonDetails.url} className={className} target={buttonDetails.target}>
      <div className="ml-3 flex items-center gap-3 transition-all">
        <p className="group-hover/child-nav:text-black text-gray-700 py-2 pl-8 pr-4 text-[15px]">
          {buttonDetails.text}
        </p>
      </div>
    </Link>
  )
}

export const MobileSubNav = ({ item, subNav, closeMenu, navigation }) => {
  return (
    <Popover
      className="group relative"
    >
      {({ open }) => (
        <>
          <Popover.Button styles={{ border: 'none !important;' }} className="cursor-pointer w-full block">
            <div
              className="flex w-full py-2 pl-8 pr-4 uppercase tracking-wide text-gray-900 hover:bg-gray-100"
            >
              <span>{item.name}</span>
              <svg
                className={`group-hover/child-nav:text-link-hover text-link ml-2 h-5 w-5 fill-current transition-transform ${open ? 'rotate-180 text-link-hover' : ''}`}
                x-description="Heroicon name: solid/chevron-down"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              className="w-full"
              static
            >
              {({ close }) => (
                <div className="relative overflow-hidden">
                  <span
                    className="is-block absolute left-1/2 -top-2 -ml-3"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-[8px] w-[20px] fill-current text-primary-400"
                      viewBox="0 0 5 2"
                      preserveAspectRatio="none"
                    >
                      <path d="M 0 2 L 2.5 0 L 5 2 Z"></path>
                    </svg>
                  </span>
                  <div className="ml-2 relative grid">
                    {
                      subNav?.map((subItem, i) => {
                        return (
                          <div
                            onClick={() => closeMenu()}
                            key={subItem.name}
                          >
                            <SubNavButton
                              className="group/child-nav flex items-center hover:bg-gray-100"
                              data={{
                                button: {
                                  url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                                  text: subItem.name,
                                  target: _.get(subItem, 'fields.nav.target'),
                                },
                                buttonPageLink: _.get(subItem, 'fields.pageLink'),
                              }}
                              navigation={navigation}
                            />
                          </div>
                        )
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