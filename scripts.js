let slideIndex = 0;
showSlides(slideIndex);
let slideInterval;

function currentSlide(index) {
    showSlides(slideIndex = index);
}

function showSlides(index) {
    const slides = document.getElementsByClassName("blog-post");
    const dots = document.getElementsByClassName("dot");
    if (index >= slides.length) { slideIndex = 0 }
    if (index < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
    // Show the first slide
    showSlides(slideIndex);

    // Add event listeners to dots
    const dots = document.getElementsByClassName('dot');
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function() {
            currentSlide(i);
            resetSlideInterval();
        });
    }

    // Apply the saved theme on page load
    const darkTheme = localStorage.getItem('darktheme') === 'true';
    if (darkTheme) {
        document.body.classList.add('darktheme');
    }

    // Load previously suggested topics
    displaySuggestedTopics();

    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    // Add event listeners for stopping and starting slideshow on hover
    const blogSection = document.querySelector('.blog-section'); // Change this to the appropriate selector for your blog section
    if (blogSection) {
        blogSection.addEventListener('mouseenter', stopSlideInterval);
        blogSection.addEventListener('mouseleave', resetSlideInterval);
    }
});

// Function to toggle theme and store preference in localStorage
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('darktheme'); // Toggle the dark theme class
    localStorage.setItem('darktheme', body.classList.contains('darktheme')); // Save the current theme preference
}

// Function to handle form submission for topic suggestion
document.getElementById('topicSuggestionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const topicInput = document.getElementById('topic');
    const newTopic = topicInput.value.trim();

    if (newTopic) {
        // Retrieve existing topics from localStorage
        let topics = JSON.parse(localStorage.getItem('suggestedTopics')) || [];
        
        // Add the new topic to the list
        topics.push(newTopic);
        
        // Save the updated list back to localStorage
        localStorage.setItem('suggestedTopics', JSON.stringify(topics));
        
        // Clear the input field
        topicInput.value = '';

        // Update the display of suggested topics
        displaySuggestedTopics();
    }
});

// Function to display suggested topics from localStorage
function displaySuggestedTopics() {
    const topicsList = document.getElementById('suggestionsList');
    topicsList.innerHTML = ''; // Clear existing topics

    // Retrieve topics from localStorage
    const topics = JSON.parse(localStorage.getItem('suggestedTopics')) || [];

    // Populate the list with suggested topics
    topics.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.textContent = topic;
        topicsList.appendChild(listItem);
    });
}

// Function to clear suggested topics from localStorage
function clearSuggestedTopics() {
    localStorage.removeItem('suggestedTopics');
    displaySuggestedTopics();
}

// Function to show the next slide
function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

// Function to reset the automatic slide interval
function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

// Function to stop the automatic slide interval
function stopSlideInterval() {
    clearInterval(slideInterval);
}
