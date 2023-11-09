<?php

namespace App\Repository;

use App\Entity\ApplyJob;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ApplyJob>
 *
 * @method ApplyJob|null find($id, $lockMode = null, $lockVersion = null)
 * @method ApplyJob|null findOneBy(array $criteria, array $orderBy = null)
 * @method ApplyJob[]    findAll()
 * @method ApplyJob[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ApplyJobRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ApplyJob::class);
    }

//    /**
//     * @return ApplyJob[] Returns an array of ApplyJob objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ApplyJob
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
