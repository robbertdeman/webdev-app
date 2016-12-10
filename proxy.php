<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Credentials: true");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  header('Access-Control-Max-Age: 1000');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

$arrContextOptions=array(
        "ssl"=>array(
                "verify_peer"=>false,
                "verify_peer_name"=>false
        )
);

// File Name: proxy.php
$api_key = 'bb4aca5ef7dbbdab6076b348c1fc0246';
$API_ENDPOINT = 'https://api.forecast.io/forecast/';
$url = $API_ENDPOINT . $api_key . '/';
if(!isset($_GET['url'])) die();
$url = $url . $_GET['url'];
$url = file_get_contents($url . '?lang=nl', false, stream_context_create($arrContextOptions));
print_r($url);