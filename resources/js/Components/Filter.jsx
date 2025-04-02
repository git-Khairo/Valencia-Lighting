import { useState } from "react";
import { FaLightbulb, FaMinus, FaPlus, FaRegLightbulb } from "react-icons/fa";

const Filter = ({ updateFilter, categories, brand, setBrand, setCategories }) => {
  const [dropDownFilterIndoor, setDropDownFilterIndoor] = useState(false);
  const [dropDownFilterOutdoor, setDropDownFilterOutdoor] = useState(false);

    return ( 
       <div className="w-72 dark:bg-dark-secondary h-fit sticky top-[64px] overflow-y-auto hidden md:block my-5 transition-all duration-300 p-4 rounded-lg">
         <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">
           <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
         </div>

         {/* Brand Filter */}
         <div className="mb-4">
           <h3 className="font-semibold text-gray-700 dark:text-gray-300">Brand</h3>
           <div className="mt-2 space-y-4">
             <label htmlFor="sila" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
             <input type="radio" id="sila" name="brand" value="sila" className="peer hidden" onChange={(e) => setBrand(e.target.value)} />
             <span className="w-7 h-7 mr-2 flex items-center justify-center">
              {brand === 'sila' ? (
                <FaLightbulb size={20} />
              ) : (
                <FaRegLightbulb size={20}/>
              )}
            </span>
            Sila
             </label>
             <label htmlFor="radial" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
             <input type="radio" id="radial" name="brand" value="radial" className="peer hidden" onChange={(e) => setBrand(e.target.value)} />
             <span className="w-7 h-7 mr-2 flex items-center justify-center">
              {brand === 'radial' ? (
                <FaLightbulb size={20} />
              ) : (
                <FaRegLightbulb size={20}/>
              )}
            </span>
            Radial
             </label>
           </div>
         </div>

         {/* Categories Filter */}
         <div className="mb-4 mt-5">
           <h3 className="font-semibold text-gray-700 dark:text-gray-300">Categories</h3>
           <div className="mt-2 space-y-2">
            <div className={`flex justify-between items-center px-3 py-2 border-dashed border-b-2 ${dropDownFilterIndoor ? 'text-black border-black' : 'text-gray-400 border-gray-400'}`}  onClick={() => {setDropDownFilterIndoor(!dropDownFilterIndoor); setDropDownFilterOutdoor(false)}}>
            <h2 className="text-lg">Indoor</h2>
            {dropDownFilterIndoor ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`overflow-hidden transition-all duration-700 ease-in-out space-y-2 ${
                    dropDownFilterIndoor ? 'max-h-44 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                  }`}>
             {dropDownFilterIndoor && Array.from({ length: 5 }, (_, i) => (
               <label key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                 <input type="checkbox" className="form-checkbox h-4 w-4 accent-black" onChange={() => updateFilter(i + 1)} checked={categories.includes(i + 1)} />
                 <span>Category {i + 1}</span>
               </label>
             ))}
             </div>
            <div className={`flex justify-between items-center px-3 py-2 border-dashed border-b-2 ${dropDownFilterOutdoor ? 'text-black border-black' : 'text-gray-400 border-gray-400'}`} onClick={() => {setDropDownFilterOutdoor(!dropDownFilterOutdoor); setDropDownFilterIndoor(false)}}>
            <h2 className="text-lg">Outdoor</h2>
            {dropDownFilterOutdoor ? <FaMinus /> : <FaPlus/>}
            </div>
            <div className={`overflow-hidden transition-all duration-700 ease-in-out space-y-2 ${
                    dropDownFilterOutdoor ? 'max-h-44 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
                  }`}>
             {dropDownFilterOutdoor && Array.from({ length: 5 }, (_, i) => (
               <label key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                 <input type="checkbox" className="form-checkbox h-4 w-4 accent-black" onChange={() => updateFilter(i + 6)} checked={categories.includes(i + 6)} />
                 <span>Category {i + 6}</span>
               </label>
             ))}
             </div>
           </div>
         </div>

         {/* Clear Filters Button */}
         <button className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 mt-4 rounded transition" onClick={() => {setBrand(''); setCategories([])}}>
           Clear All
         </button>
       </div>
     );
}
 
export default Filter;