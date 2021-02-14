<template>
  <div class="modal fade" id="editingWidget" data-backdrop="static" tabindex="-1" role="dialog"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modalTitle text-center w-100">Markdown Editor</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="editingForm">
            <!--suppress HtmlFormInputWithoutLabel -->
            <input hidden id="chapterNameHolder">
            <!--suppress HtmlFormInputWithoutLabel -->
            <input hidden id="docHandleHolder">
            <div class="form-group">
              <label for="editBlock">Enter markdown text in here</label>
              <textarea class="form-control" id="editBlock" rows="20"></textarea>
            </div>
            <div class="edButtonBlock d-flex justify-content-center">
              <button id="preview" class="btn btn-outline-dark">Preview</button>
              <button id="publish" class="btn btn-outline-dark">Publish</button>
            </div>
          </form>
          <div id="md-help">
            See the documentation at
            <a target="_blank" href="https://github.com/markdown-it/markdown-it">https://github
              .com/markdown-it/markdown-it</a> or
            <a target="_blank" href="http://spec.commonmark.org/">http://spec.commonmark.org/</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditWidget"
}
</script>

<style scoped>

</style>
