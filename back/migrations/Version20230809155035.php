<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230809155035 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reset DROP FOREIGN KEY FK_509DBF4DA76ED395');
        $this->addSql('DROP INDEX UNIQ_509DBF4DA76ED395 ON reset');
        $this->addSql('ALTER TABLE reset DROP user_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reset ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE reset ADD CONSTRAINT FK_509DBF4DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_509DBF4DA76ED395 ON reset (user_id)');
    }
}
