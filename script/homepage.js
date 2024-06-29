// document.getElementById('burger').addEventListener('click', function() {
//     document.getElementById('menu').classList.toggle('active');
// });

// // Function to handle scroll animations
// function handleScrollAnimations() {
//     document.querySelectorAll('.scroll-animation').forEach(element => {
//         const position = element.getBoundingClientRect().top;
//         if (position < window.innerHeight) {
//             element.classList.add('visible');
//         }
//     });
// }

// // Trigger scroll animations on load
// window.addEventListener('load', handleScrollAnimations);

// // Trigger scroll animations on scroll
// window.addEventListener('scroll', handleScrollAnimations);
document.getElementById('burger').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('active');
});

// Function to handle scroll animations
function handleScrollAnimations() {
    document.querySelectorAll('.scroll-animation').forEach(element => {
        const position = element.getBoundingClientRect().top;
        if (position < window.innerHeight) {
            element.classList.add('visible');
        }
    });
}

// Trigger scroll animations on load
window.addEventListener('load', handleScrollAnimations);

// Trigger scroll animations on scroll
window.addEventListener('scroll', handleScrollAnimations);
