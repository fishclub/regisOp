# regisOp v1.0

db.comment.insert({ "username" : "testuser1", "content" : "testuser1 content" })

https://scotch.io/tutorials/easy-node-authentication-google

http://eonasdan.github.io/bootstrap-datetimepicker/

http://start.jcolemorrison.com/quick-tip-organizing-routes-in-large-express-4-x-apps/

https://datatables.net/examples/styling/bootstrap.html

.form-group
           label Oganization: 
           .input-group
            input.form-control(type="text", placeholder="oganization", name="oganization")
            span.input-group-addon
             a(data-toggle="modal", data-target="#myModal", href="#")
              span.glyphicon.glyphicon-search

.form-group
           label Oganization: 
           .input-group
            input.form-control(type="text", placeholder="oganization", name="oganization", value="#{event.oganization}")
            span.input-group-addon
             a(data-toggle="modal", data-target="#myModal", href="#")
              span.glyphicon.glyphicon-search              

tr(data-url="/doctors/editdoctor/#{doctor._id}")
    $("#mainTable tr").click(function() {
      window.location.href = $(this).data('url');
    });


    .modal.fade(id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true")
  .modal-dialog.wide-modal
    .modal-content
      .modal-header
        button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
        h4.addModalLabel.modal-title Add Doctor
      .modal-body
        h4 Add doctor
        form(name="adddoctor",method="post",action="/doctors/adddoctor")
         input(name="_id", type="hidden", value="#{doctor._id}")      
         .form-group
         label ID: 
         input.form-control(type="text", placeholder="Id", name="doctorId")
         .form-group
         label Name: 
         input.form-control(type="text", placeholder="Name", name="name")
         .form-group
         label Surname: 
         input.form-control(type="text", placeholder="Surname", name="surName")
         .form-group
         label Gender: 
         label.radio.inline
         input(type="radio", name="gender", value="Male", checked) 
         |  Male 
         input(type="radio", name="gender", value="Female")
         |  Female 
         .form-group
         label Ext. Phone: 
         input.form-control(type="text", placeholder="Ext. Phone", name="extPhone")
         .form-group
         button.btn.btn-primary(type="submit") Save
      .modal-footer
        button.btn.btn-primary(type='button', data-dismiss='modal') Close