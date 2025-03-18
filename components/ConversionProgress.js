export default function ConversionProgress({ progress, status }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {status}
        </h3>
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <div 
                style={{ width: `${progress}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-300"
              ></div>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold inline-block text-indigo-600">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
