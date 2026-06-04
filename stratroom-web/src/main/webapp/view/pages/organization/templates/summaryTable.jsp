<script id="summary-template" type="x-tmpl-mustache">
  <tr>
    <td style="vertical-align:middle; text-align: center;">
      {{#flagcolor}}
        <img src="/stratroom/images/flag-{{flagcolor}}-i.svg" alt="flag-{{flagcolor}}" title="flag-{{flagcolor}}" class="flag">
      {{/flagcolor}}
    </td>
    <td style="vertical-align:middle; text-align: center;" data-id="{{id}}" class="risknavigate">
      <a href="#" style="color: #333; font-weight: bold;">{{id}}</a>
    </td>
    <td style="vertical-align:middle; text-align: center;">{{name}}</td>
    <td style="vertical-align:middle; text-align: center;">{{riskcategory}}</td>
    <td style="vertical-align:middle; text-align: center;">
      <span class="badge label-bg-{{impactColor}} rounded-pill">{{impact}}</span>
    </td>
    <td style="vertical-align:middle; text-align: center;">
      <span class="badge label-bg-{{likelihoodColor}} rounded-pill">{{likeliHood}}</span>
    </td>
    <td style="vertical-align:middle; text-align: center;">{{score}}</td>
    <td style="vertical-align:middle; text-align: center;">{{dateRaised}}</td>
    <td style="vertical-align:middle; text-align: center;">{{nextAssessment}}</td>
  </tr>
</script>