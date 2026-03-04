
const PremiumButton = ({
  onClick,
  icon: Icon,
  label,
  statsCount,
  statsIcon: StatsIcon,
  className = "",
  type = "button",
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-200 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:bg-[length:200%] before:blur-[calc(0.8*1rem)] before:content-[""] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:scale-105 active:scale-95 h-11 px-6 py-2 inline-flex ${className}`}
    >
      <div className="flex items-center relative z-10">
        {Icon && <Icon size={18} className="text-white group-hover:rotate-90 transition-transform duration-300" />}
        <span className={`${Icon ? 'ml-2' : ''} text-white font-bold`}>{label}</span>
      </div>

      {statsCount !== undefined && (
        <div className="ml-4 flex items-center gap-1.5 text-sm md:flex relative z-10 bg-white/10 dark:bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
          {StatsIcon && <StatsIcon size={14} className="text-gray-400 transition-all duration-300 group-hover:text-yellow-400 group-hover:scale-110" />}
          <span className="inline-block tabular-nums tracking-wider font-bold text-white">
            {statsCount}
          </span>
        </div>
      )}
    </button>
  );
};

export default PremiumButton;
