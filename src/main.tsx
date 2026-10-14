import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource-variable/oxanium'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './styles/base.css'
import './styles/shell.css'
import './styles/home.css'
import './styles/pages.css'
import App from './App.tsx'
import AdmissionsPage from './pages/AdmissionsPage.tsx'
import BranchAdmission from './pages/BranchAdmission.tsx'
import Contact from './pages/Contact.tsx'
import FranchisePage from './pages/FranchisePage.tsx'
import GalleryPage from './pages/GalleryPage.tsx'
import Home from './pages/Home.tsx'
import NewsArticle from './pages/NewsArticle.tsx'
import NewsPage from './pages/NewsPage.tsx'
import TeacherTrainingPage from './pages/TeacherTrainingPage.tsx'

// Things only animate in for people who have not asked their device to reduce motion.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('motion')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/admissions/:slug" element={<BranchAdmission />} />
          <Route path="/teacher-training" element={<TeacherTrainingPage />} />
          {/* Anything else falls back to the home page rather than a blank screen. */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
