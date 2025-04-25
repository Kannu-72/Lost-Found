// Content for profile.js

// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

    // Find the main container for the profile component
    const container = document.querySelector('.profile-component-container');

    // Only proceed if the container exists on the page
    if (container) {
        const navLinks = container.querySelectorAll('.profile-nav a');
        const tabContents = container.querySelectorAll('.tab-content');

        // Function to switch tabs
        function switchTab(event) {
            event.preventDefault(); // Prevent default link behavior (page jump)

            const link = event.currentTarget; // The clicked link (<a>)
            const targetId = link.getAttribute('href').substring(1) + '-content'; // e.g., "report-content"
            const targetContent = container.querySelector('#' + targetId); // Find the content section

            // Safety check: ensure the target content element exists
            if (!targetContent) {
                console.warn(`Content for tab "${link.getAttribute('href')}" not found within component.`);
                return;
            }

            // Remove 'active' class from the currently active navigation item and content section
            container.querySelector('.profile-nav li.active')?.classList.remove('active');
            container.querySelector('.tab-content.active')?.classList.remove('active');

            // Add 'active' class to the clicked navigation item's parent (<li>) and the target content section
            link.parentElement.classList.add('active');
            targetContent.classList.add('active');
        }

        // Add click event listeners to all navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', switchTab);
        });

        // --- Set the initial active tab based on HTML ---
        // Find the link that initially has the 'active' class in the HTML
        const defaultActiveLink = container.querySelector('.profile-nav li.active a');

        if (defaultActiveLink) {
            const defaultTabId = defaultActiveLink.getAttribute('href').substring(1) + '-content';
            const defaultContent = container.querySelector('#' + defaultTabId);

            // Ensure all tabs are initially hidden except the default one
            tabContents.forEach(content => content.classList.remove('active'));
            if (defaultContent) {
                defaultContent.classList.add('active'); // Make the default content visible
            } else {
                 console.warn(`Default active content (#${defaultTabId}) not found.`);
                 // Fallback: Activate the first tab if default is missing
                 if (tabContents.length > 0) {
                    tabContents[0].classList.add('active');
                    container.querySelector('.profile-nav li:first-child')?.classList.add('active');
                 }
            }
        } else if (tabContents.length > 0) {
             // Fallback: If no 'active' class is set in HTML, activate the first tab by default
             console.log("No default active tab set in HTML, activating the first tab.");
             tabContents.forEach(content => content.classList.remove('active')); // Hide all
             tabContents[0].classList.add('active'); // Show first content
             container.querySelector('.profile-nav li:first-child')?.classList.add('active'); // Highlight first nav item
        }
        // --- End of initial active tab setup ---

    } else {
        console.warn("Profile component container (.profile-component-container) not found.");
    }
}); // End of DOMContentLoaded listener