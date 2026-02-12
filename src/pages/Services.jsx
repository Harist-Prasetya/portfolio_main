import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VFXCarousel from '../components/VFXCarousel';
import FrontEndGrid from '../components/FrontEndGrid';

import img_1 from '../assets/Service/gis/rob_0_lamongan.jpg'
import img_2 from '../assets/Service/gis/rob_1.jpg'
import img_3 from '../assets/Service/gis/rob_1_5.jpg'

import AK_1 from '../assets/Service/gis/AK_primer_1.jpg'
import AK_2 from '../assets/Service/gis/AK_sekunder_2.jpg'
import AK_3 from '../assets/Service/gis/AK_surfer_3.jpg'

import prospan_1 from '../assets/Service/gis/prospan_1.jpg'

import spill_1 from '../assets/Service/gis/spill_1.jpg'
import spill_2 from '../assets/Service/gis/spill_2.jpg'

import '../styles/services.css';

export default function Services() {
  const gisImages = [img_1, AK_1, prospan_1];
  const simImages = [img_2, AK_2, spill_1]; // changed from simVideos
  const plotImages = [img_3, AK_3, spill_2];

  const docDescriptions = [
    {
      left: "The map illustrates the results of spatial analysis conducted in Lamongan Regency using Geographic Information Systems (GIS). Spatial analysis within GIS has evolved beyond its traditional role as a technical support tool and now serves as a strategic component in data-driven planning and decision-making processes.",
      middle: "The map presents the predicted areas potentially affected by tidal flooding (rob) with an estimated water level rise of 1 meter in Lamongan Regency. The discussion of the mapping results is essential for understanding the potential disaster risks faced by local communities.",
      right: "The map presents the predicted areas potentially affected by tidal flooding (rob) with an estimated water level rise of 1.5 meter in Lamongan Regency. The discussion of the mapping results is essential for understanding the potential disaster risks faced by local communities."
    },
    {
      left: "The bathymetric map of the Sempu Strait was developed using field data collected through a single beam echosounder device, as illustrated in the accompanying image. The data acquisition process involved systematic depth measurements to accurately capture the underwater topography of the study area.",
      middle: "The bathymetric map of the Sempu Strait was developed using secondary data obtained from the National Bathymetric Dataset. This dataset provides standardized and systematically compiled depth information derived from national-scale hydrographic surveys and related marine data sources.",
      right: "3D Visualization of the Bathymetry of the Sempu Strait The three-dimensional map was generated using Surfer software with the Kriging interpolation method. This visualization approach is employed to enhance the readability and interpretability of spatial data"
    },
    {
      left: "The map presents the analysis of shoreline changes on Gili Ketapang Island, East Java, over the period 2022 to 2024, conducted using the Digital Shoreline Analysis System (DSAS)",
      middle: "The image presents the results of oil spill modeling simulations (Balikpapan Bay) conducted using the MIKE 21 Flow Model integrated with the Oil Spill Module. The simulation illustrates the temporal progression and spatial dispersion of the oil spill over multiple time intervals, including: A) 1 hour, B) 6 hours, C) 12 hours, D) 24 hours, E) 2 days, F) 1 week, G) 14 days, H) 28 days, and I) 1 month.",
      right: "The image presents the visualization of hydrodynamic parameters generated from a .dfs0 file using the MIKE 21 Flow Model. The parameters displayed include current speed, current direction, and surface elevation within Balikpapan Bay. The hydrodynamic simulation outputs provide temporal and spatial representations of flow dynamics in the study area."
    },
  ];


  const location = useLocation();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        scrollToSection(targetId);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="services-page no-scrollbar">
      
      {/* SECTION 0: SYSTEM OVERVIEW */}
      <section className="service-intro-section">
        <div className="intro-container">
          <span className="system-tag">SERVICE_MANIFEST // V2.0</span>
          <h1 className="glitch-header" data-text="SOLUTIONS_ARCHIVE">SOLUTIONS_ARCHIVE</h1>
          <p className="intro-description">
            Providing a cross-disciplinary approach between <strong>Marine Science</strong>, 
            <strong>Digital Architecture</strong>, and <strong>Visual Storytelling</strong>. 
            Select a module below or scroll to initialize deep-scan.
          </p>
          <div className="intro-nav-links">
             <button onClick={() => scrollToSection('vfx')} className="nav-hex">01_VFX</button>
             <button onClick={() => scrollToSection('frontend')} className="nav-hex">02_DEV</button>
             <button onClick={() => scrollToSection('oceanography')} className="nav-hex">03_OCEAN</button>
          </div>
        </div>
      </section>

      {/* SECTION 1: VISUAL EFFECTS */}
      <section id="vfx" className="service-content-section vfx-bg">
        <div className="section-content-wrap">
          <div className="section-header-majestic">
            <h2>Cinematic Compositing</h2>
            <p>High-end after effects edits, 3D camera movement and color grading.</p>
          </div>
          <VFXCarousel />
        </div>
      </section>

      {/* SECTION 2: FRONT END */}
      <section id="frontend" className="service-content-section">
        <div className="section-content-wrap">
          <div className="section-header-majestic">
            <h2>Interactive Front End Website</h2>
            <p>Building high-performance landing pages and complex web systems.</p>
          </div>
          <FrontEndGrid />
        </div>
      </section>

      {/* SECTION 3: OCEANOGRAPHY */}
      <section id="oceanography" className="service-content-section">
        <div className="section-content-wrap">
          <div className="section-header-majestic">
            <h2>Scientific Analysis</h2>
            <p>Integrating numerical modeling with geospatial intelligence.</p>
          </div>
          
          {/* Part A: Technical Cards */}
          <div className="ocean-majestic-grid">
            <div className="ocean-card">
              <div className="card-tag">MODULE_03_A // MODELING</div>
              <h3>Oil Spill Dispersion</h3>
              <p>Utilizing <strong>MIKE 21</strong> to simulate trajectory and environmental risks, modeled after professional internship experience.</p>
              <div className="card-meta">EXP: PERTAMINA PATRA NIAGA</div>
              <div className="fe-corner tl" />
            </div>

            <div className="ocean-card">
              <div className="card-tag">MODULE_03_B // GEOSPATIAL</div>
              <h3>ArcGIS Mapping</h3>
              <p>Geospatial analysis and bathymetric mapping to visualize complex marine environments and coastal dynamics.</p>
              <div className="card-meta">CORE: MARINE SCIENCE</div>
              <div className="fe-corner tl" />
            </div>
          </div>

          {/* Part B: Documentation & Visuals */}
          <div className="ocean-documentation-area">
            <div className="doc-header">
              <span className="doc-line" />
              <span className="doc-label">RESEARCH_ARCHIVE // 4_ROW_SYNC</span>
              <span className="doc-line" />
            </div>
            
            <div className="doc-gallery-grid-sync">
              {docDescriptions.map((_, row) => (
                <div className="doc-row" key={row}>

                  {/* LEFT COLUMN */}
                  <div className="doc-item image-slot">
                    <div className="doc-preview">
                      <img src={gisImages[row]} alt={`GIS_LAYOUT_0${row + 1}`} />
                    </div>
                    <div className="doc-info">
                      <span className="doc-type">MAP_DATA</span>
                      <span className="doc-title">Spatial_Analysis_v{row + 1}.png</span>
                      <p className="doc-description">{docDescriptions[row]?.left}</p>
                    </div>
                  </div>

                  {/* MIDDLE COLUMN (NOW IMAGE) */}
                  <div className="doc-item image-slot">
                    <div className="doc-preview">
                      <img src={simImages[row]} alt={`SIM_RENDER_0${row + 1}`} />
                    </div>
                    <div className="doc-info">
                      <span className="doc-type">MODEL_IMAGE</span>
                      <span className="doc-title">Geographic Information System{row + 1}.png</span>
                      <p className="doc-description">{docDescriptions[row]?.middle}</p>
                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="doc-item image-slot">
                    <div className="doc-preview">
                      <img src={plotImages[row]} alt={`DATA_PLOT_0${row + 1}`} />
                    </div>
                    <div className="doc-info">
                      <span className="doc-type">STAT_CHART</span>
                      <span className="doc-title">Validation_Report_0{row + 1}.jpg</span>
                      <p className="doc-description">{docDescriptions[row]?.right}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
