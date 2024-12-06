// components/Loading.js
export default function LoadingFornt() {
  return (
    <div className="flex justify-center items-center h-auto w-full">
      <div className="flex flex-col items-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-orange-600 rounded-full border-t-transparent mb-4" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-lg text-orange-600 font-semibold uppercase">Loading...</p>
      </div>
    </div>
  );
}
