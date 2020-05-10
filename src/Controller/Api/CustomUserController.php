<?php
namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Spot;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class CustomUserController extends AbstractController
{
    /**
    * @Route("/api/users/add-favorite-spot", name="add_favorite_spot")
    */
    public function addFavoriteSpot(Request $request) 
    {
        return $this->toggleFavoriteSpot($request, true);
    }

    /**
    * @Route("/api/users/remove-favorite-spot", name="remove_favorite_spot")
    */
    public function removeFavoriteSpot(Request $request) 
    {
        return $this->toggleFavoriteSpot($request, false);
    }

    /**
     * Add/Remove a favorite spot
     *
     * @param Request $request
     * @param Boolean $add If set to true, the favorite spot will be add, otherwise it will be remove
     * @return void
     */
    private function toggleFavoriteSpot(Request $request, bool $add) {
        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();
        $spot = $em->getRepository(Spot::class)->find($request->query->get('spot'));

        if ($add) {
            $user->addFavoriteSpot($spot);
        } else {
            $user->removeFavoriteSpot($spot);
        }
        
        try {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $response = new JsonResponse();
            $response->setStatusCode(JsonResponse::HTTP_OK);
            return $response;
        } catch (\Exception $e) {
            $response = new JsonResponse($e);
            $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
            return $response;
        }
    }
}