import { motion } from "framer-motion";
import HistoryModal from "./HistoryModal";
import { useState } from "react";

function ProfileModal({ user, onLogout, onClose }: { 
    user: { name: string; email: string }; 
    onLogout: () => void; 
    onClose: () => void 
  }) {
    const [showHistory, setShowHistory] = useState(false);
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
        {!showHistory && <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.3 }} 
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full" 
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg w-full" onClick={() => setShowHistory(true)}>View History</button>
          <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg w-full mt-4">Logout</button>

        </motion.div>}
        {showHistory && <HistoryModal userId={user.id} onClose={() => setShowHistory(false)} />}
      </div>
    );
  }
  
  export default ProfileModal;
  