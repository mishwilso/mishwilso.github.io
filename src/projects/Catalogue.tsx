import React, { useState} from 'react';
import Banner from '../components/general/Banner';
import CatalogueCard from '../components/general/CatalogueCard';


const allProjects = [
  {
    id: 1,
    name: 'Differentially Private Quantile Research',
    date: '2024',
    description: 'A graduate-level research project exploring differentially private quantile estimation algorithms (UQE, AQ, JointExp) under varying dataset sizes and privacy budgets.',
    tags: ['Python', 'Matplotlib', 'Privacy', 'Research', 'Data Analysis'],
    icon: '/icons/quantile.png',
    type: 'Research',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]

  },
  {
    id: 2,
    name: 'AI Chess Game',
    date: '2024',
    description: 'A Python-based chess game implementing a minimax AI algorithm for intelligent move prediction. Built using Pygame.',
    tags: ['Python', 'Pygame', 'AI', 'Game', 'Minimax'],
    icon: '/icons/chess.png',
    type: 'Game',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 3,
    name: 'Rust and Roots',
    date: '2024',
    description: 'A side-scrolling roguelike platformer built in Unity with friends, inspired by games like Hollow Knight. Contributed gameplay and level design code.',
    tags: ['C#', 'Unity', 'Game', 'Team Project'],
    icon: '/icons/rustroots.png',
    type: 'Game',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 4,
    name: 'Accessible Authentication Method Research',
    date: '2025',
    description: 'Usability study evaluating alternative authentication methods for neurodivergent users. Created a Flask-based app with various login flows to gather user feedback.',
    tags: ['Flask', 'Python', 'Research', 'Accessibility', 'Security'],
    icon: '/icons/auth.png',
    type: 'Research',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 5,
    name: 'MishOS',
    date: '2025',
    description: 'My personal website—this one! Built with React, TypeScript, and Three.js, combining a 3D intro and retro Windows-95-style UI. Inspired by old-school operating systems and nostalgia.',
    tags: ['React', 'Typescript', 'Three.js', 'Personal Website', 'Creative'],
    icon: '/icons/mishos.png',
    type: 'Website',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 6,
    name: 'Roomease',
    date: '2023',
    description: 'A mobile app designed to streamline roommate life with shared chores, grocery lists, and calendars. Built with Swift and Firebase.',
    tags: ['Swift', 'Mobile', 'Firebase', 'UX Design'],
    icon: '/icons/roomease.png',
    type: 'App',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 7,
    name: 'Adversarial Machine Learning Research',
    date: '2025',
    description: 'Explored various adversarial attack techniques on ML models to evaluate robustness. Implemented attacks using PyTorch and custom scripts.',
    tags: ['Python', 'PyTorch', 'Adversarial ML', 'Security', 'AI'],
    icon: '/icons/adversarial.png',
    type: 'Research',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 8,
    name: 'Social Deduction Model',
    date: '2024',
    description: 'A trust-based agent network simulation inspired by Among Us and Werewolf, built using NetLogo and Python.',
    tags: ['NetLogo', 'Python', 'Simulation', 'AI', 'Networks'],
    icon: '/icons/trust.png',
    type: 'Research',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 9,
    name: 'Audio Chef',
    date: '2024',
    description: 'A machine learning model trained to classify food sounds, with plans to integrate a visual UI for food identification assistance.',
    tags: ['Python', 'PyTorch', 'ML', 'Audio Processing', 'Food Tech'],
    icon: '/icons/audio.png',
    type: 'ML',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 10,
    name: 'Raspip Boy',
    date: '2023',
    description: 'A Raspberry Pi-powered recreation of the Pip-Boy from Fallout, reimagined as a tamagotchi-style pet and media player.',
    tags: ['Python', 'Raspberry Pi', 'Hardware', 'Pygame'],
    icon: '/icons/raspip.png',
    type: 'Hardware',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 11,
    name: 'REST API: Energy Monitoring',
    date: '2024',
    description: 'Created a REST API for Burlington Electric during internship to help customers track energy usage across properties. Tailored for the Burlington 2030 initiative.',
    tags: ['Python', 'REST', 'API', 'Internship', 'Energy'],
    icon: '/icons/energy.png',
    type: 'Tool',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 12,
    name: 'Evolutionary Robot',
    date: '2025',
    description: 'Simulated a bipedal robot trained with evolutionary algorithms to perform parkour tasks in PyBullet. Included A/B testing and curriculum-based difficulty.',
    tags: ['Python', 'PyBullet', 'Robotics', 'Simulation', 'Evolution'],
    icon: '/icons/robot.png',
    type: 'Research',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
  {
    id: 13,
    name: 'Battery Death Prediction',
    date: '2024',
    description: 'A data science project attempting to predict lithium-ion battery death using cycle data. Involved feature extraction and modeling.',
    tags: ['Python', 'Data Science', 'Machine Learning', 'Batteries'],
    icon: '/icons/battery.png',
    type: 'Research',
    details: ['Pellentesque vitae velit ex.'],
    gallery: ['/images/project1/img1.png', '/images/project1/img2.png',]
  },
];


const categories: { [category: string]: string[] } = {
  'Frontend Languages': ['HTML', 'JavaScript', 'TypeScript', 'Swift'],
  'Backend Languages': ['Python', 'C++', 'C#', 'Java'],
  'Libraries/Tools': ['React', 'Three.js', 'Flask', 'Firebase', 'Unity', 'PyTorch', 'Matplotlib', 'NetLogo', 'Pygame'],
  'Platforms': ['Mobile', 'Website', 'Hardware', 'Simulation'],
  'Topics': ['AI', 'ML', 'Robotics', 'Security', 'Privacy', 'Accessibility', 'Creative', 'Research', 'Game', 'Data Science', 'Tool'],
  'Year': ['2025', '2024', '2023'],
  'Project Type': ['App', 'Website', 'Game', 'Tool', 'ML', 'Research', 'Hardware']
};


const tagCategoryMap: { [tag: string]: string } = {};
Object.entries(categories).forEach(([category, tags]) => {
  tags.forEach((tag) => {
    tagCategoryMap[tag] = category;
  });
});

const categoryColors: { [category: string]: string } = {
  'Frontend Languages': '#1abc9c',
  'Backend Languages': '#3498db',
  'Libraries/Tools': '#9b59b6',
  'Topic': '#e67e22',
  'Year': '#7f8c8d',
};

const Catalogue: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const tagCounts: { [tag: string]: number } = {};
  
  allProjects.forEach((project) => {
    project.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    tagCounts[project.date] = (tagCounts[project.date] || 0) + 1;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const filteredProjects = allProjects.filter((project) => {
    const allTags = [...project.tags, project.date];
    return selectedTags.length === 0 || selectedTags.every((tag) => allTags.includes(tag));
  });

  return (
    <div style={styles.outerWrapper}>
      <div className="site-page-content">

        <div className="page-background" style={{ paddingLeft: 32,}}>
          <div style={styles.pageHeader}>
            <h1 style={{ fontFamily: 'Pixelout', marginBottom: 10 }}>Catalogue</h1>
            <p>Welcome to A catalogue of all of my projects!</p>
          </div>
          <div style={styles.container}>
          <div style={styles.sidebarWrapper}>
            <div style={styles.sidebar}>
              <h2 style={styles.sidebarTitle}>Filters</h2>
              <div style={styles.filterBox}>
                {Object.entries(categories).map(([category, tags]) => (
                  <div key={category} style={styles.filterSection}>
                    <div style={styles.filterHeaderContainer}>
                      <div style={styles.filterHeader} onClick={() => toggleCollapse(category)}>
                        <strong>{category}</strong> {collapsed[category] ? '+' : '-'}
                      </div>
                    </div>
                    {!collapsed[category] && (
                      <div style={styles.checkboxGrid}>
                        {tags.map((tag) => (
                          <label
                            key={tag}
                            style={{
                              ...styles.checkboxLabel,
                              color: selectedTags.includes(tag) ? '#d32f2f' : 'inherit',
                            }}
                          >
                            <span
                              onClick={() => toggleTag(tag)}
                              style={{
                                ...styles.customCheckbox,
                                ...(selectedTags.includes(tag) ? styles.customCheckboxChecked : {}),
                              }}
                            />
                            {tag} ({tagCounts[tag] || 0})
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.projectsSection}>
            {/* Project Card Area! */}
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
              <CatalogueCard
                key={project.id}
                project={project}
                isExpanded={expandedCard === project.id}
                tagCategoryMap={tagCategoryMap}
                categoryColors={categoryColors}
                onToggleExpand={(id) => {
                  setGalleryIndex(0);
                  setExpandedCard(expandedCard === id ? null : id);
                }}
                galleryIndex={galleryIndex}
                styles={styles}
                setFullscreenImage={setFullscreenImage}
              />
            ))
            ) : (
              <div style={styles.noResults}>
                <p>Sorry, no projects like that yet — but I’ll get working on it!</p>
                <img src="/images/no-projects.png" alt="No projects found" style={styles.noResultsImage} />
              </div>
            )}

            
          </div>

          </div>
            <div style={{ marginTop: '32px' }}>
              <Banner text="Remember my resume? It’s still here!" />
            </div>
        </div>
        </div>
        {fullscreenImage && (
        <div style={fullscreenStyles.modalOverlay}>
          <div style={fullscreenStyles.modalContent}>
            <button style={fullscreenStyles.closeButton} onClick={() => setFullscreenImage(null)}>✕</button>
            <img src={fullscreenImage} style={fullscreenStyles.fullscreenImage} alt="Fullscreen View" />
          </div>
        </div>
)}

    </div>
  );
};

const fullscreenStyles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
  closeButton: {
    position: 'fixed',
    top: 24,
    right: 30,
    background: 'transparent',
    border: 'none',
    fontSize: 30,
    color: 'white',
    cursor: 'pointer',
    zIndex: 10000,
  },
  fullscreenImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 10,
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
  },
};


const styles: { [key: string]: React.CSSProperties } = {
  
  outerWrapper: {
    width: '100vw',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    fontFamily: 'Millennium',
  },
  container: {
    display: 'flex',
    flex: 1,
    fontFamily: 'Millennium',
  },
  sidebarWrapper: {
    flex: '0 0 300px',
    maxWidth: '300px',
    minWidth: '300px',
    alignSelf: 'flex-start',
    position: 'sticky',
    top: 100,
    zIndex: 1,

  },
  sidebar: {
    width: '100%',
    padding: '16px',
    borderRight: '1px solid #ddd',
    backgroundColor: '#fafafa',
    boxShadow: '2px 0 4px rgba(0, 0, 0, 0.05)',
    height: '100%',
    overflowY: 'auto',
  },
  sidebarTitle: {
    fontSize: '20px',
    marginBottom: '16px',
  },
  filterBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '8px',
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  pageHeader: {
    marginBottom: 16,
  },
  filterHeaderContainer: {
    backgroundColor: '#e0e0e0',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  filterHeader: {
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4px 8px',
    paddingLeft: '4px',
  },
  checkboxLabel: {
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  customCheckbox: {
    width: '14px',
    height: '14px',
    border: '2px solid #999',
    borderRadius: '4px',
    display: 'inline-block',
    backgroundColor: '#fff',
    transition: 'background 0.2s, border 0.2s',
  },
  customCheckboxChecked: {
    backgroundColor: '#d32f2f',
    borderColor: '#d32f2f',
  },
  projectsSection: {
    flex: 1,
    padding: '16px',
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    alignItems: 'start',
  },
card: {
  border: '1px solid #ccc',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '800px',
  width: '100%',
},

icon: {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  display: 'block',
},

row1: {
  padding: '16px 16px 8px',
  fontSize: '20px',
  fontWeight: 700,
  color: '#111',
  fontFamily: 'Millennium',
},

row2: {
  padding: '0 16px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '8px',
},

row3: {
  padding: '0 16px',
  fontSize: '14px',
  lineHeight: 1.6,
  color: '#444',
  marginBottom: '8px',
},

row4: {
  padding: '0 16px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
},


  tagWrap: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '2px 8px',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
  },
date: {
  fontStyle: 'italic',
  color: '#888',
  fontSize: '13px',
},

readMore: {
  padding: '6px 12px',
  fontSize: '13px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: 'auto',
},
  noResults: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#555',
  },
  noResultsImage: {
    width: '200px',
    marginTop: '16px',
    opacity: 0.6,
  },
  expandedCard: {
  gridColumn: '1 / -1',
  transition: 'all 0.4s ease-in-out',
  maxWidth: '100%',
},

galleryWrapper: {
  width: '100%',
  height: '200px', // same as your icon height
  overflow: 'hidden',
  borderRadius: '8px',
  marginBottom: '12px',
  position: 'relative',
  marginLeft: '5px',
  marginRight: '5px'
},

galleryImage: {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 0.5s ease-in-out',
},
detailsList: {
  padding: '16px',
  paddingTop: 8,
  fontSize: '14px',
  color: '#333',
  lineHeight: 1.6,
  listStyleType: 'disc',
  marginLeft: '1.5rem',
},

};

export default Catalogue;
