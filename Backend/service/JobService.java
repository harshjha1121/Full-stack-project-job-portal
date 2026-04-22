package com.example.jobportal.service;

import com.example.jobportal.model.Job;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final List<Job> jobs = new ArrayList<>();

    public List<Job> loadSampleJobs() {
        jobs.clear();
        jobs.add(new Job(1L, "Java Developer", "Infosys", "Bangalore", "Full-Time", "Mid-Level", "IT", "Develop Spring Boot apps"));
        jobs.add(new Job(2L, "React Developer", "TCS", "Pune", "Full-Time", "Entry-Level", "IT", "Build frontend interfaces"));
        jobs.add(new Job(3L, "Backend Engineer", "Wipro", "Hyderabad", "Remote", "Senior", "Software", "Design REST APIs"));
        return jobs;
    }

    public List<Job> getAllJobs() {
        return jobs;
    }

    public Job getJobById(Long id) {
        return jobs.stream()
                .filter(job -> job.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public List<Job> searchJobs(String keyword, String location, String jobType,
                                String experienceLevel, String category) {
        return jobs.stream().filter(job ->
                (keyword == null || job.getTitle().toLowerCase().contains(keyword.toLowerCase())
                        || job.getCompany().toLowerCase().contains(keyword.toLowerCase())) &&
                (location == null || job.getLocation().equalsIgnoreCase(location)) &&
                (jobType == null || job.getJobType().equalsIgnoreCase(jobType)) &&
                (experienceLevel == null || job.getExperienceLevel().equalsIgnoreCase(experienceLevel)) &&
                (category == null || job.getCategory().equalsIgnoreCase(category))
        ).collect(Collectors.toList());
    }
}
