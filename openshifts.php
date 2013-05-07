<?php
    $data = array(); // to be the output

    $hostname = "localhost";
    $mysqluser = "root";
    $mysqlpassword = "viper99";
    $db_name = "classtech";
    $db = new mysqli($hostname, $mysqluser, $mysqlpassword, $db_name);
    /* check connection */
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }

    $query = "SELECT * FROM tradeshifts ;";
    if ($result = $db->query($query)) { 
        //store each row in an array, $data
        $i=0; 
        while ($row = $result->fetch_assoc()){
            $data[$i] = $row;
            $i++;
        }
        $result->free();
    }
    $db->close();

    echo json_encode($data);
    ?>

