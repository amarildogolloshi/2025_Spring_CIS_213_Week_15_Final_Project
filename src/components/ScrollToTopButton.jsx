import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show or hide the button based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: '10rem',
            behavior: "smooth", // Adds a smooth scroll effect
        });
    };

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "50px",
                        right: "50px",
                        backgroundColor: "#005999",
                        color: "white",
                        border: "none",
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
// 