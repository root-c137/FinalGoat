<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;


class CaptchaController extends AbstractController
{
    #[Route('/verify_captcha', name: 'verify_captcha')]
    public function VerifyCaptcha(Request $Request, HttpClientInterface $ClientInterface): Response
    {

        $UrlVerify = 'https://hcaptcha.com/siteverify';
        $SecretKey = $_ENV['CAPTCHA_PRIVATE'];

        $Data = $Request->toArray();
        $ResponseGoogle = $ClientInterface->request(
            'POST',
            $UrlVerify,
            [
                'body' => [
                    'secret' => $SecretKey,
                    'response' => $Data['h-captcha-response']
                ]
            ]
        );

        $Msg = 'Ok';
        $StatusCode = 200;
        $Content = $ResponseGoogle->toArray();

        if(!$Content['success'] )
        {
            $Msg = "Captcha fail";
            $StatusCode = 500;
        }

        return $this->json(['message' => 'Ok'], $StatusCode);

    }
}
