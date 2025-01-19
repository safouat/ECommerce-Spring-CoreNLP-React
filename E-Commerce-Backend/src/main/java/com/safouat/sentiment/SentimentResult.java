package com.safouat.sentiment;

public class SentimentResult{
    private String sentiment;
    private double score;
    private String concept;

    public SentimentResult(String sentiment, double score) {
        this.sentiment = sentiment;
        this.score = score;
        this.concept = "";
    }

    // Add no-args constructor
    public SentimentResult() {
        this.sentiment = "";
        this.score = 0.0;
        this.concept = "";
    }

    // Getters and setters
    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getConcept() {
        return concept;
    }

    public void setConcept(String concept) {
        this.concept = concept;
    }
}