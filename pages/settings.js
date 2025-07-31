export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Settings / Profile</h1>
      <div className="w-full max-w-md bg-white rounded shadow p-6 flex flex-col gap-4">
        <div>
          <label className="font-semibold">Email:</label>
          <div className="bg-gray-100 p-2 rounded mt-1">user@email.com (placeholder)</div>
        </div>
        <div>
          <label className="font-semibold">Export Data:</label>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-1">Export</button>
        </div>
        <div>
          <label className="font-semibold">Notifications:</label>
          <div className="flex gap-2 mt-1">
            <input type="checkbox" id="reminders" />
            <label htmlFor="reminders">Enable daily reminders</label>
          </div>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
} 