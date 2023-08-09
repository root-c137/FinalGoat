<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints as Assert;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;



class RegisterController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function index(Request $Request, EntityManagerInterface $Manager, UserPasswordHasherInterface $Encoder,
                          JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $Data = $Request->toArray();
        $Msg = "Registration was successful !";
        $StatusCode = 200;
        $Token = null;

        if(!empty($Data) && !empty($Data['Username']) && !empty($Data['Email'])
           && !empty($Data['Pass']) )
        {

            if(strlen($Data['Username']) >= 4 &&
            !preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $Data['Username']) )
            {
                $User = $Manager->getRepository(User::class)->findOneBy(['username' => $Data['Username'] ]);
                $Email = $Manager->getRepository(User::class)->findOneBy(['Email' => $Data['Email'] ]);

                if(!$User)
                {
                    if (!filter_var($Data['Email'], FILTER_VALIDATE_EMAIL) === false)
                    {
                        if(!$Email)
                        {
                            $User = new User();
                            $PassHash = $Encoder->hashPassword($User, $Data['Pass']);

                            $User->setUsername($Data['Username']);
                            $User->setEmail($Data['Email']);
                            $User->setPassword($PassHash);

                            $Manager->persist($User);
                            $Manager->flush();
                            $Token = $JWTManager->create($User);
                        }
                        else
                        {
                            $Msg = "An account already exists with this email address.";
                            $StatusCode = 400;
                        }
                    } else {
                        $Msg = "Ehe email address is not valid";
                        $StatusCode = 400;
                    }
                }
                else
                {
                    $Msg = "This username is already taken.";
                    $StatusCode = 400;
                }

            }
            else
            {
              $Msg = "Username must contain at least 4 characters without special character.";
              $StatusCode = 400;
            }
        }
        else
        {
            $Msg = "All fields must be filled in.";
            $StatusCode = 400;
        }


        return $this->json(['message' => $Msg, 'token' => $Token], $StatusCode);
    }


}
