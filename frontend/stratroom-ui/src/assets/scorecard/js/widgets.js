// $(".carousel").carousel();

// profile image upload
$(".editProfile").on("click", function () {
  $(".profile-default").css("display", "none");
  $(".editProfile").css("display", "none");
  $(".profile-replace").css("display", "block");
});

$(".cancelEditProfile").on("click", function () {
  $(".profile-default").css("display", "block");
  $(".editProfile").css("display", "block");
  $(".profile-replace").css("display", "none");
});

$("#profileImage").click(function (e) {
  $("#imageUpload").click();
});

// reporting Image Upload
$("#reportingAdd").on("click", function () {
  $(".reporting-default").css("display", "none");
  $("#reportingAdd").css("display", "none");
  $(".reporting-replace-add").css("display", "block");
});

$(".canceladdReporting").on("click", function () {
  $(".reporting-default").css("display", "block");
  $("#reportingAdd").css("display", "block");
  $(".reporting-replace-add").css("display", "none");
});

$("#reportingImage").click(function (e) {
  $("#reportingImageUpload").click();
});

// reporting Image Upload
$(".reportingEdit").on("click", function () {
  $(".reporting-default").css("display", "none");
  $("#reportingAdd").css("display", "none");
  $(".reporting-replace-add").css("display", "block");
});

$(".canceladdReporting").on("click", function () {
  $(".reporting-default").css("display", "block");
  $("#reportingAdd").css("display", "block");
  $(".reporting-replace-add").css("display", "none");
});

$("#reportingImage").click(function (e) {
  $("#reportingImageUpload").click();
});

$("#directAdd").on("click", function () {
  $(".direct-default").css("display", "none");
  $("#directAdd").css("display", "none");
  $(".direct-replace-add").css("display", "block");
});

$(".canceladdReporting").on("click", function () {
  $(".direct-default").css("display", "block");
  $("#directAdd").css("display", "block");
  $(".direct-replace-add").css("display", "none");
});

$("#directImage").click(function (e) {
  $("#directImageUpload").click();
});

// direct Image Upload
$(".directEdit").on("click", function () {
  $(".direct-default").css("display", "none");
  $("#directAdd").css("display", "none");
  $(".direct-replace-add").css("display", "block");
});

$(".canceladdDirect").on("click", function () {
  $(".direct-default").css("display", "block");
  $("#directAdd").css("display", "block");
  $(".direct-replace-add").css("display", "none");
});

$("#directImage").click(function (e) {
  $("#directImageUpload").click();
});

$(document).ready(function () {
  $(".editForm").on("click", function () {
    $("#formsidebar").toggleClass("open");
    $("#formsidebar").css("display", "block");
    $("#formsidebar").css("right", "0px");
  });

  $(".scorecarddesc").on("click", function () {
    $("#scorecardsidebar").toggleClass("open");
    $("#scorecardsidebar").css("display", "block");
    $("#scorecardsidebar").css("right", "0px");
  });

  $(".perspectivedesc").on("click", function () {
    $("#perspectivesidebar").toggleClass("open");
    $("#perspectivesidebar").css("display", "block");
    $("#perspectivesidebar").css("right", "0px");
  });

  $(".objectivedesc").on("click", function () {
    $("#objectivesidebar").toggleClass("open");
    $("#objectivesidebar").css("display", "block");
    $("#objectivesidebar").css("right", "0px");
  });

  $(".kpidesc").on("click", function () {
    $("#kpisidebar").toggleClass("open");
    $("#kpisidebar").css("display", "block");
    $("#kpisidebar").css("right", "0px");
  });
});

$(".cancelEditScorecard").on("click", function () {
  $("#scorecardsidebar").css("display", "none");
  $(".overlay").css("display", "none");
});

$(".cancelEditPerspective").on("click", function () {
  $("#perspectivesidebar").css("display", "none");
  $(".overlay").css("display", "none");
});
$(".cancelEditObjective").on("click", function () {
  $("#objectivesidebar").css("display", "none");
  $(".overlay").css("display", "none");
});
$(".cancelEditKpi").on("click", function () {
  $("#kpisidebar").css("display", "none");
  $(".overlay").css("display", "none");
});

$(".checkbox")
  .change(function () {
    $(".toggleDiv").toggle(this.checked);
    $(".btn-new-persp").toggle(this.checked);
  })
  .change();

$(".switchTable").on("click", function () {
  $(".tableview").css("display", "block");
  $(".tableview").css("display", "");
  $(".tileview").css("display", "none");
  $(".switchTable").css("display", "none");
  $(".switchTile").css("display", "block");
});

$(".switchTile").on("click", function () {
  $(".tileview").css("display", "block");
  $(".tileview").css("display", "");
  $(".tableview").css("display", "none");
  $(".switchTile").css("display", "none");
  $(".switchTable").css("display", "block");
});

/*********POPUP***********/

$(function () {
  $(".js-modal-buttons .btn").on("click", function () {
    var color = $(this).data("color");
    $("#mdModal .modal-content")
      .removeAttr("class")
      .addClass("modal-content modal-col-" + color);
    $("#mdModal").modal("show");
  });
});

// $('.date_pickers').daterangepicker({
//     //drops: 'up',
//     opens: 'center',
//     timePicker: false,
//     autoApply: true,
//     startDate: moment().startOf('hour'),
//     endDate: moment().startOf('hour').add(48, 'hour'),
//     locale: {
//         format: 'MMM DD, YYYY'
//     }
// });

$("#kpi_threshold").on("change", function () {
  $(this).val() == "option_1"
    ? $(".color_picks_1").css("display", "block")
    : $(".color_picks_1").css("display", "none");
  $(this).val() == "option_2"
    ? $(".color_picks_2").css("display", "block")
    : $(".color_picks_2").css("display", "none");
  $(this).val() == "option_3"
    ? $(".color_picks_3").css("display", "block")
    : $(".color_picks_3").css("display", "none");
});

$("#kpi_threshold_edit").on("change", function () {
  $(this).val() == "option_1"
    ? $(".color_picks_edit_1").css("display", "block")
    : $(".color_picks_edit_1").css("display", "none");
  $(this).val() == "option_2"
    ? $(".color_picks_edit_2").css("display", "block")
    : $(".color_picks_edit_2").css("display", "none");
  $(this).val() == "option_3"
    ? $(".color_picks_edit_3").css("display", "block")
    : $(".color_picks_edit_3").css("display", "none");
});

const inputElements = document.querySelectorAll(".pickr");
inputElements.forEach((inputElement) => {
  const pickr = new Pickr({
    el: inputElement,
    useAsButton: true,
    theme: "classic",

    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
    ],

    components: {
      preview: true,
      opacity: true,
      hue: true,

      interaction: {
        hex: true,
        rgba: true,
        hsva: true,
        input: true,
        save: true,
      },
    },
  }).on("save", (color) => {
    inputElement.style.background = color.toRGBA().toString(0);

    pickr.hide();
  });
});

$(".date_pickers").datepicker({
  language: "en",
  minDate: new Date(),
  range: true,
  autoClose: true,
  position: "top left",
  todayButton: true,
  onSelect: function (fd) {
    // $('.datepickers-container').hide();
  },
});

$(".date_pickers_bottom").datepicker({
  language: "en",
  minDate: new Date(),
  range: true,
  autoClose: true,
  position: "bottom left",
  todayButton: true,
  onSelect: function (fd) {
    // $('.datepickers-container').hide();
  },
});

$(".date_pickers_single").datepicker({
  language: "en",
  minDate: new Date(),
  autoClose: true,
  position: "top left",
  todayButton: true,
  onSelect: function (fd) {
    // $('.datepickers-container').hide();
  },
});

$("#kpi_formula").on("click", function () {
  $("#kpi_trigger").trigger("click");
});


const functionDescriptions = {
    if: {
        title: "IF",
        desc: "Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF([KPI1, KPI2], 'trueCalc', 'falseCalc') IF(ACTUAL=0,0,ACTUAL/TARGET), IF(sum(ACTUAL)=0,0,sum(ACTUAL)/sum(TARGET)) , IF(sum[RG|OG]=0,0,sum[RG|OG]/sum[RG|OG])"
    },
    avg: {
        title: "AVG",
        desc: "Returns the sum of the given expressions avg(ACTUAL) avg[RG] avg(avg[RG],avg[OG])"
    },
    agg: {
        title: "AGG",
        desc: "Returns the sum of the given expressions agg(ACTUAL) agg(sum[RG],sum[OG])"
    },
    count: {
        title: "COUNT",
        desc: "Returns the count of the given expressions count[ACTUAL]+count[RG] = value"
    },
    sum: {
        title: "SUM",
        desc: "Returns the sum of the given expressions SUM(ACTUAL) SUM(agg[RG],agg[OG])"
    },
    min: {
        title: "MIN",
        desc: "Returns the smallest of the given expressions MIN(ACTUAL, TARGET) MIN(agg[RG],agg[OG])"
    },
    max: {
        title: "MAX",
        desc: "Returns the biggest of the given expressions MAX(ACTUAL, TARGET) MAX(agg[RG],agg[OG])"
    },
};


$(".perFuncton, .performance-kepad").click(function () {
    const key = $(this).text();
    const box = $("#objectivePerformanceformulaBuilder");
    let currentVal = box.val();

    if ($(this).hasClass("perFuncton")) {
        // Function name: add space if needed before appending
        if (currentVal && !currentVal.endsWith(" ")) {
            currentVal += " ";
        }

        const lowerKey = key.toLowerCase();
        box.val(currentVal + `${lowerKey}`);

        // Update description panel
        updatePerResult(lowerKey);
    } else {
        // Operator: just append directly
        box.val(currentVal + key);
    }
});

$(".kpiPerFuncton, .kpiPerformance-kepad").click(function () {
    const key = $(this).text();
    const box = $("#kpiPerformanceformula");
    let currentVal = box.val();

    if ($(this).hasClass("kpiPerFuncton")) {
        // Function name: add space if needed before appending
        if (currentVal && !currentVal.endsWith(" ")) {
            currentVal += " ";
        }

        const lowerKey = key.toLowerCase();
        box.val(currentVal + `${lowerKey}`);

        // Update description panel
        updatekpiPerResult(lowerKey);
    } else {
        // Operator: just append directly
        box.val(currentVal + key);
    }
});

$(".prespectiveFuncton, .prespective-kepad").click(function () {
    const key = $(this).text();
    const box = $("#prespectiveformulaBuilder");
    let currentVal = box.val();

    if ($(this).hasClass("prespectiveFuncton")) {
        // Function name: add space if needed before appending
        if (currentVal && !currentVal.endsWith(" ")) {
            currentVal += " ";
        }

        const lowerKey = key.toLowerCase();
        box.val(currentVal + `${lowerKey}`);

        // Update description panel
        updatekpiPrespectiveResult(lowerKey);
    } else {
        // Operator: just append directly
        box.val(currentVal + key);
    }
});


$(".ytdPerFuncton, .ytdPerformance-kepad").click(function () {
    const key = $(this).text();
    const box = $("#ytdFormulaTextarea");
    let currentVal = box.val();

    if ($(this).hasClass("ytdPerFuncton")) {
        // Function name: add space if needed before appending
        if (currentVal && !currentVal.endsWith(" ")) {
            currentVal += " ";
        }

        const lowerKey = key.toLowerCase();
        box.val(currentVal + `${lowerKey}`);

        // Update description panel
        updateYtdPerResult(lowerKey);
    } else {
        // Operator: just append directly
        box.val(currentVal + key);
    }
});

$(".kpiActualFuncton, .kpiActual-kepad").click(function () {
    const key = $(this).text();
    const box = $("#kpiActualFormulaTextarea");
    let currentVal = box.val();

    if ($(this).hasClass("kpiActualFuncton")) {
        // Function name: add space if needed before appending
        if (currentVal && !currentVal.endsWith(" ")) {
            currentVal += " ";
        }

        const lowerKey = key.toLowerCase();
        box.val(currentVal + `${lowerKey}`);

        // Update description panel
        updatekpiActualResult(lowerKey);
    } else {
        // Operator: just append directly
        box.val(currentVal + key);
    }
});


// $(".measure-list").click(function () {
//     const key = $(this).text();
//     const box = $("#kpiPerformanceformula");
//     let currentVal = box.val();
//     if (currentVal && !currentVal.endsWith(" ")) {
//         currentVal += " ";
//     }

//     box.val(currentVal + key + " ");
// });

$(".prespective-list").click(function () {
    const key = $(this).data("value"); // Use data-value
    const box = $("#prespectiveformulaBuilder");
    let currentVal = box.val().trim();

    // Convert to array and clean
    let values = currentVal.split(" ").filter(Boolean);

    if (values.includes(key)) {
        // Remove from textarea
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add to textarea
        values.push(key);
        $(this).addClass("active");
    }

    box.val(values.join(" ") + (values.length ? " " : ""));
});

$(".objective-list").click(function () {
    const key = $(this).data("value"); // Use data-value
    const box = $("#objectivePerformanceformulaBuilder");
    let currentVal = box.val().trim();

    // Convert to array and clean
    let values = currentVal.split(" ").filter(Boolean);

    if (values.includes(key)) {
        // Remove from textarea
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add to textarea
        values.push(key);
        $(this).addClass("active");
    }

    box.val(values.join(" ") + (values.length ? " " : ""));
});

$(".measure-list").click(function () {
    const key = $(this).data("value"); // Use data-value
    const box = $("#kpiPerformanceformula");
    let currentVal = box.val().trim();

    // Convert to array and clean
    let values = currentVal.split(" ").filter(Boolean);

    if (values.includes(key)) {
        // Remove from textarea
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add to textarea
        values.push(key);
        $(this).addClass("active");
    }

    box.val(values.join(" ") + (values.length ? " " : ""));
});

$(".ytdMeasure-list").click(function () {
    const key = $(this).text().trim();
    const box = $("#ytdFormulaTextarea");
    let currentVal = box.val().trim();

    // Split current value into array
    let values = currentVal.split("|").map(v => v.trim()).filter(Boolean);

    if (values.includes(key)) {
        // Remove if exists
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add if not present
        values.push(key);
        $(this).addClass("active");
    }

    // Update textarea with pipe-separated list
    box.val(values.join(" | ") + (values.length ? " " : ""));
});

$(".ytdSubMeasure-list").click(function () {
    const key = $(this).text().trim();
    const box = $("#ytdFormulaTextarea");
    let currentVal = box.val().trim();

    // Split current value into array
    let values = currentVal.split("|").map(v => v.trim()).filter(Boolean);

    if (values.includes(key)) {
        // Remove if exists
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add if not present
        values.push(key);
        $(this).addClass("active");
    }

    // Update textarea with pipe-separated list
    box.val(values.join(" | ") + (values.length ? " " : ""));
});

$(".ytdInitiatives-list").click(function () {
    const key = $(this).text().trim();
    const box = $("#ytdFormulaTextarea");
    let currentVal = box.val().trim();

    // Split current value into array
    let values = currentVal.split("|").map(v => v.trim()).filter(Boolean);

    if (values.includes(key)) {
        // Remove if exists
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add if not present
        values.push(key);
        $(this).addClass("active");
    }

    // Update textarea with pipe-separated list
    box.val(values.join(" | ") + (values.length ? " " : ""));
});

// kpiActual
$(".kpiActualMeasure-list").click(function () {
    const key = $(this).text().trim();
    const box = $("#kpiActualFormulaTextarea");
    let currentVal = box.val().trim();

    // Split current value into array
    let values = currentVal.split("|").map(v => v.trim()).filter(Boolean);

    if (values.includes(key)) {
        // Remove if exists
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add if not present
        values.push(key);
        $(this).addClass("active");
    }

    // Update textarea with pipe-separated list
    box.val(values.join(" | ") + (values.length ? " " : ""));
});

$(".kpiActualSubMeasure-list").click(function () {
    const key = $(this).text().trim();
    const box = $("#kpiActualFormulaTextarea");
    let currentVal = box.val().trim();

    // Split current value into array
    let values = currentVal.split("|").map(v => v.trim()).filter(Boolean);

    if (values.includes(key)) {
        // Remove if exists
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add if not present
        values.push(key);
        $(this).addClass("active");
    }

    // Update textarea with pipe-separated list
    box.val(values.join(" | ") + (values.length ? " " : ""));
});

$(".kpiActualInitiatives-list").click(function () {
    const key = $(this).text().trim();
    const box = $("#kpiActualFormulaTextarea");
    let currentVal = box.val().trim();

    // Split current value into array
    let values = currentVal.split("|").map(v => v.trim()).filter(Boolean);

    if (values.includes(key)) {
        // Remove if exists
        values = values.filter(val => val !== key);
        $(this).removeClass("active");
    } else {
        // Add if not present
        values.push(key);
        $(this).addClass("active");
    }

    // Update textarea with pipe-separated list
    box.val(values.join(" | ") + (values.length ? " " : ""));
});


function updatePerResult(funcKey) {
    const data = functionDescriptions[funcKey];
    if (data) {
        document.querySelector("#perResult_panel .panel-body h6").textContent = data.title;
        document.querySelector("#perResult_panel .panel-body p").textContent = data.desc;
    }
}
function updateYtdPerResult(funcKey) {
    const data = functionDescriptions[funcKey];
    if (data) {
        document.querySelector("#ytdPerResult_panel .panel-body h6").textContent = data.title;
        document.querySelector("#ytdPerResult_panel .panel-body p").textContent = data.desc;
    }
}

function updatekpiPerResult(funcKey) {
    const data = functionDescriptions[funcKey];
    if (data) {
        document.querySelector("#kpiPerResult_panel .panel-body h6").textContent = data.title;
        document.querySelector("#kpiPerResult_panel .panel-body p").textContent = data.desc;
    }
}

function updatekpiPrespectiveResult(funcKey) {
    const data = functionDescriptions[funcKey];
    if (data) {
        document.querySelector("#prespectiveFunctonResult_panel .panel-body h6").textContent = data.title;
        document.querySelector("#prespectiveFunctonResult_panel .panel-body p").textContent = data.desc;
    }
}

// kpiActual

function updatekpiActualResult(funcKey) {
    const data = functionDescriptions[funcKey];
    if (data) {
        document.querySelector("#kpiActualResult_panel .panel-body h6").textContent = data.title;
        document.querySelector("#kpiActualResult_panel .panel-body p").textContent = data.desc;
    }
}

$("#prespectiveSearchMeasure").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".prespective-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});

$("#objectiveSearchMeasure").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".objective-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});

$("#kpisearchMeasure").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".measure-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});

$("#ytdSearchMeasure").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".ytdMeasure-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});
$("#ytdSearchSubMeasure").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".ytdSubMeasure-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});
$("#ytdSearchInitiatives").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".ytdInitiatives-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});

// kpiActual
$("#kpiActualSearchMeasure").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".kpiActualMeasure-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});
$("#kpiActualSearchSubMeasure").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".kpiActualSubMeasure-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});
$("#kpiActualSearchInitiatives").on("keyup", function () {
    const query = $(this).val().toLowerCase();

    $(".kpiActualInitiatives-list").each(function () {
        //const rawVal = $(this).attr("data-value");
        const rawVal = $(this).text().trim();  
        if (rawVal) {
            const searchText = rawVal.toLowerCase();
            $(this).toggle(searchText.includes(query));
        } else {
            // Hide if data-value is missing
            $(this).hide();
        }
    });
});

// $(".list-group-item, .opr").click(function () {
//   var box = $("#formula");
//   box.val(box.val() + $(this).text());
// });

$("#add").click(function () {
  var value = $("#formula").val();
  var ul = $(".formula-panel");
  var li = document.createElement("li");
  li.setAttribute("class", "list-group-item");
  li.appendChild(document.createTextNode(value));
  ul.append(li);
  $("#formula").val("");
});

$(document).on("click", ".delete-row", function () {
  $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .css("display", "none !important");
});

//Fileupload function
$(function () {
  $("#upload_link").on("click", function (e) {
    e.preventDefault();
    $("#upload:hidden").trigger("click");
  });

  //data collection form image replace
  $("#upload_link1").on("click", function (e) {
    e.preventDefault();
    $("#upload1:hidden").trigger("click");
  });

  $("#upload1").change(readURL);

  $("#upload_link2").on("click", function (e) {
    e.preventDefault();
    $("#upload2:hidden").trigger("click");
  });

  $("#upload2").change(readURL);
});

function readURL() {
  console.log(this);
  var input = this;
  console.log(input.files);
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#upload_link1").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

// $("#send-btn").on('click', function(e) {
$("body").on("click", "#send-btn", function () {
  var parent = $("#comment-conversation");
  var value = $("#comment").val();
  console.log(parent);
  console.log(value);
  var timeNow = formatDate(new Date());
  var data =
    '<li><div class="d-flex flex-row"><div class="flex-column comment_image"><img src="../../images/user/usrbig6.jpg" class="rounded-circle" alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>Elmer Roberts, CEO</strong></span></li><li>' +
    value +
    '</li><li><ul class="d-flex flex-row"><li class="reply">Reply</li><li>Like</li><li>' +
    timeNow +
    ', Today</li></ul></li></ul><ul><li><div class="comment_send" style="display:none"><div class="form-group d-flex flex-row align-items-center"><div class="form-line"><input type="text" class="form-control comment" placeholder="Type a comment..."></div><div class="send_btn reply-btn"><i class="fas fa-arrow-right"></i></div></div></div></li></ul></div><div class="flex-column"><ul class="header-dropdown m-r--2 pt-2 d-flex"><li class="dropdown"><a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><i class="material-icons">more_vert</i></a><ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);"><li><a href="#" data-toggle="modal" data-target=".sub_activitie_popup" onclick="return false;">Edit</a></li><li><a href="#" onclick="return false;">Delete</a></li></ul></li></ul></div></div></li>';
  parent.append(data);
  $("#comment").val("");
});

// $(".reply").on('click', function(e) {
// $("body").on("click", ".reply", function () {
//   $(this).parent().parent().parent().next().find("div.comment_send").toggle();
// });

// $(".reply-btn").on('click', function(e) {
// $("body").on("click", ".reply-btn", function () {
//   var parent = $(this).parent().parent().parent().parent();
//   var value = $(this).parent().find("input.comment").val();
//   var timeNow = formatDate(new Date());
//   var data =
//     '<ul><li><div class="d-flex flex-row"><div class="flex-column comment_image"><img src="../../images/user/usrbig6.jpg" class="rounded-circle" alt="User" width="40"></div><div class="flex-column comment_details"><ul><li><span class="message-data-name"><strong>Elmer Roberts, CEO </strong></span></li><li>' +
//     value +
//     '</li><li><ul class="d-flex flex-row"><li class="reply">Reply</li><li>Like</li><li>' +
//     timeNow +
//     ', Today</li></ul></li></ul><ul><li><div class="comment_send" style="display:none"><div class="form-group d-flex flex-row align-items-center"><div class="form-line"><input type="text" class="form-control comment" placeholder="Type a comment..."></div><div class="send_btn reply-btn"><i class="fas fa-arrow-right"></i></div></div></div></li></ul></div><div class="flex-column"><ul class="header-dropdown m-r--2 pt-2 d-flex"><li class="dropdown"><a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><i class="material-icons">more_vert</i></a><ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);"><li><a href="#" data-toggle="modal" data-target=".sub_activitie_popup" onclick="return false;">Edit</a></li><li><a href="#" onclick="return false;">Delete</a></li></ul></li></ul></div></div></li><ul>';
//   parent.append(data);
//   $(this).parent().parent().toggle();
//   // $('.comment').val('');
// });

$(window).on("load", function () {
  setTimeout(function () {
    var allGs = document.getElementsByTagName("g");
    var allText = document.getElementsByTagName("text");
    for (var i = 0; i < allGs.length; i++) {
      var gElem = allGs[i];
      if (gElem.getAttribute("filter") == 'url("#filter-id-66")') {
        gElem.remove();
      }
    }
  }, 1000);

  // KPI file Js

  // $(function () {
  //   $("#dialog").dialog({
  //     autoOpen: false,
  //     show: {
  //       effect: "blind",
  //       duration: 100,
  //     },
  //     hide: {
  //       effect: "blind",
  //       duration: 100,
  //     },
  //   });

  //   $(".choose").on("click", function () {
  //     $("#dialog").dialog("option", "position", {
  //       my: "center+17 bottom+96",
  //       at: "center bottom+50",
  //       of: $(this),
  //     });
  //     $("#dialog").dialog("open");
  //   });
  //   $("#dialog").dialog({
  //     height: "auto",
  //     modal: true,
  //     fluid: true, 
  //     resizable: false,
  //     width: 500,
  //     top: 274,
  //     left: 490,
  //     modal: true,
  //     responsive: true,
  //   });
  //   $("#dialog").dialog("widget").position({
  //     my: "left+100",
  //     at: "right+100",
  //   });

  //   $("#main-select").on("change", function () {
  //     var value = $(this).val();
  //     switch (value) {
  //       case "last-n-days":
  //         $("#primary-select").removeClass().addClass("col-sm-6");
  //         $("#last-n-days").removeClass().addClass("col-sm-6");
  //         // toggle unused
  //         $("#month").addClass("hidden");
  //         $("#year").addClass("hidden");
  //         $("#quarter").addClass("hidden");
  //         $("#next-n-days").addClass("hidden");
  //         $("#range-from").addClass("hidden");
  //         $("#range-to").addClass("hidden");
  //         $("#exact-date").addClass("hidden");
  //         break;
  //       case "next-n-days":
  //         $("#primary-select").removeClass().addClass("col-sm-6");
  //         $("#next-n-days").removeClass().addClass("col-sm-6");
  //         // toggle unused
  //         $("#month").addClass("hidden");
  //         $("#year").addClass("hidden");
  //         $("#quarter").addClass("hidden");
  //         $("#last-n-days").addClass("hidden");
  //         $("#range-from").addClass("hidden");
  //         $("#range-to").addClass("hidden");
  //         $("#exact-date").addClass("hidden");
  //         break;
  //       case "month":
  //         $("#primary-select").removeClass().addClass("col-sm-4");
  //         $("#month").toggleClass("hidden");
  //         $("#year").toggleClass("hidden");
  //         // toggle unused
  //         $("#quarter").addClass("hidden");
  //         $("#next-n-days").addClass("hidden");
  //         $("#last-n-days").addClass("hidden");
  //         $("#range-from").addClass("hidden");
  //         $("#range-to").addClass("hidden");
  //         $("#exact-date").addClass("hidden");
  //         break;
  //       case "year":
  //         $("#primary-select").removeClass().addClass("col-sm-6");
  //         $("#year").removeClass().addClass("col-sm-6");
  //         // toggle unused
  //         $("#month").addClass("hidden");
  //         $("#quarter").addClass("hidden");
  //         $("#next-n-days").addClass("hidden");
  //         $("#last-n-days").addClass("hidden");
  //         $("#range-from").addClass("hidden");
  //         $("#range-to").addClass("hidden");
  //         $("#exact-date").addClass("hidden");
  //         break;
  //       case "quarter":
  //         $("#primary-select").removeClass().addClass("col-sm-4");
  //         $("#year").removeClass().addClass("col-sm-4");
  //         $("#quarter").removeClass().addClass("col-sm-4");
  //         // toggle unused
  //         $("#month").addClass("hidden");
  //         $("#next-n-days").addClass("hidden");
  //         $("#last-n-days").addClass("hidden");
  //         $("#range-from").addClass("hidden");
  //         $("#range-to").addClass("hidden");
  //         $("#exact-date").addClass("hidden");
  //         break;
  //       case "exact-date":
  //         $("#primary-select").removeClass().addClass("col-sm-6");
  //         $("#exact-date").removeClass().addClass("col-sm-6");
  //         // toggle unused
  //         $("#month").addClass("hidden");
  //         $("#year").addClass("hidden");
  //         $("#quarter").addClass("hidden");
  //         $("#next-n-days").addClass("hidden");
  //         $("#last-n-days").addClass("hidden");
  //         $("#range-from").addClass("hidden");
  //         $("#range-to").addClass("hidden");
  //         break;
  //       case "custom-range":
  //         $("#primary-select").removeClass().addClass("col-sm-4");
  //         $("#range-from").removeClass().addClass("col-sm-4");
  //         $("#range-to").removeClass().addClass("col-sm-4");
  //         // toggle unused
  //         $("#month").addClass("hidden");
  //         $("#year").addClass("hidden");
  //         $("#quarter").addClass("hidden");
  //         $("#next-n-days").addClass("hidden");
  //         $("#last-n-days").addClass("hidden");
  //         $("#exact-date").addClass("hidden");
  //         break;
  //       default:
  //         $("#primary-select").removeClass().addClass("col-sm-12");
  //         $("#month").addClass("hidden");
  //         $("#year").addClass("hidden");
  //         $("#quarter").addClass("hidden");
  //         $("#next-n-days").addClass("hidden");
  //         $("#last-n-days").addClass("hidden");
  //         $("#range-from").addClass("hidden");
  //         $("#range-to").addClass("hidden");
  //         $("#exact-date").addClass("hidden");
  //         break;
  //     }
  //   });
  // });


});
