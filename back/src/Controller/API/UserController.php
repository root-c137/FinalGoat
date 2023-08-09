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
        $V = $this->getUser()->getVote();
        if($V)
            $V = $V->getPlayer()->getLastName();

        $Data = [
            "Username" => $this->getUser()->getUsername(),
            "Email" => $this->getUser()->getEmail(),
            "Vote" => $V
            ];

        return $this->json([
            'data' => $Data
        ]);
    }
}
