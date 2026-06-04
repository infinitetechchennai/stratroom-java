<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<script src="${contextroot}/js/app.min.js"></script>
<script src="${contextroot}/js/widgets.js"></script>
<script type="text/javascript"
		src="${contextroot}/js/knockout-3.5.0.js"></script>
<script src="${contextroot}/js/daterangepicker.min.js"></script>
<!-- Custom Js -->
<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
<script src="${contextroot}/js/admin.js"></script>

<script src="${contextroot}/js/mustache.min.js"></script>

<!-- Knob Js -->
<script src="${contextroot}/js/pages/todo/todo.js"></script>
<script src="${contextroot}/js/bundles/datamaps/d3.min.js"></script>
<script src="${contextroot}/js/bundles/datamaps/topojson.min.js"></script>
<script src="${contextroot}/js/bundles/datamaps/datamaps.world.min.js"></script>
<script src="${contextroot}/js/pages/maps/datamap.js"></script>
<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
<script src="${contextroot}/js/moment.js"></script>
<script src="${contextroot}/js/pickr.es5.min.js"></script>
<script src="${contextroot}/js/pages/core.js"></script>
<script src="${contextroot}/js/pages/charts.js"></script>
<script src="${contextroot}/js/jquery.editable.min.js"></script>
<script src="${contextroot}/js/pages/spiritedaway.js"></script>
<script src="${contextroot}/js/pages/animated.js"></script>
<script src="${contextroot}/js/handlebars.js"></script>
<script src="${contextroot}/js/datepickerair.js"></script>
<script src="${contextroot}/js/datepicker.en.js"></script>
<script src="${contextroot}/js/initial.js"></script>
<script src="${contextroot}/js/jquery.treetable.js"></script>


<script type="text/javascript">
if($("#sessionPeriodID").val() !=	undefined){
	$("#datePeriod").val($("#sessionPeriodID").val());
}
</script>
<script type="text/javascript">
$('.date_pickers').datepicker({
    language: 'en',
    minDate: new Date(),
    range: true,
    autoClose: true,
    position: "top left",
    todayButton: true,
    onSelect: function(fd) {
        // $('.datepickers-container').hide();
    }
});
</script>