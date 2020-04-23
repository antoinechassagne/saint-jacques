<?php
namespace App\Controller\Api;

use App\Entity\Spot;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class SearchSpotController extends AbstractController
{
    /**
    * @Route("api/spots/search", name="search_spots")
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