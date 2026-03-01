export default function Tooltip({ content, children }) {
    return (
        <div className="relative group inline-block">
            {children}

            <div className="
        absolute z-50 hidden group-hover:block
        bottom-full left-1/2 -translate-x-1/2 mb-2
        w-max max-w-xs
        bg-slate-900 text-white text-xs
        rounded-lg shadow-lg
        px-3 py-2
      ">
                {content}
            </div>
        </div>
    );
}