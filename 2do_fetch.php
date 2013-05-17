<?php
 include_once('db.php');

 if (isset($_GET["orden"])){
    if ($_GET["orden"] == 'pri') {
       $sql = "SELECT * FROM task ORDER BY priority DESC";
    } else if ($_GET["orden"] == 'dd') $sql = "SELECT * from task ORDER BY due_date";
    
 } else $sql = "SELECT * FROM task";

 $res = mysql_query($sql);
 $result = array();

 while ( $row = mysql_fetch_array($res) )
   array_push($result, array('id' => $row[0],
                             'desc' => $row[1],
                             'add_date' => $row[2],
                             'due_date' => $row[3],
                             'priority' => $row[4],
                             'status' => $row[5]));
   echo json_encode(array("result" => $result));
 

?>
