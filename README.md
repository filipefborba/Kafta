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

O Kafka é um sistema distribuído de envio de mensagens que provê uma transmissão rápida, altamente escalável e redundante através de um modelo publicação-inscrição. O design distribuído do Kafka lhe dá uma série de vantagens. Primeiro, o Kafka permite um elevado número de consumidores permanentes ou temporários. Segundo, o Kafka tem alta disponibilidade e é resistência a falhas de nós, além de suportar recuperação automática. Em sistemas de dados do mundo real, essas características fazem do Kafka uma aplicação ideal para comunicação e integração de componentes de sistemas de larga escala. O Kafka possui, então, três principais capacidades: publicação e inscrição para fluxos de dados, similar à uma fila de mensagens ou um sistema de transmissão de mensagens corporativo; armazenamento de fluxo de dados de modo tolerante à falhas e durável; processamento de fluxo de dados em tempo real. Uma das principais qualidades do Kafka é sua capacidade de restaurar os dados caso possua alguma falha no sistema, esta recuperação ocorre já que é armazenado em uma lista todos os eventos. Assim, quando se estabelece a conexão, os dados são sincronizados.


### Termos

Alguns termos do Kakfa são muito recorrentes e essenciais para o entendimento de como ele funciona. Estes termos são: topics (tópicos), producers, consumers e brokers.  
Todas as mensagens do Kafka são organizadas em **tópicos**. Se o intuito é mandar uma mensagem, manda-se para um tópico específico e se o intuito é ler, lê-se desse tópico especfico. É então responsável por toda a comunicação entre producers e consumers.
O **producer** é o responsável por publicar as mensagens nos tópicos, enquanto o **consumer** irá ler as mensagens dos tópicos.
O Kafka é uma aplicação distribuída, que roda em clusters, o **broker** é cada nó existente dentro do cluster.

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

## Aplicação Proposta
O projeto propõe demonstrar uma das possíveis aplicações do Kafka. Para tanto, foi criada uma aplicação cliente no estilo de Dashboard que servirá como um Centro de Controle Oceânico, recebendo dados de sensores. Os sensores são simulados por diversas APIs que enviam dados de forma muito rápida para o Kafka, a fim de testar sua coleta e inserção em fila. A ideia é que as informações sejam recebidas e repassadas com mínima perda. Os dados enviados serão: temperatura, salinidade e volume, simulando o comportamento oceânico de forma aleatória, assim, pode-se verificar ao vivo os dados recebidos.  
  
Nessa situação, pode-se verificar que os Producers, são os sensores simulados, mandando dados para o Kafka e nosso Consumer é a aplicação de Dashboard do Centro de Controle Oceânico.

## Tutorial

O projeto pode ser feito tanto localmente quanto com o auxílio de máquinas da AWS. No final do tutorial está a organização para o caso de máquinas na AWS. Não esqueça de usar ```sudo apt-get update``` antes de instalar as dependências e iniciar o projeto. A recomendação é instalar e testar cada passo deste tutorial antes de rodar todos os programas ao mesmo tempo.

#### Passo 1: Configuração Kafka Server
Primeiramente, é necessário configurar o Kafka Server. Para tanto, basta seguir [este](https://kafka.apache.org/quickstart) tutorial até o passo 3 (Create a Topic). A partir desse ponto, utilizamos serviços próprios para a demonstração.    

#### Passo 2: O Producer
Os producers são APIs que realizam várias requisições POST rapidamente utilizando a biblioteca de Producer do Kafka.
Então, após finalizar o tutorial no site do Apache Kafka, o sistema está preparado para enviar e receber mensagens. Antes, é necessário instalar o Kafka para Python, para que o primeiro Producer possa rodar. Use o comando ```sudo pip3 install kafka-python``` ou use um [virtualenv](https://virtualenv.pypa.io/en/latest/).
Com isso, basta editar os arquivos ```pacific_producer.py``` e/ou ```atlantic_producer.py``` com o IP e Porta do Kafka Server configurado no objeto ```KafkaProducer``` (linha 25), além do nome do tópico criado no método ```producer.send``` (linha 23). Rode um dos producers (ou todos) e não esqueça de usar o Python 3.

#### Passo 3: O Consumer
O consumer consiste em uma API Flask que faz as requisições GET para o Kafka Server e uma aplicação Web em React que renderiza a interface do Dashboard e realiza as requisições GET para a API Flask através de sua "Fetch API", atualizando os valores das tabelas. A Fetch API é apenas uma forma simplificada e mais flexível de fazer requisições AJAX.
Para rodar a API em Flask, basta instalar as dependências através do ```sudo apt install python-flask, sudo pip3 install kafka-python```e utilizar o comando python```python3 run_app.py```. Com isso, é necessário rodar a aplicação Web usando o React.  
Para tanto, é necessário instalar o Node.JS e o npm.```sudo apt-get install nodejs``` e ```sudo apt-get install npm``` resolvem o problema. Após isso, use o comando ```npm install``` para instalar os pacotes da aplicação em React e ```npm start``` para iniciar a aplicação, que irá abrir no browser diretamente se você estiver fazendo tudo localmente. Para o caso da AWS, é necessário acessar o IP da máquina na porta 5000. Caso não consiga conectar, verifique a mensagem no terminal ao iniciar a aplicação em React.

#### AWS
Caso queira utilizar as máquinas da AWS, não esqueça de rodar ```sudo apt-get update``` para instalar as dependências e etc. Ocorrerão falhas se esse comando não for utilizado. Além disso, o tutorial prevê que o usuário irá se conectar às máquinas por SSH e realizar os passos descritos.  
As máquinas usadas foram:
* Kafka Server: (1) m4.xlarge
* Producers: (1) t2.large
* Consumer: (1) t2.micro

## Desafios
O grande desafio do projeto foi monitorar a perfomance do Kafka, uma vez que a ideia era ver em qual ponto seria necessário a utilização de uma solução robusta como o Kafka. Existem diversas ferramentas (dashboards) de monitoramento da perfomance, entretanto a utilização e configuração das mesmas não é trivial, visto que, para que tudo funcione perfeitamente, várias configurações manuais devem ser feitas. Apesar de haver bastante documentação, ela não é clara para quem está começando a mexer com essa tecnologia. O grupo havia conseguido com sucesso fazer o monitoramento das métricas através de um projeto chamado Kafka Manager, entretanto, só funcionou quando o Kafka-Server estava sendo rodado no localhost, a partir do momento que foi para uma instância EC2, o manager parou de funcionar (mesmo tendo habilitado as portas necessárias e criando as variáveis de ambiente conforme a documentação). A solução foi utilizar a ferramenta JMX Tool para monitorar as métricas do servidor via console, sem interface mas com os dados necessários à disposição.
Outro desafio considerável foi trabalhar com diversos "mini-projetos" rodando em ambientes diferentes e comunicando entre si. Temos os producers, o Kafka-Server, a API Python para fazer o papel de consumer e uma aplicação consumindo essa API para mostrar os dados numa dashboard.

## Referências
https://kafka.apache.org  
https://en.wikipedia.org/wiki/Apache_Kafka  
https://www.confluent.io/what-is-apache-kafka/  
https://medium.com/luizalabs/entendendo-o-apache-kafka-i-27342ec9e29  
https://sookocheff.com/post/kafka/kafka-in-a-nutshell/  
