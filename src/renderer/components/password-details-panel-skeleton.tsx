export default function PasswordDetailsPanelSkeleton() {
  return (
    <div className="h-full flex flex-col animate-pulse">
      {/* Header with icon and name */}
      <div className="p-4 border-b border-gray-800 flex items-center">
        <div className="w-10 h-10 rounded-md bg-gray-700 mr-3"></div>
        <div className="flex-1">
          <div className="h-5 w-32 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-700 opacity-70 rounded"></div>
        </div>
      </div>

      {/* Details content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {/* URL */}
        <div className="mb-6">
          <div className="h-4 w-16 bg-gray-700 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-700 rounded"></div>
        </div>

        {/* Username */}
        <div className="mb-6">
          <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-700 rounded"></div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="h-4 w-16 bg-gray-700 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-700 rounded"></div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <div className="h-4 w-12 bg-gray-700 rounded mb-2"></div>
          <div className="h-20 w-full bg-gray-700 rounded"></div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-700 rounded mr-2"></div>
            <div className="h-4 w-20 bg-gray-700 rounded mr-2"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>

          <div className="flex items-center">
            <div className="h-4 w-4 bg-gray-700 rounded mr-2"></div>
            <div className="h-4 w-24 bg-gray-700 rounded mr-2"></div>
            <div className="h-4 w-20 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
