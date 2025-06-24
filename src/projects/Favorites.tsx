import React, { useState, useEffect } from 'react';
import Banner from '../components/general/Banner';
import ProjectBlock from '../components/general/ProjectBlock';

const projects = [
  {
    name: "MishOS",
    description: "MishOS is my personal portfolio website, which you're currently on if you're reading this.\
    It's designed to feel like you're stepping into my computer at work: first you see my desk, then you enter\
    a Window-95 styles desktop fitted with draggable windows, a rip-off of terminal, and a retro vibe. It's sort\
    a love letter to the old operating system that started my love computers and programming and how my younger self\
    wanted to be in a machine.",
    sub_description:"I deeply inspired by Henry Hefferman's website, which told I could definitely create te website \
    I've envisioned. I designed and coded the entire thing from scratch using React, Typescript, and Three.js. I\
    wanted something that was fun but technical- sort of like building video game. One o the hardest parts was stitching the 3D\
    and 2D views into a seamless experience, and getting things like lighting, dark mode, and UI interactions to behave\
    in a single-page React app. MishOS pushed me to deepen my forntend skills, especially in creative design and state management.\
    This website in still a work-in-progress and I know add more features will be an absolute blast.",
    images: [
      { src: "/projects/mishos1.jpeg", caption: "Blender Rendering of Main landing screen" },
      { src: "/projects/mishos2.jpeg", caption: "Sketch of Portfolio Website Home Page" },
      { src: "/projects/mishos3.gif", caption: "Test Demo of 3D to 2D Flow" }
    ],
    github: "https://github.com/mishwilso/mishwilso.github.io",
    route: "mishos"
  },
  {
    name: "Roommease",
    description: "Roomease is a mobile app I helped deisgn and build to make living with roomates easier. The idea\
    came from real life scenarios I was ffacing at the time- splitting chores, buying groceries, and syncing calenders wih my roomates\
    was a mess, so I wanted an app that could cetralize all of that. Roomease includes shared grocery and chores lists, a\
    group chat, aand a calender so everyone's on the same page.",
    sub_description:"I was the lead designer and programmer for the app. I mapped out the entire UI in Figma, scoped out the\
    core features, and coordinated task assignments for our team. We built the app using Swift and integrated Google Firebase\
    or login and cloud sync. Even though we only had a few months, I'm super proud o how unctional and polished it turned out. \
    It was one of those projects where I really got to flex both the design and technical sides of app development. I also got\
    to learn a lot about team coordination and problem-solving along the way.",
    images: [
      { src: "/projects/roommease1.png" , caption: "Figma Mockup of Roomease"},
      { src: "/projects/roommease2.png" , caption: "Final Layout"},
      { src: "/projects/roommease3.gif" , caption: "Walkthrough Demo of Groceries"},
      { src: "/projects/roommease4.gif" , caption: "Walkthrough Demo of Chores"}
    ],
    github: "https://github.com/mishwilso/CS3750_Roomease",
    route: "roommease"
  },
  {
    name: "Differentially Private Quantiles Research",
    description: "This was my graduate research project, where I did a deep-dive into differentially private quantile algorithms. If\
     you're not in the privacy world: differential rpivacy is a way to learn from data without exposing sensitive information, and quantile\
      estimation is about figuring out values like the median or precentiles in a dataset. I compared three leading algorithms  — UQE, AQ, and JointExp —\
      and tested how they handled different data distributions, privacy levels, and dataset sizes. ",
    sub_description:"I wrote ll the experiments and analysis code in Python and visualized results with Matplotlib, then pulled everything into a\
    Latex writeup. A lot fo the challenge was understanding the theory sharpened my research and analysis skills and deepened my\
    understandin of privacy tech, which is an area I care a lot about!",
    images: [
      { src: "/projects/dpquantile1.jpeg" , caption: "Comparison of AQ vs. JointExp error at varying epsilon values"},
      { src: "/projects/dpquantile2.jpeg" , caption: "Quantile estimation accuracy across distributions"},
      { src: "/projects/dpquantile3.jpeg" , caption: "Excerpt from final paper write-up"}
    ],
    github: "https://github.com/yourusername/roommease",
    route: "dpquantile"
  },
  {
    name: "Accessible Authentication Research",
    description: "This one was a research project I worked on with a partner where we explored more accessible authentication\
    methods for neurodivergent users. We developed a Flask-based website that acted as an interactive survey: users would try different\
     login methods like PINs, image grids, and pattern-based systems, and we'd record usability feeback and task success rates.",
    sub_description:"I was the elad developer and handled building out the Flask app and integrating the different login flows. \
    The most interesting challenege was creating smooth transitions between each method so the experience felt consistent and didn't\
    frustrate users. I dove deep into designing this study, since it meant a lot to me as a nuerodivergent individual who struggled with\
     certain authentication methods. This project was a grat blend of frontend skills and research thinking, and made me think more about\
      inclusive tech design.",
    images: [
      { src: "/projects/auth1.jpeg" , caption: "PIN-based login prototype"},
      { src: "/projects/auth2.jpeg" , caption: "Pattern-based login prototype"},
      { src: "/projects/auth3.jpeg" , caption: "Image-grid authentication demo"},
      { src: "/projects/auth5.gif" , caption: "Flow of the survey progression Phase 1"}

    ],
    github: "https://github.com/mishwilso/Accessible_Authentication",
    route: "auth"
  },
  {
    name: "RasPip Boy",
    description: "This was a weird one but a fun one- we recreated the Pip-Boy from Fallout as a real-world Raspberry Pi-based device, \
    but instead of a post-apocalyptic write computer, it was a Tomagotchi-style pet simulator. You cared for a little Pip-boy character using\
     your inventory, and instead o an in-game radia, it played a cycling playlist from local iles.",
    sub_description:"I was the lead deisgner and lead programmer. I built the pip-boy character in Pygame, helped wire up the UI on the physical\
    screen , and troubleshot a otn of weird hardware problems. This project involved soldering, 3D modeling for the case, and a good bit of low-level\
    Pi tinkering. It was chatc but incredible rewarding, and we even placed 3rd at our Annual CS Fair! It taught me a lot about physical computing and \
    integrating sotware with hardware in a fun way.",
    images: [
      { src: "/projects/raspip1.jpeg" , caption: "RasPip-Boy on display"},
      { src: "/projects/raspip2.jpeg" , caption: "Demo wiring for speaker and LED"},
      { src: "/projects/raspip3.jpeg" , caption: " 3D Printed RasPip casing"},
      { src: "/projects/raspip4.jpeg" , caption: "RasPip-Boy at CS Fair"},
      { src: "/projects/raspip5.jpeg" , caption: "CS Professor wearing RasPip-Boy"},
    ],
    github: "https://github.com/mishwilso/raspip-boy",
    route: "raspip"
  },
];

const Favorites = () => {

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <div className="site-page-content">
      <div className="page-background" style={styles.container}>
      <div className="page-background" style={styles.container}>
        <h1 style={{fontFamily: 'Pixelout', marginBottom: 10}}>Favorites</h1>
        <p style={{marginTop: '5px', fontSize: '15px'}}>
          These are a few of my favorite projects with a brief description about them. 
          Feel free to check out my GitHub page or read more about each one!
        </p>

        <Banner text="Remember my resume? It’s still here!" />

        {projects.map((project, index) => (
          <React.Fragment key={project.name}>
          <ProjectBlock
            project={project}
            fullscreenImage={fullscreenImage}
            setFullscreenImage={setFullscreenImage}
          />
          {index < projects.length - 1 && <hr style={styles.divider} />}
          </React.Fragment>
        ))}

        <Banner text="Remember my resume? It’s still here!" />

      </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  divider: {
  border: 'none',
  borderTop: '1px solid #333',
  margin: '40px 0',
  width: '100%',
  },
  modalOverlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
},
modalContent: {
  position: 'relative',
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
},
fullscreenImage: {
  maxWidth: '100%',
  maxHeight: '80vh',
  display: 'block',
},
closeButton: {
  position: 'absolute',
  top: 8,
  right: 12,
  background: 'transparent',
  color: '#333',
  fontSize: 24,
  border: 'none',
  cursor: 'pointer',
},
};

export default Favorites;
