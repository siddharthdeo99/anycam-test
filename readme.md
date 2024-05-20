# Backdooring Federated Learning: Techniques and Vulnerabilities

## Overview

Federated learning is a distributed approach to training machine learning models, enabling multiple participants to collaboratively train a model without sharing their private data. This method ensures data privacy as participants send model updates rather than raw data to a central server. However, this privacy-preserving mechanism introduces vulnerabilities, particularly to model-poisoning attacks. These attacks, more sophisticated and damaging than traditional data-poisoning attacks, pose significant threats to federated learning systems.

## Table of Contents

- [Attack Mechanisms](#attack-mechanisms)
- [Advantages Over Data-Poisoning](#advantages-over-data-poisoning)
- [Challenges in Detection](#challenges-in-detection)
- [Evaluation and Implications](#evaluation-and-implications)
- [Case Studies](#case-studies)
- [Threat Evaluation](#threat-evaluation)
- [Defenses and Their Limitations](#defenses-and-their-limitations)
- [Constructing the Attack Model](#constructing-the-attack-model)
- [Enhancing Backdoor Persistence and Anomaly Detection Evasion](#enhancing-backdoor-persistence-and-anomaly-detection-evasion)

## Attack Mechanisms

### Model Replacement
- A malicious participant submits crafted model updates designed to introduce backdoors into the federated model.
- Example: An attacker modifies an image classifier to misclassify images with specific features into attacker-chosen categories or alters a text predictor to complete phrases with specific, attacker-chosen words.

## Advantages Over Data-Poisoning

- **Direct Alteration**: Model-poisoning attacks directly alter model parameters, making them more potent and harder to detect.
- **Collusion Potential**: Such attacks can be executed by a single malicious participant or multiple colluding participants, amplifying the impact.

## Challenges in Detection

- **Secure Aggregation**: Prevents the server from seeing individual participants' model updates, hindering anomaly detection.
- **Anomaly Detection Evasion**: Techniques like "constrain-and-scale" help attackers evade standard detection mechanisms by making malicious updates appear normal.

## Evaluation and Implications

- Model replacement attacks significantly outperform traditional data-poisoning attacks in federated learning settings, highlighting the need for robust defenses beyond standard anomaly detection and secure aggregation.

## Case Studies

1. **Backdoored Image Classifier**: 
    - An attacker modifies the model to misclassify images containing certain features (like specific pixel patterns) into an attacker-chosen category.
2. **Backdoored Word Predictor**: 
    - An attacker can modify a word prediction model to insert specific words or phrases in response to certain input patterns.

## Threat Evaluation

- **Undetectability**: The attack does not degrade the model's performance on standard tasks, making it difficult to detect through traditional accuracy-based validation techniques.
- **Privacy Preservation**: Federated learning's design hampers the detection of malicious updates.
- **Scalability**: The attack can be executed by a single malicious participant or a small group, making it feasible even in large-scale federated learning scenarios.

## Defenses and Their Limitations

- Traditional defenses like fine-pruning, filtering, and clustering are ineffective in federated learning due to secure aggregation.
- Techniques like STRIP and Deep Inspect are not applicable to federated learning’s diverse applications.
- Differential Privacy and Byzantine-tolerant learning methods have limitations that can be exploited by attackers.

## Constructing the Attack Model

### Naive Approach
- The attacker trains its local model on both correctly labeled and backdoored inputs, manipulating the local learning rate and the number of training epochs to ensure overfitting to the backdoored data.

### Model Replacement
- The attacker aims to substitute the new global model with a malicious model by scaling updates appropriately to ensure the backdoor persists after averaging.

## Enhancing Backdoor Persistence and Anomaly Detection Evasion

### Techniques for Persistence and Evasion

1. **Slow Learning Rate**: Minimizes the impact of updates by benign participants, helping maintain the backdoor's effectiveness.
2. **Secure Aggregation**: Prevents the server from inspecting individual models, aiding the concealment of malicious updates.
3. **Anomaly Detection Evasion**: Utilizes the diversity of participants' data to evade detection.

### Specific Methods for Evasion

1. **Constrain-and-Scale Method**: Balances accuracy with normalcy by including an anomaly detection term in the loss function.
2. **Train-and-Scale Method**: Maximizes weights most critical for backdoor success during unconstrained training, helping evade basic anomaly detectors.

### Empirical Evaluations
- **Train-and-Scale**: Effective against simple, weight-based anomaly detectors.
- **Constrain-and-Scale**: Better against advanced anomaly detection systems.


## Helper Class Overview
(helper.py)
This Helper class contains essential methods for managing federated learning models, including saving and loading models, computing various norms, handling differential privacy, and performing Elastic Weight Consolidation to prevent catastrophic forgetting. The class provides tools for manipulating and evaluating models, making it easier to implement and test federated learning systems.

## Image Helper Class
(image_helper.py) The ImageHelper class extends the base Helper class for image-based federated learning tasks. It manages ResNet18 models, handles CIFAR-10 dataset loading and preprocessing, and supports various data sampling methods. Additionally, it enables dataset poisoning for simulating adversarial attacks and offers utilities for batch generation, model checkpoint management, and secret loader creation. In summary, it's a versatile toolkit for efficient image-based federated learning, addressing model training, evaluation, and security needs.

## Text Helper Class 
(text_helper.py) The TextHelper class, inheriting from Helper, supports text-based federated learning tasks. It facilitates dataset loading, preprocessing, and poisoning. Additionally, it provides methods for batching text data, reformatting hidden states, and generating text batches. The class also manages the creation and loading of recurrent neural network (RNN) models for both local and target networks, enabling training and evaluation. It's a comprehensive utility for handling text data in federated learning scenarios.

## Training Code overview
Loading Parameters: It starts by reading parameters from a file. These parameters contain settings like the type of data being used (text or image), the number of epochs to train for, and whether there are any adversaries trying to mess up the training.

Setting Up: It prepares the data and creates models based on the loaded parameters. For example, it sets up helpers for handling text or image data and creates the necessary models for training.

Training Loop: This is where the actual training happens. For each epoch (a complete pass through the training data):

It randomly selects a group of participants (or models) to train for that epoch. If there are adversaries, it handles them differently.
It trains these selected models on their respective datasets.
After training, it combines the trained models to create a better global model.
It evaluates the performance of this global model on both clean data and data that might be poisoned by adversaries.
Logging and Visualization: It keeps track of important information like loss and accuracy during training and testing. It also visualizes this information using a tool called Visdom, which helps understand how the model is performing.

Saving Models and Results: After each epoch, it saves the trained models and logs the results, such as accuracy and loss, to files so that they can be analyzed later.

Visdom Visualization: Finally, it saves graphs and other visualizations to Visdom, a tool for visualizing data and monitoring the training process.

## Database
- Whole dataset: https://drive.google.com/file/d/1yAmEbx7ZCeL45hYj5iEOvNv7k9UoX3vp/view?usp=sharing
- Dictionary: https://drive.google.com/file/d/1gnS5CO5fGXKAGfHSzV3h-2TsjZXQXe39/view?usp=sharing


## Conclusion

Federated learning, despite its privacy-preserving advantages, is inherently vulnerable to sophisticated model-poisoning attacks. Robust and adaptive defenses are crucial to mitigate these threats and ensure the security and integrity of federated learning systems.

---

For more detailed information and empirical results, refer to the full documentation and research papers on federated learning security and model-poisoning attacks.
