export const Checkbox = ({ checked, onClick, children }) => {
  return (
    <>
      <div className="flex cursor-pointer" onClick={onClick}>
        {checked ? (
          <img src="/img/ic_checkbox_s.svg" className="mr-1 w-4 h-4" />
        ) : (
          <img src="/img/ic_checkbox_n.svg" className="mr-1 w-4 h-4" />
        )}
        {children}
      </div>
    </>
  )
}
