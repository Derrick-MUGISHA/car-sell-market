import { CarFrontIcon, Dot } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <Link href="/" 
    className="text-3xl items-center gap-2"
    >
        <div className="relative size-7 bg-white rounded-full
        flex items-center justify-center"
        >
            <CarFrontIcon className="w-5 h-5 text-primary" />
            <span className="absolute -bottom-3 -right-2 text-white"
            >
                <Dot />
            </span>
        </div>
        <span className="font-semibold text-base text-white">
            Auto.hunt
        </span>
    </Link>
  )
}

export default page