(function ($) {
  $(function () {
    $.widget("zpd.paging", {
      options: {
        limit: 5,
        rowDisplayStyle: "block",
        activePage: 0,
        rows: [],
      },
      _create: function () {
        var rows = $("tbody", this.element).children();
        this.options.rows = rows;
        this.options.rowDisplayStyle = rows.css("display");
        var nav = this._getNavBar();
        // this.element.after(nav);
        //$(".navigation-wrap").html(nav);        
        this.element.closest(".table-container").find(".navigation-wrap").html(nav);
        this.showPage(0);
      },

      _getNavBar: function () {
        var rows = this.options.rows;
        var nav = $("<ul>", { class: "pagination pagination-sm justify-content-center mb-0" });
      
        // Create "Previous" link
        this._on(
          $("<li>", { class: "page-item" }).append(
            $("<a>", {
              class: "page-link",
              href: "#",
              text: "«",
              "data-direction": -1,
            })
          ).prependTo(nav),
          { click: "pageStepHandler" }
        );
      
        // Generate page links
        for (var i = 0; i < Math.ceil(rows.length / this.options.limit); i++) {
          this._on(
            $("<li>", { class: "page-item" + (i === 0 ? " active" : "") }).append(
              $("<a>", {
                class: "page-link",
                href: "#",
                text: i + 1,
                "data-page": i,
              })
            ).appendTo(nav),
            { click: "pageClickHandler" }
          );
        }
      
        // Create "Next" link
        this._on(
          $("<li>", { class: "page-item" }).append(
            $("<a>", {
              class: "page-link",
              href: "#",
              text: "»",
              "data-direction": +1,
            })
          ).appendTo(nav),
          { click: "pageStepHandler" }
        );
      
        return nav; // Return the navigation controls
      },
         

      showPage: function (pageNum) {
        var num = pageNum * 1; //it has to be numeric
        this.options.activePage = num;
        var rows = this.options.rows;
        var limit = this.options.limit;
        for (var i = 0; i < rows.length; i++) {
          if (i >= limit * num && i < limit * (num + 1)) {
            $(rows[i]).css("display", this.options.rowDisplayStyle);
          } else {
            $(rows[i]).css("display", "none");
          }
        }
      },
      // pageClickHandler: function (event) {
      //   event.preventDefault();
      //   $(event.target).siblings().attr("class", "");
      //   $(event.target).attr("class", "page-link selected-page");
      //   var pageNum = $(event.target).attr("data-page");
      //   this.showPage(pageNum);
      // },
      pageClickHandler: function (event) {
        event.preventDefault(); // Prevent default anchor behavior
      
        var $clickedLink = $(event.target); // Get the clicked <a> element
      
        // Remove 'active' class from all <li> elements and add it to the clicked one
        $clickedLink.closest("ul").find("li").removeClass("active");
        $clickedLink.parent("li").addClass("active");
      
        // Show the selected page
        var pageNum = $clickedLink.attr("data-page"); // Get the page number from the clicked link
        this.showPage(pageNum);
      },
      pageStepHandler: function (event) {
        event.preventDefault();
      
        // Get the direction (-1 for Previous, +1 for Next)
        var dir = $(event.target).attr("data-direction") * 1;
        var pageNum = this.options.activePage + dir;
      
        // Calculate the total number of pages
        var totalPages = Math.ceil(this.options.rows.length / this.options.limit);
      
        // Ensure the page number is within valid bounds
        if (pageNum >= 0 && pageNum < totalPages) {
          // Trigger click on the corresponding page link
          $("a[data-page=" + pageNum + "]", $(event.target).closest("ul")).click();
        }
      },
      
    });
  });
})(jQuery);
