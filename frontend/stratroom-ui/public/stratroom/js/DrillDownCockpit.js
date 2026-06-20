function kpidrilldownwithmeasure() {

	if (tablecreatepermission == false) {
		return false;
	}
	var optionalign = "30px";
	if (pagelayoutcol == 4) {
		optionalign = "20px";
	}


	var action = "add";
	var id = "";
	var textObj = datatablejsonform(id, action);
	var methodType = 'post';
	if (action == "edit") {
		var datarangechart = (updateDescription.dashBoardPreferencesValue.datarangechart != undefined && updateDescription.dashBoardPreferencesValue.datarangechart != "" ? updateDescription.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());

		methodType = 'put';
		textObj.id = (id != "" ? id : "");
		textObj.dashBoardPreferencesValue.datarangechart = datarangechart//convertDateRange($("#datePickerdashboard"+id).val());
	} else {
		textObj.dashBoardPreferencesValue.datarangechart = $("#datePeriod").val();
	}
	textObj.dashBoardPreferencesValue.type = "kpidrilltable";
	textObj.dashBoardPreferencesValue.chartdisplayname = "KPI Drill Down Table";
	var presentid = 0;

	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/dashBoardPreferences",
		type: methodType,
		async: false,
		contentType: "application/json",
		data: JSON.stringify(textObj),
		success: function (data, status) {
			presentid = data.id;

			var displayname = "KPI Drill Down Table";
			var datarangechart = $("#datePeriod").val();
			if (data.dashBoardPreferencesValue.datarangechart != undefined && data.dashBoardPreferencesValue.datarangechart != "") {
				datarangechart = data.dashBoardPreferencesValue.datarangechart;
			}
			var daterangeformatted = ""
			var inlineEditContent = `<strong>` + displayname + `</strong>`;
			var fontsizesmaller = "";
			var layoutType = "kpidrilltable";

			daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + data.id + `" value="` + datarangechart + `" style="width: 100%;
						margin-top: -4px;
						text-align: left;
						font-size: 10px !important;
						font-weight: 500;
						border: none !important;"
					/>`;
			if (tableeditpermission == false) {
				var datestring = datarangechart;
				fontsizesmaller = "font-size:smaller;";
			} else {
				inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + data.id + `"
						editable="true"
						contenteditable="true"
						onkeypress="return (this.innerText.length <= 36)"
						  >`+ displayname + `</strong>`;
			}

			var chartsOptions = "";
			if (tableviewpermission == false && tabledeletepermission == false && (tableeditpermission == false || tablecreatepermission == false)) {
				chartsOptions = "";
			} else {
				chartsOptions = `<ul class="header-dropdown m-r--2">
					  <li class="dropdown m-t--10">
						<a
						  href="#"
						  onclick="return false;"
						  class="dropdown-toggle"
						  data-toggle="dropdown"
						  role="button"
						  aria-haspopup="true"
						  aria-expanded="true"
						>
						  <i class="fas fa-ellipsis-h"></i>
						</a>
						<ul
						  class="dropdown-menu editoptionparentdropdown-menu pull-right"
						  x-placement="bottom-start"
						  style="
							position: absolute;
							will-change: transform;
							top: 0px;
							left: 0px;
							transform: translate3d(0px, 24px, 0px);">`;

				if (tableeditpermission == true || tablecreatepermission == true) {
					chartsOptions += `<li class="editevent">
							<a href="#" data-toggle="modal" data-target="#kpidrilldown_setting" data-typevalue="drill"
							  onclick="handleTableevent(`+ data.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
							  >Settings</a>
						  </li>`;
				}

				if (tableviewpermission == true) {
					chartsOptions += `<li class="viewevent">
							<a href="#" 
							  data-toggle="modal"
							  data-target="#kpidrilldown_view" onclick="handleTableevent(`+ data.id + `,'view','` + layoutType + `')">View</a>
						  </li>
						  <li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'download','` + layoutType + `')">Download PDF</a>
						  </li><li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
						  </li>`;
				}

				if (deletepermission == true) {
					chartsOptions += `<li class="deleteevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'delete','` + layoutType + `')">Delete</a>
						  </li>`;
				}

				chartsOptions += `</ul></li></ul>`;
			}


			$(appenddasboardBody).append(`
			<div class="col-md-12 select-toggle myinitiative sub_initiatives dashboard_showlist" id="dashboard_showlist_`+ data.id + `">
			<div class="card" style="padding: 4px ; height: 398px;">
	<div class="header row" style="margin: 0;">
	  <div class="col-4" style="margin-left : -15px;`+ fontsizesmaller + `">
		`+ daterangeformatted + `
		</div>
		<div class="col-7"  style="margin-left : -15px;">
		  <h5 class="prob">
			`+ inlineEditContent + `
		  </h5>
		</div>
	  <div class="col-1 optionalign" style="margin-left : `+ optionalign + `;">
		`+ chartsOptions + `
	  </div>
	</div>
	<div class="d-flex flex-column employee_div_body_box activities-box">
	  <div
		class="table-responsive kpidrilldownTable_`+ data.id + `"
		style="height: 326px;"
	  >
		<table
		  class="table table-bordered w-100 table-centered"
		  id="kpidrilldownTable_`+ data.id + `"
		  style="margin-bottom: 0px !important;"
		>
		  <thead>
			<tr><th rowspan="2" style="width: 40px;">
				  </th>
			  <th rowspan="2" style="width: 40px;">
				<i class="fas fa-arrow-up"></i>
				<i class="fas fa-arrow-down"></i>
			  </th>
			  <th rowspan="2" style="width: 198px;">
				Name/Period
			  </th>
			  <th colspan="3">
				--
			  </th>
			</tr>
			<tr>
			  <th style="width: 98px;" data-i18n="Actual">Actual</th>
			  <th style="width: 98px;" data-i18n="Target">Target</th>
			  <th style="width: 98px;" data-i18n='Gap'>Gap</th>
			</tr>
		  </thead>
		  <tbody>
		  </tbody>
		</table>
	  </div>
	</div>
  </div>
</div>`);
			$(".page-loader-wrapper").css("display", "none");
			var gettotalnoofchart = $("#dashboard-body .dashboard_showlist").length;
			if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
				var modulooperation = gettotalnoofchart % 2;
				var calposition = '';
				if (modulooperation == 0) {
					calposition = 'left';
				} else {
					calposition = 'right';
				}
			} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
				var modulooperation = gettotalnoofchart % 3;
				var calposition = 'right';
				if (modulooperation == 1) {
					calposition = 'right';
				} else if (modulooperation == 2) {
					calposition = 'left';
				} else if (modulooperation == 0) {
					calposition = 'left';
				}
			}


			var financialstart = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.startMonth != undefined && controlpanelgeneralsiteSettings.startMonth != "") ? controlpanelgeneralsiteSettings.startMonth : "Jan");
			var financialend = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.endMonth != undefined && controlpanelgeneralsiteSettings.endMonth != "") ? controlpanelgeneralsiteSettings.endMonth : "Dec");
			var calenderperiod = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.defaultDatePeriod != undefined && controlpanelgeneralsiteSettings.defaultDatePeriod != "") ? controlpanelgeneralsiteSettings.defaultDatePeriod : "Month");
			var calendarYearfinStart = financialstart;
			var calendarYearfinEnd = financialend;
			if (financialstart == "Jul") {
				financialstart = 7;
			} else if (financialstart == "Apr") {
				financialstart = 4;
			} else if (financialstart == "Jan") {
				financialstart = 1;
			}
			if (calenderperiod == "Month" || calenderperiod == "Monthly") {
				calenderperiod = "month";
			} else if (calenderperiod == "Quarter" || calenderperiod == "Quarterly") {
				calenderperiod = "quarter";
			} else if (calenderperiod == "Half Year" || calenderperiod == "HalfYearly") {
				calenderperiod = "hyear";
			} else if (calenderperiod == "Year" || calenderperiod == "Annually") {
				calenderperiod = "year";
			}

			$("#datePickerdashboard" + data.id).daterangepicker({
				forceUpdate: true,
				periods: ["month", "quarter", "hyear", "year"],
				startMonthOfFicalYear: calendarYearfinStart,
				endMonthOfFicalYear: calendarYearfinEnd,
				period: calenderperiod,
				maxDate: [moment().add(30, "year"), "inclusive"],
				idfield: "datePickerdashboard" + data.id,

				callback: function (startDate, endDate, period) {
					var title = startDate.format("L") + "-" + endDate.format("L");
					$(this).val(title);
				},
			});
			initDateRangePicker("#datePickerdashboard" + data.id, data.id, calposition, true);
			location.reload();
		},
		error: function () {
			$(".page-loader-wrapper").css("display", "none");
		}
	});

	$("#kpidrilldownTable_" + presentid).paging({ limit: 5 });
}



function kpistatusCounttable() {

	if (tablecreatepermission == false) {
		return false;
	}
	var optionalign = "30px";
	if (pagelayoutcol == 4) {
		optionalign = "20px";
	}


	var action = "add";
	var id = "";
	var textObj = datatablejsonform(id, action);
	var methodType = 'post';
	if (action == "edit") {
		var datarangechart = (updateDescription.dashBoardPreferencesValue.datarangechart != undefined && updateDescription.dashBoardPreferencesValue.datarangechart != "" ? updateDescription.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());

		methodType = 'put';
		textObj.id = (id != "" ? id : "");
		textObj.dashBoardPreferencesValue.datarangechart = datarangechart//convertDateRange($("#datePickerdashboard"+id).val());
	} else {
		textObj.dashBoardPreferencesValue.datarangechart = $("#datePeriod").val();
	}
	textObj.dashBoardPreferencesValue.type = "kpistatuscount";
	textObj.dashBoardPreferencesValue.chartdisplayname = "KPI Status Count";
	var presentid = 0;

	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/dashBoardPreferences",
		type: methodType,
		async: false,
		contentType: "application/json",
		data: JSON.stringify(textObj),
		success: function (data, status) {
			presentid = data.id;

			var displayname = "KPI Status Count";
			var datarangechart = $("#datePeriod").val();
			if (data.dashBoardPreferencesValue.datarangechart != undefined && data.dashBoardPreferencesValue.datarangechart != "") {
				datarangechart = data.dashBoardPreferencesValue.datarangechart;
			}
			var daterangeformatted = ""
			var inlineEditContent = `<strong>` + displayname + `</strong>`;
			var fontsizesmaller = "";
			var layoutType = "kpistatuscount";

			daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + data.id + `" value="` + datarangechart + `" />`;
			if (tableeditpermission == false) {
				var datestring = datarangechart;
				fontsizesmaller = "font-size:smaller;";
			} else {
				inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + data.id + `"
						editable="true"
						contenteditable="true"
						onkeypress="return (this.innerText.length <= 36)"
						  >`+ displayname + `</strong>`;
			}

			var chartsOptions = "";
			if (tableviewpermission == false && tabledeletepermission == false && (tableeditpermission == false || tablecreatepermission == false)) {
				chartsOptions = "";
			} else {
				chartsOptions = ` <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                 `;

				if (tableeditpermission == true || tablecreatepermission == true) {
					chartsOptions += ` <li>
                    <a class="dropdown-item" href="#kpistatuscount_setting" data-bs-toggle="modal" onclick="handleTableevent(`+ data.id + `,'edit','` + layoutType + `')">Settings</a>
                  </li>`;
				}

				if (tableviewpermission == true) {
					chartsOptions += `  <li>
                    <a class="dropdown-item" href="#kpistatuscount_view" data-bs-toggle="modal" onclick="handleTableevent(`+ data.id + `,'view','` + layoutType + `')">View</a>
                  </li>
				  <li>
                    <a class="dropdown-item" href="#" onclick="handleTableevent(`+ data.id + `,'download','` + layoutType + `')">Download PDF</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onclick="handleTableevent(`+ data.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
                  </li>`;
				}

				if (deletepermission == true) {
					chartsOptions += `<li>
                    <a class="dropdown-item" href="#"  onclick="handleTableevent(`+ data.id + `,'delete','` + layoutType + `')">Delete</a>
                  </li>`;
				}

				chartsOptions += `</ul>`;
			}


			$(appenddasboardBody).append(`<div class="g-col-12 select-toggle myinitiative sub_initiatives" id="dashboard_showlist_` + data.id + `">
        <div class="card table-card border h-100">
          <div class="card-header border-0 bg-transparent pb-0 d-flex gap-2 align-items-center justify-content-between">
            <h5 class="card-title fs-6 mb-0">
              <strong
              editable="true"
              contenteditable="true"
              onkeypress="return (this.innerText.length <= 36)"
                >KPI Status Count </strong
              >
            </h5>
  
              <div class="d-flex gap-3">
            <div class="date-picker">
             `+ daterangeformatted + `
              </div>
              <div class="dropdown">
                <button class="btn btn-link p-0 show" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                  <img width="18" height="18"  src="/stratroom/images/menu-dot-vertical-i.svg">
                </button>
               `+ chartsOptions + `
              </div>
            </div>
          </div>
          <div
            class="table-responsive card-body table-container"
          >
            <div
              class="table-responsive kpistatuscount_`+ data.id + `">
              <table
                class="table table-bordered  dashboard-task-infos align-center dashboard-table kpistatusCount"
                id="kpistatuscount_`+ data.id + `">
                <thead>
                  <tr>
                   
                    <th  editable="true"
                  contenteditable="true"
                  style="width: 150px;">
                      Parent
                    </th>
                    <th editable="true"
                  contenteditable="true"
                   style="width: 150px;">Child</th>
                    <th editable="true"
                  contenteditable="true"
                  style="width:50px;">Red</th>
                    <th editable="true"
                  contenteditable="true"
                  style="width: 50px;">Amber</th>
                    <th editable="true"
                  contenteditable="true"
                  style="width: 50px;">Green</th>
                  </tr>
                </thead>
                <tbody>
                 
                </tbody>
              </table>
            </div>
            <div class="navigation-wrap"></div>
          </div>
        </div>
      </div>`);
			$(".page-loader-wrapper").css("display", "none");
			var gettotalnoofchart = $("#dashboard-body .dashboard_showlist").length;
			if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
				var modulooperation = gettotalnoofchart % 2;
				var calposition = '';
				if (modulooperation == 0) {
					calposition = 'left';
				} else {
					calposition = 'right';
				}
			} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
				var modulooperation = gettotalnoofchart % 3;
				var calposition = 'right';
				if (modulooperation == 1) {
					calposition = 'right';
				} else if (modulooperation == 2) {
					calposition = 'left';
				} else if (modulooperation == 0) {
					calposition = 'left';
				}
			}


			var financialstart = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.startMonth != undefined && controlpanelgeneralsiteSettings.startMonth != "") ? controlpanelgeneralsiteSettings.startMonth : "Jan");
			var financialend = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.endMonth != undefined && controlpanelgeneralsiteSettings.endMonth != "") ? controlpanelgeneralsiteSettings.endMonth : "Dec");
			var calenderperiod = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.defaultDatePeriod != undefined && controlpanelgeneralsiteSettings.defaultDatePeriod != "") ? controlpanelgeneralsiteSettings.defaultDatePeriod : "Month");
			var calendarYearfinStart = financialstart;
			var calendarYearfinEnd = financialend;
			if (financialstart == "Jul") {
				financialstart = 7;
			} else if (financialstart == "Apr") {
				financialstart = 4;
			} else if (financialstart == "Jan") {
				financialstart = 1;
			}
			if (calenderperiod == "Month" || calenderperiod == "Monthly") {
				calenderperiod = "month";
			} else if (calenderperiod == "Quarter" || calenderperiod == "Quarterly") {
				calenderperiod = "quarter";
			} else if (calenderperiod == "Half Year" || calenderperiod == "HalfYearly") {
				calenderperiod = "hyear";
			} else if (calenderperiod == "Year" || calenderperiod == "Annually") {
				calenderperiod = "year";
			}

			$("#datePickerdashboard" + data.id).daterangepicker({
				forceUpdate: true,
				periods: ["month", "quarter", "hyear", "year"],
				startMonthOfFicalYear: calendarYearfinStart,
				endMonthOfFicalYear: calendarYearfinEnd,
				period: calenderperiod,
				maxDate: [moment().add(30, "year"), "inclusive"],
				idfield: "datePickerdashboard" + data.id,

				callback: function (startDate, endDate, period) {
					var title = startDate.format("L") + "-" + endDate.format("L");
					$(this).val(title);
				},
			});

			initDateRangePicker("#datePickerdashboard" + data.id, data.id, calposition, true);
			location.reload();
		},
		error: function () {
			$(".page-loader-wrapper").css("display", "none");
		}
	});

	$("#kpistatuscount_" + presentid).paging({ limit: 5 });
}



function projectstatusCount() {

	if (tablecreatepermission == false) {
		return false;
	}
	var optionalign = "30px";
	if (pagelayoutcol == 4) {
		optionalign = "20px";
	}


	var action = "add";
	var id = "";
	var textObj = datatablejsonform(id, action);
	var methodType = 'post';
	if (action == "edit") {
		var datarangechart = (updateDescription.dashBoardPreferencesValue.datarangechart != undefined && updateDescription.dashBoardPreferencesValue.datarangechart != "" ? updateDescription.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());

		methodType = 'put';
		textObj.id = (id != "" ? id : "");
		textObj.dashBoardPreferencesValue.datarangechart = datarangechart//convertDateRange($("#datePickerdashboard"+id).val());
	} else {
		textObj.dashBoardPreferencesValue.datarangechart = $("#datePeriod").val();
	}
	textObj.dashBoardPreferencesValue.type = "projectstatuscount";
	textObj.dashBoardPreferencesValue.chartdisplayname = "Project Status Count";
	var presentid = 0;

	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/dashBoardPreferences",
		type: methodType,
		async: false,
		contentType: "application/json",
		data: JSON.stringify(textObj),
		success: function (data, status) {
			presentid = data.id;

			var displayname = "Project Status Count";
			var datarangechart = $("#datePeriod").val();
			if (data.dashBoardPreferencesValue.datarangechart != undefined && data.dashBoardPreferencesValue.datarangechart != "") {
				datarangechart = data.dashBoardPreferencesValue.datarangechart;
			}
			var daterangeformatted = ""
			var inlineEditContent = `<strong>` + displayname + `</strong>`;
			var fontsizesmaller = "";
			var layoutType = "projectstatuscount";

			daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + data.id + `" value="` + datarangechart + `" style="width: 100%;
						margin-top: -4px;
						text-align: left;
						font-size: 10px !important;
						font-weight: 500;
						border: none !important;"
					/>`;
			if (tableeditpermission == false) {
				var datestring = datarangechart;
				fontsizesmaller = "font-size:smaller;";
			} else {
				inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + data.id + `"
						editable="true"
						contenteditable="true"
						onkeypress="return (this.innerText.length <= 36)"
						  >`+ displayname + `</strong>`;
			}

			var chartsOptions = "";
			if (tableviewpermission == false && tabledeletepermission == false && (tableeditpermission == false || tablecreatepermission == false)) {
				chartsOptions = "";
			} else {
				chartsOptions = `<ul class="header-dropdown m-r--2">
					  <li class="dropdown m-t--10">
						<a
						  href="#"
						  onclick="return false;"
						  class="dropdown-toggle"
						  data-toggle="dropdown"
						  role="button"
						  aria-haspopup="true"
						  aria-expanded="true"
						>
						  <i class="fas fa-ellipsis-h"></i>
						</a>
						<ul
						  class="dropdown-menu editoptionparentdropdown-menu pull-right"
						  x-placement="bottom-start"
						  style="
							position: absolute;
							will-change: transform;
							top: 0px;
							left: 0px;
							transform: translate3d(0px, 24px, 0px);">`;

				if (tableeditpermission == true || tablecreatepermission == true) {
					chartsOptions += `<li class="editevent">
							<a href="#" data-toggle="modal" data-target="#projectstatuscount_setting" data-typevalue="drill"
							  onclick="handleTableevent(`+ data.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
							  >Settings</a>
						  </li>`;
				}

				if (tableviewpermission == true) {
					chartsOptions += `<li class="viewevent">
							<a href="#" 
							  data-toggle="modal"
							  data-target="#projectstatuscount_view" onclick="handleTableevent(`+ data.id + `,'view','` + layoutType + `')">View</a>
						  </li>
						  <li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'download','` + layoutType + `')">Download PDF</a>
						  </li><li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
						  </li>`;
				}

				if (deletepermission == true) {
					chartsOptions += `<li class="deleteevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'delete','` + layoutType + `')">Delete</a>
						  </li>`;
				}

				chartsOptions += `</ul></li></ul>`;
			}


			$(appenddasboardBody).append(`
<div class="col-md-`+ pagelayoutcol + ` select-toggle myinitiative sub_initiatives dashboard_showlist" id="dashboard_showlist_` + data.id + `">
  <div class="card" style="padding: 4px ; height: 398px;">
	<div class="header row" style="margin: 0;">
	  <div class="col-4" style="margin-left : -15px;`+ fontsizesmaller + `">
		`+ daterangeformatted + `
		</div>
		<div class="col-7"  style="margin-left : -15px;">
		  <h5 class="prob">
			`+ inlineEditContent + `
		  </h5>
		</div>
	  <div class="col-1 optionalign" style="margin-left : `+ optionalign + `;">
		`+ chartsOptions + `
	  </div>
	</div>
	<div class="d-flex flex-column employee_div_body_box activities-box">
	  <div
		class="table-responsive projectstatuscount_`+ data.id + `"
		style="height: 326px;"
	  >
		<table
		  class="table table-bordered w-100 table-centered"
		  id="projectstatuscount_`+ data.id + `"
		  style="margin-bottom: 0px !important;"
		>
		  <thead>
		  <tr>
                       
		  <th class="pjchilld"
		 style="width: 150px;">
		 <strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 36)"
		  >Child</strong
		></th>
		  <th class="pjred"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Red</strong
		</th>
		  <th class="pjamber"
		style="width: 50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Amber</strong</th>
		  <th class="pjgren"
		style="width: 50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Green</strong></th>
		</tr>
	  </thead>
	  <tbody>
		
		  </tbody>
		</table>
	  </div>
	</div>
  </div>
</div>`);
			$(".page-loader-wrapper").css("display", "none");
			var gettotalnoofchart = $("#dashboard-body .dashboard_showlist").length;
			if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
				var modulooperation = gettotalnoofchart % 2;
				var calposition = '';
				if (modulooperation == 0) {
					calposition = 'left';
				} else {
					calposition = 'right';
				}
			} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
				var modulooperation = gettotalnoofchart % 3;
				var calposition = 'right';
				if (modulooperation == 1) {
					calposition = 'right';
				} else if (modulooperation == 2) {
					calposition = 'left';
				} else if (modulooperation == 0) {
					calposition = 'left';
				}
			}


			var financialstart = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.startMonth != undefined && controlpanelgeneralsiteSettings.startMonth != "") ? controlpanelgeneralsiteSettings.startMonth : "Jan");
			var financialend = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.endMonth != undefined && controlpanelgeneralsiteSettings.endMonth != "") ? controlpanelgeneralsiteSettings.endMonth : "Dec");
			var calenderperiod = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.defaultDatePeriod != undefined && controlpanelgeneralsiteSettings.defaultDatePeriod != "") ? controlpanelgeneralsiteSettings.defaultDatePeriod : "Month");
			var calendarYearfinStart = financialstart;
			var calendarYearfinEnd = financialend;
			if (financialstart == "Jul") {
				financialstart = 7;
			} else if (financialstart == "Apr") {
				financialstart = 4;
			} else if (financialstart == "Jan") {
				financialstart = 1;
			}
			if (calenderperiod == "Month" || calenderperiod == "Monthly") {
				calenderperiod = "month";
			} else if (calenderperiod == "Quarter" || calenderperiod == "Quarterly") {
				calenderperiod = "quarter";
			} else if (calenderperiod == "Half Year" || calenderperiod == "HalfYearly") {
				calenderperiod = "hyear";
			} else if (calenderperiod == "Year" || calenderperiod == "Annually") {
				calenderperiod = "year";
			}

			$("#datePickerdashboard" + data.id).daterangepicker({
				forceUpdate: true,
				periods: ["month", "quarter", "hyear", "year"],
				startMonthOfFicalYear: calendarYearfinStart,
				endMonthOfFicalYear: calendarYearfinEnd,
				period: calenderperiod,
				maxDate: [moment().add(30, "year"), "inclusive"],
				idfield: "datePickerdashboard" + data.id,

				callback: function (startDate, endDate, period) {
					var title = startDate.format("L") + "-" + endDate.format("L");
					$(this).val(title);
				},
			});
			initDateRangePicker("#datePickerdashboard" + data.id, data.id, calposition, true);
			location.reload();
		},
		error: function () {
			$(".page-loader-wrapper").css("display", "none");
		}
	});

	$("#projectstatuscount_" + presentid).paging({ limit: 5 });
}



function blankkpi() {

	if (tablecreatepermission == false) {
		return false;
	}
	var optionalign = "30px";
	if (pagelayoutcol == 4) {
		optionalign = "20px";
	}


	var action = "add";
	var id = "";
	var textObj = datatablejsonform(id, action);
	var methodType = 'post';
	if (action == "edit") {
		var datarangechart = (updateDescription.dashBoardPreferencesValue.datarangechart != undefined && updateDescription.dashBoardPreferencesValue.datarangechart != "" ? updateDescription.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());

		methodType = 'put';
		textObj.id = (id != "" ? id : "");
		textObj.dashBoardPreferencesValue.datarangechart = datarangechart//convertDateRange($("#datePickerdashboard"+id).val());
	} else {
		textObj.dashBoardPreferencesValue.datarangechart = $("#datePeriod").val();
	}
	textObj.dashBoardPreferencesValue.type = "blankkpireports";
	textObj.dashBoardPreferencesValue.chartdisplayname = "Blank KPI Reports ";
	var presentid = 0;

	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/dashBoardPreferences",
		type: methodType,
		async: false,
		contentType: "application/json",
		data: JSON.stringify(textObj),
		success: function (data, status) {
			presentid = data.id;

			var displayname = "Blank KPI Reports ";
			var datarangechart = $("#datePeriod").val();
			if (data.dashBoardPreferencesValue.datarangechart != undefined && data.dashBoardPreferencesValue.datarangechart != "") {
				datarangechart = data.dashBoardPreferencesValue.datarangechart;
			}
			var daterangeformatted = ""
			var inlineEditContent = `<strong>` + displayname + `</strong>`;
			var fontsizesmaller = "";
			var layoutType = "blankkpireports";

			daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + data.id + `" value="` + datarangechart + `" style="width: 100%;
						margin-top: -4px;
						text-align: left;
						font-size: 10px !important;
						font-weight: 500;
						border: none !important;"
					/>`;
			if (tableeditpermission == false) {
				var datestring = datarangechart;
				fontsizesmaller = "font-size:smaller;";
			} else {
				inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + data.id + `"
						editable="true"
						contenteditable="true"
						onkeypress="return (this.innerText.length <= 36)"
						  >`+ displayname + `</strong>`;
			}

			var chartsOptions = "";
			if (tableviewpermission == false && tabledeletepermission == false && (tableeditpermission == false || tablecreatepermission == false)) {
				chartsOptions = "";
			} else {
				chartsOptions = `<ul class="header-dropdown m-r--2">
					  <li class="dropdown m-t--10">
						<a
						  href="#"
						  onclick="return false;"
						  class="dropdown-toggle"
						  data-toggle="dropdown"
						  role="button"
						  aria-haspopup="true"
						  aria-expanded="true"
						>
						  <i class="fas fa-ellipsis-h"></i>
						</a>
						<ul
						  class="dropdown-menu editoptionparentdropdown-menu pull-right"
						  x-placement="bottom-start"
						  style="
							position: absolute;
							will-change: transform;
							top: 0px;
							left: 0px;
							transform: translate3d(0px, 24px, 0px);">`;

				if (tableeditpermission == true || tablecreatepermission == true) {
					chartsOptions += `<li class="editevent">
							<a href="#" data-toggle="modal" data-target="#blankkpireports_setting" data-typevalue="drill"
							  onclick="handleTableevent(`+ data.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
							  >Settings</a>
						  </li>`;
				}

				if (tableviewpermission == true) {
					chartsOptions += `<li class="viewevent">
							<a href="#" 
							  data-toggle="modal"
							  data-target="#blankkpireports_view" onclick="handleTableevent(`+ data.id + `,'view','` + layoutType + `')">View</a>
						  </li>
						  <li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'download','` + layoutType + `')">Download PDF</a>
						  </li><li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
						  </li>`;
				}

				if (deletepermission == true) {
					chartsOptions += `<li class="deleteevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'delete','` + layoutType + `')">Delete</a>
						  </li>`;
				}

				chartsOptions += `</ul></li></ul>`;
			}


			$(appenddasboardBody).append(`
<div class="col-md-`+ pagelayoutcol + ` select-toggle myinitiative sub_initiatives dashboard_showlist" id="dashboard_showlist_` + data.id + `">
  <div class="card" style="padding: 4px ; height: 398px;">
	<div class="header row" style="margin: 0;">
	  <div class="col-4" style="margin-left : -15px;`+ fontsizesmaller + `">
		`+ daterangeformatted + `
		</div>
		<div class="col-7"  style="margin-left : -15px;">
		  <h5 class="prob">
			`+ inlineEditContent + `
		  </h5>
		</div>
	  <div class="col-1 optionalign" style="margin-left : `+ optionalign + `;">
		`+ chartsOptions + `
	  </div>
	</div>
	<div class="d-flex flex-column employee_div_body_box activities-box">
	  <div
		class="table-responsive blankkpireports_`+ data.id + `"
		style="height: 326px;"
	  >
		<table
		  class="table table-bordered w-100 table-centered"
		  id="blankkpireports_`+ data.id + `"
		  style="margin-bottom: 0px !important;"
		>
		  <thead>
		  <tr>
                       
		  <th  class="bparent"
		style="width: 150px; ">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 36)"
		  >Parent </strong
		> 
		   
		  </th>
		  <th class="bchild"
		 style="width: 150px;">
		 <strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 36)"
		  >Child</strong
		></th>
		  <th class="bblank"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Blank</strong
		</th>
		 
		</tr>
	  </thead>
	  <tbody>
		
		  </tbody>
		</table>
	  </div>
	</div>
  </div>
</div>`);
			$(".page-loader-wrapper").css("display", "none");
			var gettotalnoofchart = $("#dashboard-body .dashboard_showlist").length;
			if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
				var modulooperation = gettotalnoofchart % 2;
				var calposition = '';
				if (modulooperation == 0) {
					calposition = 'left';
				} else {
					calposition = 'right';
				}
			} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
				var modulooperation = gettotalnoofchart % 3;
				var calposition = 'right';
				if (modulooperation == 1) {
					calposition = 'right';
				} else if (modulooperation == 2) {
					calposition = 'left';
				} else if (modulooperation == 0) {
					calposition = 'left';
				}
			}


			var financialstart = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.startMonth != undefined && controlpanelgeneralsiteSettings.startMonth != "") ? controlpanelgeneralsiteSettings.startMonth : "Jan");
			var financialend = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.endMonth != undefined && controlpanelgeneralsiteSettings.endMonth != "") ? controlpanelgeneralsiteSettings.endMonth : "Dec");
			var calenderperiod = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.defaultDatePeriod != undefined && controlpanelgeneralsiteSettings.defaultDatePeriod != "") ? controlpanelgeneralsiteSettings.defaultDatePeriod : "Month");
			var calendarYearfinStart = financialstart;
			var calendarYearfinEnd = financialend;
			if (financialstart == "Jul") {
				financialstart = 7;
			} else if (financialstart == "Apr") {
				financialstart = 4;
			} else if (financialstart == "Jan") {
				financialstart = 1;
			}
			if (calenderperiod == "Month" || calenderperiod == "Monthly") {
				calenderperiod = "month";
			} else if (calenderperiod == "Quarter" || calenderperiod == "Quarterly") {
				calenderperiod = "quarter";
			} else if (calenderperiod == "Half Year" || calenderperiod == "HalfYearly") {
				calenderperiod = "hyear";
			} else if (calenderperiod == "Year" || calenderperiod == "Annually") {
				calenderperiod = "year";
			}

			$("#datePickerdashboard" + data.id).daterangepicker({
				forceUpdate: true,
				periods: ["month", "quarter", "hyear", "year"],
				startMonthOfFicalYear: calendarYearfinStart,
				endMonthOfFicalYear: calendarYearfinEnd,
				period: calenderperiod,
				maxDate: [moment().add(30, "year"), "inclusive"],
				idfield: "datePickerdashboard" + data.id,

				callback: function (startDate, endDate, period) {
					var title = startDate.format("L") + "-" + endDate.format("L");
					$(this).val(title);
				},
			});
			initDateRangePicker("#datePickerdashboard" + data.id, data.id, calposition, true);
			location.reload();
		},
		error: function () {
			$(".page-loader-wrapper").css("display", "none");
		}
	});

	$("#blankkpireports_" + presentid).paging({ limit: 5 });
}



function initiativecounttable() {

	if (tablecreatepermission == false) {
		return false;
	}
	var optionalign = "30px";
	if (pagelayoutcol == 4) {
		optionalign = "20px";
	}


	var action = "add";
	var id = "";
	var textObj = datatablejsonform(id, action);
	var methodType = 'post';
	if (action == "edit") {
		var datarangechart = (updateDescription.dashBoardPreferencesValue.datarangechart != undefined && updateDescription.dashBoardPreferencesValue.datarangechart != "" ? updateDescription.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());

		methodType = 'put';
		textObj.id = (id != "" ? id : "");
		textObj.dashBoardPreferencesValue.datarangechart = datarangechart//convertDateRange($("#datePickerdashboard"+id).val());
	} else {
		textObj.dashBoardPreferencesValue.datarangechart = $("#datePeriod").val();
	}
	textObj.dashBoardPreferencesValue.type = "initiativeCount";
	textObj.dashBoardPreferencesValue.chartdisplayname = "Initiative Progress Count Table";
	var presentid = 0;

	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/dashBoardPreferences",
		type: methodType,
		async: false,
		contentType: "application/json",
		data: JSON.stringify(textObj),
		success: function (data, status) {
			presentid = data.id;

			var displayname = "Initiative Progress Count Table";
			var datarangechart = $("#datePeriod").val();
			if (data.dashBoardPreferencesValue.datarangechart != undefined && data.dashBoardPreferencesValue.datarangechart != "") {
				datarangechart = data.dashBoardPreferencesValue.datarangechart;
			}
			var daterangeformatted = ""
			var inlineEditContent = `<strong>` + displayname + `</strong>`;
			var fontsizesmaller = "";
			var layoutType = "initiativeCount";

			daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + data.id + `" value="` + datarangechart + `" style="width: 100%;
						margin-top: -4px;
						text-align: left;
						font-size: 10px !important;
						font-weight: 500;
						border: none !important;"
					/>`;
			if (tableeditpermission == false) {
				var datestring = datarangechart;
				fontsizesmaller = "font-size:smaller;";
			} else {
				inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + data.id + `"
						editable="true"
						contenteditable="true"
						onkeypress="return (this.innerText.length <= 36)"
						  >`+ displayname + `</strong>`;
			}

			var chartsOptions = "";
			if (tableviewpermission == false && tabledeletepermission == false && (tableeditpermission == false || tablecreatepermission == false)) {
				chartsOptions = "";
			} else {
				chartsOptions = `<ul class="header-dropdown m-r--2">
					  <li class="dropdown m-t--10">
						<a
						  href="#"
						  onclick="return false;"
						  class="dropdown-toggle"
						  data-toggle="dropdown"
						  role="button"
						  aria-haspopup="true"
						  aria-expanded="true"
						>
						  <i class="fas fa-ellipsis-h"></i>
						</a>
						<ul
						  class="dropdown-menu editoptionparentdropdown-menu pull-right"
						  x-placement="bottom-start"
						  style="
							position: absolute;
							will-change: transform;
							top: 0px;
							left: 0px;
							transform: translate3d(0px, 24px, 0px);">`;

				if (tableeditpermission == true || tablecreatepermission == true) {
					chartsOptions += `<li class="editevent">
							<a href="#" data-toggle="modal" data-target="#initiativeCount_setting" data-typevalue="drill"
							  onclick="handleTableevent(`+ data.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
							  >Settings</a>
						  </li>`;
				}

				if (tableviewpermission == true) {
					chartsOptions += `<li class="viewevent">
							<a href="#" 
							  data-toggle="modal"
							  data-target="#initiativeCount_view" onclick="handleTableevent(`+ data.id + `,'view','` + layoutType + `')">View</a>
						  </li>
						  <li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'download','` + layoutType + `')">Download PDF</a>
						  </li><li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
						  </li>`;
				}

				if (deletepermission == true) {
					chartsOptions += `<li class="deleteevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'delete','` + layoutType + `')">Delete</a>
						  </li>`;
				}

				chartsOptions += `</ul></li></ul>`;
			}


			$(appenddasboardBody).append(`
<div class="col-md-`+ pagelayoutcol + ` select-toggle myinitiative sub_initiatives dashboard_showlist" id="dashboard_showlist_` + data.id + `">
  <div class="card" style="padding: 4px ; height: 398px;">
	<div class="header row" style="margin: 0;">
	  <div class="col-4" style="margin-left : -15px;`+ fontsizesmaller + `">
		`+ daterangeformatted + `
		</div>
		<div class="col-7"  style="margin-left : -15px;">
		  <h5 class="prob">
			`+ inlineEditContent + `
		  </h5>
		</div>
	  <div class="col-1 optionalign" style="margin-left : `+ optionalign + `;">
		`+ chartsOptions + `
	  </div>
	</div>
	<div class="d-flex flex-column employee_div_body_box activities-box">
	  <div
		class="table-responsive initiativeCount_`+ data.id + `"
		style="height: 326px;"
	  >
		<table
		  class="table table-bordered w-100 table-centered"
		  id="initiativeCount_`+ data.id + `"
		  style="margin-bottom: 0px !important;"
		>
		  <thead>
		  <tr>
     
		  <th class="ibchild"
		 style="width: 150px;">
		 <strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 36)"
		  >Child</strong
		></th>
		  <th class="ip"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Inprogress</strong
		</th>
		<th class="cmpl"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Completed</strong
		</th>
		 
		</tr>
	  </thead>
	  <tbody>
		
		  </tbody>
		</table>
	  </div>
	</div>
  </div>
</div>`);
			$(".page-loader-wrapper").css("display", "none");
			var gettotalnoofchart = $("#dashboard-body .dashboard_showlist").length;
			if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
				var modulooperation = gettotalnoofchart % 2;
				var calposition = '';
				if (modulooperation == 0) {
					calposition = 'left';
				} else {
					calposition = 'right';
				}
			} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
				var modulooperation = gettotalnoofchart % 3;
				var calposition = 'right';
				if (modulooperation == 1) {
					calposition = 'right';
				} else if (modulooperation == 2) {
					calposition = 'left';
				} else if (modulooperation == 0) {
					calposition = 'left';
				}
			}


			var financialstart = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.startMonth != undefined && controlpanelgeneralsiteSettings.startMonth != "") ? controlpanelgeneralsiteSettings.startMonth : "Jan");
			var financialend = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.endMonth != undefined && controlpanelgeneralsiteSettings.endMonth != "") ? controlpanelgeneralsiteSettings.endMonth : "Dec");
			var calenderperiod = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.defaultDatePeriod != undefined && controlpanelgeneralsiteSettings.defaultDatePeriod != "") ? controlpanelgeneralsiteSettings.defaultDatePeriod : "Month");
			var calendarYearfinStart = financialstart;
			var calendarYearfinEnd = financialend;
			if (financialstart == "Jul") {
				financialstart = 7;
			} else if (financialstart == "Apr") {
				financialstart = 4;
			} else if (financialstart == "Jan") {
				financialstart = 1;
			}
			if (calenderperiod == "Month" || calenderperiod == "Monthly") {
				calenderperiod = "month";
			} else if (calenderperiod == "Quarter" || calenderperiod == "Quarterly") {
				calenderperiod = "quarter";
			} else if (calenderperiod == "Half Year" || calenderperiod == "HalfYearly") {
				calenderperiod = "hyear";
			} else if (calenderperiod == "Year" || calenderperiod == "Annually") {
				calenderperiod = "year";
			}

			$("#datePickerdashboard" + data.id).daterangepicker({
				forceUpdate: true,
				periods: ["month", "quarter", "hyear", "year"],
				startMonthOfFicalYear: calendarYearfinStart,
				endMonthOfFicalYear: calendarYearfinEnd,
				period: calenderperiod,
				maxDate: [moment().add(30, "year"), "inclusive"],
				idfield: "datePickerdashboard" + data.id,

				callback: function (startDate, endDate, period) {
					var title = startDate.format("L") + "-" + endDate.format("L");
					$(this).val(title);
				},
			});
			initDateRangePicker("#datePickerdashboard" + data.id, data.id, calposition, true);
			location.reload();
		},
		error: function () {
			$(".page-loader-wrapper").css("display", "none");
		}
	});

	$("#initiativeCount_" + presentid).paging({ limit: 5 });
}



function blankinitiativecounttable() {

	if (tablecreatepermission == false) {
		return false;
	}
	var optionalign = "30px";
	if (pagelayoutcol == 4) {
		optionalign = "20px";
	}


	var action = "add";
	var id = "";
	var textObj = datatablejsonform(id, action);
	var methodType = 'post';
	if (action == "edit") {
		var datarangechart = (updateDescription.dashBoardPreferencesValue.datarangechart != undefined && updateDescription.dashBoardPreferencesValue.datarangechart != "" ? updateDescription.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());

		methodType = 'put';
		textObj.id = (id != "" ? id : "");
		textObj.dashBoardPreferencesValue.datarangechart = datarangechart//convertDateRange($("#datePickerdashboard"+id).val());
	} else {
		textObj.dashBoardPreferencesValue.datarangechart = $("#datePeriod").val();
	}
	textObj.dashBoardPreferencesValue.type = "blankinitiativeCount";
	textObj.dashBoardPreferencesValue.chartdisplayname = "Initiative Blank Report Table";
	var presentid = 0;

	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/dashBoardPreferences",
		type: methodType,
		async: false,
		contentType: "application/json",
		data: JSON.stringify(textObj),
		success: function (data, status) {
			presentid = data.id;

			var displayname = "Initiative Blank Report Table";
			var datarangechart = $("#datePeriod").val();
			if (data.dashBoardPreferencesValue.datarangechart != undefined && data.dashBoardPreferencesValue.datarangechart != "") {
				datarangechart = data.dashBoardPreferencesValue.datarangechart;
			}
			var daterangeformatted = ""
			var inlineEditContent = `<strong>` + displayname + `</strong>`;
			var fontsizesmaller = "";
			var layoutType = "blankinitiativeCount";

			daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + data.id + `" value="` + datarangechart + `" style="width: 100%;
						margin-top: -4px;
						text-align: left;
						font-size: 10px !important;
						font-weight: 500;
						border: none !important;"
					/>`;
			if (tableeditpermission == false) {
				var datestring = datarangechart;
				fontsizesmaller = "font-size:smaller;";
			} else {
				inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + data.id + `"
						editable="true"
						contenteditable="true"
						onkeypress="return (this.innerText.length <= 36)"
						  >`+ displayname + `</strong>`;
			}

			var chartsOptions = "";
			if (tableviewpermission == false && tabledeletepermission == false && (tableeditpermission == false || tablecreatepermission == false)) {
				chartsOptions = "";
			} else {
				chartsOptions = `<ul class="header-dropdown m-r--2">
					  <li class="dropdown m-t--10">
						<a
						  href="#"
						  onclick="return false;"
						  class="dropdown-toggle"
						  data-toggle="dropdown"
						  role="button"
						  aria-haspopup="true"
						  aria-expanded="true"
						>
						  <i class="fas fa-ellipsis-h"></i>
						</a>
						<ul
						  class="dropdown-menu editoptionparentdropdown-menu pull-right"
						  x-placement="bottom-start"
						  style="
							position: absolute;
							will-change: transform;
							top: 0px;
							left: 0px;
							transform: translate3d(0px, 24px, 0px);">`;

				if (tableeditpermission == true || tablecreatepermission == true) {
					chartsOptions += `<li class="editevent">
							<a href="#" data-toggle="modal" data-target="#initiativeblankCount_setting" data-typevalue="drill"
							  onclick="handleTableevent(`+ data.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
							  >Settings</a>
						  </li>`;
				}

				if (tableviewpermission == true) {
					chartsOptions += `<li class="viewevent">
							<a href="#" 
							  data-toggle="modal"
							  data-target="#initiativeblankCount_view" onclick="handleTableevent(`+ data.id + `,'view','` + layoutType + `')">View</a>
						  </li>
						  <li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'download','` + layoutType + `')">Download PDF</a>
						  </li><li class="downloadevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
						  </li>`;
				}

				if (deletepermission == true) {
					chartsOptions += `<li class="deleteevent">
							<a class="pointer" onclick="handleTableevent(`+ data.id + `,'delete','` + layoutType + `')">Delete</a>
						  </li>`;
				}

				chartsOptions += `</ul></li></ul>`;
			}


			$(appenddasboardBody).append(`
<div class="col-md-`+ pagelayoutcol + ` select-toggle myinitiative sub_initiatives dashboard_showlist" id="dashboard_showlist_` + data.id + `">
  <div class="card" style="padding: 4px ; height: 398px;">
	<div class="header row" style="margin: 0;">
	  <div class="col-4" style="margin-left : -15px;`+ fontsizesmaller + `">
		`+ daterangeformatted + `
		</div>
		<div class="col-7"  style="margin-left : -15px;">
		  <h5 class="prob">
			`+ inlineEditContent + `
		  </h5>
		</div>
	  <div class="col-1 optionalign" style="margin-left : `+ optionalign + `;">
		`+ chartsOptions + `
	  </div>
	</div>
	<div class="d-flex flex-column employee_div_body_box activities-box">
	  <div
		class="table-responsive initiativeblankCount_`+ data.id + `"
		style="height: 326px;"
	  >
		<table
		  class="table table-bordered w-100 table-centered"
		  id="initiativeblankCount_`+ data.id + `"
		  style="margin-bottom: 0px !important;"
		>
		  <thead>
		  <tr>
     
		  <th class="ibchild"
		 style="width: 150px;">
		 <strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 36)"
		  >Child</strong
		></th>
		  <th class="ip"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Blank</strong
		</th>
		 
		</tr>
	  </thead>
	  <tbody>
		
		  </tbody>
		</table>
	  </div>
	</div>
  </div>
</div>`);
			$(".page-loader-wrapper").css("display", "none");
			var gettotalnoofchart = $("#dashboard-body .dashboard_showlist").length;
			if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
				var modulooperation = gettotalnoofchart % 2;
				var calposition = '';
				if (modulooperation == 0) {
					calposition = 'left';
				} else {
					calposition = 'right';
				}
			} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
				var modulooperation = gettotalnoofchart % 3;
				var calposition = 'right';
				if (modulooperation == 1) {
					calposition = 'right';
				} else if (modulooperation == 2) {
					calposition = 'left';
				} else if (modulooperation == 0) {
					calposition = 'left';
				}
			}


			var financialstart = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.startMonth != undefined && controlpanelgeneralsiteSettings.startMonth != "") ? controlpanelgeneralsiteSettings.startMonth : "Jan");
			var financialend = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.endMonth != undefined && controlpanelgeneralsiteSettings.endMonth != "") ? controlpanelgeneralsiteSettings.endMonth : "Dec");
			var calenderperiod = (controlpanelgeneralsiteSettings != "" && (controlpanelgeneralsiteSettings.defaultDatePeriod != undefined && controlpanelgeneralsiteSettings.defaultDatePeriod != "") ? controlpanelgeneralsiteSettings.defaultDatePeriod : "Month");
			var calendarYearfinStart = financialstart;
			var calendarYearfinEnd = financialend;
			if (financialstart == "Jul") {
				financialstart = 7;
			} else if (financialstart == "Apr") {
				financialstart = 4;
			} else if (financialstart == "Jan") {
				financialstart = 1;
			}
			if (calenderperiod == "Month" || calenderperiod == "Monthly") {
				calenderperiod = "month";
			} else if (calenderperiod == "Quarter" || calenderperiod == "Quarterly") {
				calenderperiod = "quarter";
			} else if (calenderperiod == "Half Year" || calenderperiod == "HalfYearly") {
				calenderperiod = "hyear";
			} else if (calenderperiod == "Year" || calenderperiod == "Annually") {
				calenderperiod = "year";
			}

			$("#datePickerdashboard" + data.id).daterangepicker({
				forceUpdate: true,
				periods: ["month", "quarter", "hyear", "year"],
				startMonthOfFicalYear: calendarYearfinStart,
				endMonthOfFicalYear: calendarYearfinEnd,
				period: calenderperiod,
				maxDate: [moment().add(30, "year"), "inclusive"],
				idfield: "datePickerdashboard" + data.id,

				callback: function (startDate, endDate, period) {
					var title = startDate.format("L") + "-" + endDate.format("L");
					$(this).val(title);
				},
			});
			initDateRangePicker("#datePickerdashboard" + data.id, data.id, calposition, true);
			location.reload();
		},
		error: function () {
			$(".page-loader-wrapper").css("display", "none");
		}
	});

	$("#initiativeblankCount_" + presentid).paging({ limit: 5 });
}




function widgetkpiDrillTableLoad(item, chartposition) {
	var layoutType = item.dashBoardPreferencesValue.type;
	var displayname = (item.dashBoardPreferencesValue.chartdisplayname != undefined ? item.dashBoardPreferencesValue.chartdisplayname : "KPI Drill Down Table");
	var kpi = ((item.dashBoardPreferencesValue.kpis != undefined && item.dashBoardPreferencesValue.kpis != "") ? item.dashBoardPreferencesValue.kpis : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var body = "";
	var tablerow = "";
	var tableheader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];
	if (item.dashBoardPreferencesValue.actual == true) {
		tableheader += '<th data-i18n="Actual">Actual</th>';
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.target == true) {
		tableheader += '<th data-i18n="Target">Target</th>';
		checkfielditems.push(true);
	}

	if (item.dashBoardPreferencesValue.gap == true) {
		tableheader += '<th data-i18n="Gap">Gap</th>';
		checkfielditems.push(true);
	}

	if (item.dashBoardPreferencesValue.ytd == true) {
		tableheader += '<th data-i18n="YTD">YTD</th>';
		checkfielditems.push(true);
	}
	if (checkfielditems != undefined && checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	} else if (checkfielditems) {
		quternamespan = checkfielditems.length;
	}

	var tableheight = "100";
	if (pagelayoutcol == 4) {
		tableheight = "85";
	}
	var frequencyTable = "";
	var tableid = 1;
	var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") ? item.dashBoardPreferencesValue.measurement : "Monthly");
	if (layoutType == "kpidrilltable") {

		var optionalign = "30px";
		if (pagelayoutcol == 4) {
			optionalign = "20px";
		}

		var tableHeader = "";
		if (frequencyTable == "") {
			tableHeader = `<thead>
				  <tr><th rowspan="2" style="width: 40px;">
				  </th>
				  <th rowspan="2" style="width: 40px;">
					<i class="fas fa-arrow-up"></i>
					<i class="fas fa-arrow-down"></i>
				  </th>`;

			if (item.dashBoardPreferencesValue.status == true) {
				tableheader += '<th rowspan="2" style="width: 20px; style="vertical-align:middle!important;">Status</th>';
			}
			tableheader += `<th rowspan="2" style="width: 198px;vertical-align:middle!important;">
					  Name/Period
					</th>
					<th colspan="`+ quternamespan + `">
					  `+ measurement + `
					</th>
				  </tr>
				  <tr>
					`+ tableheader + `
				  </tr>
				</thead>`;
		}

		var daterangeformatted = ""
		var inlineEditContent = `<strong>` + displayname + `</strong>`;
		var fontsizesmaller = "";
		daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + item.id + `" value="` + datarangechart + `"/>`;
		if (editpermission == false) {
			var datestring = datarangechart;
			fontsizesmaller = "font-size:smaller;";
		} else {
			inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + item.id + `"
				  editable="true"
				  contenteditable="true"
				  onkeypress="return (this.innerText.length <= 36)"
					>`+ displayname + `</strong>`;
		}

		var chartsOptions = "";
		if (viewpermission == false && deletepermission == false && editpermission == false) {
			chartsOptions = "";
		} else {
			chartsOptions = `<div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

			if (editpermission == true) {
				chartsOptions += `<li>
                            <a class="dropdown-item" href="#kpidrilldown_setting" data-bs-toggle="modal"
                              data-typevalue="risktable"
                        onclick="handleTableevent(`+ item.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
                        >Settings</a>
                        </li>`;
			}

			if (viewpermission == true) {
				chartsOptions += `<li>
                            <a class="dropdown-item" href="#kpidrilldown_view" data-bs-toggle="modal"
                              onclick="handleTableevent(`+ item.id + `,'view','` + layoutType + `')">View</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="handleTableevent(`+ item.id + `,'download','` + layoutType + `')">Download PDF</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="handleTableevent(`+ item.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
                        </li>`;
			}

			if (deletepermission == true) {
				chartsOptions += `<li>
                            <a class="dropdown-item" href="#" onclick="handleTableevent(`+ item.id + `,'delete','` + layoutType + `')">Delete</a>
                        </li>`;
			}

			chartsOptions += `</ul></div>`;
		}

		body = `
		<div class="g-col-12"  id="dashboard_showlist_`+ data.id + `">
		<div class="card custom-card h-100">
		  <div class="card-header">
			<div class="c-header-left">
                <h5 class="card-title">
                    <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">`+ inlineEditContent + `</strong>
                </h5>
                <div class="date-picker ">
                     `+ daterangeformatted + `
                </div>
            </div>
            <div class="card-actions"> `+ chartsOptions + `
            </div>
		  </div>
			<div class="table-responsive card-body  kpidrilldownTable_`+ item.id + `" style="height: 326px;">
			  <table
				class="table table-bordered w-100 table-centered"
				id="kpidrilldownTable_`+ item.id + `"
				 >`+ tableHeader + `
				<tbody>`+ frequencyTable + `
				</tbody>
			  </table>
			</div>
		  </div>
	  </div>`;

	}
	$(appenddasboardBody).append(body);
	//$("#drilldownTable_"+item.id).paging({ limit: 1 });


	if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
		var modulooperation = chartposition % 2;
		var calposition = 'right';
		if (modulooperation == 1) {
			calposition = 'left';
		}
	} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
		var modulooperation = chartposition % 3;
		var calposition = 'right';
		if (modulooperation == 0) {
			calposition = 'right';
		} else if (modulooperation == 1) {
			calposition = 'left';
		} else if (modulooperation == 2) {
			calposition = 'left';
		}
	}

	if (editpermission == true || createpermission == true || cockpitcontentload == true) {
		initDateRangePicker("#datePickerdashboard" + item.id, item.id, calposition, false);
	}
}




function widgetkpistatuscountLoad(item, chartposition) {
	var layoutType = item.dashBoardPreferencesValue.type;
	var displayname = (item.dashBoardPreferencesValue.chartdisplayname != undefined ? item.dashBoardPreferencesValue.chartdisplayname : "KPI Drill Down Table");
	var scorecard = ((item.dashBoardPreferencesValue.scorecard != undefined && item.dashBoardPreferencesValue.scorecard != "") ? item.dashBoardPreferencesValue.scorecard : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var body = "";
	var tablerow = "";
	var tableheader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];
	tableHeader = `<thead>
				  <tr>`;
	if (item.dashBoardPreferencesValue.parent == true) {
		tableheader += `               
		<th  class="stsparent"
	  style="width: 150px; ">
	  <strong
	  editable="true"
	  contenteditable="true"
	  onkeypress="return (this.innerText.length <= 36)"
		>Parent </strong
	  > 
		 
		</th>`;
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.child == true) {
		tableheader += `<th class="stschild"
		style="width: 150px;">
		<strong
	   editable="true"
	   contenteditable="true"
	   onkeypress="return (this.innerText.length <= 36)"
		 >Child</strong
	   ></th>`;
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.red == true) {
		tableheader += `<th class="stsred"
		style="width:50px;">
		<strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: #df0404;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong>
		</th>`;
		checkfielditems.push(true);
	}

	if (item.dashBoardPreferencesValue.lightred == true) {
		tableheader += `<th class="stsred"
		style="width:50px;">
		<strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: #ff0000d6;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong>
		</th>`;
		checkfielditems.push(true);
	}

	if (item.dashBoardPreferencesValue.amber == true) {
		tableheader += ` <th class="stsamber"
		style="width: 50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: yellow;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
		checkfielditems.push(true);
	}

	if (item.dashBoardPreferencesValue.lightgreen == true) {
		tableheader += ` <th class="stsgren"
		style="width: 50px;">
		<strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color:#00ff1c;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.green == true) {
		tableheader += ` <th class="stsgren"
		style="width: 50px;">
		<strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color:green;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
		checkfielditems.push(true);
	}
	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	} else {
		quternamespan = checkfielditems.length;
	}

	var tableheight = "100";
	if (pagelayoutcol == 4) {
		tableheight = "85";
	}
	var frequencyTable = "";
	var tableid = 1;
	var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") ? item.dashBoardPreferencesValue.measurement : "Monthly");
	if (layoutType == "kpistatuscount") {


		var optionalign = "30px";
		if (pagelayoutcol == 4) {
			optionalign = "20px";
		}


		tableHeader += ` </tr>
				</thead>`;


		var daterangeformatted = ""
		var inlineEditContent = `<strong>` + displayname + `</strong>`;
		var fontsizesmaller = "";
		daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + item.id + `" value="` + datarangechart + `" />`;
		if (editpermission == false) {
			var datestring = datarangechart;
			fontsizesmaller = "font-size:smaller;";
		} else {
			inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + item.id + `"
				  editable="true"
				  contenteditable="true"
				  onkeypress="return (this.innerText.length <= 36)"
					>`+ displayname + `</strong>`;
		}

		var chartsOptions = "";
		if (viewpermission == false && deletepermission == false && editpermission == false) {
			chartsOptions = "";
		} else {
			chartsOptions = `<ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

			if (editpermission == true) {
				chartsOptions += `<li>
                    <a class="dropdown-item" href="#kpistatuscount_setting" data-bs-toggle="modal" data-typevalue="kpidrill"
						onclick="handleTableevent(`+ item.id + `,'edit','` + layoutType + `')">Settings</a>
                  </li>`;
			}

			if (viewpermission == true) {
				chartsOptions += `<li>
                    <a class="dropdown-item" href="#kpistatuscount_view" data-bs-toggle="modal" onclick="handleTableevent(`+ item.id + `,'view','` + layoutType + `')">View</a>
                  </li>
				  <li>
                    <a class="dropdown-item" href="#" onclick="handleTableevent(`+ item.id + `,'download','` + layoutType + `')">Download PDF</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onclick="handleTableevent(`+ item.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
                  </li>`;
			}

			if (deletepermission == true) {
				chartsOptions += `<li>
                    <a class="dropdown-item" href="#"  onclick="handleTableevent(`+ item.id + `,'delete','` + layoutType + `')">Delete</a>
                  </li>`;
			}

			chartsOptions += `</ul></li></ul>`;
		}

		body = `<div class="g-col-12" id="dashboard_showlist_` + item.id + `">
    <div class="card custom-card table-card h-100">
        <div class="card-header">
            <div class="c-header-left">
                <h5 class="card-title">
                    <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">KPI Status Count </strong>
                </h5>
                <div class="date-picker">
                   `+ daterangeformatted + `
                </div>
            </div>
            <div class="card-actions">

                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16"  src="/stratroom/images/menu-dot-vertical-i.svg">
                    </button>
                   `+ chartsOptions + `
                </div>
            </div>
        </div>
        <div class="table-responsive card-body kpistatuscount_`+ item.id + `" style="height: 326px;">
            <table class="table table-bordered w-100 table-centered kpistatusCount"  id="kpistatuscount_`+ item.id + `"> `
			+ tableHeader + `
                <tbody>
                  `+ frequencyTable + `
                </tbody>
			</table>

        </div>
    </div>
</div>`;

	}
	$(appenddasboardBody).append(body);
	//$("#drilldownTable_"+item.id).paging({ limit: 1 });


	if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
		var modulooperation = chartposition % 2;
		var calposition = 'right';
		if (modulooperation == 1) {
			calposition = 'left';
		}
	} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
		var modulooperation = chartposition % 3;
		var calposition = 'right';
		if (modulooperation == 0) {
			calposition = 'right';
		} else if (modulooperation == 1) {
			calposition = 'left';
		} else if (modulooperation == 2) {
			calposition = 'left';
		}
	}

	if (editpermission == true || createpermission == true || cockpitcontentload == true) {
		initDateRangePicker("#datePickerdashboard" + item.id, item.id, calposition, false);
	}
}


function widgetprojectstatuscountLoad(item, chartposition) {
	var layoutType = item.dashBoardPreferencesValue.type;
	var displayname = (item.dashBoardPreferencesValue.chartdisplayname != undefined ? item.dashBoardPreferencesValue.chartdisplayname : "KPI Drill Down Table");
	var formula = ((item.dashBoardPreferencesValue.formula != undefined && item.dashBoardPreferencesValue.formula != "") ? item.dashBoardPreferencesValue.formula : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var body = "";
	var tablerow = "";
	var tableheader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];





	if (item.dashBoardPreferencesValue.child == true) {
		tableheader += `
		<th class="pjchilld"
	   style="width: 150px;">
	   <strong
	  editable="true"
	  contenteditable="true"
	  onkeypress="return (this.innerText.length <= 36)"
		>Child</strong
	  ></th>`
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.red == true) {
		tableheader += ` <th class="pjred"
		style="width:50px;">
		<strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color:  #df0404;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong>
		</th>`
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.amber == true) {
		tableheader += ` <th class="pjamber"
		style="width: 50px;">
		<strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: yellow;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.green == true) {
		tableheader += `<th class="pjgren"
	style="width: 50px;">
	<strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: green;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`
		checkfielditems.push(true);

	}
	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	}

	var tableheight = "100";
	if (pagelayoutcol == 4) {
		tableheight = "85";
	}
	var frequencyTable = "";
	var tableid = 1;
	var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") ? item.dashBoardPreferencesValue.measurement : "Monthly");
	if (layoutType == "projectstatuscount") {
		if (formula != "" && formula != undefined && measurement != "") {
			var textObj = { "fieldName": fieldName, "formula": formula, "period": datarangechart, "type": "kpidrillTable", "groupBy": "Measure" };
		} else {
			fieldvalue = "";
		}

		var optionalign = "30px";
		if (pagelayoutcol == 4) {
			optionalign = "20px";
		}

		var tableHeader = "";


		var daterangeformatted = ""
		var inlineEditContent = `<strong>` + displayname + `</strong>`;
		var fontsizesmaller = "";
		daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + item.id + `" value="` + datarangechart + `" style="width: 100%;
				  margin-top: -4px;
				  text-align: left;
				  font-size: 10px !important;
				  font-weight: 500;
				  border: none !important;"
			  />`;
		if (editpermission == false) {
			var datestring = datarangechart;
			fontsizesmaller = "font-size:smaller;";
		} else {
			inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + item.id + `"
				  editable="true"
				  contenteditable="true"
				  onkeypress="return (this.innerText.length <= 36)"
					>`+ displayname + `</strong>`;
		}

		var chartsOptions = "";
		if (viewpermission == false && deletepermission == false && editpermission == false) {
			chartsOptions = "";
		} else {
			chartsOptions = ` <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;

			if (editpermission == true) {
				chartsOptions += ` <li>
                            <a class="dropdown-item" href="#projectstatuscount_setting" data-bs-toggle="modal"
                                onclick="handleTableevent(`+ item.id + `,'edit','` + layoutType + `')">Settings</a>
                        </li>`;
			}

			if (viewpermission == true) {
				chartsOptions += `<li>
                            <a class="dropdown-item" href="#projectstatuscount_view" data-bs-toggle="modal"
                                onclick="handleTableevent(`+ item.id + `,'view','` + layoutType + `')">View</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="handleTableevent(`+ item.id + `,'download','` + layoutType + `')">Download PDF</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" onclick="handleTableevent(`+ item.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
                        </li>`;
			}

			if (deletepermission == true) {
				chartsOptions += ` <li>
                            <a class="dropdown-item" href="#" onclick="handleTableevent(`+ item.id + `,'delete','` + layoutType + `')">Delete</a>
                        </li>`;
			}

			chartsOptions += `</ul>`;
		}

		body = `<div class="g-col-12" id="dashboard_showlist_` + item.id + `">
    <div class="card custom-card table-card h-100">
        <div class="card-header">
            <div class="c-header-left">
                <h5 class="card-title">
                    <strong editable="true" contenteditable="true"
                        onkeypress="return (this.innerText.length <= 36)">Project Status Count </strong>
                </h5>
                <div class="date-picker ">
                   `+ daterangeformatted + `
                </div>
            </div>
            <div class="card-actions">

                <div class="dropdown">
                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16"  src="/stratroom/images/menu-dot-vertical-i.svg">
                    </button>
                   `+ chartsOptions + `
                </div>


            </div>
        </div>

        <div class="table-responsive card-body table-container projectstatuscount_`+ item.id + `" style="height: 326px;">
            <table class="table table-bordered w-100 table-centered" id="projectstatuscount_`+ item.id + `">

            </table>
        </div>
    </div>
</div>`;

	}
	$(appenddasboardBody).append(body);
	//$("#drilldownTable_"+item.id).paging({ limit: 1 });


	if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
		var modulooperation = chartposition % 2;
		var calposition = 'right';
		if (modulooperation == 1) {
			calposition = 'left';
		}
	} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
		var modulooperation = chartposition % 3;
		var calposition = 'right';
		if (modulooperation == 0) {
			calposition = 'right';
		} else if (modulooperation == 1) {
			calposition = 'left';
		} else if (modulooperation == 2) {
			calposition = 'left';
		}
	}

	if (editpermission == true || createpermission == true || cockpitcontentload == true) {
		initDateRangePicker("#datePickerdashboard" + item.id, item.id, calposition, false);
	}
}

function showKpiSubTable(kpiList, color, itemid) {
	let subTableHtml = ' ';

	kpiList.forEach(kpi => {
		subTableHtml += `<tr class="kpi-detail-link" data-kpiid="${kpi.kpi_id}" style="cursor: pointer;">
                             <td>${kpi.kpi_unique}</td>
                             <td>${kpi.kpiName}</td>
                         </tr>`;
	});


	// Display the subtable in a designated area, for example, a modal or beneath the count table
	$('#subTableKpiStatus_'+itemid).html(subTableHtml);
}

function showInitiativeSubTable(initativeList, color) {
	let subTableHtml = ' ';

	initativeList.forEach(initiative => {
		subTableHtml += `<tr class="initiative-detail-link" data-id="${initiative.initiative_id}" data-pageid="${initiative.pageId}"  data-owner="${initiative.owner}"  style="cursor: pointer;">
                             <td>${initiative.initiative_unique}</td>
                             <td>${initiative.initiativeName}</td>
                         </tr>`;
	});


	// Display the subtable in a designated area, for example, a modal or beneath the count table
	$('#subTableInitiativeStatus').html(subTableHtml);
}

$(document).on('click', '[class^="kpi-count-link"]', function(e) {
	e.preventDefault();
	const kpiData = $(this).attr('data-kpis'); // Get the JSON string from data attribute

	const kpiList = JSON.parse(kpiData); // Parse JSON string to an array
	const color = $(this).data('color');
    const itemClass = $(this).attr('class').split(' ').find(c => c.startsWith('kpi-count-link_')); // Find the class that starts with 'kpi-count-link-'
    const itemId = itemClass.split('_').pop(); // Extract the item ID
    console.log("KPI Data:", kpiData); // Log the KPI data
    console.log("Item ID:", itemId); // Log the item ID

	console.log(kpiList)
	showKpiSubTable(kpiList, color,itemId);

	$('#mainTablekpiStatusCount_'+itemId).hide(); // Hide the main table
	$('#subTableContainer_'+itemId).show(); // Show the subtable


	// Assuming you have a function to create and show the subtable
});



$(document).on('click', '.initiative-count-link', function (e) {
	e.preventDefault();
	const initiativeData = $(this).attr('data-initiative'); // Get the JSON string from data attribute
	console.log(initiativeData)

	const initiativeList = JSON.parse(initiativeData); // Parse JSON string to an array
	const color = $(this).data('color');

	console.log(initiativeList)
	showInitiativeSubTable(initiativeList, color);

	$('#mainprojectstatuscount').hide(); // Hide the main table
	$('#subinitiativeTableContainer').show(); // Show the subtable


	// Assuming you have a function to create and show the subtable
});



$(document).on('click', '.kpi-detail-link', function () {
	const kpiId = $(this).data('kpiid');

	// Navigate to the KPI detail page
	window.location.href = `/stratroom/kpiView?kpiId=${kpiId}`; // Adjust the URL as needed
});



$(document).on('click', '.initiative-detail-link', function () {
	const initiativeId = $(this).data('id');
	const pageId = $(this).data('pageid');
	const owner = $(this).data('owner');

	// Navigate to the KPI detail page
	window.location.href = `/stratroom/dashboard/${owner}?pageId=${pageId}&initiativeId=${initiativeId}`; // Adjust the URL as needed
});

function showMainTable(itemId) {
	console.log(itemId)
	$('#subTableContainer_'+itemId).hide(); // Hide the subtable
	$('#mainTablekpiStatusCount_'+itemId).show(); // Show the main table
}

function showMainInitiativeTable() {
	$('#subinitiativeTableContainer').hide(); // Hide the subtable
	$('#mainprojectstatuscount').show(); // Show the main table
	$('#mainprojectstatuscount').css("display", "block");

}


$(document).on('click', '[class^="backButton"]', function(e) {
		e.preventDefault();
	
	// Show the main table and hide the subtable
	const itemClass = $(this).attr('class').split(' ').find(c => c.startsWith('backButton_'));
	const itemId = itemClass.split('_').pop();

	showMainTable(itemId);
});

$(document).on('click', '#backInitiativeButton', function () {
	// Show the main table and hide the subtable
	showMainInitiativeTable();
});




function widgetblankkpireportsLoad(item, chartposition) {
	var layoutType = item.dashBoardPreferencesValue.type;
	var displayname = (item.dashBoardPreferencesValue.chartdisplayname != undefined ? item.dashBoardPreferencesValue.chartdisplayname : "KPI Drill Down Table");
	var formula = ((item.dashBoardPreferencesValue.formula != undefined && item.dashBoardPreferencesValue.formula != "") ? item.dashBoardPreferencesValue.formula : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var body = "";
	var tablerow = "";
	var tableheader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];
	tableHeader = `<thead>
				  <tr>`;
	if (item.dashBoardPreferencesValue.parent == true) {
		tableheader += `               
		<th  class="stsparent"
	  style="width: 150px; ">
	  <strong
	  editable="true"
	  contenteditable="true"
	  onkeypress="return (this.innerText.length <= 36)"
		>Parent </strong
	  > 
		 
		</th>`;
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.child == true) {
		tableheader += `<th class="stschild"
		style="width: 150px;">
		<strong
	   editable="true"
	   contenteditable="true"
	   onkeypress="return (this.innerText.length <= 36)"
		 >Child</strong
	   ></th>`;
		checkfielditems.push(true);
	}

	tableheader += `<th class="blkcount"
		style="width: 150px;">
		<strong
	   editable="true"
	   contenteditable="true"
	   onkeypress="return (this.innerText.length <= 36)"
		 >Count</strong
	   ></th>`;

	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	} else {
		quternamespan = checkfielditems.length;
	}

	var tableheight = "100";
	if (pagelayoutcol == 4) {
		tableheight = "85";
	}
	var frequencyTable = "";
	var tableid = 1;
	var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") ? item.dashBoardPreferencesValue.measurement : "Monthly");
	if (layoutType == "blankkpireports") {
		if (formula != "" && formula != undefined && measurement != "") {
			var textObj = { "fieldName": fieldName, "formula": formula, "period": datarangechart, "type": "kpidrillTable", "groupBy": "Measure" };
		} else {
			fieldvalue = "";
		}

		var optionalign = "30px";
		if (pagelayoutcol == 4) {
			optionalign = "20px";
		}


		var daterangeformatted = ""
		var inlineEditContent = `<strong>` + displayname + `</strong>`;
		var fontsizesmaller = "";
		daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + item.id + `" value="` + datarangechart + `" style="width: 100%;
				  margin-top: -4px;
				  text-align: left;
				  font-size: 10px !important;
				  font-weight: 500;
				  border: none !important;"
			  />`;
		if (editpermission == false) {
			var datestring = datarangechart;
			fontsizesmaller = "font-size:smaller;";
		} else {
			inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + item.id + `"
				  editable="true"
				  contenteditable="true"
				  onkeypress="return (this.innerText.length <= 36)"
					>`+ displayname + `</strong>`;
		}

		var chartsOptions = "";
		if (viewpermission == false && deletepermission == false && editpermission == false) {
			chartsOptions = "";
		} else {
			chartsOptions = `<ul class="header-dropdown m-r--2">
				<li class="dropdown m-t--10">
				  <a
					href="#"
					onclick="return false;"
					class="dropdown-toggle"
					data-toggle="dropdown"
					role="button"
					aria-haspopup="true"
					aria-expanded="true"
				  >
					<i class="fas fa-ellipsis-h"></i>
				  </a>
				  <ul
					class="dropdown-menu editoptionparentdropdown-menu pull-right"
					x-placement="bottom-start"
					style="
					  position: absolute;
					  will-change: transform;
					  top: 0px;
					  left: 0px;
					  transform: translate3d(0px, 24px, 0px);">`;

			if (editpermission == true) {
				chartsOptions += `<li class="editevent">
					  <a href="#" data-toggle="modal" data-target="#blankkpireports_setting" data-typevalue="kpidrill"
						onclick="handleTableevent(`+ item.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
						>Settings</a>
					</li>`;
			}

			if (viewpermission == true) {
				chartsOptions += `<li class="viewevent">
					  <a href="#" 
						data-toggle="modal"
						data-target="#blankkpireports_view" onclick="handleTableevent(`+ item.id + `,'view','` + layoutType + `')">View</a>
					</li>
					<li class="downloadevent">
					  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'download','` + layoutType + `')">Download PDF</a>
					</li><li class="downloadevent">
								  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
								</li>`;
			}

			if (deletepermission == true) {
				chartsOptions += `<li class="deleteevent">
					  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'delete','` + layoutType + `')">Delete</a>
					</li>`;
			}

			chartsOptions += `</ul></li></ul>`;
		}

		body = `
		<div class="col-md-`+ pagelayoutcol + ` select-toggle myinitiative sub_initiatives dashboard_showlist" id="dashboard_showlist_` + item.id + `">
		<div class="card" style="padding: 4px ; height: 398px;">
		  <div class="header row" style="margin: 0;">
			<div class="col-4" style="margin-left : -15px;`+ fontsizesmaller + `">
			  `+ daterangeformatted + `
			  </div>
			  <div class="col-7" style="margin-left : -15px;">
				<h5 class="prob">
				  `+ inlineEditContent + `
				</h5>
			  </div>
			<div class="col-1 optionalign" style="margin-left : `+ optionalign + `;">
			  `+ chartsOptions + `
			</div>
		  </div>
		  <div class="d-flex flex-column employee_div_body_box activities-box">
			<div class="table-responsive card-body blankkpireports_`+ item.id + `" style="height: 326px;">
			  <table
				class="table table-bordered w-100 table-centered"
				id="blankkpireports_`+ item.id + `"
				style="margin-bottom: 0px !important;"
			  ><thead>
			  <tr>`
			+ tableHeader +
			`</tr>
			</thead>
			  <tbody>
			 			</tbody>
			  </table>
			</div>
		  </div>
		</div>
	  </div>`;

	}
	$(appenddasboardBody).append(body);
	//$("#drilldownTable_"+item.id).paging({ limit: 1 });


	if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
		var modulooperation = chartposition % 2;
		var calposition = 'right';
		if (modulooperation == 1) {
			calposition = 'left';
		}
	} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
		var modulooperation = chartposition % 3;
		var calposition = 'right';
		if (modulooperation == 0) {
			calposition = 'right';
		} else if (modulooperation == 1) {
			calposition = 'left';
		} else if (modulooperation == 2) {
			calposition = 'left';
		}
	}

	if (editpermission == true || createpermission == true || cockpitcontentload == true) {
		initDateRangePicker("#datePickerdashboard" + item.id, item.id, calposition, false);
	}
}


function widgetinitiativeCountLoad(item, chartposition) {
	var layoutType = item.dashBoardPreferencesValue.type;
	var displayname = (item.dashBoardPreferencesValue.chartdisplayname != undefined ? item.dashBoardPreferencesValue.chartdisplayname : "KPI Drill Down Table");
	var formula = ((item.dashBoardPreferencesValue.formula != undefined && item.dashBoardPreferencesValue.formula != "") ? item.dashBoardPreferencesValue.formula : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var body = "";
	var tablerow = "";
	var tableheader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];




	if (item.dashBoardPreferencesValue.child == true) {
		tableheader += `<th class="ibchild"
		style="width: 150px;">
		<strong
	   editable="true"
	   contenteditable="true"
	   onkeypress="return (this.innerText.length <= 36)"
		 >Child</strong
	   ></th>`
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.inProgress == true) {
		tableheader += ` <th class="ip"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Inprogress</strong
		</th>`
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.completed == true) {
		tableheader += ` <th class="cmpl"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Completed</strong
		</th>`
		checkfielditems.push(true);
	}
	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	}

	var tableheight = "100";
	if (pagelayoutcol == 4) {
		tableheight = "85";
	}
	var frequencyTable = "";
	var tableid = 1;
	var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") ? item.dashBoardPreferencesValue.measurement : "Monthly");
	if (layoutType == "initiativeCount") {


		var optionalign = "30px";
		if (pagelayoutcol == 4) {
			optionalign = "20px";
		}

		var tableHeader = "";

		var daterangeformatted = ""
		var inlineEditContent = `<strong>` + displayname + `</strong>`;
		var fontsizesmaller = "";
		daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + item.id + `" value="` + datarangechart + `" style="width: 100%;
				  margin-top: -4px;
				  text-align: left;
				  font-size: 10px !important;
				  font-weight: 500;
				  border: none !important;"
			  />`;
		if (editpermission == false) {
			var datestring = datarangechart;
			fontsizesmaller = "font-size:smaller;";
		} else {
			inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + item.id + `"
				  editable="true"
				  contenteditable="true"
				  onkeypress="return (this.innerText.length <= 36)"
					>`+ displayname + `</strong>`;
		}

		var chartsOptions = "";
		if (viewpermission == false && deletepermission == false && editpermission == false) {
			chartsOptions = "";
		} else {
			chartsOptions = `<ul class="header-dropdown m-r--2">
				<li class="dropdown m-t--10">
				  <a
					href="#"
					onclick="return false;"
					class="dropdown-toggle"
					data-toggle="dropdown"
					role="button"
					aria-haspopup="true"
					aria-expanded="true"
				  >
					<i class="fas fa-ellipsis-h"></i>
				  </a>
				  <ul
					class="dropdown-menu editoptionparentdropdown-menu pull-right"
					x-placement="bottom-start"
					style="
					  position: absolute;
					  will-change: transform;
					  top: 0px;
					  left: 0px;
					  transform: translate3d(0px, 24px, 0px);">`;

			if (editpermission == true) {
				chartsOptions += `<li class="editevent">
					  <a href="#" data-toggle="modal" data-target="#initiativeCount_setting" data-typevalue="kpidrill"
						onclick="handleTableevent(`+ item.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
						>Settings</a>
					</li>`;
			}

			if (viewpermission == true) {
				chartsOptions += `<li class="viewevent">
					  <a href="#" 
						data-toggle="modal"
						data-target="#initiativeCount_view" onclick="handleTableevent(`+ item.id + `,'view','` + layoutType + `')">View</a>
					</li>
					<li class="downloadevent">
					  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'download','` + layoutType + `')">Download PDF</a>
					</li><li class="downloadevent">
								  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
								</li>`;
			}

			if (deletepermission == true) {
				chartsOptions += `<li class="deleteevent">
					  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'delete','` + layoutType + `')">Delete</a>
					</li>`;
			}

			chartsOptions += `</ul></li></ul>`;
		}

		body = `
		<div class="col-md-`+ pagelayoutcol + ` select-toggle myinitiative sub_initiatives dashboard_showlist" id="dashboard_showlist_` + item.id + `">
		<div class="card" style="padding: 4px ; height: 398px;">
		  <div class="header row" style="margin: 0;">
			<div class="col-4" style="margin-left : -15px;`+ fontsizesmaller + `">
			  `+ daterangeformatted + `
			  </div>
			  <div class="col-7" style="margin-left : -15px;">
				<h5 class="prob">
				  `+ inlineEditContent + `
				</h5>
			  </div>
			<div class="col-1 optionalign" style="margin-left : `+ optionalign + `;">
			  `+ chartsOptions + `
			</div>
		  </div>
		  <div class="d-flex flex-column employee_div_body_box activities-box">
			<div class="table-responsive card-body initiativeCount_`+ item.id + `" style="height: 326px;">
			  <table
				class="table table-bordered w-100 table-centered"
				id="initiativeCount_`+ item.id + `"
				style="margin-bottom: 0px !important;"
			  ><thead><tr>` + tableheader + `</tr></thead>
			  <tbody>
			 
			</tbody>
			  </table>
			</div>
		  </div>
		</div>
	  </div>`;

	}
	$(appenddasboardBody).append(body);
	//$("#drilldownTable_"+item.id).paging({ limit: 1 });


	if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
		var modulooperation = chartposition % 2;
		var calposition = 'right';
		if (modulooperation == 1) {
			calposition = 'left';
		}
	} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
		var modulooperation = chartposition % 3;
		var calposition = 'right';
		if (modulooperation == 0) {
			calposition = 'right';
		} else if (modulooperation == 1) {
			calposition = 'left';
		} else if (modulooperation == 2) {
			calposition = 'left';
		}
	}

	if (editpermission == true || createpermission == true || cockpitcontentload == true) {
		initDateRangePicker("#datePickerdashboard" + item.id, item.id, calposition, false);
	}
}




function widgetinitiativeblankCountLoad(item, chartposition) {
	var layoutType = item.dashBoardPreferencesValue.type;
	var displayname = (item.dashBoardPreferencesValue.chartdisplayname != undefined ? item.dashBoardPreferencesValue.chartdisplayname : "Initiative Blank Report Table");
	var formula = ((item.dashBoardPreferencesValue.formula != undefined && item.dashBoardPreferencesValue.formula != "") ? item.dashBoardPreferencesValue.formula : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var body = "";
	var tablerow = "";
	var tableheader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];




	if (item.dashBoardPreferencesValue.child == true) {
		tableheader += `<th class="ibchild"
		style="width: 150px;">
		<strong
	   editable="true"
	   contenteditable="true"
	   onkeypress="return (this.innerText.length <= 36)"
		 >Child</strong
	   ></th>`
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.blankinitiativecount == true) {
		tableheader += ` <th class="ip"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Blank</strong
		</th>`
		checkfielditems.push(true);
	}

	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	}

	var tableheight = "100";
	if (pagelayoutcol == 4) {
		tableheight = "85";
	}
	var frequencyTable = "";
	var tableid = 1;
	var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") ? item.dashBoardPreferencesValue.measurement : "Monthly");
	if (layoutType == "blankinitiativeCount") {


		var optionalign = "30px";
		if (pagelayoutcol == 4) {
			optionalign = "20px";
		}

		var tableHeader = "";

		var daterangeformatted = ""
		var inlineEditContent = `<strong>` + displayname + `</strong>`;
		var fontsizesmaller = "";
		daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard` + item.id + `" value="` + datarangechart + `" style="width: 100%;
				  margin-top: -4px;
				  text-align: left;
				  font-size: 10px !important;
				  font-weight: 500;
				  border: none !important;"
			  />`;
		if (editpermission == false) {
			var datestring = datarangechart;
			fontsizesmaller = "font-size:smaller;";
		} else {
			inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="` + displayname + `" data-type="text" data-id="` + item.id + `"
				  editable="true"
				  contenteditable="true"
				  onkeypress="return (this.innerText.length <= 36)"
					>`+ displayname + `</strong>`;
		}

		var chartsOptions = "";
		if (viewpermission == false && deletepermission == false && editpermission == false) {
			chartsOptions = "";
		} else {
			chartsOptions = `<ul class="header-dropdown m-r--2">
				<li class="dropdown m-t--10">
				  <a
					href="#"
					onclick="return false;"
					class="dropdown-toggle"
					data-toggle="dropdown"
					role="button"
					aria-haspopup="true"
					aria-expanded="true"
				  >
					<i class="fas fa-ellipsis-h"></i>
				  </a>
				  <ul
					class="dropdown-menu editoptionparentdropdown-menu pull-right"
					x-placement="bottom-start"
					style="
					  position: absolute;
					  will-change: transform;
					  top: 0px;
					  left: 0px;
					  transform: translate3d(0px, 24px, 0px);">`;

			if (editpermission == true) {
				chartsOptions += `<li class="editevent">
					  <a href="#" data-toggle="modal" data-target="#initiativeblankCount_setting" data-typevalue="kpidrill"
						onclick="handleTableevent(`+ item.id + `,'edit','` + layoutType + `')" data-i18n="Settings"
						>Settings</a>
					</li>`;
			}

			if (viewpermission == true) {
				chartsOptions += `<li class="viewevent">
					  <a href="#" 
						data-toggle="modal"
						data-target="#initiativeblankCount_view" onclick="handleTableevent(`+ item.id + `,'view','` + layoutType + `')">View</a>
					</li>
					<li class="downloadevent">
					  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'download','` + layoutType + `')">Download PDF</a>
					</li><li class="downloadevent">
								  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'csvdownload','` + layoutType + `')">Download CSV</a>
								</li>`;
			}

			if (deletepermission == true) {
				chartsOptions += `<li class="deleteevent">
					  <a class="pointer" onclick="handleTableevent(`+ item.id + `,'delete','` + layoutType + `')">Delete</a>
					</li>`;
			}

			chartsOptions += `</ul></li></ul>`;
		}

		body = `
		<div class="col-md-`+ pagelayoutcol + ` select-toggle myinitiative sub_initiatives dashboard_showlist" id="dashboard_showlist_` + item.id + `">
		<div class="card" style="padding: 4px ; height: 398px;">
		  <div class="header row" style="margin: 0;">
			<div class="col-4" style="margin-left : -15px;`+ fontsizesmaller + `">
			  `+ daterangeformatted + `
			  </div>
			  <div class="col-7" style="margin-left : -15px;">
				<h5 class="prob">
				  `+ inlineEditContent + `
				</h5>
			  </div>
			<div class="col-1 optionalign" style="margin-left : `+ optionalign + `;">
			  `+ chartsOptions + `
			</div>
		  </div>
		  <div class="d-flex flex-column employee_div_body_box activities-box">
			<div class="table-responsive card-body initiativeblankCount_`+ item.id + `" style="height: 326px;">
			  <table
				class="table table-bordered w-100 table-centered"
				id="initiativeCount_`+ item.id + `"
				style="margin-bottom: 0px !important;"
			  ><thead><tr>` + tableheader + `</tr></thead>
			  <tbody>
			 
			</tbody>
			  </table>
			</div>
		  </div>
		</div>
	  </div>`;

	}
	$(appenddasboardBody).append(body);
	//$("#drilldownTable_"+item.id).paging({ limit: 1 });


	if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "two") {
		var modulooperation = chartposition % 2;
		var calposition = 'right';
		if (modulooperation == 1) {
			calposition = 'left';
		}
	} else if ((pagelayout != "" || pagelayout != undefined || pagelayout != null) && pagelayout == "three") {
		var modulooperation = chartposition % 3;
		var calposition = 'right';
		if (modulooperation == 0) {
			calposition = 'right';
		} else if (modulooperation == 1) {
			calposition = 'left';
		} else if (modulooperation == 2) {
			calposition = 'left';
		}
	}

	if (editpermission == true || createpermission == true || cockpitcontentload == true) {
		initDateRangePicker("#datePickerdashboard" + item.id, item.id, calposition, false);
	}
}


/**
 * Utility: Check if value is negative
 */
function checkPositiveorNegative(value) {
    if (value === "" || value === undefined || value === null || value === "-") return 0;
    var num = parseFloat(value.toString().replace(/[^0-9.-]/g, ''));
    return num < 0 ? 1 : 0;
}

/**
 * Generate Table Header with Colored Period Sections
 */
function generateKpiDrillTableHeader(item, periods) {
    var statusHeader = item.dashBoardPreferencesValue.status == true 
        ? '<th rowspan="2" style="width: 60px; vertical-align:middle!important; text-align:center; background-color: #f4a460; color: #000; font-weight:bold; border: 1px solid #ddd;">STATUS</th>' 
        : '';
    
    // Calculate columns per period
    var columnsPerPeriod = 0;
    if (item.dashBoardPreferencesValue.actual == true) columnsPerPeriod++;
    if (item.dashBoardPreferencesValue.target == true) columnsPerPeriod++;
    if (item.dashBoardPreferencesValue.gap == true) columnsPerPeriod++;
    if (item.dashBoardPreferencesValue.score == true) columnsPerPeriod++;
    if (item.dashBoardPreferencesValue.ytd == true) columnsPerPeriod++;

    // Build period headers with colors
    var periodHeaders = "";
    var colors = ["#d8bfd8", "#dda0dd", "#da70d6", "#ba55d3", "#9370db", "#8a2be2"]; // Purple shades
    
    periods.forEach(function(period, index) {
        var color = colors[index % colors.length];
        periodHeaders += `<th colspan="${columnsPerPeriod}" style="text-align:center; font-weight:bold; background-color: ${color}; color: #000; border: 1px solid #ddd; padding: 8px;">${period}</th>`;
    });

    // Build column sub-headers
    var columnHeaders = "";
    periods.forEach(function(period, index) {
        var color = colors[index % colors.length];
        if (item.dashBoardPreferencesValue.actual == true) {
            columnHeaders += `<th style="background-color: ${color}; color: #000; border: 1px solid #ddd; padding: 5px; font-size: 12px;">ACTUAL</th>`;
        }
        if (item.dashBoardPreferencesValue.target == true) {
            columnHeaders += `<th style="background-color: ${color}; color: #000; border: 1px solid #ddd; padding: 5px; font-size: 12px;">TARGET</th>`;
        }
        if (item.dashBoardPreferencesValue.gap == true) {
            columnHeaders += `<th style="background-color: ${color}; color: #000; border: 1px solid #ddd; padding: 5px; font-size: 12px;">GAP</th>`;
        }
        if (item.dashBoardPreferencesValue.score == true) {
            columnHeaders += `<th style="background-color: ${color}; color: #000; border: 1px solid #ddd; padding: 5px; font-size: 12px;">INDEX</th>`;
        }
        if (item.dashBoardPreferencesValue.ytd == true) {
            columnHeaders += `<th style="background-color: ${color}; color: #000; border: 1px solid #ddd; padding: 5px; font-size: 12px;">YTD</th>`;
        }
    });

    return `
        <thead>
            <tr style="background-color: #f4a460;">
                <th rowspan="2" style="width: 40px; vertical-align:middle!important; text-align:center; background-color: #f4a460; color: #000; border: 1px solid #ddd;">
                    <i class="fas fa-arrows-alt-v"></i>
                </th>
                ${statusHeader}
                <th rowspan="2" style="vertical-align:middle!important; text-align:center; background-color: #f4a460; color: #000; font-weight:bold; border: 1px solid #ddd; padding: 8px;">NAME/PERIOD</th>
                ${periodHeaders}
            </tr>
            <tr style="background-color: #f4a460;">
                ${columnHeaders}
            </tr>
        </thead>
    `;
}

/**
 * Generate Child Rows for Dynamic Expansion
 */
/**
 * Generate Child Rows for Dynamic Expansion
 * Handles childFlag logic: Shows '+' only if childFlag is true.
 */
/**
 * Generate Child Rows for Dynamic Expansion
 * Updated: removed nodekey parameter, uses deptName instead for data-parent-key
 */
$(document).on('click', ".kpidrilldownreportevent", function (e) {
    e.stopPropagation();

    var $clickedRow = $(this).closest('tr');
    var $icon = $(this).find('.toggle-icon');

    var id = $(this).attr("data-id");
    var measureType = $(this).attr("data-measuretype");
    var deptname = $(this).attr("data-deptname");
    var kpi = $(this).attr("data-kpi");

    if (!id) return false;

    /* -------------------- COLLAPSE -------------------- */

    if ($icon.hasClass('fa-minus')) {

        $icon.removeClass('fa-minus').addClass('fa-plus');

        var $next = $clickedRow.next();

        while ($next.length && $next.hasClass('dynamic-child-row')) {
            var $removeRow = $next;
            $next = $next.next();
            $removeRow.remove();
        }

        return;
    }

    /* -------------------- EXPAND -------------------- */

    $icon.removeClass('fa-plus').addClass('fa-minus');

    $.ajax({
        url: "/stratroom/dashBoardPreferences/" + id,
        success: function (data) {

            /* -------- Get Periods from Header -------- */

            var periods = [];

            $("#kpidrilldownTable_" + id + " thead tr:eq(0) th").each(function () {

                var colspan = $(this).attr("colspan");

                if (colspan && colspan > 1 && $(this).text().trim() !== "") {
                    periods.push($(this).text().trim());
                }

            });

            kpiDrillTableLoadclickthru(data, measureType, deptname, kpi, $clickedRow, $icon, periods);
        },
        error: readErrorMsg
    });

});


/* =====================================================
   CHILD ROW GENERATOR
===================================================== */

function generateChildRows(item, data, measuretype, deptName, kpi, periods) {

    var rows = "";

    var colors = ["#f9f9f9", "#f0f0f0", "#e8e8e8", "#f5f5f5"];

    $.each(data, function (key, value) {

        $.each(value, function (index, objval) {

            var rowColor = colors[key % colors.length];

            /* -------- First iteration object -------- */

            var firstiteration;

            for (var pv in objval) {

                if (["childFlag", "dataType", "contribution"].indexOf(pv) === -1) {
                    firstiteration = objval[pv];
                    break;
                }

            }

            /* -------- Fallback KPI -------- */

            var childKpi = (firstiteration && firstiteration.kpi) ? firstiteration.kpi : kpi;

            /* -------- Row Start -------- */

            var row = `<tr class="dynamic-child-row"
                        data-parent-key="${deptName}-${index}"
                        style="background:${rowColor};">`;


            /* -------- Expand Icon -------- */

            if (objval.childFlag === true && firstiteration) {

                row += `
                <td class="text-center scrolldrill1 pointer kpidrilldownreportevent"
                    style="border:1px solid #ddd;cursor:pointer;vertical-align:middle;"
                    data-deptname="${index}"
                    data-measuretype="1"
                    data-measurekey="${firstiteration.nodeKey || ''}"
                    data-kpi="${childKpi}"
                    data-id="${item.id}">

                    <i class="fas fa-plus toggle-icon"
                       style="cursor:pointer;color:#337ab7;"></i>

                </td>`;

            } else {

                row += `<td class="text-center scrolldrill1"
                        style="border:1px solid #ddd;"></td>`;
            }


            /* -------- KPI Status Flag -------- */

            if (item.dashBoardPreferencesValue.status == true) {

                var fcolor = (firstiteration && firstiteration.kpistatus)
                    ? firstiteration.kpistatus.toString().toLowerCase()
                    : "red";

                var flagColor =
                    fcolor === "red" ? "#d9534f"
                        : fcolor === "green" ? "#5cb85c"
                            : "#f0ad4e";

                row += `
                <td class="kpistatus"
                    style="text-align:center;border:1px solid #ddd;vertical-align:middle;">

                    <i class="fas fa-flag" style="color:${flagColor}"></i>

                </td>`;
            }


            /* -------- Name Column -------- */

            var name = index.split('-')[0];

            row += `
            <td class="scrolldrill1"
                style="color:#337ab7 !important;
                       padding-left:20px;
                       border:1px solid #ddd;
                       font-weight:500;
                       vertical-align:middle;">

                ${name}

            </td>`;


            /* -------- Period Data -------- */

            periods.forEach(function (period) {

                var quarterobj = objval[period];

                if (quarterobj && quarterobj.target !== "" && quarterobj.target !== undefined && quarterobj.target !== "-") {

                    if (item.dashBoardPreferencesValue.actual) {

                        var val = quarterobj.actual || "-";
                        var cur = quarterobj.currency || "";
                        var hl = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";

                        row += `<td class="${hl}" style="border:1px solid #ddd;padding:5px;text-align:right;">${cur}${val}</td>`;
                    }

                    if (item.dashBoardPreferencesValue.target) {

                        var val = quarterobj.target || "-";
                        var cur = quarterobj.currency || "";
                        var hl = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";

                        row += `<td class="${hl}" style="border:1px solid #ddd;padding:5px;text-align:right;">${cur}${val}</td>`;
                    }

                    if (item.dashBoardPreferencesValue.gap) {

                        var val = quarterobj.gap || "-";
                        var cur = quarterobj.currency || "";
                        var hl = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";

                        row += `<td class="${hl}" style="border:1px solid #ddd;padding:5px;text-align:right;">${cur}${val}</td>`;
                    }

                    if (item.dashBoardPreferencesValue.score) {

                        var val = quarterobj.score || "-";
                        var hl = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";

                        row += `<td class="${hl}" style="border:1px solid #ddd;padding:5px;text-align:right;">${val}</td>`;
                    }

                    if (item.dashBoardPreferencesValue.ytd) {

                        var val = quarterobj.ytd || "-";
                        var cur = quarterobj.currency || "";
                        var hl = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";

                        row += `<td class="${hl}" style="border:1px solid #ddd;padding:5px;text-align:right;">${cur}${val}</td>`;
                    }

                } else {

                    var emptyCell = `<td style="border:1px solid #ddd;padding:5px;text-align:right;color:#ccc;">-</td>`;

                    if (item.dashBoardPreferencesValue.actual) row += emptyCell;
                    if (item.dashBoardPreferencesValue.target) row += emptyCell;
                    if (item.dashBoardPreferencesValue.gap) row += emptyCell;
                    if (item.dashBoardPreferencesValue.score) row += emptyCell;
                    if (item.dashBoardPreferencesValue.ytd) row += emptyCell;

                }

            });


            row += `</tr>`;

            rows += row;

        });

    });

    return rows;
}
// ============================================================================
// HELPER: Format date range safely (reusable across functions)
// ============================================================================
function formatDateRange(input) {
    if (!input || typeof input !== 'string' || input.trim() === '') return "Not specified";
    return input.trim();
}

// ============================================================================
// HELPER: Generate PDF with jsPDF + autoTable (reusable pattern)
// ============================================================================
function generateDrillDownPDF(item, downloadpdftitle, datarangechart, containerId) {
    return new Promise((resolve, reject) => {
        try {
            const { jsPDF } = window.jspdf;
const pdf = new jsPDF("l", "mm", "a3");
const pageWidth = pdf.internal.pageSize.width;
const pageHeight = pdf.internal.pageSize.height;
const marginRight = pageWidth - 10;
const submissionDate = new Date().toLocaleDateString();
const logoUrl = document.getElementById("appLogo")?.src || "/stratroom/images/logo.png";
const reportOwnerName = item.dashBoardPreferencesValue.ownerName || "Unknown";

// Get Primary Color from LocalStorage
const primaryColor = localStorage.getItem("stratroomPrimaryColor") || "#000000";

// Helper to convert Hex to RGB array for fill colors (autoTable & setFillColor)
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0]; // Fallback to black
}

const primaryColorRgb = hexToRgb(primaryColor);

function addHeader() {
    try { pdf.addImage(logoUrl, "PNG", 10, 5, 40, 10); } catch (e) {}
    
    // Set Header Text Color
    pdf.setTextColor(primaryColor); 
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text(downloadpdftitle, marginRight, 10, { align: "right" });
    
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Owner: ${reportOwnerName}`, marginRight, 16, { align: "right" });
    pdf.text(`Generated: ${submissionDate}`, marginRight, 21, { align: "right" });
    
    // Set Header Line Color
    pdf.setDrawColor(primaryColor);
    pdf.line(10, 25, pageWidth - 10, 25);
    
    // Reset text color to default black for body content (optional, autoTable usually handles this)
    pdf.setTextColor(0, 0, 0); 
    return 30;
}

function addFooter(page, total) {
    // Set Footer Background Color
    pdf.setFillColor(...primaryColorRgb);
    pdf.rect(0, pageHeight - 12, pageWidth, 12, "F");
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text(downloadpdftitle, 10, pageHeight - 5);
    pdf.text(`Page ${page} of ${total}`, pageWidth - 10, pageHeight - 5, { align: "right" });
}

const startY = addHeader();
pdf.autoTable({
    html: "#downloadPdfView",
    startY: startY,
    styles: { fontSize: 7, cellPadding: 2, halign: "center" },
    headStyles: { 
        fillColor: primaryColorRgb, // Use RGB array for table header
        textColor: 255, 
        fontStyle: "bold" 
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    columnStyles: { 4: { cellWidth: 60 } }
});

const totalPages = pdf.internal.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    addFooter(i, totalPages);
}

            // Save and resolve
            pdf.save(`${downloadpdftitle}.pdf`);
            resolve();
        } catch (error) {
            console.error("PDF generation failed:", error);
            reject(error);
        }
    });
}

// ============================================================================
// FUNCTION 1: caldenderupdatekpiDrillTableLoad (KPI Drill Down Table)
// ============================================================================
function caldenderupdatekpiDrillTableLoad(item, action) {
    var tableElement = $(".kpidrilldownTable_" + item.id);
    $(".kpidrilldownTable_" + item.id).find(".paging-nav").remove();

    var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") 
        ? item.dashBoardPreferencesValue.chartdisplayname 
        : "Drill Down Table");
    $("#downloadpdftitle").text(downloadpdftitle);
    
    var kpi = ((item.dashBoardPreferencesValue.kpis != undefined && item.dashBoardPreferencesValue.kpis != "") 
        ? item.dashBoardPreferencesValue.kpis : "");
    var scorecard = ((item.dashBoardPreferencesValue.scorecard != undefined && item.dashBoardPreferencesValue.scorecard != "") 
        ? item.dashBoardPreferencesValue.scorecard : "");
    var kpistatus = ((item.dashBoardPreferencesValue.kpistatus != undefined && item.dashBoardPreferencesValue.kpistatus != "") 
        ? item.dashBoardPreferencesValue.kpistatus : "");
    var kpi_status = kpistatus != "" ? kpistatus.split(',') : [];
    
    // ✅ FIX: Use datekpirange (defined at function scope) instead of undefined datarangechart
    var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") 
        ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
    
    var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") 
        ? item.dashBoardPreferencesValue.measurement : "Monthly");

    var finalactualrows = "";
    var allPeriods = [];

    if (kpi != "") {
        $.ajax({
            url: "/stratroom/kpiDetailListMeasure?kpi=" + kpi + "&scorecard=" + scorecard + "&period=" + datarangechart + "&tableFrequency=" + measurement + "&groupBy=Measure&tableType=dril",
            type: "get",
            async: false,
            contentType: "application/json",
            success: function (data, status) {
                var rowColors = ["#fff", "#f9f9f9", "#fff", "#f9f9f9"];
                
                $.each(data, function (key, value) {
                    $.each(value, function (index, objval) {
                        var statusLight = "";
                        for (var periodval in objval) {
                            if (objval[periodval] && objval[periodval].kpistatus) {
                                statusLight = objval[periodval].kpistatus.toString();
                            }
                            break;
                        }
                        var kpistatuscolorFlag = jQuery.inArray(statusLight, kpi_status) !== -1;

                        if (kpistatuscolorFlag || kpi_status.length === 0) {
                            var rowColor = rowColors[key % rowColors.length];
                            var quaterheaderbody = `<tr class="parent" data-node-key="${index}" style="background:${rowColor};">`;
                            
                            var firstiteration;
                            for (var periodval in objval) { 
                                firstiteration = objval[periodval]; 
                                break; 
                            }
                            
                            // Toggle icon cell (non-interactive in PDF)
                            if (firstiteration && firstiteration.gapStatus) {
                                quaterheaderbody += `<td class="text-center scrolldrill1" style="border: 1px solid #ddd;"><i class="fas fa-plus toggle-icon" ></i></td>`;
                            } else {
                                quaterheaderbody += `<td class="text-center scrolldrill1" style="border: 1px solid #ddd;"></td>`;
                            }

                            // Status flag
                            if (item.dashBoardPreferencesValue.status == true) {
                                var flagColor = (firstiteration && firstiteration.kpistatus) 
                                    ? firstiteration.kpistatus.toString().toLowerCase() : "red";
                                var iconColor = flagColor === "red" ? "#d9534f" : flagColor === "green" ? "#5cb85c" : "#f0ad4e";
                                quaterheaderbody += `<td class="kpistatus" style="text-align:center; border: 1px solid #ddd;"><i class="fas fa-flag" style="color:${iconColor}"></i></td>`;
                            }

                            // Name cell
                            var nameContent = index.split('-')[0];
                            quaterheaderbody += `<td class="scrolldrill1" style="color:#337ab7 !important; text-align:center; border: 1px solid #ddd; font-weight:500;">${nameContent}</td>`;

                            // Data cells & collect periods
                            for (var periodindex in objval) {
                                if (["overallGap","gapStatus","submeasures","nodeKey","kpi","kpistatus","currency","childFlag","dataType","contribution"].indexOf(periodindex) === -1) {
                                    var quarterobj = objval[periodindex];
                                    if (allPeriods.indexOf(periodindex) === -1) {
                                        allPeriods.push(periodindex);
                                    }
                                    if (quarterobj && quarterobj.target != "" && quarterobj.target != undefined && quarterobj.target != "-") {
                                        if (item.dashBoardPreferencesValue.actual == true) {
                                            var val = quarterobj.actual || "-";
                                            var currency = quarterobj.currency || "";
                                            var highlight = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";
                                            quaterheaderbody += `<td class="${highlight}" style="border: 1px solid #ddd; padding: 5px; text-align: right;">${currency}${val}</td>`;
                                        }
                                        if (item.dashBoardPreferencesValue.target == true) {
                                            var val = quarterobj.target || "-";
                                            var currency = quarterobj.currency || "";
                                            var highlight = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";
                                            quaterheaderbody += `<td class="${highlight}" style="border: 1px solid #ddd; padding: 5px; text-align: right;">${currency}${val}</td>`;
                                        }
                                        if (item.dashBoardPreferencesValue.gap == true) {
                                            var val = quarterobj.gap || "-";
                                            var currency = quarterobj.currency || "";
                                            var highlight = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";
                                            quaterheaderbody += `<td class="${highlight}" style="border: 1px solid #ddd; padding: 5px; text-align: right;">${currency}${val}</td>`;
                                        }
                                        if (item.dashBoardPreferencesValue.score == true) {
                                            var val = quarterobj.score || "-";
                                            var highlight = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";
                                            quaterheaderbody += `<td class="${highlight}" style="border: 1px solid #ddd; padding: 5px; text-align: right;">${val}</td>`;
                                        }
                                        if (item.dashBoardPreferencesValue.ytd == true) {
                                            var val = quarterobj.ytd || "-";
                                            var currency = quarterobj.currency || "";
                                            var highlight = checkPositiveorNegative(val) == 1 ? "negativeHighlight" : "";
                                            quaterheaderbody += `<td class="${highlight}" style="border: 1px solid #ddd; padding: 5px; text-align: right;">${currency}${val}</td>`;
                                        }
                                    }
                                }
                            }
                            quaterheaderbody += `</tr>`;
                            finalactualrows += quaterheaderbody;
                        }
                    });
                });
            },
            error: readErrorMsg
        });
    }

    // Sort periods chronologically
    allPeriods.sort(function(a, b) {
        var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var aParts = a.split(' ');
        var bParts = b.split(' ');
        var aMonth = months.indexOf(aParts[0]);
        var bMonth = months.indexOf(bParts[0]);
        var aYear = parseInt(aParts[1]);
        var bYear = parseInt(bParts[1]);
        if (aYear !== bYear) return aYear - bYear;
        return aMonth - bMonth;
    });

    // Generate table header dynamically
    var thead = generateKpiDrillTableHeader(item, allPeriods);
    
    var body = `
        <table class="table table-bordered w-100 table-centered kpidrilldownTable" id="kpidrilldownTable_${item.id}" style="margin-bottom: 0px !important; white-space:nowrap; border-collapse: collapse; width: 100%;">
            ${thead}
            <tbody>${finalactualrows}</tbody>
        </table>`;

    // Handle actions
    if (action === "download") {
        $("#downloadPdfView").html(body);
        $(".page-loader-wrapper").show();
        
        generateDrillDownPDF(item, downloadpdftitle, datarangechart, "kpidrilldownTable_" + item.id)
            .finally(function() {
                $(".page-loader-wrapper").hide();
            });
            
    } else if (action === "csvdownload") {
        $("#downloadPdfView").html(body);
        DownloadTableToCSV.apply($(".downloadcasfile"), ['#downloadPdfView', downloadpdftitle + ".csv"]);
    } else {
        $(tableElement).empty().append(body);
        if ($("#kpidrilldownTable_" + item.id + " tbody tr").length > 10) {
            $("#kpidrilldownTable_" + item.id).paging({ limit: 10 });
        }
    }
}

// ============================================================================
// FUNCTION 2: caldenderprojectstatuscount (Project Status Count Table)
// ============================================================================
function caldenderprojectstatuscount(item, action) {
    var tableElement = $(".projectstatuscount_" + item.id);
    $(".projectstatuscount_" + item.id).find(".paging-nav").remove();
    
    var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") 
        ? item.dashBoardPreferencesValue.chartdisplayname 
        : "Project Status Count");
    $("#downloadpdftitle").text(downloadpdftitle);
    
    var initiative = ((item.dashBoardPreferencesValue.initiative != undefined && item.dashBoardPreferencesValue.initiative != "") 
        ? item.dashBoardPreferencesValue.initiative : "");
    
    // ✅ FIX: Use datekpirange instead of undefined datarangechart
    var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") 
        ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());

    var tableHeader = `<thead><tr>`;
    var checkfielditems = [];

    if (item.dashBoardPreferencesValue.child == true) {
        tableHeader += `<th class="stschild" style="width: 150px;"><strong>Child</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.red == true) {
        tableHeader += `<th class="stsred" style="width:50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: #df0404;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.amber == true) {
        tableHeader += `<th class="stsamber" style="width: 50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: yellow;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.green == true) {
        tableHeader += `<th class="stsgren" style="width: 50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: green;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
        checkfielditems.push(true);
    }
    
    tableHeader += `</tr></thead>`;
    
    var finalactualrows = "";
    
    if (initiative != "") {
        $.ajax({
            url: "/stratroom/initiativestatuscount/" + item.id + "?period=" + datarangechart,
            type: "get",
            async: false,
            contentType: "application/json",
            success: function (data, status) {
                $.each(data, function (key, value) {
                    $.each(value.childStatusCount, function (index, objval) {
                        var quaterheaderbody = "";
                        
                        if (item.dashBoardPreferencesValue.child == true) {
                            quaterheaderbody += `<td class="stschild">` + objval.childName + `</td>`;
                        }
                        if (item.dashBoardPreferencesValue.red == true) {
                            var initiativeDataredjsonString = JSON.stringify(
                                (objval.redInitiative || []).map(function(init) {
                                    return {
                                        initiative_id: init.id,
                                        initiative_unique: init.initiativeId,
                                        initiativeName: init.initiativeValue?.name,
                                        pageId: init.pageId,
                                        owner: init.owner
                                    };
                                })
                            );
                            quaterheaderbody += `<td class="stsred"><a href="#" class="initiative-count-link" data-color="red" data-initiative='${initiativeDataredjsonString}'>` + objval.red + `</a></td>`;
                        }
                        if (item.dashBoardPreferencesValue.amber == true) {
                            var initiativeDataamberjsonString = JSON.stringify(
                                (objval.amberInitiative || []).map(function(init) {
                                    return {
                                        initiative_id: init.id,
                                        initiative_unique: init.initiativeId,
                                        initiativeName: init.initiativeValue?.name,
                                        pageId: init.pageId,
                                        owner: init.owner
                                    };
                                })
                            );
                            quaterheaderbody += `<td class="stsamber"><a href="#" class="initiative-count-link" data-color="amber" data-initiative='${initiativeDataamberjsonString}'>` + objval.amber + `</a></td>`;
                        }
                        if (item.dashBoardPreferencesValue.green == true) {
                            var initiativeDatagreenjsonString = JSON.stringify(
                                (objval.greenInitiative || []).map(function(init) {
                                    return {
                                        initiative_id: init.id,
                                        initiative_unique: init.initiativeId,
                                        initiativeName: init.initiativeValue?.name,
                                        pageId: init.pageId,
                                        owner: init.owner
                                    };
                                })
                            );
                            quaterheaderbody += `<td class="stsgren"><a href="#" class="initiative-count-link" data-color="green" data-initiative='${initiativeDatagreenjsonString}'>` + objval.green + `</a></td>`;
                        }

                        if (quaterheaderbody !== "") {
                            finalactualrows += "<tr>" + quaterheaderbody + "</tr>";
                        }
                    });
                });
            },
            error: readErrorMsg
        });
    }

    var body = `
        <div id="mainprojectstatuscount">
            <table class="table table-bordered w-100 table-centered projectstatuscount" id="projectstatuscount_${item.id}" style="margin-bottom: 0px !important;">
                ${tableHeader}
                <tbody>${finalactualrows}</tbody>
            </table>
        </div>
        <div id="subinitiativeTableContainer" style="display: none;">
            <button id="backInitiativeButton">Back</button>
            <table class="table table-bordered w-100 table-centered kpistatuscount" id="projectsubstatuscount_${item.id}" style="margin-bottom: 0px !important;">
                <thead><tr><th>Initiative ID</th><th>Initiative Name</th></tr></thead>
                <tbody id="subTableInitiativeStatus"></tbody>
            </table>
        </div>`;

    if (action === "download") {
        $("#downloadPdfView").html(body);
        $(".page-loader-wrapper").css("display", "block");
        
        generateDrillDownPDF(item, downloadpdftitle, datarangechart, "projectstatuscount_" + item.id)
            .finally(function() {
                $(".page-loader-wrapper").css("display", "none");
            });
            
    } else if (action === "csvdownload") {
        $("#downloadPdfView").html(body);
        DownloadTableToCSV.apply($(".downloadcasfile"), ['#downloadPdfView', downloadpdftitle + ".csv"]);
    } else {
        $(tableElement).empty().append(body);
        if (finalactualrows.split("<tr>").length > 6) {
            $("#projectstatuscount_" + item.id).paging({ limit: 5 });
        }
    }
}

// ============================================================================
// FUNCTION 3: caldenderupdatestatuscount (KPI Status Count Table)
// ============================================================================
function caldenderupdatestatuscount(item, action) {
    var tableElement = $(".kpistatuscount_" + item.id);
    $(".kpistatuscount_" + item.id).find(".paging-nav").remove();
    
    var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") 
        ? item.dashBoardPreferencesValue.chartdisplayname 
        : "KPI Status Count");
    $("#downloadpdftitle").text(downloadpdftitle);
    
    var scorecard = ((item.dashBoardPreferencesValue.scorecard != undefined && item.dashBoardPreferencesValue.scorecard != "") 
        ? item.dashBoardPreferencesValue.scorecard : "");
    
    // ✅ FIX: Use datekpirange instead of undefined datarangechart
    var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") 
        ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());

    var tableHeader = `<thead><tr>`;
    var checkfielditems = [];

    if (item.dashBoardPreferencesValue.parent == true) {
        tableHeader += `<th class="stsparent" style="width: 150px;"><strong>Parent</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.child == true) {
        tableHeader += `<th class="stschild" style="width: 150px;"><strong>Child</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.red == true) {
        tableHeader += `<th class="stsred" style="width:50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: #df0404;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.lightred == true) {
        tableHeader += `<th class="stslightred" style="width:50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: #ff0000d6;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.amber == true) {
        tableHeader += `<th class="stsamber" style="width: 50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: yellow;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.lightgreen == true) {
        tableHeader += `<th class="stslightgren" style="width: 50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: #00ff1c;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
        checkfielditems.push(true);
    }
    if (item.dashBoardPreferencesValue.green == true) {
        tableHeader += `<th class="stsgren" style="width: 50px;"><strong style="display: flex; justify-content: center; align-items: center; width: 100%;">
  <div style="
      background-color: green;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #dddd;
  "></div>
</strong></th>`;
        checkfielditems.push(true);
    }
    
    tableHeader += `</tr></thead>`;
    
    var finalactualrows = "";
    
    if (scorecard != "") {
        $.ajax({
            url: "/stratroom/kpistatuscount/" + item.id + "?period=" + datarangechart,
            type: "get",
            async: false,
            contentType: "application/json",
            success: function (data, status) {
                $.each(data, function (key, value) {
                    var rowspan = value.childStatusCount?.length || 1;
                    
                    $.each(value.childStatusCount, function (index, objval) {
                        var quaterheaderbody = (index === 0) 
                            ? `<tr><th class="stsparent" rowspan="${rowspan}">${value.parentName}</th>` 
                            : "<tr>";
                        
                        if (item.dashBoardPreferencesValue.child == true) {
                            quaterheaderbody += `<td class="stschild">${objval.childName}</td>`;
                        }
                        if (item.dashBoardPreferencesValue.red == true) {
                            var kpiDatajsonString = JSON.stringify(
                                (objval.redKpi || []).map(function(kpi) {
                                    return {
                                        kpi_id: kpi.id,
                                        kpi_unique: kpi.kpiId,
                                        kpiName: kpi.kpiName
                                    };
                                })
                            );
                            quaterheaderbody += `<td class="stsred"><a href="#" class="kpi-count-link_${item.id}" data-color="red" data-kpis='${kpiDatajsonString}'>${objval.red}</a></td>`;
                        }
                        if (item.dashBoardPreferencesValue.lightred == true) {
                            var lightredkpiDatajsonString = JSON.stringify(
                                (objval.lightredKpi || []).map(function(kpi) {
                                    return {
                                        kpi_id: kpi.id,
                                        kpi_unique: kpi.kpiId,
                                        kpiName: kpi.kpiName
                                    };
                                })
                            );
                            quaterheaderbody += `<td class="stslightred"><a href="#" class="kpi-count-link_${item.id}" data-color="lightred" data-kpis='${lightredkpiDatajsonString}'>${objval.lightred}</a></td>`;
                        }
                        if (item.dashBoardPreferencesValue.amber == true) {
                            var amberKpiDatajsonString = JSON.stringify(
                                (objval.amberKpi || []).map(function(kpi) {
                                    return {
                                        kpi_id: kpi.id,
                                        kpi_unique: kpi.kpiId,
                                        kpiName: kpi.kpiName
                                    };
                                })
                            );
                            quaterheaderbody += `<td class="stsamber"><a href="#" class="kpi-count-link_${item.id}" data-color="amber" data-kpis='${amberKpiDatajsonString}'>${objval.amber}</a></td>`;
                        }
                        if (item.dashBoardPreferencesValue.lightgreen == true) {
                            var lightgreenkpiDatajsonString = JSON.stringify(
                                (objval.lightgreenKpi || []).map(function(kpi) {
                                    return {
                                        kpi_id: kpi.id,
                                        kpi_unique: kpi.kpiId,
                                        kpiName: kpi.kpiName
                                    };
                                })
                            );
                            quaterheaderbody += `<td class="stslightgren"><a href="#" class="kpi-count-link_${item.id}" data-color="lightgreen" data-kpis='${lightgreenkpiDatajsonString}'>${objval.lightgreen}</a></td>`;
                        }
                        if (item.dashBoardPreferencesValue.green == true) {
                            var greenkpiDatajsonString = JSON.stringify(
                                (objval.greenKpi || []).map(function(kpi) {
                                    return {
                                        kpi_id: kpi.id,
                                        kpi_unique: kpi.kpiId,
                                        kpiName: kpi.kpiName
                                    };
                                })
                            );
                            quaterheaderbody += `<td class="stsgren"><a href="#" class="kpi-count-link_${item.id}" data-color="green" data-kpis='${greenkpiDatajsonString}'>${objval.green}</a></td>`;
                        }

                        if (quaterheaderbody !== "") {
                            finalactualrows += quaterheaderbody + "</tr>";
                        }
                    });
                });
            },
            error: readErrorMsg
        });
    }

    var body = `
        <div id="mainTablekpiStatusCount_${item.id}">
            <table class="table table-bordered w-100 table-centered" id="kpistatuscount_${item.id}" style="margin-bottom: 0px !important;">
                ${tableHeader}
                <tbody>${finalactualrows}</tbody>
            </table>
        </div>
        <div id="subTableContainer_${item.id}" style="display: none;">
            <button class="backButton_${item.id}">Back</button>
            <table class="table table-bordered w-100 table-centered" id="kpistatuscountsub_${item.id}" style="margin-bottom: 0px !important;">
                <thead><tr><th>KPI ID</th><th>KPI Name</th></tr></thead>
                <tbody id="subTableKpiStatus_${item.id}"></tbody>
            </table>
        </div>`;

    if (action === "download") {
        $("#downloadPdfView").html(body);
        $(".page-loader-wrapper").css("display", "block");
        
        generateDrillDownPDF(item, downloadpdftitle, datarangechart, "kpistatuscount_" + item.id)
            .finally(function() {
                $(".page-loader-wrapper").css("display", "none");
            });
            
    } else if (action === "csvdownload") {
        $("#downloadPdfView").html(body);
        DownloadTableToCSV.apply($(".downloadcasfile"), ['#downloadPdfView', downloadpdftitle + ".csv"]);
    } else {
        $(tableElement).empty().append(body);
        if (finalactualrows.split("<tr>").length > 6) {
            $("#kpistatuscount_" + item.id).paging({ limit: 5 });
        }
    }
}
function caldenderupdatecsvkpiDrillTableLoad(item, action) {
	var tableElement = $(".kpidrilldownTable_" + item.id);
	$(".kpidrilldownTable_" + item.id).find(".paging-nav").remove();
	var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "Drill Down Table");
	$("#downloadpdftitle").text('');
	$("#downloadpdftitle").text(downloadpdftitle);
	var layoutType = item.dashBoardPreferencesValue.type;
	var displayname = (item.dashBoardPreferencesValue.displayname != undefined ? item.dashBoardPreferencesValue.displayname : "Drill Down Table");
	var kpi = ((item.dashBoardPreferencesValue.kpis != undefined && item.dashBoardPreferencesValue.kpis != "") ? item.dashBoardPreferencesValue.kpis : "");
	var scorecard = ((item.dashBoardPreferencesValue.scorecard != undefined && item.dashBoardPreferencesValue.scorecard != "") ? item.dashBoardPreferencesValue.scorecard : "");

	var kpistatus = ((item.dashBoardPreferencesValue.kpistatus != undefined && item.dashBoardPreferencesValue.kpistatus != "") ? item.dashBoardPreferencesValue.kpistatus : "");

	var kpi_status = [];
	if (kpistatus != "") {
		kpi_status = kpistatus.split(',')
	}
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var tablerow = "";
	var tableheader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];
	if (item.dashBoardPreferencesValue.actual == true) {
		tableheader += '<th data-i18n="Actual">Actual</th>';
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.target == true) {
		tableheader += '<th data-i18n="Target">Target</th>';
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.gap == true) {
		tableheader += '<th data-i18n="Gap">Gap</th>';
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.score == true) {
		tableheader += '<th data-i18n="Index">Index</th>';
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.ytd == true) {
		tableheader += '<th data-i18n="YTD">YTD</th>';
		checkfielditems.push(true);
	}

	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	} else if (checkfielditems) {
		quternamespan = checkfielditems.length;
	}

	/*
	 * if(item.dashBoardPreferencesValue.ytd == true){ quternamespan = 4;
	 * tableheader += '<th>YTD</th>'; }
	 */

	var tableid = 1;
	var quaterheaderrow = "";
	var quaterheaderbody = "";
	var finalactualrows = "";
	var wholetableheader = "";
	var wholetableduplicate = [];
	var rowcount = 0;
	var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") ? item.dashBoardPreferencesValue.measurement : "Monthly");
	if (kpi != "") {
		$.ajax({
			//url: "/stratroom/formula/kpiList?tableFrequency="+measurement+"&responseGrouping=period",
			url: "/stratroom/kpiDetailListMeasure?kpi=" + kpi + "&scorecard=" + scorecard + "&period=" + datarangechart + "&tableFrequency=" + measurement + "&groupBy=Measure&tableType=dril",
			type: "get",
			async: false,
			contentType: "application/json",
			success: function (data, status) {
				finalactualrows = "";
				$.each(data, function (key, value) {
					quaterheaderbody = "";
					var rowi = 0;
					var pagingheader = 0;
					$.each(value, function (index, objval) {

						var statusLight = "";

						var firstiteration_valid;
						for (var periodval in objval) {
							firstiteration_valid = objval[periodval];

							break; // Exit the loop after the first iteration
						}

						if (firstiteration_valid != undefined && firstiteration_valid.kpistatus != "" && firstiteration_valid.kpistatus != undefined) {

							statusLight = firstiteration_valid.kpistatus.toString();
						}

						var kpistatuscolorFlag = false;

						console.log(statusLight)
						console.log(kpi_status)

						if (jQuery.inArray(statusLight, kpi_status) !== -1) {
							kpistatuscolorFlag = true;
						}

						if (kpistatuscolorFlag) {
							tableid++;

							var frequencyHeadertd = index;
							var measureKey;
							quaterheaderrow = "";
							quaterheader = "";
							quaterheader += '<th colspan="' + quternamespan + '" style="font-weight: bold;text-align:center;">' + frequencyHeadertd + '</th>';
							quaterheaderbody += `<tr class="parent">`


							if (objval != "" && objval != undefined) {
								var firstiteration;
								for (var periodval in objval) {
									firstiteration = objval[periodval];

									break; // Exit the loop after the first iteration
								}
								if (firstiteration != undefined && firstiteration.gapStatus != "" && firstiteration.gapStatus != undefined) {
									quaterheaderbody += `<td class="text-center scrolldrill1 pointer kpidrilldownreportevent data-deptname="" data-measuretype="0" data-measurekey=toreplacewithmeasure data-kpi=toreplacewithkpi data-id="` + item.id + `""><i class="fas fa-plus toggle-icon"style="cursor: pointer;"></i></td><td class="scrolldrill"> 
									<i class="`+ firstiteration.gapStatus + `"></i></td>`;

								}
								if (item.dashBoardPreferencesValue.status == true) {

									if (firstiteration != undefined && firstiteration.kpistatus != "" && firstiteration.kpistatus != undefined) {
										quaterheaderbody += `<td class="kpistatus"> 
									<i class="fas fa-flag" style="color:`+ firstiteration.kpistatus.toString().toLowerCase() + `"></i></td>`;

									} else {
										quaterheaderbody += `<td class="kpistatus"> 
										<i class="fas fa-flag" style="color:red"></i></td>`;

									}
								}
								quaterheaderbody += `<td class='scrolldrill1 pointer kpidrilldownreportevent' data-deptname="" data-measuretype="0" data-measurekey=toreplacewithmeasure data-kpi=toreplacewithkpi data-id="` + item.id + `" style='color:blue !important;'>`
								if (objval.submeasures != "" && objval.submeasures != undefined) {
									quaterheaderbody += `<i class=" fa fa-angle-right" id="fafa" ></i>` + frequencyHeadertd + `</td>`;
								} else {
									quaterheaderbody += frequencyHeadertd.split('-')[0] + `</td>`;

								}
								$.each(objval, function (periodindex, quarterobj) {

									if (periodindex != "overallGap" && periodindex != "gapStatus" && periodindex != "submeasures") {
										if (jQuery.inArray(periodindex, wholetableduplicate) == -1) {
											wholetableduplicate.push(periodindex);
											wholetableheader += `<th colspan="` + quternamespan + `">(` + periodindex + `)</th>`;
										}

										var actualbody = (quarterobj.actual != undefined ? quarterobj.actual : "");
										var targetbody = (quarterobj.target != undefined ? quarterobj.target : "");
										var gapbody = (quarterobj.gap != undefined ? quarterobj.gap : "");
										var ytdbody = (quarterobj.ytd != undefined ? quarterobj.ytd : "");
										var scorebody = (quarterobj.score != undefined ? quarterobj.score : "");
										measureKey = (quarterobj.nodeKey != undefined ? quarterobj.nodeKey : "");
										var kpi_out = (quarterobj.kpi != undefined ? quarterobj.kpi : "");
										quaterheaderbody = quaterheaderbody.replace("data-measurekey=toreplacewithmeasure", `data-measurekey="` + measureKey + `"`);
										quaterheaderbody = quaterheaderbody.replace("data-kpi=toreplacewithkpi", `data-kpi="` + kpi_out + `"`);

										var gapStatus = (quarterobj.gapStatus != undefined ? quarterobj.gapStatus : "");
										var actualcolorhighlight = (checkPositiveorNegative(actualbody) == 1 ? "negativeHighlight" : "");
										var targetcolorhighlight = (checkPositiveorNegative(targetbody) == 1 ? "negativeHighlight" : "");
										var gapcolorhighlight = (checkPositiveorNegative(gapbody) == 1 ? "negativeHighlight" : "");
										var scorecolorhighlight = (checkPositiveorNegative(scorebody) == 1 ? "negativeHighlight" : "");
										var ytdcolorhighlight = (checkPositiveorNegative(ytdbody) == 1 ? "negativeHighlight" : "");
										if (targetbody != "") {
											if (item.dashBoardPreferencesValue.actual == true) {
												//quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;'>Actual</th>";
												quaterheaderrow += `<th>Actual- ` + periodindex + `</th>`;
												quaterheaderbody += "<td class=" + actualcolorhighlight + ">" + quarterobj.currency + actualbody + "</td>";
											}
											if (item.dashBoardPreferencesValue.target == true) {
												quaterheaderrow += `<th>Target- `+ periodindex + `</th>`;
												quaterheaderbody += "<td class=" + targetcolorhighlight + ">" + quarterobj.currency + targetbody + "</td>";
											}
											if (item.dashBoardPreferencesValue.gap == true) {
												quaterheaderrow += `<th data-i18n='Gap'>Gap- `+ periodindex + `</th>`;
												quaterheaderbody += "<td class=" + gapcolorhighlight + ">" + quarterobj.currency + gapbody + "</td>";
											}
											if (item.dashBoardPreferencesValue.score == true) {
												quaterheaderrow += `<th data-i18n="Index">Index- `+ periodindex + `</th>`;
												quaterheaderbody += "<td class=" + scorecolorhighlight + ">" + scorebody + "</td>";
											}
											if (item.dashBoardPreferencesValue.ytd == true) {
												quaterheaderrow += `<th>YTD- `+ periodindex + `</th>`;
												quaterheaderbody += "<td class=" + ytdcolorhighlight + ">" + quarterobj.currency + ytdbody + "</td>";
											}
										}
										if (rowi == 0) {
											rowcount++;
										}
									} else if (periodindex === "submeasures") {
										quaterheaderbody = quaterheaderbody + "</tr>";
										rowi++;

										$.each(quarterobj, function (childindex, childobj) {
											$.each(childobj, function (childindex_level, childobj_sub) {
												var frequencyHeadertd = childindex_level;
												quaterheaderbody += `<tr class="cchild d-none "  id="` + childindex_level + `">`;
												var firstiteration;
												for (var periodval in childobj_sub) {
													firstiteration = childobj_sub[periodval];

													break; // Exit the loop after the first iteration
												}
												if (firstiteration != undefined && firstiteration.gapStatus != "" && firstiteration.gapStatus != undefined) {
													quaterheaderbody += `<td class="text-center scrolldrill1 pointer kpidrilldownreportevent' data-deptname="" data-measuretype="1" data-measurekey=toreplacewithmeasure data-kpi=toreplacewithkpi  data-id="` + item.id + `""><i class="fas fa-plus toggle-icon"style="cursor: pointer;"></i></td><td class="scrolldrill"> 
												<i class="`+ firstiteration.gapStatus + `"></i></td>`;

												}
												if (item.dashBoardPreferencesValue.status == true) {

													if (firstiteration != undefined && firstiteration.kpistatus != "" && firstiteration.kpistatus != undefined) {
														quaterheaderbody += `<td class="kpistatus"> 
												<i class="fas fa-flag" style="color:`+ firstiteration.kpistatus.toString().toLowerCase() + `"></i></td>`;

													} else {
														quaterheaderbody += `<td class="kpistatus"> 
													<i class="fas fa-flag" style="color:red"></i></td>`;

													}
												}
												quaterheaderbody += `<td class='scrolldrill1 pointer kpidrilldownreportevent' data-deptname="" data-measuretype="1" data-measurekey=toreplacewithmeasure data-kpi=toreplacewithkpi  data-id="` + item.id + `" style='color:blue !important;'>` + frequencyHeadertd.split('-')[0] + `</td>`
												$.each(childobj_sub, function (periodindex_sub, quarterobj_sub) {
													if (periodindex_sub != "overallGap" && periodindex_sub != "gapStatus") {
														if (jQuery.inArray(periodindex_sub, wholetableduplicate) == -1) {
															wholetableduplicate.push(periodindex_sub);
															wholetableheader += `<th colspan="` + quternamespan + `">` + periodindex_sub + `</th>`;
														}

														var actualbody = (quarterobj_sub.actual != undefined ? quarterobj_sub.actual : "");
														var targetbody = (quarterobj_sub.target != undefined ? quarterobj_sub.target : "");
														var gapbody = (quarterobj_sub.gap != undefined ? quarterobj_sub.gap : "");
														var ytdbody = (quarterobj_sub.ytd != undefined ? quarterobj_sub.ytd : "");
														var scorebody = (quarterobj_sub.score != undefined ? quarterobj_sub.score : "");

														var gapStatus = (quarterobj_sub.gapStatus != undefined ? quarterobj_sub.gapStatus : "");
														var actualcolorhighlight = (checkPositiveorNegative(actualbody) == 1 ? "negativeHighlight" : "");
														var targetcolorhighlight = (checkPositiveorNegative(targetbody) == 1 ? "negativeHighlight" : "");
														var scorecolorhighlight = (checkPositiveorNegative(scorebody) == 1 ? "negativeHighlight" : "");

														var gapcolorhighlight = (checkPositiveorNegative(gapbody) == 1 ? "negativeHighlight" : "");
														var ytdcolorhighlight = (checkPositiveorNegative(ytdbody) == 1 ? "negativeHighlight" : "");
														measureKey = (quarterobj_sub.nodeKey != undefined ? quarterobj_sub.nodeKey : "");
														quaterheaderbody = quaterheaderbody.replace("data-measurekey=toreplacewithmeasure", `data-measurekey="` + measureKey + `"`);
														var kpi_out = (quarterobj.kpi != undefined ? quarterobj.kpi : "");
														quaterheaderbody = quaterheaderbody.replace("data-kpi=toreplacewithkpi", `data-kpi="` + kpi_out + `"`);


														if (targetbody != "") {
															if (item.dashBoardPreferencesValue.actual == true) {
																//quaterheaderrow 	+=	"<th style='font-weight: bold;text-align:center; color: #3A6596;'>Actual</th>";
																quaterheaderbody += "<td class=" + actualcolorhighlight + ">" + quarterobj_sub.currency + actualbody + "</td>";
															}
															if (item.dashBoardPreferencesValue.target == true) {
																quaterheaderbody += "<td class=" + targetcolorhighlight + ">" + quarterobj_sub.currency + targetbody + "</td>";
															}
															if (item.dashBoardPreferencesValue.gap == true) {
																quaterheaderbody += "<td class=" + gapcolorhighlight + ">" + quarterobj_sub.currency + gapbody + "</td>";
															}

															if (item.dashBoardPreferencesValue.score == true) {
																quaterheaderbody += "<td class=" + scorecolorhighlight + ">" + scorebody + "</td>";
															}

															if (item.dashBoardPreferencesValue.ytd == true) {
																quaterheaderbody += "<td class=" + ytdcolorhighlight + ">" + quarterobj_sub.currency + ytdbody + "</td>";
															}
														}
														if (rowi == 0) {
															rowcount++;
														}
													};
												});
											});
										});

										quaterheaderbody = quaterheaderbody + "</tr>";
										rowi++;

									}
								});
							}
							quaterheaderbody = quaterheaderbody + "</tr>";
							rowi++;

						}
					});
					finalactualrows = finalactualrows + quaterheaderbody;
				});

			},
			error: readErrorMsg
		});

	}
	var tableHeader = "";
	if (finalactualrows == "") {
		tableHeader = `<thead>
				  <tr>
				  `;
		if (item.dashBoardPreferencesValue.status == true) {
			tableheader += '<thstyle="width: 20px; style="vertical-align:middle!important;">Status</th>';
		}
		tableHeader == `<th style="width: 198px;" style="vertical-align:middle!important;">
					  Name/Period
					</th>
					<th colspan="`+ quternamespan + `">
					  `+ measurement + `
					</th>
				  </tr>
				  <tr>
					`+ tableheader + `
				  </tr>
				</thead>`;
	}

	body = `<table
				class="table table-bordered w-100 table-centered kpidrilldownTable"
				id="kpidrilldownTable_`+ item.id + `"
				style="margin-bottom: 0px !important;white-space:nowrap;"
			  >
			  <thead>
				  <tr>
				`
	if (item.dashBoardPreferencesValue.status == true) {
		body += '<th style="width: 20px; style="vertical-align:middle!important;"> </th><th style="width: 20px; style="vertical-align:middle!important;">Status</th>';
	}

	body += `<th class="scrolldrill1"style="vertical-align:middle !important;">Name/Period`+ quaterheaderrow +`
				</th>
				</thead>
				<tbody>
					`+ finalactualrows + `
				 </tbody>   
				</table>`;

	if (action === "download") {
		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		$(".page-loader-wrapper").css("display", "block");
		const element = document.getElementById("downloaddrillTablepdf");
		var opt = {
			filename: downloadpdftitle + '.pdf',
		};
		html2pdf().set(opt).from(element).save();
		$(".page-loader-wrapper").css("display", "none");
	} else if (action === "csvdownload") {
		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		console.log(body);
	
		var filename = downloadpdftitle + ".csv";
		var csv = [];
		var rows = document.querySelectorAll("#downloadPdfView table tr");
	
		// Loop through each row and gather cells
		for (var i = 0; i < rows.length; i++) {
			var row = [], cols = rows[i].querySelectorAll("td, th");
	
		
			for (var j = 0; j < cols.length; j++) {
				let cellText = cols[j].innerText.trim();
				// Handle any potential commas in the text by wrapping the text in quotes
				if (cellText.includes(",")) {
					cellText = `"${cellText}"`;
				}
				row.push(cellText);
			}
	
			// Ensure that each row has the same number of columns
			if (i === 0) {
				// Capture the number of columns in the header row
				var headerColumnCount = row.length;
			} else if (row.length < headerColumnCount) {
				// If a row has fewer columns than the header, fill in the missing columns with empty values
				while (row.length < headerColumnCount) {
					row.push("");
				}
			} else if (row.length > headerColumnCount) {
				// If a row has more columns than the header, truncate the row to match the header
				row = row.slice(0, headerColumnCount);
			}
	
			csv.push(row.join(","));
		}
	
		// Create CSV file
		var csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
		var downloadLink = document.createElement("a");
	
		// File name
		downloadLink.download = filename;
	
		// Create a link to the file
		downloadLink.href = window.URL.createObjectURL(csvFile);
	
		// Hide link
		downloadLink.style.display = "none";
	
		// Add the link to DOM
		document.body.appendChild(downloadLink);
	
		// Click the link
		downloadLink.click();
	} else {
		$(tableElement).empty();
		$(tableElement).append(body);
		if ($(this).hasClass('parent')) {
			$("#kpidrilldownTable_" + item.id).paging({ limit: 5 });
		}
	}

}





// function caldenderupdatestatuscount(item, action) {
// 	var tableElement = $(".kpistatuscount_" + item.id);
// 	$(".kpistatuscount_" + item.id).find(".paging-nav").remove();
// 	var layoutType = item.dashBoardPreferencesValue.type;
// 	var scorecard = ((item.dashBoardPreferencesValue.scorecard != undefined && item.dashBoardPreferencesValue.scorecard != "") ? item.dashBoardPreferencesValue.scorecard : "");
// 	var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "Drill Down Table");
// 	$("#downloadpdftitle").text('');
// 	$("#downloadpdftitle").text(downloadpdftitle);
// 	var displayname = (item.dashBoardPreferencesValue.displayname != undefined ? item.dashBoardPreferencesValue.displayname : "Drill Down Table");
// 	var kpi = ((item.dashBoardPreferencesValue.kpis != undefined && item.dashBoardPreferencesValue.kpis != "") ? item.dashBoardPreferencesValue.kpis : "");
// 	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
// 	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
// 	var fieldvalue = "";
// 	var tablerow = "";
// 	var tableHeader = "";
// 	var quternamespan = 3;
// 	var removeperiodheader = "";
// 	var checkfielditems = [];

// 	/*
// 	 * if(item.dashBoardPreferencesValue.ytd == true){ quternamespan = 4;
// 	 * tableheader += '<th>YTD</th>'; }
// 	 */
// 	tableHeader = `<thead>
// 	<tr>`;
// 	if (item.dashBoardPreferencesValue.parent == true) {
// 		tableHeader += `               
// <th  class="stsparent"
// style="width: 150px; ">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 36)"
// >Parent </strong
// > 

// </th>`;
// 		checkfielditems.push(true);
// 	}


// 	if (item.dashBoardPreferencesValue.child == true) {
// 		tableHeader += `<th class="stschild"
// style="width: 150px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 36)"
// >Child</strong
// ></th>`;
// 		checkfielditems.push(true);
// 	}
// 	if (item.dashBoardPreferencesValue.red == true) {
// 		tableHeader += `<th class="stsred"
// style="width:50px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 25)"
// >Red</strong
// </th>`;
// 		checkfielditems.push(true);
// 	}

// 	if (item.dashBoardPreferencesValue.lightred == true) {
// 		tableHeader += `<th class="stslightred"
// style="width:50px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 25)"
// >LightRed</strong
// </th>`;
// 		checkfielditems.push(true);
// 	}

// 	if (item.dashBoardPreferencesValue.amber == true) {
// 		tableHeader += ` <th class="stsamber"
// style="width: 50px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 25)"
// >Amber</strong</th>`;
// 		checkfielditems.push(true);
// 	}
// 	if (item.dashBoardPreferencesValue.lightgreen == true) {
// 		tableHeader += ` <th class="stsgren"
// style="width: 50px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 25)"
// >LightGreen</strong></th>`;
// 		checkfielditems.push(true);
// 	}
// 	if (item.dashBoardPreferencesValue.green == true) {
// 		tableHeader += ` <th class="stsgren"
// style="width: 50px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 25)"
// >Green</strong></th>`;
// 		checkfielditems.push(true);
// 	}
// 	if (checkfielditems.length == 0) {
// 		quternamespan = 0;
// 		removeperiodheader = "style='display:none'";
// 	} else {
// 		quternamespan = checkfielditems.length;
// 	}
// 	tableHeader = tableHeader + "</tr></thead>"
// 	var tableid = 1;
// 	var quaterheaderrow = "";
// 	var quaterheaderbody = "";
// 	var finalactualrows = "";
// 	var wholetableheader = "";
// 	var wholetableduplicate = [];
// 	var rowcount = 0;
// 	if (scorecard != "") {
// 		$.ajax({
// 			//url: "/stratroom/formula/kpiList?tableFrequency="+measurement+"&responseGrouping=period",
// 			url: "/stratroom/kpistatuscount/" + item.id + "?period=" + datarangechart,
// 			type: "get",
// 			async: false,
// 			contentType: "application/json",
// 			success: function (data, status) {
// 				finalactualrows = "";

// 				$.each(data, function (key, value) {
// 					quaterheaderbody = "";
// 					var rowi = 0;
// 					var pagingheader = 0;
// 					var rowspan = 1;
// 					if (value.childStatusCount) {
// 						rowspan = value.childStatusCount.length;
// 					}

// 					quaterheaderbody = `"<tr>"<th class="stsparent" id=parent rowspan="` + rowspan + `" >` + value.parentName + `</th>`
// 					$.each(value.childStatusCount, function (index, objval) {
// 						var frequencyHeadertd = index;
// 						var measureKey;
// 						if (item.dashBoardPreferencesValue.child == true) {
// 							quaterheaderbody += `<td class="stschild">` + objval.childName + `</td>`
// 						}
// 						if (item.dashBoardPreferencesValue.red == true) {

// 							var kpiData = objval.redKpi;

// 							// Initialize an empty array for the extracted data
// 							var extractedKpiData = [];

// 							// Check if kpiData has elements
// 							if (kpiData && kpiData.length > 0) {
// 								// Extract kpi_id and kpiName and create a new array
// 								extractedKpiData = kpiData.map(function (kpi) {
// 									return {
// 										kpi_id: kpi.id, // Ensure 'id' matches the property name in your kpi objects
// 										kpi_unique: kpi.kpiId,
// 										kpiName: kpi.kpiName // Ensure 'kpiName' matches the property name in your kpi objects
// 									};
// 								});
// 							}

// 							var kpiDatajsonString = JSON.stringify(extractedKpiData);



// 							quaterheaderbody += `<td class="stsred"> <a href="#" class="kpi-count-link_`+item.id+`" data-color="red" data-kpis='${kpiDatajsonString}'>` + objval.red + `</a></td>`
// 						}
// 						if (item.dashBoardPreferencesValue.lightred == true) {
// 							var lightredkpiData = objval.lightredKpi;

// 							// Initialize an empty array for the extracted data
// 							var extractedlightredkpiData = [];

// 							// Check if kpiData has elements
// 							if (lightredkpiData && lightredkpiData.length > 0) {
// 								// Extract kpi_id and kpiName and create a new array
// 								extractedlightredkpiData = lightredkpiData.map(function (kpi) {
// 									return {
// 										kpi_id: kpi.id, // Ensure 'id' matches the property name in your kpi objects
// 										kpi_unique: kpi.kpiId,
// 										kpiName: kpi.kpiName // Ensure 'kpiName' matches the property name in your kpi objects
// 									};
// 								});
// 							}

// 							var lightredkpiDatajsonString = JSON.stringify(extractedlightredkpiData);


// 							quaterheaderbody += `<td class="stslightred"><a href="#" class="kpi-count-link_`+item.id+`" data-color="lightred" data-kpis='${lightredkpiDatajsonString}'>` + objval.lightred + `</a></td>`
// 						}
// 						if (item.dashBoardPreferencesValue.amber == true) {

// 							var amberKpiData = objval.amberKpi;

// 							// Initialize an empty array for the extracted data
// 							var extractedamberKpiData = [];

// 							// Check if kpiData has elements
// 							if (amberKpiData && amberKpiData.length > 0) {
// 								// Extract kpi_id and kpiName and create a new array
// 								extractedamberKpiData = amberKpiData.map(function (kpi) {
// 									return {
// 										kpi_id: kpi.id, // Ensure 'id' matches the property name in your kpi objects
// 										kpi_unique: kpi.kpiId,
// 										kpiName: kpi.kpiName // Ensure 'kpiName' matches the property name in your kpi objects
// 									};
// 								});
// 							}

// 							var amberKpiDatajsonString = JSON.stringify(extractedamberKpiData);


// 							quaterheaderbody += `<td class="stsamber"><a href="#" class="kpi-count-link_`+item.id+`" data-color="amber" data-kpis='${amberKpiDatajsonString}'>` + objval.amber + `</a></td>`
// 						}
// 						if (item.dashBoardPreferencesValue.lightgreen == true) {


// 							var lightgreenkpiData = objval.lightgreenKpi;

// 							// Initialize an empty array for the extracted data
// 							var extractedlightgreenkpiData = [];

// 							// Check if kpiData has elements
// 							if (lightgreenkpiData && lightgreenkpiData.length > 0) {
// 								// Extract kpi_id and kpiName and create a new array
// 								extractedlightgreenkpiData = lightgreenkpiData.map(function (kpi) {
// 									return {
// 										kpi_id: kpi.id, // Ensure 'id' matches the property name in your kpi objects
// 										kpi_unique: kpi.kpiId,
// 										kpiName: kpi.kpiName // Ensure 'kpiName' matches the property name in your kpi objects
// 									};
// 								});
// 							}

// 							var lightgreenkpiDatajsonString = JSON.stringify(extractedlightgreenkpiData);



// 							quaterheaderbody += `<td class="stslightgren"><a href="#" class="kpi-count-link_`+item.id+`" data-color="lightgreen" data-kpis='${lightgreenkpiDatajsonString}'>` + objval.lightgreen + `</a></td>`
// 						}
// 						if (item.dashBoardPreferencesValue.green == true) {


// 							var greenKpiData = objval.greenKpi;

// 							// Initialize an empty array for the extracted data
// 							var extractedgreenKpiData = [];

// 							// Check if kpiData has elements
// 							if (greenKpiData && greenKpiData.length > 0) {
// 								// Extract kpi_id and kpiName and create a new array
// 								extractedgreenKpiData = greenKpiData.map(function (kpi) {
// 									return {
// 										kpi_id: kpi.id, // Ensure 'id' matches the property name in your kpi objects
// 										kpi_unique: kpi.kpiId,
// 										kpiName: kpi.kpiName // Ensure 'kpiName' matches the property name in your kpi objects
// 									};
// 								});
// 							}

// 							var greenkpiDatajsonString = JSON.stringify(extractedgreenKpiData);


// 							quaterheaderbody += `<td class="stsgren"><a href="#" class="kpi-count-link_`+item.id+`" data-color="green" data-kpis='${greenkpiDatajsonString}'>` + objval.green + `</a></td>`
// 						}

// 						if (quaterheaderbody !== "") {
// 							quaterheaderbody = quaterheaderbody + "</tr>";

// 						}

// 						tableid++;
// 						rowi++;
// 					});

// 					finalactualrows = finalactualrows + quaterheaderbody;
// 				});

// 			},
// 			error: readErrorMsg
// 		});

// 	}

// 	body = ` <div id="mainTablekpiStatusCount_`+item.id+`"> <table
// 				class="table table-bordered w-100 table-centered"
// 				id="kpistatuscount_`+ item.id + `"
// 				style="margin-bottom: 0px !important;"
// 			  >` + tableHeader +
// 		`	<tbody>
// 					`+ finalactualrows + `
// 				 </tbody>   
// 				</table></div> <div id="subTableContainer_`+item.id+`" style="display: none;">
// 				<button class="backButton_`+item.id+`">Back</button>
// 				<table
// 				class="table table-bordered w-100 table-centered"
// 				id="kpistatuscountsub_`+ item.id + `"
// 				style="margin-bottom: 0px !important;">
// 				<thead><tr><th>KPI ID</th><th>KPI Name</th></tr></thead>
// 				<tbody id="subTableKpiStatus_`+ item.id + `"></tbody>
// 				</table>
// 			</div>`;

// 	if (action === "download") {
// 		$("#downloadPdfView").empty();
// 		$("#downloadPdfView").html(body);
// 		$(".page-loader-wrapper").css("display", "block");
// 		const element = document.getElementById("downloaddrillTablepdf");
// 		var opt = {
// 			filename: downloadpdftitle + '.pdf',
// 		};
// 		html2pdf().set(opt).from(element).save();
// 		$(".page-loader-wrapper").css("display", "none");
// 	} else if (action === "csvdownload") {
// 		$("#downloadPdfView").empty();
// 		$("#downloadPdfView").html(body);
// 		var filename = downloadpdftitle + ".csv";
// 		var args = ['#downloadPdfView', filename];
// 		DownloadTableToCSV.apply($(".downloadcasfile"), args);
// 	} else {
// 		$(tableElement).empty();
// 		$(tableElement).append(body);
// 		if (tableid > 6) {
// 			$("#kpistatuscount" + item.id).paging({ limit: 5 });
// 		}
// 	}
// }



// function caldenderprojectstatuscount(item, action) {
// 	var tableElement = $(".projectstatuscount_" + item.id);
// 	$(".projectstatuscount_" + item.id).find(".paging-nav").remove();
// 	var layoutType = item.dashBoardPreferencesValue.type;
// 	var initiative = ((item.dashBoardPreferencesValue.initiative != undefined && item.dashBoardPreferencesValue.initiative != "") ? item.dashBoardPreferencesValue.initiative : "");
// 	var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "Drill Down Table");
// 	$("#downloadpdftitle").text('');
// 	$("#downloadpdftitle").text(downloadpdftitle);
// 	var displayname = (item.dashBoardPreferencesValue.displayname != undefined ? item.dashBoardPreferencesValue.displayname : "Project Status Count Table");
// 	var kpi = ((item.dashBoardPreferencesValue.kpis != undefined && item.dashBoardPreferencesValue.kpis != "") ? item.dashBoardPreferencesValue.kpis : "");
// 	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
// 	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
// 	var fieldvalue = "";
// 	var tablerow = "";
// 	var tableHeader = "";
// 	var quternamespan = 3;
// 	var removeperiodheader = "";
// 	var checkfielditems = [];

// 	/*
// 	 * if(item.dashBoardPreferencesValue.ytd == true){ quternamespan = 4;
// 	 * tableheader += '<th>YTD</th>'; }
// 	 */
// 	tableHeader = `<thead>
// 	<tr>`;

// 	if (item.dashBoardPreferencesValue.child == true) {
// 		tableHeader += `<th class="stschild"
// style="width: 150px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 36)"
// >Child</strong
// ></th>`;
// 		checkfielditems.push(true);
// 	}
// 	if (item.dashBoardPreferencesValue.red == true) {
// 		tableHeader += `<th class="stsred"
// style="width:50px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 25)"
// >Red</strong
// </th>`;
// 		checkfielditems.push(true);
// 	}

// 	if (item.dashBoardPreferencesValue.amber == true) {
// 		tableHeader += ` <th class="stsamber"
// style="width: 50px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 25)"
// >Amber</strong</th>`;
// 		checkfielditems.push(true);
// 	}
// 	if (item.dashBoardPreferencesValue.green == true) {
// 		tableHeader += ` <th class="stsgren"
// style="width: 50px;">
// <strong
// editable="true"
// contenteditable="true"
// onkeypress="return (this.innerText.length <= 25)"
// >Green</strong></th>`;
// 		checkfielditems.push(true);
// 	}
// 	if (checkfielditems.length == 0) {
// 		quternamespan = 0;
// 		removeperiodheader = "style='display:none'";
// 	} else {
// 		quternamespan = checkfielditems.length;
// 	}
// 	tableHeader = tableHeader + "</tr></thead>"
// 	var tableid = 1;
// 	var quaterheaderrow = "";
// 	var quaterheaderbody = "";
// 	var finalactualrows = "";
// 	var wholetableheader = "";
// 	var wholetableduplicate = [];
// 	var rowcount = 0;
// 	if (initiative != "") {
// 		$.ajax({
// 			//url: "/stratroom/formula/kpiList?tableFrequency="+measurement+"&responseGrouping=period",
// 			url: "/stratroom/initiativestatuscount/" + item.id + "?period=" + datarangechart,
// 			type: "get",
// 			async: false,
// 			contentType: "application/json",
// 			success: function (data, status) {
// 				finalactualrows = "";

// 				$.each(data, function (key, value) {
// 					quaterheaderbody = "";
// 					var rowi = 0;
// 					var pagingheader = 0;
// 					var rowspan = 1;
// 					if (value.childStatusCount) {
// 						rowspan = value.childStatusCount.length;
// 					}


// 					$.each(value.childStatusCount, function (index, objval) {
// 						var frequencyHeadertd = index;
// 						var measureKey;
// 						if (item.dashBoardPreferencesValue.child == true) {
// 							quaterheaderbody += `<td class="stschild">` + objval.childName + `</td>`
// 						}
// 						if (item.dashBoardPreferencesValue.red == true) {
// 							var initiativeredData = objval.redInitiative;
// 							var extractedredInitiativeData = [];
// 							if (initiativeredData && initiativeredData.length > 0) {
// 								// Extract kpi_id and kpiName and create a new array
// 								extractedredInitiativeData = initiativeredData.map(function (initiative) {
// 									return {
// 										initiative_id: initiative.id, // Ensure 'id' matches the property name in your kpi objects
// 										initiative_unique: initiative.initiativeId,
// 										initiativeName: initiative.initiativeValue.name, // Ensure 'kpiName' matches the property name in your kpi objects
// 										pageId: initiative.pageId,
// 										owner: initiative.owner
// 									};
// 								});
// 							}

// 							var initiativeDataredjsonString = JSON.stringify(extractedredInitiativeData);
// 							quaterheaderbody += `<td class="stsred"><a href="#" class="initiative-count-link" data-color="red" data-initiative='${initiativeDataredjsonString}'>` + objval.red + `</a></td>`
// 						}
// 						if (item.dashBoardPreferencesValue.amber == true) {
// 							var initiativeamberData = objval.amberInitiative;
// 							var extractedInitiativeamberData = [];
// 							if (initiativeamberData && initiativeamberData.length > 0) {
// 								// Extract kpi_id and kpiName and create a new array
// 								extractedInitiativeamberData = initiativeamberData.map(function (initiative) {
// 									return {
// 										initiative_id: initiative.id, // Ensure 'id' matches the property name in your kpi objects
// 										initiative_unique: initiative.initiativeId,
// 										initiativeName: initiative.initiativeValue.name, // Ensure 'kpiName' matches the property name in your kpi objects
// 										pageId: initiative.pageId,
// 										owner: initiative.owner
// 									};
// 								});
// 							}
// 							var initiativeDataamberjsonString = JSON.stringify(extractedInitiativeamberData);

// 							quaterheaderbody += `<td class="stsamber"><a href="#" class="initiative-count-link" data-color="amber" data-initiative='${initiativeDataamberjsonString}'>` + objval.amber + `</a></td>`
// 						}
// 						if (item.dashBoardPreferencesValue.green == true) {
// 							var initiativegreenData = objval.greenInitiative;
// 							var extractedgreenInitiativeData = [];
// 							if (initiativegreenData && initiativegreenData.length > 0) {
// 								// Extract kpi_id and kpiName and create a new array
// 								extractedgreenInitiativeData = initiativegreenData.map(function (initiative) {
// 									return {
// 										initiative_id: initiative.id, // Ensure 'id' matches the property name in your kpi objects
// 										initiative_unique: initiative.initiativeId,
// 										initiativeName: initiative.initiativeValue.name, // Ensure 'kpiName' matches the property name in your kpi objects
// 										pageId: initiative.pageId,
// 										owner: initiative.owner
// 									};
// 								});
// 							}
// 							var initiativeDatagreenjsonString = JSON.stringify(extractedgreenInitiativeData);

// 							quaterheaderbody += `<td class="stsgren"><a href="#" class="initiative-count-link" data-color="green" data-initiative='${initiativeDatagreenjsonString}'>` + objval.green + `</a></td>`
// 						}

// 						if (quaterheaderbody !== "") {
// 							quaterheaderbody = "<tr>" + quaterheaderbody + "</tr>";

// 						}

// 						tableid++;
// 						rowi++;
// 					});

// 					finalactualrows = finalactualrows + quaterheaderbody;
// 				});

// 			},
// 			error: readErrorMsg
// 		});

// 	}

// 	body = `<div id="mainprojectstatuscount"> <table
// 				class="table table-bordered w-100 table-centered projectstatuscount"
// 				id="projectstatuscount_`+ item.id + `"
// 				style="margin-bottom: 0px !important;"
// 			  >` + tableHeader +
// 		`	<tbody>
// 					`+ finalactualrows + `
// 				 </tbody>   
// 				</table></div><div id="subinitiativeTableContainer" style="display: none;">
// 				<button id="backInitiativeButton">Back</button>
// 				<table
// 				class="table table-bordered w-100 table-centered kpistatuscount"
// 				id="projectsubstatuscount_`+ item.id + `"
// 				style="margin-bottom: 0px !important;">
// 				<thead><tr><th>Initiative ID</th><th>Initiative Name</th></tr></thead>
// 				<tbody id="subTableInitiativeStatus"></tbody>
// 				</table>
// 			</div>`;
// 	if (action === "download") {
// 		$("#downloadPdfView").empty();
// 		$("#downloadPdfView").html(body);
// 		$(".page-loader-wrapper").css("display", "block");
// 		const element = document.getElementById("downloaddrillTablepdf");
// 		var opt = {
// 			filename: downloadpdftitle + '.pdf',
// 		};
// 		html2pdf().set(opt).from(element).save();
// 		$(".page-loader-wrapper").css("display", "none");
// 	} else if (action === "csvdownload") {
// 		$("#downloadPdfView").empty();
// 		$("#downloadPdfView").html(body);
// 		var filename = downloadpdftitle + ".csv";
// 		var args = ['#downloadPdfView', filename];
// 		DownloadTableToCSV.apply($(".downloadcasfile"), args);
// 	} else {
// 		$(tableElement).empty();
// 		$(tableElement).append(body);
// 		if (tableid > 6) {
// 			$("#projectstatuscount_" + item.id).paging({ limit: 5 });
// 		}
// 	}
// }

function caldenderblankkpireports(item, action) {
	var tableElement = $(".blankkpireports_" + item.id);
	$(".blankkpireports_" + item.id).find(".paging-nav").remove();
	var layoutType = item.dashBoardPreferencesValue.type;
	var scorecard = ((item.dashBoardPreferencesValue.scorecard != undefined && item.dashBoardPreferencesValue.scorecard != "") ? item.dashBoardPreferencesValue.scorecard : "");
	var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "Drill Down Table");
	$("#downloadpdftitle").text('');
	$("#downloadpdftitle").text(downloadpdftitle);
	var displayname = (item.dashBoardPreferencesValue.displayname != undefined ? item.dashBoardPreferencesValue.displayname : "Drill Down Table");
	var kpi = ((item.dashBoardPreferencesValue.kpis != undefined && item.dashBoardPreferencesValue.kpis != "") ? item.dashBoardPreferencesValue.kpis : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var tablerow = "";
	var tableHeader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];

	/*
	 * if(item.dashBoardPreferencesValue.ytd == true){ quternamespan = 4;
	 * tableheader += '<th>YTD</th>'; }
	 */
	tableHeader = `<thead>
	<tr>`;
	if (item.dashBoardPreferencesValue.parent == true) {
		tableHeader += `               
<th  class="stsparent"
style="width: 150px; ">
<strong
editable="true"
contenteditable="true"
onkeypress="return (this.innerText.length <= 36)"
>Parent </strong
> 

</th>`;
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.child == true) {
		tableHeader += `<th class="stschild"
style="width: 150px;">
<strong
editable="true"
contenteditable="true"
onkeypress="return (this.innerText.length <= 36)"
>Child</strong
></th>`;
		checkfielditems.push(true);
	}

	tableHeader += `<th class="blkcount"
style="width:50px;">
<strong
editable="true"
contenteditable="true"
onkeypress="return (this.innerText.length <= 25)"
>Count</strong
</th>`;


	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	} else {
		quternamespan = checkfielditems.length;
	}
	tableHeader = tableHeader + "</tr></thead>"
	var tableid = 1;
	var quaterheaderrow = "";
	var quaterheaderbody = "";
	var finalactualrows = "";
	var wholetableheader = "";
	var wholetableduplicate = [];
	var rowcount = 0;
	if (scorecard != "") {
		$.ajax({
			//url: "/stratroom/formula/kpiList?tableFrequency="+measurement+"&responseGrouping=period",
			url: "/stratroom/blankkpi/" + item.id + "?period=" + datarangechart,
			type: "get",
			async: false,
			contentType: "application/json",
			success: function (data, status) {
				finalactualrows = "";

				$.each(data, function (key, value) {
					quaterheaderbody = "";
					var rowi = 0;
					var pagingheader = 0;
					var rowspan = 1;
					if (value.childStatusCount) {
						rowspan = value.childStatusCount.length;
					}

					quaterheaderbody = `"<tr>"<th class="stsparent" id=parent rowspan="` + rowspan + `" >` + value.parentName + `</th>`
					$.each(value.childStatusCount, function (index, objval) {
						var frequencyHeadertd = index;
						var measureKey;
						if (item.dashBoardPreferencesValue.child == true) {
							
							quaterheaderbody += `<td class="stschild">` + objval.childName + `</td>`

							var initiativekpiData = objval.blankpiList;
							console.log(initiativekpiData,"initiativekpiData")
							var extractedkpiInitiativeData = [];
							if (initiativekpiData && initiativekpiData.length > 0) {
								// Extract kpi_id and kpiName and create a new array
								extractedkpiInitiativeData = initiativekpiData.map(function (initiative) {
									return {
										initiativeKpi_id: initiative.id, // Ensure 'id' matches the property name in your kpi objects
										initiativeKpi_unique: initiative.kpiId,
										initiativeKpiName: initiative.kpiValue.name, // Ensure 'kpiName' matches the property name in your kpi objects
										pageId: initiative.pageId,
										owner: initiative.owner
									};
								});
							}
							console.log(extractedkpiInitiativeData,"extractedkpiInitiativeData");
							var initiativeDatakpijsonString = JSON.stringify(extractedkpiInitiativeData);
                            console.log(initiativeDatakpijsonString,"initiativeDatakpijsonString");

							quaterheaderbody += `<td class="blkcount"><a href="#" class="initiativeKpi-count-link"  data-initiative='${initiativeDatakpijsonString}'>` + objval.blankkpi+ `</a></td>`
						}

						if (quaterheaderbody !== "") {
							quaterheaderbody = quaterheaderbody + "</tr>";

						}

						tableid++;
						rowi++;
					});

					finalactualrows = finalactualrows + quaterheaderbody;
				});

			},
			error: readErrorMsg
		});

	}

	body = `<div id="maininitiativeKpicount"><table
				class="table table-bordered w-100 table-centered blankkpireports"
				id="blankkpireports_`+ item.id + `"
				style="margin-bottom: 0px !important;"
			  >` + tableHeader +
		`	<tbody>
					`+ finalactualrows + `
				 </tbody>   
				</table></div><div id="subinitiativeKpiTableContainer" style="display: none;">
				<button id="backKpiCountButton">Back</button>
				<table
				class="table table-bordered w-100 table-centered kpistatuscount"
				id="kpisubstatuscount_`+ item.id + `"
				style="margin-bottom: 0px !important;">
				<thead><tr><th>KPI ID</th><th>KPI Name</th></tr></thead>
				<tbody id="subTableInitiativeKpiStatus"></tbody>
				</table>
			</div>`;
	if (action === "download") {
		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		$(".page-loader-wrapper").css("display", "block");
		const element = document.getElementById("downloaddrillTablepdf");
		var opt = {
			filename: downloadpdftitle + '.pdf',
		};
		html2pdf().set(opt).from(element).save();
		$(".page-loader-wrapper").css("display", "none");
	} else if (action === "csvdownload") {
		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		var filename = downloadpdftitle + ".csv";
		var args = ['#downloadPdfView', filename];
		DownloadTableToCSV.apply($(".downloadcasfile"), args);
	} else {
		$(tableElement).empty();
		$(tableElement).append(body);
		if (tableid > 6) {
			$("#blankkpireports" + item.id).paging({ limit: 5 });
		}
	}
}

function showKpiCountSubTable(initativeList, color) {
	let subTableHtml = ' ';

	initativeList.forEach(initiative => {
		subTableHtml += `<tr class="initiativekpi-detail-link" data-id="${initiative.initiativeKpi_id}" data-pageid="${initiative.pageId}"  data-owner="${initiative.owner}"  style="cursor: pointer;">
                             <td>${initiative.initiativeKpi_unique}</td>
                             <td>${initiative.initiativeKpiName}</td>
                         </tr>`;
	});


	// Display the subtable in a designated area, for example, a modal or beneath the count table
	$('#subTableInitiativeKpiStatus').html(subTableHtml);
}
$(document).on('click', '.initiativeKpi-count-link', function (e) {
	e.preventDefault();
	const initiativeData = $(this).attr('data-initiative'); // Get the JSON string from data attribute
	console.log(initiativeData,"initiativeData")

	const initiativeList = JSON.parse(initiativeData); // Parse JSON string to an array
	// const color = $(this).data('color');

	console.log(initiativeList)
	showKpiCountSubTable(initiativeList);

	$('#maininitiativeKpicount').hide(); // Hide the main table
	$('#subinitiativeKpiTableContainer').show(); // Show the subtable


	// Assuming you have a function to create and show the subtable
});
$(document).on('click', '.initiativekpi-detail-link', function () {
	const initiativeId = $(this).data('id');
	const pageId = $(this).data('pageid');
	const owner = $(this).data('owner');
	console.log(initiativeId,"initiativeId");
	console.log(pageId,"pageId");
	console.log(owner,"owner");
	// Navigate to the KPI detail page
	// window.location.href = `/stratroom/dashboard/${owner}?pageId=${pageId}&initiativeId=${initiativeId}`; // Adjust the URL as needed
	window.location.href = `/stratroom/kpiView?kpiId=${initiativeId}`;
});

$(document).on('click', '#backKpiCountButton', function () {
	// Show the main table and hide the subtable
	showMainKpiCountTable();
});

function showMainKpiCountTable() {
	$('#subinitiativeKpiTableContainer').hide(); // Hide the subtable
	$('#maininitiativeKpicount').show(); // Show the main table
	$('#maininitiativeKpicount').css("display", "block");

}

function caldenderinitiativecount(item, action) {
	var tableElement = $(".initiativeCount_" + item.id);
	$(".initiativeCount_" + item.id).find(".paging-nav").remove();
	var layoutType = item.dashBoardPreferencesValue.type;
	var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "Drill Down Table");
	$("#downloadpdftitle").text('');
	$("#downloadpdftitle").text(downloadpdftitle);
	var displayname = (item.dashBoardPreferencesValue.displayname != undefined ? item.dashBoardPreferencesValue.displayname : "Initiative Progress Count Table");
	var kpi = ((item.dashBoardPreferencesValue.kpis != undefined && item.dashBoardPreferencesValue.kpis != "") ? item.dashBoardPreferencesValue.kpis : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var tablerow = "";
	var tableHeader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];

	var initiative = ((item.dashBoardPreferencesValue.initiative != undefined && item.dashBoardPreferencesValue.initiative != "") ? item.dashBoardPreferencesValue.initiative : "");
	/*
	 * if(item.dashBoardPreferencesValue.ytd == true){ quternamespan = 4;
	 * tableheader += '<th>YTD</th>'; }
	 */
	tableHeader = `<thead>
	<tr>`;
	if (item.dashBoardPreferencesValue.child == true) {
		tableHeader += `<th class="ibchild"
		style="width: 150px;">
		<strong
	   editable="true"
	   contenteditable="true"
	   onkeypress="return (this.innerText.length <= 36)"
		 >Child</strong
	   ></th>`
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.inProgress == true) {
		tableHeader += ` <th class="ip"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Inprogress</strong
		</th>`
		checkfielditems.push(true);
	}
	if (item.dashBoardPreferencesValue.completed == true) {
		tableHeader += ` <th class="cmpl"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Completed</strong
		</th>`
		checkfielditems.push(true);
	}
	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	} else {
		quternamespan = checkfielditems.length;
	}
	tableHeader = tableHeader + "</tr></thead>"
	var tableid = 1;
	var quaterheaderrow = "";
	var quaterheaderbody = "";
	var finalactualrows = "";
	var wholetableheader = "";
	var wholetableduplicate = [];
	var rowcount = 0;

     var filteredInitiative = "";

if (initiative && typeof initiative === "string") {
    // Filter out "All" and keep only valid integers
    filteredInitiative = initiative
        .split(",") // Split the string into an array
        .map(value => value.trim()) // Remove extra spaces
        .filter(value => value !== "All" && !isNaN(value) && Number.isInteger(Number(value))) // Exclude "All" and keep integers
        .join(","); // Join back into a comma-separated string
}

console.log(filteredInitiative);

	if (filteredInitiative != "") {
		$.ajax({
			//url: "/stratroom/formula/kpiList?tableFrequency="+measurement+"&responseGrouping=period",
			url: "/stratroom/initiativeprogresscount/" + item.id + "?period=" + datarangechart,
			type: "get",
			async: false,
			contentType: "application/json",
			success: function (data, status) {
				finalactualrows = "";

				$.each(data, function (key, value) {
					quaterheaderbody = "";
					var rowi = 0;
					var pagingheader = 0;
					var rowspan = 1;
					if (value.childStatusCount) {
						rowspan = value.childStatusCount.length;
					}


					$.each(value.childStatusCount, function (index, objval) {
						var frequencyHeadertd = index;
						var measureKey;
						if (item.dashBoardPreferencesValue.child == true) {
							quaterheaderbody += `<td class="ibchild">` + objval.childName + `</td>`
						}
						if (item.dashBoardPreferencesValue.inProgress == true) {
							quaterheaderbody += `<td class="ip">` + objval.inProgress + `</td>`
						}
						if (item.dashBoardPreferencesValue.completed == true) {
							quaterheaderbody += `<td class="cmpl">` + objval.completed + `</td>`
						}


						if (quaterheaderbody !== "") {
							quaterheaderbody = "<tr>" + quaterheaderbody + "</tr>";

						}

						tableid++;
						rowi++;
					});

					finalactualrows = finalactualrows + quaterheaderbody;
				});

			},
			error: readErrorMsg
		});

	}

	body = `<table
				class="table table-bordered w-100 table-centered initiativeCount"
				id="initiativeCount_`+ item.id + `"
				style="margin-bottom: 0px !important;"
			  >` + tableHeader +
		`	<tbody>
					`+ finalactualrows + `
				 </tbody>   
				</table>`;
	if (action === "download") {
		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		$(".page-loader-wrapper").css("display", "block");
		const element = document.getElementById("downloaddrillTablepdf");
		var opt = {
			filename: downloadpdftitle + '.pdf',
		};
		html2pdf().set(opt).from(element).save();
		$(".page-loader-wrapper").css("display", "none");
	} else if (action === "csvdownload") {
		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		var filename = downloadpdftitle + ".csv";
		var args = ['#downloadPdfView', filename];
		DownloadTableToCSV.apply($(".downloadcasfile"), args);
	} else {
		$(tableElement).empty();
		$(tableElement).append(body);
		if (tableid > 6) {
			$("#initiativeCount_" + item.id).paging({ limit: 5 });
		}
	}
}


function caldenderinitiativeblankcount(item, action) {
	var tableElement = $(".initiativeblankCount_" + item.id);
	$(".initiativeblankCount_" + item.id).find(".paging-nav").remove();
	var layoutType = item.dashBoardPreferencesValue.type;
	var initiative = ((item.dashBoardPreferencesValue.initiative != undefined && item.dashBoardPreferencesValue.initiative != "") ? item.dashBoardPreferencesValue.initiative : "");
	var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "Drill Down Table");
	$("#downloadpdftitle").text('');
	$("#downloadpdftitle").text(downloadpdftitle);
	var displayname = (item.dashBoardPreferencesValue.displayname != undefined ? item.dashBoardPreferencesValue.displayname : "Initiative Progress Count Table");
	var kpi = ((item.dashBoardPreferencesValue.kpis != undefined && item.dashBoardPreferencesValue.kpis != "") ? item.dashBoardPreferencesValue.kpis : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");
	var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
	var fieldvalue = "";
	var tablerow = "";
	var tableHeader = "";
	var quternamespan = 3;
	var removeperiodheader = "";
	var checkfielditems = [];

	/*
	 * if(item.dashBoardPreferencesValue.ytd == true){ quternamespan = 4;
	 * tableheader += '<th>YTD</th>'; }
	 */
	tableHeader = `<thead>
	<tr>`;
	if (item.dashBoardPreferencesValue.child == true) {
		tableHeader += `<th class="ibchild"
		style="width: 150px;">
		<strong
	   editable="true"
	   contenteditable="true"
	   onkeypress="return (this.innerText.length <= 36)"
		 >Child</strong
	   ></th>`
		checkfielditems.push(true);
	}


	if (item.dashBoardPreferencesValue.blankinitiativecount == true) {
		tableHeader += ` <th class="ip"
		style="width:50px;">
		<strong
		editable="true"
		contenteditable="true"
		onkeypress="return (this.innerText.length <= 25)"
		  >Blank</strong
		</th>`
		checkfielditems.push(true);
	}
	if (checkfielditems.length == 0) {
		quternamespan = 0;
		removeperiodheader = "style='display:none'";
	} else {
		quternamespan = checkfielditems.length;
	}
	tableHeader = tableHeader + "</tr></thead>"
	var tableid = 1;
	var quaterheaderrow = "";
	var quaterheaderbody = "";
	var finalactualrows = "";
	var wholetableheader = "";
	var wholetableduplicate = [];
	var rowcount = 0;
	var initiative = item.dashBoardPreferencesValue.initiative;
var filteredInitiative = "";

if (initiative && typeof initiative === "string") {
    // Filter out "All" and keep only valid integers
    filteredInitiative = initiative
        .split(",") // Split the string into an array
        .map(value => value.trim()) // Remove extra spaces
        .filter(value => value !== "All" && !isNaN(value) && Number.isInteger(Number(value))) // Exclude "All" and keep integers
        .join(","); // Join back into a comma-separated string
}

console.log(filteredInitiative);

	if (filteredInitiative != "") {
		$.ajax({
			//url: "/stratroom/formula/kpiList?tableFrequency="+measurement+"&responseGrouping=period",
			url: "/stratroom/initiativenoprogresscount/" + item.id + "?period=" + datarangechart,
			type: "get",
			async: false,
			contentType: "application/json",
			success: function (data, status) {
				finalactualrows = "";

				$.each(data, function (key, value) {
					quaterheaderbody = "";
					var rowi = 0;
					var pagingheader = 0;
					var rowspan = 1;
					if (value.childStatusCount) {
						rowspan = value.childStatusCount.length;
					}


					$.each(value.childStatusCount, function (index, objval) {
						var frequencyHeadertd = index;
						var measureKey;
						if (item.dashBoardPreferencesValue.child == true) {
							quaterheaderbody += `<td class="ibchild">` + objval.childName + `</td>`
						}
						if (item.dashBoardPreferencesValue.blankinitiativecount == true) {
							var initiativecountData = objval.blankinitiative;
							console.log(initiativecountData,"initiativecountData")
							var extractedcountInitiativeData = [];
							if (initiativecountData && initiativecountData.length > 0) {
								// Extract kpi_id and kpiName and create a new array
								extractedcountInitiativeData = initiativecountData.map(function (initiative) {
									return {
										initiativeCount_id: initiative.id, // Ensure 'id' matches the property name in your kpi objects
										initiativeCount_unique: initiative.initiativeId,
										initiativeName: initiative.initiativeValue.name, // Ensure 'kpiName' matches the property name in your kpi objects
										pageId: initiative.pageId,
										owner: initiative.owner
									};
								});
							}
							console.log(extractedcountInitiativeData,"extractedcountInitiativeData")
							var initiativeDatacountjsonString = JSON.stringify(extractedcountInitiativeData);
                            console.log(initiativeDatacountjsonString,"initiativeDatacountjsonString")
							quaterheaderbody += `<td class="ip"><a href="#" class="initiativeCount-count-link"  data-initiative='${initiativeDatacountjsonString}'>` +  objval.blankinitiativecount+ `</a></td>`
						}



						if (quaterheaderbody !== "") {
							quaterheaderbody = "<tr>" + quaterheaderbody + "</tr>";

						}

						tableid++;
						rowi++;
					});

					finalactualrows = finalactualrows + quaterheaderbody;
				});

			},
			error: readErrorMsg
		});

	}

	body = `<div id="maininitiativestatuscount"> <table
				class="table table-bordered w-100 table-centered initiativeblankCount"
				id="initiativeblankCount_`+ item.id + `"
				style="margin-bottom: 0px !important;"
			  >` + tableHeader +
		`	<tbody>
					`+ finalactualrows + `
				 </tbody>   
				</table></div><div id="subinitiativeCountTableContainer" style="display: none;">
				<button id="backInitiativeCountButton">Back</button>
				<table
				class="table table-bordered w-100 table-centered kpistatuscount"
				id="initiativesubstatuscount_`+ item.id + `"
				style="margin-bottom: 0px !important;">
				<thead><tr><th>Initiative ID</th><th>Initiative Name</th></tr></thead>
				<tbody id="subTableInitiativeCountStatus"></tbody>
				</table>
			</div>`;
	if (action === "download") {
		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		$(".page-loader-wrapper").css("display", "block");
		const element = document.getElementById("downloaddrillTablepdf");
		var opt = {
			filename: downloadpdftitle + '.pdf',
		};
		html2pdf().set(opt).from(element).save();
		$(".page-loader-wrapper").css("display", "none");
	} else if (action === "csvdownload") {
		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		var filename = downloadpdftitle + ".csv";
		var args = ['#downloadPdfView', filename];
		DownloadTableToCSV.apply($(".downloadcasfile"), args);
	} else {
		$(tableElement).empty();
		$(tableElement).append(body);
		if (tableid > 6) {
			$("#initiativeblankCount_" + item.id).paging({ limit: 5 });
		}
	}
}
function showInitiativeCountSubTable(initativeList, color) {
	let subTableHtml = ' ';

	initativeList.forEach(initiative => {
		subTableHtml += `<tr class="initiativeCount-detail-link" data-id="${initiative.initiativeCount_id}" data-pageid="${initiative.pageId}"  data-owner="${initiative.owner}"  style="cursor: pointer;">
                             <td>${initiative.initiativeCount_unique}</td>
                             <td>${initiative.initiativeName}</td>
                         </tr>`;
	});


	// Display the subtable in a designated area, for example, a modal or beneath the count table
	$('#subTableInitiativeCountStatus').html(subTableHtml);
}
$(document).on('click', '.initiativeCount-count-link', function (e) {
	e.preventDefault();
	const initiativeData = $(this).attr('data-initiative'); // Get the JSON string from data attribute
	console.log(initiativeData,"initiativeData")

	const initiativeList = JSON.parse(initiativeData); // Parse JSON string to an array
	// const color = $(this).data('color');

	console.log(initiativeList)
	showInitiativeCountSubTable(initiativeList);

	$('#maininitiativestatuscount').hide(); // Hide the main table
	$('#subinitiativeCountTableContainer').show(); // Show the subtable


	// Assuming you have a function to create and show the subtable
});
$(document).on('click', '.initiativeCount-detail-link', function () {
	const initiativeId = $(this).data('id');
	const pageId = $(this).data('pageid');
	const owner = $(this).data('owner');
	console.log(initiativeId,"initiativeId");
	console.log(pageId,"pageId");
	console.log(owner,"owner");
	// Navigate to the KPI detail page
	window.location.href = `/stratroom/dashboard/${owner}?pageId=${pageId}&initiativeId=${initiativeId}`; // Adjust the URL as needed
});

$(document).on('click', '#backInitiativeCountButton', function () {
	// Show the main table and hide the subtable
	showMainInitiativeCountTable();
});
function showMainInitiativeCountTable() {
	$('#subinitiativeCountTableContainer').hide(); // Hide the subtable
	$('#maininitiativestatuscount').show(); // Show the main table
	$('#maininitiativestatuscount').css("display", "block");

}
/**
 * Dynamic Load for Click-Through (Only appends child rows)
 * nodekey parameter removed as requested
 */
function kpiDrillTableLoadclickthru(item, measuretype, deptName, kpi, $clickedRow, $icon, periods) {
    var datarangechart = ((item.dashBoardPreferencesValue.datarangechart != undefined && item.dashBoardPreferencesValue.datarangechart != "") 
        ? item.dashBoardPreferencesValue.datarangechart : $("#datePeriod").val());
    var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") 
        ? item.dashBoardPreferencesValue.measurement : "Monthly");

    // Build query parameters WITHOUT nodeKey
    var queryparam = `kpi=${kpi}&period=${datarangechart}&tableFrequency=${measurement}&groupBy=Dept&tableType=dril`;
    
    // Removed: if (measuretype === "1") queryparam += `&nodeKey=${nodekey}`;
    
    if (deptName && deptName != "") queryparam += `&deptName=${deptName}`;

    $.ajax({
        url: "/stratroom/kpiDetailListMeasure?" + queryparam,
        type: "get",
        async: false,
        contentType: "application/json",
        success: function (data) {
            // Call generateChildRows without nodekey parameter
            var childRows = generateChildRows(item, data, measuretype, deptName, kpi, periods);
            if (childRows && childRows.trim() !== "") {
                $clickedRow.after(childRows);
            }
        },
        error: readErrorMsg
    });
}

function kpidataTableviewSuccesscallback(item, data, typeofoption) {

}

function populateorganization(imptype) {
	if (imptype === "Department") {
		$.ajax({
			url: "/stratroom/departmentReportees",
			async: false,
			success: function (departmentList) {
				$.each(departmentList, function (index, reportee) {
					addOption("#kpidrillOrg", reportee.name, reportee.id)
					addOption("#kpistatusOrg", reportee.name, reportee.id)
					addOption("#projectstatusOrg", reportee.name, reportee.id)
					addOption("#initiativeprogressOrg", reportee.name, reportee.id)
					addOption("#initiativenoprogressOrg", reportee.name, reportee.id)
					addOption("#reviewdept", reportee.name, reportee.id)

					addOption("#blankkpiOrg", reportee.name, reportee.id)

				});
			}
		});
	} else {
		$.ajax({
			url: "/stratroom/reporteeList",
			async: false,
			success: function (employeeList) {
				$.each(employeeList, function (index, reportee) {
					addOption("#kpidrillOrg", reportee.name, reportee.id)
					addOption("#kpistatusOrg", reportee.name, reportee.id)
					addOption("#projectstatusOrg", reportee.name, reportee.id)
					addOption("#initiativeprogressOrg", reportee.name, reportee.id)
					addOption("#initiativenoprogressOrg", reportee.name, reportee.id)
					addOption("#reviewdept", reportee.name, reportee.id)

					addOption("#blankkpiOrg", reportee.name, reportee.id)

				});
			}
		});
	}

}


function populatescorecard(classobj, imptype) {
	if (imptype === "Department") {
		$.ajax({
			url: "/stratroom/scoreCardListByDeptId",
			async: false,
			success: function (scorecardlist) {
				$.each(scorecardlist, function (index, score) {
					addOptionwparent("#kpidrillScorecard", score.name, score.id, score.org)
					addOptionwparent("#kpistatusScorecard", score.name, score.id, score.org)
					addOptionwparent("#blankkpiScorecard", score.name, score.id, score.org)

				});
			}
		});
	} else {
		$.ajax({
			url: "/stratroom/scoreCardListByEmpId",
			async: false,
			success: function (scorecardlist) {
				$.each(scorecardlist, function (index, score) {
					addOptionwparent("#kpidrillScorecard", score.name, score.id, score.org)
					addOptionwparent("#kpistatusScorecard", score.name, score.id, score.org)
					addOptionwparent("#blankkpiScorecard", score.name, score.id, score.org)

				});
			}
		});
	}

}


function populateinitiatives(classobj, imptype) {
	if (imptype === "Department") {
		$.ajax({
			url: "/stratroom/initiativesListwithChildByDeptId",
			async: false,
			success: function (scorecardlist) {
				$.each(scorecardlist, function (index, score) {
					console.log(index)
					addOptionwparent("#projectstatusinitiatives", score.initiativeValue.name, score.id, score.departmentId)
					addOptionwparent("#initiativeprogressinitiatives", score.initiativeValue.name, score.id, score.departmentId)
					addOptionwparent("#initiativenoprogressinitiatives", score.initiativeValue.name, score.id, score.departmentId)

				});
			}
		});
	} else {
		$.ajax({
			url: "/stratroom/initiativesListwithChildByempId",
			async: false,
			success: function (scorecardlist) {
				$.each(scorecardlist, function (index, score) {
					console.log(index)
					addOptionwparent("#projectstatusinitiatives", score.initiativeValue.name, score.id, score.owner)
					addOptionwparent("#initiativeprogressinitiatives", score.initiativeValue.name, score.id, score.owner)
					addOptionwparent("#initiativenoprogressinitiatives", score.initiativeValue.name, score.id, score.owner)

				});
			}
		});
	}

}



function populatekpi(classobj, imptype) {
	if (imptype === "Department") {
		$.ajax({
			url: "/stratroom/checkkpiListByDeptId",
			async: false,
			success: function (scorecardlist) {
				addOptionwparent(classobj, "All KPI", "all", "all")

				$.each(scorecardlist, function (index, score) {
					addOptionwparent(classobj, score.name, score.id, score.scorecardId)
				});

			}
		});
	} else {
		$.ajax({
			url: "/stratroom/checkkpiListByEmpId",
			async: false,
			success: function (scorecardlist) {
				addOptionwparent(classobj, "All KPI", "all", "all")

				$.each(scorecardlist, function (index, score) {
					addOptionwparent(classobj, score.name, score.id, score.scorecardId)

				});

			}
		});
	}

}






function dataKpiDrillviewSuccesscallback(item, data, typeofoption) {
    var layoutType = item.dashBoardPreferencesValue.type;
    var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "KPI Drilldown Table");
    $("#downloadpdftitle").text(downloadpdftitle);

    if (layoutType !== "kpidrilltable") {
        alert("Unsupported layout type for PDF");
        return;
    }

    // --- Build Table HTML ---
    var tableheader = "";
    var finalrows = "";
    var checkfields = [];
    var quternamespan = 0;

    if (item.dashBoardPreferencesValue.actual) checkfields.push("Actual");
    if (item.dashBoardPreferencesValue.target) checkfields.push("Target");
    if (item.dashBoardPreferencesValue.gap) checkfields.push("Gap");
    if (item.dashBoardPreferencesValue.score) checkfields.push("Index");
    if (item.dashBoardPreferencesValue.ytd) checkfields.push("YTD");

    quternamespan = checkfields.length;

    // Build table rows
    $.each(data, function (key, value) {
        $.each(value, function (period, objval) {
            var row = "<tr><td>" + period + "</td>";
            if (item.dashBoardPreferencesValue.actual) {
                row += `<td class="${objval.actual < 0 ? 'negativeHighlight' : ''}">${objval.currency || ''}${objval.actual || ''}</td>`;
            }
            if (item.dashBoardPreferencesValue.target) {
                row += `<td class="${objval.target < 0 ? 'negativeHighlight' : ''}">${objval.currency || ''}${objval.target || ''}</td>`;
            }
            if (item.dashBoardPreferencesValue.gap) {
                row += `<td class="${objval.gap < 0 ? 'negativeHighlight' : ''}">${objval.currency || ''}${objval.gap || ''}</td>`;
            }
            if (item.dashBoardPreferencesValue.score) {
                row += `<td class="${objval.score < 0 ? 'negativeHighlight' : ''}">${objval.score || ''}</td>`;
            }
            if (item.dashBoardPreferencesValue.ytd) {
                row += `<td class="${objval.ytd < 0 ? 'negativeHighlight' : ''}">${objval.currency || ''}${objval.ytd || ''}</td>`;
            }
            row += "</tr>";
            finalrows += row;
        });
    });

    var tableHTML = `
        <table id="kpiDrillTablePdf" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Period</th>
                    ${checkfields.map(f => `<th>${f}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${finalrows}
            </tbody>
        </table>
    `;

    // Inject table in hidden container for autoTable
    var $pdfContainer = $("#downloadPdfView");
    if ($pdfContainer.length === 0) {
        $pdfContainer = $('<div id="downloadPdfView" style="display:none;"></div>').appendTo('body');
    }
    $pdfContainer.html(tableHTML);

    if (typeofoption === "download") {
        $(".page-loader-wrapper").css("display", "block");

         const { jsPDF } = window.jspdf;
const pdf = new jsPDF("l", "mm", "a3");
const pageWidth = pdf.internal.pageSize.width;
const pageHeight = pdf.internal.pageSize.height;
const marginRight = pageWidth - 10;
const submissionDate = new Date().toLocaleDateString();
const logoUrl = document.getElementById("appLogo")?.src || "/stratroom/images/logo.png";
const reportOwnerName = item.dashBoardPreferencesValue.ownerName || "Unknown";

// Get Primary Color from LocalStorage
const primaryColor = localStorage.getItem("stratroomPrimaryColor") || "#000000";

// Helper to convert Hex to RGB array for fill colors (autoTable & setFillColor)
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0]; // Fallback to black
}

const primaryColorRgb = hexToRgb(primaryColor);

function addHeader() {
    try { pdf.addImage(logoUrl, "PNG", 10, 5, 40, 10); } catch (e) {}
    
    // Set Header Text Color
    pdf.setTextColor(primaryColor); 
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text(downloadpdftitle, marginRight, 10, { align: "right" });
    
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Owner: ${reportOwnerName}`, marginRight, 16, { align: "right" });
    pdf.text(`Generated: ${submissionDate}`, marginRight, 21, { align: "right" });
    
    // Set Header Line Color
    pdf.setDrawColor(primaryColor);
    pdf.line(10, 25, pageWidth - 10, 25);
    
    // Reset text color to default black for body content (optional, autoTable usually handles this)
    pdf.setTextColor(0, 0, 0); 
    return 30;
}

function addFooter(page, total) {
    // Set Footer Background Color
    pdf.setFillColor(...primaryColorRgb);
    pdf.rect(0, pageHeight - 12, pageWidth, 12, "F");
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text(downloadpdftitle, 10, pageHeight - 5);
    pdf.text(`Page ${page} of ${total}`, pageWidth - 10, pageHeight - 5, { align: "right" });
}

const startY = addHeader();
pdf.autoTable({
    html: "#downloadPdfView",
    startY: startY,
    styles: { fontSize: 7, cellPadding: 2, halign: "center" },
    headStyles: { 
        fillColor: primaryColorRgb, // Use RGB array for table header
        textColor: 255, 
        fontStyle: "bold" 
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    columnStyles: { 4: { cellWidth: 60 } }
});

const totalPages = pdf.internal.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    addFooter(i, totalPages);
}

        pdf.save(`${downloadpdftitle}.pdf`);
        $(".page-loader-wrapper").css("display", "none");
    }
}
function dataTablecsvdownloadSuccesscallback(item, data, typeofoption) {
	var layoutType = item.dashBoardPreferencesValue.type;
	var formula = ((item.dashBoardPreferencesValue.formula != undefined && item.dashBoardPreferencesValue.formula != "") ? item.dashBoardPreferencesValue.formula : "");
	var fieldName = ((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "") ? item.dashBoardPreferencesValue.fieldName : "");

	if (layoutType == "drilltable") {
		var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "Drill Down Table");
		$("#downloadpdftitle").text('');
		$("#downloadpdftitle").text(downloadpdftitle);

		var tablerow = "";
		var tableheader = "";
		var quternamespan = 3;
		var removeperiodheader = "";
		var checkfielditems = [];

		if (item.dashBoardPreferencesValue.actual == true) {
			tableheader += '<td data-i18n="Actual">Actual</td>';
			checkfielditems.push(true);
		}
		if (item.dashBoardPreferencesValue.target == true) {
			tableheader += '<td data-i18n="Target">Target</td>';
			checkfielditems.push(true);
		}
		if (item.dashBoardPreferencesValue.gap == true) {
			tableheader += '<td data-i18n="Gap">Gap</td>';
			checkfielditems.push(true);
		}
		if (checkfielditems.length == 3) {
			quternamespan = 3;
		} else if (checkfielditems.length == 2) {
			quternamespan = 2;
		} else if (checkfielditems.length == 1) {
			quternamespan = 1;
		} else if (checkfielditems.length == 0) {
			quternamespan = 0;
			removeperiodheader = "style='display:none'";
		}
		var frequencyTable = "";
		var tableid = 1;
		var quaterheaderrow = "";
		var quaterheaderbody = "";
		var finalactualrows = "";
		var wholetableheader = "";
		var wholetableduplicate = [];
		var rowcount = 0;
		var measurement = ((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "") ? item.dashBoardPreferencesValue.measurement : "Monthly");

		$.each(data, function (key, value) {
			var rowi = 0;
			var pagingheader = 0;
			quaterheaderbody = "";
			$.each(value, function (index, objval) {
				var frequencyHeadertd = index;
				quaterheaderrow += "<td>Name/Period</td>";
				quaterheader = "";
				quaterheader += '<td style="font-weight: bold;text-align:center;">' + frequencyHeadertd + '</td>';
				var updown = (objval.gapStatus == "fas fa-arrow-down" ? "down" : "up");
				quaterheaderbody += "<tr><td class='scrolldrill1'>" + frequencyHeadertd + "</td>";
				if (objval != "" && objval != undefined) {
					$.each(objval, function (periodindex, quarterobj) {
						if (periodindex != "overallGap" && periodindex != "gapStatus" && periodindex != "") {
							if (jQuery.inArray(periodindex, wholetableduplicate) == -1) {
								wholetableduplicate.push(periodindex);

								if (item.dashBoardPreferencesValue.actual == true && item.dashBoardPreferencesValue.target == true && item.dashBoardPreferencesValue.gap == true) {
									wholetableheader += `<td></td><td>` + periodindex + `</td><td></td>`;
								} else if (item.dashBoardPreferencesValue.actual == true && item.dashBoardPreferencesValue.target == true && item.dashBoardPreferencesValue.gap == false) {
									wholetableheader += `<td></td><td>` + periodindex + `</td>`;
								} else if (item.dashBoardPreferencesValue.actual == false && item.dashBoardPreferencesValue.target == true && item.dashBoardPreferencesValue.gap == true) {
									wholetableheader += `<td></td><td>` + periodindex + `</td>`;
								} else if (item.dashBoardPreferencesValue.actual == true && item.dashBoardPreferencesValue.target == false && item.dashBoardPreferencesValue.gap == true) {
									wholetableheader += `<td></td><td>` + periodindex + `</td>`;
								} else if (item.dashBoardPreferencesValue.actual == false && item.dashBoardPreferencesValue.target == false && item.dashBoardPreferencesValue.gap == true) {
									wholetableheader += `<td>` + periodindex + `</td>`;
								} else if (item.dashBoardPreferencesValue.actual == true && item.dashBoardPreferencesValue.target == false && item.dashBoardPreferencesValue.gap == false) {
									wholetableheader += `<td>` + periodindex + `</td>`;
								} else if (item.dashBoardPreferencesValue.actual == false && item.dashBoardPreferencesValue.target == true && item.dashBoardPreferencesValue.gap == false) {
									wholetableheader += `<td>` + periodindex + `</td>`;
								} else if (item.dashBoardPreferencesValue.actual == false && item.dashBoardPreferencesValue.target == false && item.dashBoardPreferencesValue.gap == false) {
									wholetableheader += ``;
								} else {
									wholetableheader += `<td>` + periodindex + `</td>`;
								}
							}

							var actualbody = (quarterobj.actual != undefined ? quarterobj.actual : "");
							var targetbody = (quarterobj.target != undefined ? quarterobj.target : "");
							var gapbody = (quarterobj.gap != undefined ? quarterobj.gap : "");
							var ytdbody = (quarterobj.ytd != undefined ? quarterobj.ytd : "");
							var scorebody = (quarterobj.score != undefined ? quarterobj.score : "");

							var gapStatus = (quarterobj.gapStatus != undefined ? quarterobj.gapStatus : "");
							var actualcolorhighlight = (checkPositiveorNegative(actualbody) == 1 ? "negativeHighlight" : "");
							var targetcolorhighlight = (checkPositiveorNegative(targetbody) == 1 ? "negativeHighlight" : "");
							var gapcolorhighlight = (checkPositiveorNegative(gapbody) == 1 ? "negativeHighlight" : "");
							var ytdcolorhighlight = (checkPositiveorNegative(ytdbody) == 1 ? "negativeHighlight" : "");

							if (targetbody != "" || actualbody != "" || gapbody != "") {
								if (item.dashBoardPreferencesValue.actual == true) {
									quaterheaderrow += "<td data-i18n='Actual'>Actual</td>";
									quaterheaderbody += "<td class=" + actualcolorhighlight + ">" + quarterobj.currency + actualbody + "</td>";
								}
								if (item.dashBoardPreferencesValue.target == true) {
									quaterheaderrow += "<td data-i18n='Target'>Target</td>";
									quaterheaderbody += "<td class=" + targetcolorhighlight + ">" + quarterobj.currency + targetbody + "</td>";
								}
								if (item.dashBoardPreferencesValue.gap == true) {
									quaterheaderrow += "<td data-i18n='Gap'>Gap</td>";
									quaterheaderbody += "<td class=" + gapcolorhighlight + ">" + quarterobj.currency + gapbody + "</td>";
								}
							}
							if (rowi == 0) {
								rowcount++;
							}
						}
					});
				}
				quaterheaderbody = quaterheaderbody + "</tr>";
				tableid++;
				rowi++;
			});
			finalactualrows = finalactualrows + quaterheaderbody;
		});
		var tableHeader = "";
		if (finalactualrows == "") {
			tableHeader = `
						  <tr>
							<td style="width: 198px;">
							  Name/Period
							</td>
							<td colspan="`+ quternamespan + `">
							  `+ measurement + `
							</td>
						  </tr>
						  <tr>
							`+ tableheader + `
						  </tr>`;
		}

		body = `<table>
              	<tr>
                <td></td>
                    `+ wholetableheader + `
                </tr>
                <tr>
                    `+ quaterheaderrow + `
                </tr>
                    `+ finalactualrows + `   
                </table>`;

		$("#downloadPdfView").empty();
		$("#downloadPdfView").html(body);
		var filename = downloadpdftitle + ".csv";
		var args = ['#downloadPdfView', filename];
		DownloadTableToCSV.apply($(".downloadcasfile"), args);

	} else {

		var downloadpdftitle = ((item.dashBoardPreferencesValue.chartdisplayname != undefined && item.dashBoardPreferencesValue.chartdisplayname != "") ? item.dashBoardPreferencesValue.chartdisplayname : "Data Table");
		$("#downloadpdftitle").text('');
		$("#downloadpdftitle").text(downloadpdftitle);
		var tableheader = "";
		if (item.dashBoardPreferencesValue.actual == true) {
			tableheader += '<th data-i18n="Actual">Actual</th>';
		}
		if (item.dashBoardPreferencesValue.target == true) {
			tableheader += '<th data-i18n="Target">Target</th>';
		}
		if (item.dashBoardPreferencesValue.gap == true) {
			tableheader += '<th data-i18n="Gap">Gap</th>';
		}
		if (item.dashBoardPreferencesValue.scpre == true) {
			tableheader += '<th data-i18n="Index">Index</th>';
		}
		if (item.dashBoardPreferencesValue.ytd == true) {
			tableheader += '<th data-i18n="YTD">YTD</th>';
		}

		$.each(data, function (key, value) {
			$.each(value, function (index, objval) {
				var actualbody = (objval.actual != undefined ? objval.actual : "");
				var targetbody = (objval.target != undefined ? objval.target : "");
				var gapbody = (objval.gap != undefined ? objval.gap : "");
				var ytdbody = (objval.ytd != undefined ? objval.ytd : "");
				var scorebody = (objval.score != undefined ? objval.score : "");

				var actualcolorhighlight = (checkPositiveorNegative(actualbody) == 1 ? "negativeHighlight" : "");
				var targetcolorhighlight = (checkPositiveorNegative(targetbody) == 1 ? "negativeHighlight" : "");
				var gapcolorhighlight = (checkPositiveorNegative(gapbody) == 1 ? "negativeHighlight" : "");
				var ytdcolorhighlight = (checkPositiveorNegative(ytdbody) == 1 ? "negativeHighlight" : "");
				var scorecolorhighlight = (checkPositiveorNegative(scorebody) == 1 ? "negativeHighlight" : "");

				if (targetbody != "" || actualbody != "" || gapbody != "" || ytdbody != "" || scorebody != "") {
					tablerow += "<tr><td>" + index + "</td>";
					if (item.dashBoardPreferencesValue.actual == true) {
						tablerow += "<td class=" + actualcolorhighlight + ">" + objval.currency + actualbody + "</td>";
					}
					if (item.dashBoardPreferencesValue.target == true) {
						tablerow += "<td class=" + targetcolorhighlight + ">" + objval.currency + targetbody + "</td>";
					}
					if (item.dashBoardPreferencesValue.gap == true) {
						tablerow += "<td class=" + gapcolorhighlight + ">" + objval.currency + gapbody + "</td>";
					}
					if (item.dashBoardPreferencesValue.score == true) {
						tablerow += "<td class=" + scorecolorhighlight + ">" + scorebody + "</td>";
					}
					if (item.dashBoardPreferencesValue.ytd == true) {
						tablerow += "<td class=" + ytdcolorhighlight + ">" + objval.currency + ytdbody + "</td>";
					}
					tablerow += "</tr>";

				}
			});
		});
		var filename = downloadpdftitle + ".csv";
		var body = `<tr>
					<th style="width: 80px;" data-i18n="Period">Period</th>
					`+ tableheader + `
				  </tr>`+ tablerow;
		$("#dataTableView").html(body);
		var args = ['#dataTableView', filename];
		DownloadTableToCSV.apply($(".downloadcasfile"), args);
	}
}
