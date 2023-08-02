<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230802163432 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP INDEX UNIQ_8D93D64972DCDAFC, ADD INDEX IDX_8D93D64972DCDAFC (vote_id)');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64972DCDAFC');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64972DCDAFC FOREIGN KEY (vote_id) REFERENCES player (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP INDEX IDX_8D93D64972DCDAFC, ADD UNIQUE INDEX UNIQ_8D93D64972DCDAFC (vote_id)');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64972DCDAFC');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64972DCDAFC FOREIGN KEY (vote_id) REFERENCES vote (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
