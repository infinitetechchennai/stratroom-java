<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
  <meta content="width=device-width, initial-scale=1" name="viewport" />
  <title>StratRoom</title>
  <link
    rel="stylesheet"
    href="${contextroot}/css/fonts/fontawesome_v_5/font-awesome.min.css"
  />
  <link
    rel="stylesheet"
    href="${contextroot}/css/fonts/fontawesome_v_5/all.css"
  />

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
  <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
  <script
    type="text/javascript"
    src="${contextroot}/js/jquery/jquery.validate.min.js"
  ></script>

  <link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet" />

  <style>
    .select2 .select2-search--dropdown {
      padding: 3px 2px 0px 0px;
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
      background: transparent; /* make scrollbar transparent */
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

   
  </style>
</head>

<body class="light">
  <input
    type="hidden"
    id="userrolename"
    value="${principal.profile.userRoleName}"
  />
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
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <h5 class="confirm-modal-content">Do you really want to delete?</h5>
            <br />
            <div class="form-line right">
              <input type="hidden" id="deleterecordid" />
              <input type="hidden" id="deleterecordtype" />
              <button
                type="button"
                class="btn-default1 btn"
                data-dismiss="modal"
                aria-label="Close"
                data-i18n="Cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger confirm-modal-deleteBtn"
                onclick="handleswoteventdelete()"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--#END View -->
  <section class="content">
    <c:if test="${pageId != null}">
      <input id="pagenumber" type="hidden" name="pagenumber" value="<c:out
        value="${pageId}"
      />">
    </c:if>
    <!-- Page Header -->
    <div class="page-header row no-gutters py-2 m-t--70" style="width: 2400px">
      <div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
        <h5
          class="page-title"
          style="font-weight: 600; text-transform: uppercase"
        >
          Story Of Change
        </h5>
      </div>
    </div>

    

    <div class="container-fluid">
      <div class="col-lg-12 col-md-6 sub_initiatives select-toggle " id="">
        <div class="card">

          <div class="body table-responsive sub-ini-box">
            <div class="col-lg-12 col-md-12" style="margin-bottom: 0 !important;">
              <div class="card" style="margin-top: 0 !important; margin-bottom: 0 !important;">
                <div class="tableBody">
                  <div class="table-responsive" ;="">
                    <table class="dashboard-task-infos align-center dashboard-table" style="margin-bottom: 0px !important;">
                      <tbody><tr>
                        <th style="background-color: #f7f7f7 ; width: 25%;">Background:</th>
                        <td>
                          <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder="Simple, jargon free, use action verbs, summarize the case in a nutshell &amp; captures the reader attention (not more than 15 words)"></textarea>
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #f7f7f7 ;">Divisional/Entity Strategic Objective</th>
                        <td>
                          <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder="Describe the problem being addressed (WHAT?) and (WHY) it’s important. Specify affected population. Try to establish the size or scope of the problem. Which “root causes” are being addressed? Use statistics to describe the situation if possible."></textarea>
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #f7f7f7 ;">Description of Program / Initiative</th>
                        <td class="focused">
                          <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder="Describe the program/initiative that was implemented (WHAT), including where and when it took place and how it addressed the problem. Identify the target group of the program/activity. Use statistics to describe the program/activity. Discuss any challenges faced during the process"></textarea>
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #f7f7f7 ;">Quote/Testimonial</th>
                        <td>
                          <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder="Introduce your interviewee/s. What was the situation like for this person or these people before the project began? Why did this person or these people decide to make a difference? what is his/ her feelings, concerns, aspirations. Use interviewees’ own wor"></textarea>
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #f7f7f7 ;">Description of the Change that Happened</th>
                        <td>
                          <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder="Provide a conclusion to the story that summarizes the change that has occurred as a result of the program/activity (i.e., change in KAP, use of new curriculum, change in school level practice, improved community perception, etc).  Strengthen your story by "></textarea>
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #f7f7f7 ;">Story Photo / Images</th>
                        <td>
                          <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder="Send images as attachment and add a reference to the images here "></textarea>
                        </td>
                      </tr>
                    </tbody></table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Plugins Js -->

  <script src="${contextroot}/js/app.min.js"></script>
  <script
    type="text/javascript"
    src="${contextroot}/js/jquery.contextMenu.min.js"
  ></script>
  <script
    type="text/javascript"
    src="${contextroot}/js/jquery.ui.position.js"
  ></script>
  <!-- Custom Js -->
  <script src="${contextroot}/js/admin.js"></script>
  <!-- Knob Js -->
  <script
    type="text/javascript"
    src="${contextroot}/js/knockout-3.5.0.js"
  ></script>
  <script
    type="text/javascript"
    src="${contextroot}/js/daterangepicker.min.js"
  ></script>

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


</body>
