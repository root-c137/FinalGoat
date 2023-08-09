<?php

namespace App\Controller\API;

use App\Entity\Reset;
use App\Entity\User;
use App\Utils\Mail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class ResetController extends AbstractController
{
    #[Route('/reset/code', name: 'app_a_p_i_reset')]
    public function index(Request $Request, EntityManagerInterface $Manager): JsonResponse
    {
        $Msg = "Ok";
        $StatusCode = 200;
        $Data = $Request->toArray();
        $Code = [];

        if(isset($Data['Email']) )
        {
            $RepUser = $Manager->getRepository(User::class);
            $User = $RepUser->findOneBy(['Email' => $Data['Email'] ]);
            if($User)
            {

                $RepReset = $Manager->getRepository(Reset::class);
                $OldReset = $RepReset->findOneBy(['Email' => $Data['Email'] ]);

                for($i = 0; $i < 6; $i++)
                {
                    $N = rand(0, 9);
                    array_push($Code, $N);
                }

                if(!$OldReset)
                {
                    $Reset = new Reset();
                    $Reset->setEmail($Data['Email'] );
                    $Reset->setCode(implode($Code) );
                    $Reset->setAttempt(0);
                    $Reset->setCreatedAt(new \DateTimeImmutable() );
                    $Manager->persist($Reset);
                }
                else {
                    $OldReset->setCode(implode($Code));
                    $OldReset->setCreatedAt(new \DateTimeImmutable() );
                    $OldReset->setAttempt(0);
                }

                $Manager->flush();

                $Mail = new Mail();
                $Mail->send($Data['Email'], implode($Code));
            }
            else
            {
                $Msg = "User not found";
                $StatusCode = 404;
            }

        }
        else
        {
            $Msg = "Enter your e-mail adress";
            $StatusCode = 400;
        }

        return $this->json([
            'message' => $Msg,
            'data' => implode("", $Code),
        ], $StatusCode);
    }

    #[Route('/reset/codeverif', name: 'verifcode')]
    public function verif(Request $Request, EntityManagerInterface $Manager): JsonResponse
    {
        $Msg = "Ok";
        $StatusCode = 200;
        $Data = $Request->toArray();

        if(isset($Data['Code']) && isset($Data['Email']) )
        {
            $RepReset = $Manager->getRepository(Reset::class);
            $Reset = $RepReset->findOneBy(['Email' => $Data['Email'] ]);

            if($Reset)
            {
                if($Data['Code'] === $Reset->getCode() )
                {
                    $Manager->remove($Reset);
                    $Manager->flush();
                }
                else
                {
                    $Msg = "Invalid code.";
                    $StatusCode = 500;
                    $Reset->setAttempt($Reset->getAttempt() + 1);
                    $Manager->flush();
                }

            }
            else
            {
                $Msg = "Bad request.";
                $StatusCode = 500;
            }
        }
        else
        {
            $Msg = "the code and or the email address is invalid";
            $StatusCode = 400;
        }

        return $this->json([
            'message' => $Msg
        ], $StatusCode);
    }

    #[Route('/reset/resetpassword', name: 'ResetPass')]
    public function ResetPassword(Request $Request, EntityManagerInterface $Manager, UserPasswordHasherInterface $Encoder): JsonResponse
    {
        $Data = $Request->toArray();
        $Msg = "Ok";
        $StatusCode = 200;

        if(isset($Data['PassOne']) && isset($Data['PassTwo']) && isset($Data['Email']) )
        {
            $CheckPass = $Data['PassOne'] === $Data['PassTwo'];
            if($CheckPass)
            {
                $RepUser = $Manager->getRepository(User::class);
                $User = $RepUser->findOneBy(['Email' => $Data['Email'] ]);

                if($User)
                {
                    $PassHash = $Encoder->hashPassword($User, $Data['PassOne']);
                    $User->setPassword($PassHash);
                    $Manager->flush();
                }
                else
                {
                    $Msg = "User not found.";
                    $StatusCode = 404;
                }

            }
            else
            {
                $Msg = "Enter a new password (the 2 fields must be identical).";
                $StatusCode = 400;
            }
        }
        else
        {
            $Msg = "Enter a new password (the 2 fields must be identical).";
            $StatusCode = 400;
        }

        return $this->json([
            'message' => $Msg
        ], $StatusCode);
    }
}
