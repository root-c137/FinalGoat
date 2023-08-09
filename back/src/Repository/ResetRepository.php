<?php

namespace App\Repository;

use App\Entity\Reset;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Reset>
 *
 * @method Reset|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reset|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reset[]    findAll()
 * @method Reset[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reset::class);
    }

//    /**
//     * @return Reset[] Returns an array of Reset objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Reset
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
