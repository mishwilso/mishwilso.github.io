import React, { useState } from 'react';
import Banner from '../components/general/Banner';


const allProjects = [
  {
    id: 1,
    name: 'Smart Scheduler',
    date: '2023',
    description: 'A scheduling assistant powered by natural language processing and rule-based AI.',
    icon: '/icons/scheduler.png',
    tags: ['Python', 'AI', 'NLP', 'Website'],
    type: 'Tool',
  },
  {
    id: 2,
    name: 'Game Engine',
    date: '2022',
    description: 'A custom 2D game engine built from scratch in C++.',
    icon: '/icons/game.png',
    tags: ['C++', 'Graphics', 'Video Game'],
    type: 'Engine',
  },
  {
    id: 2,
    name: 'Game Engine',
    date: '2022',
    description: 'A custom 2D game engine built from scratch in C++.',
    icon: '/icons/game.png',
    tags: ['C++', 'Graphics', 'Video Game'],
    type: 'Engine',
  },
  {
    id: 2,
    name: 'Game Engine',
    date: '2022',
    description: 'A custom 2D game engine built from scratch in C++.',
    icon: '/icons/game.png',
    tags: ['C++', 'Graphics', 'Video Game'],
    type: 'Engine',
  },
  {
    id: 2,
    name: 'Game Engine',
    date: '2022',
    description: 'A custom 2D game engine built from scratch in C++.',
    icon: '/icons/game.png',
    tags: ['C++', 'Graphics', 'Video Game'],
    type: 'Engine',
  },
  {
    id: 2,
    name: 'Game Engine',
    date: '2022',
    description: 'A custom 2D game engine built from scratch in C++.',
    icon: '/icons/game.png',
    tags: ['C++', 'Graphics', 'Video Game'],
    type: 'Engine',
  },
  {
    id: 2,
    name: 'Game Engine',
    date: '2022',
    description: 'A custom 2D game engine built from scratch in C++.',
    icon: '/icons/game.png',
    tags: ['C++', 'Graphics', 'Video Game'],
    type: 'Engine',
  },
  {
    id: 2,
    name: 'Game Engine',
    date: '2022',
    description: 'A custom 2D game engine built from scratch in C++.',
    icon: '/icons/game.png',
    tags: ['C++', 'Graphics', 'Video Game'],
    type: 'Engine',
  },
];

const categories: { [category: string]: string[] } = {
  'Frontend Languages': ['HTML', 'Javascript', 'Swift'],
  'Backend Languages': ['Python', 'Java', 'C++', 'C#'],
  'Libraries/Tools': ['Pytorch', 'Matplotlib', 'Flask', 'Figma', 'Unity'],
  'Topic': ['AI', 'Robotics', 'Website', 'Research', 'Video Game'],
  'Year': ['2023', '2022']
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
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} style={styles.card}>
                  <img src={project.icon} style={styles.icon} alt={project.name} />
                  <div style={styles.row1}><strong>{project.name}</strong></div>
                  <div style={styles.row2}>
                    <span style={styles.date}>{project.date}</span>
                    <div style={styles.tagWrap}>
                      {[...project.tags].map((tag) => (
                        <span
                          key={tag}
                          style={{
                            ...styles.tag,
                            backgroundColor: categoryColors[tagCategoryMap[tag]] || '#ccc',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={styles.row3}>{project.description}</div>
                  <div style={styles.row4}>
                    <button style={styles.readMore}>Read More</button>
                  </div>
                </div>
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
    </div>
  );
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
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
    height: '100%',
  },
  card: {
    border: '1px solid #ccc',
    padding: '16px',
    borderRadius: '8px',
    display: 'grid',
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateColumns: '60px 1fr',
    gridTemplateAreas: `
      "icon name"
      "icon tags"
      "desc desc"
      "read read"
    `,
    gap: '8px',
    backgroundColor: '#f9f9f9',
  },
  icon: {
    gridArea: 'icon',
    width: '48px',
    height: '48px',
    objectFit: 'contain',
  },
  row1: {
    gridArea: 'name',
    fontSize: '18px',
    alignSelf: 'center',
  },
  row2: {
    gridArea: 'tags',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
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
    marginRight: '12px',
    fontStyle: 'italic',
  },
  row3: {
    gridArea: 'desc',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  row4: {
    gridArea: 'read',
    textAlign: 'right',
  },
  readMore: {
    padding: '6px 12px',
    border: 'none',
    backgroundColor: '#1976d2',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
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
};

export default Catalogue;
