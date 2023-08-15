import React, { useEffect, useState } from 'react';

function Section({ title, children, isUpdate}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isUpdate) {
      setIsOpen(false);
    }
  }, [isUpdate]);

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
