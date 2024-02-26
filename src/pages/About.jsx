
import {
  css,
  express,
  git,
  github,
  html,
  javascript,
  mongodb,
  nodejs,
  react,
  tailwindcss,
  typescript,
  threejs,
  BITS,
  JVM,
  DAV,
  C,
  C1,
} from "../assets/icons";

const About = () => {
  return (
    <div style={{
      background: 'linear-gradient(to right, #f4c4f3, #fc67fa)',
      width: '100%',
      minHeight: '100vh',
    }}>
      <section className='intro max-container' style={{paddingTop:'100px',paddingBottom:'30px'}}>
        <p style={{fontSize: '48px', paddingBottom:'30px'}}>
          <span className='text-rose-700'>Hi, I'm</span> <span className='text-fuchsia-800 name' style={{ fontFamily: 'Arial, sans-serif' }}>Rohit Pathak</span>.
        </p>
        <p style={{fontSize: '24px',paddingBottom:'30px'}} className='text-rose-900'>
          I'm 4th yearite at BITS Pilani Hyderabad Campus.
        </p>
        <p style={{fontSize: '36px', paddingBottom:'30px'}} className='text-rose-700'>
          My Skills
        </p>
        <div className="grid-container" style={{paddingBottom:'30px'}}>
        <div style={{width:'50px'}} className="grid-item"><img className="grid-img" src={C} alt="C"/></div>
        <div style={{width:'50px'}} className="grid-item"><img className="grid-img" src={C1} alt="C++"/></div>
          <div className="grid-item"><img className="grid-img" src={css} alt="CSS"/></div>
          <div className="grid-item"><img className="grid-img" src={express} alt="Express"/></div>
          <div className="grid-item"><img className="grid-img" src={git} alt="Git"/></div>
          <div className="grid-item"><img className="grid-img" src={github} alt="GitHub"/></div>
          <div className="grid-item"><img className="grid-img" src={html} alt="HTML"/></div>
          <div className="grid-item"><img className="grid-img" src={javascript} alt="JavaScript"/></div>
          <div className="grid-item"><img className="grid-img" src={mongodb} alt="MongoDB"/></div>
          <div className="grid-item"><img className="grid-img" src={nodejs} alt="Node.js"/></div>
          <div style={{marginLeft:'-13px'}} className="grid-item"><img className="grid-img" src={react} alt="React"/></div>
          <div className="grid-item"><img className="grid-img" src={tailwindcss} alt="Tailwind CSS"/></div>
          <div className="grid-item"><img className="grid-img" src={typescript} alt="TypeScript"/></div>
          <div className="grid-item"><img className="grid-img" src={threejs} alt="Three.js" style={{ width: '60px', height: '60px' }}/></div>
        </div>

        <p style={{fontSize: '36px', paddingBottom:'30px'}} className='text-rose-700'>
          My Education
        </p>
         <div className="grid-item" style={{display:'flex', paddingBottom:'30px'}}>
          <img className="grid-img" style={{width:'100px'}} src={BITS} alt="" />
          <p style={{fontSize:'24px', paddingTop:'30px', marginLeft:'20px'}} className='text-rose-900'>BITS Pilani Hyderabad Campus | MSc Physics plus BE Mechanical | Ongoing |</p>
         </div>
          
         <div className="grid-item" style={{display:'flex', paddingBottom:'30px', marginLeft:'-7px'}}>
          <img className="grid-img" style={{width:'100px'}} src={JVM} alt="" />
          <p style={{fontSize:'24px', paddingTop:'30px', marginLeft:'22px'}} className='text-rose-900'>JVM SHYAMLI, CBSE | CLASS XII | 2020 |</p>
         </div>

          <div className="grid-item" style={{display:'flex', paddingBottom:'30px', marginLeft:'-10px'}}>
          <img className="grid-img" style={{width:'120px'}} src={DAV} alt="" />
          <p style={{fontSize:'24px', paddingTop:'30px', marginLeft:'8px'}} className='text-rose-900'>DAV BARIATU, CBSE | CLASS X | 2018 |</p>
         </div> 

          

        <p style={{fontSize: '36px', paddingBottom:'30px'}} className='text-rose-700'>Certifications</p>
        <ul>
          <li style={{fontSize:'24px'}} className='text-rose-900'><a style={{ textDecoration: 'underline'}} href="https://www.udemy.com/certificate/UC-0336701b-a02e-4005-a613-f414e5eb2026/">ANGELA YU Web Development</a></li>
          <li style={{fontSize:'24px'}} className='text-rose-900'><a style={{ textDecoration: 'underline'}} href="https://certificate.codingninjas.com/view/3b7768b12c4d65fe">CODING NINJA DSA Excellence</a></li>
          <li style={{fontSize:'24px'}} className='text-rose-900'><a style={{ textDecoration: 'underline'}} href="https://certificate.codingninjas.com/view/32cc02899010a2ca">CODING NINJA DSA Completion</a></li>
        </ul>
      </section>
    </div>
  );
}

export default About;
