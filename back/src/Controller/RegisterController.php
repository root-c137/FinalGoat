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


class RegisterController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function index(Request $Request, EntityManagerInterface $Manager, UserPasswordHasherInterface $Encoder): JsonResponse
    {
        $Data = $Request->toArray();
        $Msg = "l'inscription a bien été effectué.";
        $StatusCode = 200;

        if(!empty($Data) && !empty($Data['Username']) && !empty($Data['Email'])
           && !empty($Data['Pass']) )
        {
            if(strlen($Data['Username']) >= 4 &&
            !preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $Data['Username']) )
            {
                if(!filter_var($Data['Email'], FILTER_VALIDATE_EMAIL) === false)
                {
                    $User = new User();
                    $PassHash = $Encoder->hashPassword($User, $Data['Pass'] );

                    $User->setUsername($Data['Username'] );
                    $User->setEmail($Data['Email']);
                    $User->setPassword($PassHash);

                    $Manager->persist($User);
                    $Manager->flush();
                }
                else
                {
                    $Msg = "l'adresse email n'est pas valide.";
                    $StatusCode = 400;
                }

            }
            else
            {
              $Msg = "Le nom d'utilisateur doit contenir au moins 4 caractères sans caractère special";
              $StatusCode = 400;
            }
        }
        else
        {
            $Msg = "Tous les champs doivent êtres renseignés.";
            $StatusCode = 400;
        }


        return $this->json([
            'message' => $Msg
        ], $StatusCode);
    }


}
