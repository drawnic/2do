2do web app
===========

This is a to-do web app, that uses Jquery, JqueryUI, AJAX, CSS, PHP, HTML and CSS.

What it does?:

- Add a task with a priority number and a due date.
- Edit a task, changing the name or mofifying the priority number or the expiration date.
- Mark a task as completed.
- Delete selected tasks.
- Order by due date or by priority.
- You can use it as an REST API following the example described below.

All actions updates the database using AJAX or JSON in some cases... I'll give it a few last touches when I have time.

you can watch it working at: http://2do.dev4.webenabled.net/2do.html

-------------------
How to make it work
-------------------

This was requested as an interview test for a company, feel free to use the code in every way you want...

To use it, just change the information of the database file "db.php", and create a table (this app uses 
a table named "task") following the structure showed in the file "database.sch". 
Or just do: 

CREATE TABLE task (
  id int(8) unsigned NOT NULL auto_increment,
  description varchar(500) collate utf8_unicode_ci NOT NULL default '',
  add_date timestamp NOT NULL default CURRENT_TIMESTAMP,
  due_date date NOT NULL,
  priority int(8) unsigned,
  status varchar(1),
  PRIMARY KEY (id)
);


-------
API use
-------

INSERT TASK:

curl -v -X POST 'http://2do.dev4.webenabled.net/2do.php' -d 'accion=insertar' -d 'new_task=jane street' -d 'priority=10';

UPDATE TASK:

curl -v -X POST 'http://2do.dev4.webenabled.net/2do.php' -d 'accion=actualizar' -d 'upd_new_task=jane street upd' -d 'priority=9' -d 'taskid=87';

DELETE TASK:
curl -v -X POST 'http://2do.dev4.webenabled.net/2do.php' -d 'accion=eliminar' -d 'idsarray=86,87'

LIST TASKS:
curl -v -X GET 'http://2do.dev4.webenabled.net/2do_fetch.php' -d 'orden=pri'
curl -v -X GET 'http://2do.dev4.webenabled.net/2do_fetch.php' -d 'orden=dd'
curl -v -X GET 'http://2do.dev4.webenabled.net/2do_fetch.php'


=========================================

created by Nico Mengual - www.drawnic.com
