<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;

class WeatherDataPuller
{
    private $apiUrl;
    private $apiKey;
    private $client;

    public function __construct(string $apiUrl, string $apiKey) 
    {
        $this->apiUrl = $apiUrl;
        $this->apiKey = $apiKey;
        $this->client = HttpClient::create();
    }

    /**
     * Pull weather data
     *
     * @param float $latitude
     * @param float $longitude
     * @return 
     */
    public function pull(float $latitude, float $longitude)
    {
        $body = [
            "lat" => $latitude,
            "lon" => $longitude,
            "model" => "gfs",
            "parameters" => ["wind", "dewpoint", "rh", "pressure"],
            "levels" => ["surface", "800h", "300h"],
            "key" => $this->apiKey
        ];

        $response = $this->client->request('POST', $this->apiUrl, ['json' => $body]);
        $status = $response->getStatusCode();
        
        if ($status !== 200) {
            return null;
        }

        return $response->toArray(); 
    }
}