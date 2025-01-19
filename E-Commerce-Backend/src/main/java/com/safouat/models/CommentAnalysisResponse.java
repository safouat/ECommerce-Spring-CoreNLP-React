package com.safouat.models;


import java.util.List;
import java.util.Map;

public class CommentAnalysisResponse {
    private Map<String, Long> sentimentCounts;
    private List<Map.Entry<String, Long>> topConcepts;

    public CommentAnalysisResponse(Map<String, Long> sentimentCounts, List<Map.Entry<String, Long>> topConcepts) {
        this.sentimentCounts = sentimentCounts;
        this.topConcepts = topConcepts;
    }

    // Add getters and setters for serialization
    public Map<String, Long> getSentimentCounts() {
        return sentimentCounts;
    }

    public void setSentimentCounts(Map<String, Long> sentimentCounts) {
        this.sentimentCounts = sentimentCounts;
    }

    public List<Map.Entry<String, Long>> getTopConcepts() {
        return topConcepts;
    }

    public void setTopConcepts(List<Map.Entry<String, Long>> topConcepts) {
        this.topConcepts = topConcepts;
    }
}
