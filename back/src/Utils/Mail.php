<?php

namespace App\Utils;


use Mailjet\Client;
use Mailjet\Resources;

class Mail
{
    private $Api_Key = '191b655320e823bb286d71df7fc78190';
    private $Api_Key_Secret = '8b2c54b0f1ed428584a8005239031ca6';


    public function send($to_mail, $Code)
    {
        $mj  = new Client($this->Api_Key, $this->Api_Key_Secret, true,['version' => 'v3.1']);
        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "hellot@finalgoat.com",
                        'Name' => "finalgoat.com"
                    ],
                    'To' => [
                        [
                            'Email' => $to_mail,
                            'Name' => "passenger 1"
                        ]
                    ],
                    'TemplateID' => 5011113,
                    'TemplateLanguage' => true,
                    'Subject' => "Reset your password",
                    'Variables' => [
                        "Code"=> $Code
                    ]
                ]
            ]
        ];

        $response = $mj->post(Resources::$Email, ['body' => $body]);
        return $response->success();
    }
}
