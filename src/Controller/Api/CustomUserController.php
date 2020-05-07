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
    * @Route("api/users/{id}/add-favorite-spot", name="add_favorite_spot")
    */
    public function addFavoriteSpot($id, User $user, Request $request) 
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find($id);
        $spot = $em->getRepository(Spot::class)->find($request->query->get('spot'));
        $user->addFavoriteSpot($spot);

        try {
            $em->persist($user);
            $em->flush();

            $response = new JsonResponse();
            $response->setStatusCode(JsonResponse::HTTP_OK);
            return $response;
        } catch (\Exception $e) {
            dump($e); die;
            $response = new JsonResponse($e);
            $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
            return $response;
        }
    }
}