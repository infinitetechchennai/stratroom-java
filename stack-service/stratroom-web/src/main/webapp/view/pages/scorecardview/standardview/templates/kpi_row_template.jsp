<style>
    *{
        font-size: 12px !important;
    }
</style> 
<script id="kpi-row-template" type="x-tmpl-mustache"> 
    <tr class="kpi-row-class"  style="background-color: white;">
        <th class="status-light-class">{{{statusLight}}}</th>
        <th><a style="font-weight: 900;color: #313030 !important;" {{{KpiViewLink}}} class="kpi-link-class">{{kpiDisplayId}}</a></th>
        <th style="text-align: left" colspan="3" class="arrowSubKpiview">{{#hasSubKpi}}<i class="fa fa-angle-right toggleSubKpi"></i>{{/hasSubKpi}}{{kpiName}}</th>
        <th class="kpi-measure-class">{{kpiMeasure}}</th>
        {{{kpiActual}}}
        {{{kpiTarget}}}
        {{{kpithresholdResult}}}
        {{{trendValue}}}
        {{{riskStatusLight}}}
        <th class="kpi-options-icon-class">
            {{{kpiOptionsicon}}}
        </th>
    </tr>
</script>

<script id="subkpi-row-template" type="x-tmpl-mustache">
    <tr class="subKpiview" style="display:none;background-color: white;" >
        <th class="status-light-class">{{{statusLight}}}</th>
        <th><a style="font-weight: 900;color: #313030 !important;" {{{KpiViewLink}}} class="kpi-link-class">{{kpiDisplayId}}</a></th>
        <th style="text-align: left" colspan="3">{{kpiName}}</th>
        <th class="kpi-measure-class">{{kpiMeasure}}</th>
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
        
        $(this).closest("tr").next(".subKpiview").toggle();
        
        $(this).find('i').toggleClass("fa-angle-right fa-angle-down");
    });
});

</script>
