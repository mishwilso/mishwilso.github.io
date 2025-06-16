import React, { useRef, useState, useEffect } from 'react';
import Banner from '../components/general/Banner';


const experiences = [
  {
    role: 'Software Engineer Intern',
    company: 'TechCorp',
    location: 'Somewhere, MA',
    website: 'https://techcorp.com',
    startDate: '2025-09-07',
    endDate: '2025-12-08',
    description: 'Worked on full-stack feature development in a fast-paced agile team.',
    bullets: [
      'Developed RESTful APIs with Node.js',
      'Improved UI performance in React by 30%',
      'Wrote unit tests and integrated CI/CD pipelines',
      'Collaborated across teams to design scalable solutions'
    ]
  },
  {
    role: 'Research Assistant',
    company: 'University Lab',
    location: 'Somewhere, MA',
    website: 'https://university.edu',
    startDate: '2024-01-01',
    endDate: '2024-05-01',
    description: 'Conducted privacy research and implemented secure data systems.',
    bullets: [
      'Analyzed DP algorithms for federated learning',
      'Created benchmark datasets for academic publishing',
      'Presented findings at IEEE security symposium'
    ]
  },
  {
  role: 'QA Analyst',
  company: 'SoftCheck',
  location: 'Remote',
  website: 'https://softcheck.com',
  startDate: '2021-02-01',
  endDate: '2021-11-30',
  description: 'Conducted automated testing and quality assurance.',
  bullets: [
    'Designed and ran Selenium test suites',
    'Documented bugs and coordinated with dev team',
    'Maintained test coverage reports'
  ]
},
{
  role: 'Technical Writer',
  company: 'DocuTech',
  location: 'New York, NY',
  website: 'https://docutech.com',
  startDate: '2022-03-15',
  endDate: '2022-12-10',
  description: 'Created user documentation for enterprise software.',
  bullets: [
    'Wrote release notes and user guides',
    'Interviewed engineers for technical insights',
    'Ensured all docs met ISO standards'
  ]
},
{
  role: 'Junior Developer',
  company: 'CodeBase',
  location: 'Boston, MA',
  website: 'https://codebase.io',
  startDate: '2023-06-01',
  endDate: '2023-11-01',
  description: 'Built frontend components using React.',
  bullets: [
    'Contributed to internal design system',
    'Optimized components for accessibility',
    'Refactored legacy jQuery code'
  ]
}


];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' , year: 'numeric', });
}

const Experience: React.FC = () => {
  const sortedExperiences = [...experiences].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState(sortedExperiences[0].startDate.slice(0, 4));
  const yearRefs = useRef<{ [year: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute('data-year');
            if (year) setActiveYear(year);
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(yearRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

const years = Array.from(new Set(sortedExperiences.map(exp => exp.endDate.slice(0, 4)))).sort((a, b) => Number(b) - Number(a));

  return (
    // <div style={styles.container}>
  <div className="site-page-content">
    <div className="page-background" style={styles.container}>

    <h1 style={{fontFamily: 'Pixelout', marginBottom: 10}}> Experience </h1>
    <p style={{marginTop: '5px', fontSize: '15px'}}> Here's a catalogue of all of my work experience!</p>
      <div style={{ marginTop: '0px' }}>
        <Banner text="Remember my resume? It’s still here!" />
      </div>
    <div style={styles.timelineAndExperience}>
        <div style={styles.yearsColumnContainer}>
          <div style={styles.yearsColumn}>
            {years.map(year => (
                  <div
                    key={year}
                    style={{
                      ...styles.year,
                      ...(activeYear === year ? styles.activeYear : {})
                    }}
                  >
                    {(hoveredYear === year || activeYear === year) && <div style={styles.yearDot} />}
                    {year}
                  </div>
            ))}
          </div>
        </div>
        <div style={styles.experienceColumn}>
          {sortedExperiences.map(exp => {
            const year = exp.endDate.slice(0, 4);
            return (
              <div
                key={exp.role + exp.company}
                ref={(el) => {
                  yearRefs.current[year] = el;
                }}
                data-year={year}
                style={styles.experienceCard}
                onMouseEnter={() => setHoveredYear(year)}
                onMouseLeave={() => setHoveredYear(null)}
              >
                <div style={styles.cardHeader}>
                  <img
                    src={`../logos/${exp.company.toLowerCase().replace(/\s/g, '')}.png`} // Example: /logos/techcorp.png
                    alt={`${exp.company} logo`}
                    style={styles.logo}
                  />
                  <div style={styles.titleSection}>
                    <div style={styles.roleLine}>
                      <h2 style={styles.role}>{exp.role}</h2>
                      <span style={styles.location}> <img src='../art/location.png' style={{width:15}}/> {exp.location} </span> {/* Optional */}
                    </div>
                    <div style={styles.roleLine}>
                    <div style={styles.companyName}>{exp.company}</div>
                    <div style={styles.startEndDate}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                    </div>
                  </div>
                </div>

                <p style={styles.description}>{exp.description}</p>

                <ul style={styles.bulletList}>
                  {exp.bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <div style={styles.footerRow}>
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.visitButton}
                  >
                    Visit Site
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
        <div style={{ marginTop: '32px' }}>
          <Banner text="Remember my resume? It’s still here!" />
        </div>
    </div>
  </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  outer:{
    display: 'flex',
    flexDirection: 'row',
  },
  
  container: {
    paddingLeft: 48,
    display: 'flex',
    flexDirection: 'column',
    // height: '100%',
    // overflowY: 'scroll',
  },

  page: {
    marginLeft: 70,
  },

  timelineAndExperience: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 32,
  },
  yearsColumnContainer: {
    // width: 100,
    // top: 250,
    // // paddingLeft: '10px',
    // // paddingTop: '50px',
    // boxSizing: 'border-box',
    // borderLeft: '2px dotted #445122', // the vertical dotted line
    // position: 'absolute',
    // alignSelf: 'flex-start',
    // height: 'fit-content',
    // zIndex: 1
      position: 'sticky',
      top: 100, // adjust based on navbar height
      minWidth: 100,
      borderLeft: '2px dotted #445122',
      marginRight: 24,
  },
  yearsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  year: {
    listStyle: 'none',
    fontSize: 20,
    paddingLeft: 16,
    position: 'relative',
    height: 80,
    lineHeight: '80px',
    color: '#445122',
    fontFamily: 'MillenniumBold',
  },
  yearDot: {
    width: 10,
    height: 10,
    backgroundColor: '#445122',
    borderRadius: '50%',
    position: 'absolute',
    left: '-6px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  },
  activeYear: {
    fontSize: 32,
    color: '#8a8f3e',
  },
  experienceColumn: {
    flexGrow: 1,
    overflowY: 'auto',
    paddingTop: '16px',
    paddingRight: '0px',
    paddingLeft: '70px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    boxSizing: 'border-box',
    maxWidth: 'calc(100% - 64px)'
  },
  experienceCard: {
    // #8a8f3e <--- Green
    border: '2px solid #ddd',
    padding: '25px',
    background: '#fff',
    width: '100%',
    boxShadow: '7px 7px 2px 1px rgba(0, 15, 6, 0.2)'
  },
  experienceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  experienceMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  cardHeader: {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 12,
  gap: 16,
},

logo: {
  width: 48,
  height: 48,
  objectFit: 'contain',
},

titleSection: {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
},

roleLine: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
},

role: {
  margin: 0,
  fontSize: 18,
  fontFamily: 'MillenniumBold',
},

location: {
  fontSize: 14,
  color: '#666',
  fontFamily: 'Millennium',
},

companyName: {
  fontSize: 14,
  color: '#555',
  marginTop: 4,
  fontFamily: 'Millennium',
},

startEndDate: {
  fontSize: 13,
  color: '#555',
  marginTop: 4,
  fontFamily: 'Millennium',
},

description: {
  margin: '8px 0',
  color: '#333',
  fontFamily: 'Millennium',
},

bulletList: {
  marginLeft: 16,
  marginBottom: 16,
  paddingLeft: 0,
  fontFamily: 'Millennium',
},

footerRow: {
  display: 'flex',
  justifyContent: 'flex-end',
},

visitButton: {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: 4,
  textDecoration: 'none',
  fontFamily: 'MillenniumBold',
},

// #timeline {
	// 	width: 500px;
	// 	height: 600px;
	// 	overflow: hidden;
	// 	margin: 40px auto;
	// 	position: relative;
	// 	background: url('http://www.csslab.cl/ejemplos/timelinr/latest/images/dot.gif') 3px top repeat-y;
	// }
	// 	#dates {
	// 		width: 100px;
	// 		height: 600px;
	// 		overflow: hidden;
	// 		float: left;
	// 	}
	// 		#dates li {
	// 			list-style: none;
	// 			width: 100px;
	// 			height: 100px;
	// 			line-height: 100px;
	// 			font-size: 24px;
	// 			padding-left: 10px;
	// 			background: url('http://www.csslab.cl/ejemplos/timelinr/latest/images/biggerdot.png') left center no-repeat;
	// 		}
	// 			#dates a {
	// 				line-height: 38px;
	// 				padding-bottom: 10px;
	// 			}
	// 			#dates .selected {
	// 		        font-size: 38px;
	// 			}
		// 		$(function(){
		// 	$().timelinr({
		// 		orientation: 	'vertical',
		// 		issuesSpeed: 	300,
		// 		datesSpeed: 	100,
		// 		arrowKeys: 		'true',
		// 		startAt:		3
		// 	})
		// });

};

export default Experience;
