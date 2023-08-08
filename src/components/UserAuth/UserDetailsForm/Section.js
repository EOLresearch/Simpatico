function Section({ title, children }) {
  return (
    <div className="reg-section">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

export default Section;