import React, { useState } from 'react';

function Section({ title, children,}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="reg-section">
      <h4 onClick={() => setIsOpen(!isOpen)} style={{cursor: 'pointer'}}>
        {title} {isOpen ? '▲' : '▼'}
      </h4>
      {isOpen && children}
    </div>
  );
}

export default Section;
