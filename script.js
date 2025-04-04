document.addEventListener('DOMContentLoaded', function() {
    // Terminal loader animation
    setTimeout(() => {
        const loader = document.querySelector('.terminal-loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    }, 3000);

    // Typing animation
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = ["Full-stack Web Developer", "Tech Enthusiast", "Problem Solver", "Power Learn Project Student"];
    const typingDelay = 100;
    const erasingDelay = 70;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing animation
    setTimeout(type, newTextDelay + 250);

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Particles.js configuration
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00ff9d"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00b4ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});


// Skills Page Specific JavaScript
if (document.querySelector('.skills')) {
    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const skillLevel = item.getAttribute('data-skill-level');
            const skillFill = item.querySelector('.skill-level-fill');
            const skillPercent = item.querySelector('.skill-percent');
            
            // Reset for animation
            skillFill.style.width = '0';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillFill.style.width = `${skillLevel}%`;
                        skillPercent.textContent = `${skillLevel}%`;
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(item);
        });
    };
    
    // Initialize Chart.js
    const initSkillsChart = () => {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        
        const skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Python', 'Django', 'JavaScript', 'React', 'Flutter', 'Go', 'Laravel', 'Ruby'],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 95, 90, 80, 65, 75, 70],
                    backgroundColor: 'rgba(0, 255, 157, 0.2)',
                    borderColor: 'rgba(0, 255, 157, 1)',
                    pointBackgroundColor: 'rgba(0, 255, 157, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 255, 157, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#aaa',
                            font: {
                                family: 'Roboto Mono, monospace'
                            }
                        },
                        pointLabels: {
                            color: '#ccc',
                            font: {
                                family: 'Roboto Mono, monospace',
                                size: 12
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ccc',
                            font: {
                                family: 'Roboto Mono, monospace'
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });
    };
    
    // Initialize skills page
    document.addEventListener('DOMContentLoaded', function() {
        animateSkillBars();
        initSkillsChart();
    });
}



// Projects Page Specific JavaScript
if (document.querySelector('.projects')) {
    // Project filtering functionality
    const filterProjects = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    };

    // Project modal functionality
    const setupProjectModal = () => {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.getElementById('projectModal');
        const modalClose = document.querySelector('.modal-close');
        const modalImage = document.getElementById('modalProjectImage');
        const modalTitle = document.getElementById('modalProjectTitle');
        const modalDate = document.getElementById('modalProjectDate');
        const modalCategory = document.getElementById('modalProjectCategory');
        const modalDescription = document.getElementById('modalProjectDescription');
        const modalTech = document.getElementById('modalProjectTech');
        const modalLiveLink = document.getElementById('modalLiveLink');
        const modalCodeLink = document.getElementById('modalCodeLink');

        // Sample project data (replace with your actual project data)
        const projectsData = {
            'E-Commerce Platform': {
                date: 'Jan 2023 - Present',
                category: 'Fullstack',
                description: 'A comprehensive e-commerce solution with product management, user authentication, payment processing, and admin dashboard. Built with Django REST framework for the backend and React for the frontend, featuring responsive design and optimized performance.',
                tech: ['Django', 'React', 'PostgreSQL', 'Stripe API', 'Redux', 'JWT'],
                liveLink: '#',
                codeLink: '#'
            },
            'Fitness Tracker App': {
                date: 'Aug 2022 - Dec 2022',
                category: 'Mobile',
                description: 'Cross-platform mobile application for fitness enthusiasts to track workouts, nutrition, and progress. Features include exercise database, workout planning, progress charts, and social sharing capabilities.',
                tech: ['Flutter', 'Firebase', 'Dart', 'BLoC', 'Google Fit API'],
                liveLink: '#',
                codeLink: '#'
            },
            'RESTful API Service': {
                date: 'Mar 2022 - Jun 2022',
                category: 'Backend',
                description: 'High-performance REST API built with Go that handles authentication, rate limiting, and data processing. Features comprehensive documentation with Swagger and automated testing coverage.',
                tech: ['Go Lang', 'PostgreSQL', 'JWT', 'Docker', 'Swagger'],
                liveLink: '#',
                codeLink: '#'
            },
            'Interactive Dashboard': {
                date: 'Nov 2021 - Feb 2022',
                category: 'Web',
                description: 'Data visualization dashboard that displays real-time metrics with interactive charts and customizable widgets. Users can save their preferred layout and receive automated reports.',
                tech: ['React', 'D3.js', 'Redux', 'Chart.js', 'WebSocket'],
                liveLink: '#',
                codeLink: '#'
            },
            'Learning Management System': {
                date: 'May 2021 - Oct 2021',
                category: 'Fullstack',
                description: 'Online learning platform with course management, video streaming, quizzes, and certification. Supports multiple user roles (admin, instructor, student) with appropriate permissions.',
                tech: ['Laravel', 'Vue.js', 'MySQL', 'AWS S3', 'FFmpeg'],
                liveLink: '#',
                codeLink: '#'
            },
            'Microservices Architecture': {
                date: 'Jan 2021 - Apr 2021',
                category: 'Backend',
                description: 'Implementation of a microservices architecture with API gateway, service discovery, and message queue. Demonstrates horizontal scaling and fault tolerance patterns.',
                tech: ['Python', 'Flask', 'Kubernetes', 'RabbitMQ', 'Prometheus'],
                liveLink: '#',
                codeLink: '#'
            }
        };

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectTitle = card.querySelector('.project-title').textContent;
                const projectImg = card.querySelector('.project-img').src;
                const projectData = projectsData[projectTitle];

                // Set modal content
                modalImage.src = projectImg;
                modalTitle.textContent = projectTitle;
                modalDate.textContent = projectData.date;
                modalCategory.textContent = projectData.category;
                modalDescription.textContent = projectData.description;
                
                // Set tech tags
                modalTech.innerHTML = '';
                projectData.tech.forEach(tech => {
                    const tag = document.createElement('span');
                    tag.className = 'tech-tag';
                    tag.textContent = tech;
                    modalTech.appendChild(tag);
                });

                // Set links
                modalLiveLink.href = projectData.liveLink;
                modalCodeLink.href = projectData.codeLink;

                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    };

    // Initialize projects page
    document.addEventListener('DOMContentLoaded', function() {
        filterProjects();
        setupProjectModal();
    });
}



// Contact Page Specific JavaScript
if (document.querySelector('.contact')) {
    // Form submission handling
    const handleFormSubmit = () => {
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        const contactModal = document.getElementById('contactModal');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('.form-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            formStatus.textContent = '';

            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                formStatus.textContent = '';
                
                // Show success modal
                contactModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="submit-text">Send Message</span><span class="submit-icon"><i class="fas fa-paper-plane"></i></span>';
                }, 2000);
            }, 1500);
        });

        // Close modal
        const modalClose = contactModal.querySelector('.modal-close');
        modalClose.addEventListener('click', () => {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    };

    // GitHub API integration
    const fetchGitHubData = () => {
        const repoCount = document.getElementById('repoCount');
        const gistCount = document.getElementById('gistCount');
        const followerCount = document.getElementById('followerCount');
        const githubRepos = document.getElementById('githubRepos');
        
        // Replace with your GitHub username
        const username = 'yourusername';
        
        if (!username) return;
        
        // Fetch user data
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.public_repos) {
                    animateValue(repoCount, 0, data.public_repos, 1000);
                }
                if (data.public_gists) {
                    animateValue(gistCount, 0, data.public_gists, 1000);
                }
                if (data.followers) {
                    animateValue(followerCount, 0, data.followers, 1000);
                }
            })
            .catch(error => {
                console.error('Error fetching GitHub user data:', error);
            });
        
        // Fetch repositories
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
            .then(response => response.json())
            .then(repos => {
                if (repos.message) return; // API error
                
                githubRepos.innerHTML = '';
                
                repos.forEach(repo => {
                    const repoItem = document.createElement('div');
                    repoItem.className = 'repo-item';
                    
                    const stars = repo.stargazers_count || 0;
                    const forks = repo.forks_count || 0;
                    const language = repo.language || 'Unknown';
                    
                    repoItem.innerHTML = `
                        <div class="repo-name">
                            <i class="fas fa-code-branch"></i>
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <p class="repo-desc">${repo.description || 'No description provided'}</p>
                        <div class="repo-meta">
                            <span class="repo-meta-item">
                                <i class="fas fa-star"></i> ${stars}
                            </span>
                            <span class="repo-meta-item">
                                <i class="fas fa-code-branch"></i> ${forks}
                            </span>
                            <span class="repo-meta-item">
                                <i class="fas fa-circle" style="color: ${getLanguageColor(language)}"></i> ${language}
                            </span>
                        </div>
                    `;
                    
                    githubRepos.appendChild(repoItem);
                });
            })
            .catch(error => {
                console.error('Error fetching GitHub repos:', error);
                githubRepos.innerHTML = '<p class="error-text">Unable to load GitHub repositories</p>';
            });
    };
    
    // Helper function to animate number counting
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Helper function to get language colors (simplified)
    const getLanguageColor = (language) => {
        const colors = {
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'Go': '#00ADD8',
            'Ruby': '#701516',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Dart': '#00B4AB',
            'PHP': '#4F5D95'
        };
        return colors[language] || '#ccc';
    };

    // Initialize contact page
    document.addEventListener('DOMContentLoaded', function() {
        handleFormSubmit();
        fetchGitHubData();
    });
}