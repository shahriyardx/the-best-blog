import Image from "next/image";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const LOL: NextPage = () => {
  const [showLauging, setShowLaughing] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShowLaughing(true);
    }, 1000);
  });

  return (
    <div className="grid place-items-center h-screen bg-zinc-900">
      <motion.div layout className="px-4">
        <motion.h1
          layout
          className="text-3xl text-zinc-400 text-center mb-2 uppercase font-black"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
        >
          Welcome to admin panel
        </motion.h1>
        {showLauging && (
          <motion.div
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "tween", duration: 1 }}
          >
            <Image
              src="/laughing.gif"
              width={220}
              height={182}
              layout="responsive"
              objectFit="contain"
              alt="Laughing"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LOL;
