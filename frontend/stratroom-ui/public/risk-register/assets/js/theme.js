
// theme settings
document.addEventListener("DOMContentLoaded", function () {
    // Load saved settings
    const savedColor = localStorage.getItem("primaryColor") || "#883B71";
    const savedTheme = localStorage.getItem("theme") || "light";
  
    // Apply saved color and theme
    updateRootCSSVariable(savedColor);
    document.body.setAttribute("data-bs-theme", savedTheme);
  
    // If system theme is selected, apply system preference
    if (savedTheme === "system") {
        applySystemTheme();
    }
  
    // Highlight selected color
    document.querySelectorAll(".custom-option-body[data-color]").forEach(el => {
        el.classList.toggle("selected", el.getAttribute("data-color") === savedColor);
    });
  
    // Highlight selected theme
  //   document.querySelectorAll(".custom-option-body[data-theme]").forEach(el => {
  //       el.classList.toggle("selected", el.getAttribute("data-theme") === savedTheme);
  //     //   console.log()
  //   });
  document.querySelectorAll(".custom-option-body[data-theme]").forEach(el => {
      const isSelected = el.getAttribute("data-theme") === savedTheme;
  
      el.classList.toggle("selected", isSelected);
      el.checked = isSelected;
  });
  
    
    
  
    // Add event listeners for color selection
    document.querySelector(".template-customizer-color").addEventListener("click", function (e) {
        const target = e.target.closest(".custom-option-body[data-color]");
        if (target) {
            updateRootCSSVariable(target.getAttribute("data-color"));
        }
    });
  
    // Add event listeners for theme selection
    document.querySelector(".template-customizer-theme").addEventListener("click", function (e) {
        const target = e.target.closest(".custom-option-body[data-theme]");
        if (target) {
            updateTheme(target.getAttribute("data-theme"));
        }
    });
  
    // Initialize color picker
    const pickr = Pickr.create({
        el: "#customColorPicker",
        theme: "classic",
        default: savedColor,
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: { input: true, save: true }
        }
    });
  
    // Handle color picker save event
    pickr.on("save", (color) => {
        updateRootCSSVariable(color.toHEXA().toString());
    });
  
    // Function to update primary color
    function updateRootCSSVariable(color) {
        let styleTag = document.getElementById("dynamic-style");
  
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = "dynamic-style";
            document.head.appendChild(styleTag);
        }
  
        // Convert HEX to RGB
        const rgbColor = hexToRgb(color);
  
        // Generate mixed colors (white + primary at different percentages)
        const navLinkNotActive = mixColors(rgbColor, "255, 255, 255", 0.75);
        const navLinkBorder = mixColors(rgbColor, "255, 255, 255", 0.80);
        const navLinkBg = mixColors(rgbColor, "255, 255, 255", 0.84);
  
        // Apply CSS variables
        styleTag.innerHTML = `
            :root,[data-bs-theme=light] {
                --stratroom-primary: ${color};
                --stratroom-primary-rgb: ${rgbColor};               
            }`;
  
        // Save color to localStorage
        localStorage.setItem("primaryColor", color);
  
        // Update selected state
        document.querySelectorAll(".custom-option-body[data-color]").forEach(el => {
            el.classList.toggle("selected", el.getAttribute("data-color") === color);
        });
    }
  
    // Function to update theme
    function updateTheme(theme) {
        localStorage.setItem("theme", theme);
        document.body.setAttribute("data-bs-theme", theme);
  
        if (theme === "system") {
            applySystemTheme();
        }
  
        // Update selected state
      //   document.querySelectorAll(".custom-option-body[data-theme]").forEach(el => {
      //       el.classList.toggle("selected", el.getAttribute("data-theme") === theme);
      //   });
      document.querySelectorAll(".custom-option-body[data-theme]").forEach(el => {
          const isSelected = el.getAttribute("data-theme") === theme;
      
          el.classList.toggle("selected", isSelected);
      
          // Find the input inside the element and set it as checked
          const input = el.querySelector("input[type='radio']");
          if (input) {
              input.checked = isSelected;
          }
      });
      
    }
  
    // Function to apply system theme dynamically
    function applySystemTheme() {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.body.setAttribute("data-bs-theme", prefersDark ? "dark" : "light");
  
        // Listen for system theme changes
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            const newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            document.body.setAttribute("data-bs-theme", newTheme);
        });
    }
  
    // Function to convert HEX to RGB
    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
  
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
  
        const bigint = parseInt(hex, 16);
        return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
    }
  
    // Function to mix two RGB colors
    function mixColors(color1, color2, weight) {
        const c1 = color1.split(',').map(Number);
        const c2 = color2.split(',').map(Number);
  
        return `${Math.round(c1[0] * (1 - weight) + c2[0] * weight)}, 
                ${Math.round(c1[1] * (1 - weight) + c2[1] * weight)}, 
                ${Math.round(c1[2] * (1 - weight) + c2[2] * weight)}`;
    }
  });
  