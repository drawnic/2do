+-------------+-----------------+------+-----+-------------------+----------------+
| Field       | Type            | Null | Key | Default           | Extra          |
+-------------+-----------------+------+-----+-------------------+----------------+
| id          | int(8) unsigned | NO   | PRI | NULL              | auto_increment |
| description | varchar(500)    | NO   |     |                   |                |
| add_date    | timestamp       | NO   |     | CURRENT_TIMESTAMP |                |
| due_date    | date            | NO   |     | NULL              |                |
| priority    | int(8) unsigned | YES  |     | NULL              |                |
| status      | varchar(1)      | YES  |     | NULL              |                |
+-------------+-----------------+------+-----+-------------------+----------------+


