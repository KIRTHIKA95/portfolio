<?php
function pdo_connect_mysql() {
    // The below variables should reflect your MySQL credentials
    $DATABASE_HOST = 'mysql-aimemihi.alwaysdata.net';
    $DATABASE_USER = 'aimemihi_sql';
    $DATABASE_PASS = '';
    $DATABASE_NAME = 'aimemihi_sae';
    try {
        // Connect to MySQL using the PDO extension
    	return new PDO('mysql:host=' . $DATABASE_HOST . ';dbname=' . $DATABASE_NAME . ';charset=utf8', $DATABASE_USER, $DATABASE_PASS);
    } catch (PDOException $exception) {
    	// If there is an error with the connection, stop the script and output the error.
    	exit('Failed to connect to database!');
    }
}

// Template header; feel free to customize it, but do not indent the PHP code or it will throw an error
function template_header($title) {
    echo <<<EOT
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>SAE BUT1</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="stylesheet" href="style.css">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik+Dirt&display=swap" rel="stylesheet">
        </head>
       <body>
            <header>
              <h1>SAE S1 2024/2025</h1>
            
            </header>
    EOT;
    }

    // Template footer
function template_footer() {
    echo <<<EOT
    <footer>
    <img src="IUT.svg"> 
    </footer>    
    </body>
    </html>
    EOT;
    }
    ?>