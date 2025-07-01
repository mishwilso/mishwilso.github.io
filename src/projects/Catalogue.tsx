import React, { useState} from 'react';
import Banner from '../components/general/Banner';
import CatalogueCard from '../components/general/CatalogueCard';
import { useDesktop } from '../components/Desktop/DesktopContext';

const allProjects = [
  {
    id: 1,
    name: 'Differentially Private Quantile Research',
    date: '2024',
    description: 'A graduate-level research project exploring differentially private quantile estimation algorithms (UQE, AQ, JointExp) under varying dataset sizes and privacy budgets.',
    tags: ['Python', 'Privacy and Security', 'Research', 'Matplotlib', ],
    icon: 'projects/dpquantile1.jpeg',
    type: 'Research',
    details: [
      "Conducted comparative research on runtime, accuracy, and efficiency of differentially private quantile algorithms.",
      "Benchmarked UQE, AQ, and JointExp to highlight trade-offs between accuracy and runtime.",
      "Provided practical guidance for algorithm selection based on application needs."
    ],
    gallery: ['projects/dpquantile1.jpeg', 'projects/dpquantile2.jpeg', 'projects/dpquantile3.jpeg'],
  },
  {
    id: 2,
    name: 'AI Chess Game',
    date: '2024',
    description: 'A Python-based chess game implementing a minimax AI algorithm for intelligent move prediction. Built using Pygame.',
    tags: ['Python', 'Game Design', 'Machine Learning', 'Pygame',],
    icon: 'projects/chess1.jpeg',
    type: 'Game',
    details: [
      "Built a playable chess game with AI opponent using minimax and object-oriented design.",
      "Handled user interaction logic, move legality checks, and game state transitions.",
      "Implemented clean and modular architecture for future expansion."
    ],
    gallery: ['projects/chess1.jpeg', 'projects/chess2.jpeg', 'projects/chess3.jpeg',],
    github: 'https://github.com/mishwilso/Chess-Game',

  },
  {
    id: 3,
    name: 'Rust and Roots',
    date: '2024',
    description: 'A side-scrolling roguelike platformer built in Unity with friends, inspired by games like Hollow Knight. Contributed gameplay and level design code.',
    tags: ['C#', 'Game Design','Unity'],
    icon: 'projects/rust1.png',
    type: 'Game',
    details: [
      "Collaborated with a small team to design a pixel-art roguelike platformer in Unity.",
      "Coded player movement, level hazards, and attack logic in C#.",
      "Playtested and iterated on gameplay loops based on team feedback."
    ],
    gallery: ['projects/rust1.png', 'projects/rust2.png', 'projects/rust3.png', 'projects/rust4.png',],
    github: 'https://github.com/mishwilso/BidenGames',
  },
  {
    id: 4,
    name: 'Accessible Authentication Method Research',
    date: '2025',
    description: 'Usability study evaluating alternative authentication methods for neurodivergent users. Created a Flask-based app with various login flows to gather user feedback.',
    tags: ['Python', 'Research', 'Privacy and Security', 'Web Development', 'Flask', ],
    icon: 'projects/auth1.jpeg',
    type: 'Research',
    details: [
      "Designed and conducted a usability study with neurodivergent participants.",
      "Built a Flask app with multiple authentication flows (text, image, and multimodal).",
      "Collected qualitative and quantitative feedback to assess accessibility."
    ],
    gallery: ['projects/auth1.jpeg', 'projects/auth2.jpeg','projects/auth3.jpeg','projects/auth4.jpeg', 'projects/auth5.gif'],
    github: 'https://github.com/mishwilso/Accessible_Authentication',
  },
  {
    id: 5,
    name: 'MishOS',
    date: '2025',
    description: 'My personal website—this one! Built with React, TypeScript, and Three.js, combining a 3D intro and retro Windows-95-style UI. Inspired by old-school operating systems and nostalgia.',
    tags: ['React', 'Typescript', 'Web Development'],
    icon: 'projects/mishos1.jpeg',
    type: 'Website',
    details: [
      "Developed a hybrid 3D and retro UI experience using Three.js and React.",
      "Engineered interactive draggable windows, audio controls, and desktop-style navigation.",
      "Integrated animated intro sequence and custom pixel art icons."
    ],
    gallery: ['projects/mishos1.jpeg', 'projects/mishos2.jpeg', 'projects/mishos3.jpeg',],
    github: 'https://github.com/mishwilso/mishwilso.github.io',
  },
  {
    id: 6,
    name: 'Roomease',
    date: '2023',
    description: 'A mobile app designed to streamline roommate life with shared chores, grocery lists, and calendars. Built with Swift and Firebase.',
    tags: ['Swift', 'SQL', 'Firebase', 'UX Design'],
    icon: 'projects/roommease1.png',
    type: 'App',
    details: [
      "Created a mobile app in Swift for coordinating chores, groceries, and calendars.",
      "Used Firebase to manage user data, shared lists, and push notifications.",
      "Designed UI/UX with feedback from student housemates for daily usability."
    ],
    gallery: [ 'projects/roommease1.png',  'projects/roommease2.png',  'projects/roommease3.gif',  'projects/roommease4.gif',],
    github: 'https://github.com/mishwilso/CS3750_Roomease',
  },
  {
    id: 7,
    name: 'Adversarial Machine Learning Research',
    date: '2025',
    description: 'Explored various adversarial attack techniques on ML models to evaluate robustness. Implemented attacks using PyTorch and custom scripts.',
    tags: ['Python', 'PyTorch', 'Machine Learning', 'Privacy and Security', ],
    icon: 'projects/adv2.png',
    type: 'Research',
    details: [
      "Implemented adversarial attacks like FGSM and PGD using PyTorch.",
      "Tested robustness of image classification models under perturbation.",
      "Built custom training/evaluation scripts for reproducibility and benchmarking."
    ],
    gallery: ['projects/adv2.png', 'projects/adv1.png',],
  },
  {
    id: 8,
    name: 'Social Deduction Model',
    date: '2024',
    description: 'A trust-based agent network simulation inspired by Among Us and Werewolf, built using NetLogo and Python.',
    tags: ['NetLogo', 'Python', 'Machine Learning',],
    icon: 'projects/moc1.png',
    type: 'Research',
    details: [
      "Simulated trust dynamics between agents using NetLogo’s multi-agent modeling.",
      "Modeled deception, voting, and social deduction inspired by games like Werewolf.",
      "Analyzed network dynamics and emergent behavior from repeated trials."
    ],
    gallery: ['projects/moc1.png', 'projects/moc23.png', 'projects/moc2.png', 'projects/moc3.png',],
    github: 'https://github.com/trueshiba/MOCS-social-deduction-model',
  },
  {
    id: 9,
    name: 'Audio Chef',
    date: '2024',
    description: 'A machine learning model trained to classify food sounds, with plans to integrate a visual UI for food identification assistance.',
    tags: ['Python', 'PyTorch', 'Machine Learning',],
    icon: 'projects/food1.png',
    type: 'ML',
    details: [
      "Built a PyTorch model to classify audio samples of food being eaten.",
      "Engineered features like MFCCs and wavelet transforms to improve accuracy.",
      "Achieved 80%+ accuracy and explored UI integration for food ID assistance."
    ],
    gallery: ['projects/food1.png', 'projects/food2.png', 'projects/food3.png', 'projects/food4.png', 'projects/food5.png',],
    github: 'https://github.com/mishwilso/ML-audio-chef',
  },
  {
    id: 10,
    name: 'Raspip Boy',
    date: '2023',
    description: 'A Raspberry Pi-powered recreation of the Pip-Boy from Fallout, reimagined as a tamagotchi-style pet and media player.',
    tags: ['Python', 'Raspberry Pi', 'Game Design', 'Pygame'],
    icon: 'projects/raspip1.jpeg',
    type: 'Hardware',
    details: [
      "Recreated the Fallout Pip-Boy interface as a custom Raspberry Pi touchscreen device.",
      "Implemented a tamagotchi-style pet and local media player in Pygame.",
      "Designed custom shell and button input handler using GPIO and Python."
    ],
    gallery: ['projects/raspip1.jpeg', 'projects/raspip2.jpeg', 'projects/raspip3.jpeg', 'projects/raspip4.jpeg', 'projects/raspip5.jpeg',],
    github: 'https://github.com/mishwilso/raspip-boy',
  },
  {
    id: 11,
    name: 'REST API: Energy Monitoring',
    date: '2024',
    description: 'Created a REST API for Burlington Electric during internship to help customers track energy usage across properties. Tailored for the Burlington 2030 initiative.',
    tags: ['Python', 'REST API',],
    icon: 'projects/rest1.png',
    type: 'Tool',
    details: [
      "Built a Python REST API to expose energy usage data from Burlington Electric.",
      "Created endpoints to support customer dashboards and 2030 initiative analysis.",
      "Wrote documentation and trained users on endpoint usage."
    ],
    gallery: ['projects/rest1.png',]
  },
  {
    id: 12,
    name: 'Evolutionary Robot',
    date: '2025',
    description: 'Simulated a bipedal robot trained with evolutionary algorithms to perform parkour tasks in PyBullet. Included A/B testing and curriculum-based difficulty.',
    tags: ['Python', 'PyBullet', 'Machine Learning'],
    icon: 'projects/robo4.png',
    type: 'Research',
    details: [
      "Simulated a bipedal robot performing jumps using PyBullet and Pyrosim.",
      "Used ray sensors, spring physics, and neural nets to train jumping behaviors.",
      "Compared A/B fitness functions like airtime vs. horizontal distance."
    ],
    gallery: ['projects/robo4.png', 'projects/robo1.png', 'projects/robo2.png', 'projects/robo3.gif',  ],
    github: 'https://github.com/mishwilso/Evolutionary-Robotics/tree/finalProject',
  },
  {
    id: 13,
    name: 'Battery Death Prediction',
    date: '2024',
    description: 'A data science project attempting to predict lithium-ion battery death using cycle data. Involved feature extraction and modeling.',
    tags: ['Python','Machine Learning'],
    icon: 'projects/battery1.png',
    type: 'Research',
    details: [
      "Analyzed lithium-ion battery cycle data to model capacity degradation over time.",
      "Engineered features like cycle count, recharge depth, and voltage drop.",
      "Tested ML models to predict failure points with limited historical data."
    ],
    gallery: ['projects/battery1.png', 'projects/battery2.png', 'projects/battery3.png', 'projects/battery4.png', 'projects/battery5.png', 'projects/battery6.png',],
  },
];


const categories: { [category: string]: string[] } = {
  'Frontend Languages': ['HTML', 'JavaScript', 'TypeScript', 'Swift'],
  'Backend Languages': ['Python', 'C++', 'C#', 'Java'],
  'Libraries/Tools': ['React', 'Three.js', 'Flask', 'Firebase', 'Unity', 'PyTorch', 'Matplotlib', 'NetLogo', 'Pygame'],
  'Year': ['2025', '2024', '2023'],
  'Topics': [
    'Machine Learning',
    'Privacy and Security',
    'Game Design',
    'Research',
    'Web Development'
  ],
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
  const { launchWindow } = useDesktop();
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

  // counts of how many filtered projects include each tag
  const visibleTagCounts: { [tag: string]: number } = {};
  filteredProjects.forEach(proj =>
    proj.tags.forEach(t => {
      visibleTagCounts[t] = (visibleTagCounts[t] || 0) + 1;
    })
  );


  return (
    <div style={styles.outerWrapper}>
      <div className="site-page-content">

        <div className="page-background" style={{ paddingLeft: 32,}}>
          <div style={styles.pageHeader}>
            <h1 style={{ fontFamily: 'Pixelout', marginBottom: 10, fontSize: '4rem' }}>Catalogue</h1>
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
                            {tag}{' ' }
                            <em style={{ color: '#888' }}>
                              ({visibleTagCounts[tag] ?? 0})
                            </em>
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
              <Banner text="Remember my resume? It’s still here!" onClick={() => launchWindow('resume')} />
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
  maxWidth: '475px',
  width: '100%',
  height: '550px',
  //  height: '100%', // or a fixed minHeight if needed
  position: 'relative',
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
  marginTop: 'auto',
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
  // marginLeft: 'auto',
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
  width: '98%',
  height: '200px', // same as your icon height
  overflow: 'hidden',
  borderRadius: '8px',
  marginBottom: '12px',
  position: 'relative',
  marginLeft: '5px',
  marginRight: '5px',
  marginTop:'5px',

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
