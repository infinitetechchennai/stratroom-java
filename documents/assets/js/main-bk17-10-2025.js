


function getOrientation(container) {

  const dir =
        localStorage.getItem("dir") ||
        document.documentElement.getAttribute("dir") ||
        "ltr";

    // if container given, count its children; else use body
    const el = container ? document.querySelector(container) : document.body;
    const count = el.querySelectorAll("*").length;

     if (dir === "rtl") {
        return (count % 2 === 0 || count % 3 === 0) ? "left" : "right";
    } else {
        return (count % 2 === 0 || count % 3 === 0) ? "right" : "left";
    }
}


function initDateRangePicker(selector) {
    var orientation =
        $("#dashboard-body .sub_initiatives").length % 2 === 0 ||
        $("#dashboard-body .sub_initiatives").length % 3 === 0 ?
        "left" :
        "right";
        console.log( $("#dashboard-body .sub_initiatives").length);
    // console.log("selector", selector, orientation);
    $(selector).daterangepicker({
        forceUpdate: true,
        orientation: getOrientation(),
        maxDate: [moment().add(20, "year"), "inclusive"],
        periods: ["month", "quarter", "year"],
        period: "month",
        ranges: {
            "Last 30 days": [moment().subtract(29, "days"), moment()],
            "Last 90 days": [moment().subtract(89, "days"), moment()],
            "Last Year": [moment().subtract(1, "year").add(1, "day"), moment()],
            // 'All Time': 'all-time' // [minDate, maxDate]
        },
        callback: function (startDate, endDate, period) {
            // var title = startDate.format("L") + " – " + endDate.format("L");
            var title =
                startDate.format("MMM, YYYY") +
                " – " +
                endDate.format("MMM, YYYY");
            $(this).val(title);
        },
    });
}
initDateRangePicker("#datePickerHeader");


function previewImage(event) {
    const fileInput = event.target;
    const logoPreview = document.getElementById("logoPreview");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          logoPreview.innerHTML = `<img width="180" height="30" src="${e.target.result}" alt="Image Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
      logoPreview.innerHTML = "<span>No image chosen</span>";
    }
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))



// $(document).ready(function () {
//     const headerHeight = $('.header').outerHeight();
//     $('html').css('--header-height', `${headerHeight}px`);
//     $(window).on('resize', function () {
//       const headerHeight = $('.header').outerHeight();
//       $('html').css('--header-height', `${headerHeight}px`);
//     });
//   });

 function setMainHeightVar() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  // let mainHeight = window.innerHeight - header.offsetHeight;

    let mainHeight = (header?.offsetHeight || 0) 
                 + (footer?.offsetHeight || 0);

             

  // set CSS variable on root (:root)
  document.documentElement.style.setProperty("--header-height", mainHeight + "px");
}

window.addEventListener("load", setMainHeightVar);
window.addEventListener("resize", setMainHeightVar);




// Add event listener for when the modal is shown
document.getElementById('financial-global-kpi-calculator')?.addEventListener('show.bs.modal', function () {
  const headerAddElement = document.getElementById('financial-global-header-add');
  if (headerAddElement) {
    headerAddElement.classList.add('modal-static');
  }
});

// Add event listener for when the modal is hidden
document.getElementById('financial-global-kpi-calculator')?.addEventListener('hidden.bs.modal', function () {
  const headerAddElement = document.getElementById('financial-global-header-add');
  if (headerAddElement) {
    headerAddElement.classList.remove('modal-static');
    const fghaModal = new bootstrap.Modal('#financial-global-header-add', {});
    fghaModal.show();
  }
});


// Add event listener for when the modal is shown
document.getElementById('attendess-list-notes')?.addEventListener('show.bs.modal', function () {
  const notesPestalAddElement = document.getElementById('notes-pestal');
  if (notesPestalAddElement) {
    notesPestalAddElement.classList.add('modal-static');
  }
});

// Add event listener for when the modal is hidden
document.getElementById('attendess-list-notes')?.addEventListener('hidden.bs.modal', function () {
  const notesPestalAddElement = document.getElementById('notes-pestal');
  if (notesPestalAddElement) {
    notesPestalAddElement.classList.remove('modal-static');
    const npModal = new bootstrap.Modal('#notes-pestal', {});
    npModal.show();
  }
});













// theme settings start
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

  const colorPicker = document.querySelector(".template-customizer-color");
  const themePicker = document.querySelector(".template-customizer-theme");
  const colorPickerEl = document.querySelector("#customColorPicker");
  const colorOptions = document.querySelectorAll(".custom-option-body[data-color]");
  const themeOptions = document.querySelectorAll(".custom-option-body[data-theme]");

  // Highlight selected color
  if (colorOptions.length > 0) {
    colorOptions.forEach(el => {
        el.classList.toggle("selected", el.getAttribute("data-color") === savedColor);
    });
} 

if (themeOptions.length > 0) {
    themeOptions.forEach(el => {
        const isSelected = el.getAttribute("data-theme") === savedTheme;
        el.classList.toggle("selected", isSelected);
        el.checked = isSelected;
    });
} 

if (colorPicker) {
    colorPicker.addEventListener("click", function (e) {
        const target = e.target.closest(".custom-option-body[data-color]");
        if (target) {
            updateRootCSSVariable(target.getAttribute("data-color"));
        }
    });
}
if (themePicker) {
    themePicker.addEventListener("click", function (e) {
        const target = e.target.closest(".custom-option-body[data-theme]");
        if (target) {
            updateTheme(target.getAttribute("data-theme"));
        }
    });
}


// if (colorPickerEl) {
//   // Initialize color picker
//   const pickr = Pickr.create({
//       el: "#customColorPicker",
//       theme: "classic",
//       default: savedColor,
//       components: {
//           preview: true,
//           opacity: false,
//           hue: true,
//           interaction: { input: true, save: true }
//       }
//   });

//   // Handle color picker save event
//   pickr.on("change", (color) => {
//       updateRootCSSVariable(color.toHEXA().toString());
//   }).on("save", (color) => {
//     updateRootCSSVariable(color.toHEXA().toString());
// });
// }


if (colorPickerEl) {
  const pickr = Pickr.create({
    el: "#customColorPicker",
    theme: "classic",
    default: savedColor || "#808080",
    components: {
      preview: true,
      opacity: false,
      hue: true,
      interaction: { input: true, save: true }
    }
  });

  // Update CSS variable on valid color
  pickr.on("change", (color, instance) => {
    if (!color) return;
    const hex = color.toHEXA().toString().toLowerCase();

    if (hex === "#ffffff") {
      alert("Pure white (#FFFFFF) is not allowed.");
      pickr.setColor(savedColor || "#883b71");
      return;
    }

    // Update your CSS variable
    updateRootCSSVariable(hex);
  });

  pickr.on("save", (color, instance) => {
    if (!color) return;
    const hex = color.toHEXA().toString().toLowerCase();

    if (hex === "#ffffff") {
      alert("Pure white (#FFFFFF) is not allowed.");
      pickr.hide();
      return;
    }

    // Update CSS variable and hide picker
    updateRootCSSVariable(hex);
    pickr.hide();
  });
}

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
      const contrastText = getContrastColor(color);
      const rgbcontrastText= hexToRgb(contrastText);

      console.log("Contrast text color:", rgbcontrastText);

      // Generate mixed colors (white + primary at different percentages)
    //   const navLinkNotActive = mixColors(rgbColor, "255, 255, 255", 0.75);
    //   const navLinkBorder = mixColors(rgbColor, "255, 255, 255", 0.80);
    //   const navLinkBg = mixColors(rgbColor, "255, 255, 255", 0.84);

      // Apply CSS variables
      styleTag.innerHTML = `
          :root,[data-bs-theme=light] {
              --stratroom-primary: ${color};
              --stratroom-primary-rgb: ${rgbColor};  
              --stratroom-primary-contrast: ${contrastText};                        
              --stratroom-primary-contrast-rgb: ${rgbcontrastText};                        
          }
        .btn-primary{
        --stratroom-btn-bg: ${color};
       --stratroom-btn-border-color: ${color};
        --stratroom-btn-hover-bg: ${shadeColor(color, 10)}; /* Darker shade for hover */
        --stratroom-btn-hover-border-color: ${shadeColor(color, 15)};
        --stratroom-btn-active-bg: ${shadeColor(color, 20)}; /* Even darker for active state */
        --stratroom-btn-active-border-color: ${shadeColor(color, 25)};
        --stratroom-btn-color: ${contrastText}; 
        --stratroom-btn-hover-color: ${rgbcontrastText};
        --stratroom-btn-active-color: ${rgbcontrastText};
           }
         .custom-card .card-header {
      --stratroom-card-cap-bg: ${color};
      --stratroom-card-title-color: ${contrastText}; /* auto contrast */
  }
        .nav-pills{
         --stratroom-nav-pills-link-active-bg: ${color};
        }
        .pagination{
        --stratroom-pagination-active-bg:${color};   
        --stratroom-pagination-active-border-color:${color};   
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

  // Function to determine best contrast color (black/white)
function getContrastColor(hex) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Perceived brightness (YIQ formula)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#FFFFFF";
}


  // Function to mix two RGB colors
  function mixColors(color1, color2, weight) {
      const c1 = color1.split(',').map(Number);
      const c2 = color2.split(',').map(Number);

      return `${Math.round(c1[0] * (1 - weight) + c2[0] * weight)}, 
              ${Math.round(c1[1] * (1 - weight) + c2[1] * weight)}, 
              ${Math.round(c1[2] * (1 - weight) + c2[2] * weight)}`;
  }
  function shadeColor(color, percent) {
    const num = parseInt(color.slice(1), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + percent * 2.55));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + percent * 2.55));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent * 2.55));

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

});
// theme settings end

function loadLanguage(lang) {
  const staticPath = `./lang/static_${lang}.json`;
  // const dynamicPath = `./lang/page_meetings_${lang}.json`;
    // Detect page dynamically
  const page = document.body.getAttribute('data-page') || 'default';
  const dynamicPath = `./lang/page_${page}_${lang}.json`;

  Promise.all([
    fetch(staticPath).then(res => res.json()),
    fetch(dynamicPath).then(res => res.json())
  ])
  .then(([staticData, dynamicData]) => {
    const data = deepMerge(staticData, dynamicData);

    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      const text = key.split('.').reduce((o, i) => o ? o[i] : null, data);
      if (!text) return;

      // ✅ If element has Bootstrap tooltip (data-bs-title)
      if (el.hasAttribute('data-bs-title')) {
        el.setAttribute('data-bs-title', text);

        // If tooltips already initialized, update them dynamically
        const tooltipInstance = bootstrap.Tooltip.getInstance(el);
        if (tooltipInstance) {
          tooltipInstance.setContent({ '.tooltip-inner': text });
        }

      // ✅ If element has placeholder
      } else if (el.placeholder !== undefined) {
        el.placeholder = text;

      // ✅ Otherwise, treat as normal text content
      } else {
        el.textContent = text;
      }
    });

    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    document.body.style.textAlign = dir === 'rtl' ? 'right' : 'left';

    const langEl = document.getElementById('currentLanguage');
    if (langEl) langEl.textContent = lang.toUpperCase();

    localStorage.setItem('lang', lang);
    localStorage.setItem('dir', dir);
  })
  .catch(err => console.error('Error loading language JSON:', err));
}

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
 // Apply direction to all offcanvas elements
  function applyOffcanvasDirection(dir) {
    const offcanvasEls = document.querySelectorAll(".offcanvas");

    offcanvasEls.forEach((offcanvas) => {
      // Remove both direction classes first
      offcanvas.classList.remove("offcanvas-start", "offcanvas-end");

      // Add correct one
      if (dir === "rtl") {
        offcanvas.classList.add("offcanvas-end");
      } else {
        offcanvas.classList.add("offcanvas-start");
      }
    });
  }
// Load saved language on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
   const savedDir = localStorage.getItem("dir") || "ltr";
  loadLanguage(savedLang);
  applyOffcanvasDirection(savedDir);
});
``
// Language switcher
document.querySelectorAll('[data-lang]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    loadLanguage(item.getAttribute('data-lang'));
    setTimeout(() => {
      window.location.reload();
    }, 200);
  });
});




// Loader
    function initLoader() {
        const percentElement = document.getElementById('percent');
        const loader = document.querySelector('.page-loader');

        if (!percentElement || !loader) return;

        let count = 0;
        let loaded = false;

        document.body.style.overflow = 'hidden';

        // Fake progress up to 90%
        const interval = setInterval(() => {
            if (loaded) return; // stop fake increment when full load triggers
            if (count < 90) {
                count++;
                percentElement.textContent = count + '%';
            }
        }, 30);

        // When page really finishes loading
        window.addEventListener('load', () => {
            loaded = true;
            clearInterval(interval);

            // Animate the rest to 100
            const finish = setInterval(() => {
                count++;
                percentElement.textContent = count + '%';
                if (count >= 100) {
                    clearInterval(finish);

                    loader.style.opacity = '0';
                    loader.style.visibility = 'hidden';
                    document.body.style.overflow = 'visible';

                    setTimeout(() => loader.remove(), 600);
                }
            }, 20);
        });
    }
    document.addEventListener('DOMContentLoaded', initLoader);

// Auto position notification dropdown or show offcanvas on mobile
document.addEventListener('DOMContentLoaded', function () {
  const notificationDropdown = document.getElementById('notificationDropdown');
  const dropdownMenu = document.querySelector('[aria-labelledby="notificationDropdown"]');
  const notificationOffcanvas = document.getElementById('notificationOffcanvas');

  if (notificationDropdown && dropdownMenu && notificationOffcanvas) {
    // Override dropdown behavior on mobile
    notificationDropdown.addEventListener('click', function (e) {
      const viewportWidth = window.innerWidth;

      if (viewportWidth <= 576) {
        // Mobile: prevent dropdown and show offcanvas instead
        e.preventDefault();
        e.stopPropagation();

        // Remove dropdown attributes temporarily
        const originalToggle = this.getAttribute('data-bs-toggle');
        this.removeAttribute('data-bs-toggle');

        // Show offcanvas
        const offcanvasInstance = new bootstrap.Offcanvas(notificationOffcanvas);
        offcanvasInstance.show();

        // Restore dropdown attribute after a delay
        setTimeout(() => {
          this.setAttribute('data-bs-toggle', originalToggle);
        }, 100);

        return false;
      }
    });

    notificationDropdown.addEventListener('show.bs.dropdown', function (e) {
      const viewportWidth = window.innerWidth;

      // Prevent dropdown on mobile
      if (viewportWidth <= 576) {
        e.preventDefault();
        return false;
      }

      // Reset classes for desktop
      dropdownMenu.classList.remove('dropdown-menu-end', 'dropdown-menu-start');

      // Get dropdown trigger position
      const triggerRect = notificationDropdown.getBoundingClientRect();
      const dropdownWidth = 350; // Default dropdown width
      const scrollbarWidth = 15; // Approximate scrollbar width

      // Calculate available space on right and left
      const spaceRight = viewportWidth - triggerRect.right - scrollbarWidth;
      const spaceLeft = triggerRect.left;

      // Auto position based on available space
      if (spaceRight >= dropdownWidth) {
        // Enough space on right, align to start (left)
        dropdownMenu.classList.add('dropdown-menu-start');
      } else if (spaceLeft >= dropdownWidth) {
        // Not enough space on right but enough on left, align to end (right)
        dropdownMenu.classList.add('dropdown-menu-end');
      } else {
        // Try to center or use the side with more space
        if (spaceRight > spaceLeft) {
          dropdownMenu.classList.add('dropdown-menu-start');
        } else {
          dropdownMenu.classList.add('dropdown-menu-end');
        }
      }
    });

    // Reset positioning on window resize
    window.addEventListener('resize', function () {
      const viewportWidth = window.innerWidth;

      // Close dropdown if switching to mobile
      if (viewportWidth <= 576 && dropdownMenu.classList.contains('show')) {
        const dropdownInstance = bootstrap.Dropdown.getInstance(notificationDropdown);
        if (dropdownInstance) {
          dropdownInstance.hide();
        }
      }

      // Trigger repositioning if dropdown is open on desktop
      if (viewportWidth > 576 && dropdownMenu.classList.contains('show')) {
        notificationDropdown.dispatchEvent(new Event('show.bs.dropdown'));
      }
    });
  }
});

  // lucide icons
    window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  } 
});


// sortable menu
    let contextMenu = document.getElementById('contextMenu');
    let targetLi = null;

    // Right-click setup
    document.querySelectorAll('.submenu>li').forEach(item => {
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        targetLi = e.currentTarget;
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.display = 'block';
      });
    });

    document.addEventListener('click', () => {
      contextMenu.style.display = 'none';
    });

    // Edit
    document.getElementById('editItem').onclick = () => {
      if (!targetLi) return;
      const aTag = targetLi.querySelector('a');
      document.getElementById('editInput').value = aTag ? aTag.textContent.trim() : '';
      new bootstrap.Modal('#editModal').show();
    };

    document.getElementById('editForm').onsubmit = (e) => {
      e.preventDefault();
      const newText = document.getElementById('editInput').value;
      const aTag = targetLi.querySelector('a');
      if (aTag) aTag.textContent = newText;
      bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    };

    // Delete
    document.getElementById('deleteItem').onclick = () => {
      if (targetLi && confirm('Are you sure you want to delete this item?')) {
        targetLi.remove();
        contextMenu.style.display = 'none';
      }
    };

    // Move Up
    document.getElementById('moveUpItem').onclick = () => {
      if (targetLi && targetLi.previousElementSibling) {
        targetLi.parentNode.insertBefore(targetLi, targetLi.previousElementSibling);
      }
    };

    // Move Down
    document.getElementById('moveDownItem').onclick = () => {
      if (targetLi && targetLi.nextElementSibling) {
        targetLi.parentNode.insertBefore(targetLi.nextElementSibling, targetLi);
      }
    };

    // Drag-and-drop for all submenus
    document.querySelectorAll('.submenu').forEach(menu => {
      new Sortable(menu, {
        animation: 150,
        ghostClass: 'bg-light'
      });
    });
  
// create template modal
    const boardTypes = [
      "Strategy Planner", "SWOT", "PESTEL", "Scorecard", "Risks & Risks", "Tasks",
      "Budget Approval", "Budgets", "Risk Register", "Risk Approval", "Compliance",
      "Meetings", "My Cockpit", "My Performance", "Whiteboard", "Products/Services", "Process (POS)", "Vital Records", "Technology & IT", "Facilities & Utilities", "Personal (HR)", "ISO", "Budget"
    ];
    const pageBoardMap = {
      Plan: ["Strategy Planner", "SWOT", "PESTEL"],
      Measure: ["Scorecard"],
      Execute: ["Risks & Risks", "Tasks", "Budget Approval", "Budgets"],
      Govern: ["Risk Register", "Risk Approval", "Compliance"],
      Meet: ["Meetings"],
      Report: ["Whiteboard", "My Cockpit"],
      Masters: ["Products/Services", "Process (POS)", "Vital Records", "Technology & IT", "Facilities & Utilities", "Personal (HR)", "ISO", "Budget"]
    };

    const pageSelect = document.getElementById("pageType");
    const boardSelect = document.getElementById("boardType");
    const menuList = document.getElementById("menuList");

    pageSelect.addEventListener("change", () => {
      const selected = pageSelect.value;
      boardSelect.innerHTML = '<option value="">Select Board Type</option>';
      if (pageBoardMap[selected]) {
        pageBoardMap[selected].forEach(board => {
          const option = document.createElement("option");
          option.value = board;
          option.textContent = board;
          boardSelect.appendChild(option);
        });
      }
    });

