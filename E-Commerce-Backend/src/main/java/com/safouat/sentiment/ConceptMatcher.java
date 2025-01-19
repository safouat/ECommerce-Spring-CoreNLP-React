package com.safouat.sentiment;

import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.*;
import edu.stanford.nlp.util.*;
import edu.stanford.nlp.semgraph.SemanticGraph;
import edu.stanford.nlp.semgraph.SemanticGraphCoreAnnotations;
import edu.stanford.nlp.semgraph.SemanticGraphEdge;

import java.util.*;

public class ConceptMatcher {

    public SentimentResult matchConcept(String text) {
        // Initialize Stanford CoreNLP
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize,ssplit,pos,lemma,parse");
        StanfordCoreNLP pipeline = new StanfordCoreNLP(props);

        // Expanded list of concepts for e-commerce reviews
        List<String> concepts = Arrays.asList(
                // Price and Value
                "price", "cost", "value", "expensive", "cheap", "affordable", "worth",

                // Quality and Durability
                "quality", "durability", "durable", "sturdy", "robust", "fragile", "lasting",

                // Aesthetics
                "esthetique", "design", "appearance", "style", "color", "look", "beautiful", "elegant",

                // Performance
                "performance", "speed", "efficiency", "effective", "powerful", "reliable",

                // Comfort and Usability
                "comfort", "comfortable", "ergonomic", "easy", "convenient", "practical", "usable",

                // Size and Fit
                "size", "fit", "dimension", "large", "small", "compact",

                // Material
                "material", "fabric", "texture", "plastic", "metal", "wood", "cotton",

                // Features
                "feature", "functionality", "function", "capability", "option",

                // Service and Support
                "service", "support", "warranty", "customer service", "shipping", "delivery",

                // Innovation
                "innovative", "modern", "advanced", "smart", "technology"
        );

        // Annotate the text
        Annotation annotation = new Annotation(text);
        pipeline.annotate(annotation);

        // Process each sentence
        for (CoreMap sentence : annotation.get(CoreAnnotations.SentencesAnnotation.class)) {
            SemanticGraph dependencies = sentence.get(SemanticGraphCoreAnnotations.CollapsedDependenciesAnnotation.class);

            // Extract lemmas of all words in the sentence
            List<String> lemmas = new ArrayList<>();
            for (CoreLabel token : sentence.get(CoreAnnotations.TokensAnnotation.class)) {
                lemmas.add(token.get(CoreAnnotations.LemmaAnnotation.class));
            }

            // Find the concept that matches
            String matchedConcept = findMatchingConceptFromLemmas(concepts, lemmas, dependencies);
            if (!matchedConcept.equals("No matching concept")) {
                // Return a SentimentResult with the matched concept
                SentimentResult result = new SentimentResult("NEUTRAL", 0.0);
                result.setConcept(matchedConcept);
                return result;
            }
        }

        // Default: No match found
        SentimentResult result = new SentimentResult("NEUTRAL", 0.0);
        result.setConcept("No matching concept");
        return result;
    }

    private String findMatchingConceptFromLemmas(List<String> concepts, List<String> lemmas, SemanticGraph dependencies) {
        // Check direct matches in lemmas
        for (String concept : concepts) {
            if (lemmas.contains(concept)) {
                return concept; // Direct match found
            }
        }

        // Check for related matches using dependency relations
        for (SemanticGraphEdge edge : dependencies.edgeListSorted()) {
            String relation = edge.getRelation().toString();
            String governor = edge.getGovernor().lemma(); // Lemmatized form of the main word
            String dependent = edge.getDependent().lemma(); // Lemmatized form of the related word

            for (String concept : concepts) {
                if (governor.equals(concept) || dependent.equals(concept)) {
                    return concept; // Match found in dependencies
                }
            }
        }

        // Default: No match found
        return "No matching concept";
    }
}