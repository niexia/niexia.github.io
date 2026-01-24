type TagProps = {
  options: string[]
  value?: string[]
  onChange?: (value: string[]) => void
  multiple?: boolean
  checkable?: boolean
}

const Tag = ({ options, value = [], onChange, multiple = false, checkable = false }: TagProps) => {
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

  return (
    <span className="flex flex-wrap gap-2 text-sm font-medium">
      {options.map((tag) => (
        <span 
          key={tag} 
          className={`px-2 py-0.5 rounded-full text-xs font-mono cursor-pointer transition-colors ${isActive(tag) ? 'bg-green-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'}`} 
          onClick={() => handleChange(tag)}
          role="button"
          >
          {tag}
        </span>
      ))}
    </span>
  )
}

export { Tag }
