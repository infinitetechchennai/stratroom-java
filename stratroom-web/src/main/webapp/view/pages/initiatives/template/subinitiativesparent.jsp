<script id="subinitiatives-template-parent" type="x-tmpl-mustache">
  <div class="card custom-card table-card h-100">
    <div class="card-header">
      <div class="c-header-left">
        <h5 class="card-title">{{{subInitiativeInlineEditIcon}}}</h5>
        <div class="card-actions">
          {{{subInitiativeCreateIcon}}}
          {{{subInitiativeParentOptions}}}
        </div>
      </div>
    </div>
    <div class="card-body overflow-auto" style="height: 340px;">
      <div id="accordionInitiative" class="accordion accordion-flush-initiative accordion-custom">
        {{{bodyRows}}}
      </div>
    </div>
  </div>
</script>