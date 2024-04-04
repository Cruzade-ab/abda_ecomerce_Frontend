'use client'
import React , { useState, useEffect } from "react";

import { BrandInterface, ColorInterface, SectionInterface } from "@/app/lib/products/ProductInterface";
import { FilterParams } from "@/app/lib/admin/Filter/FilterType";

type FilterComponentProps = {
    onFilterChange: (filters: FilterParams) => void;
};

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange }) => {
    const [brands, setBrands] = useState<BrandInterface[]>([]);
    const [colors, setColors] = useState<ColorInterface[]>([]);
    const [sections, setSections] = useState<SectionInterface[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSection, setSelectedSection] = useState<string>('');
    const [selectedMinValue, setSelectedMinValue] = useState<string>('');
    const [selectedMaxValue, setSelectedMaxValue] = useState<string>('');


    useEffect(() => {
    const fetchFiltersData = async () => {
        try {
            const [brandsResponse, colorsResponse, sectionsResponse] = await Promise.all([
              fetch('http://localhost:4000/api/filter/brands'),
              fetch('http://localhost:4000/api/filter/colors'),
              fetch('http://localhost:4000/api/filter/sections')
            ]);
    
            if (brandsResponse.ok) {
              setBrands(await brandsResponse.json());
            }
            if (colorsResponse.ok) {
              setColors(await colorsResponse.json());
            }
            if (sectionsResponse.ok) {
              setSections(await sectionsResponse.json());
            }
          } catch (error) {
            console.error('Failed to fetch filter data:', error);
          }
        };
    
        fetchFiltersData();
      }, []);
    
    const handleFilterChange = () => {
        onFilterChange({
          brand_name: selectedBrand,
          color_name: selectedColor,
          section_name: selectedSection,
          min_value: selectedMinValue,
          max_value: selectedMaxValue
        });
      };
    
      return (
        <div>
          {/* Brand dropdown */}
          <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
            <option value="">Select Brand</option>
            {brands.map(brand => (
              <option key={brand.brand_id} value={brand.brand_name}>
                {brand.brand_name}
              </option>
            ))}
          </select>
    
          {/* Color dropdown */}
          <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
            <option value="">Select Color</option>
            {colors.map(color => (
              <option key={color.color_id} value={color.color_name}>
                {color.color_name}
              </option>
            ))}
          </select>
    
          {/* Section dropdown */}
          <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
            <option value="">Select Section</option>
            {sections.map(section => (
              <option key={section.section_id} value={section.section_name}>
                {section.section_name}
              </option>
            ))}
          </select>
    
          <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
      );
    };
    
    export default FilterComponent;