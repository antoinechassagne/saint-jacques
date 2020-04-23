<?php

namespace App\Repository;

use App\Entity\Spot;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Spot|null find($id, $lockMode = null, $lockVersion = null)
 * @method Spot|null findOneBy(array $criteria, array $orderBy = null)
 * @method Spot[]    findAll()
 * @method Spot[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SpotRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Spot::class);
    }

    /**
     * Search a spot by name
     *
     * @param String $term
     * @return Spot[] Returns an array of Spot objects
     */
    public function search(String $term)
    {
        return $this->createQueryBuilder('s')
                ->andWhere('s.name LIKE :term')
                ->setParameter('term', '%' . $term . '%')
                ->getQuery()
                ->execute();
    }
}
