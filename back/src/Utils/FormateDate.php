<?php

namespace App\Utils;

class FormateDate
{

    public function FormateCreatedAt($Seconds)
    {
        $ValReturn = $this->addS("second", $Seconds);

        $hours = floor($Seconds / 3600);
        $minutes = floor(($Seconds / 60) % 60);
        $seconds = $Seconds % 60;
        $jours = floor(($hours / 24) );
        $mois = floor(($jours / 30) );
        $annees = floor( ($mois / 12) );

        if($hours > 0 && $hours < 24)
            $ValReturn = $this->addS("hour", $hours);
        else if($hours == 0 && $minutes > 0 )
            $ValReturn = $this->addS("minute", $minutes);
        else if($hours >= 24 && $jours < 30)
            $ValReturn = $this->addS("day", $jours);
        else if($jours >= 30 && $mois < 12)
            $ValReturn = $this->addS("month", $mois);
        else if($mois >= 12)
            $ValReturn = $this->addS("year", $annees);

        return $ValReturn;
    }

    private function addS($Txt, $Val)
    {
        $T = $Val.' '.$Txt;

        if($Val > 1)
            $T = $Val.' '.$Txt."s";

        return $T;
    }
}