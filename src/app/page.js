import Login from "./components/login";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-white">Welcome to Trustflow</h1>
      <div className="flex justify-center items-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <Login />
        </div>
      </div>
    </div>
  );
}
