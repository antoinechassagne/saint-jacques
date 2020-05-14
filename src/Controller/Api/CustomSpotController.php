<?php
namespace App\Controller\Api;

use App\Entity\Spot;
use App\Service\WeatherDataPuller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CustomSpotController extends AbstractController
{
    /**
     * @Route("api/spots/{id}", name="get_spot")
     */
    public function getSpot($id, SerializerInterface $serializer, WeatherDataPuller $weatherDataPuller)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();
        $spot = $em->getRepository(Spot::class)->find($id);

        // Serialize
        $result = json_decode($serializer->serialize($spot, "json"), JSON_UNESCAPED_SLASHES);

        // Add weather data to response
        $result['wavewatchData'] = $weatherDataPuller->pull(floatval($result['latitude']), floatval($result['longitude']), "wavewatch");
        $result['aromeData'] = $weatherDataPuller->pull(floatval($result['latitude']), floatval($result['longitude']), "arome");

        // Add flag to response
        $result['isFavorite'] = false;
        if ($user) {
            foreach ($result['users'] as $key => $value) {
                if ((int) basename($value) === $user->getId()) {
                    $result['isFavorite'] = true;
                    break;
                }
            }
        }

        // Remove users from response
        unset($result['users']);

        return new JsonResponse($result);
    }

    /**
     * @Route("api/search/spots", name="search_spots")
     */
    public function search(Request $request, SerializerInterface $serializer)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository(Spot::class);
        $term = $request->query->get('search');
        $results = $repository->search($term);

        $results = $serializer->serialize($results, "json");
        $results = json_decode(($results), JSON_UNESCAPED_SLASHES);

        return new JsonResponse($results);
    }
}
