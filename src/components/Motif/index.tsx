import React from 'react'

export const Motif: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const sizes = { sm: 'text-sm', md: 'text-xl', lg: 'text-3xl' }
  return (
    <span className={`text-accent inline-block ${sizes[size]} ${className}`} aria-hidden="true">
      ⚗
    </span>
  )
}

export const Divider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-4 my-8 ${className}`}>
    <div className="flex-1 h-px bg-rule" />
    <Motif size="sm" />
    <div className="flex-1 h-px bg-rule" />
  </div>
)
