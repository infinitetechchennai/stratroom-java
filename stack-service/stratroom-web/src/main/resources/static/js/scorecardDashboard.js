var departmentSelectId = document.getElementById('department_selectdw');
var pageSelectId = document.getElementById('page_selectdw');
var departmentValue = "";
var PERSPECTIVES = [];


let kpiTable;

function sdFilter(btn, status) {

  if (!kpiTable) {
    kpiTable = $('#sdKpiTable').DataTable();
  }

  // remove active class
  document.querySelectorAll('.sc-filter-btn')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');

  if (status == 'all') {
   console.log("all this is called");
    kpiTable.column(6).search('', true, false).draw();
  } else {
    console.log("this is called");
    kpiTable.column(6)
      .search(status, true, false) 
      .draw();
  }
}

function getDepartment() {
  $.ajax({
    type: "GET",
    url: "/stratroom/departmentReportees",
    success: function (data) {

      $('#department_selectdw').find('option:not(:first)').remove();

      $.each(data, function (index, module) {

        var option = document.createElement('option');
        option.value = module.id;
        option.textContent = module.name;

        departmentSelectId.appendChild(option);
      });

      // Select2 init
      if (!$('#department_selectdw').hasClass("select2-hidden-accessible")) {
        $('#department_selectdw').select2({
          placeholder: "Select Department",
          width: 'resolve'
        });
      } else {
        $('#department_selectdw').trigger('change.select2');
      }

      if (!$('#page_selectdw').hasClass("select2-hidden-accessible")) {
        $('#page_selectdw').select2({
          placeholder: "Select",
          width: 'resolve'
        });
      } else {
        $('#page_selectdw').trigger('change.select2');
      }
    }
  });
}

$('#department_selectdw').on('change', function () {

  var selectedDepartment = $(this).val();
  departmentValue = selectedDepartment;

  if (selectedDepartment) {
    loadPages(selectedDepartment);
  } else {
    $('#page_selectdw').html('<option value="">Select Page</option>');
  }
});

function loadPages(departmentId) {

  $('#page_selectdw').find('option:not(:first)').remove();

  $.ajax({
    type: "GET",
    url: "/stratroom/pageDeptList/" + departmentId + "?pageType=scorecard",
    success: function (data) {

      $.each(data, function (index, module) {

        var option = document.createElement('option');
        option.value = module.id;
        option.textContent = module.pageName;

        pageSelectId.appendChild(option);
      });

      if (!$('#page_selectdw').hasClass("select2-hidden-accessible")) {
        $('#page_selectdw').select2({
          placeholder: "Select Page",
          width: 'resolve'
        });
      } else {
        $('#page_selectdw').trigger('change.select2');
      }
    }
  });
}

$('#page_selectdw').on('change', function () {
  const selectedpage = $(this).val();

  if (selectedpage) {
    fetchStrategyMap(selectedpage);

    let selectedPageName = $(this).find('option:selected').text();
    if ((!selectedPageName || selectedPageName.trim() == '') && $(this).data('select2')) {
      const data = $(this).select2('data');
      if (data && data.length > 0 && data[0].text) {
        selectedPageName = data[0].text;
      }
    }

    // Update title and UI
    if (selectedPageName) {
      $('#scorecardtitle, .scorecardname').text(selectedPageName);
      const scorecardhtmlcontent =
        `${selectedPageName}<span class="scorecard_status scorecardname" style="background-color:#1aa243"></span>`;
      $(".pageTitleStatus").html(scorecardhtmlcontent);
    }
  } else {
    $('#scorecardtitle, .scorecardname').text('');
    $(".pageTitleStatus").empty();
  }
});

function fetchStrategyMap(selectedpage) { 
     console.log(selectedpage, "selectedPage");
  var pageno = selectedpage;
  var datePeriod = $('#datePeriod').val();
  datePeriod = datePeriod.replace(/\s+/g, '');

  if (pageno == null) {
    pageno = $('#pagenumber').val();
  }

  var pageUrl = "";
  // if (pageno != undefined) {
  //   pageUrl = "/stratroom/scoreCardList?pageId=" + pageno + "&dateRange=" + datePeriod;
  // }

  if (pageno != undefined) {
    pageUrl = "/stratroom/Strategy/"+ pageno + "?dateRange=" + datePeriod;
  }

  $.ajax({
    type: "GET",
    url: pageUrl,
    success: function (data) { 
        const dataaa = [
    {
        "id": 4465,
        "createdBy": 2241,
        "scorecardName": "2026-2029 Strategic Plan",
        "perspectiveType": "Inclusive Digital Connectivity corporation Data Text",
        "perspectiveId": "SOU 1.1",
        "updatedBy": 2241,
        "createdTime": "2026-03-03T05:22:01",
        "updatedTime": "2026-03-05T10:40:15",
        "scoreCardValue": {
            "header4": "Target",
            "header3": "Actual",
            "createdByName": "Nizam Goolam",
            "header2": "Period",
            "header1": "ID",
            "updatedByName": "Nizam Goolam",
            "weight": 0,
            "header5": "Trend",
            "perspective_start_end_date": "04/01/2025 - 03/31/2029",
            "defaultscr": true,
            "ownerName": "Nizam Goolam",
            "name": "Inclusive Digital Connectivity corporation Data Text",
            "perspectiveType": "Inclusive Digital Connectivity corporation Data Text",
            "status": "Weighted",
            "statusLight": "RED",
            "statusLightFlagvalue": "red fas fa-flag",
            "statusLightFlag": "rgba(255, 26, 9, 1)"
        },
        "active": 0,
        "owner": 2241,
        "objectiveList": [
            {
                "id": 287,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Advance Digital Inclusion Through Robust ICT Infrastructure Affordability And Digital Skills Development",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 0,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:01",
                "updatedTime": "2026-03-05T10:40:15",
                "owner": 2241,
                "scoreCardId": 4465,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Advance Digital Inclusion Through Robust ICT Infrastructure Affordability And Digital Skills Development",
                "kpiList": [
                    {
                        "id": 1592,
                        "createdBy": 2241,
                        "kpiName": "Completion Of The Affordability Report Within The Set Timeline",
                        "kpiFormula": {
                            "formula": "avg[Completion Of The Affordability Report Within The Set Timeline]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:01",
                        "updatedTime": "2026-03-05T10:40:14",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Completion Of The Affordability Report Within The Set Timeline]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Completion Of The Affordability Report Within The Set Timeline",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "trend": "fas fa-arrow-down",
                            "actual": "8%",
                            "gap": "-32%",
                            "thresholdResult": "20.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 287,
                        "kpiId": "OP 6",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1593,
                        "createdBy": 2241,
                        "kpiName": "Completion Of Empowerment Strategies Document Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Completion Of Empowerment Strategies Document Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:01",
                        "updatedTime": "2026-03-05T10:40:14",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Completion Of Empowerment Strategies Document Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Completion Of Empowerment Strategies Document Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 287,
                        "kpiId": "OP 10",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1594,
                        "createdBy": 2241,
                        "kpiName": "% Empowerment Strategies Implemented_Adopted",
                        "kpiFormula": {
                            "formula": "avg[% Empowerment Strategies Implemented_Adopted]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:01",
                        "updatedTime": "2026-03-05T10:40:15",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "4%",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Empowerment Strategies Implemented_Adopted]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Empowerment Strategies Implemented_Adopted",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-4%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 287,
                        "kpiId": "OP 11",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1595,
                        "createdBy": 2241,
                        "kpiName": "# Of SMMEs_Individuals Within Vulnerable Groups Empowered On Digital Economy",
                        "kpiFormula": {
                            "formula": "sum[# Of SMMEs_Individuals Within Vulnerable Groups Empowered On Digital Economy]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:01",
                        "updatedTime": "2026-03-05T10:40:15",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "200",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of SMMEs_Individuals Within Vulnerable Groups Empowered On Digital Economy]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of SMMEs_Individuals Within Vulnerable Groups Empowered On Digital Economy",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": "-200",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 287,
                        "kpiId": "OP 12",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 1.1.1",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            },
            {
                "id": 288,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Promote Innovation And Modernization In Postal Courier Services To Support Inclusive Digital Transformation",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 0,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:01",
                "updatedTime": "2026-03-05T10:40:15",
                "owner": 2241,
                "scoreCardId": 4465,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Promote Innovation And Modernization In Postal Courier Services To Support Inclusive Digital Transformation",
                "kpiList": [
                    {
                        "id": 1596,
                        "createdBy": 2241,
                        "kpiName": "# Of Partnerships Supporting Digital Inclusion",
                        "kpiFormula": {
                            "formula": "sum[# Of Partnerships Supporting Digital Inclusion]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:01",
                        "updatedTime": "2026-03-05T10:40:15",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "251",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of Partnerships Supporting Digital Inclusion]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of Partnerships Supporting Digital Inclusion",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": "-251",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 288,
                        "kpiId": "OP 16",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1597,
                        "createdBy": 2241,
                        "kpiName": "# Of Pilot Projects Implemented",
                        "kpiFormula": {
                            "formula": "sum[# Of Pilot Projects Implemented]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:01",
                        "updatedTime": "2026-03-05T10:40:15",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "3",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of Pilot Projects Implemented]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of Pilot Projects Implemented",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": "-3",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 288,
                        "kpiId": "OP 17",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 1.1.2",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            }
        ],
        "pageId": 3628,
        "includeReportee": false,
        "startDate": "2025-04-01T00:00:00.000+0000",
        "endDate": "2029-03-31T00:00:00.000+0000",
        "scoreCardDetailsId": 47
    },
    {
        "id": 4466,
        "createdBy": 2241,
        "scorecardName": "2026-2029 Strategic Plan",
        "perspectiveType": "Enabled Regulatory Environment",
        "perspectiveId": "SOU 2.1",
        "updatedBy": 2241,
        "createdTime": "2026-03-03T05:22:02",
        "updatedTime": "2026-03-05T10:40:23",
        "scoreCardValue": {
            "header4": "Target",
            "header3": "Actual",
            "createdByName": "Nizam Goolam",
            "header2": "Period",
            "header1": "ID",
            "updatedByName": "Nizam Goolam",
            "weight": 0,
            "header5": "Trend",
            "perspective_start_end_date": "04/01/2025 - 03/31/2029",
            "defaultscr": true,
            "ownerName": "Nizam Goolam",
            "name": "Enabled Regulatory Environment",
            "perspectiveType": "Enabled Regulatory Environment",
            "status": "Weighted",
            "statusLight": "RED",
            "statusLightFlagvalue": "red fas fa-flag",
            "statusLightFlag": "rgba(255, 26, 9, 1)"
        },
        "active": 0,
        "owner": 2241,
        "objectiveList": [
            {
                "id": 289,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Improve Regulatory Services_Delivering Effective and Responsive Service In A Timely Manner",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 12.5,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:02",
                "updatedTime": "2026-03-05T10:40:16",
                "owner": 2241,
                "scoreCardId": 4466,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Improve Regulatory Services_Delivering Effective and Responsive Service In A Timely Manner",
                "kpiList": [
                    {
                        "id": 1598,
                        "createdBy": 2241,
                        "kpiName": "# Of Stakeholder Consultations Conducted Per Regulatory Instrument Per Year",
                        "kpiFormula": {
                            "formula": "sum[# Of Stakeholder Consultations Conducted Per Regulatory Instrument Per Year]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:15",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of Stakeholder Consultations Conducted Per Regulatory Instrument Per Year]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of Stakeholder Consultations Conducted Per Regulatory Instrument Per Year",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 289,
                        "kpiId": "OP 20",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1599,
                        "createdBy": 2241,
                        "kpiName": "Charter Developed And Approved Within The Set Timeline",
                        "kpiFormula": {
                            "formula": "avg[Charter Developed And Approved Within The Set Timeline]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:15",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "33.33%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Charter Developed And Approved Within The Set Timeline]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Charter Developed And Approved Within The Set Timeline",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "trend": "fas fa-arrow-down",
                            "actual": "10%",
                            "gap": "-23.33%",
                            "thresholdResult": "30.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 289,
                        "kpiId": "OP 21",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1600,
                        "createdBy": 2241,
                        "kpiName": "% Of Internal And External Stakeholders Sensitized On Charter Standards",
                        "kpiFormula": {
                            "formula": "avg[% Of Internal And External Stakeholders Sensitized On Charter Standards]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:16",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of Internal And External Stakeholders Sensitized On Charter Standards]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of Internal And External Stakeholders Sensitized On Charter Standards",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 289,
                        "kpiId": "OP 22",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1601,
                        "createdBy": 2241,
                        "kpiName": "% Compliance With Service Charter Standards",
                        "kpiFormula": {
                            "formula": "avg[% Compliance With Service Charter Standards]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:16",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "53.33%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Compliance With Service Charter Standards]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Compliance With Service Charter Standards",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "trend": "fas fa-arrow-down",
                            "actual": "5%",
                            "gap": "-48.33%",
                            "thresholdResult": "9.38",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 289,
                        "kpiId": "OP 23",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 2.1.1",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            },
            {
                "id": 290,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Strengthen Stakeholder Engagement And Collaboration",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 0,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:02",
                "updatedTime": "2026-03-05T10:40:23",
                "owner": 2241,
                "scoreCardId": 4466,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Strengthen Stakeholder Engagement And Collaboration",
                "kpiList": [
                    {
                        "id": 1602,
                        "createdBy": 2241,
                        "kpiName": "Approved Stakeholder Engagement Framework Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Approved Stakeholder Engagement Framework Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:16",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Approved Stakeholder Engagement Framework Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Approved Stakeholder Engagement Framework Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 27",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1603,
                        "createdBy": 2241,
                        "kpiName": "# Of MoUs Or Collaborations Established",
                        "kpiFormula": {
                            "formula": "sum[# Of MoUs Or Collaborations Established]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:16",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "101",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of MoUs Or Collaborations Established]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of MoUs Or Collaborations Established",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": "-101",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 28",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1604,
                        "createdBy": 2241,
                        "kpiName": "# Of Regional Exercises Participated In",
                        "kpiFormula": {
                            "formula": "sum[# Of Regional Exercises Participated In]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:16",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of Regional Exercises Participated In]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of Regional Exercises Participated In",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 31",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1605,
                        "createdBy": 2241,
                        "kpiName": "Corporate Communication And Branding Strategy Approved Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Corporate Communication And Branding Strategy Approved Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:16",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Corporate Communication And Branding Strategy Approved Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Corporate Communication And Branding Strategy Approved Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 32",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1606,
                        "createdBy": 2241,
                        "kpiName": "% Of Annual Communication And Branding Activities As Per Approved Plan",
                        "kpiFormula": {
                            "formula": "avg[% Of Annual Communication And Branding Activities As Per Approved Plan]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:02",
                        "updatedTime": "2026-03-05T10:40:16",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "36%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of Annual Communication And Branding Activities As Per Approved Plan]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of Annual Communication And Branding Activities As Per Approved Plan",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-36%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 33",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1607,
                        "createdBy": 2241,
                        "kpiName": "Official Brand Guideline Manual Developed Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Official Brand Guideline Manual Developed Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:03",
                        "updatedTime": "2026-03-05T10:40:17",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Official Brand Guideline Manual Developed Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Official Brand Guideline Manual Developed Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 34",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1608,
                        "createdBy": 2241,
                        "kpiName": "Compliance To Brand Guidelines",
                        "kpiFormula": {
                            "formula": "avg[Compliance To Brand Guidelines]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:03",
                        "updatedTime": "2026-03-05T10:40:17",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "64%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Compliance To Brand Guidelines]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Compliance To Brand Guidelines",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-64%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 35",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1609,
                        "createdBy": 2241,
                        "kpiName": "Website Launched And Operational Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Website Launched And Operational Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:03",
                        "updatedTime": "2026-03-05T10:40:17",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "34%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Website Launched And Operational Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Website Launched And Operational Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-34%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 36",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1610,
                        "createdBy": 2241,
                        "kpiName": "Growth In Website Traffic And Engagement Metrics_%",
                        "kpiFormula": {
                            "formula": "avg[Growth In Website Traffic And Engagement Metrics_%]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:03",
                        "updatedTime": "2026-03-05T10:40:17",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Growth In Website Traffic And Engagement Metrics_%]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Growth In Website Traffic And Engagement Metrics_%",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 37",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1611,
                        "createdBy": 2241,
                        "kpiName": "% Increase In Followers And Engagement On Social Media Platforms",
                        "kpiFormula": {
                            "formula": "avg[% Increase In Followers And Engagement On Social Media Platforms]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:03",
                        "updatedTime": "2026-03-05T10:40:17",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "7.4%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Increase In Followers And Engagement On Social Media Platforms]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Increase In Followers And Engagement On Social Media Platforms",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-7.4%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 38",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1612,
                        "createdBy": 2241,
                        "kpiName": "% Stakeholder Satisfaction",
                        "kpiFormula": {
                            "formula": "avg[% Stakeholder Satisfaction]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:03",
                        "updatedTime": "2026-03-05T10:40:17",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "34%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Stakeholder Satisfaction]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Stakeholder Satisfaction",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-34%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 41",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1613,
                        "createdBy": 2241,
                        "kpiName": "% Of Implemented Recommendations From The Survey Results",
                        "kpiFormula": {
                            "formula": "avg[% Of Implemented Recommendations From The Survey Results]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:03",
                        "updatedTime": "2026-03-05T10:40:18",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "8.57%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of Implemented Recommendations From The Survey Results]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of Implemented Recommendations From The Survey Results",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "green fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "trend": "fas fa-arrow-up",
                            "actual": "250%",
                            "gap": "241.43%",
                            "thresholdResult": "2917.15",
                            "statusLightFlag": "rgba(2, 125, 2, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 42",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1648,
                        "createdBy": 2241,
                        "kpiName": "% Of NAS Milestones Achieved With The Regulator_s Input",
                        "kpiFormula": {
                            "formula": "avg[% Of NAS Milestones Achieved With The Regulator_s Input]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:08",
                        "updatedTime": "2026-03-05T10:40:23",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "20%",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of NAS Milestones Achieved With The Regulator_s Input]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of NAS Milestones Achieved With The Regulator_s Input",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-20%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 29",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1649,
                        "createdBy": 2241,
                        "kpiName": "4 Coordination Sessions Held Annually",
                        "kpiFormula": {
                            "formula": "avg[4 Coordination Sessions Held Annually]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:08",
                        "updatedTime": "2026-03-05T10:40:23",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[4 Coordination Sessions Held Annually]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "4 Coordination Sessions Held Annually",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 290,
                        "kpiId": "OP 30",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 2.1.3",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            }
        ],
        "pageId": 3628,
        "includeReportee": false,
        "startDate": "2025-04-01T00:00:00.000+0000",
        "endDate": "2029-03-31T00:00:00.000+0000",
        "scoreCardDetailsId": 47
    },
    {
        "id": 4467,
        "createdBy": 2241,
        "scorecardName": "2026-2029 Strategic Plan",
        "perspectiveType": "Enhanced National Cyber Safety And Resilience",
        "perspectiveId": "SOU 2.2",
        "updatedBy": 2241,
        "createdTime": "2026-03-03T05:22:03",
        "updatedTime": "2026-03-05T10:40:18",
        "scoreCardValue": {
            "header4": "Target",
            "header3": "Actual",
            "createdByName": "Nizam Goolam",
            "header2": "Period",
            "header1": "ID",
            "updatedByName": "Nizam Goolam",
            "weight": 0,
            "header5": "Trend",
            "perspective_start_end_date": "04/01/2025 - 03/31/2029",
            "defaultscr": true,
            "ownerName": "Nizam Goolam",
            "name": "Enhanced National Cyber Safety And Resilience",
            "perspectiveType": "Enhanced National Cyber Safety And Resilience",
            "status": "Weighted",
            "statusLight": "RED",
            "statusLightFlagvalue": "red fas fa-flag",
            "statusLightFlag": "rgba(255, 26, 9, 1)"
        },
        "active": 0,
        "owner": 2241,
        "objectiveList": [
            {
                "id": 291,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Enhance National Cyber Capacity Building",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 0,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:03",
                "updatedTime": "2026-03-05T10:40:18",
                "owner": 2241,
                "scoreCardId": 4467,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Enhance National Cyber Capacity Building",
                "kpiList": [
                    {
                        "id": 1614,
                        "createdBy": 2241,
                        "kpiName": "1 Hackathon Or Competitions Per Year",
                        "kpiFormula": {
                            "formula": "sum[1 Hackathon Or Competitions Per Year]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:03",
                        "updatedTime": "2026-03-05T10:40:18",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[1 Hackathon Or Competitions Per Year]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "1 Hackathon Or Competitions Per Year",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 291,
                        "kpiId": "OP 53",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 2.2.3",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            },
            {
                "id": 292,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Strengthen National Preparedness And Cyber Resilience",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 0,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:04",
                "updatedTime": "2026-03-05T10:40:18",
                "owner": 2241,
                "scoreCardId": 4467,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Strengthen National Preparedness And Cyber Resilience",
                "kpiList": [
                    {
                        "id": 1615,
                        "createdBy": 2241,
                        "kpiName": "# DFS Technical Tests Per Year",
                        "kpiFormula": {
                            "formula": "sum[# DFS Technical Tests Per Year]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:04",
                        "updatedTime": "2026-03-05T10:40:18",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# DFS Technical Tests Per Year]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# DFS Technical Tests Per Year",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 292,
                        "kpiId": "OP 58",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1616,
                        "createdBy": 2241,
                        "kpiName": "# Of DFS Security Assessments",
                        "kpiFormula": {
                            "formula": "sum[# Of DFS Security Assessments]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:04",
                        "updatedTime": "2026-03-05T10:40:18",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of DFS Security Assessments]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of DFS Security Assessments",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 292,
                        "kpiId": "OP 59",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1617,
                        "createdBy": 2241,
                        "kpiName": "# Number Of CII Support Reports Submitted",
                        "kpiFormula": {
                            "formula": "sum[# Number Of CII Support Reports Submitted]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:04",
                        "updatedTime": "2026-03-05T10:40:18",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Number Of CII Support Reports Submitted]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Number Of CII Support Reports Submitted",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 292,
                        "kpiId": "OP 60",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 2.2.4",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            }
        ],
        "pageId": 3628,
        "includeReportee": false,
        "startDate": "2025-04-01T00:00:00.000+0000",
        "endDate": "2029-03-31T00:00:00.000+0000",
        "scoreCardDetailsId": 47
    },
    {
        "id": 4468,
        "createdBy": 2241,
        "scorecardName": "2026-2029 Strategic Plan",
        "perspectiveType": "Consumer Empowerment",
        "perspectiveId": "SOU 3.1",
        "updatedBy": 2241,
        "createdTime": "2026-03-03T05:22:04",
        "updatedTime": "2026-03-05T10:40:19",
        "scoreCardValue": {
            "header4": "Target",
            "header3": "Actual",
            "createdByName": "Nizam Goolam",
            "header2": "Period",
            "header1": "ID",
            "updatedByName": "Nizam Goolam",
            "weight": 25,
            "header5": "Trend",
            "perspective_start_end_date": "04/01/2025 - 03/31/2029",
            "defaultscr": true,
            "ownerName": "Nizam Goolam",
            "name": "Consumer Empowerment",
            "perspectiveType": "Consumer Empowerment",
            "status": "Weighted",
            "statusLight": "RED",
            "statusLightFlagvalue": "red fas fa-flag",
            "statusLightFlag": "rgba(255, 26, 9, 1)"
        },
        "active": 0,
        "owner": 2241,
        "objectiveList": [
            {
                "id": 293,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Safeguard Consumer Rights",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 25,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:04",
                "updatedTime": "2026-03-05T10:40:19",
                "owner": 2241,
                "scoreCardId": 4468,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Safeguard Consumer Rights",
                "kpiList": [
                    {
                        "id": 1618,
                        "createdBy": 2241,
                        "kpiName": "Plan Completed In The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Plan Completed In The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:04",
                        "updatedTime": "2026-03-05T10:40:18",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Plan Completed In The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Plan Completed In The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 293,
                        "kpiId": "OP 61",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1619,
                        "createdBy": 2241,
                        "kpiName": "Initiatives Implemented",
                        "kpiFormula": {
                            "formula": "sum[Initiatives Implemented]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:04",
                        "updatedTime": "2026-03-05T10:40:18",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "100",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[Initiatives Implemented]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Initiatives Implemented",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": "-100",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 293,
                        "kpiId": "OP 62",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1620,
                        "createdBy": 2241,
                        "kpiName": "Consumer Satisfaction Report Completed Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Consumer Satisfaction Report Completed Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:04",
                        "updatedTime": "2026-03-05T10:40:19",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Consumer Satisfaction Report Completed Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Consumer Satisfaction Report Completed Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 293,
                        "kpiId": "OP 63",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1621,
                        "createdBy": 2241,
                        "kpiName": "% Consumer Satisfaction",
                        "kpiFormula": {
                            "formula": "avg[% Consumer Satisfaction]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:04",
                        "updatedTime": "2026-03-05T10:40:19",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "60%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Consumer Satisfaction]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Consumer Satisfaction",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-60%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 293,
                        "kpiId": "OP 64",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 3.1.1",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            }
        ],
        "pageId": 3628,
        "includeReportee": false,
        "startDate": "2025-04-01T00:00:00.000+0000",
        "endDate": "2029-03-31T00:00:00.000+0000",
        "scoreCardDetailsId": 47
    },
    {
        "id": 4469,
        "createdBy": 2241,
        "scorecardName": "2026-2029 Strategic Plan",
        "perspectiveType": "Enhanced Institutional Performance",
        "perspectiveId": "SOU 4.1",
        "updatedBy": 2241,
        "createdTime": "2026-03-03T05:22:04",
        "updatedTime": "2026-03-05T10:40:23",
        "scoreCardValue": {
            "header4": "Target",
            "header3": "Actual",
            "createdByName": "Nizam Goolam",
            "header2": "Period",
            "header1": "ID",
            "updatedByName": "Nizam Goolam",
            "weight": 25,
            "header5": "Trend",
            "perspective_start_end_date": "04/01/2025 - 03/31/2029",
            "defaultscr": true,
            "ownerName": "Nizam Goolam",
            "name": "Enhanced Institutional Performance",
            "perspectiveType": "Enhanced Institutional Performance",
            "status": "Weighted",
            "statusLight": "RED",
            "statusLightFlagvalue": "red fas fa-flag",
            "statusLightFlag": "rgba(255, 26, 9, 1)"
        },
        "active": 0,
        "owner": 2241,
        "objectiveList": [
            {
                "id": 294,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Accelerate Digital Transformation In The Authority",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 0,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:04",
                "updatedTime": "2026-03-05T10:40:22",
                "owner": 2241,
                "scoreCardId": 4469,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Accelerate Digital Transformation In The Authority",
                "kpiList": [
                    {
                        "id": 1622,
                        "createdBy": 2241,
                        "kpiName": "% Of User Satisfaction With Automated Systems",
                        "kpiFormula": {
                            "formula": "avg[% Of User Satisfaction With Automated Systems]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:04",
                        "updatedTime": "2026-03-05T10:40:19",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "48%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of User Satisfaction With Automated Systems]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of User Satisfaction With Automated Systems",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-48%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 75",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1623,
                        "createdBy": 2241,
                        "kpiName": "% Of Feedback Obtained From The Number Of Interactions",
                        "kpiFormula": {
                            "formula": "avg[% Of Feedback Obtained From The Number Of Interactions]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:05",
                        "updatedTime": "2026-03-05T10:40:19",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of Feedback Obtained From The Number Of Interactions]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of Feedback Obtained From The Number Of Interactions",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 81",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1624,
                        "createdBy": 2241,
                        "kpiName": "Data Governance Framework Completed Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Data Governance Framework Completed Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:05",
                        "updatedTime": "2026-03-05T10:40:19",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Data Governance Framework Completed Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Data Governance Framework Completed Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": "-40",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 82",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1625,
                        "createdBy": 2241,
                        "kpiName": "# Of Analytics Dashboards Developed And In Use",
                        "kpiFormula": {
                            "formula": "sum[# Of Analytics Dashboards Developed And In Use]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:05",
                        "updatedTime": "2026-03-05T10:40:19",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of Analytics Dashboards Developed And In Use]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of Analytics Dashboards Developed And In Use",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 83",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1626,
                        "createdBy": 2241,
                        "kpiName": "Developed Data Repository Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Developed Data Repository Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:05",
                        "updatedTime": "2026-03-05T10:40:20",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Developed Data Repository Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Developed Data Repository Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 84",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1627,
                        "createdBy": 2241,
                        "kpiName": "% Of Regulatory Data Integrated In The Warehouse",
                        "kpiFormula": {
                            "formula": "avg[% Of Regulatory Data Integrated In The Warehouse]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:05",
                        "updatedTime": "2026-03-05T10:40:20",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of Regulatory Data Integrated In The Warehouse]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of Regulatory Data Integrated In The Warehouse",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 85",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1636,
                        "createdBy": 2241,
                        "kpiName": "Capacity Development Program Approved Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Capacity Development Program Approved Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:06",
                        "updatedTime": "2026-03-05T10:40:21",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Capacity Development Program Approved Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Capacity Development Program Approved Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 97",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1637,
                        "createdBy": 2241,
                        "kpiName": "# Of Capacity Development Program Implemented",
                        "kpiFormula": {
                            "formula": "sum[# Of Capacity Development Program Implemented]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:07",
                        "updatedTime": "2026-03-05T10:40:21",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "6",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of Capacity Development Program Implemented]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of Capacity Development Program Implemented",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": "-6",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 98",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1638,
                        "createdBy": 2241,
                        "kpiName": "Structured Recognition Program Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Structured Recognition Program Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:07",
                        "updatedTime": "2026-03-05T10:40:21",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Structured Recognition Program Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Structured Recognition Program Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 99",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1639,
                        "createdBy": 2241,
                        "kpiName": "# Of Recognitions Per Year",
                        "kpiFormula": {
                            "formula": "sum[# Of Recognitions Per Year]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:07",
                        "updatedTime": "2026-03-05T10:40:22",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "101",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[# Of Recognitions Per Year]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "# Of Recognitions Per Year",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": "-101",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 294,
                        "kpiId": "OP 100",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 4.1.1",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            },
            {
                "id": 295,
                "active": 0,
                "objectivesValue": {
                    "createdByName": "Nizam Goolam",
                    "ownerName": "Nizam Goolam",
                    "updatedByName": "Nizam Goolam",
                    "name": "Enhance Organizational Culture",
                    "objective_start_end_date": "04/01/2025 - 03/31/2029",
                    "weight": 12.5,
                    "status": "Weighted",
                    "statusLight": "red fas fa-flag",
                    "statusLightFlag": "rgba(255, 26, 9, 1)"
                },
                "createdTime": "2026-03-03T05:22:05",
                "updatedTime": "2026-03-05T10:40:23",
                "owner": 2241,
                "scoreCardId": 4469,
                "createdBy": 2241,
                "updatedBy": 2241,
                "objectivesName": "Enhance Organizational Culture",
                "kpiList": [
                    {
                        "id": 1628,
                        "createdBy": 2241,
                        "kpiName": "Internal Communication Policy Completed Within The Set Time Frame",
                        "kpiFormula": {
                            "formula": "avg[Internal Communication Policy Completed Within The Set Time Frame]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:05",
                        "updatedTime": "2026-03-05T10:40:20",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Internal Communication Policy Completed Within The Set Time Frame]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Internal Communication Policy Completed Within The Set Time Frame",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 89",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1629,
                        "createdBy": 2241,
                        "kpiName": "% Of Staff Aware Of The Policy",
                        "kpiFormula": {
                            "formula": "avg[% Of Staff Aware Of The Policy]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:05",
                        "updatedTime": "2026-03-05T10:40:20",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of Staff Aware Of The Policy]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of Staff Aware Of The Policy",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 90",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1630,
                        "createdBy": 2241,
                        "kpiName": "Development Of Intranet Completed Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Development Of Intranet Completed Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:06",
                        "updatedTime": "2026-03-05T10:40:20",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Development Of Intranet Completed Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Development Of Intranet Completed Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 91",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1631,
                        "createdBy": 2241,
                        "kpiName": "% Of Employees Logging Into The Intranet At Least Once Per Week_Month",
                        "kpiFormula": {
                            "formula": "avg[% Of Employees Logging Into The Intranet At Least Once Per Week_Month]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:06",
                        "updatedTime": "2026-03-05T10:40:20",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of Employees Logging Into The Intranet At Least Once Per Week_Month]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of Employees Logging Into The Intranet At Least Once Per Week_Month",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0",
                            "gap": 0,
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 92",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1632,
                        "createdBy": 2241,
                        "kpiName": "Intranet Satisfaction Rating",
                        "kpiFormula": {
                            "formula": "avg[Intranet Satisfaction Rating]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:06",
                        "updatedTime": "2026-03-05T10:40:21",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "12%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Intranet Satisfaction Rating]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Intranet Satisfaction Rating",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-12%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 93",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1633,
                        "createdBy": 2241,
                        "kpiName": "Annual Internal Communication_Events Calendar Completed Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Annual Internal Communication_Events Calendar Completed Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:06",
                        "updatedTime": "2026-03-05T10:40:21",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Annual Internal Communication_Events Calendar Completed Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Annual Internal Communication_Events Calendar Completed Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 94",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1634,
                        "createdBy": 2241,
                        "kpiName": "% Of Events Delivered As Planned",
                        "kpiFormula": {
                            "formula": "avg[% Of Events Delivered As Planned]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:06",
                        "updatedTime": "2026-03-05T10:40:21",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "70%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Of Events Delivered As Planned]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Of Events Delivered As Planned",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-70%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 95",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1635,
                        "createdBy": 2241,
                        "kpiName": "Employee Satisfaction Rating",
                        "kpiFormula": {
                            "formula": "avg[Employee Satisfaction Rating]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:06",
                        "updatedTime": "2026-03-05T10:40:21",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "24%",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Employee Satisfaction Rating]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Employee Satisfaction Rating",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-24%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 96",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1640,
                        "createdBy": 2241,
                        "kpiName": "Internal Climate Survey Report Completed Within The Set Timeframe",
                        "kpiFormula": {
                            "formula": "avg[Internal Climate Survey Report Completed Within The Set Timeframe]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:07",
                        "updatedTime": "2026-03-05T10:40:22",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Internal Climate Survey Report Completed Within The Set Timeframe]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Internal Climate Survey Report Completed Within The Set Timeframe",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 101",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1641,
                        "createdBy": 2241,
                        "kpiName": "Internal Climate Survey Report",
                        "kpiFormula": {
                            "formula": "sum[Internal Climate Survey Report]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:07",
                        "updatedTime": "2026-03-05T10:40:22",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Number",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "0",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"sum[Internal Climate Survey Report]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Internal Climate Survey Report",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "0%",
                            "thresholdResult": "0",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 102",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1642,
                        "createdBy": 2241,
                        "kpiName": "Net Promoter Score",
                        "kpiFormula": {
                            "formula": "avg[Net Promoter Score]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:07",
                        "updatedTime": "2026-03-05T10:40:22",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "13%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Net Promoter Score]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Net Promoter Score",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-13%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 103",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1643,
                        "createdBy": 2241,
                        "kpiName": "Internal Climate Score",
                        "kpiFormula": {
                            "formula": "avg[Internal Climate Score]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:07",
                        "updatedTime": "2026-03-05T10:40:22",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "13%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Internal Climate Score]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Internal Climate Score",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-13%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 104",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1644,
                        "createdBy": 2241,
                        "kpiName": "Approval Of New PMS Framework Within The Set Time Frame",
                        "kpiFormula": {
                            "formula": "avg[Approval Of New PMS Framework Within The Set Time Frame]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:08",
                        "updatedTime": "2026-03-05T10:40:22",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Support",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Approval Of New PMS Framework Within The Set Time Frame]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Approval Of New PMS Framework Within The Set Time Frame",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 106",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1645,
                        "createdBy": 2241,
                        "kpiName": "Framework Finalized And Implemented Within The Target Date",
                        "kpiFormula": {
                            "formula": "avg[Framework Finalized And Implemented Within The Target Date]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:08",
                        "updatedTime": "2026-03-05T10:40:22",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "40%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[Framework Finalized And Implemented Within The Target Date]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "Framework Finalized And Implemented Within The Target Date",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-40%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 107",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1646,
                        "createdBy": 2241,
                        "kpiName": "% Implementation Of The Operational Plans_Ops",
                        "kpiFormula": {
                            "formula": "avg[% Implementation Of The Operational Plans_Ops]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:08",
                        "updatedTime": "2026-03-05T10:40:23",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "36%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[% Implementation Of The Operational Plans_Ops]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "% Implementation Of The Operational Plans_Ops",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-36%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 108",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    },
                    {
                        "id": 1647,
                        "createdBy": 2241,
                        "kpiName": "100% Completion Of The The Strategic Plan Document Within The Set Timeline",
                        "kpiFormula": {
                            "formula": "avg[100% Completion Of The The Strategic Plan Document Within The Set Timeline]",
                            "fieldName": null,
                            "type": null,
                            "groupBy": null,
                            "deptName": null,
                            "deptId": null,
                            "currency": null,
                            "dataType": null,
                            "empployeeIds": null,
                            "period": null,
                            "tableType": null
                        },
                        "updatedBy": 2241,
                        "createdTime": "2026-03-03T05:22:08",
                        "updatedTime": "2026-03-05T10:40:23",
                        "kpiValue": {
                            "createdByName": "Nizam Goolam",
                            "option2color2colorvalue": "rgb(255, 193, 7)",
                            "threshold": "option_2",
                            "thresholdFormula": "(Actual/Target)*100",
                            "contribution": 0,
                            "ownerName": "Nizam Goolam",
                            "option2color3colorvalue": "rgb(37, 125, 5)",
                            "header4": "Forecast",
                            "option2color1colorvalue": "rgb(244, 67, 54)",
                            "option2color2": "90.0",
                            "header3": "Target",
                            "option2color3": "100.0",
                            "header2": "Budget",
                            "header1": "Actual",
                            "customthresholdenable": true,
                            "dataType": "Percentage",
                            "option2color1": "60.0",
                            "updatedByName": "Nizam Goolam",
                            "weight": 0,
                            "target": "20%",
                            "kpiRole": "Lead",
                            "kpi_datasource": "Manual",
                            "kpiFormula": "{\"formula\":\"avg[100% Completion Of The The Strategic Plan Document Within The Set Timeline]\",\"fieldName\":null,\"type\":null,\"groupBy\":null,\"deptName\":null,\"deptId\":null,\"currency\":null,\"dataType\":null,\"empployeeIds\":null,\"period\":null,\"tableType\":null}",
                            "name": "100% Completion Of The The Strategic Plan Document Within The Set Timeline",
                            "kpi_measurement": "Annually",
                            "kpi_start_end_date": "04/01/2025 - 03/31/2029",
                            "status": "Weighted",
                            "statusLight": "red fas fa-flag",
                            "actualCurrency": "",
                            "targetCurrency": "",
                            "actual": "0%",
                            "gap": "-20%",
                            "thresholdResult": "0.00",
                            "statusLightFlag": "rgba(255, 26, 9, 1)",
                            "ytdvalue": "0"
                        },
                        "active": 0,
                        "owner": 2241,
                        "objectiveId": 295,
                        "kpiId": "OP 109",
                        "includeReportee": false,
                        "startDate": "2025-04-01T00:00:00.000+0000",
                        "endDate": "2029-03-31T00:00:00.000+0000",
                        "actType": 0,
                        "thresholdvalueupdate": false,
                        "subKpiList": []
                    }
                ],
                "objectiveId": "SOB 4.1.3",
                "startDate": "2025-04-01T00:00:00.000+0000",
                "endDate": "2029-03-31T00:00:00.000+0000"
            }
        ],
        "pageId": 3628,
        "includeReportee": false,
        "startDate": "2025-04-01T00:00:00.000+0000",
        "endDate": "2029-03-31T00:00:00.000+0000",
        "scoreCardDetailsId": 47
    }
]

renderStackedBarChart(data);
renderPortfolioMix(data);
renderPerspectiveCards(data);


 kpiTable = $('#sdKpiTable').DataTable({
        // pageLength: 5,
        lengthChange: false,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
        scrollX: true,
        info: false,
        dom: 't'
        // language: { search: "", searchPlaceholder: "Search KPIs..." }
      });
      // Move datatable search to the right and style it consistently
      $('.dataTables_filter input').addClass('form-control form-control-sm');
       
    $("#sc-total-sub").text(`Across ${data.length} perspectives`);
       scorecardDashoardMap(data);
    }
    });

    

}

function getStatusClass(statusLight) {
  if (!statusLight) return "pill-gray";

  if (statusLight.includes("red")) return "pill-red";
  if (statusLight.includes("yellow")) return "pill-orange";
  if (statusLight.includes("green")) return "pill-green";

  return "pill-gray";
}

function getStatusText(statusLight) {
  if (!statusLight) return "Unknown";

  if (statusLight.includes("red")) return "Off Track";
  if (statusLight.includes("yellow")) return "At Risk";
  if (statusLight.includes("green")) return "On Track";

  return "Unknown";
}

function getTrend(actual, target) {
  let a = parseFloat(actual);
  let t = parseFloat(target);

  if (isNaN(a) || isNaN(t)) return "→";

  if (a > t) return "↑";
  if (a < t) return "↓";
  return "→";
}

function getProgress(actual, target) {
  let a = parseFloat(actual);
  let t = parseFloat(target);

  if (isNaN(a) || isNaN(t) || t == 0) return 0;

  return Math.min((a / t) * 100, 100);
};

function getRandomLightColor() {
  const r = Math.floor(Math.random() * 56) + 200; // 200–255 (lighter)
  const g = Math.floor(Math.random() * 56) + 200;
  const b = Math.floor(Math.random() * 56) + 200;

  // slightly darker but still soft for text
  const textR = Math.max(r - 100, 80);
  const textG = Math.max(g - 100, 80);
  const textB = Math.max(b - 100, 80);

  return {
    bg: `rgb(${r}, ${g}, ${b})`,
    text: `rgb(${textR}, ${textG}, ${textB})`
  };
}

function scorecardDashoardMap(data) {
 

  PERSPECTIVES = data;
  console.log(data, "datadddd");

   renderAchievementCards(data);


  //Table Data
  var tbody = document.getElementById("sdKpiBody");
tbody.innerHTML = "";

for (var i = 0; i < data.length; i++) {

  var objectives = data[i].objectiveList || [];

  for (var j = 0; j < objectives.length; j++) {

    var kpis = objectives[j].kpiList || [];

    for (var k = 0; k < kpis.length; k++) {

      var kpi = kpis[k];
      var val = kpi.kpiValue || {};

      var statusLight = val.statusLight || "";
      var statusClass = getStatusClass(statusLight);
      var statusText = getStatusText(statusLight);

      var actual = val.actual || "0%";
      var target = val.target || "0%";

      var progress = getProgress(actual, target);
      var trend = getTrend(actual, target);

      var trendColor = trend == "↓" ? "#e74c3c" : "#27ae60";
      const colorObj = getRandomLightColor();
      var row = `
        <tr data-status="${statusText}">
          <td><strong>${kpi.kpiName || "-"}</strong></td>

          

          <td>
            <span class="sc-persp-badge" 
                  style="background:${colorObj.bg}; color:black;">
              ${data[i].perspectiveType || "-"}
            </span>
          </td>

          <td>${objectives[j].objectivesName || "-"}</td>

          <td>${target}</td>
          <td>${actual}</td>

          <td>
            <span class="sc-prog-bar">
              <span class="sc-prog-fill"
                style="background:${trendColor};width:${progress}%;">
              </span>
            </span>
            ${progress.toFixed(0)}%
          </td>

          <td>
            <span class="sc-pill ${statusClass}">
              ${statusText}
            </span>
          </td>

          <td>
            <span class="sc-trend" style="color:${trendColor};">
              ${trend}
            </span>
          </td>

          <td>${val.kpi_measurement || "-"}</td>

          <td>${val.ownerName || "-"}</td>
        </tr>
      `;

      tbody.innerHTML += row;
    }
  }
}

  //Table Data

var dataLength = data.length;
var objectiveCount = 0;
var kpiCount = 0;

var redCount = 0;
var yellowCount = 0;
var greenCount = 0;

for (var i = 0; i < data.length; i++) {

  var objectives = data[i].objectiveList || [];
  objectiveCount += objectives.length;

  for (var j = 0; j < objectives.length; j++) {

    var kpis = objectives[j].kpiList || [];
    kpiCount += kpis.length;

    $("#totalKpiData").text(kpiCount);

    for (var k = 0; k < kpis.length; k++) {

      var status = kpis[k].kpiValue.statusLight || "";
      console.log("KPI Status:", status);

      if (status.includes("red")) {
        redCount++;
      } else if (status.includes("yellow")) {
        yellowCount++;
      } else if (status.includes("green")) {
        greenCount++;
      }
    }
  }
}

var greenPercentage = 0;

if (kpiCount > 0) {
  greenPercentage = ((greenCount / kpiCount) * 100).toFixed(0); // rounded %
}

console.log("Objectives:", objectiveCount);
console.log("KPIs:", kpiCount);
console.log("Red KPIs:", redCount);
console.log("Yellow KPIs:", yellowCount);
console.log("Green KPIs:", greenCount);

  $("#sc-ontrack-val").text(greenCount);
  $("#sc-atrisk-val").text(yellowCount);
  $("#sc-critical-val").text(redCount);
  $("#sc-ontrack-sub").text(greenPercentage + "% achievement rate");

  $("#sc-overall-sub").text(`${greenCount}/${kpiCount} ON TRACK`);

  $("#sc-total-val").text(kpiCount);
  const totalPerspectives = "across " + (dataLength > 0 ? dataLength : 0) + " perspectives";

  $("#sc-objective-val").text(totalPerspectives);


  var percentage = kpiCount > 0 ? ((greenCount / kpiCount) * 100).toFixed(0) : 0;

  $("#sc-overall-pct").text(percentage + "%");

};

function getPerspectiveKpiCounts(p) {
  let total = 0;
  let green = 0;

  (p.objectiveList || []).forEach(obj => {
    (obj.kpiList || []).forEach(kpi => {
      total++;

      const status = kpi.kpiValue?.statusLight?.toLowerCase() || "";

      if (status.includes("green")) {
        green++;
      }
    });
  });

  return { total, green };
};

function getPastelColor() {
  const hue = Math.floor(Math.random() * 360);

  return {
    bg: `hsl(${hue}, 70%, 90%)`,   // light background
    text: `hsl(${hue}, 60%, 40%)`  // darker text
  };
};

function renderAchievementCards(data) {

  const container = document.getElementById("prespectiveIdCards");

  container.innerHTML = data.map(p => {

    const counts = getPerspectiveKpiCounts(p);

    const percent = counts.total > 0
      ? Math.round((counts.green / counts.total) * 100)
      : 0;

    // optional dynamic color
    const color = getPastelColor().text;

    return `
      <div class="col-lg-3 col-md-6">
        <div class="sc-achieve-card">

          <div class="sc-a-persp" style="color:${color};">
            ${p.perspectiveType || "-"}
          </div>

          <div class="sc-a-count">
            ${counts.green} of ${counts.total} KPIs on track
          </div>

          <div class="sc-achieve-bar-bg">
            <div class="sc-achieve-bar-fill"
                 style="background:${color}; width:${percent}%;">
            </div>
          </div>

          <div class="sc-achieve-pct" style="color:${color};">
            ${percent}% impl.
          </div>

        </div>
      </div>
    `;
  }).join("");
};


// scorecardDashoardMap();
getDepartment();


// Dummy Data

    // == INIT DATA & VARIABLES ==
    const rootStyle = getComputedStyle(document.body);
    function getCssVar(varName, fallback) {
      return rootStyle.getPropertyValue(varName).trim() || fallback;
    }
    function getMutedColor() { return getCssVar('--bs-secondary-color', '#64748b'); }
    function getGridColor() { return getCssVar('--bs-border-color', '#f1f5f9'); }

    // const PERSPECTIVES = [
    //   {
    //     id: "financial", name: "Financial", subtitle: "Revenue & Profitability", total: 32,
    //     chartVal: 82, color: "#27ae60", icon: "donutFin",
    //     statuses: { "On Track": 26, "In Progress": 16, "At Risk": 7, Critical: 3 },
    //     objectives: { "Revenue Growth": 9, "Cost Control": 8, "Profitability": 8, "Cash Flow": 7 },
    //     frequencies: { "Monthly": 18, "Quarterly": 10, "Weekly": 3, "Annual": 1 }
    //   },
    //   {
    //     id: "customer", name: "Customer", subtitle: "Satisfaction & Growth", total: 28,
    //     chartVal: 65, color: "#2980b9", icon: "donutCust",
    //     statuses: { "On Track": 18, "In Progress": 5, "At Risk": 4, Critical: 1 },
    //     objectives: { "Satisfaction": 12, "Retention": 8, "Acquisition": 5, "LTV": 3 },
    //     frequencies: { "Monthly": 15, "Quarterly": 10, "Weekly": 2, "Annual": 1 }
    //   },
    //   {
    //     id: "internal", name: "Internal Process", subtitle: "Efficiency & Quality", total: 30,
    //     chartVal: 58, color: "#e67e22", icon: "donutInt",
    //     statuses: { "On Track": 17, "In Progress": 4, "At Risk": 6, Critical: 3 },
    //     objectives: { "Efficiency": 12, "Quality": 10, "Compliance": 5, "Safety": 3 },
    //     frequencies: { "Monthly": 12, "Quarterly": 10, "Weekly": 6, "Annual": 2 }
    //   },
    //   {
    //     id: "learning", name: "Learning & Growth", subtitle: "Innovation & Culture", total: 22,
    //     chartVal: 74, color: "#9b59b6", icon: "donutLearn",
    //     statuses: { "On Track": 16, "In Progress": 3, "At Risk": 2, Critical: 1 },
    //     objectives: { "Culture": 8, "Innovation": 6, "Training": 5, "Retention": 3 },
    //     frequencies: { "Monthly": 10, "Quarterly": 8, "Weekly": 2, "Annual": 2 }
    //   }
    // ];

    const STATUS_COLORS = { "On Track": "#27ae60", "In Progress": "#2980b9", "At Risk": "#e67e22", Critical: "#e74c3c" };

    // == RENDER PERSPECTIVE CARDS ==
    let selectedPerspective = null;


  function getKpiStatusCounts(perspective) {
  let total = 0;
  let red = 0;
  let yellow = 0;
  let green = 0;

  (perspective.objectiveList || []).forEach(obj => {
    (obj.kpiList || []).forEach(kpi => {
      total++;

      let status = kpi.kpiValue?.statusLight?.toLowerCase() || "";

      if (status.includes("red")) red++;
      else if (status.includes("yellow")) yellow++;
      else if (status.includes("green")) green++;
    });
  });

  return { total, red, yellow, green };
}

function getRandomColor() {
  const colors = [
    "#4CAF50", // green
    "#FF9800", // orange
    "#2196F3", // blue
    "#E91E63", // pink
    "#9C27B0", // purple
    "#00BCD4", // cyan
    "#FFC107", // yellow
    "#F44336"  // red
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

    function renderPerspectiveCards(data) {
      const container = document.getElementById('perspectiveCards');
      container.innerHTML = data.map(p => {
        console.log(p, "ppprespective");

        const counts = getKpiStatusCounts(p);
        console.log(counts, "counts");

        const percentageCount = counts.total > 0 ? (counts.green / counts.total) * 100 : 0;
        console.log(percentageCount, "percentageCount");

        const color = getRandomColor(); 

        const isActive = selectedPerspective == p.id;
        return `<div class="col-lg-3 col-md-6 col-6">
            <div class="perspective-card ${isActive ? 'active' : ''}" style="--persp-color:${color};" onclick="selectPerspective('${p.id}')">
              <div class="persp-donut-wrap">
                <canvas id="donut_${p.id}"></canvas>
                <div class="persp-donut-label" style="color:${color};">${parseInt(percentageCount)}%</div>
              </div>
              <div class="persp-name">${p.perspectiveType}</div>
              <div class="persp-kpi-count" style="color:${color};">${counts.total} KPIs</div>
            </div>
          </div>`;
      }).join('');

      // Initialize charts after rendering HTML
      renderPerspectiveDonuts(data);
    }


    // == DONUT CHARTS FOR PERSPECTIVES ==
    const sdCfg = (data, colors, labels) => ({
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 1, borderColor: '#fff' }] },
      options: { cutout: '72%', plugins: { legend: { display: false }, tooltip: { enabled: false } }, responsive: true, maintainAspectRatio: true }
    });

    // function renderPerspectiveDonuts() {
    //   PERSPECTIVES.forEach(p => {
    //     console.log(p, "pppdata")
    //     new Chart(document.getElementById("donutInt"), sdCfg([p.chartVal, 100 - p.chartVal], [p.color, '#eee'], ['On Track', 'Rest']));
    //   });
    // }

    function renderPerspectiveDonuts(data) {
      
      data.forEach(p => {
        console.log("donut function called");
        const counts = getKpiStatusCounts(p);

        console.log(counts,  "countsData");

        const percentage = counts.total > 0
          ? (counts.green / counts.total) * 100
          : 0;

        const canvasId = "donut_" + p.id;
        const canvas = document.getElementById(canvasId);

        console.log(canvasId, canvas, "ccccccccc");

        if (!canvas) return; 

        console.log("function Called Donut");

        new Chart(canvas, sdCfg(
          [percentage, 100 - percentage],
          ["#4CAF50", "#eee"], // green + grey
          ["On Track", "Rest"]
        ));
      });

    };

    function selectPerspective(id) {
      selectedPerspective = selectedPerspective == id ? null : id;
      renderPerspectiveCards(PERSPECTIVES);
      renderDrilldown();
    }



function getKpiStatusCountsData(p) {

  let counts = {
    "On Track": 0,
    "In Progress": 0,
    "At Risk": 0,
    "Critical": 0,
    total: 0
  };

  const objectives = p.objectiveList || [];

  objectives.forEach(obj => {
    const kpis = obj.kpiList || [];

    kpis.forEach(kpi => {

      const status = (kpi.kpiValue?.statusLight || "").toLowerCase();
      counts.total++;

      if (status.includes("green") || status.includes("blue")) {
        counts["On Track"]++;
      } 
      else if (status.includes("yellow")) {
        counts["In Progress"]++;
      } 
      else if (status.includes("red")) {
        counts["At Risk"]++;
      } 
      else {
        counts["Critical"]++;
      }

    });
  });

  return counts;
}

    // == DRILLDOWN PANEL ==
function renderDrilldown() {

  const panel = document.getElementById('sdDrillPanel');

  if (!selectedPerspective) {
    panel.style.display = 'none';
    return;
  }

  const p = PERSPECTIVES.find(persp => persp.id == selectedPerspective);

  if (!p) {
    panel.style.display = 'none';
    return;
  }

  panel.style.display = 'block';
  panel.style.borderLeft = "4px solid " + p.color;

  // ===== STATUS COUNTS =====
  const counts = getKpiStatusCountsData(p);

  const statusData = {
    "On Track": counts["On Track"],
    "In Progress": counts["In Progress"],
    "At Risk": counts["At Risk"],
    "Critical": counts["Critical"]
  };

  // ===== OBJECTIVE BREAKDOWN =====
  const objectiveData = {
    "Revenue Growth": 0,
    "Cost Control": 0,
    "Profitability": 0,
    "Cash Flow": 0
  };

  // ===== FREQUENCY BREAKDOWN =====
  const frequencyData = {
    "Annual": 0,
    "Monthly": 0,
    "Quarterly": 0,
    "Weekly": 0
  };

  const objectives = p.objectiveList || [];

  objectives.forEach(obj => {

    const objStatus = (obj.objectivesValue?.statusLight || "").toLowerCase();

    // 🔥 Objective mapping
    if (objStatus.includes("blue")) {
      objectiveData["Revenue Growth"]++;
    } 
    else if (objStatus.includes("yellow")) {
      objectiveData["Cost Control"]++;
    } 
    else if (objStatus.includes("red")) {
      objectiveData["Cash Flow"]++;
    } 
    else {
      objectiveData["Profitability"]++;
    }

    // 🔥 KPI frequency mapping
    const kpis = obj.kpiList || [];

    kpis.forEach(kpi => {
      let freq = (kpi.kpiValue?.kpi_measurement || "").toLowerCase();

      if (freq.includes("annual")) {
        frequencyData["Annual"]++;
      } 
      else if (freq.includes("month")) {
        frequencyData["Monthly"]++;
      } 
      else if (freq.includes("quarter")) {
        frequencyData["Quarterly"]++;
      } 
      else if (freq.includes("week")) {
        frequencyData["Weekly"]++;
      }
    });

  });

  // ===== BAR RENDER =====
  function barRows(data, total, useColors = false) {

    const STATUS_COLORS = {
      "On Track": "#27ae60",
      "In Progress": "#f1c40f",
      "At Risk": "#e74c3c",
      "Critical": "#c0392b"
    };

    const fallbackColors = ["#27ae60", "#2980b9", "#9b59b6", "#e67e22"];

    return Object.entries(data).map(([k, v], i) => {

      const pct = total > 0 ? ((v / total) * 100).toFixed(1) : 0;
      const c = useColors ? (STATUS_COLORS[k] || '#94a3b8') : fallbackColors[i % fallbackColors.length];

      return `
        <div class="sc-bar-row">
          <span class="sc-bar-label" style="color:${c};">${k}</span>
          <div class="bar-track flex-grow-1 mx-2">
            <div class="bar-fill" style="background:${c};width:${pct}%;"></div>
          </div>
          <span class="sc-bar-count">${v}/${total}</span>
        </div>`;
    }).join('');
  }

  panel.innerHTML = `
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div>
        <span class="fw-bold fs-6" style="color:${p.color}">${p.perspectiveType}</span>
        <span class="ms-2 text-muted" style="font-size:13px;">
          ${counts.total} KPIs
        </span>
      </div>
      <button class="btn btn-sm btn-outline-secondary" onclick="selectPerspective(null)">✕ Close</button>
    </div>

    <div class="row g-4">

      <div class="col-md-4">
        <div class="sc-drilldown-col-title">Status Breakdown</div>
        ${barRows(statusData, counts.total, true)}
      </div>

      <div class="col-md-4">
        <div class="sc-drilldown-col-title">Objective Breakdown</div>
        ${barRows(objectiveData, counts.total)}
      </div>

      <div class="col-md-4">
        <div class="sc-drilldown-col-title">Measurement Frequency</div>
        ${barRows(frequencyData, counts.total)}
      </div>

    </div>
  `;
}
    // function renderDrilldown() {
    //   const panel = document.getElementById('sdDrillPanel');
    //   if (!selectedPerspective) { panel.style.display = 'none'; return; }
    //   const p = PERSPECTIVES.find(persp => persp.id == selectedPerspective);
    //   console.log(p, "ppppp");
    //   if (!p) { panel.style.display = 'none'; return; }
    //   panel.style.display = 'block';

    //   panel.style.borderLeft = "4px solid " + p.color;

    //   function barRows(data, total, useColors = false) {
    //     console.log(data, total, useColors, "barRowsData");
    //     const fallbackColors = ["#27ae60", "#2980b9", "#9b59b6", "#e67e22"];
    //     return Object.entries(data).map(([k, v], i) => {
    //       const pct = ((v / total) * 100).toFixed(1);
    //       const c = useColors ? (STATUS_COLORS[k] || '#94a3b8') : fallbackColors[i % fallbackColors.length];
    //       return `<div class="sc-bar-row"><span class="sc-bar-label" style="color:${c};">${k}</span>
    //           <div class="bar-track flex-grow-1 mx-2"><div class="bar-fill" style="background:${c};width:${pct}%;"></div></div>
    //           <span class="sc-bar-count">${v}/${total}</span></div>`;
    //     }).join('');
    //   }

    //   panel.innerHTML = `
    //     <div class="d-flex align-items-center justify-content-between mb-3">
    //       <div>
    //         <span class="fw-bold fs-6" style="color:${p.color}">${p.perspectiveType}</span>
    //         <span class="ms-2 text-muted" style="font-size:13px;">${p.subtitle} · ${p.total} KPIs</span>
    //       </div>
    //       <button class="btn btn-sm btn-outline-secondary" onclick="selectPerspective(null)">✕ Close</button>
    //     </div>
    //     <div class="row g-4">
    //       <div class="col-md-4">
    //         <div class="sc-drilldown-col-title">Status Breakdown</div>
    //         ${barRows(p.statuses, p.total, true)}
    //       </div>
    //       <div class="col-md-4">
    //         <div class="sc-drilldown-col-title">Objective Breakdown</div>
    //         ${barRows(p.objectives, p.total)}
    //       </div>
    //       <div class="col-md-4">
    //         <div class="sc-drilldown-col-title">Measurement Frequency</div>
    //         ${barRows(p.frequencies, p.total)}
    //       </div>
    //     </div>`;
    // }

    // let kpiTable;
    // function sdFilter(btn, status) {
    //   console.log(btn, status, "btnStatus");
    //   document.querySelectorAll('.sc-filter-btn').forEach(b => b.classList.remove('active'));
    //   btn.classList.add('active');
    //   if (status == 'all') {
    //     kpiTable.column(6).search('').draw();
    //   } else {
    //     kpiTable.column(6).search(status).draw();
    //   }
    // }

    // == INIT ==

    function formatLabel(label, maxLineLength = 10) {
  if (!label) return ["-"];

  const words = label.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach(word => {
    if ((currentLine + word).length > maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  });

  if (currentLine) lines.push(currentLine.trim());

  return lines;
};

  function getStackedChartData(data) {
  const labels = [];
  const greenData = [];
  const yellowData = [];
  const redData = [];

  data.forEach(p => {
    const counts = getKpiStatusCounts(p);

    // labels.push(p.perspectiveType || "-");
    labels.push(formatLabel(p.perspectiveType));

    greenData.push(counts.green || 0);
    yellowData.push(counts.yellow || 0);
    redData.push(counts.red || 0);
  });

  return {
    labels,
    greenData,
    yellowData,
    redData
  };
}

function renderStackedBarChart(apiData) {
    // const apiData = PERSPECTIVES;

  const chartData = getStackedChartData(apiData);

  new Chart(document.getElementById('sdBarChart'), {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: 'On Track',
          data: chartData.greenData,
          backgroundColor: '#27ae60'
        },
        {
          label: 'In Progress',
          data: chartData.yellowData,
          backgroundColor: '#f1c40f'
        },
        {
          label: 'Critical',
          data: chartData.redData,
          backgroundColor: '#e74c3c'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: getMutedColor(), font: { size: 11 } }
        },
        y: {
          stacked: true,
          grid: { color: getGridColor() },
          ticks: { color: getMutedColor(), font: { size: 10 } }
        }
      },
      plugins: {
        legend: { display: true } // you can enable if needed
      }
    }
  });
}

function getPortfolioCounts(data) {
  let totalGreen = 0;
  let totalYellow = 0;
  let totalRed = 0;



  data.forEach(p => {
    const counts = getKpiStatusCounts(p);

    totalGreen += counts.green || 0;
    totalYellow += counts.yellow || 0;
    totalRed += counts.red || 0;
  });

  $("#onTrackData").text(totalGreen);
  $("#atRiskData").text(totalYellow);
  $("#criticalData").text(totalRed);

  return {
    green: totalGreen,
    yellow: totalYellow,
    red: totalRed
  };
}




    function getPortfolioCounts(data) {
      let green = 0;
      let yellow = 0;
      let red = 0;

      data.forEach(p => {
        (p.objectiveList || []).forEach(obj => {
          (obj.kpiList || []).forEach(kpi => {

            let status = kpi.kpiValue?.statusLight?.toLowerCase() || "";

            if (status.includes("green")) green++;
            else if (status.includes("yellow")) yellow++;
            else if (status.includes("red")) red++;

          });
        });
      });

      return { green, yellow, red };
    }

    function renderPortfolioMix(data) {

      const counts = getPortfolioCounts(data);

      new Chart(document.getElementById('sdDonutMix'), {
        type: 'doughnut',
        data: {
          labels: ['On Track', 'In Progress', 'At Risk', 'Critical'],
          datasets: [{
            data: [
              counts.green,   // 🔥 replace 78
              counts.yellow,  // 🔥 replace 12
              0,              // 🔥 At Risk always 0
              counts.red      // 🔥 replace last 12
            ],
            backgroundColor: [
              '#27ae60', // green
              '#f1c40f', // yellow
              '#e67e22', // at risk (unused)
              '#e74c3c'  // red
            ],
            borderWidth: 1,
            borderColor: '#fff'
          }]
        },
        options: {
          cutout: '65%',
          plugins: { legend: { display: false } },
          responsive: true,
          maintainAspectRatio: true
        }
      });
    }



      


  
  