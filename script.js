// script.js
// Bringing animations to life with JavaScript functions
// Demonstrates: scope, parameters, return values, and dynamic CSS control

document.addEventListener("DOMContentLoaded", () => {
  // =============================================
  // PART 1: CSS Animations are already in styles.css
  // =============================================

  // =============================================
  // PART 2: Reusable JavaScript Functions
  // =============================================

  // Global variables (avoid polluting global scope when possible)
  let calculationCount = 0;

  // Function 1: Add two numbers with validation
  function addNumbers(a, b) {
    // Local scope variables
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (isNaN(num1) || isNaN(num2)) {
      return { success: false, message: "Please enter valid numbers" };
    }

    const result = num1 + num2;
    calculationCount++; // Modify global counter
    return { success: true, result: result, count: calculationCount };
  }

  // Function 2: Multiply with default parameter
  function multiply(a, b = 1) {
    const result = parseFloat(a) * parseFloat(b);
    return isNaN(result) ? 0 : result;
  }

  // Function 3: Power function with safety check
  function power(base, exponent = 2) {
    if (exponent < 0) {
      return "Negative exponents not supported";
    }
    return Math.pow(parseFloat(base), exponent);
  }

  // Function 4: Generic animation trigger
  function triggerAnimation(element, animationClass, duration = 1000) {
    // Remove any existing animation classes
    element.classList.remove('bounce', 'slide', 'spin');

    // Small delay to reset animation
    setTimeout(() => {
      element.classList.add(animationClass);
      
      // Remove class after animation completes
      setTimeout(() => {
        element.classList.remove(animationClass);
      }, duration);
    }, 50);
  }

  // Function 5: Show loading modal with custom message
  function showLoadingModal(message = "Please wait...", duration = 3000) {
    const modal = document.getElementById("modal");
    const text = document.getElementById("loading-text");
    
    text.textContent = message;
    modal.classList.add("show");

    // Auto hide after duration
    setTimeout(() => {
      modal.classList.remove("show");
    }, duration);
  }

  // =============================================
  // PART 3: Event Listeners & Animation Triggers
  // =============================================

  // Card Flip
  const flipCard = document.getElementById("flip-card");
  flipCard.addEventListener("click", () => {
    flipCard.classList.toggle("flipped");
  });

  // Animated Box Controls
  const animBox = document.getElementById("anim-box");
  document.getElementById("btn-bounce").addEventListener("click", () => {
    triggerAnimation(animBox, "bounce", 600);
  });

  document.getElementById("btn-slide").addEventListener("click", () => {
    triggerAnimation(animBox, "slide", 1000);
  });

  document.getElementById("btn-spin").addEventListener("click", () => {
    triggerAnimation(animBox, "spin", 1000);
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    animBox.className = "box"; // Reset all classes
  });

  // Loading Modal
  document.getElementById("show-modal").addEventListener("click", () => {
    const messages = [
      "Brewing coffee...",
      "Training AI model...",
      "Contacting aliens...",
      "Almost there!"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    showLoadingModal(randomMsg, 2500);
  });

  // Calculator Functionality
  const resultDisplay = document.getElementById("result");

  document.getElementById("add-btn").addEventListener("click", () => {
    const n1 = document.getElementById("num1").value;
    const n2 = document.getElementById("num2").value;
    const result = addNumbers(n1, n2);

    if (result.success) {
      resultDisplay.textContent = `${result.result} (calc #${result.count})`;
    } else {
      resultDisplay.textContent = result.message;
      resultDisplay.style.color = "#e53e3e";
      setTimeout(() => {
        resultDisplay.style.color = "#5a67d8";
      }, 2000);
    }
  });

  document.getElementById("multiply-btn").addEventListener("click", () => {
    const n1 = document.getElementById("num1").value;
    const n2 = document.getElementById("num2").value || 1;
    const product = multiply(n1, n2);
    resultDisplay.textContent = `${product}`;
  });

  document.getElementById("power-btn").addEventListener("click", () => {
    const base = document.getElementById("num1").value;
    const exp = document.getElementById("num2").value || 2;
    const powered = power(base, exp);
    resultDisplay.textContent = typeof powered === "string" ? powered : powered;
  });

  // Bonus: Scroll-triggered fade-in for cards
  const fadeCards = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0.2s';
        observer.unobserve(entry.target);
      }
    });
  });

  fadeCards.forEach(card => {
    observer.observe(card);
  });

  // Final touch: Console log for fun
  console.log("Animations loaded! Try clicking around.");
});