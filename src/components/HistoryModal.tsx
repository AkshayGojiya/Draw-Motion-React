import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HistoryModalProps {
  userId: string;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ userId, onClose }) => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // Fetch saved images from the database
    fetch(`http://localhost:5000/api/history/${userId}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.history))
      .catch((err) => console.error("Error fetching history:", err));
  }, [userId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-2xl font-bold mb-4">Your Drawing History</h2>

        {history.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {history.map((image, index) => (
              <img key={index} src={image} alt={`Saved drawing ${index + 1}`} className="rounded-lg shadow-md" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No saved drawings found.</p>
        )}

        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg w-full" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default HistoryModal;
