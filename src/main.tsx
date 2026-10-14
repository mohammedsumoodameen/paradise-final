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
import Contact from './pages/Contact.tsx'
import GalleryPage from './pages/GalleryPage.tsx'
import Home from './pages/Home.tsx'
import Maintenance from './pages/Maintenance.tsx'

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
          {/* Not open yet: these show an "almost ready" page. The finished pages are still in
              src/pages - to bring one back, import it and swap it in for <Maintenance /> below
              (NewsPage, NewsArticle, FranchisePage, AdmissionsPage, BranchAdmission, TeacherTrainingPage). */}
          <Route path="/news" element={<Maintenance name="News" />} />
          <Route path="/news/:slug" element={<Maintenance name="News" />} />
          <Route path="/franchise" element={<Maintenance name="Franchise" />} />
          <Route path="/admissions" element={<Maintenance name="Admissions" />} />
          <Route path="/admissions/:slug" element={<Maintenance name="Admissions" />} />
          <Route path="/teacher-training" element={<Maintenance name="Teacher training" />} />
          {/* Anything else falls back to the home page rather than a blank screen. */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
