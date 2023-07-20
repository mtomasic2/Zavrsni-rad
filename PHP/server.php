<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ .'./weatherapi.php';

// Instantiate App
$app = AppFactory::create();

// Add error middleware
$app->addErrorMiddleware(true, true, true);

// Add routes
$app->get('/wsdl', function ($request, $response, $args) {
    require '/wsdl.php';
    return $response;
});

$app->get('/', function (Request $request, Response $response, array $args) {
    $response->getBody()->write(file_get_contents(__DIR__ . '/index.php'));
    return $response;
});

$app->get('/weather', function (Request $request, Response $response) {
    $queryParams = $request->getQueryParams();
    $location = $queryParams['location'] ?? '';
    $weatherAPI = new WeatherAPI();
    header('Content-Type: application/json');
    $response->getBody()->write($weatherAPI->getWeatherByLocation($location));
    return $response;
});

$app->get('/weather/{name}', function (Request $request, Response $response) {
    $location = $request->getAttribute('name');
    $weatherAPI = new WeatherAPI();
    header('Content-Type: application/json');
    $response->getBody()->write($weatherAPI->getWeatherByLocation($location));
    return $response;
});

$app->run();