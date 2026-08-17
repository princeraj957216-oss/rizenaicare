import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { LocationProvider } from './context/LocationContext';
import { VoiceProvider } from './context/VoiceContext';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { RightPanel } from './components/layout/RightPanel';
import { MobileNav } from './components/layout/MobileNav';

import { Dashboard } from './pages/Dashboard';
import { AllTools } from './pages/AllTools';
import { CreateTool } from './pages/CreateTool';
import { AiHealthAssistant } from './pages/AiHealthAssistant';
import { SymptomChecker } from './pages/SymptomChecker';
import { ProblemToMedicine } from './pages/ProblemToMedicine';
import { FindDoctors } from './pages/FindDoctors';
import { BookAppointment } from './pages/BookAppointment';
import { MedicinesPharmacy } from './pages/MedicinesPharmacy';
import { LabTests } from './pages/LabTests';
import { HealthRecords } from './pages/HealthRecords';
import { HealthTips } from './pages/HealthTips';
import { DietNutrition } from './pages/DietNutrition';
import { WellnessTracker } from './pages/WellnessTracker';
import { EmergencyHelp } from './pages/EmergencyHelp';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function AppContent() {
  const [navigationHistory, setNavigationHistory] = useState(['dashboard']);
  const activePage = navigationHistory[navigationHistory.length - 1];
  const [pageParams, setPageParams] = useState({});

  const handleNavigate = (pageId, params = {}) => {
    setPageParams(params);
    setNavigationHistory((history) => {
      if (history[history.length - 1] === pageId) return history;
      return [...history, pageId];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setNavigationHistory((history) => history.length > 1 ? history.slice(0, -1) : ['dashboard']);
    setPageParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'allTools':
        return <AllTools onNavigate={handleNavigate} />;
      case 'createTool':
        return <CreateTool />;
      case 'aiHealthAssistant':
        return <AiHealthAssistant initialQuery={pageParams.initialQuery || ''} />;
      case 'symptomChecker':
        return <SymptomChecker />;
      case 'problemMedicine':
        return <ProblemToMedicine initialQuery={pageParams.query || ''} />;
      case 'findDoctors':
        return <FindDoctors onNavigate={handleNavigate} />;
      case 'bookAppointment':
        return <BookAppointment />;
      case 'medicinesPharmacy':
        return <MedicinesPharmacy />;
      case 'labTests':
        return <LabTests />;
      case 'healthRecords':
        return <HealthRecords />;
      case 'healthTips':
        return <HealthTips />;
      case 'dietNutrition':
        return <DietNutrition />;
      case 'wellnessTracker':
        return <WellnessTracker />;
      case 'emergencyHelp':
        return <EmergencyHelp />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col md:flex-row transition-colors duration-200">
      {/* Mobile Top Navigation & Drawer */}
      <MobileNav activePage={activePage} setActivePage={handleNavigate} />

      {/* Desktop Permanent Navigation Sidebar */}
      <div className="hidden md:block">
        <Sidebar activePage={activePage} setActivePage={handleNavigate} />
      </div>

      {/* Center Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onNavigate={handleNavigate} onBack={handleBack} showBack={activePage !== 'dashboard'} />
        <main className="flex-1 p-4 md:p-6 max-w-6xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Right-side Information Panel (Desktop) */}
      <div className="hidden lg:block">
        <RightPanel onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LocationProvider>
          <VoiceProvider>
            <AppContent />
          </VoiceProvider>
        </LocationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
