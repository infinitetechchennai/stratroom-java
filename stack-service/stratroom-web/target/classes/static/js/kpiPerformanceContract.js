        //Language workflow changes
const page_performanceContract_en = {
  "title": "Performance Contract",
  "Draft" : "Draft",
  "Status" : "Status",
  "Cancel": "Cancel",
  "Save": "Submit",
  "Year" : "Year",
  "Month" : "Month",
  "Version" : "Version",
  "GL Account" : "GL Account",
  "GL Name" : "GL Name",
  "Budget Type" : "Budget Type",
  "Project / Initiative" : "Project / Initiative",
  "Outcome" : "Outcome",
  "Objective" : "Objective",
  "Sub Initiative" : "Sub Initiative",
  "Activity" : "Activity",
  "Sub Activity" : "Sub Activity",
  "Currency" : "Currency",
  "No of Days/Qty" : "No of Days/Qty",
  "Unit Amount" : "Unit Amount",
  "Total Budget" : "Total Budget",
  "Department" : "Department",
  "Employee" : "Employee",
  "Notes" : "Notes",
  "SI.No" : "SI.No",
  "Action" : "Action",
  "Comments" : "Comments",
  "Upload File" : "Upload File",
  "Performance Ratings" : "Performance Ratings",
  "Scorecard" : "Scorecard"
}


const page_performanceContract_am = {
  "title": "የአፈፃፀም ውል",
  "Draft": "ስዕለት",
  "Status": "ሁኔታ",
  "Cancel": "ተወው",
  "Save": "አስቀምጥ",
  "Year": "ዓመት",
  "Month": "ወር",
  "Version": "እትም",
  "GL Account": "GL መለያ",
  "GL Name": "GL ስም",
  "Budget Type": "የበጀት አይነት",
  "Project / Initiative": "ፕሮጀክት / ተነሳሽነት",
  "Outcome": "ውጤት",
  "Objective": "ዓላማ",
  "Sub Initiative": "ንዑስ ተነሳሽነት",
  "Activity": "እንቅስቃሴ",
  "Sub Activity": "ንዑስ እንቅስቃሴ",
  "Currency": "ገንዘብ",
  "No of Days/Qty": "የቀናት ብዛት / መጠን",
  "Unit Amount": "የአንዱ መጠን",
  "Total Budget": "ጠቅላላ በጀት",
  "Department": "ክፍል",
  "Employee": "ሰራተኛ",
  "Notes": "ማስታወሻዎች",
  "SI.No": "ተ.ቁ.",
  "Action": "እርምጃ",
  "Comments": "አስተያየቶች",
  "Upload File": "ፋይል መጫኛ",
  "Performance Ratings": "የአፈፃፀም ክፍያዎች",
  "Scorecard": "የአፈፃፀም ካርድ"
}


const page_performanceContract_ar = {
  "title": "الميزانيات",
  "Draft": "مسودة",
  "Status": "الحالة",
  "Cancel": "إلغاء",
  "Save": "حفظ",
  "Year": "السنة",
  "Month": "الشهر",
  "Version": "الإصدار",
  "GL Account": "حساب دفتر الأستاذ العام",
  "GL Name": "اسم دفتر الأستاذ العام",
  "Budget Type": "نوع الميزانية",
  "Project / Initiative": "المشروع / المبادرة",
  "Outcome": "النتيجة",
  "Objective": "الهدف",
  "Sub Initiative": "المبادرة الفرعية",
  "Activity": "النشاط",
  "Sub Activity": "النشاط الفرعي",
  "Currency": "العملة",
  "No of Days/Qty": "عدد الأيام / الكمية",
  "Unit Amount": "قيمة الوحدة",
  "Total Budget": "إجمالي الميزانية",
  "Department": "القسم",
  "Employee": "الموظف",
  "Notes": "ملاحظات",
  "SI.No": "تسلسل",
  "Action": "إجراء",
  "Comments" : "تعليقات",
  "Upload File" : "رفع الملف",
  "Performance Ratings" : "تقييمات الأداء",
  "Scorecard" : "بطاقة الأداء"
};


var selfheader = "Self"
var managerHeader = "Magager"
var consenualHeader = "Consensual"
var totalHeader = "Total";

//Language Wrokflow 
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, key) => (o && o[key] !== undefined) ? o[key] : null, obj);
}

// Load language for all elements with data-translate
function loadLanguage(lang) {
     
          if(lang == "ar") {
             selfheader = "مسودة"
             managerHeader = "المدير";       // Manager
             consenualHeader = "توافقي"; 
              totalHeader = "الإجمالي";  
          }else if(lang == "am"){
              selfheader = "ራስ";
              managerHeader = "ሥራ አስኪያጅ";
              consenualHeader = "ተስማሚ";
              totalHeader = "አጠቃላይ";
          }else {
             selfheader = "Self"
             managerHeader = "Manager"
             consenualHeader = "Consensual"
              totalHeader = "Total";
          }
  let translation;

  if (lang === 'ar') {
    translation = page_performanceContract_ar;
  } else if(lang == "am"){
    translation = page_performanceContract_am;
  }else {
    translation = page_performanceContract_en;
  }

  document.querySelectorAll('[data-translate]').forEach(el => {
    const path = el.getAttribute('data-translate');
    const value = getNestedValue(translation, path);
    if (value !== null) {
      el.textContent = value;
    }
  });

  console.log(lang, "language loaded");
}



    //  function updateTotalScores() {
    //       const storedLanguage = localStorage.getItem("selectedLang") || "en"
         
    //       let selfScore = 0;
    //       let managerScore = 0;
    //       let consensualScore = 0;
    //       let totalItems = 0;

    //       // Count how many KPIs we have
    //       const kpiBlocks = document.querySelectorAll('.questionnaire-block');
    //       totalItems = kpiBlocks.length;

    //       // Calculate scores for each role
    //       ["self", "manager", "consensual"].forEach(role => {
    //         const selectedRadios = document.querySelectorAll('input[name^="kpi-"][name$="-' + role + '"]:checked');

    //         console.log(selectedRadios, "selectedRadios");

    //         selectedRadios.forEach(radio => {
    //           const value = parseInt(radio.value);

    //           console.log(radio, "radioVaues");
    //           if (role == "self") {
    //             selfScore += value;
    //           } else if (role == "manager") {
    //             managerScore += value;
    //           } else if (role == "consensual") {
    //             consensualScore += value;
    //           }
    //         });
    //       });

    //       // // Calculate averages if there are items
    //       // if (totalItems > 0) {
    //       //     selfScore = (selfScore / totalItems).toFixed(2);
    //       //     managerScore = (managerScore / totalItems).toFixed(2);
    //       //     consensualScore = (consensualScore / totalItems).toFixed(2);
    //       // }

    //       console.log(selfScore, managerScore, consensualScore, "Scores");

    //       // Update the totals display
    //       const totalContainer = document.getElementById("kpi_performance_table_total");
    //       totalContainer.innerHTML =
    //         '<div class="header-col">'+totalHeader+'</div>' +
    //         '<div class="header-col">'+selfheader+' - ' + selfScore + '</div>' +
    //         '<div class="header-col">'+managerHeader+' - ' + managerScore + '</div>' +
    //         '<div class="header-col">'+consenualHeader+' - ' + consensualScore + '</div>' +
    //         '<div class="header-col">' +
    //         '<button class="btn btn-generatePdf" title="Download">' +
    //         '<i class="fas fa-file-pdf-o"></i>' +
    //         '</button>' +
    //         '</div>';
    //     }


    function updateTotalScores() {

  let selfScore = 0;
  let managerScore = 0;
  let consensualScore = 0;

  // Select ONLY KPI radios that are checked
  const checkedRadios = document.querySelectorAll(
    '.kpi-radio:checked'
  );

  console.log("Checked KPI radios:", checkedRadios);

  checkedRadios.forEach(function (radio) {
    const value = parseInt(radio.value, 10) || 0;
    const role = radio.dataset.role;

    if (role === "self") {
      selfScore += value;
    } 
    else if (role === "manager") {
      managerScore += value;
    } 
    else if (role === "consensual") {
      consensualScore += value;
    }

   

    console.log(
      "ID:", radio.id,
      "Role:", role,
      "Value:", value
    );
  });


  let totalScore =  selfScore + managerScore + consensualScore

  console.log(
    "Final Scores →",
    "Self:", selfScore,
    "Manager:", managerScore,
    "Consensual:", consensualScore
  );

  $("#siScoreTotal").text(totalScore);

  // Update UI
  const totalContainer = document.getElementById("kpi_performance_table_total");
  if (!totalContainer) return;

  totalContainer.innerHTML =
    '<div class="header-col">' + totalHeader + ' - ' + totalScore + '</div>' +
    '<div class="header-col">' + selfheader + ' - ' + selfScore + '</div>' +
    '<div class="header-col">' + managerHeader + ' - ' + managerScore + '</div>' +
    '<div class="header-col">' + consenualHeader + ' - ' + consensualScore + '</div>' +
    '<div class="header-col">' +
      '<button class="btn btn-generatePdf" title="Download">' +
        '<i class="fas fa-file-pdf-o"></i>' +
      '</button>' +
    '</div>';
}


