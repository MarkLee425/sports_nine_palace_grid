import { QueryClient, QueryClientProvider } from "react-query";
import { NineSquareGrid } from "./components/NineSquareGrid";
import Navbar from "./components/Navbar";

function App() {
  const queryClient = new QueryClient();

  /* inset-0 bg-gray-500 bg-opacity-75 transition-opacity */
  return (
    <>
      <main className="flex flex-col w-full exit-popup">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div className="container mt-[60px] flex justify-center">
            {/* <Popup /> */}
            <NineSquareGrid />
          </div>
        </QueryClientProvider>
      </main>
    </>
  );
}

export default App;
