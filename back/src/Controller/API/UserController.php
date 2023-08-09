<?php

namespace App\Controller\API;

use Doctrine\ORM\EntityManagerInterface;
use http\Env\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/user', name: 'app_a_p_i_user')]
    public function index(EntityManagerInterface $Manager): JsonResponse
    {
        $Data = [
            "Username" => $this->getUser()->getUsername(),
            "Email" => $this->getUser()->getEmail(),
            "Vote" => $this->getUser()->getVote()->getPlayer()->getLastName()
            ];
        
        return $this->json([
            'data' => $Data
        ]);
    }
}
