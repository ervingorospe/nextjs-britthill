'use client'

import React, { useState, useEffect  } from 'react'
import { ImageHolder } from '@/components/shared'
import { motion } from "framer-motion";

export function BeforeAndAfter({ data }) {
  const [showAfter, setShowAfter] = useState(false)

  useEffect(() => {
    const delayedFunction = () => {
      setShowAfter(!showAfter)
    };

    // Call setTimeout to delay the execution of the function
    const timeoutId = setTimeout(delayedFunction, 4000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [showAfter])

  return (
    <div className="mb-6 group relative aspect-w-16 aspect-h-9 bg-black overflow-hidden">
      <div className="absolute inset-0 blur-md brightness-50">
        <ImageHolder
          image={showAfter ? _.get(data, 'fields.afterImage') : _.get(data, 'fields.beforeImage')} 
          className={{
            figure: "w-full h-full",
            image: "object-cover object-center"
          }}
        />
      </div>
      <motion.div className="absolute w-full h-full"
        initial={{ opacity: 1 }}
        animate={{ opacity: showAfter ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <ImageHolder
          image={_.get(data, 'fields.beforeImage')} 
          className={{
            figure: "aspect-w-16 aspect-h-9",
            image: "mx-auto h-full w-auto"
          }}
        />
      </motion.div>

      <motion.div className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: showAfter ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ImageHolder
          image={_.get(data, 'fields.afterImage')} 
          className={{
            figure: "aspect-w-16 aspect-h-9",
            image: "mx-auto h-full w-auto"
          }}
        />
      </motion.div>

      <div className={`absolute bottom-0 ${showAfter ? 'left-0' : 'right-0'}`}>
        <button onClick={() => setShowAfter(!showAfter)} className="button bg-primary-700 text-white">
          { showAfter ? "Show Before" : "Show After" }
        </button>
      </div>
    </div>
  )
}
