// JavaScript Document
    var dataStored = [];
    var valores=new Array();
    
        
    
    $("#sub").click(function(){
  		$("input[name=accion]").val('insertar');
      var datos = $("#insertar :input").serializeArray();
      $.post( $("#insertar").attr("action"), datos, function(info) { $("#result").html(info);
             success : listar();
       } );
	  	limpiarInput();
    });

    $("#sub_upd").click(function(){
      $("input[name=accion]").val('actualizar');
      var datos = $("#form_editar :input").serializeArray();
      $.post( $("#form_editar").attr("action"), datos, function(info) { $("#result").html(info); 
            success : listar();
      } );
      $( "#form_editar" ).hide( "fade", 1000 );

    });

    $("#form_editar").submit( function(){
      return false;
    });

    $("#insertar").submit( function(){
		  return false;
    }); 

    function limpiarInput() {
      $("#insertar :input").each ( function() { $(this).val('') ; } );
    }

   $(document).ready( function() {
      listar();
      
    });

    function listar() {
      $(".items").empty();
      jQuery.getJSON('2do_fetch.php', function(data) {
         jQuery.each(data.result, function (i, app) {
              dataStored[i] = [];
              dataStored[i]['id'] = app['id'];
              dataStored[i]['taskdesc'] = app['desc'];
              dataStored[i]['taskpri'] = app['priority'];
              dataStored[i]['taskdd'] = app['due_date'];
              dataStored[i]['status'] = app['status'];
              $(".items").append('<div class="item" tarea="'+app['id']+'"><div class="view"><input type="checkbox" tarea="'+app['id']+'"></input><span>'+app['desc']+'</span><a class="destroy"></a><div class="editar" tarea="'+app['id']+'">&nbsp;</div><div class="priority">'+app['priority']+'</div><div class="duedate">'+app['due_date']+'</div></div>');
              if(dataStored[i]['status'] == 1){
                  //alert(dataStored[i]['status']);
                  var str=".item[tarea="+app['id']+"]";
                  $(str).addClass("done");
              }
              if(dataStored[i]['status'] == 0){
                  var str=".item[tarea="+app['id']+"]";
                  $(str).removeClass("done");
              }
         });
       });

    }
    
    function load_editar(tskid) {
      $.getJSON('2do_fetch.php', function(datos) {
          $.each(datos.result, function() { 
            if ( this['id'] == tskid) {
               $("#tid").val(this['id']);
               $("#edit_cont").val(this['desc']);
               $("#edit_dd").val(this['due_date']);
               $("#edit_pri").val(this['priority']);
            }
          });
      });
    
    } 
    
    function delete_tasks(ids_array) {

       var array = ids_array.toString();
       $.ajax({
         type: 'POST',    
         url:'2do.php',
         data:'idsarray='+ array,
         success: function(info){
           $("#result").html(info);
           listar();
         }
       });
 
    }
    
    $(document).click(function(e){
      var elemclas = $(e.target).attr('class');
      var elem = $(e.target).attr('id');
      var type = $(e.target).attr('type');
     
      if ( elemclas == 'editar' ) {
         var id = $(e.target).attr('tarea');
         $( "#form_editar" ).show( "clip", 800 );
         load_editar(id); 
      }
     
      if ( elemclas == 'cancell' ) {
         $( "#form_editar" ).hide( "fade", 1000 );
      }
     
      if ( type == 'checkbox'){
         var id = $(e.target).attr('tarea');
         $(e.target).parent().toggleClass("done");
         check_task(id);
      }

      if ( elemclas == 'clear'){
       
        var selval = new Array();
        $('input[type=checkbox]:checked').each(function(){
          selval.push($(this).attr('tarea'));
        });
        
        delete_tasks(selval);

     }
   
   if ( elem == 'ord_by_pri' ){
        var ord = 'pri';
        ordenar(ord);
     }

   
   if ( elem == 'ord_by_dd') {
        var ord = 'dd';
        ordenar(ord);
     }
   });

     function ordenar(tipo){
      
      $(".items").empty();
      jQuery.getJSON('2do_fetch.php', { orden: tipo }, function(data) {
         jQuery.each(data.result, function (i, app) {
              $(".items").append('<div class="item" tarea="'+app['id']+'"><div class="view"><input type="checkbox" tarea="'+app['id']+'"></input><span>'+app['desc']+'</span><a class="destroy"></a><div class="editar" tarea="'+app['id']+'">&nbsp;</div><div class="priority">'+app['priority']+'</div><div class="duedate">'+app['due_date']+'</div></div>');

         });
       });

     }

     function check_task(tid){
       var ids = tid.toString();

       $.ajax({
         type: 'POST',
         url:'2do.php',
         data:'chkid='+ ids,
       });
 
     }
     
  

