<?php

namespace App\Controller\API;

use App\Entity\Player;
use App\Entity\Vote;
use App\Utils\FormateDate;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class VoteController extends AbstractController
{
    private $Doc = null;

    public function __construct(ManagerRegistry $Manager)
    {
        $this->Doc = $Manager;
    }

    #[Route('/api/vote', name: 'vote')]
    public function index(Request $Request, EntityManagerInterface $Manager): JsonResponse
    {
        $Msg = "Ok";
        $StatusCode = 201;
        $Data = $Request->toArray();


        if(isset($Data['Player']) )
        {

                $RepPlayer = $Manager->getRepository(Player::class);
                $Player = $RepPlayer->findOneBy(['LastName' => $Data['Player'] ]);

                if($Player)
                {
                    if($this->getUser()->getVote())
                    {
                        if($Data['Player'] === $this->getUser()->getVote()->getPlayer()->getLastname() )
                        {
                            $Msg = "The current vote is the same as the new vote";
                            $StatusCode = 500;
                        }
                        else
                        {
                            $this->getUser()->getVote()->setPlayer($Player);
                            $this->getUser()->getVote()->setUpdatedAt(new \DateTimeImmutable());
                        }
                    }
                    else
                    {
                        $Vote = new Vote();
                        $Vote->setPlayer($Player);
                        $Vote->setUser($this->getUser());
                        $Vote->setCreatedAt(new \DateTimeImmutable());
                        $Vote->setUpdatedAt($Vote->getCreatedAt());
                        $Manager->persist($Vote);
                    }

                    $Manager->flush();
                }
                else
                {
                    $StatusCode = 400;
                    $Msg = "Bad request";
                }

        }
        else
        {
            $StatusCode = 400;
            $Msg = "Bad request";
        }



        return $this->json([
            'message' => $Msg
        ], $StatusCode);
    }

    #[Route('/votes', name: 'votes')]
    public function Votes(): JsonResponse
    {

        $StatusCode = 200;
        $VoteRepo = $this->Doc->getRepository(Vote::class);
        $Votes = $VoteRepo->findAll();
        $Data = count($Votes);


        return $this->json([
            'data' => $Data
        ], $StatusCode);
    }

    #[Route('/lastvotes', name: 'lastvotes')]
    public function LastVotes(): JsonResponse
    {

        $StatusCode = 200;
        $Msg = "Ok";
        $VoteRepo = $this->Doc->getRepository(Vote::class);
        $Votes = $VoteRepo->findBy([], ['UpdatedAt' => 'DESC'], 10, 0);

        $VotesArray = [];
        foreach($Votes as $K => $V)
        {
            $UpdateOrFirst = "UPDATE";

            if($V->getUpdatedAt()->format("U") === $V->getCreatedAt()->format("U"))
                $UpdateOrFirst = "FIRST";

            $CreatedAtDateTime = $V->getCreatedAt();
            if($UpdateOrFirst === "UPDATE");
            $CreatedAtDateTime = $V->getUpdatedAt();

            $Now = new \DateTimeImmutable();
            $CreatedAtInSecondsFormat = $Now->format('U') - $CreatedAtDateTime->format('U');

            $FormateDate = new FormateDate();
            $CreatedAt = $FormateDate->FormateCreatedAt($CreatedAtInSecondsFormat);

            $VotesArray[] = [
                "Username" => $V->getUser() === null ? "" : $V->getUser()->getUsername(),
                "Vote" => $V->getPlayer()->getLastname(),
                "CreatedAt" => $CreatedAt,
                "UpdateOrFirst" => $UpdateOrFirst
            ];
        }

        return $this->json([
            'data' => $VotesArray,
            'message' => $Msg
        ], $StatusCode);
    }




}
