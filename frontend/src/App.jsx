import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer"; // 👈 import your Footer component

export default function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {/* Main Content */}
        <div className="flex-grow">
          <AppRoutes />
        </div>

        {/* Footer (always at the bottom) */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
