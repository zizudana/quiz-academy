import { useState } from "react"

export const InputNormal = ({
  type,
  className,
  placeholder,
  user_input,
  set_user_input,
}) => {
  const [is_mouse_over, set_is_mouse_over] = useState(false)
  const [is_focus, set_is_focus] = useState(false)

  return (
    <>
      <div
        className="relative flex"
        onMouseEnter={() => set_is_mouse_over(true)}
        onMouseLeave={() => set_is_mouse_over(false)}
      >
        <input
          type={type}
          className={`px-4 py-3 w-full outline-none focus:outline-none ${className}`}
          style={{
            backgroundColor: "#f4f4f4",
            borderRadius: "6px",
          }}
          placeholder={placeholder}
          onFocus={() => set_is_focus(true)}
          onBlur={() => set_is_focus(false)}
          value={user_input}
          onChange={(e) => set_user_input(e.target.value)}
        />
        {(is_mouse_over || is_focus) && (
          <div
            className="absolute flex h-full right-0 pl-4 pr-4 cursor-pointer"
            onClick={() => set_user_input("")}
          >
            <img src="/img/ic_delete.svg" className="inline w-3" />
          </div>
        )}
      </div>
    </>
  )
}

export const InputError = ({
  type,
  className,
  placeholder,
  message,
  user_input,
  set_user_input,
}) => {
  const [is_mouse_over, set_is_mouse_over] = useState(false)
  const [is_focus, set_is_focus] = useState(false)

  return (
    <>
      <div
        className="relative flex"
        onMouseEnter={() => set_is_mouse_over(true)}
        onMouseLeave={() => set_is_mouse_over(false)}
      >
        <input
          type={type}
          className={`border px-4 py-3 w-full outline-none ${className}`}
          style={{
            backgroundColor: "#f4f4f4",
            borderRadius: "6px",
            borderColor: "#ff6060",
          }}
          placeholder={placeholder}
          onFocus={() => set_is_focus(true)}
          onBlur={() => set_is_focus(false)}
          value={user_input}
          onChange={(e) => set_user_input(e.target.value)}
        />
        {(is_mouse_over || is_focus) && (
          <div
            className="absolute flex h-full right-0 pl-4 pr-4 cursor-pointer"
            onClick={() => set_user_input("")}
          >
            <img src="/img/ic_delete.svg" className="inline w-3" />
          </div>
        )}
      </div>
      <h5 className="text-color-others-1">{message}</h5>
    </>
  )
}
