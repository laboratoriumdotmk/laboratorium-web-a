'use client'
import { useRowLabel } from '@payloadcms/ui'

export const HeaderRowLabel = () => {
  const { data } = useRowLabel<{ link?: { label?: string } }>()
  return <span>{data?.link?.label || 'Nav Item'}</span>
}
