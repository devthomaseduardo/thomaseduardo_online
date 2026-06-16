import React, { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import FloatingSocial from '../components/FloatingSocial';
import { AllProjectsShowcase } from '../components/AllProjectsShowcase';

const Footer = lazy(() => import("../components/Footer").then(m => ({ default: m.Footer })));

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white transition-colors duration-500 overflow-x-hidden relative">
      <Navbar />
      <FloatingSocial />
      <AllProjectsShowcase />
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
};

export default ProjectsPage;