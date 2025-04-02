import React, { useState } from 'react';
import { FaShoppingCart, FaMinus, FaPlus, FaFileDownload } from "react-icons/fa";

function App() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-3">
        <div className="text-sm text-gray-500">
          <a href="#" className="hover:text-blue-600">Home</a> 
          <a href="#" className="hover:text-blue-600 mx-1">Products</a> 
          <span className="text-gray-700 ml-1">Advanced Wireless Sensor Pro X7</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Product Image */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex items-center justify-center p-4">
              <img
                src="https://public.readdy.ai/ai/img_res/86fa8806e9e205f1b60b55d085ea0e3f.jpg"
                alt="Advanced Wireless Sensor Pro X7"
                className="object-contain w-full h-full object-top"
              />
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Wireless Sensor Pro X7</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer">IoT Devices</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer">Sensors</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer">Smart Home</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer">Wireless</span>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button
                    className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${activeTab === 'description' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${activeTab === 'specifications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('specifications')}
                  >
                    Specifications
                  </button>
                </nav>
              </div>
              <div className="py-4">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-gray-700 mb-4">
                      The Advanced Wireless Sensor Pro X7 is our latest innovation in IoT sensing technology.
                      Designed for both home and industrial applications, this sensor provides real-time
                      environmental monitoring with unparalleled accuracy and reliability.
                    </p>
                    <p className="text-gray-700 mb-4">
                      With its extended battery life of up to 2 years and enhanced wireless range, the Pro X7
                      can be deployed in challenging environments while maintaining consistent data transmission.
                      The device features multiple sensing capabilities including temperature, humidity, air quality,
                      and motion detection, all accessible through our intuitive mobile app or web dashboard.
                    </p>
                    <p className="text-gray-700">
                      Each unit comes with our industry-leading 3-year warranty and free access to our cloud
                      analytics platform for the first 12 months.
                    </p>
                  </div>
                )}
                {activeTab === 'specifications' && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specification</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dimensions</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3.5 × 2.2 × 0.8 inches</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Weight</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">75g</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Battery Life</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Up to 24 months</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wireless Range</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">300 feet (line of sight)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Connectivity</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wi-Fi, Bluetooth 5.0, Zigbee</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sensors</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Temperature, Humidity, Motion, Air Quality</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Operating Temperature</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-10°C to 60°C</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Water Resistance</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">IP67 rated</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="mb-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap mr-4">
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-4">
                    Quantity
                  </label>
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="text"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-12 text-center border-none focus:ring-0 text-gray-700"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex">
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-md flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap">
                  <FaFileDownload className="mr-2" />
                  Download Datasheet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* People Also Like Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">People Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Product 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="h-48 overflow-hidden">
              <img
                src="https://public.readdy.ai/ai/img_res/2cf1bd20a26930c133ed4d709dd02bb5.jpg"
                alt="Smart Temperature Sensor"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Smart Temperature Sensor</h3>
              <p className="text-sm text-gray-600 mb-2">Wireless home monitoring system</p>
              <div className="flex justify-between items-center">
                <button className="text-gray-500 hover:text-blue-600 cursor-pointer">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="h-48 overflow-hidden">
              <img
                src="https://public.readdy.ai/ai/img_res/19cf419b395e77fec8536d50bc3e48f5.jpg"
                alt="Industrial Motion Detector"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Industrial Motion Detector</h3>
              <p className="text-sm text-gray-600 mb-2">Heavy-duty security sensor</p>
              <div className="flex justify-between items-center">
                <button className="text-gray-500 hover:text-blue-600 cursor-pointer">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="h-48 overflow-hidden">
              <img
                src="https://public.readdy.ai/ai/img_res/313c88f35e213ca5e86ab2b2725bea21.jpg"
                alt="Air Quality Monitor"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Air Quality Monitor</h3>
              <p className="text-sm text-gray-600 mb-2">Real-time air quality tracking</p>
              <div className="flex justify-between items-center">
                <button className="text-gray-500 hover:text-blue-600 cursor-pointer">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>

          {/* Product 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="h-48 overflow-hidden">
              <img
                src="https://public.readdy.ai/ai/img_res/d54dd81e8f1de656a57ccd3a7c1bf245.jpg"
                alt="Water Leak Detector"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Water Leak Detector</h3>
              <p className="text-sm text-gray-600 mb-2">Early warning water detection</p>
              <div className="flex justify-between items-center">
                <button className="text-gray-500 hover:text-blue-600 cursor-pointer">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;