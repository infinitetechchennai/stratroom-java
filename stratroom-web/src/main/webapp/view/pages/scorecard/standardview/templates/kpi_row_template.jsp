<script id="kpi-row-template" type="x-tmpl-mustache"> 
    <tr class="kpi-row-class" data-kpi-id="{{kpiId}}" style="background-color: white;">
        <th class="status-light-class">{{{statusLight}}}</th>
        <th><a style="font-weight: 900; color: #313030 !important;" {{{KpiViewLink}}} class="kpi-link-class">{{kpiDisplayId}}</a></th>
        <th style="text-align: left" colspan="3" class="arrowSubKpiview" data-kpi-id="{{kpiId}}">
            {{#hasSubKpi}}<i class="fa fa-angle-right toggleSubKpi"></i>{{/hasSubKpi}}{{kpiName}}
        </th>
        <th class="kpi-measure-class" data-i18n="{{kpiPeriod}}">{{kpiMeasure}}</th>
        {{{kpiActual}}}
        {{{kpiTarget}}}
        {{{kpithresholdResult}}}
        {{{trendValue}}}
        {{{riskStatusLight}}}
        <th class="kpi-options-icon-class">{{{kpiOptionsicon}}}</th>
    </tr>
</script>


<script id="subkpi-row-template" type="x-tmpl-mustache">
    <tr class="subKpiview" data-parent-kpi-id="{{kpiId}}" style="display:none; background-color: white;">
        <th class="status-light-class">{{{statusLight}}}</th>
        <th><a style="font-weight: 900; color: #313030 !important;" {{{KpiViewLink}}} class="kpi-link-class">{{kpiDisplayId}}</a></th>
        <th style="text-align: left" colspan="3">{{kpiName}}</th>
        <th class="kpi-measure-class" data-i18n="{{kpiPeriod}}">{{kpiMeasure}}</th>
        {{{kpiActual}}}
        {{{kpiTarget}}}
        {{{kpithresholdResult}}} 
        {{{trendValue}}}
        {{{riskStatusLight}}}
        <th class="kpi-options-icon-class">{{{kpiOptionsicon}}}</th>
    </tr>
</script>

<script>
  $(document).ready(function() {
    
    $(document).on("click", ".arrowSubKpiview", function() {
        const kpiId = $(this).data("kpi-id").toString();


        $("tr.subKpiview").each(function () {
            var parentKpiId = $(this).attr("data-parent-kpi-id");
            if (parentKpiId === kpiId) {
                console.log("Toggling SubKPIs for KPI ID:", kpiId);

                $(this).toggle();
            }
        });
        // Toggle the arrow icon's class (right or down)
        $(this).find('i').toggleClass("fa-angle-right fa-angle-down");
    });
});


</script>