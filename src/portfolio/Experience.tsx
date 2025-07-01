import React, { useRef, useState, useEffect } from 'react';
import Banner from '../components/general/Banner';
import { useDesktop } from '../components/Desktop/DesktopContext';



const experiences = [
  {
    role: 'Graduate Teaching Assistant',
    company: 'University of Vermont',
    location: 'Burlington, VT',
    website: 'https://www.uvm.edu',
    startDate: '2024-08-01',
    endDate: '2025-05-01',
    description: 'Led course labs and provided debugging support for core Computer Science classes.',
    bullets: [
      'Designed an Intro to Databases curriculum, emphasizing SQL fundamentals and design theory',
      'Reviewed and debugged student Java & Python code, reducing common errors by 30%',
      'Mentored over 100 students in software best practices, boosting project completion rates by 25%'
    ],
    logo: 'uvm.png'
  },
  {
    role: 'Information Technology Intern',
    company: 'Burlington Electric Department',
    location: 'Burlington, VT',
    website: 'https://www.burlingtonelectric.com',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    description: 'Implemented differentially private quantile algorithms and built internal tools.',
    bullets: [
      'Conducted benchmark analysis of DP quantile algorithms to inform privacy-preserving data pipelines',
      'Developed Python REST services to automate data ingestion, improving processing throughput by 40%',
      'Collaborated in an Agile team using Git for version control and CI/CD for seamless deployments'
    ],
    logo: 'bed.png'
  },
  {
    role: 'Undergraduate Teaching Assistant',
    company: 'University of Vermont',
    location: 'Burlington, VT',
    website: 'https://www.uvm.edu',
    startDate: '2022-09-01',
    endDate: '2024-05-01',
    description: 'Assisted professors in delivering labs and grading for core CS undergraduate courses.',
    bullets: [
      'Instructed 200+ students in Data Structures, Python, Java, and Software Engineering labs',
      'Authored new lab activities and debugging guides, enhancing student comprehension',
      'Co-wrote curriculum materials for an applied Databases course, achieving 90% student satisfaction'
    ],
    logo: 'uvm.png'
  },
  {
    role: 'STEM Ambassador',
    company: 'University of Vermont',
    location: 'Burlington, VT',
    website: 'https://www.uvm.edu',
    startDate: '2021-09-01',
    endDate: '2025-05-01',
    description: 'Led technical workshops and outreach to K–12 students across Vermont.', 
    bullets: [
      'Taught over 400 K–12 students in 30+ schools about programming, robotics, and STEM careers',  // :contentReference[oaicite:0]{index=0}
      'Coordinated and judged FIRST Robotics competitions as part of the DEI Committee',           // :contentReference[oaicite:1]{index=1}
      'Volunteered weekly with Girls Who Code, mentoring diverse cohorts of student programmers'   // :contentReference[oaicite:2]{index=2}
    ],
    logo: '4h.png'
  },

  {
    role: 'Undergraduate Research Assistant',
    company: 'University of Vermont',
    location: 'Burlington, VT',
    website: 'https://www.uvm.edu',
    startDate: '2023-11-01',
    endDate:   '2024-05-01',
    description: 'Supported privacy-preserving distributed systems research and algorithm development.',
    bullets: [
      'Designed multi-party computation (MPC) algorithms to enable secure collaborative research',  // :contentReference[oaicite:3]{index=3}
      'Contributed over 10K lines of code via GitHub to benchmark and simulation projects',        // :contentReference[oaicite:4]{index=4}
      'Analyzed runtime, accuracy, and efficiency trade-offs and presented findings to faculty'     // :contentReference[oaicite:5]{index=5}
    ],
    logo: 'uvm.png'
  },
  {
    role: 'Summer Science Educator',
    company: 'Vermont Summer STEM',
    location: 'Various, VT',
    website: 'https://www.uvm.edu',
    startDate: '2022-06-01',
    endDate:   '2022-08-31',
    description: 'Developed and delivered STEM outreach programs to K–12 students in rural Vermont.',
    bullets: [
      'Designed age-appropriate curricula in robotics, coding, and engineering for libraries and schools',
      'Secured a $5K grant to fund materials, travel, and outreach supplies for multi-county program',
      'Coordinated with town libraries and community centers to schedule and promote summer workshops',
      'Trained and led two volunteer assistants to deliver hands-on STEM activities to 150+ students'
    ],
    logo: '4h.png'
  },

  {
    role: 'Seasonal Cabana Worker',
    company: 'Six Flags America (Water Park)',
    location: 'Upper Marlboro, MD',
    website: 'https://www.sixflags.com/america',
    startDate: '2020-06-01',
    endDate:   '2022-08-31',
    description: 'Maintained cabana amenities and provided guest services in the water park area.',
    bullets: [
      'Cleaned and reset 20+ private cabanas daily to ensure hygienic, guest-ready areas',
      'Assisted guests with check-in/out, towel service, and amenity requests in high-volume season',
      'Operated POS terminal to take food and beverage orders, processing $1K+ in daily sales',
      'Enforced park safety and water-park policies, coordinating with lifeguards and management'
    ],
    logo: 'six_flags.png'
  },

  {
    role: 'Orientation Leader',
    company: 'University of Vermont',
    location: 'Burlington, VT',
    website: 'https://www.uvm.edu',
    startDate: '2023-08-01',
    endDate:   '2023-09-15',
    description: 'Welcomed and guided new UVM students through their first weeks on campus.',
    bullets: [
      'Led campus tours and icebreaker activities for groups of 20–30 incoming students',
      'Facilitated Q&A sessions on academic resources, housing, and campus life',
      'Mentored first-years one-on-one, helping them navigate registration and student services',
      'Collaborated with Residential Life and Admissions to coordinate orientation events'
    ],
    logo: 'uvm.png'
  }
];


function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' , year: 'numeric', });
}



const Experience: React.FC = () => {
  const { launchWindow } = useDesktop();
  const sortedExperiences = [...experiences].sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
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

    <h1 style={{fontFamily: 'Pixelout', marginBottom: 10, fontSize: '4rem'}}> Experience </h1>
    <p style={{marginTop: '5px', fontSize: '15px'}}> Here's a catalogue of all of my work experience!</p>
      <div style={{ marginTop: '0px' }}>
        <Banner text="Remember my resume? It’s still here!" onClick={() => launchWindow('resume')} />
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
                    src={`../logos/${exp.logo}`} // Example: /logos/techcorp.png
                    alt={`${exp.logo} logo`}
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
          <Banner text="Remember my resume? It’s still here!" onClick={() => launchWindow('resume')} />
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
