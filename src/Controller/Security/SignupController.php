<?php

namespace App\Controller\Security;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SignupController extends AbstractController
{
    /**
     * @Route("api/signup", name="api_signup")
     */
    public function signup(Request $request, UserPasswordEncoderInterface $passwordEncoder): JsonResponse
    {
        if ($request->getMethod() === "POST") {
            $body = json_decode($request->getContent());
            
            $user = new User();
            $user->setEmail($body->email);
            $user->setPassword($passwordEncoder->encodePassword($user, $body->password));

            try {
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($user);
                $entityManager->flush();

                $response = new JsonResponse();
                $response->setStatusCode(JsonResponse::HTTP_CREATED);
                return $response;
            } catch (\Exception $e) 
            {
                $response = new JsonResponse($e);
                $response->setStatusCode(JsonResponse::HTTP_BAD_REQUEST);
                return $response;
            }
        }
    }
}