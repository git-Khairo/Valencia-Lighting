import { useEffect, useRef, useState } from "react";
import { FaReceipt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReceiptIcon = () => {
    const [cart, setCart] = useState([]);
    const linkRef = useRef(null);

    // This function fetches the cart from sessionStorage
    const updateCart = () => {
        const newCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        setCart(newCart);
    };

    useEffect(() => {
        // Initial load
        updateCart();

        // Listen for the custom "cartUpdated" event
        window.addEventListener('cartUpdated', updateCart);

        return () => {
            window.removeEventListener('cartUpdated', updateCart);
        };
    }, []); // Only set up the listener once

    useEffect(() => {
        // Whenever the cart changes, update the badge
        if (linkRef.current) {
            linkRef.current.style.setProperty('--cart-count', `"${cart.length}"`);
        }
    }, [cart]);

    return ( 
        <Link
            to={'/pricingList'}
            ref={linkRef}
            className="flex items-center gap-2 text-light-secondary2 dark:text-dark-secondary2 hover:text-light-primary dark:hover:text-dark-primary transition-all duration-300 ease-in-out font-semibold hover:font-bold z-20 after:absolute after:w-3 after:h-3 after:bg-light-primary after:dark:bg-dark-primary after:rounded-full after:-top-2 after:-right-2 after:content-[var(--cart-count)] after:text-white after:text-xs after:flex after:items-center after:justify-center after:p-2"
        >
            <FaReceipt size={20} />
        </Link>
    );
};

export default ReceiptIcon;
