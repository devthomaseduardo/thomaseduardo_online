import { motion } from "motion/react";
import React from "react";

export const Shimmer = () => (
  <motion.div
    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent z-10"
    animate={{ translateX: ["-100%", "200%"] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
  />
);

export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full gap-4 pb-4 border-b border-white/5">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className={`h-3 bg-white/5 rounded flex-1 relative overflow-hidden ${i === 0 ? "max-w-[200px]" : ""}`}>
            <Shimmer />
          </div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex w-full gap-4 items-center py-3">
          {Array.from({ length: columns }).map((_, c) => (
            <div
              key={c}
              className={`h-4 bg-white/5 rounded relative overflow-hidden ${
                c === 0 ? "flex-[2]" : c === columns - 1 ? "flex-[0.5]" : "flex-1"
              }`}
            >
              <Shimmer />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const KanbanSkeleton = ({ columns = 3, cardsPerColumn = 3 }: { columns?: number; cardsPerColumn?: number }) => {
  return (
    <div className="flex gap-6 w-full overflow-x-auto pb-4">
      {Array.from({ length: columns }).map((_, c) => (
        <div key={c} className="flex flex-col gap-4 w-80 shrink-0">
          <div className="flex justify-between items-center px-1">
            <div className="h-4 w-24 bg-white/5 rounded relative overflow-hidden">
              <Shimmer />
            </div>
            <div className="h-4 w-6 bg-white/5 rounded-full relative overflow-hidden" />
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: cardsPerColumn }).map((_, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-3 relative overflow-hidden">
                <Shimmer />
                <div className="flex justify-between items-start">
                  <div className="h-4 w-3/4 bg-white/5 rounded" />
                  <div className="h-5 w-10 bg-white/5 rounded-full" />
                </div>
                <div className="h-3 w-1/2 bg-white/5 rounded mt-2" />
                <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                  <div className="h-6 w-6 bg-white/5 rounded-full" />
                  <div className="h-6 w-6 bg-white/5 rounded-full -ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const TimelineSkeleton = ({ items = 4 }: { items?: number }) => {
  return (
    <div className="flex flex-col gap-0 relative">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-white/5" />
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex gap-6 relative py-4 group">
          <div className="relative z-10 flex shrink-0 items-center justify-center w-6 h-6 mt-1">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 ring-4 ring-[#0A0A0A]" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-3">
              <div className="h-4 w-32 bg-white/5 rounded relative overflow-hidden">
                <Shimmer />
              </div>
              <div className="h-3 w-16 bg-white/5 rounded relative overflow-hidden" />
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] mt-1 relative overflow-hidden h-20">
               <Shimmer />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DrawerSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 h-full p-6">
      <div className="flex flex-col gap-4">
        <div className="h-8 w-2/3 bg-white/5 rounded-lg relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="flex gap-3">
          <div className="h-6 w-24 bg-white/5 rounded-full relative overflow-hidden">
             <Shimmer />
          </div>
          <div className="h-6 w-32 bg-white/5 rounded-full relative overflow-hidden">
             <Shimmer />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="h-4 w-32 bg-white/5 rounded relative overflow-hidden">
           <Shimmer />
        </div>
        <div className="h-40 w-full bg-white/5 rounded-xl relative overflow-hidden">
           <Shimmer />
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-auto border-t border-white/5 pt-6">
        <div className="flex justify-end gap-3">
          <div className="h-10 w-24 bg-white/5 rounded-lg relative overflow-hidden">
             <Shimmer />
          </div>
          <div className="h-10 w-32 bg-white/10 rounded-lg relative overflow-hidden">
             <Shimmer />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActivityFeedSkeleton = ({ items = 3 }: { items?: number }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex gap-4 items-start p-3 rounded-lg hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <Shimmer />
          <div className="w-8 h-8 rounded-full bg-white/5 shrink-0" />
          <div className="flex flex-col gap-2 flex-1 pt-1">
            <div className="h-3 w-full bg-white/5 rounded" />
            <div className="h-3 w-1/3 bg-white/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
