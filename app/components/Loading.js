// components/Loading.js
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-sky-600 rounded-full border-t-transparent mb-4" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-lg text-sky-600 font-semibold uppercase">GM SKY Loading...</p>
      </div>
    </div>
  );
}
