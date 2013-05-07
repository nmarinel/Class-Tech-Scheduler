<?php
$con=mysqli_connect("localhost","root","viper99","classtech");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="INSERT INTO tradeshifts (name, date, time)
VALUES
('$_POST[fName]','$_POST[fDate]','$_POST[fTime]')";

if (!mysqli_query($con,$sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo '1 record added<br /> <a href="tradeshift.html">Back</a>';

mysqli_close($con);
?>