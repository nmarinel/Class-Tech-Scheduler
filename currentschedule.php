   <?php
   ini_set('display_errors', 'On');
    error_reporting(E_ALL);
    $d = $_GET["d"]; //get the date.  hopefully the format transfers nicely
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

    $query = "SELECT * FROM shifts WHERE s_date BETWEEN '".$d."' AND '".$d."' + INTERVAL 7 DAY;";
    if ($result = $db->query($query)) { 
        //store each row in an array, $data
        $i=0; 
        while ($row = $result->fetch_assoc()){
            //here I should add a "column" to the row that codes for the day.. or I could do it in JS
            $data[$i] = $row;
            $i++;
        }
        $result->free();
    }
    $db->close();

    echo json_encode($data);
    ?>

