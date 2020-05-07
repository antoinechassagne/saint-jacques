<?php
namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\Spot;
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
        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();
        $spot = $em->getRepository(Spot::class)->find($request->query->get('spot'));

        $user->addFavoriteSpot($spot);
        
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

    /**
    * @Route("/api/users/remove-favorite-spot", name="remove_favorite_spot")
    */
    public function removeFavoriteSpot(Request $request) 
    {
        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();
        $spot = $em->getRepository(Spot::class)->find($request->query->get('spot'));

        $user->removeFavoriteSpot($spot);
        
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