import { useState, useEffect } from "react"
import { Document, Page } from "react-pdf"
import { pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const loading = () => {
  return (
    <svg className="animate-spin ml-1 mr-3 h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#000000" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="#000000"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

const get_window_height = () => {
  const [windowWidth, setwindowWidth] = useState(undefined)
  const [windowHeight, setwindowHeight] = useState(undefined)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setwindowWidth(window.innerWidth)
        setwindowHeight(window.innerHeight)
      }

      window.addEventListener("resize", () => handleResize)

      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize)
    }
  }, []) // Empty array ensures that effect is only run on mount
  return windowHeight
}

const PDFDocument = (props) => {
  const pdf_url = "/pdf/9주차 3번문제.pdf"
  const window_height = get_window_height()
  const [binaryPDF, setBinaryPDF] = useState(undefined)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBinaryPDF(window.atob(props.pdf_binary))
    }
  }, [])

  return (
    <Document file={pdf_url} loading={loading} renderMode="svg" options={{ data: binaryPDF }}>
      <Page pageNumber={1} height={window_height * 0.7} />
    </Document>
  )
}

export default PDFDocument
