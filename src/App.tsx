import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import LessonGenerator from './pages/LessonGenerator';
import ModuleOrganizer from './pages/ModuleOrganizer';
import ContentEditor from './pages/ContentEditor';
import { ThemeProvider } from './contexts/ThemeContext';
import { CourseProvider } from './contexts/CourseContext';

function App() {
  return (
    <ThemeProvider>
      <CourseProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lesson-generator" element={<LessonGenerator />} />
              <Route path="/module-organizer" element={<ModuleOrganizer />} />
              <Route path="/content-editor" element={<ContentEditor />} />
            </Routes>
          </Layout>
        </Router>
      </CourseProvider>
    </ThemeProvider>
  );
}

export default App;