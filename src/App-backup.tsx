import React, { useState } from "react";
import { motion } from "framer-motion";
import { Aperture as Gesture, Pointer as Paintbrush, Waves } from "lucide-react";
import AuthModal from "./components/AuthModal";
import ProfileModal from "./components/ProfileModal";

function App() {
  const [authModalType, setAuthModalType] = useState<"login" | "register" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showProfile, setShowProfile] = useState(false);

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
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            {/* <HandPointer className="w-10 h-10 text-white" /> */}
            <span className="text-white text-3xl font-bold">Draw Motion</span>
          </div>
          <div className="space-x-6">
            <a href="features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
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

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Draw in the Air with Your Hands
            </h1>
            <p className="text-gray-300 text-xl mb-8">
              Experience the future of digital art with our real-time hand tracking technology.
              Create stunning artwork using just your hand movements in the air.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-purple-900 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Start Drawing
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-900 transition-colors">
                Watch Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="w-full h-[400px] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80"
                  alt="Hand drawing in air"
                  className="rounded-xl w-[80%] h-[80%] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
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
