<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231113124556 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE apply_job (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, job_id INT DEFAULT NULL, name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, about LONGTEXT NOT NULL, cv VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, INDEX IDX_F12AAB73A76ED395 (user_id), INDEX IDX_F12AAB73BE04EA9 (job_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bookmark (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, job_id INT DEFAULT NULL, INDEX IDX_DA62921DA76ED395 (user_id), INDEX IDX_DA62921DBE04EA9 (job_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE job (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, title VARCHAR(50) NOT NULL, description VARCHAR(255) NOT NULL, salary NUMERIC(10, 2) NOT NULL, company VARCHAR(50) NOT NULL, email VARCHAR(80) NOT NULL, job_category VARCHAR(50) NOT NULL, job_type VARCHAR(50) NOT NULL, job_experience VARCHAR(255) NOT NULL, job_vacancy INT NOT NULL, job_deadline DATE NOT NULL, INDEX IDX_FBD8E0F8A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE apply_job ADD CONSTRAINT FK_F12AAB73A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE apply_job ADD CONSTRAINT FK_F12AAB73BE04EA9 FOREIGN KEY (job_id) REFERENCES job (id)');
        $this->addSql('ALTER TABLE bookmark ADD CONSTRAINT FK_DA62921DA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE bookmark ADD CONSTRAINT FK_DA62921DBE04EA9 FOREIGN KEY (job_id) REFERENCES job (id)');
        $this->addSql('ALTER TABLE job ADD CONSTRAINT FK_FBD8E0F8A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE apply_job DROP FOREIGN KEY FK_F12AAB73A76ED395');
        $this->addSql('ALTER TABLE apply_job DROP FOREIGN KEY FK_F12AAB73BE04EA9');
        $this->addSql('ALTER TABLE bookmark DROP FOREIGN KEY FK_DA62921DA76ED395');
        $this->addSql('ALTER TABLE bookmark DROP FOREIGN KEY FK_DA62921DBE04EA9');
        $this->addSql('ALTER TABLE job DROP FOREIGN KEY FK_FBD8E0F8A76ED395');
        $this->addSql('DROP TABLE apply_job');
        $this->addSql('DROP TABLE bookmark');
        $this->addSql('DROP TABLE job');
    }
}
