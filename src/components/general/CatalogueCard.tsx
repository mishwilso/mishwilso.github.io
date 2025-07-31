// CatalogueCard.tsx
// renders one card in the list. toggles expanded state. either a thumbnail or full gallery.
// is this efficient? unclear. does it work? yes. so we ship :)

import React, { useEffect, useRef } from 'react';
import ExpandedCardCarousel from './ExpandedCardCarousel';
import { FaGithub } from 'react-icons/fa';

interface Project {
  id: number;
  name: string;
  date: string;
  description: string;
  tags: string[];
  icon: string;
  type: string;
  details: string[];
  gallery: string[];
  github?: string;
}

interface Props {
  project: Project;
  isExpanded: boolean;
  tagCategoryMap: { [tag: string]: string };
  categoryColors: { [category: string]: string };
  onToggleExpand: (id: number) => void;
  galleryIndex: number;
  styles: { [key: string]: React.CSSProperties };
  setFullscreenImage: (src: string | null) => void;
}

const CatalogueCard: React.FC<Props> = ({
  project,
  isExpanded,
  tagCategoryMap,
  categoryColors,
  onToggleExpand,
  galleryIndex,
  styles,
  setFullscreenImage
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const gallery = project.gallery || [];
  const activeImg = gallery[galleryIndex % gallery.length]; // keeps looping because why not

  // scroll to center when opened. because user experience.
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isExpanded]);

  return (
    <div
      key={project.id}
      ref={cardRef}
      style={{
        ...styles.card,
        ...(isExpanded ? styles.expandedCard : {}),
      }}
    >

      {/* main visual: either a static icon or full fancy slideshow */}
      <div style={styles.galleryWrapper}>
        {isExpanded ? (
          <ExpandedCardCarousel
            images={project.gallery}
            isActive={isExpanded}
            setFullscreenImage={setFullscreenImage}
          />
        ) : (
          <img src={project.icon} style={styles.icon} alt={project.name} />
        )}
      </div>

      {/* floating blobs of tech identity */}
      <div style={styles.row2}>
        {project.tags.map((tag) => (
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

      {/* name + one-liner */}
      <div style={styles.row1}>{project.name}</div>
      <div style={styles.row3}>{project.description}</div>

      {/* detail dump, but only if expanded. otherwise we're mysterious. */}
      {isExpanded && (
        <div style={{ width: '100%' }}>
          <ul style={styles.detailsList}>
            {project.details.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* footer: date stamp + buttons + maybe GitHub if you were feeling generous */}
      <div style={styles.row4}>
        <span style={styles.date}>{project.date}</span>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '1.5rem',
              color: '#24292e',
              backgroundColor: 'white',
              zIndex: 1,
              transition: 'opacity 0.2s',
              marginLeft: 'auto',
              marginRight: '16px',
              marginTop: '5px',
            }}
            title="View on GitHub"
          >
            <FaGithub />
          </a>
        )}

        <button
          style={styles.readMore}
          onClick={() => onToggleExpand(project.id)}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default CatalogueCard;
