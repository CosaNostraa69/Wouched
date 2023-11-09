<?php

namespace App\Entity;

use App\Repository\JobRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: JobRepository::class)]
class Job
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $salary = null;

    #[ORM\Column(length: 80)]
    private ?string $company = null;

    #[ORM\Column(length: 80)]
    private ?string $email = null;

    #[ORM\Column(length: 50)]
    private ?string $job_category = null;

    #[ORM\Column(length: 50)]
    private ?string $job_type = null;

    #[ORM\Column(length: 255)]
    private ?string $job_experience = null;

    #[ORM\Column]
    private ?int $job_vacancy = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $job_deadline = null;

    #[ORM\ManyToOne(inversedBy: 'jobs')]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'job', targetEntity: Bookmark::class)]
    private Collection $bookmarks;

    #[ORM\OneToMany(mappedBy: 'job', targetEntity: ApplyJob::class)]
    private Collection $applyJobs;

    public function __construct()
    {
        $this->bookmarks = new ArrayCollection();
        $this->applyJobs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getSalary(): ?int
    {
        return $this->salary;
    }

    public function setSalary(int $salary): static
    {
        $this->salary = $salary;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): static
    {
        $this->company = $company;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getJobCategory(): ?string
    {
        return $this->job_category;
    }

    public function setJobCategory(string $job_category): static
    {
        $this->job_category = $job_category;

        return $this;
    }

    public function getJobType(): ?string
    {
        return $this->job_type;
    }

    public function setJobType(string $job_type): static
    {
        $this->job_type = $job_type;

        return $this;
    }

    public function getJobExperience(): ?string
    {
        return $this->job_experience;
    }

    public function setJobExperience(string $job_experience): static
    {
        $this->job_experience = $job_experience;

        return $this;
    }

    public function getJobVacancy(): ?int
    {
        return $this->job_vacancy;
    }

    public function setJobVacancy(int $job_vacancy): static
    {
        $this->job_vacancy = $job_vacancy;

        return $this;
    }

    public function getJobDeadline(): ?\DateTimeInterface
    {
        return $this->job_deadline;
    }

    public function setJobDeadline(\DateTimeInterface $job_deadline): static
    {
        $this->job_deadline = $job_deadline;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Bookmark>
     */
    public function getBookmarks(): Collection
    {
        return $this->bookmarks;
    }

    public function addBookmark(Bookmark $bookmark): static
    {
        if (!$this->bookmarks->contains($bookmark)) {
            $this->bookmarks->add($bookmark);
            $bookmark->setJob($this);
        }

        return $this;
    }

    public function removeBookmark(Bookmark $bookmark): static
    {
        if ($this->bookmarks->removeElement($bookmark)) {
            // set the owning side to null (unless already changed)
            if ($bookmark->getJob() === $this) {
                $bookmark->setJob(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ApplyJob>
     */
    public function getApplyJobs(): Collection
    {
        return $this->applyJobs;
    }

    public function addApplyJob(ApplyJob $applyJob): static
    {
        if (!$this->applyJobs->contains($applyJob)) {
            $this->applyJobs->add($applyJob);
            $applyJob->setJob($this);
        }

        return $this;
    }

    public function removeApplyJob(ApplyJob $applyJob): static
    {
        if ($this->applyJobs->removeElement($applyJob)) {
            // set the owning side to null (unless already changed)
            if ($applyJob->getJob() === $this) {
                $applyJob->setJob(null);
            }
        }

        return $this;
    }
}
