<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SignUpController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    public function __invoke(Request $request, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $requestContent = json_decode($request->getContent(), true);

        if (!array_key_exists('email', $requestContent) || !array_key_exists('password', $requestContent)) {
            return new JsonResponse(['message' => 'Email et mot de passe requis'], Response::HTTP_BAD_REQUEST);
        }

        $userEmail = $requestContent['email'];
        $userPassword = $requestContent['password'];

        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);

        if ($registeredUser) {
            return new JsonResponse(['message' => 'Adresse email déjà enregistrée'], Response::HTTP_CONFLICT);
        }

        $newUser = new User();
        $newUser->setEmail($userEmail);
        $newUser->setPassword($this->passwordHasher->hashPassword($newUser, $userPassword));
        $this->entityManager->persist($newUser);
        $this->entityManager->flush();

        $token = $JWTManager->create($newUser);

        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }
}
