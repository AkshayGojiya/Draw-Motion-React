import React, { useState } from "react";
import { motion } from "framer-motion";
import { Aperture as Gesture, Pointer as Paintbrush, Waves } from "lucide-react";
import AuthModal from "./components/AuthModal";
import ProfileModal from "./components/ProfileModal";
import DrawingCanvas from "./components/DrawingCanvas";
import CameraFeed from "./components/CameraFeed";

function App() {
  const [authModalType, setAuthModalType] = useState<"login" | "register" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Handle login and register (mock authentication)
  const handleAuth = (name: string, email: string) => {
    setUser({ name, email });
    setIsLoggedIn(true);
    setAuthModalType(null);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setShowProfile(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navbar */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center mb-6">
          <span className="text-white text-3xl font-bold">Draw Motion</span>
          <div className="space-x-6">
            {!isDrawing && (
              <>
                <a href="features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="demo" className="text-gray-300 hover:text-white transition-colors">
                  Demo
                </a>
              </>
            )}
            {!isLoggedIn ? (
              <button
                onClick={() => setAuthModalType("login")}
                className="bg-white text-purple-900 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setShowProfile(true)}
                className="bg-white text-purple-900 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Profile
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Show Drawing Area if "Start Drawing" is clicked */}
      {isDrawing ? (
        <div className="flex justify-center items-center min-h-[80vh] gap-10 px-6 mx-16">
        <CameraFeed />
        <DrawingCanvas />
      </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 mx-auto"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Draw in the Air with Your Hands
              </h1>
              <p className="text-gray-300 text-xl mb-8">
                Experience real-time hand tracking to create stunning artwork using just your hand movements.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-white text-purple-900 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  onClick={() => setIsDrawing(true)}
                >
                  Start Drawing
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-900 transition-colors">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <section id="features" className="py-20 bg-black/20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-white text-center mb-16">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Gesture className="w-8 h-8" />}
                  title="Real-time Tracking"
                  description="Advanced hand tracking technology that responds instantly to your movements"
                />
                <FeatureCard
                  icon={<Paintbrush className="w-8 h-8" />}
                  title="Digital Canvas"
                  description="Create artwork on a limitless digital canvas with various brush styles"
                />
                <FeatureCard
                  icon={<Waves className="w-8 h-8" />}
                  title="Gesture Controls"
                  description="Intuitive gesture controls for drawing, erasing, and changing colors"
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Authentication Modals */}
      {authModalType && (
        <AuthModal
          type={authModalType}
          setModalType={setAuthModalType}
          onClose={() => setAuthModalType(null)}
          onAuth={handleAuth}
        />
      )}

      {/* Profile Modal */}
      {showProfile && user && (
        <ProfileModal user={user} onLogout={handleLogout} onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white/10 p-6 rounded-xl backdrop-blur-lg border border-white/10">
      <div className="text-white mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}

export default App;
