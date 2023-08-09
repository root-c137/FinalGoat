<?php

namespace App\Controller\API;

use App\Entity\Player;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PlayerController extends AbstractController
{
    private $Doc = null;

    public function __construct(ManagerRegistry $Manager)
    {
        $this->Doc = $Manager;
    }

    #[Route('/api/player/{player}', name: 'player')]
    public function index(Request $Request): JsonResponse
    {
        $Player = strtolower($Request->get('player') );

        $PlayerRepo = $this->Doc->getRepository(Player::class);
        $Data = $PlayerRepo->findOneBy(['LastName' => $Player]);
        $DataArray = null;
        $Msg = "";
        $StatusCode = 200;

        if($Data)
        {
            $DataArray = [
                "FirstName" => $Data->getFirstName(),
                "LastName" => $Data->getLastName(),
                "Age" => $Data->getAge(),
                "Country" => $Data->getCountry(),
                "Size" => $Data->getSize(),
                "StrongFoot" => $Data->getStrongFoot(),
                "Votes" => count($Data->getVotes())
            ];
            $Msg = "le joueur ".$Data->getLastName()." a bien été récupéré";
        }
        else
        {
            $Msg = "Aucun joueur trouvé.";
            $StatusCode = 401;
        }

        return $this->json([
            "message" => $Msg,
            "code" => StatusCode,
            "data" => $DataArray
        ], $StatusCode);
    }
}

