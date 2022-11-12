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

export const ButtonNext = ({ className, onClick, children }) => {
	return (
	  <>
		 <style jsx>{`
			button:hover {
			  background-color: #dde3fa;
			  border-color: transparent;
			}
		 `}</style>
		 <button
			className={`border py-3 border-color-main-2 text-color-main-1 font-bold focus:outline-none ${className}`}
			style={{
			  backgroundColor : "#EEF3FC",
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

export const ButtonGreen = ({ className, onClick, children }) => {
	return (
	  <>
		 <style jsx>{`
			button:hover {
			  background-color: #daf5da;
			  border-color: transparent;
			}
		 `}</style>
		 <button
			className={`border py-3 border-color-others-3 text-color-others-3 font-bold focus:outline-none ${className}`}
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

 export const ButtonRed = ({ className, onClick, children }) => {
	return (
	  <>
		 <style jsx>{`
			button:hover {
			  background-color: #f7cfcd;
			  border-color: transparent;
			}
		 `}</style>
		 <button
			className={`border py-3 border-color-others-1 text-color-others-1 font-bold focus:outline-none ${className}`}
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
