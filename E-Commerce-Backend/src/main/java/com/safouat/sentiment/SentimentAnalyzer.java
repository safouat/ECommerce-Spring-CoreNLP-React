package com.safouat.sentiment;

import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.neural.rnn.RNNCoreAnnotations;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.util.CoreMap;

import java.util.Properties;

public class SentimentAnalyzer {
    private StanfordCoreNLP pipeline;

    public SentimentAnalyzer() {
        // Set up pipeline properties
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, parse, sentiment");

        // Create pipeline
        pipeline = new StanfordCoreNLP(props);
    }

    public SentimentResult analyzeSentiment(String text) {
        // Create an Annotation object
        Annotation annotation = new Annotation(text);

        // Run the text through the pipeline
        pipeline.annotate(annotation);

        // Get the sentences from the annotation
        for (CoreMap sentence : annotation.get(CoreAnnotations.SentencesAnnotation.class)) {
            // Get the sentiment tree and score
            Tree tree = sentence.get(SentimentCoreAnnotations.SentimentAnnotatedTree.class);
            int score = RNNCoreAnnotations.getPredictedClass(tree);

            // Convert score to sentiment string
            String sentiment = convertScoreToSentiment(score);

            // Return result for the first sentence (you could modify this to handle multiple sentences)
            return new SentimentResult(sentiment, score);
        }

        // Return neutral if no sentences found
        return new SentimentResult("NEUTRAL", 2);
    }

    private String convertScoreToSentiment(int score) {
        switch (score) {
            case 0:
                return "VERY_NEGATIVE";
            case 1:
                return "NEGATIVE";
            case 2:
                return "NEUTRAL";
            case 3:
                return "POSITIVE";
            case 4:
                return "VERY_POSITIVE";
            default:
                return "UNKNOWN";
        }
    }
}