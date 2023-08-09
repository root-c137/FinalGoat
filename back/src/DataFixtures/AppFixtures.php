<?php

namespace App\DataFixtures;

use App\Entity\Player;
use App\Entity\User;
use App\Entity\Vote;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $Player1 = new Player();
        $Player1->setLastName("Messi");
        $Player1->setFirstName("Lionel");
        $Player1->setAge(36);
        $Player1->setSize(170);
        $Player1->setCountry("Argentina");
        $Player1->setStrongFoot("Left");

        $manager->persist($Player1);

        $Player2 = new Player();
        $Player2->setLastName("Ronaldo");
        $Player2->setFirstName("Cristiano");
        $Player2->setAge(38);
        $Player2->setSize(182);
        $Player2->setCountry("Portugal");
        $Player2->setStrongFoot("Right");


        $manager->persist($Player2);
        $manager->flush();
    }
}
