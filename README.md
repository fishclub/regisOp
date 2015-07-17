# regisOp v1.0

db.comment.insert({ "username" : "testuser1", "content" : "testuser1 content" })

https://scotch.io/tutorials/easy-node-authentication-google

http://eonasdan.github.io/bootstrap-datetimepicker/

http://start.jcolemorrison.com/quick-tip-organizing-routes-in-large-express-4-x-apps/

https://datatables.net/examples/styling/bootstrap.html

http://stackoverflow.com/questions/20858299/model-find-toarray-claiming-to-not-have-toarray-method
var query

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
   

   if doctor.doctorId==''
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
    else
      h4 Edit doctor
      form(name="adddoctor",method="post",action="/doctors/updatedoctor")
       input(name="_id", type="hidden", value="#{doctor._id}")
       .form-group
       label ID: 
       input.form-control(type="text", placeholder="Id", name="doctorId", value="#{doctor.doctorId}")
       .form-group
       label Name: 
       input.form-control(type="text", placeholder="Name", name="name", value="#{doctor.name}")
       .form-group
       label Surname: 
       input.form-control(type="text", placeholder="Surname", name="surName", value="#{doctor.surName}")
       .form-group
       label Gender: 
       label.radio.inline
       input(type="radio", name="gender", value="Male", checked=doctor.gender=='Male') 
       |  Male 
       input(type="radio", name="gender", value="Female", checked=doctor.gender=='Female')
       |  Female 
       .form-group
       label Ext. Phone: 
       input.form-control(type="text", placeholder="Ext. Phone", name="extPhone", value="#{doctor.extPhone}")
       .form-group
       button.btn.btn-primary(type="submit") Update

 $(function(){
            $('#viewMode').click(function(){
                $.get( $('#viewMode').attr('data-href'), function(data) {
                  $('#view_id').val(data.doctorId);
                  $('#view_name').val(data.name);
                });
            });
          });


.modal.fade(id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true")
    .modal-dialog.wide-modal
      .modal-content
        .modal-header
          button.close(type='button', data-dismiss='modal', aria-hidden='true') ×
          h4.addModalLabel.modal-title View Doctor
        .modal-body
          form(name="adddoctor",method="post",action="/doctors/updatedoctor")
           input(name="_id", type="hidden", value="#{doctor._id}")
           .form-group
           label * ID: 
           input.form-control(type="text", placeholder="ID", name="doctorId", value="#{doctor.doctorId}", required)
           .form-group
           label * Name: 
           input.form-control(type="text", placeholder="Name", name="name", value="#{doctor.name}", required)
           .form-group
           label Surname: 
           input.form-control(type="text", placeholder="Surname", name="surName", value="#{doctor.surName}")
           .form-group
           label Gender: 
           label.radio.inline
           input(type="radio", name="gender", value="Male", checked=doctor.gender=='Male') 
           |  Male 
           input(type="radio", name="gender", value="Female", checked=doctor.gender=='Female')
           |  Female 
           .form-group
           label Ext. Phone: 
           input.form-control(type="text", placeholder="Ext. Phone", name="extPhone", value="#{doctor.extPhone}")
           .form-group
           button.btn.btn-default(data-dismiss='modal') Cancel 
           | 
           button.btn.btn-primary(type="submit") Update    


sort table

  $('#mainTable').dataTable( {
    "order": [[ 0, "desc" ]]
  });

//res.redirect('./editDoctor/'+doctor._id);

      //res.send(doctors);

block foot
  .container
    p some footer content   
        
install dateformat
        npm install moment --save           