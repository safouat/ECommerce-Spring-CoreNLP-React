package com.safouat.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.safouat.sentiment.ConceptMatcher;
import com.safouat.sentiment.SentimentAnalyzer;
import com.safouat.sentiment.SentimentResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(schema = "Comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String content;

    private String sentiment;

    private String concept;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customerId") // Use customerId instead of id
    @JsonBackReference
    private Customer customer;

    @PrePersist
    @PreUpdate
    public void setSentimentAndConcept() {
        // Set sentiment
        SentimentAnalyzer sentimentAnalyzer = new SentimentAnalyzer();
        SentimentResult sentimentResult = sentimentAnalyzer.analyzeSentiment(this.content);
        this.sentiment = sentimentResult.getSentiment();  // Get the sentiment from the result

        // Set concept
        ConceptMatcher conceptMatcher = new ConceptMatcher();
        SentimentResult conceptResult = conceptMatcher.matchConcept(this.content);  // Assume a method matchConcept exists
        this.concept = conceptResult.getConcept();  // Set the concept
    }
}
