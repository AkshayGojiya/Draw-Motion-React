import { useState } from "react";
import { motion } from "framer-motion";

function AuthModal({ 
  type, 
  setModalType, 
  onClose, 
  onAuth 
}: { 
  type: "login" | "register"; 
  setModalType: (type: "login" | "register") => void; 
  onClose: () => void; 
  onAuth: (name: string, email: string) => void;
}) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = async () => {
    const endpoint = type === "login" ? "/login" : "/register";
    const body = type === "register" ? formData : { email: formData.email, password: formData.password };

    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    if (type === "login") {
      onAuth(data.user.name, data.user.email);
      onClose();
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setModalType("login");
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: isTransitioning ? 0.9 : 1 }} 
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">{type === "login" ? "Login to Draw Motion" : "Register to Draw Motion"}</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        
        {type === "register" && (
          <motion.input 
            type="text" 
            placeholder="Enter your name" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            className="w-full p-2 border rounded-lg mb-3" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <input 
          type="email" 
          placeholder="Enter your email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          className="w-full p-2 border rounded-lg mb-3" 
        />
        <input 
          type="password" 
          placeholder="Enter password" 
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          className="w-full p-2 border rounded-lg mb-3" 
        />
        
        <button 
          onClick={handleSubmit} 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full hover:bg-purple-700 transition-all"
        >
          {type === "login" ? "Login" : "Register"}
        </button>
        
        <p className="text-gray-500 text-sm mt-3 text-center">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setModalType(type === "login" ? "register" : "login");
                setIsTransitioning(false);
              }, 300);
            }}
            className="text-purple-600 hover:underline ml-2"
          >
            {type === "login" ? "Register" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default AuthModal;
