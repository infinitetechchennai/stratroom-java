<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
  <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <c:set var="contextroot" value="${pageContext.request.contextPath}" />

    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>StratRoom</title>
      <link rel="stylesheet" href="${contextroot}/css/fonts/fontawesome_v_5/font-awesome.min.css" />
      <link rel="stylesheet" href="${contextroot}/css/fonts/fontawesome_v_5/all.css" />

      <link href="${contextroot}/css/app.min.css" rel="stylesheet" />

      <!-- Custom Css -->
      <link href="${contextroot}/css/style.css" rel="stylesheet" />
      <link href="${contextroot}/css/custom.css" rel="stylesheet" />
      <link href="${contextroot}/css/initatives.css" rel="stylesheet" />
      <link href="${contextroot}/css/startroom/wedgets.css" rel="stylesheet" />
      <!-- You can choose a theme from css/styles instead of get all themes -->
      <link href="${contextroot}/css/styles/all-themes.css" rel="stylesheet" />
      <link href="${contextroot}/css/select2.min.css" rel="stylesheet" />
      <link href="${contextroot}/css/employee.css" rel="stylesheet" />
      <link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="${contextroot}/css/datepickerair.css" />
      <link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css" />
      <link href="${contextroot}/css/file-upload.css" rel="stylesheet">
      <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
      <script type="text/javascript" src="${contextroot}/js/jquery/jquery.validate.min.js"></script>

      <link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet" />

      <!-- multi-select dropdown -->
      <link rel="stylesheet" href="${contextroot}/css/select2.min.css" />
      <!-- multi-select dropdown -->

      <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <script src="https://bossanova.uk/jspreadsheet/v4/jexcel.js"></script>
      <script src="https://jsuites.net/v4/jsuites.js"></script>
      <link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />
      <link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jexcel.css" type="text/css" />

      <style>
        #multi-select-dropdown {
          width: 200px;
          padding: 5px;
        }

        /* multi-select dropdown */
        .select2 .select2-search--dropdown {
          padding: 3px 2px 0px 0px;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
          height: 38px !important;
          font-size: 14px !important;
        }

        .select2 .select2-search--dropdown {
          padding: 3px 2px 0px 0px;
        }

        select {
          width: 300px;
          /* Adjust as needed */
          white-space: normal;
          /* Allow text wrapping */
          word-wrap: break-word;
          /* Ensure long words are wrapped */
        }

        select option {
          white-space: normal;
          /* Allow option text wrapping */
        }

        input.select2-search__field {
          height: 26px !important;
          font-size: 12px !important;
          font-weight: normal !important;
        }

        .select2-selection--single {
          border: 1px solid #ced4da !important;
          border-radius: 0px !important;
        }

        .orientation-right {
          top: 60px !important;
          right: 0 !important;
          left: auto !important;
          position: fixed;
        }

        #notifications .row::-webkit-scrollbar {
          width: 0px;
          background: transparent;
          /* make scrollbar transparent */
        }

        .btn-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          padding: 10px;
          max-width: 600px;
          border: 1px solid #ced4da;
        }

        .file-upload-container {
          display: inline-block;
          margin: 5px;
          width: 120px;
          position: relative;
        }

        /* Document Upload Button */
        .btn-document {
          width: 60px;
          height: 60px;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Icons size */
        .btn-document i {
          font-size: 30px;
        }

        .action-buttons {
          display: flex;
          margin-top: 5px;
        }

        .action-buttons button {
          margin: 2px;
          height: 24px;
          width: 24px;
          border: none;
        }

        /* Remove borders from icons */
        .action-buttons button i {
          font-size: 12px;
        }

        .fa-file-pdf {
          color: red;
        }

        .fa-file-excel {
          color: #1d6f42;
        }

        .fa-file-word {
          color: #2a5699;
        }

        .fa-file-code {
          color: #e44d26;
        }

        .fa-file-image {
          color: green;
        }

        .file-name {
          font-size: 14px;
          margin-top: 5px;
          color: #000;
          display: none;
          margin-left: -60px !important;
        }

        .file-upload-container .btn-document i {
          font-size: 30px;
        }

        /* Ensures proper layout on small devices */
        @media (max-width: 600px) {
          .btn-container {
            justify-content: center;
          }

          .file-upload-container {
            margin: 10px;
          }
        }

        /* table desig */
        :root {
          --jexcel-border-color: #000;
        }

        .jexcel_container {
          display: inline-block;
          padding-right: 2px;
          box-sizing: border-box;
          overscroll-behavior: contain;
          outline: none;
        }

        .jexcel_container.fullscreen {
          position: fixed;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          z-index: 21;
        }

        .jexcel_container.fullscreen .jexcel_content {
          overflow: auto;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
        }

        .jexcel_container.with-toolbar .jexcel>thead>tr>td {
          top: 0;
        }

        .jexcel_container.fullscreen.with-toolbar {
          height: calc(100% - 46px);
        }

        .jexcel_content {
          display: inline-block;
          box-sizing: border-box;
          padding-right: 3px;
          padding-bottom: 3px;
          position: relative;
          scrollbar-width: thin;
          scrollbar-color: #666 transparent;
        }

        @supports (-moz-appearance: none) {
          .jexcel_content {
            padding-right: 10px;
          }
        }

        .jexcel_content::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .jexcel_content::-webkit-scrollbar-track {
          background: #eee;
        }

        .jexcel_content::-webkit-scrollbar-thumb {
          background: #666;
        }

        .jexcel {
          border-collapse: separate;
          table-layout: fixed;
          white-space: nowrap;
          empty-cells: show;
          border: 0px;
          background-color: #fff;
          width: 0;

          border-top: 1px solid transparent;
          border-left: 1px solid transparent;
          border-right: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
        }

        .jexcel>thead>tr>td {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid transparent;
          border-bottom: 1px solid transparent;
          background-color: #f3f3f3;
          padding: 2px;
          cursor: pointer;
          box-sizing: border-box;
          overflow: hidden;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .jexcel_container.with-toolbar .jexcel>thead>tr>td {
          top: 42px;
        }

        .jexcel>thead>tr>td.dragging {
          background-color: #fff;
          opacity: 0.5;
        }

        .jexcel>thead>tr>td.selected {
          background-color: #dcdcdc;
        }

        .jexcel>thead>tr>td.arrow-up {
          background-repeat: no-repeat;
          background-position: center right 5px;
          background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0V0z'/%3E%3Cpath d='M7 14l5-5 5 5H7z' fill='gray'/%3E%3C/svg%3E");
          text-decoration: underline;
        }

        .jexcel>thead>tr>td.arrow-down {
          background-repeat: no-repeat;
          background-position: center right 5px;
          background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0V0z'/%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='gray'/%3E%3C/svg%3E");
          text-decoration: underline;
        }

        .jexcel>tbody>tr>td:first-child {
          position: relative;
          background-color: #f3f3f3;
          text-align: center;
        }

        .jexcel>tbody.resizable>tr>td:first-child::before {
          content: "\00a0";
          width: 100%;
          height: 3px;
          position: absolute;
          bottom: 0px;
          left: 0px;
          cursor: row-resize;
        }

        .jexcel>tbody.draggable>tr>td:first-child::after {
          content: "\00a0";
          width: 3px;
          height: 100%;
          position: absolute;
          top: 0px;
          right: 0px;
          cursor: move;
        }

        .jexcel>tbody>tr.dragging>td {
          background-color: #eee;
          opacity: 0.5;
        }

        .jexcel>tbody>tr>td {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid transparent;
          border-bottom: 1px solid transparent;
          padding: 4px;
          white-space: nowrap;
          box-sizing: border-box;
          line-height: 1em;
        }

        .jexcel_overflow>tbody>tr>td {
          overflow: hidden;
        }

        .jexcel>tbody>tr>td:last-child {
          overflow: hidden;
        }

        .jexcel>tbody>tr>td>img {
          display: inline-block;
          max-width: 100px;
        }

        .jexcel>tbody>tr>td.readonly {
          color: black;
        }

        .jexcel>tbody>tr.selected>td:first-child {
          background-color: #dcdcdc;
        }

        .jexcel>tbody>tr>td>select,
        .jexcel>tbody>tr>td>input,
        .jexcel>tbody>tr>td>textarea {
          border: 0px;
          border-radius: 0px;
          outline: 0px;
          width: 100%;
          margin: 0px;
          padding: 0px;
          padding-right: 2px;
          background-color: transparent;
          box-sizing: border-box;
        }

        .jexcel>tbody>tr>td>textarea {
          resize: none;
          padding-top: 6px !important;
        }

        .jexcel>tbody>tr>td>input[type="checkbox"] {
          width: 12px;
          margin-top: 2px;
        }

        .jexcel>tbody>tr>td>input[type="radio"] {
          width: 12px;
          margin-top: 2px;
        }

        /* .jexcel > tbody > tr > td > select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-repeat: no-repeat;
      background-position-x: 100%;
      background-position-y: 40%;
      background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+);
    } */

        .jexcel>tbody>tr>td>select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-repeat: no-repeat;
          background-position-x: calc(100% - 1px);
          /* Adjust space between text and arrow */
          background-position-y: 40%;
          background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+);
          max-width: 200px;
          white-space: normal;
          word-wrap: break-word;
          padding-right: 20px;
        }

        .jexcel>tbody>tr>td.jexcel_dropdown {
          background-repeat: no-repeat;
          background-position: top 50% right 5px;
          background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0V0z'/%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='lightgray'/%3E%3C/svg%3E");
          text-overflow: ellipsis;
          overflow-x: hidden;
        }

        .jexcel>tbody>tr>td.jexcel_dropdown.jexcel_comments {
          background: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0V0z'/%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='lightgray'/%3E%3C/svg%3E") top 50% right 5px no-repeat,
            url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFuGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAxLTMxVDE4OjU1OjA4WiIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMS0zMVQxODo1NTowOFoiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTMxVDE4OjU1OjA4WiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphMTlhZDJmOC1kMDI2LTI1NDItODhjOS1iZTRkYjkyMmQ0MmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkOGI5NDUyMS00ZjEwLWQ5NDktYjUwNC0wZmU1N2I3Nzk1MDEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMzdjYmE1ZS1hYTMwLWNkNDUtYTAyNS1lOWYxZjk2MzUzOGUiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMzdjYmE1ZS1hYTMwLWNkNDUtYTAyNS1lOWYxZjk2MzUzOGUiIHN0RXZ0OndoZW49IjIwMTktMDEtMzFUMTg6NTU6MDhaIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmExOWFkMmY4LWQwMjYtMjU0Mi04OGM5LWJlNGRiOTIyZDQyZCIgc3RFdnQ6d2hlbj0iMjAxOS0wMS0zMVQxODo1NTowOFoiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4En6MDAAAAX0lEQVQYlX3KOw6AIBBAwS32RpJADXfx0pTET+ERZJ8F8RODFtONsG0QAoh0CSDM82dqodaBdQXnfoLZQM7gPai+wjNNE8R4pTuAYNZSKZASqL7CMy0LxNgJp30fKYUDi3+vIqb/+rUAAAAASUVORK5CYII=") top right no-repeat;
        }

        .jexcel>tbody>tr>td>.color {
          width: 90%;
          height: 10px;
          margin: auto;
        }

        .jexcel>tbody>tr>td>a {
          text-decoration: underline;
        }

        .jexcel>tbody>tr>td.highlight>a {
          color: blue;
          cursor: pointer;
        }

        .jexcel>tfoot>tr>td {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid transparent;
          border-bottom: 1px solid transparent;
          background-color: #f3f3f3;
          padding: 2px;
          cursor: pointer;
          box-sizing: border-box;
          overflow: hidden;
        }

        .jexcel .highlight {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .jexcel .highlight-top {
          border-top: 1px solid #000;
          /* var(--jexcel-border-color);*/
          box-shadow: 0px -1px #ccc;
        }

        .jexcel .highlight-left {
          border-left: 1px solid #000;
          /* var(--jexcel-border-color);*/
          box-shadow: -1px 0px #ccc;
        }

        .jexcel .highlight-right {
          border-right: 1px solid #000;
          /* var(--jexcel-border-color);*/
        }

        .jexcel .highlight-bottom {
          border-bottom: 1px solid #000;
          /* var(--jexcel-border-color);*/
        }

        .jexcel .highlight-top.highlight-left {
          box-shadow: -1px -1px #ccc;
          -webkit-box-shadow: -1px -1px #ccc;
          -moz-box-shadow: -1px -1px #ccc;
        }

        .jexcel .highlight-selected {
          background-color: rgba(0, 0, 0, 0);
        }

        .jexcel .selection {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .jexcel .selection-left {
          border-left: 1px dotted #000;
        }

        .jexcel .selection-right {
          border-right: 1px dotted #000;
        }

        .jexcel .selection-top {
          border-top: 1px dotted #000;
        }

        .jexcel .selection-bottom {
          border-bottom: 1px dotted #000;
        }

        .jexcel_corner {
          position: absolute;
          background-color: rgb(0, 0, 0);
          height: 1px;
          width: 1px;
          border: 1px solid rgb(255, 255, 255);
          top: -2000px;
          left: -2000px;
          cursor: crosshair;
          box-sizing: initial;
          z-index: 20;
          padding: 2px;
        }

        .jexcel .editor {
          outline: 0px solid transparent;
          overflow: visible;
          white-space: nowrap;
          text-align: left;
          padding: 0px;
          box-sizing: border-box;
          overflow: visible !important;
        }

        .jexcel .editor>input {
          padding-left: 4px;
        }

        .jexcel .editor .jupload {
          position: fixed;
          top: 100%;
          z-index: 40;
          user-select: none;
          -webkit-font-smoothing: antialiased;
          font-size: 0.875rem;
          letter-spacing: 0.2px;
          -webkit-border-radius: 4px;
          border-radius: 4px;
          -webkit-box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
          padding: 10px;
          background-color: #fff;
          width: 300px;
          min-height: 225px;
          margin-top: 2px;
        }

        .jexcel .editor .jupload img {
          width: 100%;
          height: auto;
        }

        .jexcel .editor .jexcel_richtext {
          position: fixed;
          top: 100%;
          z-index: 40;
          user-select: none;
          -webkit-font-smoothing: antialiased;
          font-size: 0.875rem;
          letter-spacing: 0.2px;
          -webkit-box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
          padding: 10px;
          background-color: #fff;
          min-width: 280px;
          max-width: 310px;
          margin-top: 2px;
          text-align: left;
        }

        .jexcel .editor .jclose:after {
          position: absolute;
          top: 0;
          right: 0;
          margin: 10px;
          content: "close";
          font-family: "Material icons";
          font-size: 24px;
          width: 24px;
          height: 24px;
          line-height: 24px;
          cursor: pointer;
          text-shadow: 0px 0px 5px #fff;
        }

        .jexcel,
        .jexcel td,
        .jexcel_corner {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
         
        }

        .jexcel_textarea {
          position: absolute;
          top: -999px;
          left: -999px;
          width: 1px;
          height: 1px;
        }

        .jexcel .dragline {
          position: absolute;
        }

        .jexcel .dragline div {
          position: relative;
          top: -6px;
          height: 5px;
          width: 22px;
        }

        .jexcel .dragline div:hover {
          cursor: move;
        }

        .jexcel .onDrag {
          background-color: rgba(0, 0, 0, 0.6);
        }

        .jexcel .error {
          border: 1px solid red;
        }

        .jexcel thead td.resizing {
          border-right-style: dotted !important;
          border-right-color: red !important;
        }

        .jexcel tbody tr.resizing>td {
          border-bottom-style: dotted !important;
          border-bottom-color: red !important;
        }

        .jexcel tbody td.resizing {
          border-right-style: dotted !important;
          border-right-color: red !important;
        }

        .jexcel .jdropdown-header {
          border: 0px !important;
          outline: none !important;
          width: 100% !important;
          height: 100% !important;
          padding: 0px !important;
          padding-left: 8px !important;
        }

        .jexcel .jdropdown-container {
          margin-top: 1px;
        }

        .jexcel .jdropdown-container-header {
          padding: 0px;
          margin: 0px;
          height: inherit;
        }

        .jexcel .jdropdown-picker {
          border: 0px !important;
          padding: 0px !important;
          width: inherit;
          height: inherit;
        }

        .jexcel .jexcel_comments {
          background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFuGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAxLTMxVDE4OjU1OjA4WiIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMS0zMVQxODo1NTowOFoiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTMxVDE4OjU1OjA4WiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphMTlhZDJmOC1kMDI2LTI1NDItODhjOS1iZTRkYjkyMmQ0MmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkOGI5NDUyMS00ZjEwLWQ5NDktYjUwNC0wZmU1N2I3Nzk1MDEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMzdjYmE1ZS1hYTMwLWNkNDUtYTAyNS1lOWYxZjk2MzUzOGUiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMzdjYmE1ZS1hYTMwLWNkNDUtYTAyNS1lOWYxZjk2MzUzOGUiIHN0RXZ0OndoZW49IjIwMTktMDEtMzFUMTg6NTU6MDhaIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmExOWFkMmY4LWQwMjYtMjU0Mi04OGM5LWJlNGRiOTIyZDQyZCIgc3RFdnQ6d2hlbj0iMjAxOS0wMS0zMVQxODo1NTowOFoiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4En6MDAAAAX0lEQVQYlX3KOw6AIBBAwS32RpJADXfx0pTET+ERZJ8F8RODFtONsG0QAoh0CSDM82dqodaBdQXnfoLZQM7gPai+wjNNE8R4pTuAYNZSKZASqL7CMy0LxNgJp30fKYUDi3+vIqb/+rUAAAAASUVORK5CYII=");
          background-repeat: no-repeat;
          background-position: top right;
        }

        .jexcel .sp-replacer {
          margin: 2px;
          border: 0px;
        }

        .jexcel>thead>tr.jexcel_filter>td>input {
          border: 0px;
          width: 100%;
          outline: none;
        }

        .jexcel_about {
          float: right;
          font-size: 0.7em;
          padding: 2px;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: none;
        }

        .jexcel_about a {
          color: #ccc;
          text-decoration: none;
        }

        .jexcel_about img {
          display: none;
        }

        .jexcel_filter {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .jexcel_filter>div {
          padding: 8px;
          align-items: center;
        }

        .jexcel_pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .jexcel_pagination>div {
          display: flex;
          padding: 10px;
        }

        .jexcel_pagination>div:last-child {
          padding-right: 10px;
          padding-top: 10px;
        }

        .jexcel_pagination>div>div {
          text-align: center;
          width: 36px;
          height: 36px;
          line-height: 34px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          margin-left: 2px;
          cursor: pointer;
        }

        .jexcel_page {
          font-size: 0.8em;
        }

        .jexcel_page_selected {
          font-weight: bold;
          background-color: #f3f3f3;
        }

        .jexcel_toolbar {
          display: flex;
          background-color: #f3f3f3;
          border: 1px solid #ccc;
          padding: 4px;
          margin: 0px 2px 4px 1px;
          position: sticky;
          top: 0px;
          z-index: 21;
        }

        .jexcel_toolbar:empty {
          display: none;
        }

        .jexcel_toolbar i.jexcel_toolbar_item {
          width: 24px;
          height: 24px;
          padding: 4px;
          cursor: pointer;
          display: inline-block;
        }

        .jexcel_toolbar i.jexcel_toolbar_item:hover {
          background-color: #ddd;
        }

        .jexcel_toolbar select.jexcel_toolbar_item {
          margin-left: 2px;
          margin-right: 2px;
          display: inline-block;
          border: 0px;
          background-color: transparent;
          padding-right: 10px;
        }

        .jexcel .dragging-left {
          background-repeat: no-repeat;
          background-position: top 50% left 0px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M14 7l-5 5 5 5V7z'/%3E%3Cpath fill='none' d='M24 0v24H0V0h24z'/%3E%3C/svg%3E");
        }

        .jexcel .dragging-right {
          background-repeat: no-repeat;
          background-position: top 50% right 0px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M10 17l5-5-5-5v10z'/%3E%3Cpath fill='none' d='M0 24V0h24v24H0z'/%3E%3C/svg%3E");
        }

        .jexcel_tabs .jexcel_tab {
          display: none;
        }

        .jexcel_tabs .jexcel_tab_link {
          display: inline-block;
          padding: 10px;
          padding-left: 20px;
          padding-right: 20px;
          margin-right: 5px;
          margin-bottom: 5px;
          background-color: #f3f3f3;
          cursor: pointer;
        }

        .jexcel_tabs .jexcel_tab_link.selected {
          background-color: #ddd;
        }

        .jexcel_hidden_index>tbody>tr>td:first-child,
        .jexcel_hidden_index>thead>tr>td:first-child,
        .jexcel_hidden_index>tfoot>tr>td:first-child,
        .jexcel_hidden_index>colgroup>col:first-child {
          display: none;
        }

        .jexcel .jrating {
          display: inline-flex;
        }

        .jexcel .jrating>div {
          zoom: 0.55;
        }

        .jexcel .copying-top {
          border-top: 1px dashed #000;
        }

        .jexcel .copying-left {
          border-left: 1px dashed #000;
        }

        .jexcel .copying-right {
          border-right: 1px dashed #000;
        }

        .jexcel .copying-bottom {
          border-bottom: 1px dashed #000;
        }

        .jexcel .jexcel_column_filter {
          background-repeat: no-repeat;
          background-position: top 50% right 5px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='gray' width='18px' height='18px'%3E%3Cpath d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 0px;
          padding-left: 6px;
          padding-right: 20px;
        }

        .jexcel thead .jexcel_freezed,
        .jexcel tfoot .jexcel_freezed {
          left: 0px;
          z-index: 3 !important;
          box-shadow: 2px 0px 2px 0.2px #ccc !important;
          -webkit-box-shadow: 2px 0px 2px 0.2px #ccc !important;
          -moz-box-shadow: 2px 0px 2px 0.2px #ccc !important;
        }

        .jexcel tbody .jexcel_freezed {
          position: relative;
          background-color: #fff;
          box-shadow: 1px 1px 1px 1px #ccc !important;
          -webkit-box-shadow: 2px 4px 4px 0.1px #ccc !important;
          -moz-box-shadow: 2px 4px 4px 0.1px #ccc !important;
        }

        .red {
          color: red;
        }

        .jexcel_dropdown {
          cursor: pointer;
        }

        .jexcel_dropdown .dropdown-list {
          display: none;
          position: absolute;
          top: 100%;
          /* Positioned below the <td> */
          left: 0;
          background-color: white;
          border: 1px solid #ccc;
          list-style: none;
          margin: 0;
          padding: 0;
          z-index: 1000;
          width: 100%;
          /* Match the width of the parent column */
        }

        .jexcel_dropdown .dropdown-list li {
          padding: 8px;
          text-align: center;
          cursor: pointer;
        }

        .jexcel_dropdown .dropdown-list li:hover {
          background-color: #f0f0f0;
        }

        .jexcel_dropdown .dropdown-list.show {
          display: block;
        }
      </style>
    </head>

    <body class="light">
      <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}" />
      <!-- Page Loader -->
      <jsp:include page="../common/top-navigation.jsp"></jsp:include>
      <!-- #Top Bar -->
      <div>
        <jsp:include page="../common/left-navigation.jsp"></jsp:include>
        <jsp:include page="../common/right-navigation.jsp"></jsp:include>

        <div id="deleteModalswot" class="modal fade">
          <div class="modal-dialog modal-confirm">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Delete</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <h5 class="confirm-modal-content">Do you really want to delete?</h5>
                <br />
                <div class="form-line right">
                  <input type="hidden" id="deleterecordid" />
                  <input type="hidden" id="deleterecordtype" />
                  <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
                    data-i18n="Cancel">
                    Cancel
                  </button>
                  <button type="button" class="btn btn-danger confirm-modal-deleteBtn"
                    onclick="handleswoteventdelete()">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- File Validate Form -->
      <div class="modal fade file_upload_popup" id="file-validate-form" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 data-i18n="File Upload">File Upload</h4>
              <button type="button" class="close pull-right" data-dismiss="modal">
                &times;</button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <ul class="form-progressbar">
                    <li>Upload</li>
                    <li>Validation</li>
                    <li>Import</li>
                  </ul>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>
              </div>

              <div class="row" id="file-upload">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="control-label">Upload File</label>
                    <div class="preview-zone hidden">
                      <div class="box box-solid">
                        <div class="box-body"></div>
                      </div>
                    </div>
                    <div class="dropzone-wrapper">
                      <div class="dropzone-desc">
                        <i class="fas fa-file-upload" style="font-size: 20px;"></i>
                        <p>Choose a file or drag it here.</p>
                      </div>
                      <input type="file" name="img_logo" class="dropzone" accept=".xlsx, .xls, .csv" />
                    </div>
                    <span id="fileerrorshow" style="color: red; display: none"></span>
                  </div>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>
                <div class="col-md-12">
                  <div class="form-line right">
                    <button class="initative_save_btn" id="next-btn-1" style="font-weight: 600;">Next</button>
                  </div>
                </div>
              </div>

              <div class="row" id="file-validate" style="display: none;">
                <div class="col-md-12 img-center">
                  <img id="imagevalidate" src="images/Not-Verified.png" alt="Not-Verified" />
                  <div class="error-div">
                    <table class="error-table">
                      <thead>
                        <tr>
                          <th style="width: 150px; text-align: center;">SheetName</th>
                          <!-- <th style="width: 150px; text-align: -webkit-center;">Owner</th> -->
                          <th style="width: 150px; text-align: center;">Row-Number</th>
                          <th style="width: 150px; text-align: center;">CellName</th>
                          <th style="width: 250px; text-align: center;">Reason</th>
                        </tr>

                      </thead>
                      <tbody class="uploadvalidationSuccess">
                        <!-- <tr>
                  <td style="width: 150px;">1</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">3</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">5</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">8</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">10</td>
                  <td>Contain Special Character</td>
                </tr>
                <tr>
                  <td style="width: 150px;">19</td>
                  <td>Contain Special Character</td>
                </tr> -->
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>
                <div class="col-md-12">
                  <div class="form-line" id="validateImportHide">
                    <!-- <button type="button" class="btn-default1 btn" id="prev-btn1"
                  style="font-weight: 600;">Previous</button>
                <button class="initative_save_btn pull-right" id="next-btn-2"
                  style="font-weight: 600;">Next</button> -->
                  </div>
                </div>
              </div>

              <div class="row" id="file-save" style="display: none;">
                <div class="col-md-12">
                  <div class="col-md-12 img-center">
                    <img src="images/Success.png" alt="Verified" />
                    <span id="statisticmessage"
                      style="text-align: center; margin-left: 42% !important; color :green; width: 100%; margin-right: 25% !important;"></span>
                    <div class="error-div">
                      <table class="error-table">
                        <thead>
                          <tr>
                            <th style="width: 300px; text-align: center;">
                              Statististics</th>
                            <th style="width: 300px; text-align: center;">Message</th>
                          </tr>

                        </thead>
                        <tbody class="uploadStatististics">
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>
                <div class="col-md-12">
                  <div class="form-line">
                    <button type="button" class="btn-default1 btn" id="prev-btn2"
                      style="font-weight: 600;">Previous</button>
                    <button class="initative_save_btn pull-right" id="done-btn" style="font-weight: 600;"
                      data-dismiss="modal" aria-label="Close">Done</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <!-- END File Validate Form -->
      <!-- File Upload Success PopUp Start -->

      <div class="modal fade upLoadBudgetSuccessModal" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="myLargeModalLabel">Success!</h6>
              <button type="button" class="close fileuploadclose" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id="budgetSuccess" style="overflow-x: scroll;">

            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
            </div>

          </div>
        </div>
      </div>

      <!-- File Upload Success PopUp End -->
      <!--#END View -->
      <section class="content">
        <c:if test="${pageId != null}">
          <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out
        value=" ${pageId}" />">
        </c:if>
        <!-- Page Header -->
        <div class="page-header row no-gutters py-2 m-t--70" style="width: 2400px">
          <div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
            <h5 class="page-title" style="font-weight: 600; text-transform: uppercase">
              Budget
            </h5>
          </div>
        </div>

        <div class="row">
          <div class="col-md-9"></div>
          <div class="col-md-3 mt-2">
            <select class="btn btn-custom-secondary pull-right" id="approvedDraft"
              style="position: fixed; width: 130px;">
              <option value="APPROVED">Approved</option>
              <option value="DRAFT">Draft</option>
            </select>
            <input type="hidden" id="changeId" name="changeId" value="">
            <button class="btn btn-custom-secondary pull-right" style="margin-left: 135px;position: fixed;"
              onclick="sendApprovalOnce(this)">
              <i class="fa fa-check-circle" title="Send To Approval"></i>
            </button>
            <a href="#" style=" padding: 2px;position: relative;overflow: hidden;display: inline-block;">
              <button class="btn btn-custom-secondary" data-toggle="modal" data-target=".file_upload_popup"
                style="position: fixed; right: 100px" title="Import">
                <i class="fas fa-download"></i>
                <!-- <input type="file" accept=".xlsx, .xls, .csv" id="budgetscorescrd" style="position: absolute; left: 0; top: 0; opacity: 0; cursor: pointer;" /> -->
              </button></a>
            </button>
            <button class="btn btn-custom-secondary" id="OpenImgUploadExport" style="position: fixed; right: 55px"
              title="Export">
              <i class="fas fa-upload"></i>
            </button>
            <button class="btn btn-custom-secondary" data-toggle="modal" data-target=".scorecard_description_popup"
              style="position: fixed; right: 15px" id="addRowButton" title="Add">
              <i class="fa fa-plus-square" aria-hidden="true"></i>
            </button>
          </div>
        </div>



        <!-- <div class="container-fluid">
      <div class="tableview">
        <div class="row">
          <div class="col-lg-12 col-md-6 select-toggle financial">
            <div class="card">
              <div class="tableBody">
                <div class="table-responsive" id="budget_table">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

        <div class="container-fluid" style="margin-top: 70px;">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div id="spreadsheet"></div>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <div class="tableview">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <div tabindex="1" class="jexcel_container">
                  <div class="jexcel_toolbar"></div>
                  <div class="jexcel_content">
                    <!-- <table id="budget_table" border="1">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>
                            <select>
                              <option value="volvo">Volvo</option>
                              <option value="saab">Saab</option>
                              <option value="opel">Opel</option>
                              <option value="audi">Audi</option>
                            </select>
                           
                          </td>
                          <td>25</td>
                          <td><button class="addRow">+</button></td>
                      </tr>
                  </tbody>
                </table> -->

                    <!-- <table id="budget_table">
                  <thead>
                    <th>id</th>
                    <th>owner</th>
                  </thead>
                  <tbody></tbody>
                </table> -->
                    <div class="jexcel_corner" unselectable="on" onselectstart="return false"
                      style="top: -2000px; left: -2000px"></div>
                    <textarea class="jexcel_textarea" id="jexcel_textarea" tabindex="-1"></textarea>
                  </div>
                  <div class="jexcel_pagination" style="display: none">
                    <div></div>
                    <div></div>
                  </div>
                  <div class="jexcel_contextmenu jcontextmenu"></div>
                  <div class="jexcel_about">
                    <a href="https://bossanova.uk/budget/"><span>budget CE</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade sub_initative_edit_popup" tabindex="-1" role="dialog"
          aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header modalheadercolor">
                <h6 class="modal-title" id="myLargeModalLabel_1">
                  Sub Initiative Description
                </h6>
                <button type="button" class="close" data-dismiss="modal" id="subIniClosePopup" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="sub_initative_Form">
                  <div class="form-row">
                    <div class="form-group col-md-12" id="sub_Initiative_id_wrapper" style="display: none">
                      <label for="sub_Initiative_id">ID</label>
                      <input type="text" class="form-control browser-default" name="sub_Initiative_id"
                        id="sub_Initiative_id" placeholder="" />
                      <input type="hidden" name="initiativeID" id="initiativeID" />
                      <input type="hidden" name="subinitiativeID" id="subinitiativeID" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="sub_initative_desc" data-i18n="Name">Name</label>
                      <textarea class="form-control browser-default" autocomplete="off" name="subinitiative_desc"
                        id="subinitiative_desc" cols="" rows="6"></textarea>
                    </div>
                  </div>
                  <hr />
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="sub_initative_progress">Progress (%)</label>
                      <input type="number" min="0" max="100" class="form-control browser-default"
                        name="sub_initative_progress" id="sub_initative_progress" placeholder="" value="0" />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="sub_initative_progress">Contribution (%)</label>
                      <input type="number" min="0" max="100" class="form-control browser-default"
                        name="sub_initative_contribution" id="sub_initative_contribution" placeholder="" value="0" />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="sub_initative_start_end">Start / End Date</label>
                      <input type="text" autocomplete="off" name="sub_Initiative_date"
                        class="form-control browser-default datepicker-here sub_initative_start_end" data-range="true"
                        data-multiple-dates-separator=" - " data-language="en" id="air-date-sub-init" />
                      <input type="hidden" name="Sub_Initiative_owner" id="Sub_Initiative_owner" />
                      <input type="hidden" name="subinitiative_name" id="subinitiative_name" />
                    </div>
                  </div>
                  <div class="form-line right">
                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
                      data-i18n="Cancel">
                      Cancel
                    </button>
                    <button class="initative_save_btn" data-dismiss="modal" value="Save" type="button"
                      onclick="saveSubinitiativeData(event)" data-i18n="Save">
                      Save
                    </button>
                    <input type="hidden" name="action" value="" />
                    <input type="hidden" name="subCreatedById" id="subCreatedById" value="" />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                  <div class="d-flex flex-row">
                    <p class="kpi_audit">Audit</p>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex flex-column">
                      <p>
                        <span>Created By : </span><span id="subCreatedBy"></span>
                      </p>
                      <p>
                        <span>Created Date : </span><span id="subCreatedByDate"></span>
                      </p>
                    </div>
                    <div class="d-flex flex-column pl-5">
                      <p>
                        <span>Modified By : </span><span id="subUpdatedBy"></span>
                      </p>
                      <p>
                        <span>Modified Date : </span><span id="subUpdatedByDate"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities Pop up modal -->
        <div class="modal fade activities_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header modalheadercolor">
                <h6 class="modal-title" id="myLargeModalLabel_1">
                  Activities Description
                </h6>
                <button type="button" class="close" id="activClosePopup" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="activitiesForm">
                  <div class="form-row">
                    <input type="hidden" name="initiativeID" id="initiativeID" />

                    <div class="form-group col-md-12" id="activities_id_wrapper" style="display: none">
                      <label for="activities_id">ID</label>
                      <input type="text" class="form-control browser-default" name="activities_id" id="activities_id"
                        placeholder="" />
                      <input type="hidden" name="activities_hidden_id" id="activities_hidden_id" />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="subInitative_desc">Sub Initiatives</label>
                      <select name="subInitative_desc" id="subInitative_desc"></select>
                    </div>
                  </div>
                  <hr />
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="sub_initative_desc" data-i18n="Name">Name</label>
                      <textarea class="form-control browser-default" name="activities_desc" id="activities_desc" cols=""
                        rows="6" autocomplete="off"></textarea>
                    </div>
                  </div>
                  <hr />
                  <div class="form-row">
                    <!--<div class="form-group col-md-4">
                              <label for="sub_initative_desc">Name</label>
                              <input type="text" class="form-control browser-default" name="activities_name" id="activities_name" placeholder="">
                          </div>-->
                    <div class="form-group col-md-6">
                      <label for="sub_initative_progress">Progress (%)</label>
                      <input type="number" min="0" max="100" autocomplete="off" class="form-control browser-default"
                        name="activities_progress" id="activities_progress" placeholder="" value="0" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="sub_initative_start_end">Start / End Date</label>
                      <input type="text" class="form-control browser-default datepicker-here" autocomplete="off"
                        name="activitierange" data-range="true" data-multiple-dates-separator=" - " data-language="en"
                        id="activities_start_end" />
                    </div>
                  </div>
                  <div class="form-row">
                    <!--<div class="form-group col-md-4">
                              <label for="sub_initative_desc">Name</label>
                              <input type="text" class="form-control browser-default" name="activities_name" id="activities_name" placeholder="">
                          </div>-->
                    <div class="form-group col-md-6">
                      <label for="sub_initative_budget" data-i18n="Budget">Budget</label>
                      <input type="text" autocomplete="off" class="form-control browser-default"
                        name="activities_budget" id="activities_budget" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="sub_initative_Actual" data-i18n="Actual">Actual</label>
                      <input type="text" class="form-control browser-default" name="activities_Actual"
                        autocomplete="off" id="activities_Actual" />
                    </div>
                  </div>
                  <div class="form-line right">
                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
                      data-i18n="Cancel">
                      Cancel
                    </button>
                    <button class="initative_save_btn" data-dismiss="modal" value="Save" type="button"
                      onclick="saveActivityData(event)" data-i18n="Save">
                      Save
                    </button>
                    <input type="hidden" name="action" value="" />
                    <input type="hidden" name="activCreatedById" id="activCreatedById" value="" />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                  <div class="d-flex flex-row">
                    <p class="kpi_audit">Audit</p>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex flex-column">
                      <p>
                        <span>Created By : </span><span id="activCreatedBy"></span>
                      </p>
                      <p>
                        <span>Created Date : </span><span id="activCreatedByDate"></span>
                      </p>
                    </div>
                    <div class="d-flex flex-column pl-5">
                      <p>
                        <span>Modified By : </span><span id="activUpdatedBy"></span>
                      </p>
                      <p>
                        <span>Modified Date : </span><span id="activUpdatedByDate"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subactivity pop up -->
        <div class="modal fade add_subActivities_popup" tabindex="-1" role="dialog"
          aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header modalheadercolor">
                <h6 class="modal-title" id="myLargeModalLabel_1">
                  SubActivities Description
                </h6>
                <button type="button" class="close" id="activClosePopup" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="subActivitiesForm">
                  <div class="form-row"></div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="sub_initative_desc" data-i18n="Name">Name</label>
                      <textarea class="form-control browser-default" name="subactivities_desc" id="subactivities_desc"
                        cols="" rows="6" autocomplete="off"></textarea>
                    </div>
                  </div>
                  <hr />
                  <!-- <input type="hidden" name="activitiesID" id="activitiesID" /> -->
                  <div class="form-row">
                    <!--<div class="form-group col-md-4">
                              <label for="sub_initative_desc">Name</label>
                              <input type="text" class="form-control browser-default" name="activities_name" id="activities_name" placeholder="">
                          </div>-->
                    <div class="form-group col-md-6">
                      <label for="sub_initative_progress">Progress (%)</label>
                      <input type="number" min="0" max="100" autocomplete="off" class="form-control browser-default"
                        name="subactivities_progress" id="subactivities_progress" placeholder="" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="sub_initative_start_end">Start / End Date</label>
                      <input type="text" class="form-control browser-default datepicker-here" autocomplete="off"
                        name="activitierange" data-range="true" data-multiple-dates-separator=" - " data-language="en"
                        id="subactivities_start_end" />
                    </div>
                  </div>
                  <div class="form-row">
                    <!--<div class="form-group col-md-4">
                              <label for="sub_initative_desc">Name</label>
                              <input type="text" class="form-control browser-default" name="activities_name" id="activities_name" placeholder="">
                          </div>-->
                    <div class="form-group col-md-6">
                      <label for="sub_initative_budget" data-i18n="Budget">Budget</label>
                      <input type="text" autocomplete="off" class="form-control browser-default"
                        name="subactivities_budget" id="subactivities_budget" />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="sub_initative_Actual" data-i18n="Actual">Actual</label>
                      <input type="text" class="form-control browser-default" name="subactivities_Actual"
                        autocomplete="off" id="subactivities_Actual" />
                    </div>
                  </div>
                  <div class="form-line right">
                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
                      data-i18n="Cancel">
                      Cancel
                    </button>
                    <button type="submit" class="initative_save_btn" value="Save" onclick="saveSubActivityData(event)"
                      data-i18n="Save">
                      Save
                    </button>
                    <input type="hidden" name="action" value="" />
                    <input type="hidden" name="subactivCreatedById" id="subactivCreatedById" value="" />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <div class="d-flex flex-column flex-fill ml-4 mb-5 text-left font-11">
                  <div class="d-flex flex-row">
                    <p class="kpi_audit">Audit</p>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex flex-column">
                      <p>
                        <span>Created By : </span><span id="activCreatedBy"></span>
                      </p>
                      <p>
                        <span>Created Date : </span><span id="activCreatedByDate"></span>
                      </p>
                    </div>
                    <div class="d-flex flex-column pl-5">
                      <p>
                        <span>Modified By : </span><span id="activUpdatedBy"></span>
                      </p>
                      <p>
                        <span>Modified Date : </span><span id="activUpdatedByDate"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade file_upload_popup1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="myLargeModalLabel">File Upload</h6>
                <button type="button" class="close fileuploadclose" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <form action="" method="post" enctype="multipart/form-data">
                    <div class="col-md-12" style="width: 100%; margin-bottom: 2%">
                      <input type="file" accept=".xlsx, .xls, .csv" style="
                      padding-bottom: 12%;
                      padding-top: 3%;
                      padding-right: 5%;
                    " class="form-control" id="importinitiative" name="importinitiative" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- End of File Upload PopUp -->


      </section>

      <!-- Plugins Js -->

      <script src="${contextroot}/js/app.min.js"></script>
      <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
      <script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
      <!-- Custom Js -->
      <script src="${contextroot}/js/admin.js"></script>
      <!-- Knob Js -->
      <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
      <script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>

      <!-- Knob Js -->
      <script src="${contextroot}/js/jquery-ui.min.js"></script>
      <script src="${contextroot}/js/moment.js"></script>
      <script src="${contextroot}/js/jquery.editable.min.js"></script>
      <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
      <script src="${contextroot}/js/datepickerair.js"></script>
      <script src="${contextroot}/js/datepicker.en.js"></script>
      <script src="${contextroot}/js/handlebars.js"></script>
      <script src="${contextroot}/js/widgets.js"></script>
      <script src="${contextroot}/js/notify.js"></script>
      <script src="${contextroot}/js/select2.min.js"></script>
      <script src="${contextroot}/js/kpidata_form.js"></script>
      <script src="${contextroot}/js/initial.js"></script>

      <script>
        $(".modal-dialog").draggable({
          handle: ".modal-header",
        });

        $.fn.select2.amd.define(
          "SearchableSingleSelection",
          [
            "select2/utils",
            "select2/selection/single",
            "select2/selection/eventRelay",
            "select2/dropdown/search",
          ],
          function (Utils, SingleSelection, EventRelay, DropdownSearch) {
            var adapter = Utils.Decorate(SingleSelection, DropdownSearch);
            adapter = Utils.Decorate(adapter, EventRelay);

            adapter.prototype.render = function () {
              var $rendered = DropdownSearch.prototype.render.call(
                this,
                SingleSelection.prototype.render
              );

              this.$searchContainer.hide();
              this.$element
                .siblings(".select2")
                .find(".selection")
                .prepend(this.$searchContainer);

              return $rendered;
            };

            var bindOrigin = adapter.prototype.bind;
            adapter.prototype.bind = function (container) {
              var self = this;

              bindOrigin.apply(this, arguments);

              container.on("open", function () {
                self.$selection.hide();
                self.$searchContainer.show();
              });

              container.on("close", function () {
                self.$searchContainer.hide();
                self.$selection.show();
              });
            };

            return adapter;
          }
        );

        /*
         * A select2 adapter to show simple dropdown list without a searchbox inside
         */
        $.fn.select2.amd.define(
          "UnsearchableDropdown",
          [
            "select2/utils",
            "select2/dropdown",
            "select2/dropdown/attachBody",
            "select2/dropdown/closeOnSelect",
          ],
          function (Utils, Dropdown, AttachBody, CloseOnSelect) {
            var adapter = Utils.Decorate(Dropdown, AttachBody);
            adapter = Utils.Decorate(adapter, CloseOnSelect);
            return adapter;
          }
        );
      </script>

      <script>
        var deptlist = [];
        var employeeList = [];
        var glData = [];
        var projectList = [];
        var subinitiativeList = [];
        var activityListDataList = [];
        var subActivityListDataList = [];

        async function apiCalls() {
          //Deprtment api
          $.ajax({
            url: "/stratroom/allDepartmentList",
            async: false,
            success: function (data) {
              deptlist = data;
              console.log("Department List:", deptlist);
            },
          });

          // Fetch employee list once (adjust this part based on your actual employee data fetching method)
          $.ajax({
            url: "/stratroom/organization/employeeList",
            async: false,
            success: function (data) {
              employeeList = data;
              console.log("Employee list:", employeeList);
            },
          });

          //Masters Butable api
          $.ajax({
            url: "/stratroom/retrieveMasterTypes?type=BUDGET",
            async: false,
            success: function (data) {
              glData = data;
              console.log("glData:", glData);
            },
          });

          //project&initiative data api
        }

        function initiativeApi() {
          var currentEmp = $("#userPrincipal").val();
          $.ajax({
            // url: "/stratroom/initiativesList?loadFlag=true&pageId=1917&status=date",
            url: "/stratroom/initiativesListByEmpId/" + $("#userPrincipal").val(),
            async: false,
            success: function (data) {
              projectList = data;
              console.log("projectList:", projectList);
            },
          });
        }

        initiativeApi();
        apiCalls();

        //GL account on change
        function handleglChange(selectElement) {
          // Get the selected option DOM element
          const selectedOption = selectElement.options[selectElement.selectedIndex];

          const selectedText = selectedOption.text;

          const selectedValue = selectedOption.value;
          const glDataObj = glData.find((item) => item.id == selectedValue);

          console.log(glDataObj, "glDataObj");
          if (glDataObj) {
            $(selectElement)
              .closest("tr")
              .find("#glname")
              .val(glDataObj.data.glName);
            $(selectElement)
              .closest("tr")
              .find("#budgetType")
              .val(glDataObj.data.budgetType);
          } else {
            $(selectElement).closest("tr").find("#glname").val("");
            $(selectElement).closest("tr").find("#budgetType").val("");
          }
        }

        // function breakText(text, maxWordsPerLine) {
        //   let words = text.split(" ");
        //   let lines = [];

        //   for (let i = 0; i < words.length; i += maxWordsPerLine) {
        //     lines.push(words.slice(i, i + maxWordsPerLine).join(" "));
        //   }

        //   return lines.join("<br>");
        // }

        function handleglProjectChange(selectElement) {
          // Get the selected option DOM element
          const selectedOption = selectElement.options[selectElement.selectedIndex];

          const selectedText = selectedOption.text;
          const selectedValue = selectedOption.value;

          // Find the selected project object from the project list
          var projectObj = projectList.find((item) => item.id == selectedValue);

          console.log(projectObj, "projectObj");

          //Sub initiative list api
          // subInitiativeInsertList(selectElement, selectedValue);

          //Activity list api
          // activityInsertList(selectElement, selectedValue);

          // Clear fields and dropdowns if no project is found
          $(selectElement)
            .closest("tr")
            .find("#outcome")
            .val(projectObj.initiativeValue.perspectiveName);
          $(selectElement)
            .closest("tr")
            .find("#objective")
            .val(projectObj.initiativeValue.objectiveDesc);
        }

        function activityInsertList(selectElement, selectedValue) {
          $.ajax({
            url: "/stratroom/activitieslist/" + selectedValue,
            type: "GET",
            success: function (data, status) {
              const activityList = data;
              activityListDataList = data;
              const activityDropdown = $(selectElement)
                .closest("tr")
                .find("#activity");

              activityDropdown.empty();
              activityDropdown.append('<option value=""></option>');

              if (activityList && activityList.length > 0) {
                activityList.forEach((activity) => {
                  const activityDesc =
                    activity.activitiesValue?.desc || "Unnamed Activity";
                  const selected = activity == activity.id ? "selected" : "";
                  activityDropdown.append(
                    '<option value="' +
                    activity.id +
                    '" ' +
                    selected +
                    ">" +
                    activityDesc +
                    "</option>"
                  );
                });
              }

              // Add the "Add Option" at the end
              activityDropdown.append(
                '<option class="btn btn-primary" id="activityAdd" value="addNewOption">Add Option</option>'
              );
            },
            error: function (xhr, status, error) {
              console.error("API call failed:", status, error);

              const activityDropdown = $(selectElement)
                .closest("tr")
                .find("#activity");

              activityDropdown.empty();
              activityDropdown.append('<option value=""></option>');

              activityDropdown.append(
                '<option class="btn btn-primary" id="activityAdd" value="addNewOption">Add Option</option>'
              );
            },
          });
        }

        function subInitiativeInsertList(selectElement, selectedValue) {
          $.ajax({
            url: "/stratroom/subInitiativesList/" + selectedValue,
            type: "GET",
            // contentType: "application/json",
            success: function (data, status) {
              const subInitiativeDropdownList = data;
              subinitiativeList = data;
              console.log("Received Data:", subInitiativeDropdownList, data);
              console.log(subinitiativeList, "listttttttt");

              $("#subInitative_desc").empty();

              subInitiativeDropdownList.forEach(function (item) {
                $("#subInitative_desc").append(
                  $("<option>", {
                    value: item.id,
                    text: item.subInitiativeValue?.description,
                  })
                );
              });

              //sub initiative dropdown map
              const subInitiativeDropdown = $(selectElement)
                .closest("tr")
                .find("#subinitiative");

              subInitiativeDropdown.empty();
              subInitiativeDropdown.append('<option value=""></option>');

              if (
                subInitiativeDropdownList &&
                subInitiativeDropdownList.length > 0
              ) {
                subInitiativeDropdownList.forEach((val) => {
                  const subInitiativeDesc =
                    val.subInitiativeValue?.description || "Unnamed Activity";
                  const selected = subinitiative == val.id ? "selected" : "";

                  console.log(subInitiativeDesc, "subInitiativeDesc");

                  subInitiativeDropdown.append(
                    '<option value="' +
                    val.id +
                    '" ' +
                    selected +
                    ">" +
                    subInitiativeDesc +
                    "</option>"
                  );
                });
              }

              // Add the "Add Option" at the end
              subInitiativeDropdown.append(
                '<option class="btn btn-primary" id="subinitiativeAdd" value="addNewOption">Add Option</option>'
              );
            },
            error: function (xhr, status, error) {
              console.error("API call failed:", status, error);

              const subInitiativeDropdown = $(selectElement)
                .closest("tr")
                .find("#subinitiative");

              subInitiativeDropdown.empty();
              subInitiativeDropdown.append('<option value=""></option>');

              subInitiativeDropdown.append(
                '<option class="btn btn-primary" id="subinitiativeAdd" value="addNewOption">Add Option</option>'
              );
            },
          });
        }

        var selectedPageId = "";
        var selectedInitiativeId = "";
        var selectedElement = "";

        //Activity onchange function
        function handleActivity(selectElement) {
          const selectedOption = selectElement.options[selectElement.selectedIndex];
          const selectedText = selectedOption.text;
          const selectedValue = selectedOption.value;

          selectedElement = selectElement;
          var rowElement = selectElement.closest("tr");
          var idName = rowElement.getAttribute("id");
          var changeId = rowElement.getAttribute("changeId");
          var deptId = rowElement.getAttribute("data-dept-id");
          var pageId = rowElement.getAttribute("data-page-id");
          var initiativeId = rowElement.getAttribute("data-project-id");

          selectedInitiativeId = rowElement.querySelector("#objective")
            ? rowElement.querySelector("#projectinitiative").value
            : "";

          activityInsertList(selectElement, selectedInitiativeId);

          console.log(selectedInitiativeId, "selectedInitiativeId");
          // selectedPageId = pageId;
          // selectedInitiativeId = initiativeId;
          console.log(
            rowElement,
            idName, changeId,
            deptId,
            pageId,
            selectedInitiativeId,
            projectinitiative,
            "rowElement"
          );
          if (selectElement.value == "addNewOption") {
            $.ajax({
              url: "/stratroom/subInitiativesList/" + initiativeId,
              type: "GET",
              // contentType: "application/json",
              success: function (data, status) {
                const subInitiativeDropdownList = data;
                subinitiativeList = data;
                console.log("Received Data:", subInitiativeDropdownList, data);
                console.log(subinitiativeList, "listttttttt");

                $("#subInitative_desc").empty();

                subInitiativeDropdownList.forEach(function (item) {
                  $("#subInitative_desc").append(
                    $("<option>", {
                      value: item.id,
                      text: item.subInitiativeValue?.description,
                    })
                  );
                });
              },
            });

            $("#activities_desc").val("");
            $("#activities_progress").val("");
            $("#activities_start_end").val("");
            $("#activities_budget").val("");
            $("#activities_Actual").val("");
            // Trigger the modal popup
            $(".activities_popup").modal("show");
          }

          // if(selectedValue !== "addNewOption") {

          //   //Sub initiative list api
          //   handleSubActivityInsert(selectElement, selectedValue);
          // }
        }

        var activityId = "";
        //handle sub activity change
        function handleSubActivityChange(selectElement) {
          const selectedOption = selectElement.options[selectElement.selectedIndex];
          const selectedText = selectedOption.text;
          const selectedValue = selectedOption.value;

          selectedElement = selectElement;
          var rowElement = selectElement.closest("tr");

          activityId = rowElement.querySelector("#objective")
            ? rowElement.querySelector("#activity").value
            : "";

          handleSubActivityInsert(selectElement, activityId);
          // console.log(selectedInitiativeId, "selectedInitiativeId");
          // selectedPageId = pageId;
          // selectedInitiativeId = initiativeId;
          console.log(rowElement, activityId, selectedElement, "rowElementeewe");
          if (selectElement.value == "addNewOption") {
            $("#subactivities_desc").val("");
            $("#subactivities_progress").val("");
            $("#subactivities_start_end").val("");
            $("#subactivities_budget").val("");
            $("#subactivities_Actual").val("");

            // Trigger the modal popup
            $(".add_subActivities_popup").modal("show");
          }
        }

        //handleActivitySubActivityUpdate
        function handleUpdateAmount(selectElement) {
          var rowElement = selectElement.closest("tr");

          const activityIdValue = rowElement.querySelector("#objective")
            ? rowElement.querySelector("#activity").value
            : "";

          const projectInitiativeIdValue = rowElement.querySelector("#objective")
            ? rowElement.querySelector("#projectinitiative").value
            : "";

          const subActivityIdValue = rowElement.querySelector("#objective")
            ? rowElement.querySelector("#subActivity").value
            : "";

          const amount = rowElement.querySelector("#objective")
            ? rowElement.querySelector("#amount").value
            : "";

          console.log(
            activityIdValue,
            subActivityIdValue,
            "actvityIdSubActivityIdValue"
          );

          if (subActivityIdValue) {
            $.ajax({
              url: "/stratroom/subActivitieslist/" + activityIdValue,
              type: "GET",
              // contentType: "application/json",
              success: function (data, status) {
                const subActivityDropdownList = data;
                subActivityListDataList = data;

                var subActivityObj = {};
                var selectedSubActivityList = {};

                selectedSubActivityList = data?.find(
                  (item) => item.id == subActivityIdValue
                );

                subActivityObj = selectedSubActivityList
                  ? selectedSubActivityList
                  : {};

                subActivityObj.activitiesValue.budget = amount;

                $.ajax({
                  url: "/stratroom/subactivities",
                  type: "PUT",
                  contentType: "application/json",
                  data: JSON.stringify(subActivityObj),
                  success: function (data, status) {
                    console.log("Sub-activity updated successfully.");
                  },
                  error: function (xhr, status, error) {
                    console.error("Error updating sub-activity:", error);
                  },
                });
              },
            });
          } else if (activityIdValue) {
            $.ajax({
              url: "/stratroom/activitieslist/" + projectInitiativeIdValue,
              type: "GET",
              success: function (data, status) {
                const activityList = data;
                activityListDataList = data;

                var activityObj = {};

                const selectedActivityList = data?.find(
                  (item) => item.id == activityIdValue
                );

                activityObj = selectedActivityList ? selectedActivityList : {};

                activityObj.activitiesValue.budget = amount;

                $.ajax({
                  url: "/stratroom/activities",
                  type: "PUT",
                  contentType: "application/json",
                  data: JSON.stringify(activityObj),
                  success: function (data, status) {
                    console.log("Activity updated successfully.");
                  },
                  error: function (xhr, status, error) {
                    console.error("Error updating activity:", error);
                  },
                });
              },
            });
          }

          if (projectInitiativeIdValue) {
            $.ajax({
              url: "/stratroom/activitieslist/" + projectInitiativeIdValue,
              type: "GET",
              success: function (data, status) {
                const activityList = data;
                activityListDataList = data;
              },
            });
          }
          if (activityIdValue) {
            $.ajax({
              url: "/stratroom/subActivitieslist/" + activityIdValue,
              type: "GET",
              // contentType: "application/json",
              success: function (data, status) {
                const subActivityDropdownList = data;
                subActivityListDataList = data;
              },
            });
          }

          console.log(activityListDataList, subActivityListDataList, "acsubac");
        }

        //Sub activity insert list
        function handleSubActivityInsert(selectElement, selectedValue) {
          $.ajax({
            url: "/stratroom/subActivitieslist/" + selectedValue,
            type: "GET",
            // contentType: "application/json",
            success: function (data, status) {
              const subActivityDropdownList = data;
              subActivityListDataList = data;

              console.log("Received Data:", subActivityDropdownList, data);

              //sub initiative dropdown map
              const suActivityDropDown = $(selectElement)
                .closest("tr")
                .find("#subActivity");

              suActivityDropDown.empty();
              suActivityDropDown.append('<option value=""></option>');

              if (subActivityDropdownList && subActivityDropdownList.length > 0) {
                subActivityDropdownList.forEach((val) => {
                  const subActivityDesc =
                    val.activitiesValue?.desc || "Unnamed Activity";
                  const selected = subActivity == val.id ? "selected" : "";
                  suActivityDropDown.append(
                    '<option value="' +
                    val.id +
                    '" ' +
                    selected +
                    ">" +
                    subActivityDesc +
                    "</option>"
                  );
                });
              }

              suActivityDropDown.append(
                '<option class="btn btn-primary" id="subActivityAdd" value="addNewOption">Add Option</option>'
              );
            },
            error: function (xhr, status, error) {
              console.error("API call failed:", status, error);

              const suActivityDropDown = $(selectElement)
                .closest("tr")
                .find("#subActivity");

              suActivityDropDown.empty();
              suActivityDropDown.append('<option value=""></option>');

              suActivityDropDown.append(
                '<option class="btn btn-primary" id="subActivityAdd" value="addNewOption">Add Option</option>'
              );
            },
          });
        }

        //Delete Function
        function handleDelete(id) {
          console.log(id, "id");
          deleteId = id;
          $.ajax({
            url: "/stratroom/budgets/" + id,
            type: "DELETE",
            contentType: "application/json",
            success: function (data, status) {
              $.notify("Success: Deleted Successfully", {
                style: "success",
                className: "graynotify",
              });
              // fetchBudgetList();
              location.reload(true);
            },
            error: function (xhr, status, error) {
              console.error("Error:", error);
              alert("Failed to delete. Please try again.");
            },
          });
        }

        //Update api
        function handleUpdate(inputElement) {
          var rowElement = inputElement.closest("tr");
          var idName = rowElement.getAttribute("id");
          var changeId = rowElement.getAttribute("changeId");
          var deptId = rowElement.getAttribute("data-dept-id");

          console.log(rowElement, inputElement, "rowElement");

          //Feild values
          const year = rowElement.querySelector("#year")
            ? rowElement.querySelector("#year").value
            : "";
          const month = rowElement.querySelector("#month")
            ? rowElement.querySelector("#month").value
            : "";
          const version = rowElement.querySelector("#version")
            ? rowElement.querySelector("#version").value
            : "";
          const glAccount = rowElement.querySelector("#glAccount")
            ? rowElement.querySelector("#glAccount").value
            : "";
          const glname = rowElement.querySelector("#glname")
            ? rowElement.querySelector("#glname").value
            : "";
          const budgetType = rowElement.querySelector("#budgetType")
            ? rowElement.querySelector("#budgetType").value
            : "";
          const currency = rowElement.querySelector("#currency")
            ? rowElement.querySelector("#currency").value
            : "";
          const noofDays = rowElement.querySelector("#noofDays")
            ? rowElement.querySelector("#noofDays").value
            : "";
          const unitAmount = rowElement.querySelector("#unitamount")
            ? rowElement.querySelector("#unitamount").value
            : "";
          const amount = rowElement.querySelector("#amount")
            ? rowElement.querySelector("#amount").value
            : "";
          const outcome = rowElement.querySelector("#outcome")
            ? rowElement.querySelector("#outcome").value
            : "";
          const objective = rowElement.querySelector("#objective")
            ? rowElement.querySelector("#objective").value
            : "";
          const projectinitiative = rowElement.querySelector("#objective")
            ? rowElement.querySelector("#projectinitiative").value
            : "";
          const subinitiative = rowElement.querySelector("#subinitiative")
            ? rowElement.querySelector("#subinitiative").value
            : "";
          const subinitiativeDesElement = rowElement.querySelector(
            "#subinitiative option:checked"
          );
          const subinitiativeDes = subinitiativeDesElement
            ? subinitiativeDesElement.textContent.trim()
            : "";

          console.log(subinitiativeDes, subinitiative, "subInitiativepppppdes");
          const activity = rowElement.querySelector("#activity")
            ? rowElement.querySelector("#activity").value
            : "";

          const activityDesElement = rowElement.querySelector(
            "#activity option:checked"
          );
          const activityDes = activityDesElement
            ? activityDesElement.textContent.trim()
            : "";

          const subActivity = rowElement.querySelector("#subActivity")
            ? rowElement.querySelector("#subActivity").value
            : "";

          const subActivityDesElement = rowElement.querySelector(
            "#subActivity option:checked"
          );
          const subActivityDes = subActivityDesElement
            ? subActivityDesElement.textContent.trim()
            : "";

          const division = rowElement.querySelector("#division")
            ? rowElement.querySelector("#division").value
            : "";
          const person = rowElement.querySelector("#person")
            ? rowElement.querySelector("#person").value
            : "";
          const notes = rowElement.querySelector("#notes")
            ? rowElement.querySelector("#notes").value
            : "";

          console.log(
            year,
            month,
            version,
            projectinitiative,
            subActivity,
            activity,
            subinitiative,
            "rowData"
          );

          var subInitiativeDes = "";
          var selectedSubinitiativeList = "";
          if (subinitiative) {
            selectedSubinitiativeList = subinitiativeList?.find(
              (item) => item.id == subinitiative
            );
            subInitiativeDes = selectedSubinitiativeList?.subInitiativeValue
              ?.description
              ? selectedSubinitiativeList?.subInitiativeValue?.description
              : "";
          }

          var activityObj = {};

          if (activity) {
            const selectedActivityList = activityListDataList?.find(
              (item) => item.id == activity
            );

            activityObj = selectedActivityList ? selectedActivityList : {};
          }

          var subActivityObj = {};
          var selectedSubActivityList = {};
          if (subActivity) {
            selectedSubActivityList = subActivityListDataList?.find(
              (item) => item.id == subActivity
            );

            subActivityObj = selectedSubActivityList ? selectedSubActivityList : {};
          }

          console.log(
            selectedSubActivityList,
            selectedSubinitiativeList,
            activityListDataList,
            subActivityListDataList,
            "selectedSubActivityList"
          );

          var updatePayload = {
            pageId: $("#pagenumber").val(),
            createBy: "",
            id: idName,
            changeId: changeId,
            updateBy: "",
            owner: "",
            deptId: deptId,
            initiativeId: projectinitiative,
            subInitiativeId: subinitiative,
            // subInitiativeDesc: subInitiativeDes,
            activityId: activity,
            // activityDesc: activityDes,
            subActivityId: subActivity,
            // subInitiativeDesc: subinitiative,
            budgetValues: {
              year: year !== "Select" ? year : "",
              month: month !== "Select" ? month : "",
              version: version || "",
              glAccount: glAccount !== "Select" ? glAccount : "",
              glname: glname !== "Select" ? glname : "",
              budgetType: budgetType !== "Select" ? budgetType : "",
              currency: currency !== "Select" ? currency : "",
              noofDays: noofDays || "",
              unitamount: unitamount || "",
              amount: amount || "",
              outcome: outcome !== "Select" ? outcome : "",
              objective: objective !== "Select" ? objective : "",
              projectinitiative:
                projectinitiative !== "Select" ? projectinitiative : "",
              subinitiative: subinitiative,
              subInitiativeDesc: subinitiativeDes,
              subInDes: subinitiativeDes,
              activity: activity,
              activityDesc: activityDes,
              subActivity: subActivity,
              subActivityDes: subActivityDes,
              // subInitiativeDesc: subActivityDes,
              subActivityList: "",
              division: division !== "Select" ? division : "",
              person: person !== "Select" ? person : "",
              notes: notes || "",
              // subinInitiativeDropDownList: subinitiativeList || [],
              // activeDropDownList: activityListDataList || [],
              // subActivityDropDownList: subActivityListDataList || [],
            },
          };

          // if (amount !== null && amount !== undefined && amount !== "") {
          //   if (
          //     subActivity !== null &&
          //     subActivity !== undefined &&
          //     subActivity !== ""
          //   ) {
          //     if (subActivityObj && subActivityObj.activitiesValue) {
          //       subActivityObj.activitiesValue.budget = amount;
          //     }

          //     $.ajax({
          //       url: "/stratroom/subactivities",
          //       type: "PUT",
          //       contentType: "application/json",
          //       data: JSON.stringify(subActivityObj),
          //       success: function (data, status) {
          //         console.log("Sub-activity updated successfully.");
          //       },
          //       error: function (xhr, status, error) {
          //         console.error("Error updating sub-activity:", error);
          //       },
          //     });
          //   } else {
          //     if (activityObj && activityObj.activitiesValue) {
          //       activityObj.activitiesValue.budget = amount;
          //     }

          //     $.ajax({
          //       url: "/stratroom/activities",
          //       type: "PUT",
          //       contentType: "application/json",
          //       data: JSON.stringify(activityObj),
          //       success: function (data, status) {
          //         console.log("Activity updated successfully.");
          //       },
          //       error: function (xhr, status, error) {
          //         console.error("Error updating activity:", error);
          //       },
          //     });
          //   }
          // } else {
          //   console.warn(
          //     "Amount is null, undefined, or empty. Update operation skipped."
          //   );
          // }

          // console.log(updatePayload, "updatePayload");

          $.ajax({
            url: "/stratroom/budgetss",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatePayload),
            success: function (data, status) {
              fetchBudgetList();
              // initiativeApi();
              // location.reload(true);
            },
          });
        }

        //Add Row function
        $("#addRowButtonn").click(function () {
          var savePayload = {
            pageId: $("#pagenumber").val(),
            createBy: "",
            id: "",
            updateBy: "",
            owner: "",
            deptId: "",
            budgetValues: {
              year: "",
              month: "",
              version: "",
              glAccount: "",
              glName: "",
              currency: "",
              noofDays: "",
              unitamount: "",
              amount: "",
              outcome: "",
              objective: "",
              projectinitiative: "",
              subInitiative: "",
              activity: "",
              subActivity: "",
              division: "",
              person: "",
              notes: "",
            },
          };

          $.ajax({
            url: "/stratroom/budgets",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(savePayload),
            success: function (data, status) {
              // fetchBudgetList();
              // location.reload(true);
            },
          });
        });

        // <!-- Sub initiative pop up open functions -->
        function handleSelectChange(selectElement) {
          selectedElement = selectElement;
          var rowElement = selectElement.closest("tr");
          var idName = rowElement.getAttribute("id");
          var changeId = rowElement.getAttribute("changeId");
          var deptId = rowElement.getAttribute("data-dept-id");
          var pageId = rowElement.getAttribute("data-page-id");
          var initiativeId = rowElement.getAttribute("data-project-id");

          // selectedInitiativeId = rowElement.querySelector("#objective")
          //   ? rowElement.querySelector("#projectinitiative").value
          //   : "";

          selectedInitiativeId = selectElement.initiativeId;

          subInitiativeInsertList(selectElement, selectedInitiativeId);

          selectedPageId = pageId;
          // selectedInitiativeId = initiativeId;
          console.log(
            rowElement,
            idName,
            deptId,
            pageId,
            selectedInitiativeId,
            // projectinitiative,
            "rowElement"
          );
          if (selectedInitiativeId && selectElement.value === "addNewOption") {
            // Trigger the modal popup
            $("#sub_Initiative_id").val("");
            $("#subinitiativeID").val("");
            $("#subinitiative_desc").val("");
            $("#sub_initative_progress").val("");
            $("#sub_initative_contribution").val("");
            $("#air-date-sub-init").val("");
            $("#Sub_Initiative_owner").val("");
            $("#subinitiative_name").val("");

            $(".sub_initative_edit_popup").modal("show");
          }
        }

        function saveSubinitiative(event) {
          event.preventDefault();
          const description = $("#subinitiative_desc").val();
          const progressval = $("#sub_initative_progress").val();
          const contribution = $("#sub_initative_contribution").val();
          const dateRange = $(".sub_initative_start_end").val();
          const owner = $("#userPrincipal").val();
          // var id = budgetId
          var glAccount = "nnn";
          var glName = "pp";
          var budgetType = "opop";

          var pagenumber = $("#pagenumber").val();

          var budgetData = {
            // owner: "",
            pageId: pagenumber,
            initiativeId: selectedInitiativeId,
            // createdBy: "",
            // createdAt: "",
            // departMent: "0",
            // type: "BUDGET",
            subInitiativeValue: {
              name: "",
              dateRange: dateRange,
              description: description,
              progressval: progressval,
              contribution: contribution,
              multipleowners: owner,
            },
          };
          console.log(
            budgetData,
            selectedPageId,
            selectedInitiativeId,
            "budgetData"
          );

          $.ajax({
            url: "/stratroom/subinitiatives/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(budgetData),
            success: function (data, status) {
              subInitiativeInsertList(selectedElement, selectedInitiativeId);
              console.log("New sub Initiative was created..");
              $(".sub_initative_edit_popup").modal("hide");
            },
          });
        }

        //Activity save
        function saveActivity(event) {
          event.preventDefault();
          const description = $("#activities_desc").val();
          const progressval = $("#activities_progress").val();
          const budget = $("#activities_budget").val();
          const actual = $("#activities_Actual").val();
          const dateRange = $("#activities_start_end").val();
          const owner = $("#userPrincipal").val();
          const subInitiativeId = $("#subInitative_desc").val();

          const subInitiativeData = subinitiativeList?.find(
            (item) => item.id == subInitiativeId
          );
          console.log(subInitiativeData, "subInitiativeData");
          var savaActivity = {
            // owner: "",
            // pageId: selectedPageId,
            initiativeId: selectedInitiativeId,
            subInitiativeId: subInitiativeData?.subInitiativeValue?.description,

            activitiesValue: {
              name: "",
              dateRange: dateRange,
              desc: description,
              budget: budget,
              actual: actual,
              progress: progressval ? progressval : 0,
              // contribution: contribution,
              multipleowners: owner,
            },
          };
          console.log(savaActivity, "savaActivity");

          $.ajax({
            url: "/stratroom/activities/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(savaActivity),
            success: function (data, status) {
              activityInsertList(selectedElement, selectedInitiativeId);
              $(".activities_popup").modal("hide");
              console.log("New sub Initiative was created..");
            },
          });
        }

        //Sub activity save
        function saveSubActivity(event) {
          event.preventDefault();
          const description = $("#subactivities_desc").val();
          const progressval = $("#subactivities_progress").val();
          const budget = $("#subactivities_budget").val();
          const actual = $("#subactivities_Actual").val();
          const dateRange = $("#subactivities_start_end").val();
          const owner = $("#userPrincipal").val();

          var savaSubActivity = {
            activitieId: activityId,
            activitiesValue: {
              name: "",
              dateRange: dateRange,
              desc: description,
              budget: budget,
              actual: actual,
              progress: progressval,
            },
          };
          console.log(savaSubActivity, "savaSubActivity");

          $.ajax({
            url: "/stratroom/subactivities/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(savaSubActivity),
            success: function (data, status) {
              handleSubActivityInsert(selectedElement, activityId);
              console.log("New sub Initiative was created..");
              $(".add_subActivities_popup").modal("hide");
            },
          });
        }

        //Upload Pop up
        function upLoadPopUp(event) {
          event.preventDefault();
          $(".file_upload_popup").modal("show");
        }
      </script>

      <script>
        var spreadsheet;
        var tableData = [];
        var glAccountDropDownOptions = [];
        var projectInitiativeDropDownList = [];
        var subInitiativeListData = [];
        var deptDropDownOptions = [];
        var employeeDropDownOptions = [];
        var subInitiativeDropDownoptions = [];
        var versionOptions = [];
        var outomeOptions = [];
        var objectiveOptions = [];
        var subinitiative;
        var uniqueSubInitiatives;
        var uniqueActivity = [];
        var uniqueSubActivity = [];

        var glAccountOptions = [];
        var departmentOptions = [];
        var employeeOptions = [];
        var projectInitiativeOptions = [];
        var selectedInitiativeIdData;
        var selectedRowIndexData;
        var selectedColumnIndexData;

        $(window).on("load", function () {
          $(".page-loader-wrapper").fadeOut();
        });

        function fetchBudgetListData() {
          const requestData = {
            year: null,
            month: null,
          };

          var pagenumber = $("#pagenumber").val();
          var approvedStatus = $("#approvedDraft").val();
          let budgetdata = [];

          $.ajax({
            url: "/stratroom/budgetsList/" + pagenumber + "?status=" + approvedStatus,
            type: "GET",
            contentType: "application/json",
            success: function (responseData) {
              console.log("Received Data:", responseData);

              if (Array.isArray(responseData) && responseData.length > 0) {
                tableData = responseData;
                $("#changeId").val(responseData[responseData.length - 1].changeId);
                console.log(tableData, "tableData");
                budgetdata = tableData.map((item) => {
                  if (!item.budgetValues) return [];
                  //objective
                  objectiveOptions = new Set();
                  const objective = item.budgetValues.objective || "";

                  if (objective) objectiveOptions.add(objective);
                  //outcome

                  //outcome
                  outomeOptions = new Set();
                  const outcome = item.budgetValues.outcome || "";

                  if (outcome) outomeOptions.add(outcome);
                  //outcome

                  //Version
                  versionOptions = new Set();
                  const version = item.budgetValues.version || "";

                  if (version) versionOptions.add(version);
                  //Version

                  //subinitiative
                  // subInitiativeDropDownoptions = new Set();
                  let subInitiativeMap = new Map();
                  const subInitiative = item.budgetValues.subInDes || "";

                  console.log(subInitiative, "subInitiative");

                  if (
                    subInitiative &&
                    !subInitiativeDropDownoptions.includes(subInitiative)
                  ) {
                    subInitiativeDropDownoptions.push(subInitiative);
                  }

                  uniqueSubInitiatives = [
                    ...new Set(
                      tableData.map((item) => item.budgetValues?.subInDes || "")
                    ),
                  ];

                  subInitiativeDropdownList = subInitiativeDropDownoptions;

                  console.log(
                    subInitiative,
                    uniqueSubInitiatives,
                    "subUniueInitiative"
                  );
                  // console.log(subInDes, "subInDes");

                  //subinitiative

                  //Activity

                  const activity = item.budgetValues.activityDesc || "";

                  uniqueActivity = [
                    ...new Set(
                      tableData.map((item) => item.budgetValues?.activityDesc || "")
                    ),
                  ];

                  //Activity

                  //subaActivity
                  const subActivity = item.budgetValues.subActivityDes || "";

                  uniqueSubActivity = [
                    ...new Set(
                      tableData.map(
                        (item) => item.budgetValues?.subActivityDes || ""
                      )
                    ),
                  ];

                  //subaActivity

                  //glacc
                  let glAccountMap = new Map();

                  glData.forEach((val) => {
                    if (val.data && val.data.glAccount) {
                      glAccountMap.set(String(val.id), val.data.glAccount);
                      glAccountOptions.push({
                        id: val.id,
                        label: val.data.glAccount,
                      });
                    }
                  });

                  const glAccountId = item.budgetValues.glAccount || "";

                  const glAccount = glAccountMap.get(String(glAccountId)) || "";

                  if (glAccount)
                    glAccountOptions.push({ id: glAccountId, label: glAccount });

                  console.log(glAccountId, glAccount, glAccountMap, "glAccount");

                  glAccountDropDownOptions = glAccountOptions.map(
                    (option) => option.label
                  );

                  if (glAccountOptions.length === 0) {
                    glAccountOptions = [{ id: "", label: "" }];
                  }
                  //glacc

                  //Project
                  //  projectInitiativeOptions = new Set();
                  let projectAccMap = new Map();
                  projectInitiativeOptions = [];
                  let seenProjects = new Set(); // track IDs already added

                  // Build initial map and options list
                  projectList.forEach((pro) => {
                    if (pro.initiativeValue && pro.initiativeValue.name && !seenProjects.has(pro.id)) {
                      projectAccMap.set(String(pro.id), pro.initiativeValue.name);
                      projectInitiativeOptions.push({
                        id: pro.id,
                        label: pro.initiativeValue.name,
                      });
                      seenProjects.add(pro.id);
                    }
                  });

                  const projectInitiativeId = item.initiativeId || "";
                  console.log(projectInitiativeId, "projectInitiativeId");

                  const projectListOp = projectAccMap.get(String(projectInitiativeId)) || "";

                  // ✅ Only add if it’s not already in the options
                  const alreadyExists = projectInitiativeOptions.some(
                    (option) => String(option.id) === String(projectInitiativeId)
                  );

                  if (projectListOp && !alreadyExists) {
                    projectInitiativeOptions.push({
                      id: projectInitiativeId,
                      label: projectListOp,
                    });
                  }

                  console.log(projectAccMap, projectInitiativeId, projectListOp, "projectAccMap");

                  projectInitiativeDropDownList = projectInitiativeOptions.map(
                    (option) => option.label
                  );

                  if (projectInitiativeDropDownList.length === 0) {
                    projectInitiativeDropDownList = [""];
                  }


                  //Project

                  //Department
                  // let departmentOptions = new Set();
                  let deptMap = new Map();
                  departmentOptions = [];
                  let seenDepts = new Set();

                  deptlist.forEach((dept) => {
                    if (dept && dept.name && !seenDepts.has(dept.id)) {
                      deptMap.set(String(dept.id), dept.name);
                      departmentOptions.push({ id: dept.id, label: dept.name });
                      seenDepts.add(dept.id);
                    }
                  });


                  const deptId = item.budgetValues.division || "";

                  const deptListData = deptMap.get(String(deptId)) || "";

                  if (deptListData)
                    departmentOptions.push({ id: deptId, label: deptListData });

                  console.log(deptMap, deptId, deptListData, "deptListData");

                  deptDropDownOptions = departmentOptions.map(
                    (option) => option.label
                  );
                  if (deptDropDownOptions.length === 0) {
                    deptDropDownOptions = [""];
                  }
                  //Department

                  //EmployeeList
                  // let employeeOptions = new Set();
                  let employeeMap = new Map();
                  employeeOptions = [];
                  let seen = new Set();

                  employeeList.forEach((emp) => {
                    if (emp && emp.name && !seen.has(emp.id)) {
                      employeeMap.set(String(emp.id), emp.name);
                      employeeOptions.push({ id: emp.id, label: emp.name });
                      seen.add(emp.id);
                    }
                  });


                  const empId = item.budgetValues.person || "";

                  const empListData = employeeMap.get(String(empId)) || "";

                  if (empListData)
                    employeeOptions.push({ id: empId, label: empListData });

                  console.log(employeeMap, empId, empListData, "empListData");

                  employeeDropDownOptions = employeeOptions.map(
                    (option) => option.label
                  );
                  if (employeeDropDownOptions.length === 0) {
                    employeeDropDownOptions = [""];
                  }

                  console.log("year val ::: " + item.budgetValues.year);
                  return [
                    item.budgetValues.year || "Select",
                    item.budgetValues.month || "",
                    version,
                    glAccount,
                    item.budgetValues.glname || "",
                    item.budgetValues?.budgetType || "",
                    projectListOp,
                    outcome,
                    objective,
                    subInitiative,
                    activity,
                    subActivity,
                    item.budgetValues.currency || "",
                    item.budgetValues.noofDays || "",
                    item.budgetValues.unitamount || "",
                    item.budgetValues.amount || "",
                    deptListData,
                    empListData,
                    item.budgetValues.notes || "",
                    '<i class="far fa-trash-alt delete-icon" data-toggle="modal" data-target="#delete_popup"></i>',
                  ];
                });
              } else {
                console.warn("No budget data available");
              }

              let versionDropdownOptions = Array.from(versionOptions);
              if (versionDropdownOptions.length === 0)
                versionDropdownOptions = [""];

              let outcomeDropdownOptions = Array.from(outomeOptions);
              if (outcomeDropdownOptions.length === 0)
                outcomeDropdownOptions = [""];

              let subOptions = Array.from(subInitiativeDropDownoptions);
              if (subOptions.length === 0) subOptions = ["Select"];

              console.log(subOptions, "subOptions");
              console.log(budgetdata, "budgetdata")
              if (budgetdata.length == 0) {
                budgetdata = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
              }

              var selectedRowIndex = null;
              spreadsheet = jspreadsheet(document.getElementById("spreadsheet"), {
                data: budgetdata,
                filters: true,
                columns: [
                  {
                    type: "dropdown",
                    title: "Year",
                    width: 80,
                    style: "font-weight: bold;",
                    source: [
                      "2020",
                      "2021",
                      "2022",
                      "2023",
                      "2024",
                      "2025",
                      "2026",
                      "2027",
                      "2028",
                      "2029",
                      "2030",
                    ],
                  },
                  {
                    type: "dropdown",
                    title: "Month",
                    width: 120,
                    source: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ],
                  },

                  {
                    type: "text",
                    title: "Version",
                    width: 80,
                  },
                  {
                    type: "dropdown",
                    title: "GL Account",
                    width: 100,
                    source: glAccountDropDownOptions,
                  },
                  {
                    type: "text",
                    title: "GL Name",
                    width: 200,
                    readOnly: true,
                  },
                  {
                    type: "text",
                    title: "Budget Type",
                    width: 200,
                    readOnly: true,
                  },
                  {
                    type: "dropdown",
                    title: "Project/Initiative",
                    width: 300,
                    source: projectInitiativeDropDownList,
                  },
                  {
                    type: "text",
                    title: "Outcome",
                    width: 200,
                    readOnly: true,
                  },
                  {
                    type: "text",
                    title: "Objective",
                    width: 200,
                    readOnly: true,
                  },

                  {
                    type: "dropdown",
                    title: "Sub Initiative",
                    width: 300,
                    source: uniqueSubInitiatives,
                  },
                  {
                    type: "dropdown",
                    title: "Activity",
                    width: 300,
                    source: uniqueActivity,
                  },
                  {
                    type: "dropdown",
                    title: "Sub Activity",
                    width: 300,
                    source: uniqueSubActivity,
                  },
                  {
                    type: "dropdown",
                    title: "Currency",
                    width: 80,
                    source: ["LSL"],
                  },
                  {
                    type: "text",
                    title: "Number of Days/Quantity",
                    width: 200,
                  },
                  {
                    type: "text",
                    title: "Unit Amount",
                    width: 150,
                  },
                  {
                    type: "text",
                    title: "Total Budget",
                    width: 150,
                  },
                  {
                    type: "dropdown",
                    title: "Department",
                    width: 300,
                    source: deptDropDownOptions,
                  },
                  {
                    type: "dropdown",
                    title: "Employee",
                    width: 300,
                    source: employeeDropDownOptions,
                  },
                  {
                    type: "text",
                    title: "Notes",
                    width: 100,
                  },
                  {
                    type: "html",
                    title: "Action",
                    width: 100,
                  },
                ],

                onchange: function (instance, cell, x, y, value) {
                  console.log(x, "x-value");
                  selectedRowIndexData = y;
                  selectedColumnIndexData = x;

                  if (
                    x == 0 ||
                    x == 1 ||
                    x == 4 ||
                    x == 5 ||
                    x == 7 ||
                    x == 8 ||
                    x == 12
                  ) {
                    handleNewUpdate(cell);
                  } else if (x == 3 || x == 16 || x == 17) {
                    handleglAccChange(cell, value);
                  } else if (x == 6) {
                    handleglProjectInitiativeChange(cell, value);
                  } else if (x == 9) {
                    var rowIndex = cell.parentNode.getAttribute("data-y");
                    var rowDetailData = tableData[rowIndex];

                    console.log(rowDetailData, "rowDetailData");
                    selectedInitiativeIdData = rowDetailData.initiativeId;

                    if (value == "Add Option") {
                      $("#sub_Initiative_id").val("");
                      $("#subinitiativeID").val("");
                      $("#subinitiative_desc").val("");
                      $("#sub_initative_progress").val("");
                      $("#sub_initative_contribution").val("");
                      $("#air-date-sub-init").val("");
                      $("#Sub_Initiative_owner").val("");
                      $("#subinitiative_name").val("");

                      $(".sub_initative_edit_popup").modal("show");
                    } else {
                      handleSubInitiativeUpdate(cell, value);
                    }
                  } else if (x == 10) {
                    var rowIndex = cell.parentNode.getAttribute("data-y");
                    var rowDetailData = tableData[rowIndex];

                    console.log(rowDetailData, "rowDetailData");
                    selectedInitiativeIdData = rowDetailData.initiativeId;

                    if (value == "Add Option") {
                      $.ajax({
                        url:
                          "/stratroom/subInitiativesList/" +
                          rowDetailData.initiativeId,
                        type: "GET",
                        // contentType: "application/json",
                        success: function (data, status) {
                          const subInitiativeDropdownList = data;
                          subinitiativeList = data;
                          console.log(
                            "Received Data:",
                            subInitiativeDropdownList,
                            data
                          );
                          console.log(subinitiativeList, "listttttttt");

                          $("#subInitative_desc").empty();

                          subInitiativeDropdownList.forEach(function (item) {
                            $("#subInitative_desc").append(
                              $("<option>", {
                                value: item.id,
                                text: item.subInitiativeValue?.description,
                              })
                            );
                          });
                        },
                      });

                      $("#activities_desc").val("");
                      $("#activities_progress").val("");
                      $("#activities_start_end").val("");
                      $("#activities_budget").val("");
                      $("#activities_Actual").val("");
                      $(".activities_popup").modal("show");
                    } else {
                      handleSubInitiativeUpdate(cell, value);
                    }
                  } else if (x == 11) {
                    if (value == "Add Option") {
                      $("#subactivities_desc").val("");
                      $("#subactivities_progress").val("");
                      $("#subactivities_start_end").val("");
                      $("#subactivities_budget").val("");
                      $("#subactivities_Actual").val("");

                      // Trigger the modal popup
                      $(".add_subActivities_popup").modal("show");
                    } else {
                      handleSubInitiativeUpdate(cell, value);
                    }
                  }
                },
              });
            },
            error: function (xhr, status, error) {
              console.error("AJAX Error:", status, error);
            },
          });
        }


        $("#approvedDraft").on("change", function () {
          $("#spreadsheet").empty();
          fetchBudgetListData();
        });

        fetchBudgetListData();
        function sendApprovalOnce(button) {
          if (!button.disabled) {
            button.disabled = true; // Disable the button to prevent multiple clicks
            sendApproval(); // Call your function
          }
        }
        function sendApproval() {

          var id = $("#changeId").val();
          var requestData = {
            status: "IN PROGRESS"
          };

          $.ajax({
            url: "/stratroom/api/workflowevents/" + id + "/action",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function (response) {
              location.reload(true);
            }
          });
        }
        function saveActivityData(event) {
          event.preventDefault();
          const description = $("#activities_desc").val();
          const progressval = $("#activities_progress").val();
          const budget = $("#activities_budget").val();
          const actual = $("#activities_Actual").val();
          const dateRange = $("#activities_start_end").val();
          const owner = $("#userPrincipal").val();
          const subInitiativeId = $("#subInitative_desc").val();

          const subInitiativeData = subinitiativeList?.find(
            (item) => item.id == subInitiativeId
          );
          console.log(subInitiativeData, "subInitiativeData");
          var savaActivity = {
            // owner: "",
            // pageId: selectedPageId,
            initiativeId: selectedInitiativeId,
            subInitiativeId: subInitiativeData?.subInitiativeValue?.description,

            activitiesValue: {
              name: "",
              dateRange: dateRange,
              desc: description,
              budget: budget,
              actual: actual,
              progress: progressval ? progressval : 0,
              // contribution: contribution,
              multipleowners: owner,
            },
          };
          console.log(savaActivity, "savaActivity");

          $.ajax({
            url: "/stratroom/activities/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(savaActivity),
            success: function (data, status) {
              activityInsertList(selectedElement, selectedInitiativeId);
              $(".activities_popup").modal("hide");
              console.log("New sub Initiative was created..");
            },
          });
        }

        function saveSubinitiativeData(event) {
          event.preventDefault();
          const description = $("#subinitiative_desc").val();
          const progressval = $("#sub_initative_progress").val();
          const contribution = $("#sub_initative_contribution").val();
          const dateRange = $(".sub_initative_start_end").val();
          const owner = $("#userPrincipal").val();
          // var id = budgetId
          var glAccount = "nnn";
          var glName = "pp";
          var budgetType = "opop";

          var pagenumber = $("#pagenumber").val();

          var budgetData = {
            // owner: "",
            pageId: pagenumber,
            initiativeId: selectedInitiativeIdData,
            // createdBy: "",
            // createdAt: "",
            // departMent: "0",
            // type: "BUDGET",
            subInitiativeValue: {
              name: "",
              dateRange: dateRange,
              description: description,
              progressval: progressval,
              contribution: contribution,
              multipleowners: owner,
            },
          };
          console.log(
            budgetData,

            selectedInitiativeIdData,
            "budgetData"
          );

          $.ajax({
            url: "/stratroom/subinitiatives/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(budgetData),
            success: function (data, status) {
              subInitiativeInsertListData(
                "selectedElement",
                selectedInitiativeIdData,
                selectedRowIndexData,
                selectedColumnIndexData
              );
              console.log("New sub Initiative was created..");
              $(".sub_initative_edit_popup").modal("hide");
            },
          });
        }

        function handleSubInitiativeUpdate(cell, value) {
          console.log(cell, value, "cellValueData");
          var rowIndex = cell.parentNode.getAttribute("data-y");
          var rowDetailData = tableData[rowIndex];
          var rowData = spreadsheet.getData()[rowIndex];

          var subInObj;
          var activityObj;
          var subActivityObj;
          if (selectedColumnIndexData == 9) {
            subInObj = subinitiativeList.find(
              (item) => item.subInitiativeValue.description == value
            );
          } else if (selectedColumnIndexData == 10) {
            activityObj = activityListDataList.find(
              (item) => item.activitiesValue.desc == value
            );
          } else if (selectedColumnIndexData == 11) {
            subActivityObj = subActivityListDataList.find(
              (item) => item.activitiesValue.desc == value
            );
          }

          console.log(subInObj, activityObj, subActivityObj, "AllData");

          var updatePayload = {
            pageId: $("#pagenumber").val(),
            createBy: "",
            id: rowDetailData.id,
            changeId: rowDetailData.changeId,
            updateBy: "",
            owner: "",
            deptId: rowDetailData.deptId,
            initiativeId: rowDetailData.initiativeId
              ? rowDetailData.initiativeId
              : "",
            subInitiativeId:
              selectedColumnIndexData == 9
                ? subInObj.id
                : rowDetailData.subInitiativeId
                  ? rowDetailData.subInitiativeId
                  : "",
            activityId:
              selectedColumnIndexData == 10
                ? activityObj.id
                : rowDetailData.activityId
                  ? rowDetailData.activityId
                  : "",
            subActivityId:
              selectedColumnIndexData == 11
                ? subActivityObj.id
                : rowDetailData.subActivityId
                  ? rowDetailData.subActivityId
                  : "",

            budgetValues: {
              year: rowData[0],
              month: rowData[1],
              version: rowData[2],
              glaccountdesc: rowData[3],
              glAccount: rowDetailData.budgetValues.glAccount
                ? rowDetailData.budgetValues.glAccount
                : "",
              glname: rowData[4],
              budgetType: rowData[5],
              projectinitiative: rowDetailData.initiativeId
                ? rowDetailData.initiativeId
                : "",
              outcome: rowDetailData.budgetValues.outcome
                ? rowDetailData.budgetValues.outcome
                : "",
              objective: rowDetailData.budgetValues.objective
                ? rowDetailData.budgetValues.objective
                : "",
              subinitiative:
                selectedColumnIndexData == 9
                  ? subInObj.id
                  : rowDetailData.subInitiativeId
                    ? rowDetailData.subInitiativeId
                    : "",
              subInitiativeDesc:
                selectedColumnIndexData == 9
                  ? subInObj.subInitiativeValue.description
                  : rowDetailData.budgetValues.subInitiativeDesc
                    ? rowDetailData.budgetValues.subInitiativeDesc
                    : "",
              subInDes:
                selectedColumnIndexData == 9
                  ? subInObj.subInitiativeValue.description
                  : rowDetailData.budgetValues.subInDes
                    ? rowDetailData.budgetValues.subInDes
                    : "",
              activity:
                selectedColumnIndexData == 10
                  ? activityObj.id
                  : rowDetailData.activityId
                    ? rowDetailData.activityId
                    : "",
              activityDesc:
                selectedColumnIndexData == 10
                  ? activityObj.activitiesValue.desc
                  : rowDetailData.budgetValues.activityDesc
                    ? rowDetailData.budgetValues.activityDesc
                    : "",
              subActivity:
                selectedColumnIndexData == 11
                  ? subActivityObj.id
                  : rowDetailData.subActivityId
                    ? rowDetailData.subActivityId
                    : "",
              subActivityDes:
                selectedColumnIndexData == 11
                  ? subActivityObj.activitiesValue.desc
                  : rowDetailData.budgetValues.subActivityDes
                    ? rowDetailData.budgetValues.subActivityDes
                    : "",
              currency: rowData[12],
              noofDays: rowData[13],
              unitamount: rowData[14],
              amount: rowData[15],
              divisionDesc: rowData[16],
              division: rowDetailData.budgetValues.division
                ? rowDetailData.budgetValues.division
                : "",
              personDesc: rowData[17],
              person: rowDetailData.budgetValues.person
                ? rowDetailData.budgetValues.person
                : "",
              notes: rowData[18],
            },
          };

          console.log(updatePayload, "updatePayload");

          $.ajax({
            url: "/stratroom/budgets",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatePayload),
            success: function (data, status) {
              $("#spreadsheet").empty();

              fetchBudgetListData();
            },
          });
        }

        //Sub activity save
        function saveSubActivityData(event) {
          event.preventDefault();
          const description = $("#subactivities_desc").val();
          const progressval = $("#subactivities_progress").val();
          const budget = $("#subactivities_budget").val();
          const actual = $("#subactivities_Actual").val();
          const dateRange = $("#subactivities_start_end").val();
          const owner = $("#userPrincipal").val();

          var rowDetailData = tableData[selectedRowIndexData];

          var savaSubActivity = {
            activitieId: rowDetailData.activityId,
            activitiesValue: {
              name: "",
              dateRange: dateRange,
              desc: description,
              budget: budget,
              actual: actual,
              progress: progressval,
            },
          };
          console.log(savaSubActivity, "savaSubActivity");

          $.ajax({
            url: "/stratroom/subactivities/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(savaSubActivity),
            success: function (data, status) {
              // handleSubActivityInsert(selectedElement, activityId);
              console.log("New sub Initiative was created..");
              $(".add_subActivities_popup").modal("hide");
            },
          });
        }

        function handleglProjectInitiativeChange(cell, value) {
          console.log(cell, value, "cellValue");
          var rowIndex = cell.parentNode.getAttribute("data-y");
          var rowDetailData = tableData[rowIndex];

          var rowData = spreadsheet.getData()[rowIndex];
          const selectedItem = projectInitiativeOptions.find(
            (item) => item.label == value
          );

          const projectObj = projectList.find((item) => item.id == selectedItem.id);
          tableData[rowIndex].budgetValues.projectinitiative = selectedItem.label;
          tableData[rowIndex].initiativeId = selectedItem.id;

          console.log(projectObj, "projectObj");

          var updatePayload = {
            pageId: $("#pagenumber").val(),
            createBy: "",
            id: rowDetailData.id,
            changeId: rowDetailData.changeId,
            updateBy: "",
            owner: "",
            deptId: rowDetailData.deptId,
            initiativeId: selectedItem.id,
            subInitiativeId: rowDetailData.subInitiativeId,
            // subInitiativeDesc: subInitiativeDes,
            activityId: rowDetailData.activityId,
            // activityDesc: activityDes,
            subActivityId: rowDetailData.subActivityId,
            // subInitiativeDesc: subinitiative,
            budgetValues: {
              year: rowData[0],
              month: rowData[1],
              version: rowData[2],
              glaccountdesc: rowData[3],
              glAccount: rowDetailData.budgetValues.glAccount
                ? rowDetailData.budgetValues.glAccount
                : "",
              glname: rowData[4],
              budgetType: rowData[5],
              projectinitiative: selectedItem.label,
              outcome: projectObj.initiativeValue.perspectiveName
                ? projectObj.initiativeValue.perspectiveName
                : "",
              objective: projectObj.initiativeValue.objectiveDesc
                ? projectObj.initiativeValue.objectiveDesc
                : "",
              subinitiative: rowDetailData.subInitiativeId
                ? rowDetailData.subInitiativeId
                : "",
              subInitiativeDesc: rowData[9],
              activity: rowDetailData.activityId ? rowDetailData.activityId : "",
              activityDesc: rowData[10],
              subActivity: rowDetailData.subActivityId
                ? rowDetailData.subActivityId
                : "",
              subActivityDes: rowData[11],
              currency: rowData[12],
              noofDays: rowData[13],
              unitamount: rowData[14],
              amount: rowData[15],
              divisionDesc: rowData[16],
              division: rowDetailData.budgetValues.division
                ? rowDetailData.budgetValues.division
                : "",
              personDesc: rowData[17],
              person: rowDetailData.budgetValues.person
                ? rowDetailData.budgetValues.person
                : "",
              notes: rowData[18],
            },
          };

          console.log(updatePayload, "updatePayload");

          $.ajax({
            url: "/stratroom/budgets",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatePayload),
            success: function (data, status) {
              $("#spreadsheet").empty();

              fetchBudgetListData();
            },
          });
        }

        function handleglAccChange(cell, value) {
          var rowIndex = cell.parentNode.getAttribute("data-y");
          var rowDetailData = tableData[rowIndex];
          var rowData = spreadsheet.getData()[rowIndex];

          var glDataObj;
          var selectedItem;
          var selectedDivision;
          var selectedEmployee;

          console.log(
            selectedColumnIndexData,
            rowIndex,
            rowDetailData,
            "selectedColumnIndexData"
          );

          if (selectedColumnIndexData == 3) {
            selectedItem = glAccountOptions.find((item) => item.label == value);
            glDataObj = glData.find((item) => item.id == selectedItem.id);
            tableData[rowIndex].budgetValues.glAccount = selectedItem.id;
            tableData[rowIndex].budgetValues.glname = glDataObj.data.glName;
            tableData[rowIndex].budgetValues.budgetType = glDataObj.data.budgetType;
            console.log(
              rowIndex,
              rowDetailData,
              rowData,
              value,
              selectedItem,
              "rowDetailData"
            );
          } else if (selectedColumnIndexData == 16) {
            selectedDivision = deptlist.find((item) => item.name == value);
          } else if (selectedColumnIndexData == 17) {
            selectedEmployee = employeeList.find((item) => item.name == value);
          }

          var updatePayload = {
            pageId: $("#pagenumber").val(),
            createBy: "",
            id: rowDetailData.id,
            changeId: rowDetailData.changeId,
            updateBy: "",
            owner: "",
            deptId: rowDetailData.deptId,
            initiativeId: rowDetailData.initiativeId,
            subInitiativeId: rowDetailData.subInitiativeId,
            // subInitiativeDesc: subInitiativeDes,
            activityId: rowDetailData.activityId,
            // activityDesc: activityDes,
            subActivityId: rowDetailData.subActivityId,
            // subInitiativeDesc: subinitiative,
            budgetValues: {
              year: rowData[0],
              month: rowData[1],
              version: rowData[2],
              glaccountdesc: rowData[3],
              glAccount:
                selectedColumnIndexData == 3
                  ? selectedItem.id
                  : rowDetailData.budgetValues.glAccount
                    ? rowDetailData.budgetValues.glAccount
                    : "",
              glname:
                selectedColumnIndexData == 3
                  ? glDataObj.data.glName
                  : rowDetailData.budgetValues.glname
                    ? rowDetailData.budgetValues.glname
                    : "",
              budgetType:
                selectedColumnIndexData == 3
                  ? glDataObj.data.budgetType
                  : rowDetailData.budgetValues.budgetType
                    ? rowDetailData.budgetValues.budgetType
                    : "",
              projectinitiative: rowDetailData.initiativeId
                ? rowDetailData.initiativeId
                : "",
              outcome: rowDetailData.budgetValues.outcome
                ? rowDetailData.budgetValues.outcome
                : "",
              objective: rowDetailData.budgetValues.objective
                ? rowDetailData.budgetValues.objective
                : "",
              subinitiative: rowDetailData.subInitiativeId
                ? rowDetailData.subInitiativeId
                : "",
              subInitiativeDesc: rowData[9],
              subInDes: rowData[9],
              activity: rowDetailData.activityId ? rowDetailData.activityId : "",
              activityDesc: rowData[10],
              subActivity: rowDetailData.subActivityId
                ? rowDetailData.subActivityId
                : "",
              subActivityDes: rowData[11],
              currency: rowData[12],
              noofDays: rowData[13],
              unitamount: rowData[14],
              amount: rowData[15],
              divisionDesc: rowData[16],
              division:
                selectedColumnIndexData == 16
                  ? selectedDivision.id
                  : rowDetailData.budgetValues.division
                    ? rowDetailData.budgetValues.division
                    : "",
              personDesc: rowData[17],
              person:
                selectedColumnIndexData == 17
                  ? selectedEmployee.id
                  : rowDetailData.budgetValues.person
                    ? rowDetailData.budgetValues.person
                    : "",
              notes: rowData[18],
            },
          };

          console.log(updatePayload, "updatePayload");

          $.ajax({
            url: "/stratroom/budgets",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatePayload),
            success: function (data, status) {
              $("#spreadsheet").empty();
              fetchBudgetListData();
            },
          });
        }

        //onClick functions
        document
          .getElementById("spreadsheet")
          .addEventListener("click", function (event) {
            let cell = event.target.closest("td");
            if (!cell) return;

            let x = parseInt(cell.getAttribute("data-x"));
            let y = parseInt(cell.getAttribute("data-y"));

            var rowIndex = cell.parentNode.getAttribute("data-y");

            var rowDetailData = tableData[rowIndex];
            console.log(x, y, rowDetailData, "rowdetailsData");

            if (x == 19) {
              handleNewDelete(cell);
            } else if (x == 9) {
              handleSubInitiativeSelectChange(cell);
            } else if (x == 10) {
              handleActivityClick(cell);
            } else if (x == 11) {
              handleSubActivityClick(cell);
            }
          });

        function handleSubActivityClick(cell) {
          console.log(cell, "cellValue");
          var rowIndex = cell.parentNode.getAttribute("data-y");
          var columnIndex = parseInt(cell.getAttribute("data-x"));
          var rowDetailData = tableData[rowIndex];

          if (rowDetailData.activityId) {
            handleSubActivityInsertData(
              rowDetailData.activityId,
              rowIndex,
              columnIndex
            );
          }
        }
        function handleSubActivityInsertData(selectedValue, rowIndex, columnIndex) {
          $.ajax({
            url: "/stratroom/subActivitieslist/" + selectedValue,
            type: "GET",
            success: function (data, status) {
              subActivityListDataList = data;
              let subActivityDropDownList = [];

              if (data.length > 0) {
                // Map each item to its sub-activity description
                subActivityDropDownList = data.map(item => item.activitiesValue.desc);
                subActivityDropDownList.push("Add Option");
              } else {
                subActivityDropDownList = ["Add Option"];
              }

              // Update the dropdown options and refresh the spreadsheet
              spreadsheet.options.columns[columnIndex].source = subActivityDropDownList;
              spreadsheet.refresh();

              // Wait to ensure the cell is rendered, then open the editor
              setTimeout(() => {
                var cellElement = document.querySelector(
                  "#spreadsheet table td[data-x='" + columnIndex + "'][data-y='" + rowIndex + "']"
                );
                if (cellElement) {
                  spreadsheet.openEditor(cellElement, true);
                } else {
                  console.warn("Cell element not found for sub-activity at rowIndex:", rowIndex, "columnIndex:", columnIndex);
                }
              }, 1000);
            },
            error: function (xhr, status, error) {
              console.error("API call failed:", status, error);
            },
          });
        }


        function handleActivityClick(cell) {
          console.log(cell, "cellValue");
          var rowIndex = cell.parentNode.getAttribute("data-y");
          var columnIndex = parseInt(cell.getAttribute("data-x"));
          var rowDetailData = tableData[rowIndex];
          var rowData = spreadsheet.getData()[rowIndex];
          const selectedItem = projectInitiativeOptions.find(
            (item) => item.label == rowData[6]
          );
          const projectObj = projectList.find((item) => item.id == selectedItem.id);
          if (projectObj.id) {
            activityInsertListData(
              projectObj,
              projectObj.id,
              rowIndex,
              columnIndex
            );
          }
        }
        function activityInsertListData(selectElement, selectedValue, rowIndex, columnIndex) {
          $.ajax({
            url: "/stratroom/activitieslist/" + selectedValue,
            type: "GET",
            success: function (data, status) {
              activityListDataList = data;
              let activityDropDownList = [];

              if (data.length > 0) {
                console.log(data, "datataa");
                // Map each item to its activity description
                activityDropDownList = data.map(item => item.activitiesValue.desc);
                activityDropDownList.push("Add Option");
              } else {
                activityDropDownList = ["Add Option"];
              }

              // Update the column source and refresh the spreadsheet
              spreadsheet.options.columns[columnIndex].source = activityDropDownList;
              spreadsheet.refresh();

              // Wait for the cell to render and then open the editor
              setTimeout(() => {
                var cellElement = document.querySelector(
                  "#spreadsheet table td[data-x='" + columnIndex + "'][data-y='" + rowIndex + "']"
                );
                if (cellElement) {
                  spreadsheet.openEditor(cellElement, true);
                } else {
                  console.warn("Cell element not found for activity at rowIndex:", rowIndex, "columnIndex:", columnIndex);
                }
              }, 1000); // Adjust delay if necessary
            },
            error: function (xhr, status, error) {
              console.error("API call failed:", status, error);
            },
          });
        }


        function handleSubInitiativeSelectChange(cell) {
          console.log(cell, "cellValue");
          // Parse indexes as numbers
          var rowIndex = parseInt(cell.parentNode.getAttribute("data-y"), 10);
          var columnIndex = parseInt(cell.getAttribute("data-x"), 10);
          var rowData = spreadsheet.getData()[rowIndex];

          // Find the project initiative selected in column 6
          const selectedItem = projectInitiativeOptions.find(
            (item) => item.label === rowData[6]
          );
          const projectObj = projectList.find((item) => item.id === selectedItem?.id);

          console.log(projectObj, "projectObj");
          if (projectObj && projectObj.id) {
            subInitiativeInsertListData(projectObj, projectObj.id, rowIndex, columnIndex);
          }
        }
        function subInitiativeInsertListData(selectElement, selectedValue, rowIndex, columnIndex) {
          console.log(rowIndex, columnIndex, "rowindex");

          $.ajax({
            url: "/stratroom/subInitiativesList/" + selectedValue,
            type: "GET",
            success: function (data, status) {
              console.log("AJAX Response Data:", data); // Debugging: Log the response data
              subinitiativeList = data;
              console.log("Received Data:", data);
              console.log(subinitiativeList, "listttttttt");

              // Build the dropdown list from data and add "Add Option"
              let subInitiativeDropdownList = data.length > 0
                ? data.map((item) => {
                  console.log("Mapping Item:", item); // Debugging: Log each item being mapped
                  return item.subInitiativeValue.description;
                })
                : [];
              subInitiativeDropdownList.push("Add Option");

              console.log("Dropdown List:", subInitiativeDropdownList); // Debugging: Log the final dropdown list

              spreadsheet.options.columns[columnIndex].source =
                subInitiativeDropdownList;
              spreadsheet.refresh();

              setTimeout(() => {
                // Use a specific query selector to find the cell within the spreadsheet's table
                var cellElement = document.querySelector(
                  "#spreadsheet table td[data-x='" + columnIndex + "'][data-y='" + rowIndex + "']"
                );
                if (cellElement) {
                  spreadsheet.openEditor(cellElement, true);
                } else {
                  console.warn("Cell element not found for rowIndex:", rowIndex, "columnIndex:", columnIndex);
                }
              }, 1000); // Delay increased to 1000ms

            },
            error: function (xhr, status, error) {
              console.error("API call failed:", status, error);
            },
          });
        }

        document
          .getElementById("spreadsheet")
          .addEventListener("focusout", function (event) {
            let cell = event.target.closest("td");
            if (cell) {
              let x = cell.getAttribute("data-x");
              let y = cell.getAttribute("data-y");
              let value = cell.innerText;

              console.log(`Cell blurred at [${y}, ${x}] -> New Value: ${value}`);

              console.log(x, "x-value");
              if (x == 2 || x == 13 || x == 16) {
                handleNewUpdate(cell);
              }
            }
          });

        function handleNewDelete(cell) {
          var rowIndex = cell.parentNode.getAttribute("data-y");

          var rowDetailData = tableData[rowIndex];

          deleteId = rowDetailData.id;
          $.ajax({
            url: "/stratroom/budgets/" + rowDetailData.id,
            type: "DELETE",
            contentType: "application/json",
            success: function (data, status) {
              $.notify("Success: Deleted Successfully", {
                style: "success",
                className: "graynotify",
              });
              spreadsheet.deleteRow(rowIndex);
              // location.reload(true);
            },
            error: function (xhr, status, error) {
              console.error("Error:", error);
              alert("Failed to delete. Please try again.");
            },
          });
        }

        function handleNewUpdate(cell) {
          console.log(tableData, "tableData");
          var rowIndex = cell.parentNode.getAttribute("data-y");

          if (rowIndex !== null) {
            rowIndex = parseInt(rowIndex);

            var rowDetailData = tableData[rowIndex];
            console.log(rowDetailData, "rowDetailData");

            // Get the row data
            var rowData = spreadsheet.getData()[rowIndex];

            console.log("Selected Row Index:", rowIndex);
            console.log("Selected Row Data:", rowData);

            var updatePayload = {
              pageId: $("#pagenumber").val(),
              createBy: "",
              id: rowDetailData.id,
              changeId: rowDetailData.changeId,
              updateBy: "",
              owner: "",
              deptId: rowDetailData.deptId,
              initiativeId: rowDetailData.initiativeId
                ? rowDetailData.initiativeId
                : "",
              subInitiativeId: rowDetailData.subInitiativeId
                ? rowDetailData.subInitiativeId
                : "",
              // subInitiativeDesc: subInitiativeDes,
              activityId: rowDetailData.activityId ? rowDetailData.activityId : "",
              // activityDesc: activityDes,
              subActivityId: rowDetailData.subActivityId
                ? rowDetailData.subActivityId
                : "",
              // subInitiativeDesc: subinitiative,
              budgetValues: {
                year: rowData[0],
                month: rowData[1],
                version: rowData[2],
                glaccountdesc: rowData[3],
                glAccount: rowDetailData.budgetValues.glAccount
                  ? rowDetailData.budgetValues.glAccount
                  : "",
                glname: rowDetailData.budgetValues.glname
                  ? rowDetailData.budgetValues.glname
                  : "",
                budgetType: rowDetailData.budgetValues.budgetType
                  ? rowDetailData.budgetValues.budgetType
                  : "",
                projectinitiative: rowDetailData.initiativeId
                  ? rowDetailData.initiativeId
                  : "",
                outcome: rowDetailData.budgetValues.outcome
                  ? rowDetailData.budgetValues.outcome
                  : "",
                objective: rowDetailData.budgetValues.objective
                  ? rowDetailData.budgetValues.objective
                  : "",
                subinitiative: rowDetailData.subInitiativeId
                  ? rowDetailData.subInitiativeId
                  : "",
                subInitiativeDesc: rowData[9],
                subInDes: rowData[9],
                activity: rowDetailData.activityId ? rowDetailData.activityId : "",
                activityDesc: rowData[10],
                subActivity: rowDetailData.subActivityId
                  ? rowDetailData.subActivityId
                  : "",
                subActivityDes: rowData[11],
                currency: rowData[12],
                noofDays: rowData[13],
                unitamount: rowData[14],
                amount: rowData[15],
                divisionDesc: rowData[16],
                division: rowDetailData.budgetValues.division
                  ? rowDetailData.budgetValues.division
                  : "",
                personDesc: rowData[17],
                person: rowDetailData.budgetValues.person
                  ? rowDetailData.budgetValues.person
                  : "",
                notes: rowData[18],
              },
            };

            console.log(updatePayload, "updatePayload");

            $.ajax({
              url: "/stratroom/budgets",
              type: "PUT",
              contentType: "application/json",
              data: JSON.stringify(updatePayload),
              success: function (data, status) {
                $("#spreadsheet").empty();
                fetchBudgetListData();
                // initiativeApi();
                // location.reload(true);
              },
            });
          } else {
            console.log("Row index not found.");
          }
        }

        //Add Row function
        $("#addRowButton").click(function () {
          var savePayload = {
            pageId: $("#pagenumber").val(),
            createBy: "",
            id: "",
            updateBy: "",
            owner: "",
            deptId: "",
            budgetValues: {
              year: "",
              month: "",
              version: "",
              glAccount: "",
              glName: "",
              currency: "",
              noofDays: "",
              unitamount: "",
              amount: "",
              outcome: "",
              objective: "",
              projectinitiative: "",
              subInitiative: "",
              activity: "",
              subActivity: "",
              division: "",
              person: "",
              notes: "",
            },
          };

          $.ajax({
            url: "/stratroom/budgets",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(savePayload),
            success: function (data, status) {
              $("#spreadsheet").empty();
              fetchBudgetListData();
              // location.reload(true);
            },
          });
        });

        var file;

        function readFile(input) {
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            file = input.files[0];
            reader.onload = function () {
              var htmlPreview =
                '<div class="box-body-border">' +
                '<img width="20" src="../images/file-icon.png"/>' +
                "<span>" + input.files[0].name + "</span>" +
                "<span><i class='fa fa-times remove-preview'></i></span>" +
                "</div>";
              var wrapperZone = $(input).parent();
              var previewZone = $(input).parent().parent().find(".preview-zone");
              var boxZone = $(input)
                .parent()
                .parent()
                .find(".preview-zone")
                .find(".box")
                .find(".box-body");
              wrapperZone.removeClass("dragover");
              previewZone.removeClass("hidden");
              boxZone.empty();
              boxZone.append(htmlPreview);
              removeFile();
            };
            reader.readAsDataURL(input.files[0]);
          }
          $(".form-progressbar li:nth-child(1)").addClass("active");
        }

        function reset(e) {
          e.wrap("<form>").closest("form").get(0).reset();
          e.unwrap();
        }

        $(".dropzone").change(function () {
          readFile(this);
        });

        $(".dropzone-wrapper").on("dragover", function (e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).addClass("dragover");
        });

        $(".dropzone-wrapper").on("dragleave", function (e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).removeClass("dragover");
        });

        function removeFile() {
          $(".remove-preview").on("click", function () {
            var boxZone = $(this).parents(".preview-zone").find(".box-body");
            var previewZone = $(this).parents(".preview-zone");
            var dropzone = $(this).parents(".form-group").find(".dropzone");
            boxZone.empty();
            console.log("done");
            previewZone.addClass("hidden");
            reset(dropzone);
          });
        }


        $(document).on('click', "#next-btn-1", function () {
          $("#validateImportHide").empty();
          $("#file-upload").hide();
          $("#file-validate").show();
          $("#file-save").hide();
          $(".form-progressbar li:nth-child(2)").addClass("active");
          var formdata = new FormData();
          formdata.append("budgetData", file);
          $(".page-loader-wrapper").css("display", "block");
          if (file != "" && file != undefined) {
            $.ajax({
              // url: "/stratroom/saveScoreCardDetails?type=validation",
              url: "/stratroom/importBulkBudgetDetails?type=validation",
              type: "POST",
              data: formdata,
              processData: false,
              contentType: false,
              success: function (data, status) {
                budgetUploadNotFoundData(data, data.parsingError)
                $(".page-loader-wrapper").css("display", "none");
              }, error: function (msg, status) {
                $(this).val('');
                $(".page-loader-wrapper").css("display", "none");
                if (!jQuery.isEmptyObject(msg.responseText)) {
                  var errorparse = JSON.parse(msg.responseText);
                  if (errorparse.status == "404") {
                    $.notify("Error:" + errorparse.exception, {
                      style: 'error',
                      className: 'graynotify'
                    });
                  } else {
                    $.notify("Error:" + errorparse.exception, {
                      style: 'error',
                      className: 'graynotify'
                    });
                  }
                }
              },
            });
          } else {

            $("#fileerrorshow").append('Please select upload file');
            $("#fileerrorshow").show();
            $(".page-loader-wrapper").css("display", "none");
            $("#file-upload").show();
            $("#file-validate").hide();
            $("#file-validate1").hide();
            $("#file-save").hide();
            $(".form-progressbar li:nth-child(1)").removeClass("active");
            $(".form-progressbar li:nth-child(2)").removeClass("active");
          }

        });


        $(document).on('click', '#next-btn-2', function () {
          $("#file-upload").hide();
          $("#file-validate").hide();
          $("#file-save").show();
          $(".form-progressbar li:nth-child(3)").addClass("active");
          var formdata = new FormData();
          var file = $('input[name="img_logo"]')[0].files[0];
          formdata.append("budgetData", file);
          $(".page-loader-wrapper").css("display", "block");
          $.ajax({
            url: "/stratroom/importBulkBudgetDetails",
            type: "POST",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (data, status) {
              /* console.log(data); */
              $(".page-loader-wrapper").css("display", "none");
              budgetUploadSuccess(data)
            },
          });
        });

        $(document).on('click', '#prev-btn1', function () {
          $(".uploadvalidationSuccess").empty();
          $("#validateImportHide").empty();
          $("#file-upload").show();
          $("#file-validate").hide();
          $("#file-save").hide();
          $(".form-progressbar li:nth-child(2)").removeClass("active");
          $(".form-progressbar li:nth-child(1)").addClass("active");
        });


        $(document).on('click', '#prev-btn2', function () {
          $(".uploadStatististics").empty();
          $(".form-progressbar li:nth-child(2)").addClass("active");
          $("#file-upload").hide();
          $("#statisticmessage").html("");
          $(".error-div").hide();
          $("#file-validate").show();
          $("#file-save").hide();
          $(".form-progressbar li:nth-child(3)").removeClass("active");
          $(".form-progressbar li:nth-child(2)").addClass("active");

        });


        function budgetUploadNotFoundData(data, result) {
          $(".uploadvalidationSuccess").empty();
          var scorecard_import_error;
          /*
           * $("#validateImportHide").empty(); var validateImport ='';
           */
          if (!jQuery.isEmptyObject(result)) {
            $(".error-div").show();
          }

          if (!jQuery.isEmptyObject(data) && data.result == "Not-Success") {
            $("#imagevalidate").attr("src", "../images/Not-Verified.png").attr("alt", "error");
            validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
              '<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
          }
          if (!jQuery.isEmptyObject(data) && (data.result == "success" || data.result == "Success")) {
            $(".error-div").hide();
            $("#imagevalidate").attr("src", "../images/Success.png").attr("alt", "success");
            validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
              '<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
          }

          $.each(result, function (i, List) {
            scorecard_import_error = '<tr>' +
              '<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +
              '<td style="width: 150px; text-align: center;">' + List.rowNo + '</td>' +
              '<td style="width: 150px; text-align: center;">' + List.cellName + '</td>' +
              '<td style="width: 150px; text-align: left;">' + List.error + '</td>' +
              '</tr>';
            $(".uploadvalidationSuccess").append(scorecard_import_error);
          });

          /*
           * if(result != undefined){
           * $("#imagevalidate").attr("src","../images/Not-Verified.png");
           * $(".error-div").show();
           * 
           * validateImport ='<button type="button" class="btn-default1 btn"
           * id="prev-btn1" style="font-weight: 600;">Previous</button>'+ '<button
           * class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2"
           * style="font-weight: 600;" disabled>Next</button>'; }
           */

          if (jQuery.isEmptyObject(data)) {
            $(".error-div").hide();
            $("#imagevalidate").attr("src", "../images/Not-Verified.png").attr("alt", "error");

            validateImport = '<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>' +
              '<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
          }

          $("#validateImportHide").append(validateImport);
        }


        function budgetUploadSuccess(data) {
          $(".uploadStatististics").empty();
          $(".error-div").show();
          $("#successimagevalidate").attr("src", "../images/Success.png").attr("alt", "success");
          // $("#statisticmessage").append('Import Successful');
          // budgetStatististics('No of Records processed',(data.no_of_process != undefined?data.no_of_process:""));
          // budgetStatististics('No of Scorecards records',(data.no_of_processed != undefined?data.no_of_processed:""));
          // budgetStatististics('No of KPI created',(data.no_of_created != undefined?data.no_of_created:""));
          // budgetStatististics('No of KPI updated',(data.no_of_updated != undefined?data.no_of_updated:""));
          // budgetStatististics('No of KPI Failed',(data.no_of_failed !=	undefined?data.no_of_failed:""));

        }

        function budgetStatististics(staticsvalue, fnresult) {
          var budget_Statististics = '<tr>' +
            '<td style="width: 300px; text-align: left;">' + staticsvalue + '</td>' +
            '<td style="width: 300px; text-align: center;">' + fnresult + '</td>' +
            '</tr>';
          $(".uploadStatististics").append(budget_Statististics);
        }


        $(document).on('click', '#done-btn', function () {
          location.reload(true);
        });

        $(document).on('click', ".close", function () {
          $(".box-body").empty();
          $("#fileerrorshow").html("");
          $("#statisticmessage").html("");
          $("#file-upload").show();
          $("#file-validate").hide();
          $("#file-save").hide();
          $(".form-progressbar li:nth-child(1)").removeClass("active");
          $(".form-progressbar li:nth-child(2)").removeClass("active");
          $(".form-progressbar li:nth-child(3)").removeClass("active");
        });

        $(document).on("change", "#budgetscorescrd", function (e) {
          e.preventDefault();
          var formdata = new FormData();
          if ($(this).prop('files').length > 0) {
            file = $(this).prop('files')[0];
            formdata.append("budgetData", file);
          }
          $(".page-loader-wrapper").css("display", "block");
          $.ajax({
            // url : "/stratroom/saveScoreCardDetails",
            url: "/stratroom/importBulkBudgetDetails",
            type: "POST",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (data, status) {
              console.log(data);
              $(this).val('');
              $(".upLoadBudgetSuccessModal").modal("show");
              $("#budgetSuccess").text(data.result);
              $(".page-loader-wrapper").css("display", "none");
              // location.reload(true);
              // $.notify(data);
            },
            error: function (msg, status) {
              $(this).val('');
              $(".page-loader-wrapper").css("display", "none");
              if (!jQuery.isEmptyObject(msg.responseText)) {
                var errorparse = JSON.parse(msg.responseText);
                if (errorparse.status == "404") {
                  $.notify("Error:" + errorparse.exception, {
                    style: 'error',
                    className: 'graynotify'
                  });
                } else {
                  $.notify("Error:" + errorparse.exception, {
                    style: 'error',
                    className: 'graynotify'
                  });
                }
              }
            }
          });

        });


      </script>
    </body>