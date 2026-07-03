"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { FaFolder, FaFileAlt, FaTimes, FaCog, FaImage } from "react-icons/fa";

type FileNode = { id: string; name: string; type: "folder" | "file" | "exe" | "image"; content?: string; url?: string };

const FILESYSTEM: Record<string, FileNode[]> = {
  root: [
    { id: "f3", name: "Memories", type: "folder" },
    { id: "e1", name: "NEXT SURPRISE.exe", type: "exe" },
  ],
  f3: [
    { id: "m1", name: "First_Outing.jpg", type: "image", url: "/memories/1.jpg" },
    { id: "m2", name: "First_Practical.jpg", type: "image", url: "/memories/2.jpg" },
    { id: "m4", name: "First_Fest.jpg", type: "image", url: "/memories/4.jpg" },
    { id: "m5", name: "LinkedIn.jpg", type: "image", url: "/memories/5.jpg" },
    { id: "m6", name: "Memory_4.jpg", type: "image", url: "/memories/6.jpg" },
    { id: "m7", name: "Memory_3.jpg", type: "image", url: "/memories/7.jpg" },
    { id: "m8", name: "Memory_2.jpg", type: "image", url: "/memories/8.jpg" },
    { id: "m9", name: "Memory_1.jpg", type: "image", url: "/memories/9.jpg" },
  ]
};

export default function FileExplorer() {
  const setCurrentPhase = useStore((state) => state.setCurrentPhase);
  const [currentPath, setCurrentPath] = useState("root");
  const [openFile, setOpenFile] = useState<FileNode | null>(null);

  const handleDoubleClick = (node: FileNode) => {
    if (node.type === "folder") {
      setCurrentPath(node.id);
    } else if (node.type === "exe") {
      // Launch next phase
      setCurrentPhase(8);
    } else {
      setOpenFile(node);
    }
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col p-4 md:p-12 relative">
      {/* OS Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_transparent_20%,_#000_100%),url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

      {/* Engineer OS Window */}
      <div className="relative w-full h-full bg-[#111] border border-gray-700 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
        
        {/* Title Bar */}
        <div className="h-10 bg-gray-900 border-b border-gray-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
             <span className="text-[var(--color-f1-red)] font-bold">SCUDERIA OS</span>
             <span>//</span>
             <span>{currentPath === 'root' ? 'C:/Users/Champion/Desktop' : `C:/Users/Champion/Desktop/${FILESYSTEM.root.find(f => f.id === currentPath)?.name}`}</span>
          </div>
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-gray-600" />
             <div className="w-3 h-3 rounded-full bg-gray-600" />
             <div className="w-3 h-3 rounded-full bg-[var(--color-f1-red)]" />
          </div>
        </div>

        {/* Desktop / Folder Area */}
        <div className="flex-1 p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 content-start relative">
          
          {/* Back button if in folder */}
          {currentPath !== "root" && (
            <div 
              onDoubleClick={() => setCurrentPath("root")}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border border-transparent group-hover:border-[var(--color-f1-red)] transition-colors">
                 <FaFolder className="text-gray-500 text-3xl" />
              </div>
              <span className="text-white text-xs font-sans font-bold group-hover:bg-[var(--color-f1-red)] px-1 rounded transition-colors">.. (Back)</span>
            </div>
          )}

          {/* Files / Folders */}
          {FILESYSTEM[currentPath]?.map((node) => (
            <div 
              key={node.id} 
              onDoubleClick={() => handleDoubleClick(node)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center border border-transparent group-hover:border-[var(--color-f1-red)] transition-colors relative">
                 {node.type === "folder" && <FaFolder className="text-[var(--color-f1-red)] text-3xl" />}
                 {node.type === "file" && <FaFileAlt className="text-gray-300 text-3xl" />}
                 {node.type === "image" && <FaImage className="text-blue-300 text-3xl" />}
                 {node.type === "exe" && <FaCog className="text-[var(--color-f1-silver)] text-3xl animate-[spin_10s_linear_infinite]" />}
                 {node.type === "exe" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-f1-red)] rounded-full animate-ping" />
                 )}
              </div>
              <span className="text-white text-xs font-sans text-center group-hover:bg-[var(--color-f1-red)] px-1 rounded transition-colors">
                {node.name}
              </span>
            </div>
          ))}

          {/* Open File Modal */}
          <AnimatePresence>
            {openFile && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-8 z-50"
              >
                <div className="w-full max-w-4xl bg-[#1a1a1a] border border-gray-600 rounded-lg shadow-2xl overflow-hidden flex flex-col">
                   <div className="h-10 bg-gray-800 border-b border-gray-600 flex items-center justify-between px-4">
                     <span className="text-sm font-mono text-gray-300">{openFile.name}</span>
                     <button onClick={() => setOpenFile(null)} className="text-gray-400 hover:text-white">
                        <FaTimes />
                     </button>
                   </div>
                   <div className="p-4 flex items-center justify-center min-h-[400px] max-h-[80vh] overflow-y-auto bg-black">
                     {openFile.type === "image" && openFile.url && (
                        <img src={openFile.url} alt={openFile.name} className="max-w-full max-h-[70vh] object-contain" />
                     )}
                     {openFile.type === "file" && (
                        <div className="font-mono text-sm text-green-400 whitespace-pre-wrap leading-relaxed">
                          {openFile.content}
                        </div>
                     )}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
