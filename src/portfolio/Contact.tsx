import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Banner from '../components/general/Banner';
import { useDesktop } from '../components/desktop/DesktopContext';


const Contact: React.FC = () => {
  const { launchWindow } = useDesktop();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xkgbpzrb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent!');
        setFormData({ name: '', company: '', email: '', message: '' });
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      alert('Failed to send message.');
    }
  };


  const [copied, setCopied] = useState(false);

  return (
  <div className="site-page-content">
    <div className="page-background" style={styles.container}>
      <h1 style={{fontFamily: 'Pixelout', marginBottom: 5, fontSize: '4rem'}}>Contact</h1>
      <p>If you're interested in working together or just want to say hi, feel free to reach out! I'm currently looking for opportunities in software and research positions.</p>

      <div style={styles.socials}>
        <a href="https://github.com/mishwilso" target="_blank" rel="noopener noreferrer" style={styles.iconButton}>
          <FaGithub size={24} /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/mish-wilson/" target="_blank" rel="noopener noreferrer" style={styles.iconButton}>
          <FaLinkedin size={24} /> LinkedIn
        </a>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name (optional)"
          value={formData.company}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.submitButton}>Send Message</button>
      </form>

      <p style={{ marginTop: 32 }}>
        Prefer email? Reach me at:{' '}
        <strong
          style={{ cursor: 'pointer', textDecoration: 'underline', color: '#0077cc' }}
          onClick={() => {
            navigator.clipboard.writeText('mishwilsonk@gmail.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          mishwilsonk@gmail.com
        </strong>
        {copied && <span style={{ marginLeft: 10, color: 'green' }}>Copied to clipboard!</span>}
      </p>

      <div style={{ marginTop: '-20px' }}>
        <Banner text="Remember my resume? It’s still here!" onClick={() => launchWindow('resume')} />
      </div>
    </div>
  </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingLeft: 48,
    paddingRight: 48,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Millennium',
    fontSize: 15,
    boxSizing: 'border-box',
    flex: 1
  },
  socials: {
    display: 'flex',
    gap: '24px',
    marginTop: 16,
    marginBottom: 32,
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f0f0f0',
    padding: '8px 16px',
    borderRadius: 8,
    textDecoration: 'none',
    color: 'black'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  input: {
    padding: '12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  textarea: {
    padding: '12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: 120
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer'
  }
};

export default Contact;
