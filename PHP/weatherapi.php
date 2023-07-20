<?php

require __DIR__ . '/../vendor/autoload.php';
use GuzzleHttp\Client;

class WeatherAPI
{
    /**
     * @param string $location
     * @return string
     */
    public function getWeatherByLocation($location)
    {
        $httpClient = new Client();

        try{
            // Slanje GET zahtjeva na vanjski API
            $apiResponse = $httpClient->get('https://api.weatherapi.com/v1/current.json?key=082b8f15883d489ea47202636232206&q='.$location);
                    
            // Dohvaćanje tijela odgovora
            $apiResponseBody = $apiResponse->getBody()->getContents();
            return $apiResponseBody;

        }catch(\Exception $e){
            //print_r($e);
            // return $e->getMessage();
            return "No matching location found";
        }
    }
}