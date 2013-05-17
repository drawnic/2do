<?php

include_once('db.php');

$action=$_POST["accion"];
$task=$_POST["new_task"];
$dd=$_POST["due_date"];
$pri=$_POST["priority"];
$tskid=$_POST["taskid"];

$utask=$_POST["upd_new_task"];
$udd=$_POST["upd_due_date"];
$upri=$_POST["upd_priority"];

if (isset($_POST['chkid'])){

   $idchek=$_POST['chkid'];
   $result=mysql_query("SELECT status FROM task WHERE id='$idchek'");
   $result=mysql_fetch_array($result);
   $st=$result['status'];
   
   if ($st == '0') {
       mysql_query("UPDATE task set status='1' WHERE id='$idchek'");
   }else if ($st == '1') {
       mysql_query("UPDATE task set status='0' WHERE id='$idchek'");
   } 

}

if (isset($_POST["idsarray"])) {
   $action = 'eliminar';
   $ids = explode(',', $_POST["idsarray"]);
}

if ($action == 'insertar') {

   if (mysql_query("INSERT INTO task(description,due_date,priority) VALUES ('$task','$dd','$pri')"))
       echo "task inserted";
   else
       echo "something is wrong: task not inserted";

} 

if ($action == 'actualizar' ) {

   if (mysql_query("UPDATE task set description='$utask', due_date='$udd', priority='$upri' WHERE id='$tskid'"))
       echo "something is wrong: task not updated";
   else
       echo "task updated";
} 

if ($action == 'eliminar') {

   for ($i=0;$i < count($ids);$i++) {
      if (mysql_query("DELETE FROM task WHERE id = '$ids[$i]'"))
             $band = true;   
      else
             echo "something is wrong: task not deleted";
   }
   if ($band) echo "task deleted";

} 

?>
