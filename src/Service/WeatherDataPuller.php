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
     * @param string $model The data model (see API docs). Can be "wavewatch" or 'arome".
     * @return
     */
    public function pull(float $latitude, float $longitude, $model)
    {
        $body = [
            "lat" => $latitude,
            "lon" => $longitude,
            "model" => $model,
            "parameters" => $model == "wavewatch" ? ["waves"] : ["temp", "wind"],
            "levels" => ["surface"],
            "key" => $this->apiKey,
        ];

        $response = $this->client->request('POST', $this->apiUrl, ['json' => $body]);
        $status = $response->getStatusCode();

        if ($status !== 200) {
            return null;
        }

        return $response->toArray();
    }
}
