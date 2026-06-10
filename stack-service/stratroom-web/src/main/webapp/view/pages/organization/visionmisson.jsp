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

    /* table desig */
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
          Vision, Mission and Values
        </h5>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row gutters-8 gap-3 justify-content-center">
        <div class="col-md-6">
          <div class="mb-3 card overview-card h-100">
            <div class="card-header">
              <span class="icon"
                ><img
                  width="24"
                  height="24"
                  src="images/widgets/vision-i.png"
                  alt="Vision"
              /></span>
              <h5 class="card-title">Vision</h5>
            </div>
            <div class="card-body">
              <p class="m-0">
                Be a recognized leader in innovative education and high impact
                research that transforms students into next generation
                scientific leaders who successfully address current and future
                health challenge.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card overview-card h-100">
            <div class="card-header">
              <span class="icon"
                ><img
                  width="24"
                  height="24"
                  src="images/widgets/mission-i.png"
                  alt="Mission"
              /></span>
              <h5 class="card-title">Mission</h5>
            </div>
            <div class="card-body">
              <p class="m-0">
                Provide an enriching academic experience and research training
                in the biomedical sciences, and/or genomics and precision
                medicine, that develops creative and innovative leaders who
                address regional and global health challenges.
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-6">
          <div class="card overview-card h-100">
            <div class="card-header">
              <span class="icon"><img width="24" height="24" src="../organisation/images/value-i.svg"
                  alt="Values" /></span>
              <h5 class="card-title mb-0">Values</h5>
            </div>
            <div class="card-body">
              <p>HBKU is guided by the following core values:</p>
              <ul class="values">
                <li><strong>Excellence:</strong> Commitment to achieving the highest standards in education,
                  research,
                  and community engagement.</li>
                <li><strong>Innovation:</strong> Encouraging creative solutions and forward-thinking approaches to
                  global challenges.</li>
                <li><strong>Collaboration:</strong> Building partnerships with institutions and individuals to
                  amplify
                  impact.</li>
                <li><strong>Sustainability:</strong> Ensuring research and education contribute to long-term
                  societal
                  and environmental well-being.</li>
                <li><strong>Integrity:</strong> Upholding ethical standards in all endeavors.</li>
              </ul>
            </div>
          </div>
        </div> -->
        <div class="col-12">
          <div class="card overview-card h-100">
            <div class="card-body flowchart-img">
              <img src="images/widgets/flowchart.png" />
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
