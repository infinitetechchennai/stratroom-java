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
          Key Achievements
        </h5>
      </div>
    </div>

    

 

   

    <div class="container-fluid">
      <div class="card" style="padding: 16px 32px">
        <div class="row kpi_data_form">
          <div class="col-12 form-group focused">
            <label for="Name" class="active">
              Top three Key Achievements
            </label>
            <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder="Artificial Intelligence (AI) and Machine Learning in Healthcare. 1. AI and machine learning algorithms are increasingly being used to analyze vast amounts of health data, including genomic data, electronic health records, and clinical trial outcomes. These technologies help identify patterns, predict disease risks, and optimize treatments. 2.DeepMind’s AI for eye disease diagnosis and IBM Watson’s AI-driven oncology platform are examples where AI is applied to detect diseases earlier and recommend personalized treatments."></textarea>
          </div>
          <div class="col-4 form-group">
            <label for="Name">Theme</label>
            <select id="inputState" style="padding-left: 6px !important" class="form-control browser-default persp_status">
              <option data-i18n="Choose">Choose</option>
              <option value="Kendall Pearson">Theme</option>
              <option value="Erik Seymour">Cluster</option>
              <option value="Mason Collier">Project</option>
            </select>
          </div>
          <div class="col-8 form-group focused">
            <label for="Measurement Frequency" class="">Key Achievements</label>
            <input type="text" class="form-control browser-default">
          </div>
          <div class="col-4 form-group">
            <input type="text" class="form-control browser-default" placeholder="Precision Health">
          </div>
          <div class="col-8 form-group">
            <input type="text" class="form-control browser-default" placeholder="Blood-based tests like Guardant360 and Grail's multi-cancer early detection test are leading the way in detecting cancer through blood samples.">
          </div>
          <div class="col-4 form-group">
            <input type="text" class="form-control browser-default" placeholder="Sustainability">
          </div>
          <div class="col-8 form-group focused">
            <input type="text" class="form-control browser-default" placeholder="Zero-Waste Movement: There has been a growing shift towards zero-waste lifestyles, with significant efforts to reduce single-use plastics and encourage reusable materials. The UNEP's Clean Seas Campaign and initiatives like the Plastic Waste Coalition are driving action against plastic pollution.">
          </div>
          <div class="col-4 form-group">
            <input type="text" class="form-control browser-default" placeholder="Artificial Intelligence">
          </div>
          <div class="col-8 form-group">
            <input type="text" class="form-control browser-default" placeholder="Breakthrough in Neural Networks: Deep learning, a subset of machine learning that mimics the human brain’s neural networks, has seen remarkable advances. In particular, convolutional neural networks (CNNs) and recurrent neural networks (RNNs) have enabled AI to achieve superhuman performance in image recognition, speech recognition, and natural language processing (NLP).">
          </div>
          <div class="col-12 form-heading">
            <h4 style="text-align: left;">Multiversity</h4>
          </div>
          <div class="col-12 form-group">
            <label for="Name" class="active">
              Multiversity
            </label>
            <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder=""></textarea>
          </div>
          <div class="col-12 form-heading">
            <h4 style="text-align: left;">Key External Partnerships</h4>
          </div>
          <div class="col-12 form-group">
            <label for="Name" class="active">
              Key External Partnerships
            </label>
            <textarea class="form-control" id="" style="width: 100%; height: 100px" placeholder=""></textarea>
          </div>
          <div class="col-12">
            <div class="form-line right">
              <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close">
                Submit
              </button>
              <button class="initative_save_btn" value="Save" data-i18n="Save" >
                Save
              </button>
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
