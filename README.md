# Kafta
Eduardo Tirta, Filipe Borba, Hugo Mendes  
6º Semestre  
Engenharia da Computação Insper  
Megadados

## Sumário

* [Introdução](#introdução)
  * [O que é o Kafka?](#o-que-é-o-kafka)
  * [Termos](#termos)
  * [Funcionamento](#funcionamento)
* [Aplicação Proposta](#aplicação-proposta)
* [Desafios](#desafios)
* [Referências](#referências)

## Introdução
### O que é o Kafka?

<p align="center">
  <img
    alt="Logo Kafka"
    src="https://kafka.apache.org/images/logo.png"
    width="40%"
  />
</p>

O Kafka é um sistema distribuído de envio de mensagens que provê uma transmissão rápida, altamente escalável e redundante através de um modelo publicação-inscrição. O design distribuído do Kafka lhe dá uma série de vantagens. Primeiro, o Kafka permite um elevado número de consumidores permanentes ou temporários. Segundo, o Kafka tem alta disponibilidade e é resistência a falhas de nós, além de suportar recuperação automática. Em sistemas de dados do mundo real, essas características fazem do Kafka uma aplicação ideal para comunicação e integração de componentes de sistemas de larga escala. O Kafka possui, então, três principais capacidades: publicação e inscrição para fluxos de dados, similar à uma fila de mensagens ou um sistema de transmissão de mensagens corporativo; armazenamento de fluxo de dados de modo tolerante à falhas e durável; processamento de fluxo de dados em tempo real.

### Termos

Alguns termos do Kakfa são muito recorrentes e essenciais para o entendimento de como ele funciona. Estes termos são: topics (tópicos), producers, consumers e brokers.  
Todas as mensagens do Kafka são organizadas em **tópicos**. Se o intuito é mandar uma mensagem, manda-se para um tópico específico e se o intuito é ler, lê-se desse tópico especfico. É então responsável por toda a comunicação entre producers e consumers.
O **producer** é o responsável por publicar as mensagens nos tópicos, enquanto o **consumer** irá ler as mensagens dos tópicos.
O Kafka é uma aplicação distribuída, que roda em em clusters, o **broker** é cada nó existente dentro do cluster.

### Funcionamento
<p align="center">
  <img
    alt="Imagem esquematica do Kafka"
    src="https://kafka.apache.org/20/images/kafka-apis.png"
    width="60%"
  />
</p>

O Kafka possui quatro APIs principais. São elas:
* Producer API: permite que uma aplicação publique um fluxo de dados para um ou mais tópicos do Kafka.
* Consumer API: permite que uma aplicação se inscreva para um ou mais tópicos e processe o fluxo de dados produzido para ela.
* Streams API: permite que uma aplicação atue como um processadores de fluxo, consumindo um fluxo de entrada de um ou mais tópicos e produzindo um fluxo de saída para um ou mais tópicos de saída, efetivamente transformando os fluxos de entrada em fluxos de saída.
* Connector API:  permite construir e rodar producers ou consumers reutilizáveis que conectam tópicos do Kafka com aplicações ou sistemas de dados existentes. Por exemplo, um conector para um banco de dados relacional pode capturar todas as mudanças de uma tabela.

## Recuperação de dados
Uma das principais qualidades do Kafka é sua capacidade de restaurar os dados caso possua alguma falha no sistema, esta recuperação ocorre já que é armazenado em uma lista todos os eventos. Assim, quando se estabelece a conexão, os dados são sincronizados.


## Aplicação Proposta
O projeto propõe demonstrar uma das possíveis aplicações do Kafka. Para tanto, foi criada uma aplicação cliente no estilo de Dashboard que servirá como um Centro de Controle Oceânico, recebendo dados de sensores. Os sensores são simulados por diversas APIs que enviam dados de forma muito rápida para o Kafka, a fim de testar sua coleta e inserção em fila. A ideia é que as informações sejam recebidas e repassadas com mínima perda. Os dados enviados serão: temperatura, salinidade e volume, simulando o comportamento oceânico de forma aleatória, assim, pode-se verificar ao vivo os dados recebidos.  
  
Nessa situação, pode-se verificar que os Producers, são os sensores simulados, mandando dados para o Kafka e nosso Consumer é a aplicação de Dashboard do Centro de Controle Oceânico.


## Desafios
Desafios que tivemos, problemas, etc.

## Referências
https://kafka.apache.org  
https://en.wikipedia.org/wiki/Apache_Kafka  
https://www.confluent.io/what-is-apache-kafka/  
https://medium.com/luizalabs/entendendo-o-apache-kafka-i-27342ec9e29  
https://sookocheff.com/post/kafka/kafka-in-a-nutshell/  
