import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt, faLock, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FiFlag } from 'react-icons/fi'; // Generic flag icon as fallback
import ReactCountryFlag from 'react-country-flag';


const PricingList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "Noise-cancelling with 30h battery life",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/a51c5091717d94d4563355c0442b0099.jpg"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      description: "Tracks heart rate, steps, and sleep",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/8650f94d1fd376c84d7fdeec9dabe8d9.jpg"
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      description: "Waterproof with 12h playtime",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/1d6a8f172a0d216e0907e948dd05e3da.jpg"
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      description: "Fast charging for all Qi devices",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/e068950ec7b1f867e4f8fd49ef3b35b9.jpg"
    },
    {
      id: 5,
      name: "Ultra HD Action Camera",
      description: "4K recording with stabilization",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/7f65834b6e022409350f51f4be19f80a.jpg"
    }
  ]);

  const [relatedProducts, setRelatedProducts] = useState([
    {
      id: 101,
      name: "Premium Camera Tripod",
      description: "Stable and lightweight design",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/c43592fc2993cd3bd31fc0746f89cb0c.jpg"
    },
    {
      id: 102,
      name: "Wireless Earbuds",
      description: "True wireless with charging case",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/1cac6d1f11a3f31601693add30c52a26.jpg"
    },
    {
      id: 103,
      name: "Smart Home Hub",
      description: "Control all your smart devices",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/528ac2b7322760afb1e0d794e5d97fcb.jpg"
    },
    {
      id: 104,
      name: "Ultra-Thin Power Bank",
      description: "20,000mAh high capacity",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/92e85a26dcb5394e49ea9c4fb669475e.jpg"
    },
    {
      id: 105,
      name: "Premium Laptop Sleeve",
      description: "Waterproof and shock-resistant",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/e11531b513b19361c7b6240e3b6c4672.jpg"
    },
    {
      id: 106,
      name: "Ergonomic Keyboard",
      description: "Mechanical keys with RGB lighting",
      quantity: 1,
      image: "https://public.readdy.ai/ai/img_res/42948735ab712bea1fad6432580ca1f8.jpg"
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    country: ''
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [countryPrefix, setCountryPrefix] = useState('+1');

  const countryPrefixes = [
    { code: 'AF', prefix: '+93', name: 'Afghanistan' },
    { code: 'AX', prefix: '+358', name: 'Åland Islands' },
    { code: 'AL', prefix: '+355', name: 'Albania' },
    { code: 'DZ', prefix: '+213', name: 'Algeria' },
    { code: 'AS', prefix: '+1-684', name: 'American Samoa' },
    { code: 'AD', prefix: '+376', name: 'Andorra' },
    { code: 'AO', prefix: '+244', name: 'Angola' },
    { code: 'AI', prefix: '+1-264', name: 'Anguilla' },
    { code: 'AQ', prefix: '+672', name: 'Antarctica' },
    { code: 'AG', prefix: '+1-268', name: 'Antigua and Barbuda' },
    { code: 'AR', prefix: '+54', name: 'Argentina' },
    { code: 'AM', prefix: '+374', name: 'Armenia' },
    { code: 'AW', prefix: '+297', name: 'Aruba' },
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
    { code: 'BM', prefix: '+1-441', name: 'Bermuda' },
    { code: 'BT', prefix: '+975', name: 'Bhutan' },
    { code: 'BO', prefix: '+591', name: 'Bolivia' },
    { code: 'BQ', prefix: '+599', name: 'Bonaire, Sint Eustatius and Saba' },
    { code: 'BA', prefix: '+387', name: 'Bosnia and Herzegovina' },
    { code: 'BW', prefix: '+267', name: 'Botswana' },
    { code: 'BV', prefix: '+47', name: 'Bouvet Island' },
    { code: 'BR', prefix: '+55', name: 'Brazil' },
    { code: 'IO', prefix: '+246', name: 'British Indian Ocean Territory' },
    { code: 'BN', prefix: '+673', name: 'Brunei Darussalam' },
    { code: 'BG', prefix: '+359', name: 'Bulgaria' },
    { code: 'BF', prefix: '+226', name: 'Burkina Faso' },
    { code: 'BI', prefix: '+257', name: 'Burundi' },
    { code: 'CV', prefix: '+238', name: 'Cabo Verde' },
    { code: 'KH', prefix: '+855', name: 'Cambodia' },
    { code: 'CM', prefix: '+237', name: 'Cameroon' },
    { code: 'CA', prefix: '+1', name: 'Canada' },
    { code: 'KY', prefix: '+1-345', name: 'Cayman Islands' },
    { code: 'CF', prefix: '+236', name: 'Central African Republic' },
    { code: 'TD', prefix: '+235', name: 'Chad' },
    { code: 'CL', prefix: '+56', name: 'Chile' },
    { code: 'CN', prefix: '+86', name: 'China' },
    { code: 'CX', prefix: '+61', name: 'Christmas Island' },
    { code: 'CC', prefix: '+61', name: 'Cocos (Keeling) Islands' },
    { code: 'CO', prefix: '+57', name: 'Colombia' },
    { code: 'KM', prefix: '+269', name: 'Comoros' },
    { code: 'CG', prefix: '+242', name: 'Congo' },
    { code: 'CD', prefix: '+243', name: 'Congo, Democratic Republic of the' },
    { code: 'CK', prefix: '+682', name: 'Cook Islands' },
    { code: 'CR', prefix: '+506', name: 'Costa Rica' },
    { code: 'CI', prefix: '+225', name: 'Côte d\'Ivoire' },
    { code: 'HR', prefix: '+385', name: 'Croatia' },
    { code: 'CU', prefix: '+53', name: 'Cuba' },
    { code: 'CW', prefix: '+599', name: 'Curaçao' },
    { code: 'CY', prefix: '+357', name: 'Cyprus' },
    { code: 'CZ', prefix: '+420', name: 'Czech Republic' },
    { code: 'DK', prefix: '+45', name: 'Denmark' },
    { code: 'DJ', prefix: '+253', name: 'Djibouti' },
    { code: 'DM', prefix: '+1-767', name: 'Dominica' },
    { code: 'DO', prefix: '+1-809', name: 'Dominican Republic' },
    { code: 'EC', prefix: '+593', name: 'Ecuador' },
    { code: 'EG', prefix: '+20', name: 'Egypt' },
    { code: 'SV', prefix: '+503', name: 'El Salvador' },
    { code: 'GQ', prefix: '+240', name: 'Equatorial Guinea' },
    { code: 'ER', prefix: '+291', name: 'Eritrea' },
    { code: 'EE', prefix: '+372', name: 'Estonia' },
    { code: 'SZ', prefix: '+268', name: 'Eswatini' },
    { code: 'ET', prefix: '+251', name: 'Ethiopia' },
    { code: 'FK', prefix: '+500', name: 'Falkland Islands (Malvinas)' },
    { code: 'FO', prefix: '+298', name: 'Faroe Islands' },
    { code: 'FJ', prefix: '+679', name: 'Fiji' },
    { code: 'FI', prefix: '+358', name: 'Finland' },
    { code: 'FR', prefix: '+33', name: 'France' },
    { code: 'GF', prefix: '+594', name: 'French Guiana' },
    { code: 'PF', prefix: '+689', name: 'French Polynesia' },
    { code: 'TF', prefix: '+262', name: 'French Southern Territories' },
    { code: 'GA', prefix: '+241', name: 'Gabon' },
    { code: 'GM', prefix: '+220', name: 'Gambia' },
    { code: 'GE', prefix: '+995', name: 'Georgia' },
    { code: 'DE', prefix: '+49', name: 'Germany' },
    { code: 'GH', prefix: '+233', name: 'Ghana' },
    { code: 'GI', prefix: '+350', name: 'Gibraltar' },
    { code: 'GR', prefix: '+30', name: 'Greece' },
    { code: 'GL', prefix: '+299', name: 'Greenland' },
    { code: 'GD', prefix: '+1-473', name: 'Grenada' },
    { code: 'GP', prefix: '+590', name: 'Guadeloupe' },
    { code: 'GU', prefix: '+1-671', name: 'Guam' },
    { code: 'GT', prefix: '+502', name: 'Guatemala' },
    { code: 'GG', prefix: '+44-1481', name: 'Guernsey' },
    { code: 'GN', prefix: '+224', name: 'Guinea' },
    { code: 'GW', prefix: '+245', name: 'Guinea-Bissau' },
    { code: 'GY', prefix: '+592', name: 'Guyana' },
    { code: 'HT', prefix: '+509', name: 'Haiti' },
    { code: 'HM', prefix: '+672', name: 'Heard Island and McDonald Islands' },
    { code: 'VA', prefix: '+39-06', name: 'Holy See (Vatican City State)' },
    { code: 'HN', prefix: '+504', name: 'Honduras' },
    { code: 'HK', prefix: '+852', name: 'Hong Kong' },
    { code: 'HU', prefix: '+36', name: 'Hungary' },
    { code: 'IS', prefix: '+354', name: 'Iceland' },
    { code: 'IN', prefix: '+91', name: 'India' },
    { code: 'ID', prefix: '+62', name: 'Indonesia' },
    { code: 'IR', prefix: '+98', name: 'Iran' },
    { code: 'IQ', prefix: '+964', name: 'Iraq' },
    { code: 'IE', prefix: '+353', name: 'Ireland' },
    { code: 'IM', prefix: '+44-1624', name: 'Isle of Man' },
    { code: 'IL', prefix: '+972', name: 'Israel' },
    { code: 'IT', prefix: '+39', name: 'Italy' },
    { code: 'JM', prefix: '+1-876', name: 'Jamaica' },
    { code: 'JP', prefix: '+81', name: 'Japan' },
    { code: 'JE', prefix: '+44-1534', name: 'Jersey' },
    { code: 'JO', prefix: '+962', name: 'Jordan' },
    { code: 'KZ', prefix: '+7', name: 'Kazakhstan' },
    { code: 'KE', prefix: '+254', name: 'Kenya' },
    { code: 'KI', prefix: '+686', name: 'Kiribati' },
    { code: 'KP', prefix: '+850', name: 'Korea, Democratic People\'s Republic of' },
    { code: 'KR', prefix: '+82', name: 'Korea, Republic of' },
    { code: 'KW', prefix: '+965', name: 'Kuwait' },
    { code: 'KG', prefix: '+996', name: 'Kyrgyzstan' },
    { code: 'LA', prefix: '+856', name: 'Lao People\'s Democratic Republic' },
    { code: 'LV', prefix: '+371', name: 'Latvia' },
    { code: 'LB', prefix: '+961', name: 'Lebanon' },
    { code: 'LS', prefix: '+266', name: 'Lesotho' },
    { code: 'LR', prefix: '+231', name: 'Liberia' },
    { code: 'LY', prefix: '+218', name: 'Libya' },
    { code: 'LI', prefix: '+423', name: 'Liechtenstein' },
    { code: 'LT', prefix: '+370', name: 'Lithuania' },
    { code: 'LU', prefix: '+352', name: 'Luxembourg' },
    { code: 'MO', prefix: '+853', name: 'Macao' },
    { code: 'MG', prefix: '+261', name: 'Madagascar' },
    { code: 'MW', prefix: '+265', name: 'Malawi' },
    { code: 'MY', prefix: '+60', name: 'Malaysia' },
    { code: 'MV', prefix: '+960', name: 'Maldives' },
    { code: 'ML', prefix: '+223', name: 'Mali' },
    { code: 'MT', prefix: '+356', name: 'Malta' },
    { code: 'MH', prefix: '+692', name: 'Marshall Islands' },
    { code: 'MQ', prefix: '+596', name: 'Martinique' },
    { code: 'MR', prefix: '+222', name: 'Mauritania' },
    { code: 'MU', prefix: '+230', name: 'Mauritius' },
    { code: 'YT', prefix: '+262', name: 'Mayotte' },
    { code: 'MX', prefix: '+52', name: 'Mexico' },
    { code: 'FM', prefix: '+691', name: 'Micronesia, Federated States of' },
    { code: 'MD', prefix: '+373', name: 'Moldova, Republic of' },
    { code: 'MC', prefix: '+377', name: 'Monaco' },
    { code: 'MN', prefix: '+976', name: 'Mongolia' },
    { code: 'ME', prefix: '+382', name: 'Montenegro' },
    { code: 'MS', prefix: '+1-664', name: 'Montserrat' },
    { code: 'MA', prefix: '+212', name: 'Morocco' },
    { code: 'MZ', prefix: '+258', name: 'Mozambique' },
    { code: 'MM', prefix: '+95', name: 'Myanmar' },
    { code: 'NA', prefix: '+264', name: 'Namibia' },
    { code: 'NR', prefix: '+674', name: 'Nauru' },
    { code: 'NP', prefix: '+977', name: 'Nepal' },
    { code: 'NL', prefix: '+31', name: 'Netherlands' },
    { code: 'NC', prefix: '+687', name: 'New Caledonia' },
    { code: 'NZ', prefix: '+64', name: 'New Zealand' },
    { code: 'NI', prefix: '+505', name: 'Nicaragua' },
    { code: 'NE', prefix: '+227', name: 'Niger' },
    { code: 'NG', prefix: '+234', name: 'Nigeria' },
    { code: 'NU', prefix: '+683', name: 'Niue' },
    { code: 'NF', prefix: '+672', name: 'Norfolk Island' },
    { code: 'MK', prefix: '+389', name: 'North Macedonia' },
    { code: 'MP', prefix: '+1-670', name: 'Northern Mariana Islands' },
    { code: 'NO', prefix: '+47', name: 'Norway' },
    { code: 'OM', prefix: '+968', name: 'Oman' },
    { code: 'PK', prefix: '+92', name: 'Pakistan' },
    { code: 'PW', prefix: '+680', name: 'Palau' },
    { code: 'PS', prefix: '+970', name: 'Palestine, State of' },
    { code: 'PA', prefix: '+507', name: 'Panama' },
    { code: 'PG', prefix: '+675', name: 'Papua New Guinea' },
    { code: 'PY', prefix: '+595', name: 'Paraguay' },
    { code: 'PE', prefix: '+51', name: 'Peru' },
    { code: 'PH', prefix: '+63', name: 'Philippines' },
    { code: 'PN', prefix: '+64', name: 'Pitcairn' },
    { code: 'PL', prefix: '+48', name: 'Poland' },
    { code: 'PT', prefix: '+351', name: 'Portugal' },
    { code: 'PR', prefix: '+1-787', name: 'Puerto Rico' },
    { code: 'QA', prefix: '+974', name: 'Qatar' },
    { code: 'RE', prefix: '+262', name: 'Réunion' },
    { code: 'RO', prefix: '+40', name: 'Romania' },
    { code: 'RU', prefix: '+7', name: 'Russian Federation' },
    { code: 'RW', prefix: '+250', name: 'Rwanda' },
    { code: 'BL', prefix: '+590', name: 'Saint Barthélemy' },
    { code: 'SH', prefix: '+290', name: 'Saint Helena, Ascension and Tristan da Cunha' },
    { code: 'KN', prefix: '+1-869', name: 'Saint Kitts and Nevis' },
    { code: 'LC', prefix: '+1-758', name: 'Saint Lucia' },
    { code: 'MF', prefix: '+590', name: 'Saint Martin (French part)' },
    { code: 'PM', prefix: '+508', name: 'Saint Pierre and Miquelon' },
    { code: 'VC', prefix: '+1-784', name: 'Saint Vincent and the Grenadines' },
    { code: 'WS', prefix: '+685', name: 'Samoa' },
    { code: 'SM', prefix: '+378', name: 'San Marino' },
    { code: 'ST', prefix: '+239', name: 'Sao Tome and Principe' },
    { code: 'SA', prefix: '+966', name: 'Saudi Arabia' },
    { code: 'SN', prefix: '+221', name: 'Senegal' },
    { code: 'RS', prefix: '+381', name: 'Serbia' },
    { code: 'SC', prefix: '+248', name: 'Seychelles' },
    { code: 'SL', prefix: '+232', name: 'Sierra Leone' },
    { code: 'SG', prefix: '+65', name: 'Singapore' },
    { code: 'SX', prefix: '+1-721', name: 'Sint Maarten (Dutch part)' },
    { code: 'SK', prefix: '+421', name: 'Slovakia' },
    { code: 'SI', prefix: '+386', name: 'Slovenia' },
    { code: 'SB', prefix: '+677', name: 'Solomon Islands' },
    { code: 'SO', prefix: '+252', name: 'Somalia' },
    { code: 'ZA', prefix: '+27', name: 'South Africa' },
    { code: 'GS', prefix: '+500', name: 'South Georgia and the South Sandwich Islands' },
    { code: 'SS', prefix: '+211', name: 'South Sudan' },
    { code: 'ES', prefix: '+34', name: 'Spain' },
    { code: 'LK', prefix: '+94', name: 'Sri Lanka' },
    { code: 'SD', prefix: '+249', name: 'Sudan' },
    { code: 'SR', prefix: '+597', name: 'Suriname' },
    { code: 'SJ', prefix: '+47', name: 'Svalbard and Jan Mayen' },
    { code: 'SE', prefix: '+46', name: 'Sweden' },
    { code: 'CH', prefix: '+41', name: 'Switzerland' },
    { code: 'SY', prefix: '+963', name: 'Syrian Arab Republic' },
    { code: 'TW', prefix: '+886', name: 'Taiwan' },
    { code: 'TJ', prefix: '+992', name: 'Tajikistan' },
    { code: 'TZ', prefix: '+255', name: 'Tanzania, United Republic of' },
    { code: 'TH', prefix: '+66', name: 'Thailand' },
    { code: 'TL', prefix: '+670', name: 'Timor-Leste' },
    { code: 'TG', prefix: '+228', name: 'Togo' },
    { code: 'TK', prefix: '+690', name: 'Tokelau' },
    { code: 'TO', prefix: '+676', name: 'Tonga' },
    { code: 'TT', prefix: '+1-868', name: 'Trinidad and Tobago' },
    { code: 'TN', prefix: '+216', name: 'Tunisia' },
    { code: 'TR', prefix: '+90', name: 'Turkey' },
    { code: 'TM', prefix: '+993', name: 'Turkmenistan' },
    { code: 'TC', prefix: '+1-649', name: 'Turks and Caicos Islands' },
    { code: 'TV', prefix: '+688', name: 'Tuvalu' },
    { code: 'UG', prefix: '+256', name: 'Uganda' },
    { code: 'UA', prefix: '+380', name: 'Ukraine' },
    { code: 'AE', prefix: '+971', name: 'United Arab Emirates' },
    { code: 'GB', prefix: '+44', name: 'United Kingdom' },
    { code: 'US', prefix: '+1', name: 'United States' },
    { code: 'UM', prefix: '+1', name: 'United States Minor Outlying Islands' },
    { code: 'UY', prefix: '+598', name: 'Uruguay' },
    { code: 'UZ', prefix: '+998', name: 'Uzbekistan' },
    { code: 'VU', prefix: '+678', name: 'Vanuatu' },
    { code: 'VE', prefix: '+58', name: 'Venezuela' },
    { code: 'VN', prefix: '+84', name: 'Vietnam' },
    { code: 'VG', prefix: '+1-284', name: 'Virgin Islands, British' },
    { code: 'VI', prefix: '+1-340', name: 'Virgin Islands, U.S.' },
    { code: 'WF', prefix: '+681', name: 'Wallis and Futuna' },
    { code: 'EH', prefix: '+212', name: 'Western Sahara' },
    { code: 'YE', prefix: '+967', name: 'Yemen' },
    { code: 'ZM', prefix: '+260', name: 'Zambia' },
    { code: 'ZW', prefix: '+263', name: 'Zimbabwe' }
  ];

  const countries = useMemo(() => {
    return countryPrefixes.map(c => c.name).sort();
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePrefixChange = (e) => {
    setCountryPrefix(e.target.value);
    const selectedCountry = countryPrefixes.find(c => c.prefix === e.target.value);
    if (selectedCountry) {
      setFormData(prev => ({
        ...prev,
        country: selectedCountry.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Products:', products);
  };

  const slideLeft = () => {
    setActiveSlide(prev => (prev > 0 ? prev - 1 : 0));
  };

  const slideRight = () => {
    const maxSlide = Math.max(0, relatedProducts.length - 4);
    setActiveSlide(prev => (prev < maxSlide ? prev + 1 : maxSlide));
  };

  // Fallback flag component (using FiFlag as a generic flag)

  const CountryFlag = ({ code }) => {
    return <ReactCountryFlag countryCode={code} svg className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#1a1400] mb-8">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-medium text-[#1a1400]">Products</h2>
            </div>
            <div className="overflow-y-auto max-h-[500px] p-6">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#a3a3a3]">Your cart is empty</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {products.map(product => (
                    <li key={product.id} className="py-4 flex items-center">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-base font-medium text-[#1a1400]">{product.name}</h3>
                            <p className="mt-1 text-sm text-[#a3a3a3]">{product.description}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-[#a3a3a3] rounded-md">
                            <button
                              onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                              className="px-3 py-1 text-[#1a1400] hover:bg-[#f7f7f7] cursor-pointer !rounded-button whitespace-nowrap"
                            >
                              <FontAwesomeIcon icon={faMinus} className="text-xs" />
                            </button>
                            <input
                              type="text"
                              value={product.quantity}
                              readOnly
                              className="w-10 text-center border-none focus:outline-none text-[#1a1400]"
                            />
                            <button
                              onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                              className="px-3 py-1 text-[#1a1400] hover:bg-[#f7f7f7] cursor-pointer !rounded-button whitespace-nowrap"
                            >
                              <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            </button>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleRemoveProduct(product.id)}
                              className="text-sm text-red-500 hover:text-red-700 cursor-pointer !rounded-button whitespace-nowrap"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="lg:w-1/3 bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-medium text-[#1a1400]">Your Information</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#1a1400]">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="mt-1 block w-full border-[#a3a3a3] rounded-md shadow-sm focus:ring-[#1c4769] focus:border-[#1c4769] sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#1a1400]">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="mt-1 block w-full border-[#a3a3a3] rounded-md shadow-sm focus:ring-[#1c4769] focus:border-[#1c4769] sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#1a1400]">Phone Number</label>
                  <div className="mt-1 flex">
                    <div className="w-1/3 relative">
                      <select
                        id="countryPrefix"
                        name="countryPrefix"
                        value={countryPrefix}
                        onChange={handlePrefixChange}
                        className="block w-full border-[#a3a3a3] rounded-l-md shadow-sm focus:ring-[#1c4769] focus:border-[#1c4769] sm:text-sm bg-white appearance-none pl-8 pr-2 py-2"
                      >
                        {countryPrefixes.map(country => (
                          <option key={country.code} value={country.prefix}>
                            {country.prefix} ({country.name})
                          </option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <CountryFlag code={countryPrefixes.find(c => c.prefix === countryPrefix)?.code} />
                      </span>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="123-4567"
                      className="block w-2/3 border-[#a3a3a3] rounded-r-md shadow-sm focus:ring-[#1c4769] focus:border-[#1c4769] sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1a1400]">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    className="mt-1 block w-full border-[#a3a3a3] rounded-md shadow-sm focus:ring-[#1c4769] focus:border-[#1c4769] sm:text-sm"
                    required
                  />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-medium text-[#1a1400] mb-4">Location</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-[#1a1400]">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="mt-1 block w-full border-[#a3a3a3] rounded-md shadow-sm focus:ring-[#1c4769] focus:border-[#1c4769] sm:text-sm"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="country" className="block text-sm font-medium text-[#1a1400]">Country</label>
                      <div className="relative">
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border-[#a3a3a3] rounded-md shadow-sm focus:ring-[#1c4769] focus:border-[#1c4769] sm:text-sm pl-8 pr-10 py-2 appearance-none bg-white"
                          required
                        >
                          <option value="">Select Country</option>
                          {countries.map(country => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        {formData.country && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <CountryFlag code={countryPrefixes.find(c => c.name === formData.country)?.code} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-[#1c4769] text-white py-3 px-4 rounded-md hover:bg-[#96c2e3] hover:text-[#1a1400] focus:outline-none focus:ring-2 focus:ring-[#96c2e3] focus:ring-offset-2 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
                >
                    Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-[#1a1400]">Related Products</h2>
            <div className="flex space-x-2">
              <button
                onClick={slideLeft}
                className={`p-2 rounded-full bg-[#f7f7f7] text-[#1a1400] hover:bg-[#96c2e3] cursor-pointer !rounded-button whitespace-nowrap ${activeSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={activeSlide === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={slideRight}
                className={`p-2 rounded-full bg-[#f7f7f7] text-[#1a1400] hover:bg-[#96c2e3] cursor-pointer !rounded-button whitespace-nowrap ${activeSlide === relatedProducts.length - 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={activeSlide === relatedProducts.length - 4}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 25}%)` }}
            >
              {relatedProducts.map(product => (
                <div key={product.id} className="w-1/4 flex-shrink-0 px-2">
                  <div className="border border-[#a3a3a3] rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-[#1a1400] truncate">{product.name}</h3>
                      <p className="mt-1 text-sm text-[#a3a3a3] truncate">{product.description}</p>
                      <div className="mt-2 flex justify-end">
                        <button className="text-xs bg-[#1c4769] text-white py-1 px-3 rounded-md hover:bg-[#96c2e3] hover:text-[#1a1400] transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingList;