'use client'

import { Suspense } from "react"
import SuccessPageComponent from "./SuccessPage"

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageComponent />
    </Suspense>
  )
}