export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black animate-pulse">
          AxtarGet
        </h1>
        <p className="text-gray-600 mt-4">Yüklənir...</p>
      </div>
    </div>
  );
}
