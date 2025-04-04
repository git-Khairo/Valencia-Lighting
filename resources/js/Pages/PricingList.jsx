import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt, } from '@fortawesome/free-solid-svg-icons';
import ReactCountryFlag from 'react-country-flag';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import ProductCard from '../Components/ProductCard';
import useFetch from '../useFetch';

const PricingList = () => {
  const [formData, setFormData] = useState({
    name: '', lastName: '', phone: '', email: '', city: '', country: ''
  });
  const { data: RelatedProducts, loading:RelatedLoading, error:RelatedError} = useFetch('/api/latestProducts');
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    }, [cart]);

  const [countryPrefix, setCountryPrefix] = useState('+1');

  // Complete list of all 195 sovereign countries with codes and prefixes
  const countryPrefixes = [
    { code: 'AF', prefix: '+93', name: 'Afghanistan' },
    { code: 'AL', prefix: '+355', name: 'Albania' },
    { code: 'DZ', prefixes: '+213', name: 'Algeria' },
    { code: 'AD', prefix: '+376', name: 'Andorra' },
    { code: 'AO', prefix: '+244', name: 'Angola' },
    { code: 'AG', prefix: '+1-268', name: 'Antigua and Barbuda' },
    { code: 'AR', prefix: '+54', name: 'Argentina' },
    { code: 'AM', prefix: '+374', name: 'Armenia' },
    { code: 'AU', prefix: '+61', name: 'Australia' },
    { code: 'AT', prefix: '+43', name: 'Austria' },
    { code: 'AZ', prefix: '+994', name: 'Azerbaijan' },
    { code: 'BS', prefix: '+1-242', name: 'Bahamas' },
    { code: 'BH', prefix: '+973', name: 'Bahrain' },
    { code: 'BD', prefix: '+880', name: 'Bangladesh' },
    { code: 'BB', prefix: '+1-246', name: 'Barbados' },
    { code: 'BY', prefix: '+375', name: 'Belarus' },
    { code: 'BE', prefix: '+32', name: 'Belgium' },
    { code: 'BZ', prefix: '+501', name: 'Belize' },
    { code: 'BJ', prefix: '+229', name: 'Benin' },
    { code: 'BT', prefix: '+975', name: 'Bhutan' },
    { code: 'BO', prefix: '+591', name: 'Bolivia' },
    { code: 'BA', prefix: '+387', name: 'Bosnia and Herzegovina' },
    { code: 'BW', prefix: '+267', name: 'Botswana' },
    { code: 'BR', prefix: '+55', name: 'Brazil' },
    { code: 'BN', prefix: '+673', name: 'Brunei' },
    { code: 'BG', prefix: '+359', name: 'Bulgaria' },
    { code: 'BF', prefix: '+226', name: 'Burkina Faso' },
    { code: 'BI', prefix: '+257', name: 'Burundi' },
    { code: 'CV', prefix: '+238', name: 'Cabo Verde' },
    { code: 'KH', prefix: '+855', name: 'Cambodia' },
    { code: 'CM', prefix: '+237', name: 'Cameroon' },
    { code: 'CA', prefix: '+1', name: 'Canada' },
    { code: 'CF', prefix: '+236', name: 'Central African Republic' },
    { code: 'TD', prefix: '+235', name: 'Chad' },
    { code: 'CL', prefix: '+56', name: 'Chile' },
    { code: 'CN', prefix: '+86', name: 'China' },
    { code: 'CO', prefix: '+57', name: 'Colombia' },
    { code: 'KM', prefix: '+269', name: 'Comoros' },
    { code: 'CG', prefix: '+242', name: 'Congo, Republic of the' },
    { code: 'CD', prefix: '+243', name: 'Congo, Democratic Republic of the' },
    { code: 'CR', prefix: '+506', name: 'Costa Rica' },
    { code: 'CI', prefix: '+225', name: "Côte d'Ivoire" },
    { code: 'HR', prefix: '+385', name: 'Croatia' },
    { code: 'CU', prefix: '+53', name: 'Cuba' },
    { code: 'CY', prefix: '+357', name: 'Cyprus' },
    { code: 'CZ', prefix: '+420', name: 'Czech Republic' },
    { code: 'DK', prefix: '+45', name: 'Denmark' },
    { code: 'DJ', prefix: '+253', name: 'Djibouti' },
    { code: 'DM', prefix: '+1-767', name: 'Dominica' },
    { code: 'DO', prefix: '+1-809', name: 'Dominican Republic' }, // Also +1-829, +1-849
    { code: 'EC', prefix: '+593', name: 'Ecuador' },
    { code: 'EG', prefix: '+20', name: 'Egypt' },
    { code: 'SV', prefix: '+503', name: 'El Salvador' },
    { code: 'GQ', prefix: '+240', name: 'Equatorial Guinea' },
    { code: 'ER', prefix: '+291', name: 'Eritrea' },
    { code: 'EE', prefix: '+372', name: 'Estonia' },
    { code: 'SZ', prefix: '+268', name: 'Eswatini' },
    { code: 'ET', prefix: '+251', name: 'Ethiopia' },
    { code: 'FJ', prefix: '+679', name: 'Fiji' },
    { code: 'FI', prefix: '+358', name: 'Finland' },
    { code: 'FR', prefix: '+33', name: 'France' },
    { code: 'GA', prefix: '+241', name: 'Gabon' },
    { code: 'GM', prefix: '+220', name: 'Gambia' },
    { code: 'GE', prefix: '+995', name: 'Georgia' },
    { code: 'DE', prefix: '+49', name: 'Germany' },
    { code: 'GH', prefix: '+233', name: 'Ghana' },
    { code: 'GR', prefix: '+30', name: 'Greece' },
    { code: 'GD', prefix: '+1-473', name: 'Grenada' },
    { code: 'GT', prefix: '+502', name: 'Guatemala' },
    { code: 'GN', prefix: '+224', name: 'Guinea' },
    { code: 'GW', prefix: '+245', name: 'Guinea-Bissau' },
    { code: 'GY', prefix: '+592', name: 'Guyana' },
    { code: 'HT', prefix: '+509', name: 'Haiti' },
    { code: 'HN', prefix: '+504', name: 'Honduras' },
    { code: 'HU', prefix: '+36', name: 'Hungary' },
    { code: 'IS', prefix: '+354', name: 'Iceland' },
    { code: 'IN', prefix: '+91', name: 'India' },
    { code: 'ID', prefix: '+62', name: 'Indonesia' },
    { code: 'IR', prefix: '+98', name: 'Iran' },
    { code: 'IQ', prefix: '+964', name: 'Iraq' },
    { code: 'IE', prefix: '+353', name: 'Ireland' },
    { code: 'IL', prefix: '+972', name: 'Israel' },
    { code: 'IT', prefix: '+39', name: 'Italy' },
    { code: 'JM', prefix: '+1-876', name: 'Jamaica' },
    { code: 'JP', prefix: '+81', name: 'Japan' },
    { code: 'JO', prefix: '+962', name: 'Jordan' },
    { code: 'KZ', prefix: '+7', name: 'Kazakhstan' }, // Shares +7 with Russia
    { code: 'KE', prefix: '+254', name: 'Kenya' },
    { code: 'KI', prefix: '+686', name: 'Kiribati' },
    { code: 'KP', prefix: '+850', name: 'North Korea' },
    { code: 'KR', prefix: '+82', name: 'South Korea' },
    { code: 'KW', prefix: '+965', name: 'Kuwait' },
    { code: 'KG', prefix: '+996', name: 'Kyrgyzstan' },
    { code: 'LA', prefix: '+856', name: 'Laos' },
    { code: 'LV', prefix: '+371', name: 'Latvia' },
    { code: 'LB', prefix: '+961', name: 'Lebanon' },
    { code: 'LS', prefix: '+266', name: 'Lesotho' },
    { code: 'LR', prefix: '+231', name: 'Liberia' },
    { code: 'LY', prefix: '+218', name: 'Libya' },
    { code: 'LI', prefix: '+423', name: 'Liechtenstein' },
    { code: 'LT', prefix: '+370', name: 'Lithuania' },
    { code: 'LU', prefix: '+352', name: 'Luxembourg' },
    { code: 'MG', prefix: '+261', name: 'Madagascar' },
    { code: 'MW', prefix: '+265', name: 'Malawi' },
    { code: 'MY', prefix: '+60', name: 'Malaysia' },
    { code: 'MV', prefix: '+960', name: 'Maldives' },
    { code: 'ML', prefix: '+223', name: 'Mali' },
    { code: 'MT', prefix: '+356', name: 'Malta' },
    { code: 'MH', prefix: '+692', name: 'Marshall Islands' },
    { code: 'MR', prefix: '+222', name: 'Mauritania' },
    { code: 'MU', prefix: '+230', name: 'Mauritius' },
    { code: 'MX', prefix: '+52', name: 'Mexico' },
    { code: 'FM', prefix: '+691', name: 'Micronesia' },
    { code: 'MD', prefix: '+373', name: 'Moldova' },
    { code: 'MC', prefix: '+377', name: 'Monaco' },
    { code: 'MN', prefix: '+976', name: 'Mongolia' },
    { code: 'ME', prefix: '+382', name: 'Montenegro' },
    { code: 'MA', prefix: '+212', name: 'Morocco' },
    { code: 'MZ', prefix: '+258', name: 'Mozambique' },
    { code: 'MM', prefix: '+95', name: 'Myanmar' },
    { code: 'NA', prefix: '+264', name: 'Namibia' },
    { code: 'NR', prefix: '+674', name: 'Nauru' },
    { code: 'NP', prefix: '+977', name: 'Nepal' },
    { code: 'NL', prefix: '+31', name: 'Netherlands' },
    { code: 'NZ', prefix: '+64', name: 'New Zealand' },
    { code: 'NI', prefix: '+505', name: 'Nicaragua' },
    { code: 'NE', prefix: '+227', name: 'Niger' },
    { code: 'NG', prefix: '+234', name: 'Nigeria' },
    { code: 'NO', prefix: '+47', name: 'Norway' },
    { code: 'OM', prefix: '+968', name: 'Oman' },
    { code: 'PK', prefix: '+92', name: 'Pakistan' },
    { code: 'PW', prefix: '+680', name: 'Palau' },
    { code: 'PA', prefix: '+507', name: 'Panama' },
    { code: 'PG', prefix: '+675', name: 'Papua New Guinea' },
    { code: 'PY', prefix: '+595', name: 'Paraguay' },
    { code: 'PE', prefix: '+51', name: 'Peru' },
    { code: 'PH', prefix: '+63', name: 'Philippines' },
    { code: 'PL', prefix: '+48', name: 'Poland' },
    { code: 'PT', prefix: '+351', name: 'Portugal' },
    { code: 'QA', prefix: '+974', name: 'Qatar' },
    { code: 'RO', prefix: '+40', name: 'Romania' },
    { code: 'RU', prefix: '+7', name: 'Russia' }, // Shares +7 with Kazakhstan
    { code: 'RW', prefix: '+250', name: 'Rwanda' },
    { code: 'KN', prefix: '+1-869', name: 'Saint Kitts and Nevis' },
    { code: 'LC', prefix: '+1-758', name: 'Saint Lucia' },
    { code: 'VC', prefix: '+1-784', name: 'Saint Vincent and the Grenadines' },
    { code: 'WS', prefix: '+685', name: 'Samoa' },
    { code: 'SM', prefix: '+378', name: 'San Marino' },
    { code: 'ST', prefix: '+239', name: 'São Tomé and Príncipe' },
    { code: 'SA', prefix: '+966', name: 'Saudi Arabia' },
    { code: 'SN', prefix: '+221', name: 'Senegal' },
    { code: 'RS', prefix: '+381', name: 'Serbia' },
    { code: 'SC', prefix: '+248', name: 'Seychelles' },
    { code: 'SL', prefix: '+232', name: 'Sierra Leone' },
    { code: 'SG', prefix: '+65', name: 'Singapore' },
    { code: 'SK', prefix: '+421', name: 'Slovakia' },
    { code: 'SI', prefix: '+386', name: 'Slovenia' },
    { code: 'SB', prefix: '+677', name: 'Solomon Islands' },
    { code: 'SO', prefix: '+252', name: 'Somalia' },
    { code: 'ZA', prefix: '+27', name: 'South Africa' },
    { code: 'SS', prefix: '+211', name: 'South Sudan' },
    { code: 'ES', prefix: '+34', name: 'Spain' },
    { code: 'LK', prefix: '+94', name: 'Sri Lanka' },
    { code: 'SD', prefix: '+249', name: 'Sudan' },
    { code: 'SR', prefix: '+597', name: 'Suriname' },
    { code: 'SE', prefix: '+46', name: 'Sweden' },
    { code: 'CH', prefix: '+41', name: 'Switzerland' },
    { code: 'SY', prefix: '+963', name: 'Syria' },
    { code: 'TJ', prefix: '+992', name: 'Tajikistan' },
    { code: 'TZ', prefix: '+255', name: 'Tanzania' },
    { code: 'TH', prefix: '+66', name: 'Thailand' },
    { code: 'TL', prefix: '+670', name: 'Timor-Leste' },
    { code: 'TG', prefix: '+228', name: 'Togo' },
    { code: 'TO', prefix: '+676', name: 'Tonga' },
    { code: 'TT', prefix: '+1-868', name: 'Trinidad and Tobago' },
    { code: 'TN', prefix: '+216', name: 'Tunisia' },
    { code: 'TR', prefix: '+90', name: 'Turkey' },
    { code: 'TM', prefix: '+993', name: 'Turkmenistan' },
    { code: 'TV', prefix: '+688', name: 'Tuvalu' },
    { code: 'UG', prefix: '+256', name: 'Uganda' },
    { code: 'UA', prefix: '+380', name: 'Ukraine' },
    { code: 'AE', prefix: '+971', name: 'United Arab Emirates' },
    { code: 'GB', prefix: '+44', name: 'United Kingdom' },
    { code: 'US', prefix: '+1', name: 'United States' },
    { code: 'UY', prefix: '+598', name: 'Uruguay' },
    { code: 'UZ', prefix: '+998', name: 'Uzbekistan' },
    { code: 'VU', prefix: '+678', name: 'Vanuatu' },
    { code: 'VA', prefix: '+39', name: 'Vatican City' }, // Uses +39 via Italy
    { code: 'VE', prefix: '+58', name: 'Venezuela' },
    { code: 'VN', prefix: '+84', name: 'Vietnam' },
    { code: 'YE', prefix: '+967', name: 'Yemen' },
    { code: 'ZM', prefix: '+260', name: 'Zambia' },
    { code: 'ZW', prefix: '+263', name: 'Zimbabwe' }
  ];

  const countries = useMemo(() => countryPrefixes.map(c => c.name).sort(), []);

  const handleQuantityChange = (id, newQuantity) => {
    if(newQuantity > 0){
      const updatedCart = cart.map((item) => 
        item.id === id 
            ? { ...item, quantity: newQuantity }
            : item
    );
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    }else{
      handleRemoveProduct(id);
    }
  };

  const handleRemoveProduct = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id)
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePrefixChange = (e) => {
    setCountryPrefix(e.target.value);
    const selectedCountry = countryPrefixes.find(c => c.prefix === e.target.value);
    if (selectedCountry) {
      setFormData(prev => ({ ...prev, country: selectedCountry.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const RelatedProductsSlider = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 425, settings: { slidesToShow: 1 } }
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-6">
        {loading ? (
        <div>Loading....</div>
      ) : error ? (
        <div className="text-center text-red-500 py-5">
          <p>Error loading sections: {error.message || 'Something went wrong'}</p>
          <button
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : data ? (
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-medium text-gray-900">Products</h2>
            </div>
            <div className="overflow-y-auto max-h-[400px] sm:max-h-[500px] p-4 sm:p-6">
              {!data ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {data && data.map(product => (
                    <li key={product.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover object-top" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-sm sm:text-base font-medium text-gray-900">{product.name}</h3>
                            <p className="mt-1 text-xs sm:text-sm text-gray-500">{product.description}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center border border-gray-300 rounded-md w-fit">
                            <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)} className="px-2 sm:px-3 py-1 text-gray-900 hover:bg-gray-100 rounded-l-md">
                              <FontAwesomeIcon icon={faMinus} className="text-xs" />
                            </button>
                            <input type="text" value={product.quantity} readOnly className="w-8 sm:w-10 text-center border-none focus:outline-none text-gray-900" />
                            <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)} className="px-2 sm:px-3 py-1 text-gray-900 hover:bg-gray-100 rounded-r-md">
                              <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            </button>
                          </div>
                          <button onClick={() => handleRemoveProduct(product.id)} className="text-xs sm:text-sm text-red-500 hover:text-red-700 flex items-center">
                            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          ) : (
            <></>
          )}

          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-medium text-gray-900">Your Information</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="firstName" name="name" value={formData.name} onChange={handleInputChange} placeholder="John" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="lastName" name="lastName" onChange={handleInputChange} placeholder="Doe" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 flex flex-col sm:flex-row gap-2">
                    <div className="relative w-full sm:w-1/3">
                      <select id="countryPrefix" name="countryPrefix" value={countryPrefix} onChange={handlePrefixChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 pl-10 pr-4 appearance-none">
                        {countryPrefixes.map(country => (
                          <option key={country.code} value={country.prefix}>
                            {country.prefix} ({country.name})
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <ReactCountryFlag countryCode={countryPrefixes.find(c => c.prefix === countryPrefix)?.code} svg className="w-5 h-5" />
                      </span>
                    </div>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="123-4567" className="block w-full sm:w-2/3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john.doe@example.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3" required />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} placeholder="New York" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3" required />
                </div>
                <div className="relative">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <select id="country" name="country" value={formData.country} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 pl-10 pr-4 appearance-none" required>
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {formData.country && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pt-1">
                      <ReactCountryFlag countryCode={countryPrefixes.find(c => c.name === formData.country)?.code} svg className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors mt-6">
                Submit
              </button>
            </form>
          </div>
        </div>
        {RelatedLoading ? (
        <div>Loading....</div>
      ) : RelatedError ? (
        <div className="text-center text-red-500 py-5">
          <p>Error loading sections: {error.message || 'Something went wrong'}</p>
          <button
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : RelatedProducts ? (
        <div className="my-8 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-0">More Products</h2>
          </div>
          <div className="relative overflow-hidden">
            <div className="w-full">
            <Slider {...RelatedProductsSlider}>
              {RelatedProducts.data.map(product => (
                <ProductCard variant="no-hover" product={product} key={product.id}/>
              ))}
              </Slider>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 pt-20">No Products available</div>
      )}
      </div>
    </div>
  );
};

export default PricingList;