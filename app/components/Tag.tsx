import { useMemo } from "react"

type TagProps = {
  options: string[]
  value?: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean
  checkable?: boolean
  removeDuplicates?: boolean
  showCount?: boolean
  className?: string
}

const Tag = ({ options, value = [], onChange, multiple = false, checkable = false, className = '', removeDuplicates = true, showCount = false }: TagProps) => {
  const filteredOptions = useMemo(() => removeDuplicates ? [...new Set(options)] : options, [options, removeDuplicates])
  
  const handleChange = (tag: string) => {
    if (!checkable) return;
    
    if (multiple) {
      const result = value.includes(tag)
        ? value.filter((t) => t !== tag)
        : value.concat(tag)
      onChange?.(result)
    } else {
      onChange?.([tag])
    }
  }

  const isActive = (tag: string) => value.includes(tag)

  const tagLength = (tag: string) => options.filter((t) => t === tag).length

  return (
    <span className={`flex flex-wrap gap-2 text-sm font-medium ${className}`}>
      {filteredOptions.map((tag) => (
        <span 
          key={tag} 
          className={`px-2 py-0.5 rounded-full text-xs font-mono ${checkable ? 'cursor-pointer' : ''} transition-colors ${isActive(tag) ? 'bg-green-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'}`} 
          onClick={() => handleChange(tag)}
          role="button"
          >
          {tag} 
          {showCount && `(${tagLength(tag)})`}
        </span>
      ))}
    </span>
  )
}

export { Tag }
