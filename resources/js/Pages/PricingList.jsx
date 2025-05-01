// PricingList.js
import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactCountryFlag from 'react-country-flag';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from '../Components/ProductCard';
import useFetch from '../useFetch';
import Modal from '../Components/Modal';
import { countryPrefixes } from '../Constants/CountryPrefix';
import Loading from '../Components/Loading';

const PricingList = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryPrefix: '+1',
    phone: '',
    email: '',
    city: '',
    country: ''
  });

  const { data: RelatedProducts, loading: RelatedLoading, error: RelatedError } = useFetch('/api/latestProducts');
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [countryPrefix, setCountryPrefix] = useState('+1');
  const countries = useMemo(() => countryPrefixes.map(c => c.name).sort(), []);

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: '',
    productId: null,
    message: '',
    title: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{7,15}$/.test(formData.phone)) errors.phone = 'Phone number is invalid';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.country) errors.country = 'Country is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openDeleteModal = (id) => setModalState({
    isOpen: true,
    type: 'delete',
    productId: id,
    title: 'Remove Product',
    message: 'Are you sure you want to remove this product from your cart?'
  });

  const openConfirmSubmitModal = () => setModalState({
    isOpen: true,
    type: 'confirmSubmit',
    productId: null,
    title: 'Confirm Order',
    message: 'Are you sure you want to submit your order?'
  });

  const openSuccessModal = () => setModalState({
    isOpen: true,
    type: 'success',
    productId: null,
    title: 'Order Submitted',
    message: 'Your request has been sent successfully!'
  });

  const openErrorModal = (message) => setModalState({
    isOpen: true,
    type: 'error',
    productId: null,
    title: 'Submission Error',
    message: message || 'There was an error submitting your order.'
  });

  const closeModal = () => setModalState({
    isOpen: false,
    type: '',
    productId: null,
    title: '',
    message: ''
  });

  const confirmDelete = () => {
    const updatedCart = cart.filter((item) => item.id !== modalState.productId);
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    closeModal();
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      openDeleteModal(id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePrefixChange = (e) => {
    const newPrefix = e.target.value;
    setCountryPrefix(newPrefix);
    const selectedCountry = countryPrefixes.find(c => c.prefix === newPrefix);
    if (selectedCountry) {
      setFormData(prev => ({
        ...prev,
        country: selectedCountry.name,
        countryPrefix: selectedCountry.prefix
      }));
      setFormErrors((prev) => ({ ...prev, country: '' }));
    }
  };

  useEffect(() => {
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    })
      .then(res => res.ok ? res.json() : Promise.reject('Network error'))
      .then(data => {
        setData(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Fetch error');
        setLoading(false);
      });
  }, [cart]);

  const [resLoading, setResLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      openConfirmSubmitModal();
    }
  };

  const confirmSubmit = () => {
    setResLoading(true);
    closeModal();

    const products = JSON.parse(sessionStorage.getItem('cart')) || [];

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.countryPrefix + formData.phone,
      address: `${formData.country}, ${formData.city}`,
      products
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.ok ? res.json() : Promise.reject('Submit failed'))
      .then(() => {
        setResLoading(false);
        openSuccessModal();
        setFormData({
          firstName: '',
          lastName: '',
          countryPrefix: '+1',
          phone: '',
          email: '',
          city: '',
          country: ''
        });
        setCart([]);
        sessionStorage.removeItem('cart');
      })
      .catch(err => {
        setResLoading(false);
        openErrorModal(err.message);
      });
  };

  const RelatedProductsSlider = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 425, settings: { slidesToShow: 1 } }
    ],
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <h1 className="my-4 font-Montserrat text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl text-left leading-snug text-light-primary dark:text-dark-primary ">
                    Your Pricing List
                </h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Section */}
          <div className="w-full lg:w-2/3 bg-light-background dark:bg-dark-background2 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-light-secondary dark:border-dark-secondary">
            <h2 className="my-4 font-Montserrat text-lg md:text-xl lg:text-3xl 3xl:text-5xl text-left leading-snug text-light-primary dark:text-dark-primary ">
                    Products
                </h2>
            </div>
            <div className="overflow-y-auto max-h-[500px] p-4 sm:p-6">
              {loading ? (
                <Loading />
              ) : error ? (
                <div className="text-center text-red-500 py-20">
                  <p>{error}</p>
                  <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded" onClick={() => window.location.reload()}>Retry</button>
                </div>
              ) : data && data.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {data.map(product => (
                    <li key={product.id} className="py-4 flex justify-between items-start gap-4">
                      <div className="flex items-start gap-4">
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded border" />
                        <div className="flex flex-col">
                          <h3 className="text-lg font-SulphurPoint text-light-text dark:text-dark-text">{product.name}</h3>
                          <p className="text-sm text-light-text dark:text-dark-text">{product.description}</p>
                          <div className="mt-2 flex items-center border rounded-md w-fit">
                            <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)} className="px-2 py-1 dark:bg-dark-secondary2">
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <input type="text" value={product.quantity} readOnly className="w-10 py-1 text-center font-Montserrat bg-light-background2" />
                            <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)} className="px-2 py-1 dark:bg-dark-secondary2">
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button onClick={() => openDeleteModal(product.id)} className="text-red-500 text-sm hover:text-red-700 flex items-center font-SulphurPoint">
                          <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-10 text-light-secondary dark:text-dark-secondary">Your cart is empty</div>
              )}
            </div>
          </div>

          {/* Info Form */}
          <div className="w-full lg:w-1/3 bg-light-background dark:bg-dark-background2 rounded-lg shadow-sm">
  <div className="p-4 sm:p-6 border-b border-light-secondary dark:border-dark-secondary">
    <h2 className="my-4 font-Montserrat text-lg md:text-xl lg:text-3xl 3xl:text-5xl text-left leading-snug text-light-primary dark:text-dark-primary ">
      Information
    </h2>
  </div>
  <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-Montserrat text-light-primary dark:text-dark-primary">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`mt-1 block w-full border rounded-md px-3 py-2 text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background ${formErrors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-transparent focus:dark:border-dark-secondary'} focus:outline-none focus:ring-light-primary focus:border-dark-accent`}
            placeholder="John"
          />
          {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-Montserrat text-light-primary dark:text-dark-primary">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`mt-1 block w-full border rounded-md px-3 py-2 text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background ${formErrors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-transparent focus:dark:border-dark-secondary'} focus:outline-none focus:ring-light-primary focus:border-dark-accent`}
            placeholder="Doe"
          />
          {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-Montserrat text-light-primary dark:text-dark-primary">Phone Number</label>
        <div className="mt-1 flex gap-2">
          <div className="relative w-1/3">
            <select
              id="countryPrefix"
              name="countryPrefix"
              value={countryPrefix}
              onChange={handlePrefixChange}
              className="block w-full border rounded-md px-3 py-2 pl-10 appearance-none text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background border-gray-300 dark:border-transparent focus:dark:border-dark-secondary focus:outline-none focus:ring-light-primary focus:border-dark-accent"
            >
              {countryPrefixes.map(c => (
                <option key={c.code} value={c.prefix}>{c.prefix} ({c.name})</option>
              ))}
            </select>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <ReactCountryFlag
                countryCode={countryPrefixes.find(c => c.prefix === countryPrefix)?.code}
                svg
                className="w-5 h-5"
              />
            </span>
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`block w-2/3 border rounded-md px-3 py-2 text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background ${formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-transparent focus:dark:border-dark-secondary'} focus:outline-none focus:ring-light-primary focus:border-dark-accent`}
            placeholder="123-456-7890"
          />
        </div>
        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-Montserrat text-light-primary dark:text-dark-primary">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`mt-1 block w-full border rounded-md px-3 py-2 text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background ${formErrors.email? 'border-red-500' : 'border-gray-300 dark:border-transparent focus:dark:border-dark-secondary'} focus:outline-none focus:ring-light-primary focus:border-dark-accent`}
          placeholder="john.doe@example.com"
        />
        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
      </div>
    </div>
    <div className="pt-4 border-t border-gray-200 dark:border-dark-background space-y-4">
      <h3 className="text-lg font-Montserrat  text-light-primary dark:text-dark-primary">Location</h3>
      <div>
        <label htmlFor="city" className="block text-sm font-Montserrat  text-light-primary dark:text-dark-primary">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className={`mt-1 block w-full border rounded-md px-3 py-2 text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background ${formErrors.city ? 'border-red-500' : 'border-gray-300 dark:border-transparent focus:dark:border-dark-secondary'} focus:outline-none focus:ring-light-primary focus:border-dark-accen`}
          placeholder="New York"
        />
        {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
      </div>
      <div className="relative">
        <label htmlFor="country" className="block text-sm font-Montserrat text-light-primary dark:text-dark-primary">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className={`mt-1 block w-full border rounded-md px-3 py-2 pl-10  text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background ${formErrors.country? 'border-red-500' : 'border-gray-300 dark:border-transparent focus:dark:border-dark-secondary'} focus:outline-none focus:ring-light-primary focus:border-dark-accen`}
        >
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {formData.country && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
            <ReactCountryFlag
              countryCode={countryPrefixes.find(c => c.name === formData.country)?.code}
              svg
              className="w-5 h-5"
            />
          </span>
        )}
        {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
      </div>
    </div>
    <button
      type="submit"
      disabled={resLoading}
      className={`w-full py-2 px-4 rounded text-white ${resLoading ? 'bg-light-primary cursor-not-allowed' : 'bg-light-primary dark:bg-dark-primary hover:bg-[#00437ae1] dark:hover:bg-[#A5D8FF]'}`}
    >
        Submit
    </button>
  </form>
</div>
</div>

        {/* Related Products Section */}
        {RelatedLoading ? (
          <Loading />
        ) : RelatedError ? (
          <div className="text-red-500">{RelatedError.message}</div>
        ) : RelatedProducts ? (
          <div className="my-10 bg-light-background dark:bg-dark-background rounded-lg shadow-sm p-6">
            <h2 className="my-4 font-Montserrat text-lg md:text-xl lg:text-3xl 3xl:text-5xl text-left leading-snug text-light-primary dark:text-dark-primary ">
                More Products
            </h2>
            {RelatedProducts.data.length > 1 ? (
            <Slider {...RelatedProductsSlider}>
              {RelatedProducts.data.map(product => (
                <ProductCard key={product.id} product={product} variant="no-hover" />
              ))}
            </Slider>
            ) : (
              <ProductCard variant="no-hover" product={data.project.products[0]} />
            )}
          </div>
        ) : null}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.type === 'delete' ? confirmDelete : modalState.type === 'confirmSubmit' ? confirmSubmit : closeModal}
        onCancel={closeModal}
        confirmText={modalState.type === 'delete' ? 'Yes, Remove' : modalState.type === 'confirmSubmit' ? 'Yes, Submit' : 'OK'}
        cancelText={modalState.type === 'delete' || modalState.type === 'confirmSubmit' ? 'Cancel' : undefined}
      />
    </div>
  );
};

export default PricingList;