'use client'

import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import _ from 'lodash'

export function ModalCarousel({ images, current, open, onClose }) {
  const [curr, setCurr] = useState(0)

  useEffect(() => {
    setCurr(current)
  }, [current])

  const prev = () => {
    setCurr(curr === 0 ? images.length - 1 : curr - 1)
  }

  const next = () => {
    setCurr(curr === images.length - 1 ? 0 : curr + 1)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10000" onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left transition-all w-full h-[90vh]">
                <div className="absolute z-1000 top-0 right-0  pt-4 pr-4 block">
                  <button
                    type="button"
                    className="rounded-md text-white hover:border hover:border-white"
                    onClick={() => onClose()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="grid h-full w-full justify-center items-center">
                  <div className="max-w-screen-xl">
                    <div className="overflow-hidden relative">
                      <div className="transition-transfrom items-center justify-center ease-out duration-500">
                        <Image
                          src={_.get(images[curr], 'file.imageUrl')}
                          alt={_.get(images[curr], 'fields.altText')}
                          height={1000}
                          width={1000}
                          priority={true}
                          className="object-center w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-between">
                  <button onClick={prev} className="">
                    <i className="fa-solid fa-circle-arrow-left text-4xl text-white opacity-70 hover:opacity-100"></i>
                  </button>
                  <button onClick={next} className="">
                    <i className="fa-solid fa-circle-arrow-right text-4xl text-white opacity-70 hover:opacity-100"></i>
                  </button>
                </div>

                <div className="absolute bottom-4 right-0 left-0">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {images.map((_, i) => (
                      <div onClick={() => setCurr(i)} className={`cursor-pointer transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2": "bg-opacity-50"}`} key={i}/>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
