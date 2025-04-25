import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "./Authentication";

const SignIn = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors(null); // Reset errors before submission
      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
          });

          const data = await response.json();

          if (!response.ok) {
              if (response.status === 422) {
                  // Validation errors from LoginRequest
                  setErrors(data.message);
              } else if (response.status === 401) {
                  // Invalid credentials
                  setErrors(data.message);
              } else {
                  // Other unexpected errors
                  setErrors({ general: data.message || 'An unexpected error occurred' });
              }
              return; // Exit early if there's an error
          }

          // Success: Update token and navigate
          sessionStorage.setItem('token', data.user.token);
          navigate('/admin/dashboard');

      } catch (err) {
          // Network or other critical errors
          setErrors({ general: 'Something went wrong. Please try again.' });
      }
  };

    return ( 
      <>
      <Authentication />
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-20 pt-32 lg:px-8 bg-light-background dark:bg-dark-background ">
           {errors && (
                <p className="my-5 text-red-500 text-center">{errors}</p>
            )}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Logo"
            src="https://picsum.photos/200"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-5 text-center text-3xl font-bold text-light-primary dark:text-dark-primary">
            Sign in
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium  text-light-primary dark:text-dark-primary">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                  className="block w-full rounded-lg px-3 py-2 text-lg text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background border-2 border-light-primary dark:border-dark-secondary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-light-primary dark:text-dark-primary">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="block w-full rounded-lg px-3 py-2 text-lg text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background border-2 border-light-primary dark:border-dark-secondary"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-light-primary dark:bg-dark-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#00437ae3] dark:hover:bg-[#96c2e3d4]"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      </>
     );
}
 
export default SignIn;