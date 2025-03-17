export default function DownloadPanel({ svgUrl, fileSize, isReady }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Download SVG</h2>
          {fileSize && (
            <p className="text-sm text-gray-500 mt-1">File size: {(fileSize / 1024).toFixed(1)} KB</p>
          )}
        </div>
        
        <a
          href={svgUrl}
          download="vtracer-converted.svg"
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            !isReady ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
          }`}
          onClick={(e) => !isReady && e.preventDefault()}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download SVG
        </a>
      </div>
    </div>
  ) ;
}
