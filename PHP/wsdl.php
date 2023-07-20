<?php
require __DIR__ . '/../vendor/autoload.php';

// use Laminas\Soap\AutoDiscover;
// use Laminas\Soap\Wsdl;

// require_once './weatherapi.php';

// $soapClass = WeatherAPI::class;
// $uri = 'http://example.com/soap-server';

// $autoDiscover = new AutoDiscover();
// $autoDiscover->setClass($soapClass);
// $autoDiscover->setUri($uri);
// $autoDiscover->setServiceName('WeatherAPI');

// $wsdl = $autoDiscover->generate();

// // Set additional options for the WSDL document

// /* 
// $options = [
//     'cache_wsdl' => WSDL_CACHE_NONE,
//     'classmap' => [],
// ];

// $wsdl->setOptions($options);
// */

// $wsdlContent = $wsdl->toXml();

// header('Content-Type: application/xml');
// echo $wsdlContent;

use Laminas\Soap\AutoDiscover;

// Kreiranje objekta SoapClient s WSDL dokumentom
$options = [
    'trace' => true, // Omogućava praćenje SOAP poruka u svrhu debugiranja
];
$client = new SoapClient('http://www.dneonline.com/calculator.asmx?WSDL', $options);

// Postavljanje parametara za SOAP zahtjev
$city = 'Zagreb';
$parameters = [
    'city' => $city,
];

try {
    //Pozivanje operacije "getWeather" na web servisu
    $response = $client->Subtract(2,3);

    // // Dohvaćanje rezultata iz odgovora
    // $temperature = $response->temperature;
    // $humidity = $response->humidity;

    // // Ispis rezultata
    // echo "Weather for $city: Temperature - $temperature, Humidity - $humidity";
} catch (\SoapFault $e) {
    // Uhvatiti SOAP greške
    echo 'SOAP Error: ' . $e->getMessage();
}
?>  