import { cn } from '@/utils/helpers'
import { useMagneticButton } from '@/components/animations/useGSAP'

const variants = {
  primary: 'bg-[var(--green)] text-black hover:bg-[#5aff3a] font-bold',
  outline: 'border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black bg-transparent',
  ghost:   'text-[var(--text-muted)] hover:text-[var(--green)] bg-transparent',
  danger:  'bg-[#CC2200] text-white hover:bg-[#FF4500] font-bold border border-[#FF4500]',
  glass:   'glass text-[var(--green)] hover:bg-[var(--green)] hover:text-black',
}
const sizes = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-xs',
  lg: 'px-10 py-4 text-sm',
  xl: 'px-14 py-5 text-sm',
}

export default function Button({ children, variant='primary', size='md', magnetic=true, className, href, icon, iconRight, onClick, ...props }) {
  const ref = useMagneticButton(magnetic ? 0.3 : 0)
  const clip = 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)'
  const base = cn(
    'relative inline-flex items-center justify-center gap-2.5',
    'font-mono tracking-widest uppercase transition-all duration-300 cursor-none overflow-hidden',
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--green)]',
    variants[variant], sizes[size], className,
  )
  const Tag = href ? 'a' : 'button'
  return (
    <div ref={ref} className="inline-block" style={{ clipPath: clip }}>
      <Tag href={href} onClick={onClick} className={base} style={{ clipPath: clip }} {...props}>
        <span className="absolute inset-0 translate-x-[-110%] hover:translate-x-[110%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-600 pointer-events-none" />
        {icon && <span className="relative z-10">{icon}</span>}
        <span className="relative z-10">{children}</span>
        {iconRight && <span className="relative z-10">{iconRight}</span>}
      </Tag>
    </div>
  )
}
