<?php

namespace App\Controller\API;

use App\Entity\Vote;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class VoteController extends AbstractController
{
    private $Doc = null;

    public function __construct(ManagerRegistry $Manager)
    {
        $this->Doc = $Manager;
    }

    #[Route('/api/vote', name: 'vote')]
    public function index(): JsonResponse
    {

        $Data = $this->getUser()->getVote();
        $Msg = "Le vote actuel a bien été récupéré";
        $StatusCode = 200;


        return $this->json([
            'message' => $Msg,
            'data' => $Data->getFirstName()." ".$Data->getLastName()
        ], $StatusCode);
    }

    #[Route('/api/votes', name: 'votes')]
    public function Votes(): JsonResponse
    {

        $VoteRepo = $this->Doc->getRepository(Vote::class);
        $Votes = $VoteRepo->findAll();
        $Data = count($Votes);

        return $this->json([
            'message' => "le nombre total des votes a bien été récupéré.",
            'data' => $Data
        ]);
    }
}
