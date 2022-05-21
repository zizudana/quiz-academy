export const ButtonNormal = ({ className, onClick, children }) => {
  return (
    <>
      <style jsx>{`
        button:hover {
          background-color: #dde3fa;
          border-color: transparent;
        }
      `}</style>
      <button
        className={`border py-3 border-color-main-1 text-color-main-1 font-bold focus:outline-none ${className}`}
        style={{
          fontSize: "16px",
          borderRadius: "6px",
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export const DisabledButton = ({ className, children }) => {
  return (
    <>
      <button
        className={`border py-3 border-color-black-4 text-color-black-4 font-bold focus:outline-none cursor-default ${className}`}
        style={{
          fontSize: "16px",
          borderRadius: "6px",
        }}
      >
        {children}
      </button>
    </>
  )
}
