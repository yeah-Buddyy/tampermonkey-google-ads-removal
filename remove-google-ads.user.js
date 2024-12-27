// ==UserScript==
// @name         Google Ads Removal
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Remove ads and sponsored search results from Google Search more effectively
// @author       M Leonard Blair
// @include      https://www.google.tld/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove ads
    function removeAds() {
        // Select elements that represent ads
        const adSelectors = [
            'div[data-text-ad]',
            'div[data-text-ad] ~ div', // Ad related divs
            'div[data-content-ad]',
            '.ads-ad',
            '.commercial-unit-desktop-top',
            '.commercial-unit-desktop-rhs',
            '.commercial-unit-desktop-bottom',
            'div[data-pcu]', // PCU ad block
            'span:contains("Sponsored")', // Sponsored label
            'span:contains("Ad")' // Ad label
        ];

        adSelectors.forEach(selector => {
            let elements = document.querySelectorAll(selector);
            elements.forEach(element => element.remove());
        });

        // Remove iframes that may contain ads
        let iframes = document.querySelectorAll('iframe');
        iframes.forEach(function(iframe) {
            if (iframe.src.includes('googleads')) {
                iframe.remove();
            }
        });
    }

    // Run the function on page load
    window.addEventListener('load', removeAds);

    // Run the function every time the DOM is updated
    let observer = new MutationObserver(removeAds);
    observer.observe(document.body, { childList: true, subtree: true });
})();
