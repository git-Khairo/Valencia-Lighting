import React, { useState, useEffect } from 'react';
import Section from '../Components/Section';

const Sections = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/api/sections')
      .then((response) => response.json())
      .then((data) => {
        setSections(data.Sections); // Set the sections data from API
      })
      .catch((error) => {
        console.error('Error fetching sections:', error);
      });
  }, []);

  return (
    <div className=" w-full m-0 md:w-full md:h-full mt-24">
      {sections.length > 0 ? (
        sections.map((section) => (
            
          <Section key={section.category.id} category={section.category} products={section.products} />
        ))
      ) : (
        <div>Loading sections...</div>
      )}
    </div>
  );
};

export default Sections;
