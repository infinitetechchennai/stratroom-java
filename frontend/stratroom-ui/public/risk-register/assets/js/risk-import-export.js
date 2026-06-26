/**

 * Risk register import/export — fixes swapped toolbar actions and wires real API calls.

 */

(function (global) {

  var selectedImportFile = null;

  var validationPassed = false;



  function getDateRange() {

    var y = new Date().getFullYear();

    return localStorage.getItem('customperiod') || ('01/01/' + y + '-12/31/' + y);

  }



  function getPageId() {

    return new URLSearchParams(global.location.search).get('pageId') || '';

  }



  function updateFileLabel(file) {

    var label = document.getElementById('risk-import-file-label');

    if (!label) return;

    if (file && file.name) {

      label.textContent = file.name;

      label.classList.add('fw-semibold', 'text-primary');

    } else {

      label.textContent = 'Choose a file or drag it here.';

      label.classList.remove('fw-semibold', 'text-primary');

    }

  }



  function setValidationLoading(loading) {

    $('#risk-import-loading').toggle(loading);

    $('#risk-import-status-img').toggle(!loading);

    if (loading) {

      $('#risk-import-message').text('Validating file...');

      showImportErrors([]);

    }

  }



  function setSaveLoading(loading) {

    $('#risk-import-save-loading').toggle(loading);

    $('#risk-import-save-img').toggle(!loading);

    if (loading) {

      $('#risk-import-save-message').text('Importing risks, please wait...');

    }

  }



  function resetImportWizard() {

    selectedImportFile = null;

    validationPassed = false;

    var fileInput = document.getElementById('risk-import-file');

    if (fileInput) fileInput.value = '';

    updateFileLabel(null);

    $('#file-upload').show();

    $('#file-validate').hide();

    $('#file-save').hide();

    $('.form-progressbar li').removeClass('active');

    $('#risk-import-error-wrap').hide();

    $('#risk-import-error-body').empty();

    $('#risk-import-message').text('');

    $('#risk-import-status-img').attr('src', 'assets/images/not-verified.png').hide();

    $('#risk-import-loading').hide();

    $('#risk-import-save-message').text('');

    $('#risk-import-save-img').hide();

    $('#risk-import-save-loading').hide();

    $('#next-btn-2').prop('disabled', true);

    $('#done-btn').prop('disabled', false);

  }



  function showImportErrors(errors) {

    var body = document.getElementById('risk-import-error-body');

    var wrap = document.getElementById('risk-import-error-wrap');

    if (!body || !wrap) return;

    body.innerHTML = '';

    (errors || []).forEach(function (row) {

      var tr = document.createElement('tr');

      tr.innerHTML = '<td style="width:150px">' + (row.row || '-') + '</td><td>' + (row.error || row.message || '') + '</td>';

      body.appendChild(tr);

    });

    wrap.style.display = errors && errors.length ? 'block' : 'none';

  }



  function parseValidationResponse(data) {

    if (!data) return [{ row: '-', error: 'Empty response from server' }];

    if (Array.isArray(data.errors) && data.errors.length) return data.errors;

    if (Array.isArray(data.parsingError) && data.parsingError.length) {

      return data.parsingError.map(function (item, idx) {

        if (item && typeof item === 'object') {

          return {

            row: item.rowNo || item.row || (idx + 1),

            error: item.error || item.message || JSON.stringify(item)

          };

        }

        return { row: idx + 1, error: String(item) };

      });

    }

    var result = String(data.result || '').toLowerCase();

    if (result === 'success') return [];

    if (data.message) return [{ row: '-', error: data.message }];

    return [];

  }



  function uploadRiskFile(type) {

    if (!selectedImportFile) {

      alert('Please choose a file to import.');

      return Promise.reject(new Error('No file'));

    }

    if (!global.RiskApiBridge || !global.RiskApiBridge.enabled) {

      return Promise.reject(new Error('Not logged in'));

    }

    var formData = new FormData();

    formData.append('riskData', selectedImportFile, selectedImportFile.name || 'risk-import.csv');

    return global.RiskApiBridge.apiFetch('/saveBulkRiskDetails?type=' + encodeURIComponent(type), {

      method: 'POST',

      body: formData

    });

  }



  function showValidationResult(data, errors) {

    setValidationLoading(false);

    if (errors.length) {

      validationPassed = false;

      showImportErrors(errors);

      $('#risk-import-status-img').attr('src', 'assets/images/not-verified.png').show();

      $('#risk-import-message').text('Validation found issue(s). Fix the file and try again.');

      $('#next-btn-2').prop('disabled', true);

      return;

    }

    validationPassed = true;

    showImportErrors([]);

    $('#risk-import-status-img').attr('src', 'assets/images/verified.png').show();

    var rowCount = data && data.rowCount;

    $('#risk-import-message').text(

      rowCount

        ? ('File validated successfully (' + rowCount + ' risk row' + (rowCount === 1 ? '' : 's') + ').')

        : 'File validated successfully. Click Next to import.'

    );

    $('#next-btn-2').prop('disabled', false);

  }



  function exportRiskRegister() {

    if (!global.RiskApiBridge || !global.RiskApiBridge.enabled) {

      alert('Please log in to export risks.');

      return;

    }

    var empId = global.RiskApiBridge.getEmpId();

    if (!empId) {

      alert('Employee id not found in session.');

      return;

    }

    var pageId = getPageId();

    var dateRange = getDateRange();

    var url = '/api/downloadRiskDetails/' + empId + '?dateRange=' + encodeURIComponent(dateRange);

    if (pageId) url += '&pageId=' + encodeURIComponent(pageId);



    fetch(url, { headers: global.RiskApiBridge.buildHeaders ? global.RiskApiBridge.buildHeaders() : {} })

      .then(function (res) {

        if (!res.ok) throw new Error('Export failed (' + res.status + ')');

        return res.blob().then(function (blob) {

          var link = document.createElement('a');

          link.href = URL.createObjectURL(blob);

          link.download = 'risk-register.csv';

          document.body.appendChild(link);

          link.click();

          link.remove();

          setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);

        });

      })

      .catch(function (err) {

        console.warn('Server export failed, falling back to client CSV', err);

        exportClientCsv();

      });

  }



  function exportClientCsv() {

    var rows = (typeof global.filtered !== 'undefined' && global.filtered.length)

      ? global.filtered

      : (typeof global.DATA !== 'undefined' ? global.DATA : []);

    if (!rows.length) {

      alert('No risks to export.');

      return;

    }

    var header = ['Id', 'Name', 'Department', 'Category', 'Status', 'Level', 'Date Raised', 'Date Completed', 'Owner'];

    var lines = [header.join(',')];

    rows.forEach(function (risk) {

      lines.push([

        csv(risk.id),

        csv(risk.title),

        csv(risk.department),

        csv(risk.riskCategory),

        csv(risk.status),

        csv(risk.riskLevel),

        csv(risk.dateRaised),

        csv(risk.dateCompleted),

        csv(risk.owner && risk.owner.name)

      ].join(','));

    });

    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });

    var link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = 'risk-register.csv';

    document.body.appendChild(link);

    link.click();

    link.remove();

  }



  function csv(value) {

    var text = value == null ? '' : String(value);

    if (text.indexOf('"') >= 0 || text.indexOf(',') >= 0 || text.indexOf('\n') >= 0) {

      return '"' + text.replace(/"/g, '""') + '"';

    }

    return text;

  }



  function unbindLegacyUploadHandlers() {

    $('#next-btn-1, #next-btn-2, #prev-btn1, #prev-btn2').off('click');

  }



  function bindImportWizard() {

    unbindLegacyUploadHandlers();



    var importModal = document.getElementById('file-validate-form');

    if (importModal) {

      importModal.addEventListener('show.bs.modal', resetImportWizard);

      importModal.addEventListener('hidden.bs.modal', resetImportWizard);

    }



    $(document).off('change.riskImport', '#risk-import-file').on('change.riskImport', '#risk-import-file', function (e) {

      selectedImportFile = e.target.files && e.target.files[0] ? e.target.files[0] : null;

      validationPassed = false;

      $('#next-btn-2').prop('disabled', true);

      updateFileLabel(selectedImportFile);

    });



    $('#next-btn-1').off('click.riskImport').on('click.riskImport', function (e) {

      e.preventDefault();

      e.stopImmediatePropagation();

      if (!selectedImportFile) {

        alert('Please choose a file to import.');

        return;

      }

      validationPassed = false;

      $('#file-upload').hide();

      $('#file-validate').show();

      $('#file-save').hide();

      $('.form-progressbar li').removeClass('active');

      $('.form-progressbar li:nth-child(1)').addClass('active');

      $('.form-progressbar li:nth-child(2)').addClass('active');

      $('#next-btn-2').prop('disabled', true);

      setValidationLoading(true);



      uploadRiskFile('validation')

        .then(function (data) {

          showValidationResult(data, parseValidationResponse(data));

        })

        .catch(function (err) {

          showValidationResult(null, [{ row: '-', error: err.message || String(err) }]);

        });

    });



    $('#next-btn-2').off('click.riskImport').on('click.riskImport', function (e) {

      e.preventDefault();

      e.stopImmediatePropagation();

      if (!validationPassed) {

        alert('Please fix validation errors before importing.');

        return;

      }

      $('#file-upload').hide();

      $('#file-validate').hide();

      $('#file-save').show();

      $('.form-progressbar li:nth-child(3)').addClass('active');

      setSaveLoading(true);

      $('#done-btn').prop('disabled', true);



      uploadRiskFile('save')

        .then(function (data) {

          var errors = parseValidationResponse(data);

          setSaveLoading(false);

          if (errors.length) {

            validationPassed = false;

            $('#risk-import-save-img').attr('src', 'assets/images/not-verified.png').show();

            $('#risk-import-save-message').text(errors[0].error || 'Import failed.');

            $('#file-validate').show();

            $('#file-save').hide();

            showImportErrors(errors);

            $('#risk-import-status-img').attr('src', 'assets/images/not-verified.png').show();

            $('#risk-import-message').text('Import could not complete.');

            $('.form-progressbar li:nth-child(3)').removeClass('active');

            $('.form-progressbar li:nth-child(2)').addClass('active');

            $('#next-btn-2').prop('disabled', true);

            return;

          }

          $('#risk-import-save-img').attr('src', 'assets/images/success.png').show();

          var msg = (data && data.message) ? data.message : 'Import completed successfully.';

          $('#risk-import-save-message').text(msg);

          if (typeof global.setVersionFilter === 'function') {

            var approvedBtn = document.querySelector('[onclick*="setVersionFilter(\'Approved\'"]');

            global.setVersionFilter('Approved', approvedBtn || null);

          }

          if (typeof global.loadRisks === 'function') global.loadRisks();

        })

        .catch(function (err) {

          setSaveLoading(false);

          $('#risk-import-save-img').attr('src', 'assets/images/not-verified.png').show();

          $('#risk-import-save-message').text((err && err.message) ? err.message : 'Import is not available yet on this server.');

          $('#file-validate').show();

          $('#file-save').hide();

          $('.form-progressbar li:nth-child(3)').removeClass('active');

          $('.form-progressbar li:nth-child(2)').addClass('active');

          $('#next-btn-2').prop('disabled', true);

          validationPassed = false;

        })

        .finally(function () {

          $('#done-btn').prop('disabled', false);

        });

    });



    $('#prev-btn1').off('click.riskImport').on('click.riskImport', function (e) {

      e.preventDefault();

      e.stopImmediatePropagation();

      resetImportWizard();

      $('.form-progressbar li:nth-child(1)').addClass('active');

    });



    $('#prev-btn2').off('click.riskImport').on('click.riskImport', function (e) {

      e.preventDefault();

      e.stopImmediatePropagation();

      $('#file-upload').hide();

      $('#file-validate').show();

      $('#file-save').hide();

      $('#risk-import-save-message').text('');

      $('#risk-import-save-img').hide();

      $('#risk-import-save-loading').hide();

      $('.form-progressbar li:nth-child(3)').removeClass('active');

      $('.form-progressbar li:nth-child(2)').addClass('active');

    });



    $('#done-btn').off('click.riskImport').on('click.riskImport', function (e) {

      e.preventDefault();

      var modalEl = document.getElementById('file-validate-form');

      if (modalEl && global.bootstrap) {

        global.bootstrap.Modal.getOrCreateInstance(modalEl).hide();

      }

      if (typeof global.loadRisks === 'function') global.loadRisks();

    });

  }



  global.exportRiskRegister = exportRiskRegister;



  if (global.jQuery) {

    global.jQuery(function () {

      bindImportWizard();

    });

  } else {

    document.addEventListener('DOMContentLoaded', bindImportWizard);

  }

})(window);

