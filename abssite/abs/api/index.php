<?php
    //$url = ($_POST['url']) ? $_POST['url'] : $_GET['url'];
    $url=array_keys($_GET);
    $url=$url[0];
    $endpoints = array(
        'http://shcore.mm-one.com.stg',
        'http://shcore.mm-one.com.local'
    );

    $curEndPoint=1;
    $url=$endpoints[$curEndPoint] .$url;

    //$headers = ($_POST['headers']) ? $_POST['headers'] : $_GET['headers'];
    $headers="true";
    $mimeType="";
    //$mimeType =($_POST['mimeType']) ? $_POST['mimeType'] : $_GET['mimeType'];
    //Start the Curl session
    $session = curl_init($url);
    // If it's a POST, put the POST data in the body
    if ( isset($_POST['url'])) {
        $postvars = '';
        while ($element = current($_POST)) {
            $postvars .= key($_POST).'='.$element.'&';
            next($_POST);
        }
        curl_setopt($session, CURLOPT_POST, true);
        curl_setopt($session, CURLOPT_POSTFIELDS, $postvars);
    }
    // Don't return HTTP headers. Do return the contents of the call
    curl_setopt($session, CURLOPT_HEADER, ($headers == "true") ? true : false);
    curl_setopt($session, CURLOPT_FOLLOWLOCATION, true);
    //curl_setopt($ch, CURLOPT_TIMEOUT, 4);
    curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    // Make the call
    $response = curl_exec($session);
    if ($mimeType != "") {
        // The web service returns XML. Set the Content-Type appropriately
        header("Content-Type: ".$mimeType);
    }

    list($response_headers, $response_content) = preg_split( '/(\r\n){2}/', $response, 2 );

    $headers = array();

    foreach( $response_headers as $header ){
        if( preg_match('/^(.*?)\\:\\s+(.*?)$/m', $header, $header_parts) ){
            $headers[$header_parts[1]] = $header_parts[2];
        }
    }
    print_r($response_headers);
    echo $response_content;
    curl_close($session);


