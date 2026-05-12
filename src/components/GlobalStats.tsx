import React from "react";
import { motion } from "motion/react";
import { useLang } from "../contexts/LangContext";

const GlobalStats = () => {
  const { t } = useLang();

  const stats = [
    { label: t.stats.projects, val: "25+" },
    { label: t.stats.technologies, val: "12+" },
    { label: t.stats.experience, val: "03+" },
    { label: t.stats.satisfaction, val: "100%" }
  ];

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-full mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <span className="block text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-1">
                {stat.val}
              </span>
              <span className="label-caps block">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalStats;
